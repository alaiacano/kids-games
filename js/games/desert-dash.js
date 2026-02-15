/* ── Desert Dash ──────────────────────────────────── */
(() => {
  /* ── Car SVGs (rear view) ────────────────────────── */
  const CAR_FRAME1 = `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="82" rx="13" ry="10" fill="#2c3e50"/>
    <ellipse cx="24" cy="82" rx="6" ry="4.5" fill="#666"/>
    <ellipse cx="96" cy="82" rx="13" ry="10" fill="#2c3e50"/>
    <ellipse cx="96" cy="82" rx="6" ry="4.5" fill="#666"/>
    <rect x="14" y="40" width="92" height="36" rx="6" fill="#4a69bd"/>
    <rect x="14" y="70" width="92" height="8" rx="2" fill="#3c5aa6"/>
    <rect x="28" y="26" width="64" height="18" rx="5" fill="#3c5aa6"/>
    <rect x="34" y="28" width="52" height="12" rx="4" fill="#aed6f1" opacity="0.6"/>
    <rect x="16" y="48" width="10" height="8" rx="3" fill="#e74c3c"/>
    <rect x="94" y="48" width="10" height="8" rx="3" fill="#e74c3c"/>
    <rect x="12" y="74" width="96" height="5" rx="2" fill="#95a5a6"/>
    <rect x="42" y="62" width="36" height="10" rx="2" fill="#f5f5f5"/>
    <text x="45" y="70" font-size="7" fill="#333" font-weight="bold" font-family="sans-serif">ACME</text>
    <rect x="44" y="6" width="32" height="24" rx="4" fill="#c0392b"/>
    <rect x="48" y="9" width="24" height="10" rx="2" fill="#e74c3c"/>
    <ellipse cx="60" cy="30" rx="10" ry="3.5" fill="#7f8c8d"/>
    <path d="M50 30 Q60 50 70 30" fill="#f39c12" opacity="0.9"/>
    <path d="M53 30 Q60 44 67 30" fill="#f1c40f"/>
    <path d="M56 30 Q60 38 64 30" fill="#fff5cc"/>
    <circle cx="32" cy="84" r="4" fill="rgba(180,180,180,0.3)"/>
    <circle cx="88" cy="84" r="4" fill="rgba(180,180,180,0.3)"/>
  </svg>`;

  const CAR_FRAME2 = `<svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="80" rx="13" ry="8" fill="#2c3e50"/>
    <ellipse cx="24" cy="80" rx="6" ry="3.5" fill="#666"/>
    <ellipse cx="96" cy="80" rx="13" ry="8" fill="#2c3e50"/>
    <ellipse cx="96" cy="80" rx="6" ry="3.5" fill="#666"/>
    <rect x="14" y="37" width="92" height="36" rx="6" fill="#4a69bd"/>
    <rect x="14" y="67" width="92" height="8" rx="2" fill="#3c5aa6"/>
    <rect x="28" y="23" width="64" height="18" rx="5" fill="#3c5aa6"/>
    <rect x="34" y="25" width="52" height="12" rx="4" fill="#aed6f1" opacity="0.6"/>
    <rect x="16" y="45" width="10" height="8" rx="3" fill="#e74c3c"/>
    <rect x="94" y="45" width="10" height="8" rx="3" fill="#e74c3c"/>
    <rect x="12" y="71" width="96" height="5" rx="2" fill="#95a5a6"/>
    <rect x="42" y="59" width="36" height="10" rx="2" fill="#f5f5f5"/>
    <text x="45" y="67" font-size="7" fill="#333" font-weight="bold" font-family="sans-serif">ACME</text>
    <rect x="44" y="3" width="32" height="24" rx="4" fill="#c0392b"/>
    <rect x="48" y="6" width="24" height="10" rx="2" fill="#e74c3c"/>
    <ellipse cx="60" cy="27" rx="10" ry="3.5" fill="#7f8c8d"/>
    <path d="M48 27 Q60 52 72 27" fill="#f39c12" opacity="0.9"/>
    <path d="M52 27 Q60 46 68 27" fill="#f1c40f"/>
    <path d="M55 27 Q60 40 65 27" fill="#fff5cc"/>
    <circle cx="36" cy="82" r="5" fill="rgba(180,180,180,0.25)"/>
    <circle cx="84" cy="83" r="5" fill="rgba(180,180,180,0.25)"/>
  </svg>`;

  /* ── Obstacle SVGs ───────────────────────────────── */
  const OBSTACLE_SVGS = {
    pothole: `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="15" rx="28" ry="13" fill="#444"/>
      <ellipse cx="30" cy="15" rx="22" ry="9" fill="#2a2a2a"/>
      <path d="M14 8 L18 14" stroke="#555" stroke-width="1.5"/>
      <path d="M40 10 L44 17" stroke="#555" stroke-width="1.5"/>
      <path d="M28 5 L30 12" stroke="#555" stroke-width="1"/>
    </svg>`,
    turtle: `<svg viewBox="0 0 50 55" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="35" rx="20" ry="16" fill="#27ae60"/>
      <ellipse cx="25" cy="35" rx="16" ry="12" fill="#2ecc71"/>
      <path d="M25 23 L18 35 L25 32Z" fill="#27ae60" opacity="0.5"/>
      <path d="M25 23 L32 35 L25 32Z" fill="#27ae60" opacity="0.3"/>
      <ellipse cx="25" cy="18" rx="8" ry="7" fill="#2ecc71"/>
      <circle cx="22" cy="16" r="2.5" fill="#fff"/>
      <circle cx="22" cy="16.5" r="1.3" fill="#2c3e50"/>
      <circle cx="28" cy="16" r="2.5" fill="#fff"/>
      <circle cx="28" cy="16.5" r="1.3" fill="#2c3e50"/>
      <path d="M23 22 Q25 24 27 22" stroke="#1a8c4e" stroke-width="1" fill="none"/>
      <ellipse cx="8" cy="32" rx="5" ry="4" fill="#2ecc71"/>
      <ellipse cx="42" cy="32" rx="5" ry="4" fill="#2ecc71"/>
      <ellipse cx="10" cy="42" rx="5" ry="4" fill="#2ecc71"/>
      <ellipse cx="40" cy="42" rx="5" ry="4" fill="#2ecc71"/>
    </svg>`,
    sign: `<svg viewBox="0 0 40 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="38" width="4" height="42" fill="#95a5a6"/>
      <polygon points="20,2 38,22 20,42 2,22" fill="#f1c40f" stroke="#333" stroke-width="2"/>
      <rect x="17" y="12" width="6" height="16" rx="2" fill="#333"/>
      <circle cx="20" cy="34" r="3" fill="#333"/>
    </svg>`,
    oldlady: `<svg viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 38 L11 68 L39 68 L34 38Z" fill="#8e44ad"/>
      <rect x="18" y="28" width="14" height="16" rx="4" fill="#8e44ad"/>
      <circle cx="25" cy="22" r="10" fill="#f5cba7"/>
      <circle cx="25" cy="14" r="7" fill="#bbb"/>
      <circle cx="22" cy="22" r="4" fill="none" stroke="#555" stroke-width="1.5"/>
      <circle cx="28" cy="22" r="4" fill="none" stroke="#555" stroke-width="1.5"/>
      <circle cx="22" cy="22" r="1.5" fill="#2c3e50"/>
      <circle cx="28" cy="22" r="1.5" fill="#2c3e50"/>
      <path d="M22 27 Q25 29 28 27" stroke="#c0392b" stroke-width="1" fill="none"/>
      <line x1="37" y1="38" x2="41" y2="70" stroke="#8B4513" stroke-width="3" stroke-linecap="round"/>
      <path d="M37 38 Q34 33 37 30" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/>
      <rect x="6" y="42" width="10" height="12" rx="3" fill="#c0392b"/>
      <path d="M8 42 Q11 37 14 42" stroke="#a93226" stroke-width="1.5" fill="none"/>
      <rect x="14" y="64" width="6" height="8" fill="#f5cba7"/>
      <rect x="30" y="64" width="6" height="8" fill="#f5cba7"/>
      <rect x="12" y="70" width="10" height="6" rx="3" fill="#2c3e50"/>
      <rect x="28" y="70" width="10" height="6" rx="3" fill="#2c3e50"/>
    </svg>`
  };

  /* ── Scenery SVGs ────────────────────────────────── */
  const SCENERY_SVGS = {
    cactus: `<svg viewBox="0 0 40 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="12" width="10" height="63" rx="5" fill="#27ae60"/>
      <path d="M16 38 L9 38 Q5 38 5 33 L5 22 Q5 17 9 17 Q13 17 13 22 L13 38" fill="#2ecc71"/>
      <path d="M26 48 L33 48 Q37 48 37 43 L37 30 Q37 25 33 25 Q29 25 29 30 L29 48" fill="#2ecc71"/>
      <g stroke="#1a8c4e" stroke-width="1">
        <line x1="15" y1="22" x2="11" y2="20"/><line x1="15" y1="32" x2="11" y2="30"/>
        <line x1="27" y1="28" x2="31" y2="26"/><line x1="27" y1="42" x2="31" y2="40"/>
        <line x1="15" y1="52" x2="11" y2="50"/><line x1="27" y1="58" x2="31" y2="56"/>
      </g>
    </svg>`,
    rock: `<svg viewBox="0 0 60 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 45 L10 22 L22 10 L32 16 L42 5 L52 16 L58 26 L60 45Z" fill="#CD853F"/>
      <path d="M10 45 L16 28 L28 18 L38 22 L48 14 L55 32 L58 45Z" fill="#A0522D"/>
      <path d="M18 45 L22 32 L32 24 L42 28 L50 36 L52 45Z" fill="#8B4513" opacity="0.5"/>
    </svg>`
  };

  const OBSTACLE_TYPES = ['pothole', 'turtle', 'sign', 'oldlady'];
  const SCENERY_TYPES = ['cactus', 'rock'];

  /* ── Obstacle dimensions (base size at full scale) ── */
  const OBS_DIMS = {
    pothole: { w: 110, h: 44 },
    turtle:  { w: 100, h: 107 },
    sign:    { w: 70, h: 143 },
    oldlady: { w: 90, h: 146 }
  };

  const SCEN_DIMS = {
    cactus: { w: 180, h: 360 },
    rock:   { w: 300, h: 228 }
  };

  const STORAGE_KEY = 'desert-dash-best';
  const CAR_T = 0.92;
  const COLLISION_MIN = 0.84;
  const COLLISION_MAX = 0.97;
  const BASE_SPEED = 0.32;

  /* ── State ───────────────────────────────────────── */
  let W, H, horizonY, roadTopW, roadBottomW;
  let gameActive = false;
  let elapsedMs = 0;
  let playerLane = 1;
  let speedMultiplier = 1.0;
  let speedLevel = 0;
  let obstacleCount = 0;
  let carFrame = 0;
  let carFrameTimer = 0;
  let objects = [];
  let nextObstacleTime = 1.5;
  let nextSceneryTime = 0.3;
  let nextDashTime = 0;
  let bestTime = 0;
  let lastTimestamp = 0;
  let animFrameId = null;
  let listeners = [];
  let carEl = null;
  let objectsLayer = null;
  let timerEl = null;
  let wrapperRef = null;
  let carW, carH;

  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function loadBestTime() {
    try { return parseInt(localStorage.getItem(STORAGE_KEY)) || 0; } catch (e) { return 0; }
  }

  function saveBestTime() {
    try { localStorage.setItem(STORAGE_KEY, bestTime.toString()); } catch (e) {}
  }

  /* ── Perspective math ────────────────────────────── */
  function perspective(t) {
    return Math.pow(t, 1.5);
  }

  function getObjPos(t, lane) {
    const p = perspective(t);
    const y = horizonY + (H - horizonY) * p;
    const roadW = roadTopW + (roadBottomW - roadTopW) * p;
    const laneW = roadW / 3;
    const roadLeft = (W - roadW) / 2;
    const x = roadLeft + laneW * lane + laneW / 2;
    const scale = 0.12 + 0.88 * p;
    return { x, y, scale };
  }

  function getDashPos(t, divider) {
    const p = perspective(t);
    const y = horizonY + (H - horizonY) * p;
    const roadW = roadTopW + (roadBottomW - roadTopW) * p;
    const laneW = roadW / 3;
    const roadLeft = (W - roadW) / 2;
    const x = roadLeft + laneW * (divider + 1);
    const scale = 0.12 + 0.88 * p;
    return { x, y, scale };
  }

  function getSceneryPos(t, side, offset) {
    const p = perspective(t);
    const y = horizonY + (H - horizonY) * p;
    const roadW = roadTopW + (roadBottomW - roadTopW) * p;
    const cx = W / 2;
    const edgeDist = offset * (0.3 + 0.7 * p);
    const x = side === 'left'
      ? cx - roadW / 2 - edgeDist
      : cx + roadW / 2 + edgeDist;
    const scale = 0.12 + 0.88 * p;
    return { x, y, scale };
  }

  /* ── Setup dimensions ────────────────────────────── */
  function setupDimensions(container) {
    const rect = container.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    horizonY = H * 0.32;
    roadTopW = W * 0.12;
    roadBottomW = W * 0.65;
    carW = Math.min(100, W * 0.12);
    carH = carW * 0.83;
  }

  /* ── Background SVG ──────────────────────────────── */
  function createBackgroundSVG() {
    const hy = 160, rTop = 48, rBot = 260, cx = 400;
    return `<svg viewBox="0 0 800 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ddSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#87CEEB"/>
          <stop offset="55%" stop-color="#e8c87a"/>
          <stop offset="100%" stop-color="#deb887"/>
        </linearGradient>
      </defs>
      <rect width="800" height="${hy + 10}" fill="url(#ddSky)"/>
      <path d="M0 ${hy} L40 ${hy} L65 ${hy-35} L95 ${hy-42} L120 ${hy-42} L145 ${hy} L210 ${hy} L240 ${hy-55} L270 ${hy-48} L290 ${hy-48} L310 ${hy-35} L340 ${hy} L480 ${hy} L510 ${hy-40} L540 ${hy-50} L565 ${hy-50} L585 ${hy-35} L605 ${hy} L710 ${hy} L730 ${hy-30} L755 ${hy-35} L775 ${hy-30} L800 ${hy}" fill="#CD853F"/>
      <path d="M0 ${hy} L70 ${hy} L90 ${hy-20} L125 ${hy-25} L150 ${hy} L370 ${hy} L395 ${hy-45} L415 ${hy-55} L435 ${hy-55} L455 ${hy-40} L475 ${hy} L640 ${hy} L665 ${hy-22} L695 ${hy-28} L720 ${hy}" fill="#A0522D" opacity="0.65"/>
      <rect y="${hy-4}" width="800" height="${504-hy}" fill="#EDC9AF"/>
      <polygon points="${cx-rTop},${hy} ${cx+rTop},${hy} ${cx+rBot},500 ${cx-rBot},500" fill="#666"/>
      <line x1="${cx-rTop}" y1="${hy}" x2="${cx-rBot}" y2="500" stroke="#ccc" stroke-width="2"/>
      <line x1="${cx+rTop}" y1="${hy}" x2="${cx+rBot}" y2="500" stroke="#ccc" stroke-width="2"/>
    </svg>`;
  }

  /* ── Start Screen ────────────────────────────────── */
  function createStartScreen(wrapper) {
    const el = document.createElement('div');
    el.className = 'dd-start';
    const title = document.createElement('div');
    title.className = 'dd-title';
    title.textContent = 'Desert Dash';
    const best = document.createElement('div');
    best.className = 'dd-best-time';
    best.textContent = bestTime > 0 ? `Best: ${bestTime}` : '';
    const btn = document.createElement('button');
    btn.className = 'dd-play-btn';
    btn.textContent = 'PLAY';
    listen(btn, 'pointerup', () => startGame(wrapper, el));
    const clearBtn = document.createElement('button');
    clearBtn.className = 'dd-clear-best';
    clearBtn.textContent = 'Clear Best';
    if (bestTime <= 0) clearBtn.style.display = 'none';
    listen(clearBtn, 'pointerup', () => {
      bestTime = 0;
      saveBestTime();
      best.textContent = '';
      clearBtn.style.display = 'none';
    });
    el.appendChild(title);
    el.appendChild(best);
    el.appendChild(btn);
    el.appendChild(clearBtn);
    wrapper.appendChild(el);
    return el;
  }

  /* ── Start / Reset Game ──────────────────────────── */
  function startGame(wrapper, startEl) {
    startEl.classList.add('hidden');
    // Remove any previous game over
    const prev = wrapper.querySelector('.dd-gameover');
    if (prev) prev.remove();

    // Reset state
    gameActive = true;
    elapsedMs = 0;
    playerLane = 1;
    speedMultiplier = 1.0;
    speedLevel = 0;
    obstacleCount = 0;
    carFrame = 0;
    carFrameTimer = 0;
    nextObstacleTime = 1.5;
    nextSceneryTime = 0.3;
    nextDashTime = 0;

    // Clear old objects
    objects.forEach(o => o.el.remove());
    objects = [];

    // Create game elements if needed
    if (!objectsLayer) {
      objectsLayer = document.createElement('div');
      objectsLayer.className = 'dd-objects-layer';
      wrapper.appendChild(objectsLayer);
    }

    if (!carEl) {
      carEl = document.createElement('div');
      carEl.className = 'dd-car';
      wrapper.appendChild(carEl);
    }
    carEl.style.width = carW + 'px';
    carEl.style.height = carH + 'px';
    carEl.innerHTML = CAR_FRAME1;
    updateCarPosition();

    if (!timerEl) {
      timerEl = document.createElement('div');
      timerEl.className = 'dd-timer-display';
      wrapper.appendChild(timerEl);
    }
    timerEl.textContent = '0';

    // Touch controls
    if (!wrapper.querySelector('.dd-touch-controls')) {
      const controls = document.createElement('div');
      controls.className = 'dd-touch-controls';
      const leftBtn = document.createElement('button');
      leftBtn.className = 'dd-touch-btn';
      leftBtn.innerHTML = '&#9664;';
      listen(leftBtn, 'pointerdown', (e) => { e.preventDefault(); movePlayer('left'); });
      const rightBtn = document.createElement('button');
      rightBtn.className = 'dd-touch-btn';
      rightBtn.innerHTML = '&#9654;';
      listen(rightBtn, 'pointerdown', (e) => { e.preventDefault(); movePlayer('right'); });
      controls.appendChild(leftBtn);
      controls.appendChild(rightBtn);
      wrapper.appendChild(controls);
    }

    // Keyboard
    listen(document, 'keydown', onKeyDown);

    lastTimestamp = performance.now();
    animFrameId = requestAnimationFrame(gameLoop);
  }

  /* ── Player movement ─────────────────────────────── */
  function movePlayer(dir) {
    if (!gameActive) return;
    if (dir === 'left' && playerLane > 0) {
      playerLane--;
      updateCarPosition();
    } else if (dir === 'right' && playerLane < 2) {
      playerLane++;
      updateCarPosition();
    }
  }

  function updateCarPosition() {
    if (!carEl) return;
    const pos = getObjPos(CAR_T, playerLane);
    carEl.style.left = (pos.x - carW / 2) + 'px';
    carEl.style.top = (pos.y - carH) + 'px';
  }

  function onKeyDown(e) {
    if (!gameActive) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); movePlayer('left'); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); movePlayer('right'); }
  }

  /* ── Game Loop ───────────────────────────────────── */
  function gameLoop(timestamp) {
    if (!gameActive) return;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    elapsedMs += dt * 1000;
    if (timerEl) timerEl.textContent = obstacleCount;

    updateSpeed();

    const speed = BASE_SPEED * speedMultiplier;

    // Move objects
    for (const obj of objects) {
      obj.t += speed * dt;
    }

    // Check collision
    if (checkCollision()) {
      gameOver();
      return;
    }

    // Remove off-screen
    objects = objects.filter(obj => {
      if (obj.t > 1.15) {
        if (obj.kind === 'obstacle') obstacleCount++;
        obj.el.remove();
        return false;
      }
      return true;
    });

    // Spawn
    maybeSpawnObstacle(dt);
    maybeSpawnScenery(dt);
    maybeSpawnDashes(dt);

    // Car bounce
    carFrameTimer += dt;
    if (carFrameTimer >= 0.15) {
      carFrameTimer = 0;
      carFrame = 1 - carFrame;
      if (carEl) carEl.innerHTML = carFrame === 0 ? CAR_FRAME1 : CAR_FRAME2;
    }

    // Render
    renderAll();

    animFrameId = requestAnimationFrame(gameLoop);
  }

  /* ── Speed management ────────────────────────────── */
  function updateSpeed() {
    // Ramp up 10% for every 10 obstacles dodged
    const ramp = 1.0 + Math.floor(obstacleCount / 10) * 0.2;

    // Time-based boosts on top
    const sec = elapsedMs / 1000;
    let timeBoost = 1.0;
    if (sec >= 300) timeBoost = 1.8;
    else if (sec >= 180) timeBoost = 1.4;

    const newMultiplier = Math.max(ramp, timeBoost);
    const newLevel = Math.floor(obstacleCount / 10);

    if (newLevel > speedLevel) {
      speedLevel = newLevel;
      showSpeedAlert();
    }
    speedMultiplier = newMultiplier;
  }

  function showSpeedAlert() {
    if (!wrapperRef) return;
    const el = document.createElement('div');
    el.className = 'dd-speed-alert';
    el.textContent = 'FASTER!';
    wrapperRef.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  /* ── Spawning ────────────────────────────────────── */
  function maybeSpawnObstacle(dt) {
    nextObstacleTime -= dt;
    if (nextObstacleTime <= 0) {
      const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
      // 50% chance obstacle spawns in player's lane, 25% each for the others
      let lane;
      if (Math.random() < 0.5) {
        lane = playerLane;
      } else {
        const others = [0, 1, 2].filter(l => l !== playerLane);
        lane = others[Math.floor(Math.random() * others.length)];
      }
      const el = document.createElement('div');
      el.className = 'dd-obstacle';
      el.innerHTML = OBSTACLE_SVGS[type];
      objectsLayer.appendChild(el);
      objects.push({
        kind: 'obstacle', subtype: type, el, t: 0, lane,
        baseW: OBS_DIMS[type].w, baseH: OBS_DIMS[type].h
      });
      nextObstacleTime = (1.2 + Math.random() * 1.5) / speedMultiplier;
    }
  }

  function maybeSpawnScenery(dt) {
    nextSceneryTime -= dt;
    if (nextSceneryTime <= 0) {
      const type = SCENERY_TYPES[Math.floor(Math.random() * SCENERY_TYPES.length)];
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const offset = 80 + Math.random() * 100;
      const el = document.createElement('div');
      el.className = 'dd-scenery';
      el.innerHTML = SCENERY_SVGS[type];
      objectsLayer.appendChild(el);
      objects.push({
        kind: 'scenery', subtype: type, el, t: 0, side, offset,
        baseW: SCEN_DIMS[type].w, baseH: SCEN_DIMS[type].h
      });
      nextSceneryTime = 0.6 + Math.random() * 1.0;
    }
  }

  function maybeSpawnDashes(dt) {
    nextDashTime -= dt;
    if (nextDashTime <= 0) {
      for (let d = 0; d < 2; d++) {
        const el = document.createElement('div');
        el.className = 'dd-road-dash';
        objectsLayer.appendChild(el);
        objects.push({ kind: 'dash', el, t: 0, divider: d });
      }
      nextDashTime = 0.2;
    }
  }

  /* ── Rendering ───────────────────────────────────── */
  function renderAll() {
    for (const obj of objects) {
      if (obj.kind === 'dash') {
        const pos = getDashPos(obj.t, obj.divider);
        const h = 14 * pos.scale;
        const w = Math.max(1, 3 * pos.scale);
        obj.el.style.left = (pos.x - w / 2) + 'px';
        obj.el.style.top = (pos.y - h / 2) + 'px';
        obj.el.style.width = w + 'px';
        obj.el.style.height = h + 'px';
        obj.el.style.zIndex = Math.floor(obj.t * 100);
      } else if (obj.kind === 'scenery') {
        const pos = getSceneryPos(obj.t, obj.side, obj.offset);
        const w = obj.baseW * pos.scale;
        const h = obj.baseH * pos.scale;
        obj.el.style.left = (pos.x - w / 2) + 'px';
        obj.el.style.top = (pos.y - h) + 'px';
        obj.el.style.width = w + 'px';
        obj.el.style.height = h + 'px';
        obj.el.style.zIndex = Math.floor(obj.t * 100);
      } else {
        const pos = getObjPos(obj.t, obj.lane);
        const w = obj.baseW * pos.scale;
        const h = obj.baseH * pos.scale;
        const isFlat = obj.subtype === 'pothole';
        obj.el.style.left = (pos.x - w / 2) + 'px';
        obj.el.style.top = isFlat ? (pos.y - h * 0.6) + 'px' : (pos.y - h) + 'px';
        obj.el.style.width = w + 'px';
        obj.el.style.height = h + 'px';
        obj.el.style.zIndex = Math.floor(obj.t * 100);
      }
    }
  }

  /* ── Collision ───────────────────────────────────── */
  function checkCollision() {
    for (const obj of objects) {
      if (obj.kind !== 'obstacle') continue;
      if (obj.t >= COLLISION_MIN && obj.t <= COLLISION_MAX && obj.lane === playerLane) {
        return true;
      }
    }
    return false;
  }

  /* ── Game Over ───────────────────────────────────── */
  function gameOver() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);

    if (obstacleCount > bestTime) {
      bestTime = obstacleCount;
      saveBestTime();
    }

    const overlay = document.createElement('div');
    overlay.className = 'dd-gameover';
    const crash = document.createElement('div');
    crash.className = 'dd-crash-text';
    crash.textContent = 'CRASH!';
    const timeResult = document.createElement('div');
    timeResult.className = 'dd-time-result';
    timeResult.textContent = `Dodged: ${obstacleCount}`;
    const bestResult = document.createElement('div');
    bestResult.className = 'dd-best-time';
    bestResult.textContent = `Best: ${bestTime}`;
    const btn = document.createElement('button');
    btn.className = 'dd-play-btn';
    btn.textContent = 'Play Again';
    listen(btn, 'pointerup', () => {
      overlay.remove();
      startGame(wrapperRef, { classList: { add() {} } }); // dummy startEl
    });

    const exitBtn = document.createElement('button');
    exitBtn.className = 'dd-exit-btn';
    exitBtn.textContent = 'Exit';
    listen(exitBtn, 'pointerup', () => App.showMenu());

    overlay.appendChild(crash);
    overlay.appendChild(timeResult);
    overlay.appendChild(bestResult);
    overlay.appendChild(btn);
    overlay.appendChild(exitBtn);
    wrapperRef.appendChild(overlay);
  }

  /* ── Init ────────────────────────────────────────── */
  function init(container) {
    bestTime = loadBestTime();

    const wrapper = document.createElement('div');
    wrapper.className = 'dd-wrapper';
    container.appendChild(wrapper);
    wrapperRef = wrapper;

    setupDimensions(wrapper);

    const bg = document.createElement('div');
    bg.className = 'dd-bg';
    bg.innerHTML = createBackgroundSVG();
    wrapper.appendChild(bg);

    createStartScreen(wrapper);
  }

  /* ── Destroy ─────────────────────────────────────── */
  function destroy() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);
    objects.forEach(o => o.el.remove());
    objects = [];

    listeners.forEach(({ el, event, handler, opts }) => {
      el.removeEventListener(event, handler, opts);
    });
    listeners = [];

    if (obstacleCount > bestTime) {
      bestTime = obstacleCount;
      saveBestTime();
    }

    carEl = null;
    objectsLayer = null;
    timerEl = null;
    wrapperRef = null;
  }

  /* ── Register ────────────────────────────────────── */
  App.registerGame({
    id: 'desert-dash',
    title: 'Desert Dash',
    description: 'Dodge obstacles on the desert road!',
    icon: '🏜️',
    init,
    destroy
  });
})();
