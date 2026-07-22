// V15 — let visitors escape a mistaken or fake "I have paid" flow.
(() => {
  const resetBeforeSignIn = document.getElementById('resetPaymentBeforeSignIn');
  const resetAfterError = document.getElementById('resetPaymentAfterError');
  const PREMIUM_UI_CACHE_KEY = 'igcse-premium-visual-cache-v1';

  function clearPremiumVisualCache() {
    try { window.localStorage.removeItem(PREMIUM_UI_CACHE_KEY); } catch {}
  }

  async function resetPaymentFlow() {
    const pendingKey = typeof PENDING_PAYMENT_KEY !== 'undefined'
      ? PENDING_PAYMENT_KEY
      : 'igcse-pending-paypal-payment-v11';
    const storage = typeof localStore !== 'undefined' ? localStore : window.localStorage;

    try { storage.removeItem(pendingKey); } catch {}
    clearPremiumVisualCache();

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

// Keep the Premium Active label visually stable while authentication restores after navigation.
(() => {
  if (typeof updatePaymentUI !== 'function' || typeof subjectCard !== 'function') return;

  const PREMIUM_UI_CACHE_KEY = 'igcse-premium-visual-cache-v1';

  function readCachedPremium() {
    try {
      const cached = JSON.parse(window.localStorage.getItem(PREMIUM_UI_CACHE_KEY) || 'null');
      const expiry = cached?.expiry ? new Date(cached.expiry).getTime() : 0;
      if (!Number.isFinite(expiry) || expiry <= Date.now()) {
        window.localStorage.removeItem(PREMIUM_UI_CACHE_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  function savePremiumCache() {
    const expiry = typeof profile !== 'undefined' ? profile?.premium_until : null;
    if (!expiry) return;
    try {
      window.localStorage.setItem(PREMIUM_UI_CACHE_KEY, JSON.stringify({ expiry }));
    } catch {}
  }

  function clearPremiumCache() {
    try { window.localStorage.removeItem(PREMIUM_UI_CACHE_KEY); } catch {}
  }

  const previousSubjectCard = subjectCard;
  subjectCard = function stablePremiumSubjectCard(subject) {
    const html = previousSubjectCard(subject);
    const meta = typeof subjectMeta !== 'undefined' ? subjectMeta[subject] : null;
    if (!meta || meta.access === 'free' || !readCachedPremium()) return html;
    return html.replace('class="badge premium">♛ PREMIUM', 'class="badge active">✓ ACTIVE');
  };

  const previousUpdatePaymentUI = updatePaymentUI;
  updatePaymentUI = function stablePremiumPaymentUI() {
    previousUpdatePaymentUI();

    const realActive = typeof isPremiumActive === 'function' && isPremiumActive();
    if (realActive) savePremiumCache();

    if (!realActive && typeof session !== 'undefined' && session?.user && typeof profile !== 'undefined' && profile) {
      clearPremiumCache();
    }

    const displayActive = realActive || readCachedPremium();
    const topButton = document.getElementById('premiumTop');
    const sideBox = document.getElementById('premiumSideBox');
    const sideLabel = document.getElementById('premiumSideLabel');
    const sideTitle = document.getElementById('premiumSideTitle');
    const sideText = document.getElementById('premiumSideText');
    const sideMeta = document.getElementById('premiumSideMeta');
    const sideButton = document.getElementById('upgradeSide');

    if (topButton) {
      topButton.classList.toggle('active', displayActive);
      topButton.innerHTML = displayActive ? '<span>✓</span> Premium Active' : '<span>♛</span> Get 30-Day Access';
      topButton.disabled = displayActive;
    }
    if (sideBox) sideBox.classList.toggle('active', displayActive);
    if (sideLabel) sideLabel.textContent = displayActive ? 'ACTIVE' : 'PREMIUM';
    if (sideTitle) sideTitle.textContent = displayActive ? 'Premium is active' : 'Unlock premium subjects';
    if (sideText) sideText.textContent = displayActive
      ? 'Mathematics, Physics and Accounting are fully unlocked.'
      : 'Mathematics, Physics and Accounting for 30 days.';
    if (sideMeta && displayActive && typeof profile !== 'undefined' && profile?.premium_until && typeof formatExpiry === 'function') {
      sideMeta.textContent = `Access until ${formatExpiry(profile.premium_until)}`;
    }
    if (sideButton) {
      sideButton.textContent = displayActive ? '✓ Premium Active' : 'Get 30-Day Access';
      sideButton.disabled = displayActive;
    }

    if (typeof currentSubject !== 'undefined' && !currentSubject && typeof renderDashboardSubjects === 'function') {
      renderDashboardSubjects(document.getElementById('globalSearch')?.value || '');
    }
  };

  updatePaymentUI();
})();

// Force every subject to use the same latest shared design build.
(() => {
  const BUILD = '33';
  const validSubjects = new Set(['maths', 'physics', 'chemistry', 'accounting']);
  const subjectPageUrl = subject => `index.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;
  const topicalPageUrl = subject => `topical-papers.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;

  if (typeof subjectUrl === 'function') {
    subjectUrl = subjectPageUrl;
    if (typeof renderSideSubjects === 'function') renderSideSubjects();
    if (typeof renderDashboardSubjects === 'function' && (typeof currentSubject === 'undefined' || !currentSubject)) {
      renderDashboardSubjects(document.getElementById('globalSearch')?.value || '');
    }
  }

  function refreshSubjectLinks() {
    document.querySelectorAll('a[href*="index.html?subject="]').forEach(link => {
      const subject = new URL(link.href, location.href).searchParams.get('subject');
      if (validSubjects.has(subject)) link.href = subjectPageUrl(subject);
    });
  }

  refreshSubjectLinks();
  new MutationObserver(refreshSubjectLinks).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener('click', event => {
    const subjectButton = event.target.closest('[data-open-subject]');
    const subjectCard = event.target.closest('.subject-card');
    const sideLink = event.target.closest('a[href*="index.html?subject="]');
    const subject = subjectButton?.dataset.openSubject
      || subjectCard?.querySelector('[data-open-subject]')?.dataset.openSubject
      || (sideLink ? new URL(sideLink.href, location.href).searchParams.get('subject') : null);

    if (!validSubjects.has(subject)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.href = subjectPageUrl(subject);
  }, true);

  window.__latestSubjectPageUrl = subjectPageUrl;
  window.__latestTopicalPageUrl = topicalPageUrl;
})();

// Open topical papers on their own page in the same browser tab.
(() => {
  if (location.pathname.endsWith('/topical-papers.html')) return;

  const validSubjects = new Set(['maths', 'physics', 'chemistry', 'accounting']);

  function connectTopicalRoute() {
    const button = document.getElementById('finalOpenTopical');
    if (!button || button.dataset.routesToTopicalPage === 'true') return false;

    const replacement = button.cloneNode(true);
    replacement.dataset.routesToTopicalPage = 'true';
    replacement.setAttribute('aria-expanded', 'false');
    button.replaceWith(replacement);

    replacement.addEventListener('click', () => {
      const subject = new URLSearchParams(location.search).get('subject');
      if (!validSubjects.has(subject)) {
        location.href = 'index.html';
        return;
      }
      location.href = typeof window.__latestTopicalPageUrl === 'function'
        ? window.__latestTopicalPageUrl(subject)
        : `topical-papers.html?subject=${encodeURIComponent(subject)}&build=33`;
    });
    return true;
  }

  setTimeout(() => {
    if (connectTopicalRoute()) return;
    const observer = new MutationObserver(() => {
      if (connectTopicalRoute()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }, 0);
})();