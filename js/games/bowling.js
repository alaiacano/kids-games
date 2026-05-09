/* ── Bowling ─────────────────────────────────────── */
(() => {
  /* ── Constants ─────────────────────────────────── */
  const PREFIX = 'bw';
  const STORAGE_KEY = 'bowling-best';

  // Physics world dimensions (top-down, in pixels)
  const LANE_W = 200;
  const LANE_L = 1200;
  const PIN_RADIUS = 9;
  const BALL_RADIUS = 14;
  const BALL_SPEED = 18;        // pixels per Matter.js step
  const GUTTER_W = 30;

  // Pin triangle positions (top-down, y=0 is foul line, y increases toward pins)
  const PIN_POSITIONS = [
    // Row 1 (head pin)
    { x: LANE_W / 2, y: LANE_L - 80 },
    // Row 2
    { x: LANE_W / 2 - 22, y: LANE_L - 55 },
    { x: LANE_W / 2 + 22, y: LANE_L - 55 },
    // Row 3
    { x: LANE_W / 2 - 44, y: LANE_L - 30 },
    { x: LANE_W / 2 + 0,  y: LANE_L - 30 },
    { x: LANE_W / 2 + 44, y: LANE_L - 30 },
    // Row 4
    { x: LANE_W / 2 - 66, y: LANE_L - 5 },
    { x: LANE_W / 2 - 22, y: LANE_L - 5 },
    { x: LANE_W / 2 + 22, y: LANE_L - 5 },
    { x: LANE_W / 2 + 66, y: LANE_L - 5 },
  ];

  // Perspective projection constants
  const PERSP_K = 2.5;
  const VP_Y_FRAC = 0.08;       // vanishing point Y as fraction of canvas height
  const FOUL_Y_FRAC = 0.92;     // foul line Y on canvas
  const LANE_W_FRAC = 0.55;     // lane width at foul line as fraction of canvas width

  // Aim constants
  const AIM_SPEED = 120;         // pixels per second for position adjustment
  const ANGLE_STEP = 0.01;       // radians per arrow key press (~0.6 degrees)
  const MAX_ANGLE = 0.35;        // max throw angle from straight

  /* ── Theme system ──────────────────────────────── */
  const THEMES = {
    classic: {
      name: 'Classic',
      laneColor: '#C4883C',
      laneColorLight: '#D4A04C',
      gutterColor: '#555',
      approachColor: '#A07030',
      pinDeckColor: '#B87830',
      ceilingColor: '#2a1a0a',
      wallColor: '#3a2a1a',
      neighborLaneColor: '#B87830',
      ballReturnColor: '#222',

      drawBall(ctx, x, y, r) {
        ctx.save();
        const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
        grad.addColorStop(0, '#444');
        grad.addColorStop(0.7, '#111');
        grad.addColorStop(1, '#000');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        // Finger holes
        const holeR = r * 0.15;
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(x - r * 0.2, y - r * 0.25, holeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + r * 0.2, y - r * 0.25, holeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y - r * 0.5, holeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      },

      drawPin(ctx, x, y, scale) {
        ctx.save();
        const h = 80 * scale;
        const bodyW = 16 * scale;
        const neckW = 5 * scale;
        const headW = 7 * scale;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(x + 2 * scale, y + 2 * scale, bodyW * 0.6, h * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();

        // Body (bottom, wide)
        ctx.fillStyle = '#f5f5f0';
        ctx.beginPath();
        ctx.ellipse(x, y, bodyW, h * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        // Neck + head area
        ctx.beginPath();
        ctx.moveTo(x - bodyW, y);
        ctx.quadraticCurveTo(x - neckW, y - h * 0.4, x - headW, y - h * 0.65);
        ctx.quadraticCurveTo(x, y - h, x + headW, y - h * 0.65);
        ctx.quadraticCurveTo(x + neckW, y - h * 0.4, x + bodyW, y);
        ctx.fillStyle = '#f5f5f0';
        ctx.fill();

        // Red stripes
        ctx.strokeStyle = '#cc0000';
        ctx.lineWidth = Math.max(1, 2 * scale);
        const stripeY = y - h * 0.15;
        ctx.beginPath();
        ctx.moveTo(x - bodyW * 0.85, stripeY);
        ctx.quadraticCurveTo(x, stripeY - 2 * scale, x + bodyW * 0.85, stripeY);
        ctx.stroke();
        const stripeY2 = y - h * 0.22;
        ctx.beginPath();
        ctx.moveTo(x - bodyW * 0.75, stripeY2);
        ctx.quadraticCurveTo(x, stripeY2 - 2 * scale, x + bodyW * 0.75, stripeY2);
        ctx.stroke();

        // Outline
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = Math.max(0.5, 0.8 * scale);
        ctx.beginPath();
        ctx.ellipse(x, y, bodyW, h * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }
    }
  };

  let currentTheme = THEMES.classic;

  /* ── State ─────────────────────────────────────── */
  const listeners = [];
  let animFrameId = null;
  let lastTime = 0;
  let canvas = null;
  let ctx = null;
  let canvasW = 0, canvasH = 0;

  // Game phase: 'setup' | 'aiming' | 'rolling' | 'settling' | 'scoring' | 'results'
  let phase = 'setup';

  // Physics
  let engine = null;
  let pinBodies = [];
  let ballBody = null;
  let wallBodies = [];
  let standingPins = [];    // indices of pins still standing

  // Aiming
  let aimMode = 'position'; // 'position' | 'angle'
  let ballX = LANE_W / 2;   // ball position on lane (physics coords)
  let ballAngle = 0;         // throw angle (radians, 0 = straight)

  // Players & scoring
  let players = [];
  let currentPlayerIdx = 0;
  let currentFrame = 0;
  let currentRoll = 0;       // 0 or 1 (or 2 in final frame)
  let numFrames = 10;
  let firstRollPinsDown = 0;

  // Settling detection
  let settleCounter = 0;
  const SETTLE_THRESHOLD = 0.3;
  const SETTLE_FRAMES = 40;

  // Score display timing
  let scoreShowTimer = 0;
  const SCORE_SHOW_DURATION = 1.5;

  // Ball rolling state
  let ballRolling = false;
  let ballPastPins = false;

  // DOM refs
  let wrapperRef = null;
  let setupEl = null;
  let scorecardEl = null;
  let aimIndicatorEl = null;

  // Background cache
  let bgCanvas = null;

  // Confetti
  let confettiParticles = [];
  const CONFETTI_COLORS = ['#ff0', '#f0f', '#0ff', '#f44', '#4f4', '#44f', '#fa0', '#fff'];

  function spawnConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 120; i++) {
      confettiParticles.push({
        x: canvasW * 0.3 + Math.random() * canvasW * 0.4,
        y: canvasH * 0.2 + Math.random() * canvasH * 0.1,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 6 - 2,
        w: 4 + Math.random() * 6,
        h: 3 + Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        life: 2.5 + Math.random() * 1.5
      });
    }
  }

  function updateAndDrawConfetti(dt) {
    if (confettiParticles.length === 0) return;
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.life -= dt;
      if (p.life <= 0) { confettiParticles.splice(i, 1); continue; }
      p.vy += 4 * dt; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotV;
      const alpha = Math.min(1, p.life / 0.5);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  /* ── Helpers ────────────────────────────────────── */
  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  /* ── Perspective projection ─────────────────────── */
  function project(px, py) {
    const t = py / LANE_L; // 0 = foul line, 1 = pin deck end
    const scale = 1 / (1 + t * PERSP_K);

    const vpX = canvasW / 2;
    const vpY = canvasH * VP_Y_FRAC;
    const foulY = canvasH * FOUL_Y_FRAC;
    const foulLaneW = canvasW * LANE_W_FRAC;

    const screenY = foulY - (foulY - vpY) * (1 - scale);
    const laneCenterPhys = LANE_W / 2;
    const offsetFromCenter = (px - laneCenterPhys) / LANE_W;
    const screenX = vpX + offsetFromCenter * foulLaneW * scale;

    return { x: screenX, y: screenY, scale };
  }

  /* ── Background rendering (cached) ──────────────── */
  function renderBackground() {
    if (bgCanvas && bgCanvas.width === canvasW && bgCanvas.height === canvasH) return;
    bgCanvas = document.createElement('canvas');
    bgCanvas.width = canvasW;
    bgCanvas.height = canvasH;
    const bg = bgCanvas.getContext('2d');
    const theme = currentTheme;

    const vpX = canvasW / 2;
    const vpY = canvasH * VP_Y_FRAC;
    const foulY = canvasH * FOUL_Y_FRAC;
    const foulLaneW = canvasW * LANE_W_FRAC;

    // Helper: get lane edges at a given t
    function laneEdges(t) {
      const s = 1 / (1 + t * PERSP_K);
      const y = foulY - (foulY - vpY) * (1 - s);
      const hw = foulLaneW * s / 2;
      return { y, left: vpX - hw, right: vpX + hw, scale: s };
    }

    // ── Ceiling / upper wall ──
    bg.fillStyle = theme.ceilingColor;
    bg.fillRect(0, 0, canvasW, vpY + 20);

    // ── Back wall ──
    const wallGrad = bg.createLinearGradient(0, vpY - 10, 0, vpY + 40);
    wallGrad.addColorStop(0, '#1a0e05');
    wallGrad.addColorStop(1, theme.wallColor);
    bg.fillStyle = wallGrad;
    bg.fillRect(0, vpY - 10, canvasW, 50);

    // ── Ball return shelf (across the alley behind the lane, near foul line) ──
    const returnY = foulY + 5;
    bg.fillStyle = theme.ballReturnColor;
    bg.fillRect(0, returnY, canvasW, canvasH - returnY);

    // ── Floor area (approach) ──
    const approachGrad = bg.createLinearGradient(0, foulY - 30, 0, canvasH);
    approachGrad.addColorStop(0, theme.approachColor);
    approachGrad.addColorStop(1, '#5a3a1a');
    bg.fillStyle = approachGrad;
    bg.fillRect(0, foulY - 2, canvasW, canvasH - foulY + 2);

    // ── Neighboring lanes + our lane ──
    // Draw 3 lanes: left neighbor, center (ours), right neighbor
    const laneOffsets = [-1, 0, 1];
    for (const offset of laneOffsets) {
      const isOurs = offset === 0;
      // Draw lane as a filled trapezoid from foul line to pin deck
      bg.beginPath();
      const nearEdge = laneEdges(0);
      const farEdge = laneEdges(1);
      const gutterWNear = GUTTER_W / LANE_W * foulLaneW / 2;
      const gutterWFar = GUTTER_W / LANE_W * foulLaneW * farEdge.scale / 2;
      const laneSpacingNear = (foulLaneW + gutterWNear * 2) * 1.15;
      const laneSpacingFar = (foulLaneW * farEdge.scale + gutterWFar * 2) * 1.15;

      const nearLeft = nearEdge.left + offset * laneSpacingNear;
      const nearRight = nearEdge.right + offset * laneSpacingNear;
      const farLeft = farEdge.left + offset * laneSpacingFar;
      const farRight = farEdge.right + offset * laneSpacingFar;

      // Gutter (left)
      bg.fillStyle = theme.gutterColor;
      bg.beginPath();
      bg.moveTo(nearLeft - gutterWNear, nearEdge.y);
      bg.lineTo(farLeft - gutterWFar, farEdge.y);
      bg.lineTo(farLeft, farEdge.y);
      bg.lineTo(nearLeft, nearEdge.y);
      bg.closePath();
      bg.fill();

      // Gutter (right)
      bg.beginPath();
      bg.moveTo(nearRight, nearEdge.y);
      bg.lineTo(farRight, farEdge.y);
      bg.lineTo(farRight + gutterWFar, farEdge.y);
      bg.lineTo(nearRight + gutterWNear, nearEdge.y);
      bg.closePath();
      bg.fill();

      // Lane surface
      const laneGrad = bg.createLinearGradient(nearLeft, nearEdge.y, nearRight, nearEdge.y);
      const lc = isOurs ? theme.laneColor : theme.neighborLaneColor;
      const lcl = isOurs ? theme.laneColorLight : '#C08030';
      laneGrad.addColorStop(0, lc);
      laneGrad.addColorStop(0.3, lcl);
      laneGrad.addColorStop(0.5, lc);
      laneGrad.addColorStop(0.7, lcl);
      laneGrad.addColorStop(1, lc);
      bg.fillStyle = laneGrad;
      bg.beginPath();
      bg.moveTo(nearLeft, nearEdge.y);
      bg.lineTo(farLeft, farEdge.y);
      bg.lineTo(farRight, farEdge.y);
      bg.lineTo(nearRight, nearEdge.y);
      bg.closePath();
      bg.fill();

      // Wood grain lines
      if (isOurs) {
        bg.strokeStyle = 'rgba(0,0,0,0.08)';
        bg.lineWidth = 1;
        const numBoards = 12;
        for (let i = 1; i < numBoards; i++) {
          const frac = i / numBoards;
          const nx = nearLeft + (nearRight - nearLeft) * frac;
          const fx = farLeft + (farRight - farLeft) * frac;
          bg.beginPath();
          bg.moveTo(nx, nearEdge.y);
          bg.lineTo(fx, farEdge.y);
          bg.stroke();
        }
      }

      // Lane edge lines
      bg.strokeStyle = 'rgba(0,0,0,0.3)';
      bg.lineWidth = 1.5;
      bg.beginPath();
      bg.moveTo(nearLeft, nearEdge.y);
      bg.lineTo(farLeft, farEdge.y);
      bg.stroke();
      bg.beginPath();
      bg.moveTo(nearRight, nearEdge.y);
      bg.lineTo(farRight, farEdge.y);
      bg.stroke();
    }

    // ── Foul line ──
    const foulEdge = laneEdges(0);
    bg.strokeStyle = '#222';
    bg.lineWidth = 3;
    bg.beginPath();
    bg.moveTo(foulEdge.left - 10, foulEdge.y);
    bg.lineTo(foulEdge.right + 10, foulEdge.y);
    bg.stroke();

    // ── Lane arrows (our lane) ──
    bg.fillStyle = 'rgba(80,40,10,0.4)';
    const arrowT = 0.2; // 20% down the lane
    for (let i = -2; i <= 2; i++) {
      const px = LANE_W / 2 + i * 25;
      const p = project(px, LANE_L * arrowT);
      const sz = 6 * p.scale;
      bg.beginPath();
      bg.moveTo(p.x, p.y - sz);
      bg.lineTo(p.x - sz * 0.6, p.y + sz * 0.5);
      bg.lineTo(p.x + sz * 0.6, p.y + sz * 0.5);
      bg.closePath();
      bg.fill();
    }

    // ── Lane dots (our lane) ──
    bg.fillStyle = 'rgba(80,40,10,0.35)';
    const dotRows = [0.07, 0.12];
    for (const dt of dotRows) {
      for (let i = -3; i <= 3; i++) {
        const px = LANE_W / 2 + i * 20;
        const p = project(px, LANE_L * dt);
        const r = 2.5 * p.scale;
        bg.beginPath();
        bg.arc(p.x, p.y, r, 0, Math.PI * 2);
        bg.fill();
      }
    }

    // ── Pin deck area (slightly different color at the end) ──
    const deckT = 0.85;
    const deckEdge = laneEdges(deckT);
    const endEdge = laneEdges(1);
    bg.fillStyle = theme.pinDeckColor;
    bg.beginPath();
    bg.moveTo(deckEdge.left, deckEdge.y);
    bg.lineTo(endEdge.left, endEdge.y);
    bg.lineTo(endEdge.right, endEdge.y);
    bg.lineTo(deckEdge.right, deckEdge.y);
    bg.closePath();
    bg.fill();

    // ── Overhead lights ──
    for (let i = -1; i <= 1; i++) {
      const lx = vpX + i * canvasW * 0.3;
      const ly = vpY * 0.3;
      // Light housing
      bg.fillStyle = '#333';
      bg.fillRect(lx - 25, ly, 50, 8);
      // Light glow
      const glow = bg.createRadialGradient(lx, ly + 8, 2, lx, ly + 8, 80);
      glow.addColorStop(0, 'rgba(255,240,200,0.15)');
      glow.addColorStop(1, 'rgba(255,240,200,0)');
      bg.fillStyle = glow;
      bg.beginPath();
      bg.arc(lx, ly + 8, 80, 0, Math.PI * 2);
      bg.fill();
    }

    // ── Ball return machine (between lanes, near foul line) ──
    for (const side of [-1, 1]) {
      const brX = vpX + side * (foulLaneW * 0.7);
      const brY = foulY - 15;
      bg.fillStyle = '#1a1a1a';
      bg.beginPath();
      bg.ellipse(brX, brY, 22, 12, 0, 0, Math.PI * 2);
      bg.fill();
      bg.fillStyle = '#333';
      bg.beginPath();
      bg.ellipse(brX, brY - 3, 20, 10, 0, 0, Math.PI * 2);
      bg.fill();
      // Balls sitting on return
      bg.fillStyle = '#c00';
      bg.beginPath();
      bg.arc(brX - 6, brY - 4, 5, 0, Math.PI * 2);
      bg.fill();
      bg.fillStyle = '#00c';
      bg.beginPath();
      bg.arc(brX + 6, brY - 4, 5, 0, Math.PI * 2);
      bg.fill();
    }
  }

  /* ── Scoring logic ─────────────────────────────── */
  function calculateScores(frames, nFrames) {
    const scores = [];
    let cumulative = 0;
    // Flatten all rolls for look-ahead
    const allRolls = [];
    for (const f of frames) {
      for (const r of f.rolls) allRolls.push(r);
    }

    for (let i = 0; i < frames.length && i < nFrames; i++) {
      const f = frames[i];
      const isFinal = (i === nFrames - 1);
      // Calculate roll offset
      let offset = 0;
      for (let j = 0; j < i; j++) offset += frames[j].rolls.length;

      if (isFinal) {
        // Final frame: just sum all rolls (up to 3)
        if (f.rolls.length < 2) { scores.push(null); continue; }
        const isStrikeOrSpare = f.rolls[0] === 10 || (f.rolls[0] + (f.rolls[1] || 0)) === 10;
        if (isStrikeOrSpare && f.rolls.length < 3) { scores.push(null); continue; }
        let sum = 0;
        for (const r of f.rolls) sum += r;
        cumulative += sum;
        scores.push(cumulative);
      } else if (f.rolls[0] === 10) {
        // Strike: 10 + next 2 rolls
        if (offset + 1 >= allRolls.length || offset + 2 >= allRolls.length) {
          scores.push(null);
          continue;
        }
        cumulative += 10 + allRolls[offset + 1] + allRolls[offset + 2];
        scores.push(cumulative);
      } else if (f.rolls.length >= 2 && f.rolls[0] + f.rolls[1] === 10) {
        // Spare: 10 + next 1 roll
        if (offset + 2 >= allRolls.length) {
          scores.push(null);
          continue;
        }
        cumulative += 10 + allRolls[offset + 2];
        scores.push(cumulative);
      } else if (f.rolls.length >= 2) {
        // Open frame
        cumulative += f.rolls[0] + f.rolls[1];
        scores.push(cumulative);
      } else {
        scores.push(null);
      }
    }
    return scores;
  }

  function isStrike(frame) {
    return frame.rolls.length > 0 && frame.rolls[0] === 10;
  }

  function isSpare(frame) {
    return frame.rolls.length >= 2 && !isStrike(frame) && frame.rolls[0] + frame.rolls[1] === 10;
  }

  /* ── Scorecard rendering ────────────────────────── */
  function renderScorecard() {
    if (!scorecardEl) return;
    const player = players[currentPlayerIdx];
    const scores = calculateScores(player.frames, numFrames);

    let html = `<div class="bw-scorecard-name">${player.name}</div>`;
    html += '<div class="bw-scorecard-frames">';

    for (let i = 0; i < numFrames; i++) {
      const f = player.frames[i] || { rolls: [] };
      const isCurrent = (i === currentFrame && phase !== 'results');
      const isFinal = (i === numFrames - 1);

      html += `<div class="bw-scorecard-frame ${isCurrent ? 'bw-scorecard-active' : ''}">`;
      html += `<div class="bw-frame-number">${i + 1}</div>`;
      html += '<div class="bw-frame-rolls">';

      if (isFinal) {
        // Final frame: up to 3 rolls
        for (let r = 0; r < 3; r++) {
          let display = '';
          if (r < f.rolls.length) {
            if (f.rolls[r] === 10) {
              display = 'X';
            } else if (r > 0 && f.rolls[r] + f.rolls[r - 1] === 10 && f.rolls[r - 1] !== 10) {
              display = '/';
            } else {
              display = f.rolls[r] === 0 ? '-' : '' + f.rolls[r];
            }
          }
          html += `<span class="bw-roll-cell">${display}</span>`;
        }
      } else {
        // Normal frame: 2 roll cells
        let r1 = '', r2 = '';
        if (f.rolls.length > 0) {
          if (f.rolls[0] === 10) {
            r1 = '';
            r2 = 'X';
          } else {
            r1 = f.rolls[0] === 0 ? '-' : '' + f.rolls[0];
            if (f.rolls.length > 1) {
              r2 = isSpare(f) ? '/' : (f.rolls[1] === 0 ? '-' : '' + f.rolls[1]);
            }
          }
        }
        html += `<span class="bw-roll-cell">${r1}</span>`;
        html += `<span class="bw-roll-cell">${r2}</span>`;
      }

      html += '</div>'; // rolls
      html += `<div class="bw-frame-score">${scores[i] !== null && scores[i] !== undefined ? scores[i] : ''}</div>`;
      html += '</div>'; // frame
    }

    html += '</div>'; // frames
    scorecardEl.innerHTML = html;
  }

  /* ── Physics setup ──────────────────────────────── */
  function createPhysicsWorld() {
    const { Engine, World, Bodies, Body } = Matter;

    engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0;

    pinBodies = [];
    wallBodies = [];

    // Create pin bodies (only standing ones)
    for (const idx of standingPins) {
      const pos = PIN_POSITIONS[idx];
      const pin = Bodies.circle(pos.x, pos.y, PIN_RADIUS, {
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.04,
        density: 0.002,
        label: 'pin-' + idx
      });
      pinBodies.push({ body: pin, idx });
      World.add(engine.world, pin);
    }

    // No physical gutter walls — gutter is handled by killing ball velocity in the loop
    // No back wall — ball is removed from world once it passes the pins
    wallBodies = [];

    // Create ball
    ballBody = Bodies.circle(ballX, 30, BALL_RADIUS, {
      restitution: 0.3,
      friction: 0.02,
      frictionAir: 0.001,
      density: 0.015,  // much heavier than pins
      label: 'ball'
    });

    // Set ball velocity based on angle, with tiny random jitter
    const jitter = (Math.random() - 0.5) * 0.006; // ±0.003 radians (~0.17°)
    const a = ballAngle + jitter;
    const vx = BALL_SPEED * Math.sin(a);
    const vy = BALL_SPEED * Math.cos(a);
    Body.setVelocity(ballBody, { x: vx, y: vy });

    World.add(engine.world, ballBody);
  }

  function destroyPhysicsWorld() {
    if (engine) {
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
      engine = null;
    }
    pinBodies = [];
    ballBody = null;
    wallBodies = [];
  }

  /* ── Determine knocked pins ─────────────────────── */
  function getKnockedPins() {
    const knocked = [];
    for (const { body, idx } of pinBodies) {
      const pos = body.position;
      const vel = body.speed;
      // Pin is "knocked" if it moved significantly from original position
      const orig = PIN_POSITIONS[idx];
      const dx = pos.x - orig.x;
      const dy = pos.y - orig.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > PIN_RADIUS * 2 || pos.x < -10 || pos.x > LANE_W + 10 || pos.y > LANE_L + 20) {
        knocked.push(idx);
      }
    }
    return knocked;
  }

  /* ── Phase transitions ──────────────────────────── */
  function startAiming() {
    phase = 'aiming';
    aimMode = 'position';
    ballX = LANE_W / 2;
    ballAngle = 0;
    settleCounter = 0;
    ballRolling = false;
    ballPastPins = false;
  }

  function rollBall() {
    phase = 'rolling';
    ballRolling = true;
    ballPastPins = false;
    settleCounter = 0;
    createPhysicsWorld();
  }

  function handleScoring() {
    phase = 'scoring';
    scoreShowTimer = SCORE_SHOW_DURATION;

    const knocked = getKnockedPins();
    const pinsDownThisRoll = knocked.length;
    const player = players[currentPlayerIdx];
    const isFinal = (currentFrame === numFrames - 1);

    // Remove knocked pins from standing
    for (const idx of knocked) {
      const i = standingPins.indexOf(idx);
      if (i >= 0) standingPins.splice(i, 1);
    }

    // Record the roll
    if (!player.frames[currentFrame]) {
      player.frames[currentFrame] = { rolls: [] };
    }

    if (currentRoll === 0) {
      firstRollPinsDown = pinsDownThisRoll;
      player.frames[currentFrame].rolls.push(pinsDownThisRoll);
    } else {
      // Second (or third) roll: pins down is total knocked minus what was already down
      const totalDown = 10 - standingPins.length;
      const thisRollDown = totalDown - firstRollPinsDown;
      if (currentRoll === 1) {
        player.frames[currentFrame].rolls.push(thisRollDown);
      } else {
        // Third roll in final frame
        player.frames[currentFrame].rolls.push(pinsDownThisRoll);
      }
    }

    destroyPhysicsWorld();
    renderScorecard();

    // Confetti on strike (all 10 pins down on first roll)
    if (currentRoll === 0 && pinsDownThisRoll === 10) {
      spawnConfetti();
      scoreShowTimer = 3.0; // longer pause to enjoy the confetti
    }

    // Determine next action
    if (isFinal) {
      handleFinalFrame(player);
    } else {
      handleNormalFrame(player);
    }
  }

  function handleNormalFrame(player) {
    const f = player.frames[currentFrame];
    if (f.rolls[0] === 10 || f.rolls.length >= 2) {
      // Strike or second roll: advance to next player/frame
      advanceTurn();
    } else {
      // Second roll needed
      currentRoll = 1;
    }
  }

  function handleFinalFrame(player) {
    const f = player.frames[currentFrame];
    const rollCount = f.rolls.length;

    if (rollCount === 1) {
      if (f.rolls[0] === 10) {
        // Strike in final: reset pins, roll again
        standingPins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        firstRollPinsDown = 0;
      }
      currentRoll = 1;
    } else if (rollCount === 2) {
      const sum = f.rolls[0] + f.rolls[1];
      if (f.rolls[0] === 10) {
        // Had a strike first roll
        if (f.rolls[1] === 10) {
          // Two strikes: reset pins
          standingPins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          firstRollPinsDown = 0;
        } else {
          // first was strike, second wasn't. Keep remaining pins.
          firstRollPinsDown = f.rolls[1];
        }
        currentRoll = 2;
      } else if (sum === 10) {
        // Spare: reset pins, one more roll
        standingPins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        firstRollPinsDown = 0;
        currentRoll = 2;
      } else {
        // Open in final frame: done
        advanceTurn();
        return;
      }
    } else {
      // 3 rolls done
      advanceTurn();
      return;
    }
  }

  function advanceTurn() {
    currentPlayerIdx++;
    if (currentPlayerIdx >= players.length) {
      currentPlayerIdx = 0;
      currentFrame++;
    }
    currentRoll = 0;
    firstRollPinsDown = 0;
    standingPins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    if (currentFrame >= numFrames) {
      phase = 'results';
      showResults();
      return;
    }
  }

  /* ── Results screen ─────────────────────────────── */
  function showResults() {
    if (scorecardEl) scorecardEl.style.display = 'none';
    if (aimIndicatorEl) aimIndicatorEl.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.className = 'bw-results';

    const title = document.createElement('div');
    title.className = 'bw-results-title';
    title.textContent = 'Game Over!';
    overlay.appendChild(title);

    // Find winner
    let bestScore = -1;
    let winnerIdx = 0;
    for (let i = 0; i < players.length; i++) {
      const scores = calculateScores(players[i].frames, numFrames);
      const total = scores[scores.length - 1] || 0;
      if (total > bestScore) {
        bestScore = total;
        winnerIdx = i;
      }
    }

    if (players.length > 1) {
      const winnerEl = document.createElement('div');
      winnerEl.className = 'bw-results-winner';
      winnerEl.textContent = `${players[winnerIdx].name} wins!`;
      overlay.appendChild(winnerEl);
    }

    // All scorecards
    for (let pi = 0; pi < players.length; pi++) {
      const p = players[pi];
      const scores = calculateScores(p.frames, numFrames);
      const card = document.createElement('div');
      card.className = 'bw-results-card' + (pi === winnerIdx ? ' bw-results-highlight' : '');

      let html = `<div class="bw-results-player-name">${p.name}</div>`;
      html += '<div class="bw-scorecard-frames bw-results-frames">';
      for (let i = 0; i < numFrames; i++) {
        const f = p.frames[i] || { rolls: [] };
        const isFinal = (i === numFrames - 1);
        html += '<div class="bw-scorecard-frame">';
        html += `<div class="bw-frame-number">${i + 1}</div>`;
        html += '<div class="bw-frame-rolls">';

        if (isFinal) {
          for (let r = 0; r < 3; r++) {
            let display = '';
            if (r < f.rolls.length) {
              if (f.rolls[r] === 10) display = 'X';
              else if (r > 0 && f.rolls[r] + f.rolls[r - 1] === 10 && f.rolls[r - 1] !== 10) display = '/';
              else display = f.rolls[r] === 0 ? '-' : '' + f.rolls[r];
            }
            html += `<span class="bw-roll-cell">${display}</span>`;
          }
        } else {
          let r1 = '', r2 = '';
          if (f.rolls.length > 0) {
            if (f.rolls[0] === 10) { r1 = ''; r2 = 'X'; }
            else {
              r1 = f.rolls[0] === 0 ? '-' : '' + f.rolls[0];
              if (f.rolls.length > 1) r2 = isSpare(f) ? '/' : (f.rolls[1] === 0 ? '-' : '' + f.rolls[1]);
            }
          }
          html += `<span class="bw-roll-cell">${r1}</span><span class="bw-roll-cell">${r2}</span>`;
        }

        html += '</div>';
        html += `<div class="bw-frame-score">${scores[i] != null ? scores[i] : ''}</div>`;
        html += '</div>';
      }
      html += '</div>';
      const total = scores[scores.length - 1] || 0;
      html += `<div class="bw-results-total">Total: ${total}</div>`;

      card.innerHTML = html;
      overlay.appendChild(card);
    }

    // Buttons
    const btnRow = document.createElement('div');
    btnRow.className = 'bw-results-btns';
    const againBtn = document.createElement('button');
    againBtn.className = 'bw-play-btn';
    againBtn.textContent = 'Play Again';
    listen(againBtn, 'pointerup', () => {
      overlay.remove();
      showSetup();
    });
    const exitBtn = document.createElement('button');
    exitBtn.className = 'bw-exit-btn';
    exitBtn.textContent = 'Exit';
    listen(exitBtn, 'pointerup', () => App.showMenu());
    btnRow.appendChild(againBtn);
    btnRow.appendChild(exitBtn);
    overlay.appendChild(btnRow);

    wrapperRef.appendChild(overlay);
  }

  /* ── Setup screen ──────────────────────────────── */
  function showSetup() {
    phase = 'setup';
    if (canvas) canvas.style.display = 'none';
    if (scorecardEl) scorecardEl.style.display = 'none';
    if (aimIndicatorEl) aimIndicatorEl.style.display = 'none';

    // Remove old results
    const oldResults = wrapperRef.querySelector('.bw-results');
    if (oldResults) oldResults.remove();

    if (setupEl) {
      setupEl.style.display = '';
      return;
    }

    setupEl = document.createElement('div');
    setupEl.className = 'bw-setup';

    const title = document.createElement('div');
    title.className = 'bw-setup-title';
    title.textContent = 'Bowling';
    setupEl.appendChild(title);

    const icon = document.createElement('div');
    icon.className = 'bw-setup-icon';
    icon.textContent = '🎳';
    setupEl.appendChild(icon);

    // Player count
    const pcLabel = document.createElement('div');
    pcLabel.className = 'bw-setup-label';
    pcLabel.textContent = 'Players';
    setupEl.appendChild(pcLabel);

    const pcRow = document.createElement('div');
    pcRow.className = 'bw-setup-row';
    let selectedPlayerCount = 1;
    const pcBtns = [];
    for (let n = 1; n <= 4; n++) {
      const btn = document.createElement('button');
      btn.className = 'bw-option-btn' + (n === 1 ? ' bw-option-active' : '');
      btn.textContent = n;
      pcBtns.push(btn);
      listen(btn, 'pointerup', () => {
        selectedPlayerCount = n;
        pcBtns.forEach(b => b.classList.remove('bw-option-active'));
        btn.classList.add('bw-option-active');
        updateNameInputs();
      });
      pcRow.appendChild(btn);
    }
    setupEl.appendChild(pcRow);

    // Frame count
    const fcLabel = document.createElement('div');
    fcLabel.className = 'bw-setup-label';
    fcLabel.textContent = 'Frames';
    setupEl.appendChild(fcLabel);

    const fcRow = document.createElement('div');
    fcRow.className = 'bw-setup-row';
    let selectedFrames = 10;
    const fcBtns = [];
    for (const n of [5, 10]) {
      const btn = document.createElement('button');
      btn.className = 'bw-option-btn' + (n === 10 ? ' bw-option-active' : '');
      btn.textContent = n;
      fcBtns.push(btn);
      listen(btn, 'pointerup', () => {
        selectedFrames = n;
        fcBtns.forEach(b => b.classList.remove('bw-option-active'));
        btn.classList.add('bw-option-active');
      });
      fcRow.appendChild(btn);
    }
    setupEl.appendChild(fcRow);

    // Name inputs
    const namesDiv = document.createElement('div');
    namesDiv.className = 'bw-name-inputs';
    setupEl.appendChild(namesDiv);

    const nameInputs = [];
    function updateNameInputs() {
      namesDiv.innerHTML = '';
      nameInputs.length = 0;
      for (let i = 0; i < selectedPlayerCount; i++) {
        const input = document.createElement('input');
        input.className = 'bw-name-input';
        input.type = 'text';
        input.placeholder = `Player ${i + 1}`;
        input.maxLength = 12;
        nameInputs.push(input);
        namesDiv.appendChild(input);
      }
    }
    updateNameInputs();

    // Start button
    const startBtn = document.createElement('button');
    startBtn.className = 'bw-play-btn';
    startBtn.textContent = 'Start!';
    listen(startBtn, 'pointerup', () => {
      numFrames = selectedFrames;
      players = [];
      for (let i = 0; i < selectedPlayerCount; i++) {
        const name = (nameInputs[i].value.trim()) || `Player ${i + 1}`;
        players.push({ name, frames: [] });
      }
      currentPlayerIdx = 0;
      currentFrame = 0;
      currentRoll = 0;
      firstRollPinsDown = 0;
      standingPins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      setupEl.style.display = 'none';
      canvas.style.display = '';
      scorecardEl.style.display = '';
      aimIndicatorEl.style.display = '';
      renderScorecard();
      startAiming();
    });
    setupEl.appendChild(startBtn);

    wrapperRef.appendChild(setupEl);
  }

  /* ── Input handling ─────────────────────────────── */
  let keysDown = {};

  function onKeyDown(e) {
    if (phase === 'setup' || phase === 'results') return;

    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
    }

    keysDown[e.key] = true;

    if (e.key === ' ' && phase === 'aiming') {
      rollBall();
      return;
    }

    if (e.key === 'ArrowUp' && phase === 'aiming') {
      aimMode = aimMode === 'position' ? 'angle' : 'position';
      return;
    }

    // Discrete angle steps on keydown
    if (phase === 'aiming' && aimMode === 'angle') {
      if (e.key === 'ArrowLeft') {
        ballAngle = Math.max(-MAX_ANGLE, ballAngle - ANGLE_STEP);
        return;
      }
      if (e.key === 'ArrowRight') {
        ballAngle = Math.min(MAX_ANGLE, ballAngle + ANGLE_STEP);
        return;
      }
    }
  }

  function onKeyUp(e) {
    keysDown[e.key] = false;
  }

  function handleAimInput(dt) {
    if (phase !== 'aiming') return;

    if (aimMode === 'position') {
      if (keysDown['ArrowLeft']) {
        ballX = Math.max(BALL_RADIUS + 2, ballX - AIM_SPEED * dt);
      }
      if (keysDown['ArrowRight']) {
        ballX = Math.min(LANE_W - BALL_RADIUS - 2, ballX + AIM_SPEED * dt);
      }
    }
    // Angle is handled discretely in onKeyDown
  }

  /* ── Rendering ──────────────────────────────────── */
  function render() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Draw cached background
    renderBackground();
    ctx.drawImage(bgCanvas, 0, 0);

    if (phase === 'aiming') {
      renderAiming();
    } else if (phase === 'rolling' || phase === 'settling') {
      renderPhysics();
    } else if (phase === 'scoring') {
      renderStandingPins();
    }

    // Confetti overlay (drawn on top of everything)
    if (confettiParticles.length > 0) {
      updateAndDrawConfetti(1 / 60);
    }
  }

  function renderAiming() {
    // Draw standing pins
    renderStandingPins();

    // Draw ball at foul line
    const bp = project(ballX, 0);
    const ballScreenR = BALL_RADIUS / LANE_W * canvasW * LANE_W_FRAC / 2 * bp.scale;
    currentTheme.drawBall(ctx, bp.x, bp.y, Math.max(4, ballScreenR));

    // Draw aim line
    ctx.strokeStyle = aimMode === 'angle' ? 'rgba(255,100,100,0.6)' : 'rgba(100,200,255,0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const dist = t * LANE_L * 0.9;
      const px = ballX + dist * Math.sin(ballAngle);
      const py = dist;
      // Stop if ball goes into gutter
      if (px < 0 || px > LANE_W) break;
      const p = project(px, py);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Aim mode indicator
    if (aimIndicatorEl) {
      aimIndicatorEl.textContent = aimMode === 'position'
        ? '← → Move Ball  |  ↑ Switch to Angle  |  Space = Roll'
        : '← → Adjust Angle  |  ↑ Switch to Position  |  Space = Roll';
    }
  }

  function renderStandingPins() {
    // Draw pins back-to-front (by row)
    const sortedPins = [...standingPins].sort((a, b) => {
      return PIN_POSITIONS[b].y - PIN_POSITIONS[a].y; // farther first
    });
    for (const idx of sortedPins) {
      const pos = PIN_POSITIONS[idx];
      const p = project(pos.x, pos.y);
      currentTheme.drawPin(ctx, p.x, p.y, p.scale);
    }
  }

  function renderPhysics() {
    if (!engine) return;

    // Draw pins (both standing and knocked, from physics positions)
    // Sort by Y for painter's algorithm
    const sortedPinBodies = [...pinBodies].sort((a, b) => {
      return b.body.position.y - a.body.position.y;
    });

    for (const { body, idx } of sortedPinBodies) {
      const pos = body.position;
      // Skip pins that are way off screen
      if (pos.x < -50 || pos.x > LANE_W + 50 || pos.y > LANE_L + 50) continue;
      const p = project(pos.x, pos.y);

      // Check if this pin has been knocked (displaced significantly)
      const orig = PIN_POSITIONS[idx];
      const dx = pos.x - orig.x;
      const dy = pos.y - orig.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > PIN_RADIUS * 2) {
        // Knocked pin - draw with slight opacity fade based on displacement
        const opacity = Math.max(0, 1 - dist / 150);
        if (opacity <= 0) continue;
        ctx.globalAlpha = opacity;
        currentTheme.drawPin(ctx, p.x, p.y, p.scale * 0.8);
        ctx.globalAlpha = 1;
      } else {
        currentTheme.drawPin(ctx, p.x, p.y, p.scale);
      }
    }

    // Draw ball
    if (ballBody) {
      const pos = ballBody.position;
      if (pos.y < LANE_L + 50 && pos.x > -50 && pos.x < LANE_W + 50) {
        const p = project(pos.x, pos.y);
        const ballScreenR = BALL_RADIUS / LANE_W * canvasW * LANE_W_FRAC / 2 * p.scale;
        currentTheme.drawBall(ctx, p.x, p.y, Math.max(2, ballScreenR));
      }
    }
  }

  /* ── Game Loop ──────────────────────────────────── */
  function loop(ts) {
    const dt = Math.min((ts - lastTime) / 1000, 0.1);
    lastTime = ts;

    if (phase === 'aiming') {
      handleAimInput(dt);
      render();
    } else if (phase === 'rolling' || phase === 'settling') {
      // Step physics
      if (engine) {
        Matter.Engine.update(engine, 1000 / 60);

        if (ballBody) {
          const bx = ballBody.position.x;
          const by = ballBody.position.y;

          // Gutter ball: if ball center is outside lane, lock it into the gutter channel
          if (bx < 0 || bx > LANE_W) {
            // Clamp X to gutter channel and kill lateral velocity entirely
            const gutterX = bx < 0 ? -15 : LANE_W + 15;
            Matter.Body.setPosition(ballBody, { x: gutterX, y: by });
            const vel = ballBody.velocity;
            Matter.Body.setVelocity(ballBody, { x: 0, y: vel.y * 0.98 });
          }

          // Remove ball once it passes the pins
          if (by > LANE_L - 30) {
            Matter.World.remove(engine.world, ballBody);
            ballBody = null;
            ballPastPins = true;
          }
        }
      }

      // Check if ball passed pin area (also set if ball removed above)
      if (ballBody && ballBody.position.y > LANE_L - 40) {
        ballPastPins = true;
      }

      // Check settling
      if (ballPastPins) {
        phase = 'settling';
        let allSlow = true;
        for (const { body } of pinBodies) {
          if (body.speed > SETTLE_THRESHOLD) {
            allSlow = false;
            break;
          }
        }
        if (allSlow) {
          settleCounter++;
        } else {
          settleCounter = 0;
        }
        if (settleCounter >= SETTLE_FRAMES) {
          handleScoring();
        }
      }

      render();
    } else if (phase === 'scoring') {
      scoreShowTimer -= dt;
      render();
      if (scoreShowTimer <= 0) {
        startAiming();
        renderScorecard();
      }
    } else if (phase === 'results') {
      render();
    }

    animFrameId = requestAnimationFrame(loop);
  }

  /* ── Init ───────────────────────────────────────── */
  function init(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'bw-wrapper';
    container.appendChild(wrapper);
    wrapperRef = wrapper;

    // Canvas
    canvas = document.createElement('canvas');
    canvas.className = 'bw-canvas';
    wrapper.appendChild(canvas);

    function resize() {
      const rect = wrapper.getBoundingClientRect();
      canvasW = rect.width;
      canvasH = rect.height;
      canvas.width = canvasW;
      canvas.height = canvasH;
      bgCanvas = null; // force re-render
    }
    resize();
    ctx = canvas.getContext('2d');
    listen(window, 'resize', resize);

    // Scorecard
    scorecardEl = document.createElement('div');
    scorecardEl.className = 'bw-scorecard';
    scorecardEl.style.display = 'none';
    wrapper.appendChild(scorecardEl);

    // Aim indicator
    aimIndicatorEl = document.createElement('div');
    aimIndicatorEl.className = 'bw-aim-indicator';
    aimIndicatorEl.style.display = 'none';
    wrapper.appendChild(aimIndicatorEl);

    // Keyboard
    listen(document, 'keydown', onKeyDown);
    listen(document, 'keyup', onKeyUp);

    // Show setup
    showSetup();

    // Start render loop
    lastTime = performance.now();
    animFrameId = requestAnimationFrame(loop);
  }

  /* ── Destroy ────────────────────────────────────── */
  function destroy() {
    cancelAnimationFrame(animFrameId);
    destroyPhysicsWorld();

    listeners.forEach(({ el, event, handler, opts }) =>
      el.removeEventListener(event, handler, opts));
    listeners.length = 0;

    keysDown = {};
    phase = 'setup';
    canvas = null;
    ctx = null;
    bgCanvas = null;
    scorecardEl = null;
    aimIndicatorEl = null;
    setupEl = null;
    wrapperRef = null;
    players = [];
  }

  /* ── Register ───────────────────────────────────── */
  App.registerGame({
    id: 'bowling',
    title: 'Bowling',
    description: 'Bowl strikes and spares!',
    icon: '🎳',
    init,
    destroy
  });
})();
