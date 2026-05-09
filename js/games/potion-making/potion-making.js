/* ── Potion Making: main orchestrator ───────────── */
(function () {
  const PM = window.PotionMaking;

  /* ── Shared resources for screens ────────────────── */
  const listeners = [];
  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }
  function clearListeners() {
    listeners.forEach(({ el, event, handler, opts }) =>
      el.removeEventListener(event, handler, opts));
    listeners.length = 0;
  }

  let containerRef = null;
  let gameCtx = {};         // { character, potion, target }
  let currentScreen = null;

  /* ── Village state (only valid while on village screen) ── */
  let village = null;       // { state, els, timers }

  /* ── Screen orchestration ────────────────────────── */
  function setScreen(name, ctx) {
    teardownScreen();
    gameCtx = ctx || gameCtx;
    currentScreen = name;
    containerRef.innerHTML = '';
    const transitions = { setScreen, listen };

    if (name === 'CharacterSelect') {
      PM.Screens.CharacterSelect.render(containerRef, transitions, gameCtx);
    } else if (name === 'Gallery') {
      PM.Screens.Gallery.render(containerRef, transitions, gameCtx);
    } else if (name === 'Mixing') {
      PM.Screens.Mixing.render(containerRef, transitions, gameCtx);
    } else if (name === 'Village') {
      startVillage(containerRef, transitions, gameCtx);
    }
  }

  function teardownScreen() {
    if (village) {
      stopVillage();
    }
    clearListeners();
  }

  /* ── Village screen ─────────────────────────────── */
  function startVillage(container, t, ctx) {
    const board = PM.Village.generateBoard();

    const wrap = document.createElement('div');
    wrap.className = 'pm-screen pm-vil-screen';

    const hud = createHUD(ctx);
    wrap.appendChild(hud.el);

    const stage = document.createElement('div');
    stage.className = 'pm-vil-stage';
    wrap.appendChild(stage);

    const boardEl = document.createElement('div');
    boardEl.className = 'pm-vil-board';
    boardEl.style.width = (PM.Village.SIZE * PM.Village.CELL) + 'px';
    boardEl.style.height = (PM.Village.SIZE * PM.Village.CELL) + 'px';
    stage.appendChild(boardEl);

    PM.Village.drawStaticLayer(boardEl, board);

    const dynLayer = document.createElement('div');
    dynLayer.className = 'pm-vil-dynamic';
    boardEl.appendChild(dynLayer);

    const flashLayer = document.createElement('div');
    flashLayer.className = 'pm-vil-flashes';
    boardEl.appendChild(flashLayer);

    container.appendChild(wrap);

    // Player sprite
    const playerEl = document.createElement('div');
    playerEl.className = 'pm-vil-player';
    const sprites = PM.Characters.fromPreset(ctx.character.presetId, ctx.character.customizations);
    playerEl.innerHTML = sprites.topDown;
    dynLayer.appendChild(playerEl);

    village = {
      state: {
        board,
        player: { x: board.spawn.x, y: board.spawn.y, facing: 'south' },
        hearts: 3,
        killed: 0,
        monsters: [],
        spawnedTotal: 0,
        spawnTimerMs: 1500,
        gameActive: true,
        nextMonsterId: 1
      },
      els: { wrap, stage, boardEl, dynLayer, flashLayer, playerEl, hud },
      timers: { rafId: null, lastTime: 0 }
    };

    positionPlayer();
    centerCameraOnPlayer();

    listen(document, 'keydown', onKeyDown);

    village.timers.lastTime = performance.now();
    village.timers.rafId = requestAnimationFrame(villageLoop);
  }

  function stopVillage() {
    if (!village) return;
    village.state.gameActive = false;
    cancelAnimationFrame(village.timers.rafId);
    village = null;
  }

  /* ── HUD ────────────────────────────────────────── */
  function createHUD(ctx) {
    const el = document.createElement('div');
    el.className = 'pm-vil-hud';

    const blend = PM.Potions.getBlendColor(ctx.potion.componentIds);
    const name = PM.Potions.getComboName(ctx.potion.componentIds);

    el.innerHTML = `
      <div class="pm-vil-hud-hearts">
        <span class="pm-heart pm-heart-active">♥</span>
        <span class="pm-heart pm-heart-active">♥</span>
        <span class="pm-heart pm-heart-active">♥</span>
      </div>
      <div class="pm-vil-hud-counter">
        <span class="pm-vil-hud-killed">0</span>
        <span class="pm-vil-hud-slash">/</span>
        <span class="pm-vil-hud-target">${ctx.target}</span>
      </div>
      <div class="pm-vil-hud-potion">
        <div class="pm-vil-hud-jar" style="--pm-blend:${blend}">${PM.MetaUtil.jarSVG(blend)}</div>
        <div class="pm-vil-hud-potion-name">${PM.MetaUtil.escapeHTML(name)}</div>
      </div>
    `;

    return {
      el,
      setHearts(h) {
        const hearts = el.querySelectorAll('.pm-heart');
        hearts.forEach((heart, i) => {
          heart.classList.toggle('pm-heart-active', i < h);
        });
      },
      setKilled(k) {
        el.querySelector('.pm-vil-hud-killed').textContent = k;
      }
    };
  }

  /* ── Input ──────────────────────────────────────── */
  function onKeyDown(e) {
    if (!village || !village.state.gameActive) return;
    const s = village.state;

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault(); tryFaceMove('north');
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault(); tryFaceMove('south');
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      e.preventDefault(); tryFaceMove('west');
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault(); tryFaceMove('east');
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      doAttack();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      togglePause();
    }
  }

  const DIR_VEC = {
    north: { dx: 0, dy: -1, deg: 0 },
    east:  { dx: 1, dy: 0,  deg: 90 },
    south: { dx: 0, dy: 1,  deg: 180 },
    west:  { dx: -1, dy: 0, deg: 270 }
  };

  function tryFaceMove(dir) {
    const s = village.state;
    s.player.facing = dir;
    const v = DIR_VEC[dir];
    const nx = s.player.x + v.dx;
    const ny = s.player.y + v.dy;
    if (PM.Village.isWalkable(s.board, nx, ny)) {
      s.player.x = nx;
      s.player.y = ny;
    }
    positionPlayer();
    centerCameraOnPlayer();
  }

  function positionPlayer() {
    if (!village) return;
    const s = village.state;
    const C = PM.Village.CELL;
    const el = village.els.playerEl;
    el.style.transform = `translate(${s.player.x * C}px, ${s.player.y * C}px)`;
    const indicator = el.querySelector('.pm-indicator-rot');
    if (indicator) {
      const deg = DIR_VEC[s.player.facing].deg;
      indicator.setAttribute('transform', `rotate(${deg} 50 50)`);
    }
  }

  function centerCameraOnPlayer() {
    if (!village) return;
    const s = village.state;
    const C = PM.Village.CELL;
    const stage = village.els.stage;
    const board = village.els.boardEl;
    const sw = stage.clientWidth, sh = stage.clientHeight;
    const px = s.player.x * C + C / 2;
    const py = s.player.y * C + C / 2;
    const tx = sw / 2 - px;
    const ty = sh / 2 - py;
    board.style.transform = `translate(${tx}px, ${ty}px)`;
  }

  /* ── Attack resolution ───────────────────────────── */
  function computeAttackCells(facing, mechanic) {
    const s = village.state;
    const px = s.player.x, py = s.player.y;
    const out = [];
    if (mechanic.type === 'line') {
      const v = DIR_VEC[facing];
      const range = mechanic.range || 2;
      for (let i = 1; i <= range; i++) {
        out.push({ x: px + v.dx * i, y: py + v.dy * i });
      }
    } else if (mechanic.type === 'arc') {
      const range = mechanic.range || 2;
      const halfWidth = Math.floor((mechanic.width || 3) / 2);
      // Forward axis from facing
      if (facing === 'north' || facing === 'south') {
        const fy = facing === 'north' ? -1 : 1;
        for (let depth = 1; depth <= range; depth++) {
          for (let lat = -halfWidth; lat <= halfWidth; lat++) {
            out.push({ x: px + lat, y: py + fy * depth });
          }
        }
      } else {
        const fx = facing === 'east' ? 1 : -1;
        for (let depth = 1; depth <= range; depth++) {
          for (let lat = -halfWidth; lat <= halfWidth; lat++) {
            out.push({ x: px + fx * depth, y: py + lat });
          }
        }
      }
    } else if (mechanic.type === 'aoe') {
      const r = mechanic.radius || 1;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          out.push({ x: px + dx, y: py + dy });
        }
      }
    }
    return out;
  }

  function doAttack() {
    const s = village.state;
    const ctx = gameCtx;
    const effects = PM.Potions.getEffects(ctx.potion.componentIds);

    effects.forEach(eff => {
      const cells = computeAttackCells(s.player.facing, eff.mechanic);
      cells.forEach(c => {
        spawnFlash(c.x, c.y, eff);
        // Apply damage to all monsters on this cell
        s.monsters.forEach(m => {
          if (m.x === c.x && m.y === c.y && m.hp > 0) {
            m.hp -= 1;
            if (eff.mechanic.freezeTurns) {
              m.frozenTicks = Math.max(m.frozenTicks || 0, eff.mechanic.freezeTurns);
            }
            if (m.hp <= 0) {
              killMonster(m);
            } else {
              updateMonsterTint(m);
            }
          }
        });
      });
    });

    checkWinCondition();
  }

  function spawnFlash(x, y, eff) {
    const layer = village.els.flashLayer;
    const C = PM.Village.CELL;
    const flash = document.createElement('div');
    flash.className = `pm-vil-flash pm-vil-flash-${eff.mechanic.type}`;
    flash.style.left = (x * C) + 'px';
    flash.style.top = (y * C) + 'px';
    flash.style.width = C + 'px';
    flash.style.height = C + 'px';
    flash.style.background = eff.primary;
    layer.appendChild(flash);
    setTimeout(() => flash.remove(), 320);
  }

  function killMonster(m) {
    const s = village.state;
    s.killed += 1;
    village.els.hud.setKilled(s.killed);
    if (m.el) m.el.remove();
    s.monsters = s.monsters.filter(x => x.id !== m.id);
  }

  function updateMonsterTint(m) {
    if (!m.el) return;
    const t = 1 - (m.hp / m.maxHp);
    m.el.style.filter = `drop-shadow(0 2px 3px rgba(0,0,0,0.6)) brightness(${1 - t * 0.45})`;
  }

  /* ── Monster spawning ─────────────────────────────── */
  function spawnMonster() {
    const s = village.state;
    if (s.spawnedTotal >= s.target + 5) return;
    if (s.monsters.length >= 4) return;
    if (!s.board.spawnable.length) return;

    const cell = s.board.spawnable[Math.floor(Math.random() * s.board.spawnable.length)];
    const type = pickMonsterType();
    const id = s.nextMonsterId++;

    const el = document.createElement('div');
    el.className = `pm-vil-monster pm-vil-monster-${type.id}`;
    el.innerHTML = type.svg;
    village.els.dynLayer.appendChild(el);

    const m = {
      id, type, x: cell.x, y: cell.y,
      hp: type.hp, maxHp: type.hp,
      frozenTicks: 0, lastMoveMs: performance.now(),
      el
    };
    positionMonster(m);
    s.monsters.push(m);
    s.spawnedTotal++;
  }

  function pickMonsterType() {
    const types = PM.Monsters.TYPES;
    const totalWeight = types.reduce((sum, t) => sum + t.weight, 0);
    let r = Math.random() * totalWeight;
    for (const t of types) {
      r -= t.weight;
      if (r <= 0) return t;
    }
    return types[0];
  }

  function positionMonster(m) {
    const C = PM.Village.CELL;
    m.el.style.transform = `translate(${m.x * C}px, ${m.y * C}px)`;
  }

  /* ── Monster movement ────────────────────────────── */
  function tryMoveMonster(m, now) {
    const s = village.state;
    if (m.frozenTicks > 0) {
      m.frozenTicks -= 1;
      m.el.classList.add('pm-vil-monster-frozen');
      m.lastMoveMs = now;
      if (m.frozenTicks === 0) m.el.classList.remove('pm-vil-monster-frozen');
      return;
    }

    const dx = s.player.x - m.x;
    const dy = s.player.y - m.y;
    const tries = [];
    if (Math.abs(dx) > Math.abs(dy)) {
      tries.push({ dx: Math.sign(dx), dy: 0 });
      tries.push({ dx: 0, dy: Math.sign(dy) });
    } else {
      tries.push({ dx: 0, dy: Math.sign(dy) });
      tries.push({ dx: Math.sign(dx), dy: 0 });
    }

    for (const tdir of tries) {
      if (tdir.dx === 0 && tdir.dy === 0) continue;
      const nx = m.x + tdir.dx;
      const ny = m.y + tdir.dy;
      if (!PM.Village.isWalkable(s.board, nx, ny)) continue;
      if (s.monsters.some(other => other.id !== m.id && other.x === nx && other.y === ny)) continue;

      // collision with player?
      if (nx === s.player.x && ny === s.player.y) {
        hitPlayer();
        if (m.el) m.el.remove();
        s.monsters = s.monsters.filter(x => x.id !== m.id);
        return;
      }

      m.x = nx; m.y = ny;
      positionMonster(m);
      m.lastMoveMs = now;
      return;
    }
    m.lastMoveMs = now; // stuck — wait
  }

  function hitPlayer() {
    const s = village.state;
    s.hearts -= 1;
    village.els.hud.setHearts(s.hearts);
    village.els.boardEl.classList.add('pm-vil-shake');
    setTimeout(() => {
      if (village) village.els.boardEl.classList.remove('pm-vil-shake');
    }, 380);
    if (s.hearts <= 0) {
      gameOver(false);
    }
  }

  /* ── Loop ───────────────────────────────────────── */
  function villageLoop(ts) {
    if (!village || !village.state.gameActive) return;
    const dt = ts - village.timers.lastTime;
    village.timers.lastTime = ts;

    // Spawn ticker
    village.state.spawnTimerMs -= dt;
    if (village.state.spawnTimerMs <= 0) {
      spawnMonster();
      village.state.spawnTimerMs = 1500;
    }

    // Monster movement (per-monster cadence)
    village.state.monsters.slice().forEach(m => {
      if (ts - m.lastMoveMs >= m.type.moveMs) {
        tryMoveMonster(m, ts);
      }
    });

    village.timers.rafId = requestAnimationFrame(villageLoop);
  }

  /* ── Win/lose/pause ──────────────────────────────── */
  function checkWinCondition() {
    if (village.state.killed >= village.state.target) {
      gameOver(true);
    }
  }

  function gameOver(won) {
    if (!village) return;
    const s = village.state;
    s.gameActive = false;
    cancelAnimationFrame(village.timers.rafId);

    const overlay = document.createElement('div');
    overlay.className = 'pm-vil-overlay ' + (won ? 'pm-vil-win' : 'pm-vil-gameover');
    overlay.innerHTML = `
      <div class="pm-vil-overlay-card">
        <h2>${won ? 'Victory!' : 'Defeated'}</h2>
        <div class="pm-vil-overlay-stats">
          <div>Monsters defeated: <strong>${s.killed}</strong> / ${s.target}</div>
          <div>Hearts remaining: <strong>${s.hearts}</strong></div>
        </div>
        <div class="pm-vil-overlay-btns">
          <button class="pm-btn pm-vil-again">Play Again</button>
          <button class="pm-btn pm-btn-secondary pm-vil-switch">Switch Potion</button>
          <button class="pm-btn pm-btn-secondary pm-vil-exit">Exit</button>
        </div>
      </div>
    `;
    village.els.wrap.appendChild(overlay);

    listen(overlay.querySelector('.pm-vil-again'), 'pointerup', () => {
      setScreen('Village', gameCtx);
    });
    listen(overlay.querySelector('.pm-vil-switch'), 'pointerup', () => {
      setScreen('Gallery', gameCtx);
    });
    listen(overlay.querySelector('.pm-vil-exit'), 'pointerup', () => {
      App.showMenu();
    });
  }

  function togglePause() {
    if (!village) return;
    const s = village.state;
    if (!s.gameActive) return;
    s.gameActive = false;
    cancelAnimationFrame(village.timers.rafId);

    const overlay = document.createElement('div');
    overlay.className = 'pm-vil-overlay pm-vil-pause';
    overlay.innerHTML = `
      <div class="pm-vil-overlay-card">
        <h2>Paused</h2>
        <div class="pm-vil-overlay-btns">
          <button class="pm-btn pm-vil-resume">Resume</button>
          <button class="pm-btn pm-btn-secondary pm-vil-exit">Exit</button>
        </div>
      </div>
    `;
    village.els.wrap.appendChild(overlay);

    listen(overlay.querySelector('.pm-vil-resume'), 'pointerup', () => {
      overlay.remove();
      s.gameActive = true;
      village.timers.lastTime = performance.now();
      // reset monster lastMove so they don't all tick at once after pause
      s.monsters.forEach(m => m.lastMoveMs = village.timers.lastTime);
      village.timers.rafId = requestAnimationFrame(villageLoop);
    });
    listen(overlay.querySelector('.pm-vil-exit'), 'pointerup', () => {
      App.showMenu();
    });
  }

  /* ── Game registration ──────────────────────────── */
  function init(container) {
    containerRef = container;
    gameCtx = {};
    setScreen('CharacterSelect', gameCtx);
  }

  function destroy() {
    teardownScreen();
    containerRef = null;
    gameCtx = {};
    currentScreen = null;
  }

  App.registerGame({
    id: 'potion-making',
    title: 'Potion Making',
    description: 'Brew magic potions and defeat creatures!',
    icon: '🧪',
    init,
    destroy
  });
})();
