const topics = [
  { id: "maths-number", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "01", title: "Number", count: 104, subtopics: ["Number properties, sets and surds", "Accuracy, bounds and standard form", "Number calculations and applications", "Ratio, proportion, rates and money", "Percentages, finance and growth"], questions: "assets/maths/maths-01-number-questions.pdf", answers: "assets/maths/maths-01-number-answers.pdf" },
  { id: "maths-algebra", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "02", title: "Algebra and Graphs", count: 233, subtopics: ["Algebraic manipulation", "Equations and inequalities", "Variation and formulae", "Sequences", "Functions", "Graphs and differentiation"], questions: "assets/maths/maths-02-algebra-graphs-questions.pdf", answers: "assets/maths/maths-02-algebra-graphs-answers.pdf" },
  { id: "maths-coordinate", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "03", title: "Coordinate Geometry", count: 34, subtopics: ["Coordinates, length and midpoint", "Gradients and equations of lines", "Parallel and perpendicular lines"], questions: "assets/maths/maths-03-coordinate-geometry-questions.pdf", answers: "assets/maths/maths-03-coordinate-geometry-answers.pdf" },
  { id: "maths-geometry", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "04", title: "Geometry", count: 29, subtopics: ["Circle geometry", "Constructions, loci and scale drawings", "Similarity and congruence"], questions: "assets/maths/maths-04-geometry-questions.pdf", answers: "assets/maths/maths-04-geometry-answers.pdf" },
  { id: "maths-mensuration", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "05", title: "Mensuration", count: 116, subtopics: ["Perimeter, area and compound shapes", "Circles, arcs and sectors", "Surface area and volume"], questions: "assets/maths/maths-05-mensuration-questions.pdf", answers: "assets/maths/maths-05-mensuration-answers.pdf" },
  { id: "maths-trigonometry", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "06", title: "Trigonometry", count: 50, subtopics: ["Pythagoras and right-angled trigonometry", "Sine rule, cosine rule and triangle area", "Bearings and three-dimensional trigonometry", "Trigonometric graphs and equations"], questions: "assets/maths/maths-06-trigonometry-questions.pdf", answers: "assets/maths/maths-06-trigonometry-answers.pdf" },
  { id: "maths-transformations", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "07", title: "Transformations and Vectors", count: 67, subtopics: ["Transformations", "Vectors"], questions: "assets/maths/maths-07-transformations-vectors-questions.pdf", answers: "assets/maths/maths-07-transformations-vectors-answers.pdf" },
  { id: "maths-probability", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "08", title: "Probability", count: 50, subtopics: ["Basic probability and relative frequency", "Combined probability and tree diagrams", "Venn diagrams and probability"], questions: "assets/maths/maths-08-probability-questions.pdf", answers: "assets/maths/maths-08-probability-answers.pdf" },
  { id: "maths-statistics", subject: "maths", code: "0580 · Paper 4 · 2015–2024", number: "09", title: "Statistics", count: 68, subtopics: ["Data presentation", "Scatter diagrams and sampling", "Cumulative frequency and box plots", "Histograms"], questions: "assets/maths/maths-09-statistics-questions.pdf", answers: "assets/maths/maths-09-statistics-answers.pdf" },
  { id: "maths-legacy-matrices", subject: "maths", code: "0580 · Legacy practice · Removed syllabus content", number: "10", title: "Legacy Matrices", count: 2, subtopics: ["Matrices (legacy content removed from the current syllabus)"], questions: "assets/maths/maths-10-legacy-matrices-questions.pdf", answers: "assets/maths/maths-10-legacy-matrices-answers.pdf", legacy: true },
  { id: "physics-motion", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "01", title: "Motion, Forces and Energy", count: 79, subtopics: ["Scalars, vectors and motion", "Speed-time graphs and forces", "Forces, acceleration and Newton’s laws", "Momentum and impulse", "Circular motion and forces", "Density", "Pressure", "Moments and equilibrium", "Springs and Hooke’s law", "Work, energy, power and efficiency", "Mixed motion and forces"], questions: "assets/physics/physics-01-motion-forces-energy-premium.pdf" },
  { id: "physics-thermal", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "02", title: "Thermal Physics", count: 47, subtopics: ["Particle model and internal energy", "Gas pressure and kinetic model", "Specific heat capacity", "Specific latent heat and changes of state", "Evaporation", "Mixed thermal physics"], questions: "assets/physics/physics-02-thermal-physics-premium.pdf" },
  { id: "physics-waves", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "03", title: "Waves", count: 59, subtopics: ["Wave properties", "Reflection of waves", "Sound and ultrasound", "Light, refraction and lenses", "Electromagnetic spectrum", "Medical imaging", "Mixed waves"], questions: "assets/physics/physics-03-waves-premium.pdf" },
  { id: "physics-electricity", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "04", title: "Electricity and Magnetism", count: 102, subtopics: ["Current, charge and potential difference", "Electric circuits and resistance", "A.C. and D.C. circuits", "Magnetism and magnetic fields", "Electromagnetic induction", "Generators and motors", "Transformers", "Digital electronics and logic gates"], questions: "assets/physics/physics-04-electricity-magnetism-premium.pdf" },
  { id: "physics-nuclear", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "05", title: "Nuclear Physics", count: 39, subtopics: ["Atoms, nuclei and isotopes", "Alpha, beta and gamma radiation", "Half-life", "Nuclear fission and fusion", "Mixed radioactivity"], questions: "assets/physics/physics-05-nuclear-physics-premium.pdf" },
  { id: "physics-space", subject: "physics", code: "0625 · Paper 4 · 2021–2025", number: "06", title: "Space Physics", count: 27, subtopics: ["Solar System and accretion model", "Comets and orbits", "Stars, galaxies and the Universe", "Moon phases and orbits", "Planets and the Solar System", "Mixed space physics"], questions: "assets/physics/physics-06-space-physics-premium.pdf" },
  { id: "chemistry-states", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "01", title: "States of Matter", count: 6, subtopics: ["Particle model and changes of state"], questions: "assets/chemistry/chemistry-01-states-of-matter-premium.pdf" },
  { id: "chemistry-atoms", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "02", title: "Atoms, Elements and Compounds", count: 59, subtopics: ["Atomic structure", "Isotopes and ions", "Bonding and structures"], questions: "assets/chemistry/chemistry-02-atoms-elements-compounds-premium.pdf" },
  { id: "chemistry-stoichiometry", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "03", title: "Stoichiometry", count: 33, subtopics: ["Moles", "Formulae and equations", "Chemical calculations"], questions: "assets/chemistry/chemistry-03-stoichiometry-premium.pdf" },
  { id: "chemistry-electrochemistry", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "04", title: "Electrochemistry", count: 19, subtopics: ["Electrolysis", "Electrode reactions"], questions: "assets/chemistry/chemistry-04-electrochemistry-premium.pdf" },
  { id: "chemistry-energetics", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "05", title: "Chemical Energetics", count: 3, subtopics: ["Exothermic and endothermic changes", "Bond energies"], questions: "assets/chemistry/chemistry-05-chemical-energetics-premium.pdf" },
  { id: "chemistry-reactions", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "06", title: "Chemical Reactions", count: 11, subtopics: ["Rates of reaction", "Equilibrium", "Redox and displacement"], questions: "assets/chemistry/chemistry-06-chemical-reactions-premium.pdf" },
  { id: "chemistry-acids", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "07", title: "Acids, Bases and Salts", count: 24, subtopics: ["Acids and bases", "Preparation of salts", "The pH scale"], questions: "assets/chemistry/chemistry-07-acids-bases-salts-premium.pdf" },
  { id: "chemistry-periodic", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "08", title: "The Periodic Table", count: 10, subtopics: ["Groups in the Periodic Table", "Patterns and trends"], questions: "assets/chemistry/chemistry-08-periodic-table-premium.pdf" },
  { id: "chemistry-metals", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "09", title: "Metals", count: 20, subtopics: ["Properties of metals", "Reactivity series", "Extraction", "Corrosion"], questions: "assets/chemistry/chemistry-09-metals-premium.pdf" },
  { id: "chemistry-environment", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "10", title: "Chemistry of the Environment", count: 14, subtopics: ["Air and water", "Climate", "Industrial chemistry"], questions: "assets/chemistry/chemistry-10-environment-premium.pdf" },
  { id: "chemistry-organic", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "11", title: "Organic Chemistry", count: 56, subtopics: ["Hydrocarbons and fuels", "Functional groups", "Organic reactions", "Polymers"], questions: "assets/chemistry/chemistry-11-organic-chemistry-premium.pdf" },
  { id: "chemistry-experimental", subject: "chemistry", code: "0620 · Paper 4 · 2020–2025", number: "12", title: "Experimental Techniques and Analysis", count: 1, subtopics: ["Separation methods", "Titration", "Chemical tests"], questions: "assets/chemistry/chemistry-12-experimental-analysis-premium.pdf" },
  { id: "accounting-fundamentals", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "01", title: "The Fundamentals of Accounting", count: 0, subtopics: ["Purpose of accounting", "Accounting equation"], questions: "assets/accounting/accounting-01-fundamentals-premium.pdf" },
  { id: "accounting-sources", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "02", title: "Sources and Recording of Data", count: 27, subtopics: ["Double-entry bookkeeping", "Books of prime entry"], questions: "assets/accounting/accounting-02-sources-recording-premium.pdf" },
  { id: "accounting-verification", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "03", title: "Verification of Accounting Records", count: 28, subtopics: ["Correction of errors", "Bank reconciliation", "Control accounts"], questions: "assets/accounting/accounting-03-verification-records-premium.pdf" },
  { id: "accounting-procedures", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "04", title: "Accounting Procedures", count: 21, subtopics: ["Capital and revenue expenditure", "Depreciation and disposal", "Irrecoverable debts and provisions", "Valuation of inventory"], questions: "assets/accounting/accounting-04-procedures-premium.pdf" },
  { id: "accounting-statements", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "05", title: "Preparation of Financial Statements", count: 41, subtopics: ["Sole traders", "Partnerships", "Limited companies", "Clubs and societies", "Manufacturing accounts", "Incomplete records"], questions: "assets/accounting/accounting-05-financial-statements-premium.pdf" },
  { id: "accounting-analysis", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "06", title: "Analysis and Interpretation", count: 13, subtopics: ["Calculation of accounting ratios", "Understanding and interpreting ratios"], questions: "assets/accounting/accounting-06-analysis-interpretation-premium.pdf" },
  { id: "accounting-principles", subject: "accounting", code: "0452 · Paper 2 · 2021–2025", number: "07", title: "Accounting Principles and Policies", count: 0, subtopics: ["Accounting principles", "Accounting policies"], questions: "assets/accounting/accounting-07-principles-policies-premium.pdf" }
];
const subjectMeta = {
  maths: {
    name: 'Maths',
    code: '0580',
    icon: '∑',
    description: 'Extended Maths topical Paper 4 practice organised by topic, with matching answer booklets for every section.',
    note: 'Includes question and answer PDFs for each topic.'
  },
  physics: {
    name: 'Physics',
    code: '0625',
    icon: '⚛',
    description: 'Premium Physics Paper 4 topical banks covering the full syllabus from motion to space physics.',
    note: 'Questions arranged into 6 large revision areas.'
  },
  chemistry: {
    name: 'Chemistry',
    code: '0620',
    icon: '🧪',
    description: 'Chemistry topical question banks grouped clearly from the particle model all the way to organic chemistry.',
    note: 'Strong topic coverage for theory practice.'
  },
  accounting: {
    name: 'Accounting',
    code: '0452',
    icon: '¤',
    description: 'Accounting Paper 2 topical practice with premium sections for bookkeeping, procedures and statements.',
    note: 'Best for focused theory and structured practice.'
  }
};

const subjectOrder = ['maths', 'physics', 'chemistry', 'accounting'];
const subjectOverview = document.querySelector('#subjectOverview');
const subjectSections = document.querySelector('#subjectSections');
const jumpLinks = document.querySelector('#jumpLinks');
const searchInput = document.querySelector('#searchInput');
const resultCount = document.querySelector('#resultCount');
const activeFilterLabel = document.querySelector('#activeFilterLabel');
const emptyState = document.querySelector('#emptyState');
const pdfDialog = document.querySelector('#pdfDialog');
const pdfFrame = document.querySelector('#pdfFrame');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogSubject = document.querySelector('#dialogSubject');
const dialogDownload = document.querySelector('#dialogDownload');
const continueButton = document.querySelector('#continueButton');
const filterButtons = [...document.querySelectorAll('.filter-pill')];

let activeSubject = 'all';

const getCompleted = () => {
  try { return new Set(JSON.parse(localStorage.getItem('igcse-completed-topics') || '[]')); }
  catch { return new Set(); }
};

const saveCompleted = (set) => localStorage.setItem('igcse-completed-topics', JSON.stringify([...set]));

function getSubjectTopics(subject) {
  return topics.filter(topic => topic.subject === subject);
}

function getSubjectQuestionTotal(subject) {
  return getSubjectTopics(subject).reduce((sum, topic) => sum + (topic.count || 0), 0);
}

function countCompleted(subject = null) {
  const completed = getCompleted();
  return topics.filter(topic => completed.has(topic.id) && (!subject || topic.subject === subject)).length;
}

function updateProgress() {
  const completedCount = countCompleted();
  const percent = Math.round((completedCount / topics.length) * 100);
  document.querySelector('#progressPercent').textContent = `${percent}%`;
  document.querySelector('#progressLabel').textContent = `${completedCount} of ${topics.length} topics completed`;
  document.querySelector('#panelProgressPercent').textContent = `${percent}%`;
  document.querySelector('#panelProgressText').textContent = `${completedCount} of ${topics.length} topics completed`;
  document.querySelector('#progressCircle').style.setProperty('--progress', `${percent * 3.6}deg`);
}

function subjectOverviewMarkup(subject) {
  const meta = subjectMeta[subject];
  const subjectTopics = getSubjectTopics(subject);
  const questionTotal = getSubjectQuestionTotal(subject);
  return `
    <article class="subject-overview-card" data-subject="${subject}">
      <div class="subject-tag"><i></i>${meta.name} ${meta.code}</div>
      <h3>${meta.name}</h3>
      <p>${meta.description}</p>
      <div class="subject-overview-stats">
        <div><span>Topics</span><strong>${subjectTopics.length}</strong></div>
        <div><span>Questions</span><strong>${questionTotal}</strong></div>
      </div>
      <a class="subject-link subject-jump" href="#section-${subject}" data-set-subject="${subject}">Open ${meta.name} section <span aria-hidden="true">→</span></a>
    </article>`;
}

function cardMarkup(topic) {
  const completed = getCompleted().has(topic.id);
  const shownSubtopics = topic.subtopics.slice(0, 4);
  const more = topic.subtopics.length - shownSubtopics.length;
  const countText = topic.legacy ? `${topic.count} legacy question${topic.count === 1 ? '' : 's'}` : (topic.count ? `${topic.count} question${topic.count === 1 ? '' : 's'}` : 'Topic outline');
  return `
    <article class="topic-card" data-id="${topic.id}" data-subject="${topic.subject}">
      <div class="card-top">
        <div class="card-headline">
          <div>
            <div class="card-topline"><i></i>${subjectMeta[topic.subject].name} · Topic ${topic.number}</div>
            <h4>${topic.title}</h4>
          </div>
          <button class="card-button complete-button ${completed ? 'completed' : ''}" type="button" data-complete="${topic.id}" aria-label="${completed ? 'Mark topic incomplete' : 'Mark topic complete'}" title="${completed ? 'Completed' : 'Mark complete'}">${completed ? '✓' : '○'}</button>
        </div>
        <div class="topic-code">${topic.code}</div>
        <div class="topic-meta">
          <span class="meta-chip">${countText}</span>
          ${topic.answers ? '<span class="meta-chip">Questions + Answers</span>' : '<span class="meta-chip">Questions</span>'}
        </div>
      </div>

      <div class="subtopics">
        ${shownSubtopics.map(item => `<span class="subtopic-pill">${item}</span>`).join('')}
        ${topic.subtopics.slice(4).map(item => `<span class="subtopic-pill extra-subtopic" hidden>${item}</span>`).join('')}
      </div>
      ${more > 0 ? `<button class="subtopics-toggle" type="button" data-more="${more}">+ ${more} more subtopic${more === 1 ? '' : 's'}</button>` : ''}
      ${topic.legacy ? '<div class="legacy-note">Legacy content only. This is removed from the current syllabus, so use it only if you want extra old practice.</div>' : ''}

      <div class="card-actions">
        <div class="open-group">
          <button class="card-button primary open-pdf" type="button" data-file="${topic.questions}" data-kind="Questions" data-title="${topic.title}">▤ Questions</button>
          ${topic.answers ? `<button class="card-button open-pdf" type="button" data-file="${topic.answers}" data-kind="Answers" data-title="${topic.title}">✓ Answers</button>` : ''}
        </div>
      </div>
    </article>`;
}

function sectionMarkup(subject, subjectTopics) {
  const meta = subjectMeta[subject];
  const questionTotal = subjectTopics.reduce((sum, topic) => sum + (topic.count || 0), 0);
  const completedCount = countCompleted(subject);
  const hasAnswers = subjectTopics.some(topic => Boolean(topic.answers));

  return `
    <section class="subject-section" id="section-${subject}" data-subject="${subject}">
      <div class="subject-section-head">
        <div>
          <div class="subject-title-wrap">
            <div class="subject-icon">${meta.icon}</div>
            <div>
              <h3>${meta.name}</h3>
              <p>${meta.code} · ${meta.note}</p>
            </div>
          </div>
          <div class="subject-summary">${meta.description}</div>
        </div>

        <div class="subject-mini-stats">
          <div><strong>${subjectTopics.length}</strong><span>topics</span></div>
          <div><strong>${questionTotal}</strong><span>questions</span></div>
          <div><strong>${completedCount}</strong><span>completed</span></div>
          <div><strong>${hasAnswers ? 'Yes' : 'No'}</strong><span>answers included</span></div>
        </div>
      </div>

      <div class="topic-grid">
        ${subjectTopics.map(cardMarkup).join('')}
      </div>
    </section>`;
}

function filteredTopics() {
  const term = searchInput.value.trim().toLowerCase();
  return topics.filter(topic => {
    const matchesSubject = activeSubject === 'all' || topic.subject === activeSubject;
    const haystack = [topic.title, topic.code, subjectMeta[topic.subject].name, ...topic.subtopics].join(' ').toLowerCase();
    return matchesSubject && haystack.includes(term);
  });
}

function renderOverview() {
  subjectOverview.innerHTML = subjectOrder.map(subjectOverviewMarkup).join('');
}

function renderTopics() {
  const filtered = filteredTopics();
  const visibleSubjects = subjectOrder.filter(subject => filtered.some(topic => topic.subject === subject));

  subjectSections.innerHTML = visibleSubjects.map(subject => sectionMarkup(subject, filtered.filter(topic => topic.subject === subject))).join('');
  jumpLinks.innerHTML = visibleSubjects.map(subject => `<a class="jump-link subject-jump" href="#section-${subject}" data-set-subject="${subject}">${subjectMeta[subject].name}</a>`).join('');

  resultCount.textContent = `${filtered.length} topic${filtered.length === 1 ? '' : 's'}`;
  activeFilterLabel.textContent = activeSubject === 'all' ? 'across all four subjects' : `in ${subjectMeta[activeSubject].name}`;
  emptyState.hidden = filtered.length !== 0;
  subjectSections.hidden = filtered.length === 0;
  updateProgress();
}

function openPdf(file, title, kind) {
  dialogTitle.textContent = `${title} — ${kind}`;
  const topic = topics.find(item => item.title === title && (item.questions === file || item.answers === file));
  dialogSubject.textContent = topic ? `${subjectMeta[topic.subject].name} ${topic.code.split('·')[0].trim()}` : 'PDF';
  pdfFrame.src = `${file}#view=FitH`;
  dialogDownload.href = file;
  dialogDownload.download = file.split('/').pop();
  pdfDialog.showModal();
  localStorage.setItem('igcse-last-opened', JSON.stringify({ file, title, kind }));
}

function setActiveFilter(subject) {
  activeSubject = subject;
  filterButtons.forEach(button => {
    const active = button.dataset.subject === subject;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  renderTopics();
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => setActiveFilter(button.dataset.subject));
});

searchInput.addEventListener('input', renderTopics);

subjectOverview.addEventListener('click', (event) => {
  const jump = event.target.closest('.subject-jump');
  if (!jump) return;
  setActiveFilter('all');
});

jumpLinks.addEventListener('click', (event) => {
  const jump = event.target.closest('.subject-jump');
  if (!jump) return;
  setActiveFilter('all');
});

subjectSections.addEventListener('click', (event) => {
  const openButton = event.target.closest('.open-pdf');
  if (openButton) {
    openPdf(openButton.dataset.file, openButton.dataset.title, openButton.dataset.kind);
    return;
  }

  const completeButton = event.target.closest('[data-complete]');
  if (completeButton) {
    const completed = getCompleted();
    if (completed.has(completeButton.dataset.complete)) completed.delete(completeButton.dataset.complete);
    else completed.add(completeButton.dataset.complete);
    saveCompleted(completed);
    renderTopics();
    return;
  }

  const toggle = event.target.closest('.subtopics-toggle');
  if (toggle) {
    const card = toggle.closest('.topic-card');
    const extras = card.querySelectorAll('.extra-subtopic');
    const opening = extras[0]?.hidden;
    extras.forEach(item => { item.hidden = !opening; });
    toggle.textContent = opening ? 'Show fewer subtopics' : `+ ${toggle.dataset.more} more subtopic${toggle.dataset.more === '1' ? '' : 's'}`;
  }
});

document.querySelector('#dialogClose').addEventListener('click', () => pdfDialog.close());
pdfDialog.addEventListener('close', () => { pdfFrame.src = 'about:blank'; });
pdfDialog.addEventListener('click', (event) => {
  const box = pdfDialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) pdfDialog.close();
});

continueButton.addEventListener('click', () => {
  try {
    const last = JSON.parse(localStorage.getItem('igcse-last-opened') || 'null');
    if (last) openPdf(last.file, last.title, last.kind);
    else document.querySelector('#subjects').scrollIntoView({ behavior: 'smooth' });
  } catch {
    document.querySelector('#subjects').scrollIntoView({ behavior: 'smooth' });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderOverview();
renderTopics();
updateProgress();
