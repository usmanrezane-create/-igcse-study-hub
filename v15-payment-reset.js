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
