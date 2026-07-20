-- Run this once in Supabase SQL Editor.
-- It stores each PayPal transaction only once and grants 30 days safely.
-- No PayPal payer email, address, phone number or raw personal checkout data is stored.

alter table public.profiles
  add column if not exists premium_until timestamptz,
  add column if not exists premium_source text,
  add column if not exists paypal_transaction_id text,
  add column if not exists paypal_payment_status text,
  add column if not exists paypal_verified_at timestamptz;

create table if not exists public.paypal_one_time_payments (
  transaction_id text primary key,
  user_id uuid not null,
  payment_status text not null,
  item_name text,
  amount numeric(12,2) not null,
  currency text not null,
  verified_at timestamptz not null default now(),
  premium_until timestamptz not null
);

-- Remove personal checkout fields if an earlier draft of this table was created.
alter table public.paypal_one_time_payments
  drop column if exists payer_email,
  drop column if exists raw_payload;

-- Keep the unique transaction record even when a website account is later deleted.
alter table public.paypal_one_time_payments
  drop constraint if exists paypal_one_time_payments_user_id_fkey;

create index if not exists paypal_one_time_payments_user_id_idx
  on public.paypal_one_time_payments(user_id);

alter table public.paypal_one_time_payments enable row level security;
revoke all on table public.paypal_one_time_payments from anon, authenticated;

-- The browser may read only the signed-in user's own Premium expiry.
alter table public.profiles enable row level security;
grant select on table public.profiles to authenticated;

drop policy if exists "study_hub_read_own_profile" on public.profiles;
create policy "study_hub_read_own_profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);
