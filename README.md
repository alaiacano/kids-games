# Kids Game

A collection of kids' games built with plain HTML/CSS/JS, wrapped as a native desktop app using Tauri v2.

## Play in Browser

Open `index.html` in your browser.

## Build Desktop App

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://rustup.rs/) (stable, 1.85+)
- macOS system dependencies are included via Xcode Command Line Tools

### Setup

```bash
npm install
```

### Development

Run the app in a dev window with hot-reload:

```bash
npx tauri dev
```

### Production Build

```bash
npx tauri build
```

Outputs:
- `src-tauri/target/release/bundle/macos/kids-game.app`
- `src-tauri/target/release/bundle/dmg/kids-game_0.1.0_aarch64.dmg`

### Regenerate App Icon

If you modify `app-icon.svg`:

```bash
node -e "require('sharp')('app-icon.svg').resize(1024,1024).png().toFile('app-icon.png')"
npx tauri icon app-icon.png
```
