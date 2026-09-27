/* ============================================================
   1. CONFIG
   ============================================================ */
const CONFIG = {
  // The day you two got together — powers the day counter.
  startDate: '2026-05-25',          // ← change this

  // Where the bucket list saves to.
  storageKey: 'rd-dreams-v1'
};


/* ============================================================
   2. YOUR CONTENT
   ============================================================ */

/* ---------- 2a. Reason categories (filter chips) ---------- */
const CATEGORIES = [
  { id: 'all',    label: 'All' },
  { id: 'who',    label: 'Who you are' },
  { id: 'feel',   label: 'How you make me feel' },
  { id: 'little', label: 'Little things' },
  { id: 'us',     label: 'Us' }
];

/* ---------- 2b. The reasons themselves ---------- */
const REASONS = [
  { category: 'who',    text: "Nee romba nalla ponnu" },
  { category: 'who',    text: "Summa ellathukum kovichipa cute ah irukum" },
  { category: 'who',    text: "Un kannu Romba azlaga irukum" },
  { category: 'who',    text: "Erkanavey azlaga ,kannadi pota romba azlaga irukaa ." },
  { category: 'who',    text: "Kannathula siricha dimple vilum adhu cute ah irukuumm" },
  { category: 'who',    text: "un kaadhuku crt ah oru thodu potruka adhum azlaga irukum" },

  { category: 'feel',   text: "vera ponnu kitta pesuna unnaku kovam varu paru ,adhu avlo pudikum enaku" },
  { category: 'feel',   text: "edhukuney theriyama kovichippa adhu nallarukum" },
  { category: 'feel',   text: "Naa mattu tha unakku full ah close ah irukanum" },
  { category: 'feel',   text: "Na adutha sem la mark eduka vekkurenu sonnadhu nallrunchi" },
  { category: 'feel',   text: "My husband nu sonna paaru apo la na parandhuten" },
  { category: 'feel',   text: "You are my safest place." },

  { category: 'little', text: "call la love you solla vekka paduva" },
  { category: 'little', text: "namba padikalam nu thonum na marandhuven nee the nyabaga paduthuva." },
  { category: 'little', text: " Friends kuda sanda potutu vandhu solluva " },
  { category: 'little', text: "Chinna visayathukula azla aramichiruva" },
  { category: 'little', text: "solra pechey keka mata , ice cream ah sapduva" },
  { category: 'little', text: "neeya photo anupuva adhalam nallarukum" },
  { category: 'little', text: "edhachum kovichikitena ooti vidava apdila pesi samalippa" },

  { category: 'us',     text: " Edho sanda potom na romba neram call la silent ah varuvom paaru yaru first pesuva nu nallaruku" },
  { category: 'us',     text: "konja vishayam la na share panna nee edho nenachipa nu pannamaten" },
  { category: 'us',     text: "ennaiya thitrapo la cute ah irukum" },
  { category: 'us',     text: "apram idhala panna nallarukum nu ketukuren adutha box la" },
  { category: 'us',     text: "Edho velai irundhu msg panna mudilana ,vela iruku konja nerathula vandhuruven nu sollitu po" },
  { category: 'us',     text: "Na vangi tharenu sonna vangiko ,unakku thana selavu panren adhula enna" },
  { category: 'us',     text: "Daily neraya reels anupu , na edhachu ketta thaa apram nu sonnalum annaikey thandhuru" },
  { category: 'us',     text: "Naa mattu tha unakku rombaa full close ah irukanum seriyaaa." }
];

/* ---------- 2c. Dreams data ---------- */
const DREAMS = {

  /* BUCKET LIST — each needs a unique id */
  bucketList: [
    { id: 'b01', text: 'Rendu perum onna ooru suthanum' },
    { id: 'b02', text: 'Theatre poi onna padam pakkanum' },
    { id: 'b03', text: 'Hotel poi nallaa sapdanuu' },
    { id: 'b04', text: 'na unakku ooti vidanum' },
    { id: 'b05', text: 'Rendu perum sendhu photo edukanum' },
    { id: 'b06', text: 'EN galarry la un photo neraya irukanum' },
    { id: 'b07', text: 'KALYANAM PANNIKANUM!!!' },
    { id: 'b08', text: 'Un kai ya pudichi nadakanum' },
    { id: 'b09', text: 'oru house katti anga irukanum' },
    { id: 'b10', text: 'Neraya pets vanganum' },
    { id: 'b11', text: 'oru garden vechi neraya plants valakanum' },
    { id: 'b12', text: 'Unakku daily edhachu vangi tharanum' },
    { id: 'b13', text: 'namba family ellaru happy ah irukanum' },
    { id: 'b14', text: 'namba rendu perum sendhu neraya ooru suthanum' },
    { id: 'b15', text: "Daily unta irundhu oru love you,hug,iss vanganum" }
  ],

  /* HOME BOARD — use `emoji` for a tile, or `img` for a photo.
     If both are present, `img` wins. */
  homeBoard: [
    { emoji: '🪟', caption: 'Balcony nalla perusa' },
    { emoji: '🌿', caption: 'Veliya periya garden' },
    { emoji: '📚', caption: 'Floor-to-ceiling bookshelves, half read, half aspirational' },
    { emoji: '🐕', caption: 'neraya petss uhh' },
    { emoji: '🌸', caption: 'Daily new flowers uh' },
    { emoji: '☕', caption: 'Eppaum tea iruka edam' }
  ]
};


/* ============================================================
   3. HELPERS
   ============================================================ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

function dayOfYear(d = new Date()) {
  return Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
}


/* ============================================================
   4. DAYS TOGETHER
   ============================================================ */
function renderDaysTogether() {
  const el = $('#days-together');
  if (!el) return;

  const start = new Date(CONFIG.startDate + 'T00:00:00');
  const days  = Math.floor((Date.now() - start.getTime()) / 86400000);

  if (isNaN(days) || days < 0) return;

  el.textContent = `${days.toLocaleString()} days of us`;
}


/* ============================================================
   5. FLOATING PETALS & BLUE HEARTS
   ============================================================ */
function spawnHearts() {
  const wrap = $('#hearts');
  if (!wrap) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = window.innerWidth < 600 ? 12 : 22;

  // Blue hearts + blossoms + leaves
  const glyphs = ['💙', '🌸', '🍃', '💙', '❀'];

  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    h.style.left              = Math.random() * 100 + '%';
    h.style.fontSize          = (0.8 + Math.random() * 1.1).toFixed(2) + 'rem';
    h.style.animationDuration = (11 + Math.random() * 13).toFixed(1) + 's';
    h.style.animationDelay    = (-Math.random() * 20).toFixed(1) + 's';
    wrap.appendChild(h);
  }
}


/* ============================================================
   6. SCROLL REVEAL
   ============================================================ */
function setupReveal() {
  const els = $$('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el) => io.observe(el));
}


/* ============================================================
   7. REASONS
   ============================================================ */
let activeFilter = 'all';
let flippedCount = 0;
let allFlipped   = false;

function initReasons() {
  renderFilterChips();
  renderReasonGrid();
  renderReasonOfTheDay();

  const randomButton = $('#random-btn');
  const flipAllButton = $('#flip-all-btn');
  if (randomButton) randomButton.addEventListener('click', surpriseMe);
  if (flipAllButton) flipAllButton.addEventListener('click', flipAll);
}

function renderReasonOfTheDay() {
  const el    = $('#rot-text');
  const label = $('#rot-label');
  if (!el || !REASONS.length) return;

  const idx = dayOfYear() % REASONS.length;
  el.textContent = REASONS[idx].text;
  if (label) label.textContent = 'Reason of the day';
}

function renderFilterChips() {
  const wrap = $('#reason-filters');
  if (!wrap) return;

  wrap.innerHTML = '';

  const used = new Set(REASONS.map((r) => r.category));
  const cats = CATEGORIES.filter((c) => c.id === 'all' || used.has(c.id));

  cats.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chip' + (cat.id === 'all' ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.textContent = cat.label;

    btn.addEventListener('click', () => {
      activeFilter = cat.id;
      $$('.chip', wrap).forEach((c) => c.classList.toggle('active', c === btn));
      applyFilter();
    });

    wrap.appendChild(btn);
  });
}

function renderReasonGrid() {
  const grid = $('#reason-grid');
  if (!grid) return;

  grid.innerHTML = '';
  flippedCount = 0;
  allFlipped   = false;

  REASONS.forEach((reason, i) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'reason-card';
    card.dataset.category = reason.category || 'all';
    card.setAttribute('aria-label', `Reason ${i + 1}. Tap to reveal.`);
card.innerHTML = `
  <span class="reason-front">
    <span class="reason-num">${i + 1}</span>
    <span>${escapeHtml(reason.text)}</span>
  </span>`;
   
    grid.appendChild(card);
  });

  updateCounter();
}

function applyFilter() {
  $$('.reason-card').forEach((card) => {
    const match = activeFilter === 'all' || card.dataset.category === activeFilter;
    card.classList.toggle('hidden', !match);
  });
}

function updateCounter() {
  const counter = $('#reason-counter');
  if (!counter) return;

  counter.textContent = `${flippedCount} of ${REASONS.length} revealed`;
}




/* ============================================================
   8. BUCKET LIST
   ============================================================ */
function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CONFIG.storageKey));
    if (parsed && typeof parsed === 'object') {
      return {
        done:    parsed.done    || {},
        custom:  Array.isArray(parsed.custom)  ? parsed.custom  : [],
        removed: Array.isArray(parsed.removed) ? parsed.removed : []
      };
    }
  } catch (e) {
    /* corrupted or empty — start fresh */
  }
  return { done: {}, custom: [], removed: [] };
}

function saveState(state) {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save — storage may be full or blocked.');
  }
}

function initBucketList() {
  const form = $('#bucket-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = $('#bucket-input');
    const text  = input.value.trim();
    if (!text) return;

    const state = loadState();
    state.custom.push({ id: 'c' + Date.now(), text });
    saveState(state);

    input.value = '';
    renderBucketList();
  });

  renderBucketList();
}

function renderBucketList() {
  const list = $('#bucket-list');
  if (!list) return;

  const state = loadState();

  const defaults = DREAMS.bucketList
    .filter((d) => !state.removed.includes(d.id))
    .map((d) => ({ ...d, custom: false }));

  const custom = state.custom.map((d) => ({ ...d, custom: true }));
  const all = [...defaults, ...custom];

  list.innerHTML = '';

  all.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'bucket-item' + (item.custom ? ' custom' : '');
    if (state.done[item.id]) li.classList.add('done');

    const id = 'bk-' + item.id;

    li.innerHTML = `
      <input type="checkbox" id="${id}" ${state.done[item.id] ? 'checked' : ''}>
      <label for="${id}">${escapeHtml(item.text)}</label>
      <button class="del" type="button" title="Remove" aria-label="Remove">&times;</button>`;

    li.querySelector('input').addEventListener('change', (e) => {
      const s = loadState();

      if (e.target.checked) s.done[item.id] = true;
      else delete s.done[item.id];

      saveState(s);
      li.classList.toggle('done', e.target.checked);
      updateProgress(all.length);
    });

    li.querySelector('.del').addEventListener('click', () => {
      const s = loadState();

      if (item.custom) {
        s.custom = s.custom.filter((c) => c.id !== item.id);
      } else {
        if (!s.removed.includes(item.id)) s.removed.push(item.id);
      }

      delete s.done[item.id];
      saveState(s);

      li.style.opacity = '0';
      li.style.transform = 'translateX(-20px)';

      setTimeout(renderBucketList, 220);
    });

    list.appendChild(li);
  });

  updateProgress(all.length);
}

function updateProgress(total) {
  const el = $('#bucket-progress');
  if (!el) return;

  const state = loadState();
  const done  = Object.keys(state.done).length;

  el.textContent = done === 0
    ? `${total} dreams on the list. Let's start.`
    : `${done} of ${total} checked off.`;
}


/* ============================================================
   9. HOME BOARD
   ============================================================ */
function renderHomeBoard() {
  const board = $('#home-board');
  if (!board) return;

  board.innerHTML = '';

  DREAMS.homeBoard.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'board-card';

    const media = item.img
      ? `<div class="board-media"><img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.caption || '')}" loading="lazy"></div>`
      : `<div class="board-media">${item.emoji || '✦'}</div>`;

    card.innerHTML = media + `<div class="board-caption">${escapeHtml(item.caption || '')}</div>`;
    board.appendChild(card);
  });
}


/* ============================================================
   10. BOOT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();

  renderDaysTogether();
  spawnHearts();
  setupReveal();
  initReasons();
  initBucketList();
  renderHomeBoard();
});