import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function decodePdtValue(value: string) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

function parsePdt(text: string) {
  const lines = text.trim().split(/\r?\n/);
  const status = (lines.shift() || "").trim();
  const fields: Record<string, string> = {};
  for (const line of lines) {
    const index = line.indexOf("=");
    if (index < 1) continue;
    fields[line.slice(0, index)] = decodePdtValue(line.slice(index + 1));
  }
  return { status, fields };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const pdtToken = Deno.env.get("PAYPAL_PDT_IDENTITY_TOKEN") || "";
    const pdtUrl = Deno.env.get("PAYPAL_PDT_VERIFY_URL") || "https://www.paypal.com/cgi-bin/webscr";
    const expectedAmount = Deno.env.get("PAYPAL_EXPECTED_AMOUNT") || "20.00";
    const expectedCurrency = (Deno.env.get("PAYPAL_EXPECTED_CURRENCY") || "USD").toUpperCase();
    const expectedItemWords = (Deno.env.get("PAYPAL_EXPECTED_ITEM_WORDS") || "igcse study hub|30 days premium")
      .split("|")
      .map((word) => word.trim().toLowerCase())
      .filter(Boolean);
    const premiumDays = Math.max(1, Number(Deno.env.get("PREMIUM_DAYS") || "30"));

    if (!authHeader || !supabaseUrl || !anonKey || !serviceRoleKey) {
      return json({ ok: false, error: "Supabase function secrets are incomplete." }, 500);
    }
    if (!pdtToken) {
      return json({ ok: false, error: "PayPal automatic verification is not connected yet." }, 503);
    }

    const callerClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: userData, error: userError } = await callerClient.auth.getUser();
    const user = userData.user;
    if (userError || !user) return json({ ok: false, error: "Please sign in again." }, 401);

    const body = await req.json().catch(() => ({}));
    const transactionId = String(body.transaction_id || "").trim().toUpperCase();
    if (!/^[A-Z0-9]{10,30}$/.test(transactionId)) {
      return json({ ok: false, error: "Invalid PayPal transaction ID." }, 400);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: existing } = await admin
      .from("paypal_one_time_payments")
      .select("user_id, premium_until")
      .eq("transaction_id", transactionId)
      .maybeSingle();

    if (existing?.user_id && existing.user_id !== user.id) {
      return json({ ok: false, error: "This PayPal payment has already been used." }, 409);
    }
    if (existing?.user_id === user.id && existing.premium_until) {
      return json({ ok: true, premium_until: existing.premium_until, already_claimed: true });
    }

    const verificationResponse = await fetch(pdtUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ cmd: "_notify-synch", tx: transactionId, at: pdtToken }),
    });
    const verificationText = await verificationResponse.text();
    if (!verificationResponse.ok) {
      return json({ ok: false, error: "PayPal verification could not be reached." }, 502);
    }

    const { status, fields } = parsePdt(verificationText);
    if (status !== "SUCCESS") {
      return json({ ok: false, error: "PayPal could not verify this completed payment." }, 400);
    }

    const paymentStatus = fields.payment_status || fields.status || "";
    const amount = fields.mc_gross || fields.payment_gross || fields.amount || "";
    const currency = (fields.mc_currency || fields.currency_code || "").toUpperCase();
    const itemName = (fields.item_name || "").trim();
    const normalizedItem = itemName.toLowerCase();

    if (paymentStatus.toLowerCase() !== "completed") {
      return json({ ok: false, error: `Payment is ${paymentStatus || "not completed"}.` }, 400);
    }
    if (Number(amount).toFixed(2) !== Number(expectedAmount).toFixed(2) || currency !== expectedCurrency) {
      return json({ ok: false, error: "The payment amount or currency does not match the 30-day product." }, 400);
    }
    if (expectedItemWords.length && !expectedItemWords.every((word) => normalizedItem.includes(word))) {
      return json({ ok: false, error: "This payment is not for the IGCSE 30-day Premium product." }, 400);
    }

    const { data: currentProfile } = await admin
      .from("profiles")
      .select("premium_until")
      .eq("id", user.id)
      .maybeSingle();

    const currentExpiryMs = currentProfile?.premium_until ? new Date(currentProfile.premium_until).getTime() : 0;
    const baseMs = Math.max(Date.now(), Number.isFinite(currentExpiryMs) ? currentExpiryMs : 0);
    const premiumUntil = new Date(baseMs + premiumDays * 24 * 60 * 60 * 1000).toISOString();
    const verifiedAt = new Date().toISOString();

    const { error: paymentError } = await admin.from("paypal_one_time_payments").insert({
      transaction_id: transactionId,
      user_id: user.id,
      payment_status: paymentStatus,
      item_name: itemName,
      amount: Number(amount),
      currency,
      verified_at: verifiedAt,
      premium_until: premiumUntil,
    });
    if (paymentError) throw paymentError;

    const profileUpdate = {
      premium_until: premiumUntil,
      premium_source: "paypal_one_time",
      paypal_transaction_id: transactionId,
      paypal_payment_status: paymentStatus,
      paypal_verified_at: verifiedAt,
    };
    const { data: updatedProfile, error: updateError } = await admin
      .from("profiles")
      .update(profileUpdate)
      .eq("id", user.id)
      .select("id")
      .maybeSingle();
    if (updateError) throw updateError;

    if (!updatedProfile) {
      const { error: insertProfileError } = await admin.from("profiles").insert({
        id: user.id,
        email: user.email || null,
        ...profileUpdate,
      });
      if (insertProfileError) throw insertProfileError;
    }

    return json({ ok: true, premium_until: premiumUntil });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: error instanceof Error ? error.message : "Activation failed." }, 500);
  }
});
