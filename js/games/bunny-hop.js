/* ── Bunny Hop ───────────────────────────────────── */
(() => {
  /* ── Bunny SVGs (side-view) ───────────────────── */
  const BUNNY_RUN1 = `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <!-- ears -->
    <ellipse cx="22" cy="10" rx="5" ry="14" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="22" cy="10" rx="2.5" ry="10" fill="#f4b8c1"/>
    <ellipse cx="34" cy="8" rx="4.5" ry="13" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="34" cy="8" rx="2.2" ry="9" fill="#f4b8c1"/>
    <!-- head -->
    <circle cx="28" cy="26" r="12" fill="#f0ece4"/>
    <!-- eye -->
    <circle cx="34" cy="24" r="3" fill="#2c3e50"/>
    <circle cx="35" cy="23" r="1" fill="#fff"/>
    <!-- nose -->
    <ellipse cx="39" cy="28" rx="2" ry="1.5" fill="#f4b8c1"/>
    <!-- whiskers -->
    <line x1="40" y1="26" x2="50" y2="24" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="28" x2="50" y2="28" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="30" x2="50" y2="32" stroke="#ccc" stroke-width="0.5"/>
    <!-- body -->
    <ellipse cx="25" cy="42" rx="14" ry="12" fill="#f0ece4"/>
    <!-- tail -->
    <circle cx="10" cy="38" r="5" fill="#fff"/>
    <!-- front leg forward -->
    <ellipse cx="34" cy="56" rx="4" ry="7" fill="#e8e4dc"/>
    <!-- back leg back -->
    <ellipse cx="18" cy="54" rx="5" ry="8" fill="#e8e4dc"/>
    <!-- foot -->
    <ellipse cx="36" cy="62" rx="6" ry="3" fill="#e8e4dc"/>
    <ellipse cx="16" cy="61" rx="6" ry="3" fill="#e8e4dc"/>
  </svg>`;

  const BUNNY_RUN2 = `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <!-- ears -->
    <ellipse cx="22" cy="10" rx="5" ry="14" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="22" cy="10" rx="2.5" ry="10" fill="#f4b8c1"/>
    <ellipse cx="34" cy="8" rx="4.5" ry="13" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="34" cy="8" rx="2.2" ry="9" fill="#f4b8c1"/>
    <!-- head -->
    <circle cx="28" cy="26" r="12" fill="#f0ece4"/>
    <!-- eye -->
    <circle cx="34" cy="24" r="3" fill="#2c3e50"/>
    <circle cx="35" cy="23" r="1" fill="#fff"/>
    <!-- nose -->
    <ellipse cx="39" cy="28" rx="2" ry="1.5" fill="#f4b8c1"/>
    <!-- whiskers -->
    <line x1="40" y1="26" x2="50" y2="24" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="28" x2="50" y2="28" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="30" x2="50" y2="32" stroke="#ccc" stroke-width="0.5"/>
    <!-- body -->
    <ellipse cx="25" cy="42" rx="14" ry="12" fill="#f0ece4"/>
    <!-- tail -->
    <circle cx="10" cy="38" r="5" fill="#fff"/>
    <!-- front leg back -->
    <ellipse cx="30" cy="56" rx="4" ry="7" fill="#e8e4dc"/>
    <!-- back leg forward -->
    <ellipse cx="22" cy="54" rx="5" ry="8" fill="#e8e4dc"/>
    <!-- foot -->
    <ellipse cx="32" cy="62" rx="6" ry="3" fill="#e8e4dc"/>
    <ellipse cx="20" cy="61" rx="6" ry="3" fill="#e8e4dc"/>
  </svg>`;

  const BUNNY_JUMP = `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
    <!-- ears -->
    <ellipse cx="22" cy="8" rx="5" ry="14" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="22" cy="8" rx="2.5" ry="10" fill="#f4b8c1"/>
    <ellipse cx="34" cy="6" rx="4.5" ry="13" fill="#f0ece4" stroke="#ddd" stroke-width="0.5"/>
    <ellipse cx="34" cy="6" rx="2.2" ry="9" fill="#f4b8c1"/>
    <!-- head -->
    <circle cx="28" cy="24" r="12" fill="#f0ece4"/>
    <!-- eye -->
    <circle cx="34" cy="22" r="3" fill="#2c3e50"/>
    <circle cx="35" cy="21" r="1" fill="#fff"/>
    <!-- nose -->
    <ellipse cx="39" cy="26" rx="2" ry="1.5" fill="#f4b8c1"/>
    <!-- whiskers -->
    <line x1="40" y1="24" x2="50" y2="22" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="26" x2="50" y2="26" stroke="#ccc" stroke-width="0.5"/>
    <line x1="40" y1="28" x2="50" y2="30" stroke="#ccc" stroke-width="0.5"/>
    <!-- body -->
    <ellipse cx="25" cy="40" rx="14" ry="11" fill="#f0ece4"/>
    <!-- tail -->
    <circle cx="10" cy="36" r="5" fill="#fff"/>
    <!-- legs tucked -->
    <ellipse cx="30" cy="50" rx="5" ry="5" fill="#e8e4dc"/>
    <ellipse cx="20" cy="50" rx="5" ry="5" fill="#e8e4dc"/>
    <!-- feet tucked up -->
    <ellipse cx="34" cy="54" rx="6" ry="2.5" fill="#e8e4dc"/>
    <ellipse cx="18" cy="54" rx="6" ry="2.5" fill="#e8e4dc"/>
  </svg>`;

  /* ── Obstacle SVGs ────────────────────────────── */
  const OBSTACLE_SVGS = {
    bush: `<svg viewBox="0 0 60 45" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="32" rx="28" ry="13" fill="#2d6a1e"/>
      <ellipse cx="20" cy="22" rx="16" ry="14" fill="#3a8a2e"/>
      <ellipse cx="38" cy="24" rx="14" ry="12" fill="#4a9e3a"/>
      <ellipse cx="28" cy="18" rx="12" ry="10" fill="#5ab84a"/>
      <circle cx="16" cy="26" r="3" fill="#4a9e3a" opacity="0.6"/>
      <circle cx="40" cy="20" r="2.5" fill="#6bc85a" opacity="0.5"/>
    </svg>`,
    fox: `<svg viewBox="0 0 60 55" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail -->
      <path d="M2 30 Q0 18 8 14 Q12 20 10 30 Q8 38 12 40Z" fill="#e87e24"/>
      <path d="M2 28 Q2 20 6 16 Q8 22 8 30" fill="#f5a623" opacity="0.6"/>
      <path d="M2 30 Q0 34 4 36" fill="#fff" opacity="0.7"/>
      <!-- Body -->
      <ellipse cx="28" cy="36" rx="18" ry="14" fill="#e87e24"/>
      <!-- Belly -->
      <ellipse cx="30" cy="40" rx="12" ry="8" fill="#fce4b8"/>
      <!-- Head -->
      <ellipse cx="48" cy="24" rx="11" ry="10" fill="#e87e24"/>
      <!-- Ears -->
      <path d="M42 16 L38 4 L44 12Z" fill="#e87e24"/>
      <path d="M42 14 L40 6 L44 12Z" fill="#333"/>
      <path d="M52 14 L54 2 L56 12Z" fill="#e87e24"/>
      <path d="M52 12 L54 4 L56 12Z" fill="#333"/>
      <!-- Snout -->
      <ellipse cx="54" cy="28" rx="6" ry="5" fill="#fce4b8"/>
      <!-- Nose -->
      <ellipse cx="58" cy="26" rx="2" ry="1.5" fill="#333"/>
      <!-- Eye -->
      <circle cx="48" cy="22" r="2.5" fill="#fff"/>
      <circle cx="49" cy="22" r="1.5" fill="#2c3e50"/>
      <circle cx="49.3" cy="21.5" r="0.5" fill="#fff"/>
      <!-- Mouth -->
      <path d="M55 29 Q56 31 58 29" stroke="#c0392b" stroke-width="0.8" fill="none"/>
      <!-- Front legs -->
      <rect x="36" y="44" width="5" height="10" rx="2" fill="#c0651a"/>
      <rect x="42" y="44" width="5" height="10" rx="2" fill="#c0651a"/>
      <!-- Back legs -->
      <rect x="16" y="44" width="5" height="10" rx="2" fill="#c0651a"/>
      <rect x="22" y="44" width="5" height="10" rx="2" fill="#c0651a"/>
      <!-- Paws -->
      <ellipse cx="38" cy="54" rx="3.5" ry="2" fill="#333"/>
      <ellipse cx="44" cy="54" rx="3.5" ry="2" fill="#333"/>
      <ellipse cx="18" cy="54" rx="3.5" ry="2" fill="#333"/>
      <ellipse cx="24" cy="54" rx="3.5" ry="2" fill="#333"/>
    </svg>`,
    rock: `<svg viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 38 L8 20 L18 10 L30 8 L40 14 L48 24 L48 38Z" fill="#8a7d6b"/>
      <path d="M8 38 L12 22 L22 14 L32 12 L42 18 L46 30 L46 38Z" fill="#7a6d5b"/>
      <path d="M15 38 L18 26 L28 18 L38 22 L42 32 L42 38Z" fill="#6a5d4b" opacity="0.5"/>
      <path d="M12 18 L18 14 L22 16" stroke="#9a8d7b" stroke-width="1" fill="none" opacity="0.5"/>
    </svg>`
  };

  /* ── Carrot SVG ───────────────────────────────── */
  const CARROT_SVG = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-45 30 30)">
      <!-- Leafy green top -->
      <path d="M24 18 Q20 4 26 2 Q30 6 28 16Z" fill="#27ae60"/>
      <path d="M30 16 Q30 0 34 0 Q36 4 32 16Z" fill="#2ecc71"/>
      <path d="M34 18 Q38 6 42 4 Q40 10 36 18Z" fill="#27ae60"/>
      <path d="M27 16 Q24 8 28 6 Q30 10 29 16Z" fill="#2ecc71" opacity="0.8"/>
      <path d="M33 16 Q36 8 38 8 Q37 12 34 16Z" fill="#2ecc71" opacity="0.8"/>
      <!-- Thick carrot body -->
      <path d="M22 20 Q20 22 22 30 Q24 42 30 56 Q36 42 38 30 Q40 22 38 20Z" fill="#f39c12"/>
      <path d="M24 20 Q22 24 24 32 Q26 44 30 56 Q28 44 26 32 Q24 24 26 20Z" fill="#e67e22" opacity="0.5"/>
      <!-- Highlight -->
      <path d="M32 22 Q34 24 34 30 Q34 36 32 40" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- Detail lines -->
      <line x1="26" y1="26" x2="34" y2="26" stroke="#d35400" stroke-width="0.8" opacity="0.4"/>
      <line x1="25" y1="32" x2="35" y2="32" stroke="#d35400" stroke-width="0.8" opacity="0.4"/>
      <line x1="27" y1="38" x2="33" y2="38" stroke="#d35400" stroke-width="0.8" opacity="0.3"/>
      <line x1="28" y1="44" x2="32" y2="44" stroke="#d35400" stroke-width="0.8" opacity="0.3"/>
    </g>
  </svg>`;

  /* ── Obstacle dimensions ─────────────────────── */
  const OBS_DIMS = {
    bush: { w: 60, h: 40, hx: 6, hy: 10, hw: 48, hh: 28 },
    fox:  { w: 55, h: 50, hx: 6, hy: 6, hw: 44, hh: 40 },
    rock: { w: 45, h: 35, hx: 5, hy: 8, hw: 35, hh: 24 }
  };
  const OBSTACLE_TYPES = ['bush', 'fox', 'rock'];
  const CARROT_W = 44;
  const CARROT_H = 44;

  /* ── Constants ────────────────────────────────── */
  const STORAGE_KEY = 'bunny-hop-best';
  const BASE_SPEED = 280;        // px/s horizontal scroll
  const GRAVITY = 1600;          // px/s²
  const JUMP_VEL_1 = -600;      // first jump
  const JUMP_VEL_2 = -500;      // double jump
  const BUNNY_W = 55;
  const BUNNY_H = 64;
  const WAVE_DURATION = 20;      // seconds per wave
  const WAVE_PAUSE = 2;          // seconds between waves
  const INVINCIBLE_TIME = 2;     // seconds

  /* ── State ────────────────────────────────────── */
  let W, H, groundY;
  let gameActive = false;
  let bunnyY = 0;
  let velY = 0;
  let jumpsUsed = 0;
  let hearts = 3;
  let score = 0;
  let bestScore = 0;
  let wave = 1;
  let waveTimer = 0;
  let wavePauseTimer = 0;
  let inWavePause = false;
  let speedMultiplier = 1.0;
  let invincibleTimer = 0;
  let bunnyFrame = 0;
  let bunnyFrameTimer = 0;
  let nextObstacleTime = 0;
  let nextCarrotTime = 0;
  let obstacles = [];
  let carrots = [];
  let lastTimestamp = 0;
  let animFrameId = null;
  let listeners = [];

  // Parallax offsets
  let hillsOffset = 0;
  let fenceOffset = 0;
  let groundOffset = 0;

  // DOM references
  let wrapperRef = null;
  let bunnyEl = null;
  let objectsLayer = null;
  let heartsEl = null;
  let scoreEl = null;
  let waveLabelEl = null;

  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  function loadBest() {
    try { return parseInt(localStorage.getItem(STORAGE_KEY)) || 0; } catch (e) { return 0; }
  }

  function saveBest() {
    try { localStorage.setItem(STORAGE_KEY, bestScore.toString()); } catch (e) {}
  }

  /* ── Background SVG ──────────────────────────── */
  function createBackgroundSVG() {
    return `<svg viewBox="0 0 800 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bhSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5c87a"/>
          <stop offset="40%" stop-color="#f0d99a"/>
          <stop offset="70%" stop-color="#c8e6a0"/>
          <stop offset="100%" stop-color="#87a96b"/>
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#bhSky)"/>
    </svg>`;
  }

  /* ── Parallax layers as repeating SVG patterns ─ */
  function createHillsSVG() {
    // Two copies for seamless scroll (each 800px wide)
    return `<svg viewBox="0 0 1600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:200%;height:100%;position:absolute;top:0;left:0;">
      ${hillsPattern(0)}
      ${hillsPattern(800)}
    </svg>`;
  }

  function hillsPattern(ox) {
    return `<g>
      <!-- far hills -->
      <ellipse cx="${ox+120}" cy="260" rx="140" ry="60" fill="#6b9e4a" opacity="0.5"/>
      <ellipse cx="${ox+350}" cy="270" rx="180" ry="55" fill="#5a8e3a" opacity="0.5"/>
      <ellipse cx="${ox+600}" cy="255" rx="160" ry="65" fill="#6b9e4a" opacity="0.5"/>
      <ellipse cx="${ox+780}" cy="268" rx="120" ry="50" fill="#5a8e3a" opacity="0.5"/>
      <!-- trees (rounded Pooh-style) -->
      <circle cx="${ox+100}" cy="220" r="30" fill="#4a8a3a" opacity="0.6"/>
      <circle cx="${ox+115}" cy="215" r="25" fill="#5a9a4a" opacity="0.6"/>
      <rect x="${ox+105}" y="240" width="6" height="20" fill="#8B6914" opacity="0.5"/>
      <circle cx="${ox+400}" cy="230" r="28" fill="#4a8a3a" opacity="0.6"/>
      <circle cx="${ox+385}" cy="225" r="22" fill="#5a9a4a" opacity="0.6"/>
      <rect x="${ox+397}" y="248" width="6" height="18" fill="#8B6914" opacity="0.5"/>
      <circle cx="${ox+680}" cy="218" r="32" fill="#4a8a3a" opacity="0.6"/>
      <circle cx="${ox+695}" cy="212" r="26" fill="#5a9a4a" opacity="0.6"/>
      <rect x="${ox+688}" y="242" width="6" height="22" fill="#8B6914" opacity="0.5"/>
    </g>`;
  }

  function createFenceSVG() {
    return `<svg viewBox="0 0 1600 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:200%;height:80px;position:absolute;bottom:60px;left:0;">
      ${fencePattern(0)}
      ${fencePattern(800)}
    </svg>`;
  }

  function fencePattern(ox) {
    let posts = '';
    for (let i = 0; i < 10; i++) {
      const x = ox + i * 85 + 20;
      posts += `<rect x="${x}" y="10" width="8" height="60" rx="2" fill="#a0784a"/>
                <rect x="${x-1}" y="8" width="10" height="6" rx="2" fill="#8B6914"/>`;
    }
    // rails
    return `<g>
      ${posts}
      <rect x="${ox}" y="22" width="800" height="5" rx="2" fill="#b89060"/>
      <rect x="${ox}" y="45" width="800" height="5" rx="2" fill="#b89060"/>
    </g>`;
  }

  function createGroundSVG() {
    return `<svg viewBox="0 0 1600 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="width:200%;height:100%;position:absolute;bottom:0;left:0;">
      <rect x="0" y="0" width="1600" height="100" fill="#5a8a3a"/>
      <rect x="0" y="0" width="1600" height="8" fill="#4a7a2a"/>
      <!-- grass tufts -->
      ${grassTufts(0)}
      ${grassTufts(800)}
    </svg>`;
  }

  function grassTufts(ox) {
    let tufts = '';
    for (let i = 0; i < 15; i++) {
      const x = ox + Math.floor(i * 55) + 10;
      const h = 6 + Math.floor((i * 7) % 5);
      tufts += `<path d="M${x} 8 L${x+3} ${8-h} L${x+6} 8" fill="#6baa4a" opacity="0.6"/>`;
    }
    return tufts;
  }

  /* ── Setup dimensions ─────────────────────────── */
  function setupDimensions(container) {
    const rect = container.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    groundY = H * 0.75;  // bunny stands at 75% of height
  }

  /* ── Spawn helpers ────────────────────────────── */
  function spawnObstacle() {
    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    const dims = OBS_DIMS[type];
    const el = document.createElement('div');
    el.className = 'bh-obstacle';
    el.innerHTML = OBSTACLE_SVGS[type];
    el.style.width = dims.w + 'px';
    el.style.height = dims.h + 'px';
    objectsLayer.appendChild(el);
    obstacles.push({
      el, type, x: W + 20,
      w: dims.w, h: dims.h
    });
  }

  function spawnCarrot() {
    const el = document.createElement('div');
    el.className = 'bh-carrot';
    el.innerHTML = CARROT_SVG;
    el.style.width = CARROT_W + 'px';
    el.style.height = CARROT_H + 'px';
    objectsLayer.appendChild(el);

    // 50% ground level, 50% floating at jump height
    const floating = Math.random() < 0.5;
    const y = floating
      ? groundY - BUNNY_H - 60 - Math.random() * 60
      : groundY - CARROT_H;

    carrots.push({
      el, x: W + 40 + Math.random() * 100,
      y, w: CARROT_W, h: CARROT_H
    });
  }

  /* ── Collision (AABB) ─────────────────────────── */
  function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  /* ── HUD updates ──────────────────────────────── */
  function updateHeartsDisplay() {
    if (!heartsEl) return;
    let s = '';
    for (let i = 0; i < 3; i++) {
      s += i < hearts ? '❤️' : '🖤';
    }
    heartsEl.textContent = s;
  }

  function updateScoreDisplay() {
    if (!scoreEl) return;
    scoreEl.textContent = '🥕 ' + score;
  }

  function updateWaveLabel() {
    if (!waveLabelEl) return;
    waveLabelEl.textContent = 'Wave ' + wave;
  }

  /* ── Wave management ──────────────────────────── */
  function getWaveSettings(w) {
    const spd = 1.0 + (w - 1) * 0.3;
    const minInterval = Math.max(0.8, 1.8 - (w - 1) * 0.4);
    const maxInterval = Math.max(1.0, 2.5 - (w - 1) * 0.5);
    return { spd, minInterval, maxInterval };
  }

  function startWave(w) {
    wave = w;
    const settings = getWaveSettings(w);
    speedMultiplier = settings.spd;
    waveTimer = WAVE_DURATION;
    inWavePause = false;
    nextObstacleTime = 0.8;
    nextCarrotTime = 1.5;
    updateWaveLabel();
  }

  function showWaveAnnouncement(w) {
    if (!wrapperRef) return;
    const el = document.createElement('div');
    el.className = 'bh-wave-announce';
    el.textContent = 'Wave ' + w + '!';
    wrapperRef.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }

  /* ── Start Screen ─────────────────────────────── */
  function createStartScreen(wrapper) {
    const el = document.createElement('div');
    el.className = 'bh-start';

    const title = document.createElement('div');
    title.className = 'bh-title';
    title.textContent = 'Bunny Hop';

    const best = document.createElement('div');
    best.className = 'bh-best-score';
    best.textContent = bestScore > 0 ? `Best: ${bestScore} 🥕` : '';

    const btn = document.createElement('button');
    btn.className = 'bh-play-btn';
    btn.textContent = 'PLAY';
    listen(btn, 'pointerup', () => startGame(wrapper, el));

    el.appendChild(title);
    el.appendChild(best);
    el.appendChild(btn);
    wrapper.appendChild(el);
    return el;
  }

  /* ── Start Game ───────────────────────────────── */
  function startGame(wrapper, startEl) {
    startEl.classList.add('hidden');
    const prev = wrapper.querySelector('.bh-gameover');
    if (prev) prev.remove();

    // Reset state
    gameActive = true;
    hearts = 3;
    score = 0;
    bunnyY = groundY;
    velY = 0;
    jumpsUsed = 0;
    invincibleTimer = 0;
    bunnyFrame = 0;
    bunnyFrameTimer = 0;
    hillsOffset = 0;
    fenceOffset = 0;
    groundOffset = 0;

    // Clear old objects
    obstacles.forEach(o => o.el.remove());
    carrots.forEach(o => o.el.remove());
    obstacles = [];
    carrots = [];

    // Objects layer
    if (!objectsLayer) {
      objectsLayer = document.createElement('div');
      objectsLayer.className = 'bh-objects-layer';
      wrapper.appendChild(objectsLayer);
    }

    // Bunny
    if (!bunnyEl) {
      bunnyEl = document.createElement('div');
      bunnyEl.className = 'bh-bunny';
      wrapper.appendChild(bunnyEl);
    }
    bunnyEl.style.width = BUNNY_W + 'px';
    bunnyEl.style.height = BUNNY_H + 'px';
    bunnyEl.innerHTML = BUNNY_RUN1;
    bunnyEl.classList.remove('invincible');

    // HUD
    if (!heartsEl) {
      const bar = document.createElement('div');
      bar.className = 'bh-score-bar';
      heartsEl = document.createElement('div');
      heartsEl.className = 'bh-hearts';
      scoreEl = document.createElement('div');
      scoreEl.className = 'bh-score';
      bar.appendChild(heartsEl);
      bar.appendChild(scoreEl);
      wrapper.appendChild(bar);
    }
    updateHeartsDisplay();
    updateScoreDisplay();

    // Wave label
    if (!waveLabelEl) {
      waveLabelEl = document.createElement('div');
      waveLabelEl.className = 'bh-wave-label';
      wrapper.appendChild(waveLabelEl);
    }

    // Tap zone for mobile
    if (!wrapper.querySelector('.bh-tap-zone')) {
      const tapZone = document.createElement('div');
      tapZone.className = 'bh-tap-zone';
      listen(tapZone, 'pointerdown', (e) => { e.preventDefault(); doJump(); });
      wrapper.appendChild(tapZone);
    }

    // Jump button (mobile)
    if (!wrapper.querySelector('.bh-jump-btn')) {
      const jumpBtn = document.createElement('button');
      jumpBtn.className = 'bh-jump-btn';
      jumpBtn.textContent = '⬆';
      listen(jumpBtn, 'pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); doJump(); });
      wrapper.appendChild(jumpBtn);
    }

    // Keyboard
    listen(document, 'keydown', onKeyDown);

    // Start wave 1
    startWave(1);
    showWaveAnnouncement(1);

    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(gameLoop);
  }

  /* ── Jump ──────────────────────────────────────── */
  function doJump() {
    if (!gameActive) return;
    if (jumpsUsed < 2) {
      velY = jumpsUsed === 0 ? JUMP_VEL_1 : JUMP_VEL_2;
      jumpsUsed++;
    }
  }

  function onKeyDown(e) {
    if (!gameActive) return;
    if (e.key === ' ' || e.key === 'ArrowUp') {
      e.preventDefault();
      doJump();
    }
  }

  /* ── Game Loop ────────────────────────────────── */
  function gameLoop(timestamp) {
    if (!gameActive) return;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    const speed = BASE_SPEED * speedMultiplier;

    // Wave pause
    if (inWavePause) {
      wavePauseTimer -= dt;
      if (wavePauseTimer <= 0) {
        startWave(wave + 1);
        showWaveAnnouncement(wave);
      }
      // Still update bunny physics during pause
      updateBunnyPhysics(dt);
      renderBunny();
      animFrameId = requestAnimationFrame(gameLoop);
      return;
    }

    // Wave timer
    waveTimer -= dt;
    if (waveTimer <= 0) {
      // End of wave → pause
      inWavePause = true;
      wavePauseTimer = WAVE_PAUSE;
      // Clear obstacles from screen
      obstacles.forEach(o => o.el.remove());
      obstacles = [];
      updateBunnyPhysics(dt);
      renderBunny();
      animFrameId = requestAnimationFrame(gameLoop);
      return;
    }

    // Invincibility timer
    if (invincibleTimer > 0) {
      invincibleTimer -= dt;
      if (invincibleTimer <= 0) {
        invincibleTimer = 0;
        if (bunnyEl) bunnyEl.classList.remove('invincible');
      }
    }

    // Parallax scrolling
    hillsOffset += speed * 0.15 * dt;
    fenceOffset += speed * 0.4 * dt;
    groundOffset += speed * 1.0 * dt;
    if (hillsOffset >= W) hillsOffset -= W;
    if (fenceOffset >= W) fenceOffset -= W;
    if (groundOffset >= W) groundOffset -= W;
    updateParallax();

    // Move obstacles
    for (const obs of obstacles) {
      obs.x -= speed * dt;
    }

    // Move carrots
    for (const c of carrots) {
      c.x -= speed * dt;
    }

    // Bunny physics
    updateBunnyPhysics(dt);

    // Bunny hitbox (inset for forgiveness)
    const bx = W * 0.15;
    const by = bunnyY - BUNNY_H;
    const bHitX = bx + 8;
    const bHitY = by + 6;
    const bHitW = BUNNY_W - 16;
    const bHitH = BUNNY_H - 10;

    // Collision with obstacles (using per-obstacle hitboxes)
    if (invincibleTimer <= 0) {
      for (const obs of obstacles) {
        const dims = OBS_DIMS[obs.type];
        const obsTopY = groundY - obs.h;
        if (aabb(bHitX, bHitY, bHitW, bHitH, obs.x + dims.hx, obsTopY + dims.hy, dims.hw, dims.hh)) {
          hearts--;
          updateHeartsDisplay();
          if (hearts <= 0) {
            gameOver();
            return;
          }
          invincibleTimer = INVINCIBLE_TIME;
          if (bunnyEl) bunnyEl.classList.add('invincible');
          break;
        }
      }
    }

    // Collect carrots
    for (let i = carrots.length - 1; i >= 0; i--) {
      const c = carrots[i];
      if (aabb(bHitX, bHitY, bHitW, bHitH, c.x, c.y, c.w, c.h)) {
        score++;
        updateScoreDisplay();
        c.el.remove();
        carrots.splice(i, 1);
      }
    }

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obs => {
      if (obs.x < -100) { obs.el.remove(); return false; }
      return true;
    });

    // Remove off-screen carrots
    carrots = carrots.filter(c => {
      if (c.x < -60) { c.el.remove(); return false; }
      return true;
    });

    // Spawn obstacles
    const settings = getWaveSettings(wave);
    nextObstacleTime -= dt;
    if (nextObstacleTime <= 0) {
      spawnObstacle();
      nextObstacleTime = settings.minInterval + Math.random() * (settings.maxInterval - settings.minInterval);
    }

    // Spawn carrots
    nextCarrotTime -= dt;
    if (nextCarrotTime <= 0) {
      spawnCarrot();
      nextCarrotTime = 1.0 + Math.random() * 1.5;
    }

    // Render
    renderAll();
    renderBunny();

    // Bunny run animation
    bunnyFrameTimer += dt;
    if (bunnyFrameTimer >= 0.15) {
      bunnyFrameTimer = 0;
      bunnyFrame = 1 - bunnyFrame;
    }

    animFrameId = requestAnimationFrame(gameLoop);
  }

  /* ── Physics ──────────────────────────────────── */
  function updateBunnyPhysics(dt) {
    velY += GRAVITY * dt;
    bunnyY += velY * dt;
    if (bunnyY >= groundY) {
      bunnyY = groundY;
      velY = 0;
      jumpsUsed = 0;
    }
  }

  /* ── Rendering ────────────────────────────────── */
  function updateParallax() {
    const hillsSvg = wrapperRef && wrapperRef.querySelector('.bh-hills-layer svg');
    const fenceSvg = wrapperRef && wrapperRef.querySelector('.bh-fence-layer svg');
    const groundSvg = wrapperRef && wrapperRef.querySelector('.bh-ground-layer svg');
    if (hillsSvg) hillsSvg.style.transform = `translateX(${-hillsOffset}px)`;
    if (fenceSvg) fenceSvg.style.transform = `translateX(${-fenceOffset}px)`;
    if (groundSvg) groundSvg.style.transform = `translateX(${-groundOffset}px)`;
  }

  function renderBunny() {
    if (!bunnyEl) return;
    const bx = W * 0.15;
    const by = bunnyY - BUNNY_H;
    bunnyEl.style.left = bx + 'px';
    bunnyEl.style.top = by + 'px';

    // Choose frame
    const isAirborne = bunnyY < groundY;
    if (isAirborne) {
      bunnyEl.innerHTML = BUNNY_JUMP;
    } else {
      bunnyEl.innerHTML = bunnyFrame === 0 ? BUNNY_RUN1 : BUNNY_RUN2;
    }
  }

  function renderAll() {
    for (const obs of obstacles) {
      obs.el.style.left = obs.x + 'px';
      obs.el.style.top = (groundY - obs.h) + 'px';
    }
    for (const c of carrots) {
      c.el.style.left = c.x + 'px';
      c.el.style.top = c.y + 'px';
    }
  }

  /* ── Game Over ────────────────────────────────── */
  function gameOver() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);

    if (score > bestScore) {
      bestScore = score;
      saveBest();
    }

    const overlay = document.createElement('div');
    overlay.className = 'bh-gameover';

    const crash = document.createElement('div');
    crash.className = 'bh-crash-text';
    crash.textContent = 'Oh no!';

    const scoreResult = document.createElement('div');
    scoreResult.className = 'bh-score-result';
    scoreResult.textContent = `Carrots: ${score} 🥕`;

    const bestResult = document.createElement('div');
    bestResult.className = 'bh-best-score';
    bestResult.textContent = `Best: ${bestScore} 🥕`;

    const btn = document.createElement('button');
    btn.className = 'bh-play-btn';
    btn.textContent = 'Play Again';
    listen(btn, 'pointerup', () => {
      overlay.remove();
      startGame(wrapperRef, { classList: { add() {} } });
    });

    const exitBtn = document.createElement('button');
    exitBtn.className = 'bh-exit-btn';
    exitBtn.textContent = 'Exit';
    listen(exitBtn, 'pointerup', () => App.showMenu());

    overlay.appendChild(crash);
    overlay.appendChild(scoreResult);
    overlay.appendChild(bestResult);
    overlay.appendChild(btn);
    overlay.appendChild(exitBtn);
    wrapperRef.appendChild(overlay);
  }

  /* ── Init ──────────────────────────────────────── */
  function init(container) {
    bestScore = loadBest();

    const wrapper = document.createElement('div');
    wrapper.className = 'bh-wrapper';
    container.appendChild(wrapper);
    wrapperRef = wrapper;

    setupDimensions(wrapper);

    // Background
    const bg = document.createElement('div');
    bg.className = 'bh-bg';
    bg.innerHTML = createBackgroundSVG();
    wrapper.appendChild(bg);

    // Parallax layers
    const hillsLayer = document.createElement('div');
    hillsLayer.className = 'bh-hills-layer';
    hillsLayer.innerHTML = createHillsSVG();
    wrapper.appendChild(hillsLayer);

    const fenceLayer = document.createElement('div');
    fenceLayer.className = 'bh-fence-layer';
    fenceLayer.innerHTML = createFenceSVG();
    wrapper.appendChild(fenceLayer);

    const groundLayer = document.createElement('div');
    groundLayer.className = 'bh-ground-layer';
    groundLayer.innerHTML = createGroundSVG();
    wrapper.appendChild(groundLayer);

    createStartScreen(wrapper);
  }

  /* ── Destroy ───────────────────────────────────── */
  function destroy() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);

    obstacles.forEach(o => o.el.remove());
    carrots.forEach(o => o.el.remove());
    obstacles = [];
    carrots = [];

    listeners.forEach(({ el, event, handler, opts }) => {
      el.removeEventListener(event, handler, opts);
    });
    listeners = [];

    if (score > bestScore) {
      bestScore = score;
      saveBest();
    }

    bunnyEl = null;
    objectsLayer = null;
    heartsEl = null;
    scoreEl = null;
    waveLabelEl = null;
    wrapperRef = null;
  }

  /* ── Register ──────────────────────────────────── */
  App.registerGame({
    id: 'bunny-hop',
    title: 'Bunny Hop',
    description: 'Hop over obstacles and collect carrots!',
    icon: '🐰',
    init,
    destroy
  });
})();
