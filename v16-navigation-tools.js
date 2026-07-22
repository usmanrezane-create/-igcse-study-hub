// V16 — top study navigation only. The extra website-tools strip has been removed.
(() => {
  const BUILD = '37';
  const validSubjects = new Set(['maths', 'physics', 'chemistry', 'accounting']);
  const subjectNames = {
    maths: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    accounting: 'Accounting'
  };

  const subjectFromPage = () => {
    const querySubject = new URLSearchParams(location.search).get('subject');
    if (validSubjects.has(querySubject)) return querySubject;
    if (typeof currentSubject !== 'undefined' && validSubjects.has(currentSubject)) return currentSubject;
    return null;
  };

  const subjectUrl = subject => `index.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;
  const topicalUrl = subject => `topical-papers.html?subject=${encodeURIComponent(subject)}&build=${BUILD}`;

  function removeOldToolsStrip() {
    document.querySelectorAll('.website-tools-strip').forEach(element => element.remove());
  }

  function addStyles() {
    if (document.getElementById('v16NavigationToolsStyle')) return;
    const style = document.createElement('style');
    style.id = 'v16NavigationToolsStyle';
    style.textContent = `
      .website-tools-strip{display:none!important}
      .topbar{grid-template-columns:auto auto minmax(240px,1fr) auto!important;gap:20px!important}
      .study-top-nav{display:flex;align-items:center;gap:6px;min-width:max-content;position:relative;z-index:30}
      .study-nav-item{position:relative}
      .study-nav-trigger{display:flex;align-items:center;gap:9px;min-height:42px;padding:0 12px;border:1px solid transparent;border-radius:10px;background:transparent;color:#eef4ff;font-size:15px;font-weight:800;white-space:nowrap;transition:.2s ease}
      .study-nav-trigger:hover,.study-nav-item.open .study-nav-trigger{color:#76f1cf;background:rgba(57,224,180,.08);border-color:rgba(89,232,194,.18)}
      .study-nav-chevron{font-size:13px;transition:transform .2s ease}.study-nav-item.open .study-nav-chevron{transform:rotate(180deg)}
      .study-nav-menu{position:absolute;top:calc(100% + 10px);left:0;width:250px;padding:9px;border:1px solid rgba(91,226,195,.22);border-radius:15px;background:linear-gradient(145deg,#071522,#0a1f2e);box-shadow:0 24px 58px rgba(0,0,0,.48);display:none;z-index:100}
      .study-nav-item.open .study-nav-menu{display:grid;animation:studyMenuIn .18s ease both}
      @keyframes studyMenuIn{from{opacity:0;transform:translateY(-7px)}to{opacity:1;transform:none}}
      .study-nav-menu a,.study-nav-menu button{display:grid;grid-template-columns:34px 1fr;align-items:center;gap:10px;width:100%;min-height:48px;padding:8px 10px;border:0;border-radius:11px;background:transparent;color:#dce7f7;text-align:left;text-decoration:none;transition:.18s ease}
      .study-nav-menu a:hover,.study-nav-menu button:hover{background:rgba(87,229,193,.10);color:#78f0cf;transform:translateX(2px)}
      .study-nav-menu .menu-emoji{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:rgba(61,105,180,.16);font-size:17px}
      .study-nav-menu b{display:block;font-size:13px}.study-nav-menu small{display:block;margin-top:2px;color:#8294ae;font-size:9px;font-weight:700}
      .website-tool-pulse{animation:websiteToolPulse .65s ease}
      @keyframes websiteToolPulse{0%,100%{box-shadow:none}50%{box-shadow:0 0 0 4px rgba(91,231,194,.18),0 18px 38px rgba(0,0,0,.32)}}
      @media(max-width:1180px){.topbar{grid-template-columns:auto auto minmax(210px,1fr) auto!important;gap:12px!important}.study-nav-trigger{font-size:13px;padding:0 9px}}
      @media(max-width:980px){.topbar .page-title{display:none!important}.topbar{grid-template-columns:auto auto minmax(200px,1fr) auto!important}}
      @media(max-width:760px){.topbar{height:auto!important;min-height:78px!important;grid-template-columns:auto minmax(0,1fr) auto!important;padding:10px 14px!important}.study-top-nav{grid-column:1/-1;grid-row:2;width:100%}.study-nav-item{flex:1}.study-nav-trigger{width:100%;justify-content:center}.study-nav-menu{width:min(280px,calc(100vw - 28px))}.study-nav-item:last-child .study-nav-menu{left:auto;right:0}}
    `;
    document.head.appendChild(style);
  }

  function closeMenus(except = null) {
    document.querySelectorAll('.study-nav-item.open').forEach(item => {
      if (item !== except) item.classList.remove('open');
    });
  }

  function addTopNavigation() {
    const topbar = document.querySelector('.topbar');
    const search = topbar?.querySelector('.search');
    if (!topbar || !search || document.getElementById('studyTopNav')) return;

    const currentSubject = subjectFromPage();
    const nav = document.createElement('nav');
    nav.id = 'studyTopNav';
    nav.className = 'study-top-nav';
    nav.setAttribute('aria-label', 'Study navigation');
    nav.innerHTML = `
      <div class="study-nav-item">
        <button class="study-nav-trigger" type="button" aria-expanded="false">Start studying <span class="study-nav-chevron">⌄</span></button>
        <div class="study-nav-menu">
          <a href="index.html?build=${BUILD}"><span class="menu-emoji">🏠</span><span><b>All subjects</b><small>Return to the study dashboard</small></span></a>
          ${Object.entries(subjectNames).map(([key, name]) => `<a href="${subjectUrl(key)}"><span class="menu-emoji">${key === 'maths' ? '➗' : key === 'physics' ? '⚡' : key === 'chemistry' ? '🧪' : '📊'}</span><span><b>${name}</b><small>Open ${name.toLowerCase()} resources</small></span></a>`).join('')}
        </div>
      </div>
      <div class="study-nav-item">
        <button class="study-nav-trigger" type="button" aria-expanded="false">Study tools <span class="study-nav-chevron">⌄</span></button>
        <div class="study-nav-menu">
          <a href="${currentSubject ? topicalUrl(currentSubject) : `index.html?build=${BUILD}`}"><span class="menu-emoji">📚</span><span><b>Topical Past Papers</b><small>Questions arranged by topic</small></span></a>
          <button type="button" data-nav-tool="Revision Notes"><span class="menu-emoji">📘</span><span><b>Revision Notes</b><small>Key ideas, formulas and diagrams</small></span></button>
          <button type="button" data-nav-tool="Mock Papers"><span class="menu-emoji">📝</span><span><b>Mock Papers</b><small>Complete timed practice</small></span></button>
          <button type="button" data-nav-tool="Predicted Papers"><span class="menu-emoji">✨</span><span><b>Predicted Papers</b><small>Focused 2026 preparation</small></span></button>
          <a href="index.html?build=${BUILD}#progress"><span class="menu-emoji">📈</span><span><b>My Progress</b><small>Track completed topics</small></span></a>
        </div>
      </div>`;

    topbar.insertBefore(nav, search);

    nav.querySelectorAll('.study-nav-trigger').forEach(trigger => {
      trigger.addEventListener('click', event => {
        event.stopPropagation();
        const item = trigger.closest('.study-nav-item');
        const willOpen = !item.classList.contains('open');
        closeMenus(item);
        item.classList.toggle('open', willOpen);
        trigger.setAttribute('aria-expanded', String(willOpen));
      });
    });

    nav.addEventListener('click', event => {
      const tool = event.target.closest('[data-nav-tool]');
      if (!tool) return;
      const name = tool.dataset.navTool;
      const selector = name === 'Revision Notes' ? '.final-notes' : name === 'Mock Papers' ? '.final-mocks' : '.final-predicted';
      const card = document.querySelector(selector);
      closeMenus();
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('website-tool-pulse');
        requestAnimationFrame(() => card.classList.add('website-tool-pulse'));
      } else if (typeof showToast === 'function') {
        showToast(`${name} will appear here when the PDFs are uploaded.`);
      }
    });

    document.addEventListener('click', () => closeMenus());
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenus(); });
  }

  function initialise() {
    removeOldToolsStrip();
    addStyles();
    addTopNavigation();
    const observer = new MutationObserver(() => {
      removeOldToolsStrip();
      addTopNavigation();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();