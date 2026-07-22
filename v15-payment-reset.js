// V15 — let visitors escape a mistaken or fake "I have paid" flow.
(() => {
  const resetBeforeSignIn = document.getElementById('resetPaymentBeforeSignIn');
  const resetAfterError = document.getElementById('resetPaymentAfterError');

  async function resetPaymentFlow() {
    const pendingKey = typeof PENDING_PAYMENT_KEY !== 'undefined'
      ? PENDING_PAYMENT_KEY
      : 'igcse-pending-paypal-payment-v11';
    const storage = typeof localStore !== 'undefined' ? localStore : window.localStorage;

    try { storage.removeItem(pendingKey); } catch {}

    const input = document.getElementById('transactionIdInput');
    const manualClaim = document.getElementById('manualClaim');
    const activationMessage = document.getElementById('activationMessage');
    if (input) input.value = '';
    if (manualClaim) manualClaim.hidden = true;
    if (activationMessage) activationMessage.textContent = '';

    if (typeof updatePaymentUI === 'function') updatePaymentUI();

    try {
      if (typeof supabaseClient !== 'undefined' && supabaseClient && typeof session !== 'undefined' && session?.user) {
        await supabaseClient.auth.signOut();
      }
    } catch (error) {
      console.warn('Could not sign out while resetting payment flow.', error);
    }

    if (typeof session !== 'undefined') session = null;
    if (typeof profile !== 'undefined') profile = null;
    if (typeof claimInFlight !== 'undefined') claimInFlight = false;
    if (typeof updatePaymentUI === 'function') updatePaymentUI();

    if (typeof showToast === 'function') {
      showToast('Payment step reset. You can pay now or enter the correct transaction ID.');
    }
  }

  resetBeforeSignIn?.addEventListener('click', resetPaymentFlow);
  resetAfterError?.addEventListener('click', resetPaymentFlow);
})();

// Extra study resources shown inside every subject page.
(() => {
  const subjectPage = document.getElementById('subjectPage');
  const subjectHero = document.getElementById('subjectHero');
  const subjectToolbar = subjectPage?.querySelector('.subject-toolbar');
  if (!subjectPage || !subjectHero || !subjectToolbar || document.getElementById('extraResourceHub')) return;

  const style = document.createElement('style');
  style.textContent = `
    .extra-resource-hub{position:relative;overflow:hidden;margin:24px 0 26px;padding:28px;border:1px solid rgba(75,108,179,.34);border-radius:23px;background:linear-gradient(145deg,rgba(7,16,34,.98),rgba(8,13,29,.98));box-shadow:0 20px 55px rgba(0,0,0,.24)}
    .extra-resource-hub:before{content:"";position:absolute;width:330px;height:330px;border-radius:50%;right:-145px;top:-190px;background:rgba(86,70,255,.2);filter:blur(8px);pointer-events:none}
    .extra-resource-head{position:relative;z-index:1;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px}
    .extra-resource-head h2{margin:10px 0 7px;font-size:30px;letter-spacing:-.035em}
    .extra-resource-head p{margin:0;max-width:720px;color:#8f9db7;font-size:13px;line-height:1.6}
    .extra-resource-new{flex:0 0 auto;padding:7px 11px;border:1px solid rgba(77,236,158,.28);border-radius:999px;background:rgba(35,219,130,.11);color:#50efa6;font-size:10px;font-weight:900;letter-spacing:.12em}
    .extra-resource-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
    .extra-resource-card{position:relative;overflow:hidden;min-height:220px;padding:21px;border:1px solid #1b2d4d;border-radius:18px;background:linear-gradient(150deg,#0b172b,#07101f);display:flex;flex-direction:column;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
    .extra-resource-card:hover{transform:translateY(-4px);border-color:#385d9b;box-shadow:0 18px 38px rgba(0,0,0,.3)}
    .extra-resource-card:after{content:"";position:absolute;width:115px;height:115px;border-radius:50%;right:-50px;bottom:-60px;background:var(--resource-glow);filter:blur(3px);opacity:.55}
    .resource-notes{--resource-glow:rgba(47,107,255,.38)}
    .resource-mocks{--resource-glow:rgba(141,70,255,.38)}
    .resource-predicted{--resource-glow:rgba(255,139,36,.35)}
    .extra-resource-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
    .extra-resource-icon{display:grid;place-items:center;width:49px;height:49px;border-radius:14px;background:linear-gradient(145deg,#152b55,#231e61);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 0 28px rgba(72,81,255,.16);font-size:23px;color:#fff}
    .extra-resource-status{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09);color:#8e9bb4;font-size:9px;font-weight:900;letter-spacing:.1em}
    .extra-resource-card h3{margin:18px 0 8px;font-size:20px}
    .extra-resource-card p{margin:0 0 18px;color:#8d9bb4;font-size:12px;line-height:1.6}
    .extra-resource-card button{position:relative;z-index:1;margin-top:auto;width:100%;min-height:42px;border:1px solid #2b4269;border-radius:10px;background:#0d1a30;color:#dce5f5;font-weight:850;transition:.2s ease}
    .extra-resource-card button:hover{border-color:#5578bb;background:#122341;color:#fff}
    .topical-section-heading{margin:6px 0 14px;padding:0 2px}
    .topical-section-heading h2{margin:8px 0 5px;font-size:28px;letter-spacing:-.03em}
    .topical-section-heading p{margin:0;color:#8391aa;font-size:12px}
    @media(max-width:1000px){.extra-resource-grid{grid-template-columns:1fr}.extra-resource-card{min-height:185px}}
    @media(max-width:620px){.extra-resource-hub{padding:20px;border-radius:18px}.extra-resource-head{display:grid}.extra-resource-head h2{font-size:25px}.extra-resource-new{justify-self:start}.extra-resource-card{padding:18px}}
  `;
  document.head.appendChild(style);

  const hub = document.createElement('section');
  hub.id = 'extraResourceHub';
  hub.className = 'extra-resource-hub';
  hub.setAttribute('aria-labelledby', 'extraResourceTitle');
  hub.innerHTML = `
    <div class="extra-resource-head">
      <div>
        <span class="eyebrow"><i></i> EXTRA STUDY RESOURCES</span>
        <h2 id="extraResourceTitle">More ways to prepare</h2>
        <p>Build your knowledge first, practise complete papers, then prepare for the most likely exam styles.</p>
      </div>
      <span class="extra-resource-new">NEW SECTION</span>
    </div>
    <div class="extra-resource-grid">
      <article class="extra-resource-card resource-notes">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">▤</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Revision Notes</h3>
        <p>Clear syllabus notes, key formulas, definitions, diagrams and exam tips arranged by topic.</p>
        <button type="button" data-study-resource="Revision Notes">View revision notes →</button>
      </article>
      <article class="extra-resource-card resource-mocks">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">⌁</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Mock Papers</h3>
        <p>Full timed practice papers designed to test the complete syllabus under exam conditions.</p>
        <button type="button" data-study-resource="Mock Papers">View mock papers →</button>
      </article>
      <article class="extra-resource-card resource-predicted">
        <div class="extra-resource-card-top"><span class="extra-resource-icon">✦</span><span class="extra-resource-status">COMING SOON</span></div>
        <h3>Predicted Papers</h3>
        <p>Focused practice built around important syllabus areas and likely question styles for 2026.</p>
        <button type="button" data-study-resource="Predicted Papers">View predicted papers →</button>
      </article>
    </div>`;

  const topicalHeading = document.createElement('div');
  topicalHeading.className = 'topical-section-heading';
  topicalHeading.innerHTML = `
    <span class="eyebrow"><i></i> TOPICAL PRACTICE</span>
    <h2>Topical Past Papers</h2>
    <p>Choose a topic below to open its question paper and mark scheme.</p>`;

  subjectHero.insertAdjacentElement('afterend', hub);
  subjectToolbar.insertAdjacentElement('beforebegin', topicalHeading);

  function currentSubjectName() {
    return subjectHero.querySelector('h1')?.textContent?.trim() || 'this subject';
  }

  function updateResourceHeading() {
    const heading = document.getElementById('extraResourceTitle');
    if (heading) heading.textContent = `${currentSubjectName()} study resources`;
  }

  new MutationObserver(updateResourceHeading).observe(subjectHero, { childList: true, subtree: true });
  updateResourceHeading();

  hub.addEventListener('click', event => {
    const button = event.target.closest('[data-study-resource]');
    if (!button) return;
    const resource = button.dataset.studyResource;
    const message = `${resource} for ${currentSubjectName()} will appear here when the PDFs are uploaded.`;
    if (typeof showToast === 'function') showToast(message);
  });
})();