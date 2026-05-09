/* ── Potion Making: village board generator + renderer ── */
(function () {
  window.PotionMaking = window.PotionMaking || {};
  const PM = window.PotionMaking;

  const SIZE = 25;          // grid is SIZE × SIZE
  const CELL = 32;          // pixels per cell
  const SPAWN = { x: 12, y: 12 };

  const CELL_BLOCKED = 0;
  const CELL_PATH = 1;

  /* ── Mulberry32 seeded PRNG ─────────────────────── */
  function mulberry32(seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0; s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function generateBoard(seed) {
    seed = (seed || Date.now()) >>> 0;
    let attempt = 0;
    while (attempt < 5) {
      const board = tryGenerate(seed + attempt);
      if (board) return board;
      attempt++;
    }
    // Fallback — last-resort simple cross
    return forcedCross(seed);
  }

  function tryGenerate(seed) {
    const rng = mulberry32(seed);
    const grid = makeGrid(CELL_BLOCKED);

    // Sample 5–6 destinations from quadrants
    const numDest = 5 + Math.floor(rng() * 2);
    const dests = pickDestinations(rng, numDest);
    grid[SPAWN.y][SPAWN.x] = CELL_PATH;

    // L-shaped corridors spawn → elbow → dest
    dests.forEach(d => {
      const elbow = rng() < 0.5
        ? { x: d.x, y: SPAWN.y }
        : { x: SPAWN.x, y: d.y };
      drawLine(grid, SPAWN, elbow);
      drawLine(grid, elbow, d);
    });

    // Dilate by 1 (3-wide corridors)
    const dilated = dilate(grid);

    // Flood-fill from spawn, ensure all destinations reachable
    const reach = floodFill(dilated, SPAWN);
    for (const d of dests) {
      if (!reach[d.y][d.x]) return null;
    }

    // Place props on blocked tiles
    const props = placeProps(dilated, rng);

    // Spawnable cells: walkable & far from spawn
    const spawnable = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (dilated[y][x] !== CELL_PATH) continue;
        const md = Math.abs(x - SPAWN.x) + Math.abs(y - SPAWN.y);
        if (md > 5) spawnable.push({ x, y });
      }
    }

    return {
      seed,
      grid: dilated,
      props,
      spawn: { x: SPAWN.x, y: SPAWN.y },
      spawnable,
      size: SIZE,
      cell: CELL
    };
  }

  function forcedCross(seed) {
    const grid = makeGrid(CELL_BLOCKED);
    for (let i = 0; i < SIZE; i++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (SPAWN.x + dx >= 0 && SPAWN.x + dx < SIZE) grid[i][SPAWN.x + dx] = CELL_PATH;
        if (SPAWN.y + dx >= 0 && SPAWN.y + dx < SIZE) grid[SPAWN.y + dx][i] = CELL_PATH;
      }
    }
    return {
      seed,
      grid,
      props: [],
      spawn: { x: SPAWN.x, y: SPAWN.y },
      spawnable: collectFar(grid, SPAWN, 5),
      size: SIZE,
      cell: CELL
    };
  }

  function collectFar(grid, spawn, minDist) {
    const out = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (grid[y][x] !== CELL_PATH) continue;
        const md = Math.abs(x - spawn.x) + Math.abs(y - spawn.y);
        if (md > minDist) out.push({ x, y });
      }
    }
    return out;
  }

  function makeGrid(fill) {
    const g = [];
    for (let y = 0; y < SIZE; y++) {
      const row = [];
      for (let x = 0; x < SIZE; x++) row.push(fill);
      g.push(row);
    }
    return g;
  }

  function pickDestinations(rng, n) {
    const quadrants = [
      { xMin: 1, xMax: 9,  yMin: 1, yMax: 9 },
      { xMin: 15, xMax: 23, yMin: 1, yMax: 9 },
      { xMin: 1, xMax: 9,  yMin: 15, yMax: 23 },
      { xMin: 15, xMax: 23, yMin: 15, yMax: 23 }
    ];
    const dests = [];
    for (let i = 0; i < n; i++) {
      const q = quadrants[i % quadrants.length];
      const x = Math.floor(q.xMin + rng() * (q.xMax - q.xMin + 1));
      const y = Math.floor(q.yMin + rng() * (q.yMax - q.yMin + 1));
      dests.push({ x, y });
    }
    return dests;
  }

  function drawLine(grid, a, b) {
    if (a.x === b.x) {
      const [y0, y1] = a.y < b.y ? [a.y, b.y] : [b.y, a.y];
      for (let y = y0; y <= y1; y++) grid[y][a.x] = CELL_PATH;
    } else if (a.y === b.y) {
      const [x0, x1] = a.x < b.x ? [a.x, b.x] : [b.x, a.x];
      for (let x = x0; x <= x1; x++) grid[a.y][x] = CELL_PATH;
    }
  }

  function dilate(grid) {
    const out = makeGrid(CELL_BLOCKED);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (grid[y][x] !== CELL_PATH) continue;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
            out[ny][nx] = CELL_PATH;
          }
        }
      }
    }
    return out;
  }

  function floodFill(grid, start) {
    const seen = makeGrid(false);
    const stack = [start];
    seen[start.y][start.x] = true;
    while (stack.length) {
      const c = stack.pop();
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [dx, dy] of dirs) {
        const nx = c.x + dx, ny = c.y + dy;
        if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) continue;
        if (seen[ny][nx]) continue;
        if (grid[ny][nx] !== CELL_PATH) continue;
        seen[ny][nx] = true;
        stack.push({ x: nx, y: ny });
      }
    }
    return seen;
  }

  /* Place props (tree 1x1, tent 2x2, building 4x4) on blocked tiles */
  function placeProps(grid, rng) {
    const used = makeGrid(false); // marks cells already covered by a prop
    // Mark path cells as used so props don't overlap path
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (grid[y][x] === CELL_PATH) used[y][x] = true;
      }
    }

    const props = [];

    // Try larger props first (greedy placement)
    tryPlace(used, props, rng, 'building', 4, 0.15, 6);
    tryPlace(used, props, rng, 'tent', 2, 0.25, 14);
    tryPlace(used, props, rng, 'tree', 1, 0.6, 80);

    return props;
  }

  function tryPlace(used, props, rng, kind, size, density, maxCount) {
    let placed = 0;
    const attempts = SIZE * SIZE * 2;
    for (let i = 0; i < attempts && placed < maxCount; i++) {
      if (rng() > density) continue;
      const x = Math.floor(rng() * (SIZE - size + 1));
      const y = Math.floor(rng() * (SIZE - size + 1));
      if (footprintFree(used, x, y, size)) {
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            used[y + dy][x + dx] = true;
          }
        }
        props.push({ kind, x, y, size });
        placed++;
      }
    }
  }

  function footprintFree(used, x, y, size) {
    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        if (used[y + dy][x + dx]) return false;
      }
    }
    return true;
  }

  /* ── Rendering ──────────────────────────────────── */

  function drawStaticLayer(container, board) {
    const layer = document.createElement('div');
    layer.className = 'pm-vil-static';
    layer.style.width = (SIZE * CELL) + 'px';
    layer.style.height = (SIZE * CELL) + 'px';

    // Path cells
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (board.grid[y][x] !== CELL_PATH) continue;
        const tile = document.createElement('div');
        tile.className = 'pm-vil-tile pm-vil-path';
        tile.style.left = (x * CELL) + 'px';
        tile.style.top = (y * CELL) + 'px';
        tile.style.width = CELL + 'px';
        tile.style.height = CELL + 'px';
        layer.appendChild(tile);
      }
    }

    // Grass background filling everywhere not path
    const bg = document.createElement('div');
    bg.className = 'pm-vil-grass';
    layer.appendChild(bg);

    // Props
    board.props.forEach(p => {
      const el = document.createElement('div');
      el.className = `pm-vil-prop pm-vil-prop-${p.kind}`;
      el.style.left = (p.x * CELL) + 'px';
      el.style.top = (p.y * CELL) + 'px';
      el.style.width = (p.size * CELL) + 'px';
      el.style.height = (p.size * CELL) + 'px';
      el.innerHTML = propSVG(p.kind);
      layer.appendChild(el);
    });

    container.appendChild(layer);
    return layer;
  }

  function propSVG(kind) {
    if (kind === 'tree') {
      return `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="22" rx="10" ry="3" fill="#1a1a1a" opacity="0.3"/>
        <rect x="14" y="20" width="4" height="6" fill="#5a3a1a"/>
        <circle cx="16" cy="14" r="11" fill="#2a8a3a"/>
        <circle cx="11" cy="11" r="6" fill="#3aa84a"/>
        <circle cx="20" cy="10" r="5" fill="#3aa84a"/>
        <circle cx="22" cy="16" r="5" fill="#3aa84a"/>
      </svg>`;
    }
    if (kind === 'tent') {
      return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="56" rx="26" ry="4" fill="#1a1a1a" opacity="0.3"/>
        <polygon points="32,8 8,52 56,52" fill="#c0562b"/>
        <polygon points="32,8 32,52 56,52" fill="#a0431a"/>
        <polygon points="22,52 32,28 32,52" fill="#3a2a1a"/>
        <line x1="32" y1="4" x2="32" y2="10" stroke="#7a4a26" stroke-width="2"/>
        <circle cx="32" cy="3" r="2" fill="#f1c40f"/>
      </svg>`;
    }
    if (kind === 'building') {
      return `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="64" cy="120" rx="56" ry="6" fill="#1a1a1a" opacity="0.3"/>
        <rect x="14" y="40" width="100" height="76" fill="#d4a86a"/>
        <rect x="14" y="40" width="100" height="76" fill="none" stroke="#7a5a3a" stroke-width="3"/>
        <polygon points="6,42 64,8 122,42" fill="#7a3a1a"/>
        <rect x="50" y="76" width="28" height="40" fill="#5a3a1a"/>
        <circle cx="72" cy="96" r="2" fill="#f1c40f"/>
        <rect x="26" y="56" width="20" height="20" fill="#a8c8e8"/>
        <rect x="82" y="56" width="20" height="20" fill="#a8c8e8"/>
        <line x1="36" y1="56" x2="36" y2="76" stroke="#7a5a3a" stroke-width="1.5"/>
        <line x1="26" y1="66" x2="46" y2="66" stroke="#7a5a3a" stroke-width="1.5"/>
        <line x1="92" y1="56" x2="92" y2="76" stroke="#7a5a3a" stroke-width="1.5"/>
        <line x1="82" y1="66" x2="102" y2="66" stroke="#7a5a3a" stroke-width="1.5"/>
      </svg>`;
    }
    return '';
  }

  function isWalkable(board, x, y) {
    if (x < 0 || y < 0 || x >= board.size || y >= board.size) return false;
    return board.grid[y][x] === CELL_PATH;
  }

  PM.Village = {
    SIZE, CELL,
    generateBoard,
    drawStaticLayer,
    propSVG,
    isWalkable
  };
})();
