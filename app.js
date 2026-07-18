const topics = [
  {
    id: "physics-motion", subject: "physics", code: "0625 · Extended · Topical practice", number: "01", title: "Motion, Forces and Energy", count: 79,
    subtopics: ["Scalars, vectors and motion", "Speed–time graphs and forces", "Forces, acceleration and Newton’s laws", "Momentum and impulse", "Circular motion and forces", "Density", "Pressure", "Moments and equilibrium", "Springs and Hooke’s law", "Work, energy, power and efficiency", "Mixed motion and forces"],
    questions: "assets/physics/physics-01-motion-forces-energy.pdf", answers: "assets/physics/physics-01-motion-worked-answers.pdf"
  },
  {
    id: "physics-thermal", subject: "physics", code: "0625 · Extended · Topical practice", number: "02", title: "Thermal Physics", count: 47,
    subtopics: ["Particle model and internal energy", "Gas pressure and kinetic model", "Specific heat capacity", "Specific latent heat and changes of state", "Evaporation", "Mixed thermal physics"],
    questions: "assets/physics/physics-02-thermal-physics.pdf"
  },
  {
    id: "physics-waves", subject: "physics", code: "0625 · Extended · Topical practice", number: "03", title: "Waves", count: 59,
    subtopics: ["Wave properties", "Reflection of waves", "Sound and ultrasound", "Light, refraction and lenses", "Electromagnetic spectrum", "Medical imaging", "Mixed waves"],
    questions: "assets/physics/physics-03-waves.pdf"
  },
  {
    id: "physics-electricity", subject: "physics", code: "0625 · Extended · Topical practice", number: "04", title: "Electricity and Magnetism", count: 102,
    subtopics: ["Current, charge and potential difference", "Electric circuits and resistance", "A.C. and D.C. circuits", "Magnetism and magnetic fields", "Electromagnetic induction", "Generators and motors", "Transformers", "Digital electronics and logic gates"],
    questions: "assets/physics/physics-04-electricity-magnetism.pdf"
  },
  {
    id: "physics-nuclear", subject: "physics", code: "0625 · Extended · Topical practice", number: "05", title: "Nuclear Physics", count: 39,
    subtopics: ["Atoms, nuclei and isotopes", "Alpha, beta and gamma radiation", "Half-life", "Nuclear fission and fusion", "Mixed radioactivity"],
    questions: "assets/physics/physics-05-nuclear-physics.pdf"
  },
  {
    id: "physics-space", subject: "physics", code: "0625 · Extended · Topical practice", number: "06", title: "Space Physics", count: 27,
    subtopics: ["Solar System and accretion model", "Comets and orbits", "Stars, galaxies and the Universe", "Moon phases and orbits", "Planets and the Solar System", "Mixed space physics"],
    questions: "assets/physics/physics-06-space-physics.pdf"
  },

  { id: "chemistry-states", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "01", title: "States of Matter", count: 6, subtopics: ["Particle model and changes of state"], questions: "assets/chemistry/chemistry-01-states-of-matter.pdf", answers: "assets/chemistry/chemistry-01-states-of-matter-answers.pdf" },
  { id: "chemistry-atoms", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "02", title: "Atoms, Elements and Compounds", count: 59, subtopics: ["Atomic structure", "Isotopes and ions", "Bonding and structures"], questions: "assets/chemistry/chemistry-02-atoms-elements-compounds.pdf", answers: "assets/chemistry/chemistry-02-atoms-elements-compounds-answers.pdf" },
  { id: "chemistry-stoichiometry", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "03", title: "Stoichiometry", count: 33, subtopics: ["Moles", "Formulae and equations", "Chemical calculations"], questions: "assets/chemistry/chemistry-03-stoichiometry.pdf", answers: "assets/chemistry/chemistry-03-stoichiometry-answers.pdf" },
  { id: "chemistry-electrochemistry", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "04", title: "Electrochemistry", count: 19, subtopics: ["Electrolysis", "Electrode reactions"], questions: "assets/chemistry/chemistry-04-electrochemistry.pdf", answers: "assets/chemistry/chemistry-04-electrochemistry-answers.pdf" },
  { id: "chemistry-energetics", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "05", title: "Chemical Energetics", count: 3, subtopics: ["Exothermic and endothermic changes", "Bond energies"], questions: "assets/chemistry/chemistry-05-chemical-energetics.pdf", answers: "assets/chemistry/chemistry-05-chemical-energetics-answers.pdf" },
  { id: "chemistry-reactions", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "06", title: "Chemical Reactions", count: 11, subtopics: ["Rates of reaction", "Equilibrium", "Redox and displacement"], questions: "assets/chemistry/chemistry-06-chemical-reactions.pdf", answers: "assets/chemistry/chemistry-06-chemical-reactions-answers.pdf" },
  { id: "chemistry-acids", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "07", title: "Acids, Bases and Salts", count: 24, subtopics: ["Acids and bases", "Preparation of salts", "The pH scale"], questions: "assets/chemistry/chemistry-07-acids-bases-salts.pdf", answers: "assets/chemistry/chemistry-07-acids-bases-salts-answers.pdf" },
  { id: "chemistry-periodic", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "08", title: "The Periodic Table", count: 10, subtopics: ["Groups in the Periodic Table", "Patterns and trends"], questions: "assets/chemistry/chemistry-08-periodic-table.pdf", answers: "assets/chemistry/chemistry-08-periodic-table-answers.pdf" },
  { id: "chemistry-metals", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "09", title: "Metals", count: 20, subtopics: ["Properties of metals", "Reactivity series", "Extraction", "Corrosion"], questions: "assets/chemistry/chemistry-09-metals.pdf", answers: "assets/chemistry/chemistry-09-metals-answers.pdf" },
  { id: "chemistry-environment", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "10", title: "Chemistry of the Environment", count: 14, subtopics: ["Air and water", "Climate", "Industrial chemistry"], questions: "assets/chemistry/chemistry-10-environment.pdf", answers: "assets/chemistry/chemistry-10-environment-answers.pdf" },
  { id: "chemistry-organic", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "11", title: "Organic Chemistry", count: 56, subtopics: ["Hydrocarbons and fuels", "Functional groups", "Organic reactions", "Polymers"], questions: "assets/chemistry/chemistry-11-organic-chemistry.pdf", answers: "assets/chemistry/chemistry-11-organic-chemistry-answers.pdf" },
  { id: "chemistry-experimental", subject: "chemistry", code: "0620 · Extended · Topical practice", number: "12", title: "Experimental Techniques and Analysis", count: 1, subtopics: ["Separation methods", "Titration", "Chemical tests"], questions: "assets/chemistry/chemistry-12-experimental-analysis.pdf", answers: "assets/chemistry/chemistry-12-experimental-analysis-answers.pdf" },

  { id: "accounting-fundamentals", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "01", title: "The Fundamentals of Accounting", count: 0, subtopics: ["Purpose of accounting", "Accounting equation"], questions: "assets/accounting/accounting-01-fundamentals.pdf" },
  { id: "accounting-sources", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "02", title: "Sources and Recording of Data", count: 27, subtopics: ["Double-entry bookkeeping", "Books of prime entry"], questions: "assets/accounting/accounting-02-sources-recording.pdf", answers: "assets/accounting/accounting-02-sources-recording-answers.pdf" },
  { id: "accounting-verification", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "03", title: "Verification of Accounting Records", count: 28, subtopics: ["Correction of errors", "Bank reconciliation", "Control accounts"], questions: "assets/accounting/accounting-03-verification-records.pdf", answers: "assets/accounting/accounting-03-verification-records-answers.pdf" },
  { id: "accounting-procedures", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "04", title: "Accounting Procedures", count: 21, subtopics: ["Capital and revenue expenditure", "Depreciation and disposal", "Irrecoverable debts and provisions", "Valuation of inventory"], questions: "assets/accounting/accounting-04-procedures.pdf", answers: "assets/accounting/accounting-04-procedures-answers.pdf" },
  { id: "accounting-statements", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "05", title: "Preparation of Financial Statements", count: 41, subtopics: ["Sole traders", "Partnerships", "Limited companies", "Clubs and societies", "Manufacturing accounts", "Incomplete records"], questions: "assets/accounting/accounting-05-financial-statements.pdf", answers: "assets/accounting/accounting-05-financial-statements-answers.pdf" },
  { id: "accounting-analysis", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "06", title: "Analysis and Interpretation", count: 13, subtopics: ["Calculation of accounting ratios", "Understanding and interpreting ratios"], questions: "assets/accounting/accounting-06-analysis-interpretation.pdf", answers: "assets/accounting/accounting-06-analysis-interpretation-answers.pdf" },
  { id: "accounting-principles", subject: "accounting", code: "0452 · Paper 2 · Topical practice", number: "07", title: "Accounting Principles and Policies", count: 0, subtopics: ["Accounting principles", "Accounting policies"], questions: "assets/accounting/accounting-07-principles-policies.pdf" }
];

const subjectNames = { physics: "Physics", chemistry: "Chemistry", accounting: "Accounting" };

const PREMIUM_SALT_B64 = "bi9ewq1Qsgwb2gmuCH2G1Q==";
const PREMIUM_ITERATIONS = 210000;
const PREMIUM_CHECK_FILE = "premium-check.enc";
const PREMIUM_CHECK_TEXT = "USMAN_PREMIUM_ACCESS_V1";
let premiumKey = null;
let activeBlobUrl = null;

const topicGrid = document.querySelector("#topicGrid");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const activeFilterLabel = document.querySelector("#activeFilterLabel");
const emptyState = document.querySelector("#emptyState");
const pdfDialog = document.querySelector("#pdfDialog");
const pdfFrame = document.querySelector("#pdfFrame");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogSubject = document.querySelector("#dialogSubject");
const dialogDownload = document.querySelector("#dialogDownload");
const paywallDialog = document.querySelector("#paywallDialog");
const accessCodeForm = document.querySelector("#accessCodeForm");
const accessCodeInput = document.querySelector("#accessCode");
const accessMessage = document.querySelector("#accessMessage");
const unlockButton = document.querySelector("#unlockButton");
let activeSubject = "all";

const getCompleted = () => {
  try { return new Set(JSON.parse(localStorage.getItem("igcse-completed-topics") || "[]")); }
  catch { return new Set(); }
};

const saveCompleted = set => localStorage.setItem("igcse-completed-topics", JSON.stringify([...set]));

function icon(type) {
  if (type === "questions") return '<span aria-hidden="true">▤</span>';
  if (type === "answers") return '<span aria-hidden="true">✓</span>';
  return "";
}

function cardMarkup(topic) {
  const completed = getCompleted().has(topic.id);
  const shownSubtopics = topic.subtopics.slice(0, 4);
  const more = topic.subtopics.length - shownSubtopics.length;
  const countText = topic.count ? `${topic.count} question${topic.count === 1 ? "" : "s"}` : "Topic outline";
  const premium = topic.subject !== "accounting";
  const locked = premium && !premiumKey;
  const accessBadge = premium
    ? `<span class="access-badge premium-access">${locked ? "🔒 Premium" : "✓ Unlocked"}</span>`
    : `<span class="access-badge free-access">✓ Free</span>`;
  const questionButton = locked
    ? `<button class="card-button primary unlock-premium" type="button" data-title="${topic.title}"><span aria-hidden="true">🔒</span> Unlock</button>`
    : `<button class="card-button primary open-pdf" type="button" data-file="${topic.questions}" data-kind="Questions" data-title="${topic.title}">${icon("questions")} Questions</button>`;
  const answerButton = topic.answers
    ? (locked
      ? `<button class="card-button unlock-premium" type="button" data-title="${topic.title}"><span aria-hidden="true">🔒</span> Answers</button>`
      : `<button class="card-button open-pdf" type="button" data-file="${topic.answers}" data-kind="Answers" data-title="${topic.title}">${icon("answers")} Answers</button>`)
    : "";

  return `
    <article class="topic-card ${topic.subject} ${locked ? "locked-card" : ""}" data-id="${topic.id}">
      <div class="card-top">
        <div class="card-meta">
          <span class="subject-pill">${subjectNames[topic.subject]} ${topic.number}</span>
          <span class="question-count">${countText}</span>
        </div>
        <div class="access-row">${accessBadge}</div>
        <h3>${topic.title}</h3>
        <div class="topic-code">${topic.code}</div>
      </div>
      <ul class="subtopics">
        ${shownSubtopics.map(item => `<li>${item}</li>`).join("")}
        ${topic.subtopics.slice(4).map(item => `<li class="extra-subtopic" hidden>${item}</li>`).join("")}
      </ul>
      ${more > 0 ? `<button class="subtopics-toggle" type="button" data-more="${more}">+ ${more} more subtopic${more === 1 ? "" : "s"}</button>` : ""}
      <div class="card-actions">
        <div class="open-group">
          ${questionButton}
          ${answerButton}
        </div>
        <button class="card-button complete-button ${completed ? "completed" : ""}" type="button" data-complete="${topic.id}" aria-label="${completed ? "Mark topic incomplete" : "Mark topic complete"}" title="${completed ? "Completed" : "Mark complete"}">${completed ? "✓" : "○"}</button>
      </div>
    </article>`;
}

function renderTopics() {
  const term = searchInput.value.trim().toLowerCase();
  const filtered = topics.filter(topic => {
    const matchesSubject = activeSubject === "all" || topic.subject === activeSubject;
    const haystack = [topic.title, topic.code, subjectNames[topic.subject], ...topic.subtopics].join(" ").toLowerCase();
    return matchesSubject && haystack.includes(term);
  });
  topicGrid.innerHTML = filtered.map(cardMarkup).join("");
  resultCount.textContent = `${filtered.length} topic${filtered.length === 1 ? "" : "s"}`;
  activeFilterLabel.textContent = activeSubject === "all" ? "across all three subjects" : `in ${subjectNames[activeSubject]}`;
  emptyState.hidden = filtered.length !== 0;
  updateProgress();
}

function updateProgress() {
  const completed = getCompleted();
  const count = topics.filter(topic => completed.has(topic.id)).length;
  const percent = Math.round((count / topics.length) * 100);
  document.querySelector("#progressPercent").textContent = `${percent}%`;
  document.querySelector("#progressLabel").textContent = `${count} of ${topics.length} topics`;
  document.querySelector("#progressRing").style.setProperty("--progress", `${percent * 3.6}deg`);
}

function bytesFromBase64(value) {
  return Uint8Array.from(atob(value), char => char.charCodeAt(0));
}

async function derivePremiumKey(code) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(code.trim()),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: bytesFromBase64(PREMIUM_SALT_B64), iterations: PREMIUM_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

async function decryptPremiumFile(file, key) {
  const response = await fetch(file, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load premium file (${response.status})`);
  const encrypted = new Uint8Array(await response.arrayBuffer());
  if (encrypted.length < 29) throw new Error("Premium file is incomplete");
  const iv = encrypted.slice(0, 12);
  const payload = encrypted.slice(12);
  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, payload);
}

async function verifyAccessCode(code) {
  const key = await derivePremiumKey(code);
  const clear = await decryptPremiumFile(PREMIUM_CHECK_FILE, key);
  const text = new TextDecoder().decode(clear);
  if (text !== PREMIUM_CHECK_TEXT) throw new Error("Invalid access code");
  return key;
}

function showPaywall() {
  accessMessage.textContent = "";
  if (!paywallDialog.open) paywallDialog.showModal();
  setTimeout(() => accessCodeInput.focus(), 80);
}

function closePaywall() {
  if (paywallDialog.open) paywallDialog.close();
}

async function openPdf(file, title, kind) {
  const topic = topics.find(item => item.title === title && (item.questions === file || item.answers === file));
  const premium = topic && topic.subject !== "accounting";
  if (premium && !premiumKey) {
    showPaywall();
    return;
  }

  dialogTitle.textContent = `${title} — ${kind}`;
  dialogSubject.textContent = topic ? `${subjectNames[topic.subject]} ${topic.code.split("·")[0].trim()}` : "PDF";
  dialogDownload.download = file.split("/").pop();

  try {
    if (activeBlobUrl) {
      URL.revokeObjectURL(activeBlobUrl);
      activeBlobUrl = null;
    }

    if (premium) {
      dialogTitle.textContent = `${title} — Decrypting…`;
      const encryptedFile = file.replace(/\.pdf$/i, ".enc");
      const clear = await decryptPremiumFile(encryptedFile, premiumKey);
      activeBlobUrl = URL.createObjectURL(new Blob([clear], { type: "application/pdf" }));
      pdfFrame.src = `${activeBlobUrl}#view=FitH`;
      dialogDownload.href = activeBlobUrl;
      dialogTitle.textContent = `${title} — ${kind}`;
    } else {
      pdfFrame.src = `${file}#view=FitH`;
      dialogDownload.href = file;
    }

    pdfDialog.showModal();
    localStorage.setItem("igcse-last-opened", JSON.stringify({ file, title, kind }));
  } catch (error) {
    console.error(error);
    if (premium) {
      premiumKey = null;
      localStorage.removeItem("igcse-premium-code");
      renderTopics();
      showPaywall();
      accessMessage.textContent = "Your saved access has expired. Please enter the premium code again.";
      accessMessage.className = "access-message error";
    } else {
      alert("This PDF could not be opened. Please try again.");
    }
  }
}

document.querySelectorAll(".subject-tab").forEach(button => {
  button.addEventListener("click", () => {
    activeSubject = button.dataset.subject;
    document.querySelectorAll(".subject-tab").forEach(tab => {
      tab.classList.toggle("active", tab === button);
      tab.setAttribute("aria-selected", tab === button ? "true" : "false");
    });
    renderTopics();
  });
});

searchInput.addEventListener("input", renderTopics);

topicGrid.addEventListener("click", event => {
  const unlockPremiumButton = event.target.closest(".unlock-premium");
  if (unlockPremiumButton) {
    showPaywall();
    return;
  }
  const openButton = event.target.closest(".open-pdf");
  if (openButton) {
    openPdf(openButton.dataset.file, openButton.dataset.title, openButton.dataset.kind);
    return;
  }
  const completeButton = event.target.closest("[data-complete]");
  if (completeButton) {
    const completed = getCompleted();
    if (completed.has(completeButton.dataset.complete)) completed.delete(completeButton.dataset.complete);
    else completed.add(completeButton.dataset.complete);
    saveCompleted(completed);
    renderTopics();
    return;
  }
  const toggle = event.target.closest(".subtopics-toggle");
  if (toggle) {
    const card = toggle.closest(".topic-card");
    const extras = card.querySelectorAll(".extra-subtopic");
    const opening = extras[0]?.hidden;
    extras.forEach(item => item.hidden = !opening);
    toggle.textContent = opening ? "Show fewer subtopics" : `+ ${toggle.dataset.more} more subtopics`;
  }
});

document.querySelector("#dialogClose").addEventListener("click", () => pdfDialog.close());
pdfDialog.addEventListener("close", () => {
  pdfFrame.src = "about:blank";
  if (activeBlobUrl) {
    URL.revokeObjectURL(activeBlobUrl);
    activeBlobUrl = null;
  }
});
pdfDialog.addEventListener("click", event => {
  const box = pdfDialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) pdfDialog.close();
});

document.querySelector("#paywallClose").addEventListener("click", closePaywall);
paywallDialog.addEventListener("click", event => {
  const box = paywallDialog.querySelector(".paywall-shell").getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) closePaywall();
});

accessCodeForm.addEventListener("submit", async event => {
  event.preventDefault();
  const code = accessCodeInput.value.trim();
  if (!code) return;
  unlockButton.disabled = true;
  unlockButton.textContent = "Checking…";
  accessMessage.textContent = "Verifying your access code…";
  accessMessage.className = "access-message";
  try {
    premiumKey = await verifyAccessCode(code);
    localStorage.setItem("igcse-premium-code", code);
    accessMessage.textContent = "Premium access unlocked on this browser.";
    accessMessage.className = "access-message success";
    renderTopics();
    setTimeout(closePaywall, 700);
  } catch (error) {
    console.error(error);
    premiumKey = null;
    localStorage.removeItem("igcse-premium-code");
    accessMessage.textContent = "That code is not valid. Check it and try again.";
    accessMessage.className = "access-message error";
  } finally {
    unlockButton.disabled = false;
    unlockButton.textContent = "Unlock";
  }
});

document.querySelector("#continueButton").addEventListener("click", () => {
  try {
    const last = JSON.parse(localStorage.getItem("igcse-last-opened") || "null");
    if (last) openPdf(last.file, last.title, last.kind);
    else document.querySelector("#library").scrollIntoView({ behavior: "smooth" });
  } catch { document.querySelector("#library").scrollIntoView({ behavior: "smooth" }); }
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("igcse-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
themeToggle.querySelector(".theme-icon").textContent = document.body.classList.contains("dark") ? "☀" : "☾";
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("igcse-theme", dark ? "dark" : "light");
  themeToggle.querySelector(".theme-icon").textContent = dark ? "☀" : "☾";
});

async function initialisePremiumAccess() {
  const savedCode = localStorage.getItem("igcse-premium-code");
  if (savedCode) {
    try {
      premiumKey = await verifyAccessCode(savedCode);
    } catch {
      premiumKey = null;
      localStorage.removeItem("igcse-premium-code");
    }
  }
  renderTopics();
}

initialisePremiumAccess();
