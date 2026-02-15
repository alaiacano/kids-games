/* ── K-Pop Demon Hunters ─────────────────────────── */
(() => {
  /* ── Demon SVGs ──────────────────────────────────── */
  const DEMONS = [
    {
      name: 'Water Demon',
      svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="55" rx="28" ry="28" fill="#3498db"/>
        <ellipse cx="40" cy="60" rx="20" ry="18" fill="#5dade2"/>
        <path d="M22 30 Q17 14 23 8 Q25 20 27 28Z" fill="#85c1e9"/>
        <path d="M58 30 Q63 14 57 8 Q55 20 53 28Z" fill="#85c1e9"/>
        <ellipse cx="30" cy="48" rx="9" ry="10" fill="#fff"/>
        <ellipse cx="50" cy="48" rx="9" ry="10" fill="#fff"/>
        <circle cx="32" cy="50" r="5" fill="#2c3e50"/>
        <circle cx="52" cy="50" r="5" fill="#2c3e50"/>
        <circle cx="34" cy="48" r="2" fill="#fff"/>
        <circle cx="54" cy="48" r="2" fill="#fff"/>
        <path d="M30 65 Q40 73 50 65" fill="#1a1a2e"/>
        <path d="M34 65 L36 70 L38 65" fill="#fff"/>
        <path d="M42 65 L44 70 L46 65" fill="#fff"/>
        <ellipse cx="9" cy="40" rx="4" ry="5" fill="#85c1e9" opacity="0.7"/>
        <ellipse cx="71" cy="36" rx="3" ry="4" fill="#85c1e9" opacity="0.6"/>
        <ellipse cx="7" cy="56" rx="3" ry="4" fill="#aed6f1" opacity="0.5"/>
      </svg>`
    },
    {
      name: 'Fire Demon',
      svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="55" rx="28" ry="28" fill="#e74c3c"/>
        <ellipse cx="40" cy="60" rx="20" ry="18" fill="#f0776e"/>
        <path d="M22 30 Q15 10 23 4 Q22 18 25 28Z" fill="#f39c12"/>
        <path d="M19 26 Q17 14 21 7" stroke="#f1c40f" stroke-width="2" fill="none"/>
        <path d="M58 30 Q65 10 57 4 Q58 18 55 28Z" fill="#f39c12"/>
        <path d="M61 26 Q63 14 59 7" stroke="#f1c40f" stroke-width="2" fill="none"/>
        <ellipse cx="30" cy="48" rx="9" ry="10" fill="#fff"/>
        <ellipse cx="50" cy="48" rx="9" ry="10" fill="#fff"/>
        <circle cx="32" cy="50" r="5" fill="#2c3e50"/>
        <circle cx="52" cy="50" r="5" fill="#2c3e50"/>
        <circle cx="34" cy="48" r="2" fill="#fff"/>
        <circle cx="54" cy="48" r="2" fill="#fff"/>
        <path d="M22 40 L37 44" stroke="#7b241c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M58 40 L43 44" stroke="#7b241c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M28 65 Q40 75 52 65" fill="#1a1a2e"/>
        <path d="M33 65 L35 71 L37 65" fill="#fff"/>
        <path d="M43 65 L45 71 L47 65" fill="#fff"/>
        <path d="M10 50 Q5 42 10 34" stroke="#f39c12" stroke-width="2.5" fill="none" opacity="0.5" stroke-linecap="round"/>
        <path d="M70 48 Q75 40 70 32" stroke="#f39c12" stroke-width="2.5" fill="none" opacity="0.5" stroke-linecap="round"/>
      </svg>`
    },
    {
      name: 'Shadow Demon',
      svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="55" rx="28" ry="28" fill="#6c3483"/>
        <ellipse cx="40" cy="60" rx="20" ry="18" fill="#8e44ad"/>
        <path d="M22 30 Q13 16 19 6 Q22 18 25 28Z" fill="#4a235a"/>
        <path d="M58 30 Q67 16 61 6 Q58 18 55 28Z" fill="#4a235a"/>
        <ellipse cx="30" cy="48" rx="9" ry="10" fill="#f9e79f"/>
        <ellipse cx="50" cy="48" rx="9" ry="10" fill="#f9e79f"/>
        <ellipse cx="32" cy="50" rx="5" ry="6" fill="#f39c12"/>
        <ellipse cx="52" cy="50" rx="5" ry="6" fill="#f39c12"/>
        <ellipse cx="32" cy="50" rx="2.5" ry="4" fill="#1a1a2e"/>
        <ellipse cx="52" cy="50" rx="2.5" ry="4" fill="#1a1a2e"/>
        <path d="M22 42 Q30 38 38 43" stroke="#2c3e50" stroke-width="2.5" fill="none"/>
        <path d="M58 42 Q50 38 42 43" stroke="#2c3e50" stroke-width="2.5" fill="none"/>
        <path d="M32 66 Q40 72 48 66" fill="#1a1a2e"/>
        <path d="M35 66 L37 70 L39 66" fill="#fff"/>
        <path d="M41 66 L43 70 L45 66" fill="#fff"/>
        <path d="M12 54 Q6 48 10 40" stroke="#4a235a" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
        <path d="M68 52 Q74 46 70 38" stroke="#4a235a" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
        <path d="M8 64 Q4 58 8 50" stroke="#6c3483" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M72 62 Q76 56 72 48" stroke="#6c3483" stroke-width="2" fill="none" opacity="0.3"/>
      </svg>`
    }
  ];

  /* ── Slash effect SVG ────────────────────────────── */
  const SLASH_SVG = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q25 25 50 10" stroke="#b388ff" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path d="M10 50 Q25 25 50 10" stroke="#ffd700" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;

  /* ── Sword cursor SVG ────────────────────────────── */
  const SWORD_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
    <path d='M3 1L22 18L18 22L1 5Z' fill='#7b68ee'/>
    <path d='M4 2L21 17L19 19L2 4Z' fill='#9180f0' opacity='0.5'/>
    <rect x='16' y='17' width='12' height='3.5' rx='1.5' fill='#d4a43a' transform='rotate(-45 22 18.75)'/>
    <line x1='22' y1='22' x2='32' y2='32' stroke='#b8860b' stroke-width='4.5' stroke-linecap='round'/>
    <circle cx='33.5' cy='33.5' r='3' fill='#d4a43a'/>
    <circle cx='33' cy='33' r='1.5' fill='#c49530'/>
  </svg>`;

  /* ── City skyline SVG ────────────────────────────── */
  const SKYLINE_SVG = `<svg viewBox="0 0 800 200" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="60" width="50" height="140" rx="2" fill="#0d0221"/>
    <rect x="72" y="85" width="38" height="115" rx="2" fill="#150838"/>
    <rect x="118" y="40" width="32" height="160" rx="2" fill="#0d0221"/>
    <rect x="158" y="100" width="52" height="100" rx="2" fill="#150838"/>
    <rect x="218" y="65" width="42" height="135" rx="2" fill="#0d0221"/>
    <rect x="268" y="35" width="28" height="165" rx="2" fill="#1a0a3e"/>
    <rect x="304" y="80" width="56" height="120" rx="2" fill="#0d0221"/>
    <rect x="368" y="55" width="36" height="145" rx="2" fill="#150838"/>
    <rect x="412" y="95" width="48" height="105" rx="2" fill="#0d0221"/>
    <rect x="468" y="50" width="32" height="150" rx="2" fill="#1a0a3e"/>
    <rect x="508" y="75" width="52" height="125" rx="2" fill="#0d0221"/>
    <rect x="568" y="42" width="36" height="158" rx="2" fill="#150838"/>
    <rect x="612" y="90" width="42" height="110" rx="2" fill="#0d0221"/>
    <rect x="662" y="60" width="32" height="140" rx="2" fill="#1a0a3e"/>
    <rect x="702" y="80" width="48" height="120" rx="2" fill="#0d0221"/>
    <rect x="758" y="65" width="38" height="135" rx="2" fill="#150838"/>
    <g fill="#ffd700" opacity="0.3">
      <rect x="28" y="80" width="4" height="4" rx="0.5"/>
      <rect x="42" y="100" width="4" height="4" rx="0.5"/>
      <rect x="28" y="130" width="4" height="4" rx="0.5"/>
      <rect x="85" y="100" width="4" height="4" rx="0.5"/>
      <rect x="128" y="60" width="4" height="4" rx="0.5"/>
      <rect x="136" y="90" width="4" height="4" rx="0.5"/>
      <rect x="128" y="120" width="4" height="4" rx="0.5"/>
      <rect x="172" y="115" width="4" height="4" rx="0.5"/>
      <rect x="190" y="140" width="4" height="4" rx="0.5"/>
      <rect x="230" y="85" width="4" height="4" rx="0.5"/>
      <rect x="244" y="115" width="4" height="4" rx="0.5"/>
      <rect x="316" y="100" width="4" height="4" rx="0.5"/>
      <rect x="335" y="125" width="4" height="4" rx="0.5"/>
      <rect x="380" y="72" width="4" height="4" rx="0.5"/>
      <rect x="425" y="110" width="4" height="4" rx="0.5"/>
      <rect x="440" y="140" width="4" height="4" rx="0.5"/>
      <rect x="478" y="68" width="4" height="4" rx="0.5"/>
      <rect x="520" y="95" width="4" height="4" rx="0.5"/>
      <rect x="540" y="120" width="4" height="4" rx="0.5"/>
      <rect x="580" y="60" width="4" height="4" rx="0.5"/>
      <rect x="588" y="90" width="4" height="4" rx="0.5"/>
      <rect x="625" y="108" width="4" height="4" rx="0.5"/>
      <rect x="675" y="78" width="4" height="4" rx="0.5"/>
      <rect x="715" y="100" width="4" height="4" rx="0.5"/>
      <rect x="730" y="130" width="4" height="4" rx="0.5"/>
      <rect x="770" y="85" width="4" height="4" rx="0.5"/>
    </g>
  </svg>`;

  const STORAGE_KEY = 'demon-hunters-high-score';
  const HOLE_COUNT = 6;

  /* ── State ───────────────────────────────────────── */
  let score = 0;
  let highScore = 0;
  let gameActive = false;
  let spawnTimer = null;
  let spawnInterval = 2000;
  let visibleDuration = 2000;
  let demonsSpawned = 0;
  let holes = [];
  let listeners = [];
  let animTimers = [];
  let missed = 0;
  let elapsedSeconds = 0;
  let timerInterval = null;
  let scoreEl = null;
  let missedEl = null;
  let timerEl = null;
  let bestEl = null;
  let gameAreaRef = null;
  let bestDisplayRef = null;
  let wrapperRef = null;
  let startScreenRef = null;

  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  /* ── High score persistence ──────────────────────── */
  function loadHighScore() {
    try { return parseInt(localStorage.getItem(STORAGE_KEY)) || 0; } catch (e) { return 0; }
  }

  function saveHighScore() {
    try { localStorage.setItem(STORAGE_KEY, highScore.toString()); } catch (e) {}
  }

  /* ── Background ──────────────────────────────────── */
  function createBackground() {
    const bg = document.createElement('div');
    bg.className = 'dh-bg-layer';

    const skyline = document.createElement('div');
    skyline.className = 'dh-skyline';
    skyline.innerHTML = SKYLINE_SVG;
    bg.appendChild(skyline);

    const ground = document.createElement('div');
    ground.className = 'dh-ground';
    bg.appendChild(ground);

    const glitter = document.createElement('div');
    glitter.className = 'dh-glitter';
    for (let i = 0; i < 35; i++) {
      const dot = document.createElement('div');
      dot.className = 'glitter-dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 85 + '%';
      const size = 2 + Math.random() * 4;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.setProperty('--dur', (2 + Math.random() * 3) + 's');
      dot.style.setProperty('--del', (Math.random() * 4) + 's');
      dot.style.setProperty('--peak', (0.3 + Math.random() * 0.5));
      glitter.appendChild(dot);
    }
    bg.appendChild(glitter);

    return bg;
  }

  /* ── Start Screen ────────────────────────────────── */
  function createStartScreen(wrapper) {
    const start = document.createElement('div');
    start.className = 'dh-start';

    const title = document.createElement('div');
    title.className = 'dh-title';
    title.textContent = 'K-Pop Demon Hunters';

    bestEl = document.createElement('div');
    bestEl.className = 'dh-best-score';
    bestEl.textContent = highScore > 0 ? `Best: ${highScore}` : '';

    const playBtn = document.createElement('button');
    playBtn.className = 'dh-play-btn';
    playBtn.textContent = 'PLAY';
    listen(playBtn, 'pointerup', () => startGame(wrapper, start));

    start.appendChild(title);
    start.appendChild(bestEl);
    start.appendChild(playBtn);
    wrapper.appendChild(start);
    return start;
  }

  /* ── Game Screen ─────────────────────────────────── */
  function createGameScreen(wrapper) {
    const game = document.createElement('div');
    game.className = 'dh-game-area';

    // Sword cursor
    const encoded = encodeURIComponent(SWORD_SVG);
    game.style.cursor = `url("data:image/svg+xml,${encoded}") 2 2, crosshair`;

    // Score bar
    const scoreBar = document.createElement('div');
    scoreBar.className = 'dh-score-bar';

    timerEl = document.createElement('div');
    timerEl.className = 'dh-score dh-timer';
    timerEl.textContent = '0:00';
    scoreBar.appendChild(timerEl);

    scoreEl = document.createElement('div');
    scoreEl.className = 'dh-score';
    scoreEl.textContent = 'Score: 0';
    scoreBar.appendChild(scoreEl);

    missedEl = document.createElement('div');
    missedEl.className = 'dh-score dh-missed';
    missedEl.textContent = 'Missed: 0';
    scoreBar.appendChild(missedEl);

    const bestDisplay = document.createElement('div');
    bestDisplay.className = 'dh-score';
    bestDisplay.style.opacity = '0.5';
    bestDisplay.textContent = highScore > 0 ? `Best: ${highScore}` : '';
    bestDisplayRef = bestDisplay;
    scoreBar.appendChild(bestDisplay);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'dh-reset-btn';
    resetBtn.textContent = 'Reset';
    listen(resetBtn, 'pointerup', (e) => {
      e.stopPropagation();
      resetGame();
    });
    scoreBar.appendChild(resetBtn);

    game.appendChild(scoreBar);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'dh-grid';

    holes = [];
    for (let i = 0; i < HOLE_COUNT; i++) {
      const hole = document.createElement('div');
      hole.className = 'demon-hole';

      const holeTop = document.createElement('div');
      holeTop.className = 'hole-top';

      const sprite = document.createElement('div');
      sprite.className = 'demon-sprite';
      holeTop.appendChild(sprite);

      const portal = document.createElement('div');
      portal.className = 'hole-portal';

      hole.appendChild(holeTop);
      hole.appendChild(portal);
      grid.appendChild(hole);

      const holeData = { el: hole, sprite, occupied: false, timer: null };
      holes.push(holeData);

      listen(sprite, 'pointerdown', (e) => {
        e.preventDefault();
        if (holeData.occupied && sprite.classList.contains('popped')) {
          whackDemon(holeData, e, game, bestDisplay);
        }
      });
    }

    // Show slash on any click in game area
    listen(game, 'pointerdown', (e) => {
      if (!gameActive) return;
      showSlash(e.clientX, e.clientY, game);
    });

    game.appendChild(grid);
    wrapper.appendChild(game);
    return game;
  }

  /* ── Start Game ──────────────────────────────────── */
  function startGame(wrapper, startScreen) {
    startScreen.classList.add('hidden');
    startScreenRef = startScreen;
    wrapperRef = wrapper;
    score = 0;
    missed = 0;
    elapsedSeconds = 0;
    demonsSpawned = 0;
    spawnInterval = 2000;
    visibleDuration = 2000;
    gameActive = true;
    gameAreaRef = createGameScreen(wrapper);
    scheduleSpawn();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!gameActive) return;
      elapsedSeconds++;
      if (timerEl) timerEl.textContent = formatTime(elapsedSeconds);
    }, 1000);
  }

  /* ── Spawn Loop ──────────────────────────────────── */
  function scheduleSpawn() {
    if (!gameActive) return;
    spawnTimer = setTimeout(() => {
      if (!gameActive) return;
      spawnDemon();
      scheduleSpawn();
    }, spawnInterval);
  }

  function spawnDemon() {
    const available = holes.filter(h => !h.occupied);
    if (available.length === 0) return;

    const hole = available[Math.floor(Math.random() * available.length)];
    const demonType = DEMONS[Math.floor(Math.random() * DEMONS.length)];

    hole.occupied = true;
    hole.sprite.innerHTML = demonType.svg;
    hole.sprite.classList.remove('whacked');
    hole.sprite.classList.add('popped');

    demonsSpawned++;
    spawnInterval = Math.max(800, 2000 - demonsSpawned * 2);
    visibleDuration = Math.max(900, 2000 - demonsSpawned * 1.5);

    hole.timer = setTimeout(() => {
      hideDemon(hole);
    }, visibleDuration);
  }

  function hideDemon(hole) {
    if (!hole.occupied) return;
    clearTimeout(hole.timer);
    hole.sprite.classList.remove('popped');
    hole.occupied = false;
    missed++;
    if (missedEl) missedEl.textContent = `Missed: ${missed}`;
  }

  /* ── Whack! ──────────────────────────────────────── */
  function whackDemon(hole, event, gameEl, bestDisplay) {
    clearTimeout(hole.timer);
    hole.occupied = false;

    hole.sprite.classList.remove('popped');
    hole.sprite.classList.add('whacked');

    const t = setTimeout(() => {
      hole.sprite.classList.remove('whacked');
      hole.sprite.innerHTML = '';
    }, 450);
    animTimers.push(t);

    score++;
    if (scoreEl) scoreEl.textContent = `Score: ${score}`;

    if (score > highScore) {
      highScore = score;
      saveHighScore();
      if (bestDisplay) bestDisplay.textContent = `Best: ${highScore}`;
    }

    showScorePopup(event.clientX, event.clientY, gameEl);
  }

  /* ── Reset ─────────────────────────────────────── */
  function resetGame() {
    // Stop current spawns and clear all holes
    clearTimeout(spawnTimer);
    holes.forEach(h => {
      clearTimeout(h.timer);
      h.occupied = false;
      h.sprite.classList.remove('popped', 'whacked');
      h.sprite.innerHTML = '';
    });
    animTimers.forEach(t => clearTimeout(t));
    animTimers = [];

    // Reset counters
    score = 0;
    missed = 0;
    elapsedSeconds = 0;
    demonsSpawned = 0;
    spawnInterval = 2000;
    visibleDuration = 2000;

    // Update display
    if (scoreEl) scoreEl.textContent = 'Score: 0';
    if (missedEl) missedEl.textContent = 'Missed: 0';
    if (timerEl) timerEl.textContent = '0:00';

    // Restart
    startTimer();
    scheduleSpawn();
  }

  /* ── Effects ─────────────────────────────────────── */
  function showSlash(clientX, clientY, container) {
    const rect = container.getBoundingClientRect();
    const slash = document.createElement('div');
    slash.className = 'dh-slash';
    slash.innerHTML = SLASH_SVG;
    slash.style.left = (clientX - rect.left - 30) + 'px';
    slash.style.top = (clientY - rect.top - 30) + 'px';
    container.appendChild(slash);
    const t = setTimeout(() => slash.remove(), 320);
    animTimers.push(t);
  }

  function showScorePopup(clientX, clientY, container) {
    const rect = container.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.className = 'dh-score-pop';
    pop.textContent = '+1';
    pop.style.left = (clientX - rect.left - 10) + 'px';
    pop.style.top = (clientY - rect.top - 20) + 'px';
    container.appendChild(pop);
    const t = setTimeout(() => pop.remove(), 650);
    animTimers.push(t);
  }

  /* ── Init ────────────────────────────────────────── */
  function init(container) {
    highScore = loadHighScore();

    const wrapper = document.createElement('div');
    wrapper.className = 'dh-wrapper';
    wrapper.appendChild(createBackground());
    createStartScreen(wrapper);
    container.appendChild(wrapper);
  }

  /* ── Destroy ─────────────────────────────────────── */
  function destroy() {
    gameActive = false;
    clearTimeout(spawnTimer);
    clearInterval(timerInterval);
    holes.forEach(h => clearTimeout(h.timer));
    animTimers.forEach(t => clearTimeout(t));
    animTimers = [];
    holes = [];

    listeners.forEach(({ el, event, handler, opts }) => {
      el.removeEventListener(event, handler, opts);
    });
    listeners = [];

    if (score > highScore) {
      highScore = score;
      saveHighScore();
    }

    score = 0;
    missed = 0;
    elapsedSeconds = 0;
    scoreEl = null;
    missedEl = null;
    timerEl = null;
    bestEl = null;
    bestDisplayRef = null;
    gameAreaRef = null;
    wrapperRef = null;
    startScreenRef = null;
  }

  /* ── Register ────────────────────────────────────── */
  App.registerGame({
    id: 'demon-hunters',
    title: 'K-Pop Demon Hunters',
    description: 'Whack the demons with your sword!',
    icon: '⚔️',
    init,
    destroy
  });
})();
