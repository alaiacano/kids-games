# Kids Game - Project Guide

## Overview
Multi-game children's app built with vanilla HTML/CSS/JS, packaged as a macOS desktop app via Tauri v2, and also playable in the browser via `index.html`. All graphics are inline SVG strings (no external image files). No ES modules — everything uses classic `<script>` globals loaded in order.

## Project Structure
```
kids-game/
├── index.html                    # Entry point, loads all scripts in order
├── css/style.css                 # All styling (~1250 lines)
├── js/
│   ├── app.js                    # Game framework (registerGame, showMenu, showGame)
│   ├── games/
│   │   ├── shared-stickers.js    # SharedStickers.BOY / .GIRL (used by playground + dollhouse)
│   │   ├── sticker-scene.js      # Space sticker builder (uses SharedStickers.SPACE + .DINOS)
│   │   ├── playground-scene.js   # Playground scene builder
│   │   ├── dollhouse-scene.js    # Dollhouse decorator
│   │   ├── demon-hunters.js      # K-Pop whack-a-mole
│   │   ├── desert-dash.js        # 3D perspective driving dodge game
│   │   ├── bunny-hop.js          # Side-scrolling platformer runner
│   │   ├── bowling.js            # Physics-based bowling (uses matter.js)
│   │   └── potion-making/        # Multi-screen potion brewer + village combat
│   │       ├── potion-data.js    # PotionMaking.Potions / .Monsters
│   │       ├── characters.js     # PotionMaking.Characters factory + presets
│   │       ├── screens-meta.js   # CharacterSelect / Gallery / Mixing screens
│   │       ├── village.js        # Procedural top-down board generator
│   │       └── potion-making.js  # Main: registers game, orchestrates screens, combat
│   └── stickers/
│       ├── space-stickers.js     # SharedStickers.SPACE (14 space stickers)
│       └── dino-stickers.js      # SharedStickers.DINOS (6 dinosaur stickers)
├── src-tauri/                    # Tauri v2 desktop app config
└── package.json
```

## Architecture

### Game Framework (app.js)
- `App.registerGame({ id, title, description, icon, init, destroy })` — registers a game
- `App.showGame(id)` — calls `init(container)` to start a game
- `App.showMenu()` — calls `destroy()` on active game, returns to menu

### Key Patterns
- **IIFEs**: Every game wraps in `(() => { ... })()` to avoid globals
- **Listener cleanup**: Games maintain a `listeners` array; `listen(el, event, handler)` tracks them, `destroy()` removes all
- **Pointer events**: Uses `pointerdown/pointermove/pointerup` for unified mouse+touch
- **localStorage**: Builder games auto-save placed stickers; action games save high scores
- **Game loops**: Action games use `requestAnimationFrame` with delta-time

### Sticker System
- `window.SharedStickers` is built up across multiple files loaded in order:
  1. `shared-stickers.js` — sets `SharedStickers = { BOY, GIRL }`
  2. `space-stickers.js` — adds `SharedStickers.SPACE = [{ name, svg }, ...]`
  3. `dino-stickers.js` — adds `SharedStickers.DINOS = [{ name, svg }, ...]`
- Sticker scene saves use **numeric array indices** — reordering the STICKERS array breaks saved scenes
- Space stickers are indices 0–13, dinos are 14–19

## Games

| Game | ID | Icon | Type | CSS Prefix |
|------|----|------|------|------------|
| Sticker Scene Builder | `sticker-scene` | 🚀 | Builder (event-driven) | `.ss-` |
| Playground Builder | `playground-scene` | 🛝 | Builder (event-driven) | shared |
| Dollhouse Decorator | `dollhouse-scene` | 🏠 | Builder (event-driven) | shared |
| K-Pop Demon Hunters | `demon-hunters` | ⚔️ | Action (whack-a-mole) | `.dh-` |
| Desert Dash | `desert-dash` | 🏜️ | Action (lane dodge) | `.dd-` |
| Bunny Hop | `bunny-hop` | 🐰 | Action (platformer) | `.bh-` |
| Bowling | `bowling` | 🎳 | Action (physics bowling) | `.bw-` |
| Potion Making | `potion-making` | 🧪 | Multi-screen (build + combat) | `.pm-` |

## Potion Making notes
The `potion-making` game is the only multi-file game and the only one with multiple screens (character select → gallery → mixing → village combat). It lives in `js/games/potion-making/` and registers itself via the entrypoint `potion-making.js` (loads last). Sub-prefixes for CSS: `.pm-char-` / `.pm-gal-` / `.pm-mix-` / `.pm-vil-`. localStorage uses `pm-characters` / `pm-potions` keyed by stable string ids — never index-based — so adding new singular potions is purely additive (see `/new-potion`).

## CSS Conventions
- Game-specific classes use prefixes: `.bh-` (bunny hop), `.dd-` (desert dash), `.dh-` (demon hunters), `.pm-` (potion making)
- Builder games share `.sticker-scene`, `.sticker-palette`, `.scene-canvas`, etc.
- Dark blue background (`#0b0d2a`) with animated starfield

## Script Load Order (index.html)
Scripts must load in this order — later files depend on earlier ones:
1. `js/app.js` (defines `App`)
2. `js/games/shared-stickers.js` (initializes `SharedStickers`)
3. `js/stickers/space-stickers.js` (adds `.SPACE`)
4. `js/stickers/dino-stickers.js` (adds `.DINOS`)
5. All game files (`sticker-scene.js`, `playground-scene.js`, etc.)
Note: `matter.min.js` (CDN) loads before `app.js` for the bowling game's physics engine.

## Running
- Browser: open `index.html` directly
- Tauri dev: `npx tauri dev`
- Tauri build: `npx tauri build`

---

## Checklist: Adding a New Game

1. Create `js/games/<id>.js` using the appropriate boilerplate below
2. Add `<script src="js/games/<id>.js"></script>` to `index.html` before `</body>`
3. Add any game-specific CSS to `css/style.css` using a new prefix (e.g. `.xy-`)
4. Update the Games table in this file

## Checklist: Adding a New Sticker Pack

1. Create `js/stickers/<name>-stickers.js` using the sticker pack boilerplate below
2. Add `<script src="js/stickers/<name>-stickers.js"></script>` to `index.html` **after** existing sticker scripts and **before** game scripts
3. Reference the new key (`SharedStickers.MYPACK`) in whichever game uses it
4. Update the Sticker System section in this file with new index ranges

---

## Boilerplates

### Action Game Skeleton (`js/games/<id>.js`)

```js
/* ── <Title> ─────────────────────────────────────── */
(() => {
  /* ── Constants ─────────────────────────────────── */
  const PREFIX = '<xy>'; // CSS class prefix, e.g. 'bh', 'dd'
  const STORAGE_KEY = 'best-<id>';

  /* ── State ─────────────────────────────────────── */
  const listeners = [];
  let animFrameId = null;
  let gameActive = false;
  let lastTime = 0;
  let score = 0;
  let bestScore = parseInt(localStorage.getItem(STORAGE_KEY) || '0');

  /* ── Helpers ────────────────────────────────────── */
  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  function saveBest() {
    localStorage.setItem(STORAGE_KEY, bestScore);
  }

  /* ── Game Loop ──────────────────────────────────── */
  function loop(ts) {
    if (!gameActive) return;
    const dt = Math.min((ts - lastTime) / 1000, 0.1); // seconds, capped
    lastTime = ts;

    // TODO: update game state using dt

    animFrameId = requestAnimationFrame(loop);
  }

  /* ── Init ───────────────────────────────────────── */
  function init(container) {
    gameActive = true;
    score = 0;

    // TODO: build DOM, attach listeners via listen()

    lastTime = performance.now();
    animFrameId = requestAnimationFrame(loop);
  }

  /* ── Destroy ────────────────────────────────────── */
  function destroy() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);

    listeners.forEach(({ el, event, handler, opts }) =>
      el.removeEventListener(event, handler, opts));
    listeners.length = 0;

    if (score > bestScore) {
      bestScore = score;
      saveBest();
    }
  }

  /* ── Register ───────────────────────────────────── */
  App.registerGame({
    id: '<id>',
    title: '<Title>',
    description: '<One-line description>',
    icon: '<emoji>',
    init,
    destroy
  });
})();
```

### Sticker Pack Skeleton (`js/stickers/<name>-stickers.js`)

```js
/* ── <Name> Sticker SVGs ────────────────────────── */
(function () {
  window.SharedStickers = window.SharedStickers || {};

  window.SharedStickers.<KEY> = [
    {
      name: '<StickerName>',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content here -->
      </svg>`
    },
    // ... more stickers — DO NOT reorder; indices are saved in localStorage
  ];
})();
```

### Custom Slash Commands
- `/new-action-game` — scaffolds a complete action game file
- `/new-sticker-pack` — scaffolds a complete sticker pack file
- `/new-potion` — appends a new singular potion to the Potion Making data file and generates combo names
