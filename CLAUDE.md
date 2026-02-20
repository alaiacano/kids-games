# Kids Game - Project Guide

## Overview
Multi-game children's app built with vanilla HTML/CSS/JS, packaged as a macOS desktop app via Tauri v2. All graphics are inline SVG strings (no external image files). No ES modules — everything uses classic `<script>` globals loaded in order.

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
│   │   └── bunny-hop.js          # Side-scrolling platformer runner
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

| Game | ID | Icon | Type |
|------|----|------|------|
| Sticker Scene Builder | `sticker-scene` | 🚀 | Builder (event-driven) |
| Playground Builder | `playground-scene` | 🛝 | Builder (event-driven) |
| Dollhouse Decorator | `dollhouse-scene` | 🏠 | Builder (event-driven) |
| K-Pop Demon Hunters | `demon-hunters` | ⚔️ | Action (whack-a-mole) |
| Desert Dash | `desert-dash` | 🏜️ | Action (lane dodge) |
| Bunny Hop | `bunny-hop` | 🐰 | Action (platformer) |

## CSS Conventions
- Game-specific classes use prefixes: `.bh-` (bunny hop), `.dd-` (desert dash), `.dh-` (demon hunters)
- Builder games share `.sticker-scene`, `.sticker-palette`, `.scene-canvas`, etc.
- Dark blue background (`#0b0d2a`) with animated starfield

## Script Load Order (index.html)
Scripts must load in this order — later files depend on earlier ones:
1. `js/app.js` (defines `App`)
2. `js/games/shared-stickers.js` (initializes `SharedStickers`)
3. `js/stickers/space-stickers.js` (adds `.SPACE`)
4. `js/stickers/dino-stickers.js` (adds `.DINOS`)
5. All game files (`sticker-scene.js`, `playground-scene.js`, etc.)

## Running
- Browser: open `index.html` directly
- Tauri dev: `npx tauri dev`
- Tauri build: `npx tauri build`
