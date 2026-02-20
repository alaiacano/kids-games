Create a new action game for this project.

Ask the user for:
- Game name (e.g. "Frog Jump")
- CSS class prefix — 2-3 letters, e.g. `fj`
- Icon emoji
- One-line description

Derive the game ID automatically from the name: lowercase, spaces replaced with hyphens (e.g. "Frog Jump" → `frog-jump`).

Then do ALL of the following steps:

## Step 1: Create the game file

Create `js/games/<id>.js` with this exact structure. Fill in the placeholders:

```js
/* ── <Title> ─────────────────────────────────────── */
(() => {
  /* ── Constants ─────────────────────────────────── */
  const STORAGE_KEY = 'best-<id>';

  /* ── State ─────────────────────────────────────── */
  const listeners = [];
  let animFrameId = null;
  let gameActive = false;
  let lastTime = 0;
  let score = 0;
  let bestScore = parseInt(localStorage.getItem(STORAGE_KEY) || '0');

  /* ── DOM refs (set in init, cleared in destroy) ── */
  let wrapperRef = null;
  let scoreEl = null;

  /* ── Helpers ────────────────────────────────────── */
  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  function saveBest() {
    localStorage.setItem(STORAGE_KEY, bestScore);
  }

  /* ── Rendering helpers ──────────────────────────── */
  // TODO: add SVG constants and render helpers here

  /* ── Game logic ─────────────────────────────────── */
  // TODO: implement game-specific update logic

  /* ── Game Loop ──────────────────────────────────── */
  function loop(ts) {
    if (!gameActive) return;
    const dt = Math.min((ts - lastTime) / 1000, 0.1);
    lastTime = ts;

    // TODO: call update functions with dt

    animFrameId = requestAnimationFrame(loop);
  }

  /* ── Start / end ────────────────────────────────── */
  function startGame() {
    gameActive = true;
    score = 0;
    lastTime = performance.now();
    animFrameId = requestAnimationFrame(loop);
  }

  function endGame() {
    gameActive = false;
    cancelAnimationFrame(animFrameId);
    if (score > bestScore) {
      bestScore = score;
      saveBest();
    }
    // TODO: show game-over UI
  }

  /* ── Init ───────────────────────────────────────── */
  function init(container) {
    const wrapper = document.createElement('div');
    wrapper.className = '<prefix>-wrapper';
    container.appendChild(wrapper);
    wrapperRef = wrapper;

    // TODO: build start screen and game DOM
    // Use listen() for ALL event listeners so destroy() cleans them up
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

    wrapperRef = null;
    scoreEl = null;
  }

  /* ── Register ───────────────────────────────────── */
  App.registerGame({
    id: '<id>',
    title: '<Title>',
    description: '<description>',
    icon: '<emoji>',
    init,
    destroy
  });
})();
```

## Step 2: Add the script tag to index.html

Read `index.html` and add `<script src="js/games/<id>.js"></script>` immediately before `</body>`. The new tag goes AFTER all existing game script tags.

## Step 3: Tell the user what to do next

Print a short summary:
- File created: `js/games/<id>.js`
- Script tag added to `index.html`
- Remind them to add CSS rules to `css/style.css` using the `.<prefix>-` class prefix
- Remind them to update the Games table in `CLAUDE.md`
