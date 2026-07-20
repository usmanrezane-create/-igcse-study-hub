(() => {
  const originalSubjectCard = subjectCard;
  const originalUpdatePaymentUI = updatePaymentUI;

  subjectCard = function enhancedSubjectCard(subject) {
    const html = originalSubjectCard(subject);
    const meta = subjectMeta[subject];
    if (!meta || meta.access === 'free' || !isPremiumActive()) return html;
    return html.replace('class="badge premium">♛ PREMIUM', 'class="badge active">✓ ACTIVE');
  };

  updatePaymentUI = function enhancedPaymentUI() {
    originalUpdatePaymentUI();
    const active = isPremiumActive();
    const expiry = active ? formatExpiry(profile?.premium_until) : '';
    const topButton = document.querySelector('#premiumTop');
    const sideBox = document.querySelector('#premiumSideBox');
    const sideLabel = document.querySelector('#premiumSideLabel');
    const sideTitle = document.querySelector('#premiumSideTitle');
    const sideText = document.querySelector('#premiumSideText');
    const sideMeta = document.querySelector('#premiumSideMeta');
    const sideButton = document.querySelector('#upgradeSide');

    if (topButton) {
      topButton.classList.toggle('active', active);
      topButton.innerHTML = active ? '<span>✓</span> Premium Active' : '<span>♛</span> Get 30-Day Access';
    }
    if (sideBox) sideBox.classList.toggle('active', active);
    if (sideLabel) sideLabel.textContent = active ? 'ACTIVE' : 'PREMIUM';
    if (sideTitle) sideTitle.textContent = active ? 'Premium is active' : 'Unlock premium subjects';
    if (sideText) sideText.textContent = active
      ? 'Mathematics, Physics and Accounting are fully unlocked.'
      : 'Mathematics, Physics and Accounting for 30 days.';
    if (sideMeta) sideMeta.textContent = active ? `Access until ${expiry}` : 'US$20 once · no renewal';
    if (sideButton) {
      sideButton.textContent = active ? '✓ Premium Active' : 'Get 30-Day Access';
      sideButton.disabled = active;
    }

    if (!currentSubject) renderDashboardSubjects(document.querySelector('#globalSearch')?.value || '');
  };

  updatePaymentUI();
})();
