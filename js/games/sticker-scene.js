/* ── Sticker Scene Builder ────────────────────────── */
(() => {
  /* ── SVG Sticker Definitions ─────────────────────── */
  const STICKERS = [
    {
      name: 'Rocket',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 C50 5 70 30 70 65 L30 65 C30 30 50 5 50 5Z" fill="#e74c3c"/>
        <path d="M50 5 C50 5 55 30 55 65 L50 65 L45 65 C45 30 50 5 50 5Z" fill="#c0392b"/>
        <circle cx="50" cy="40" r="8" fill="#aed6f1" stroke="#2c3e50" stroke-width="2"/>
        <circle cx="50" cy="40" r="4" fill="#d4effc"/>
        <path d="M30 65 L20 80 L35 70Z" fill="#7f8c8d"/>
        <path d="M70 65 L80 80 L65 70Z" fill="#7f8c8d"/>
        <path d="M38 65 Q50 90 62 65Z" fill="#f39c12"/>
        <path d="M42 65 Q50 82 58 65Z" fill="#f1c40f"/>
        <path d="M46 65 Q50 75 54 65Z" fill="#fff5cc"/>
      </svg>`
    },
    {
      name: 'Earth',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="42" fill="#3498db"/>
        <path d="M30 25 Q35 20 45 22 Q50 30 42 38 Q30 35 30 25Z" fill="#27ae60"/>
        <path d="M55 18 Q65 15 70 22 Q68 30 58 28 Q52 22 55 18Z" fill="#27ae60"/>
        <path d="M20 45 Q25 40 35 45 Q40 55 35 62 Q22 60 18 52Z" fill="#27ae60"/>
        <path d="M50 45 Q65 40 75 50 Q78 65 65 72 Q55 68 48 58Z" fill="#2ecc71"/>
        <path d="M30 70 Q35 65 42 72 Q38 80 30 78Z" fill="#27ae60"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="none"/>
        <circle cx="35" cy="30" r="15" fill="rgba(255,255,255,0.1)"/>
      </svg>`
    },
    {
      name: 'Saturn',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="48" ry="12" fill="none" stroke="#c9a96e" stroke-width="5" transform="rotate(-20 50 50)"/>
        <circle cx="50" cy="50" r="22" fill="#e8c96e"/>
        <circle cx="50" cy="50" r="22" fill="url(#saturnShade)"/>
        <ellipse cx="50" cy="50" rx="48" ry="12" fill="none" stroke="#d4b870" stroke-width="3" transform="rotate(-20 50 50)" stroke-dasharray="4 6"/>
        <defs>
          <radialGradient id="saturnShade"><stop offset="30%" stop-color="#f0d878"/><stop offset="100%" stop-color="#c9a040"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Jupiter',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="jupiterClip"><circle cx="50" cy="50" r="42"/></clipPath>
          <radialGradient id="jupiterShine" cx="35%" cy="35%"><stop offset="0%" stop-color="rgba(255,255,255,0.2)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="#e8c96e"/>
        <g clip-path="url(#jupiterClip)">
          <rect x="8" y="10" width="84" height="8" rx="2" fill="#d4a04a" opacity="0.6"/>
          <rect x="8" y="20" width="84" height="6" rx="2" fill="#c0772b" opacity="0.7"/>
          <rect x="8" y="29" width="84" height="10" rx="2" fill="#e8c06e" opacity="0.5"/>
          <rect x="8" y="41" width="84" height="7" rx="2" fill="#b5651d" opacity="0.6"/>
          <rect x="8" y="50" width="84" height="5" rx="2" fill="#d4a04a" opacity="0.5"/>
          <rect x="8" y="57" width="84" height="9" rx="2" fill="#c0772b" opacity="0.55"/>
          <rect x="8" y="68" width="84" height="6" rx="2" fill="#e2b555" opacity="0.5"/>
          <rect x="8" y="76" width="84" height="8" rx="2" fill="#d4a04a" opacity="0.6"/>
          <rect x="8" y="86" width="84" height="7" rx="2" fill="#c0772b" opacity="0.5"/>
          <ellipse cx="62" cy="55" rx="12" ry="8" fill="#c0392b" opacity="0.85"/>
          <ellipse cx="60" cy="54" rx="7" ry="4" fill="#e74c3c" opacity="0.5"/>
        </g>
        <circle cx="50" cy="50" r="42" fill="url(#jupiterShine)"/>
      </svg>`
    },
    {
      name: 'Moon',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="#bdc3c7"/>
        <circle cx="50" cy="50" r="40" fill="url(#moonShade)"/>
        <circle cx="35" cy="35" r="8" fill="#a0a6aa" opacity="0.6"/>
        <circle cx="58" cy="28" r="5" fill="#a0a6aa" opacity="0.5"/>
        <circle cx="42" cy="58" r="10" fill="#a0a6aa" opacity="0.5"/>
        <circle cx="65" cy="55" r="6" fill="#a0a6aa" opacity="0.4"/>
        <circle cx="55" cy="70" r="4" fill="#a0a6aa" opacity="0.4"/>
        <defs>
          <radialGradient id="moonShade" cx="40%" cy="40%"><stop offset="0%" stop-color="rgba(255,255,255,0.2)"/><stop offset="100%" stop-color="rgba(0,0,0,0.15)"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Star',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,5 61,35 95,38 70,60 78,95 50,76 22,95 30,60 5,38 39,35" fill="#f1c40f"/>
        <polygon points="50,5 61,35 95,38 70,60 78,95 50,76 22,95 30,60 5,38 39,35" fill="url(#starShine)"/>
        <defs>
          <radialGradient id="starShine" cx="45%" cy="40%"><stop offset="0%" stop-color="rgba(255,255,255,0.4)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'UFO',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="58" rx="40" ry="12" fill="#95a5a6"/>
        <ellipse cx="50" cy="58" rx="40" ry="12" fill="url(#ufoMetal)"/>
        <path d="M30 58 Q30 30 50 28 Q70 30 70 58Z" fill="#7f8c8d"/>
        <path d="M35 55 Q35 35 50 33 Q65 35 65 55Z" fill="rgba(46,204,113,0.35)"/>
        <ellipse cx="50" cy="33" rx="15" ry="12" fill="rgba(46,204,113,0.2)" stroke="rgba(46,204,113,0.4)" stroke-width="1"/>
        <circle cx="30" cy="62" r="4" fill="#2ecc71"/>
        <circle cx="50" cy="65" r="4" fill="#2ecc71"/>
        <circle cx="70" cy="62" r="4" fill="#2ecc71"/>
        <ellipse cx="50" cy="75" rx="12" ry="4" fill="rgba(46,204,113,0.25)"/>
        <defs>
          <linearGradient id="ufoMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(255,255,255,0.2)"/><stop offset="100%" stop-color="rgba(0,0,0,0.1)"/></linearGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Astronaut',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="32" y="50" width="36" height="35" rx="8" fill="#ecf0f1"/>
        <rect x="35" y="53" width="30" height="29" rx="6" fill="#dfe6e9"/>
        <rect x="22" y="55" width="12" height="22" rx="6" fill="#ecf0f1"/>
        <rect x="66" y="55" width="12" height="22" rx="6" fill="#ecf0f1"/>
        <rect x="35" y="82" width="12" height="14" rx="5" fill="#ecf0f1"/>
        <rect x="53" y="82" width="12" height="14" rx="5" fill="#ecf0f1"/>
        <circle cx="50" cy="34" r="22" fill="#ecf0f1"/>
        <rect x="32" y="24" width="36" height="22" rx="10" fill="#aed6f1" stroke="#bdc3c7" stroke-width="2"/>
        <rect x="32" y="24" width="36" height="22" rx="10" fill="rgba(174,214,241,0.5)"/>
        <circle cx="42" cy="33" r="2" fill="#2c3e50"/>
        <circle cx="58" cy="33" r="2" fill="#2c3e50"/>
        <path d="M46 38 Q50 42 54 38" stroke="#2c3e50" stroke-width="1.5" fill="none"/>
        <rect x="44" y="60" width="12" height="8" rx="2" fill="#3498db"/>
      </svg>`
    },
    {
      name: 'Comet',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M70 40 Q50 35 10 15" stroke="#f39c12" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.3"/>
        <path d="M70 40 Q45 40 5 28" stroke="#e67e22" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M70 40 Q55 42 15 38" stroke="#f1c40f" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
        <circle cx="72" cy="42" r="16" fill="#95a5a6"/>
        <circle cx="72" cy="42" r="16" fill="url(#cometShade)"/>
        <circle cx="66" cy="38" r="4" fill="rgba(0,0,0,0.15)"/>
        <circle cx="78" cy="45" r="3" fill="rgba(0,0,0,0.1)"/>
        <defs>
          <radialGradient id="cometShade" cx="35%" cy="35%"><stop offset="0%" stop-color="rgba(255,255,255,0.3)"/><stop offset="100%" stop-color="rgba(0,0,0,0.2)"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Sun',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(50,50)">
          <line x1="0" y1="-42" x2="0" y2="-34" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="0" y1="34" x2="0" y2="42" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="-42" y1="0" x2="-34" y2="0" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="34" y1="0" x2="42" y2="0" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="-30" y1="-30" x2="-24" y2="-24" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="24" y1="-24" x2="30" y2="-30" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="-30" y1="30" x2="-24" y2="24" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
          <line x1="24" y1="24" x2="30" y2="30" stroke="#f39c12" stroke-width="4" stroke-linecap="round"/>
        </g>
        <circle cx="50" cy="50" r="25" fill="#f1c40f"/>
        <circle cx="50" cy="50" r="25" fill="url(#sunShine)"/>
        <circle cx="42" cy="45" r="3" fill="#2c3e50"/>
        <circle cx="58" cy="45" r="3" fill="#2c3e50"/>
        <path d="M42 56 Q50 64 58 56" stroke="#e67e22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <defs>
          <radialGradient id="sunShine" cx="40%" cy="38%"><stop offset="0%" stop-color="rgba(255,255,255,0.35)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Alien',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="40" rx="28" ry="32" fill="#2ecc71"/>
        <ellipse cx="50" cy="40" rx="28" ry="32" fill="url(#alienShade)"/>
        <ellipse cx="38" cy="35" rx="10" ry="7" fill="#1a1a2e"/>
        <ellipse cx="62" cy="35" rx="10" ry="7" fill="#1a1a2e"/>
        <ellipse cx="38" cy="35" rx="5" ry="4" fill="#fff" opacity="0.6"/>
        <ellipse cx="62" cy="35" rx="5" ry="4" fill="#fff" opacity="0.6"/>
        <ellipse cx="50" cy="52" rx="4" ry="2" fill="#1a8c4e"/>
        <path d="M42 58 Q50 64 58 58" stroke="#1a8c4e" stroke-width="2" fill="none"/>
        <rect x="36" y="70" width="10" height="20" rx="5" fill="#2ecc71"/>
        <rect x="54" y="70" width="10" height="20" rx="5" fill="#2ecc71"/>
        <rect x="22" y="45" width="8" height="18" rx="4" fill="#2ecc71" transform="rotate(-15 26 54)"/>
        <rect x="70" y="45" width="8" height="18" rx="4" fill="#2ecc71" transform="rotate(15 74 54)"/>
        <circle cx="36" cy="14" r="5" fill="#2ecc71"/>
        <line x1="38" y1="18" x2="42" y2="12" stroke="#2ecc71" stroke-width="3"/>
        <circle cx="64" cy="14" r="5" fill="#2ecc71"/>
        <line x1="62" y1="18" x2="58" y2="12" stroke="#2ecc71" stroke-width="3"/>
        <defs>
          <radialGradient id="alienShade" cx="40%" cy="35%"><stop offset="0%" stop-color="rgba(255,255,255,0.2)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
      </svg>`
    },
    {
      name: 'Satellite',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="38" width="24" height="24" rx="3" fill="#95a5a6" transform="rotate(45 50 50)"/>
        <rect x="42" y="42" width="16" height="16" rx="2" fill="#7f8c8d" transform="rotate(45 50 50)"/>
        <rect x="10" y="44" width="25" height="12" rx="1" fill="#3498db"/>
        <line x1="18" y1="44" x2="18" y2="56" stroke="#2980b9" stroke-width="1"/>
        <line x1="25" y1="44" x2="25" y2="56" stroke="#2980b9" stroke-width="1"/>
        <rect x="65" y="44" width="25" height="12" rx="1" fill="#3498db"/>
        <line x1="73" y1="44" x2="73" y2="56" stroke="#2980b9" stroke-width="1"/>
        <line x1="80" y1="44" x2="80" y2="56" stroke="#2980b9" stroke-width="1"/>
        <circle cx="50" cy="50" r="4" fill="#e74c3c"/>
        <line x1="48" y1="34" x2="44" y2="26" stroke="#7f8c8d" stroke-width="2"/>
        <circle cx="43" cy="24" r="3" fill="#95a5a6"/>
      </svg>`
    },
    {
      name: 'Galaxy',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="40" ry="18" fill="none" stroke="rgba(155,89,182,0.5)" stroke-width="8" transform="rotate(-30 50 50)"/>
        <ellipse cx="50" cy="50" rx="32" ry="14" fill="none" stroke="rgba(142,68,173,0.6)" stroke-width="6" transform="rotate(-30 50 50)"/>
        <ellipse cx="50" cy="50" rx="22" ry="10" fill="none" stroke="rgba(165,105,189,0.7)" stroke-width="5" transform="rotate(-30 50 50)"/>
        <ellipse cx="50" cy="50" rx="12" ry="6" fill="rgba(200,150,255,0.5)" stroke="rgba(180,120,230,0.8)" stroke-width="3" transform="rotate(-30 50 50)"/>
        <circle cx="50" cy="50" r="5" fill="#e8d5f5"/>
        <circle cx="50" cy="50" r="3" fill="#fff"/>
        <circle cx="30" cy="38" r="1.5" fill="rgba(255,255,255,0.7)"/>
        <circle cx="68" cy="58" r="1.5" fill="rgba(255,255,255,0.6)"/>
        <circle cx="40" cy="62" r="1" fill="rgba(255,255,255,0.5)"/>
        <circle cx="62" cy="40" r="1" fill="rgba(255,255,255,0.5)"/>
        <circle cx="25" cy="50" r="1" fill="rgba(200,170,255,0.6)"/>
        <circle cx="75" cy="48" r="1" fill="rgba(200,170,255,0.5)"/>
      </svg>`
    }
  ];

  const SIZES = { S: 60, M: 100, L: 150 };
  const STORAGE_KEY = 'sticker-scene-save';

  /* ── State ───────────────────────────────────────── */
  let selectedSticker = null;    // index into STICKERS
  let selectedSize = 'M';
  let placedStickers = [];       // { el, index }
  let selectedPlaced = null;     // DOM element
  let listeners = [];            // for cleanup
  let canvasRef = null;          // for save/load

  /* ── Helper: add event listener with cleanup tracking ── */
  function listen(el, event, handler, opts) {
    el.addEventListener(event, handler, opts);
    listeners.push({ el, event, handler, opts });
  }

  /* ── Persistence ──────────────────────────────────── */
  function saveScene() {
    const data = placedStickers.map(s => ({
      index: s.index,
      left: parseFloat(s.el.style.left),
      top: parseFloat(s.el.style.top),
      width: s.el.offsetWidth,
      height: s.el.offsetHeight
    }));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function loadScene(canvas) {
    let data;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
    if (!Array.isArray(data)) return;
    data.forEach(item => {
      if (item.index >= 0 && item.index < STICKERS.length) {
        placeSticker(canvas, item.index, item.left, item.top, item.width, false);
      }
    });
  }

  /* ── Build DOM ───────────────────────────────────── */
  function init(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'sticker-scene';

    // Palette
    const palette = document.createElement('div');
    palette.className = 'sticker-palette';

    STICKERS.forEach((sticker, i) => {
      const btn = document.createElement('button');
      btn.className = 'palette-sticker';
      btn.title = sticker.name;
      btn.innerHTML = sticker.svg;
      btn.setAttribute('aria-label', sticker.name);
      listen(btn, 'pointerup', (e) => {
        e.stopPropagation();
        selectPaletteSticker(i, palette);
      });
      palette.appendChild(btn);
    });

    // Canvas
    const canvas = document.createElement('div');
    canvas.className = 'scene-canvas';
    listen(canvas, 'pointerup', onCanvasTap);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'scene-toolbar';

    // Size buttons
    const sizeGroup = document.createElement('div');
    sizeGroup.className = 'size-group';
    const sizeLabel = document.createElement('span');
    sizeLabel.className = 'size-label';
    sizeLabel.textContent = 'Size:';
    sizeGroup.appendChild(sizeLabel);

    ['S', 'M', 'L'].forEach(size => {
      const btn = document.createElement('button');
      btn.className = 'size-btn' + (size === selectedSize ? ' active' : '');
      btn.textContent = size;
      btn.dataset.size = size;
      listen(btn, 'pointerup', () => {
        selectedSize = size;
        sizeGroup.querySelectorAll('.size-btn').forEach(b => b.classList.toggle('active', b.dataset.size === size));
      });
      sizeGroup.appendChild(btn);
    });

    // Undo
    const undoBtn = document.createElement('button');
    undoBtn.className = 'toolbar-btn';
    undoBtn.innerHTML = '&#8630; Undo';
    listen(undoBtn, 'pointerup', onUndo);

    // Clear all
    const clearBtn = document.createElement('button');
    clearBtn.className = 'toolbar-btn danger';
    clearBtn.textContent = 'Clear All';
    listen(clearBtn, 'pointerup', () => onClearAll(canvas));

    toolbar.appendChild(sizeGroup);
    toolbar.appendChild(undoBtn);
    toolbar.appendChild(clearBtn);

    // Assemble
    const mainArea = document.createElement('div');
    mainArea.style.display = 'flex';
    mainArea.style.flexDirection = 'column';
    mainArea.style.flex = '1';
    mainArea.style.overflow = 'hidden';
    mainArea.appendChild(canvas);
    mainArea.appendChild(toolbar);

    wrapper.appendChild(palette);
    wrapper.appendChild(mainArea);
    container.appendChild(wrapper);

    // Deselect placed sticker when clicking canvas background
    listen(canvas, 'pointerdown', (e) => {
      if (e.target === canvas) {
        deselectPlaced();
      }
    });

    canvasRef = canvas;
    loadScene(canvas);
  }

  /* ── Palette selection ───────────────────────────── */
  function selectPaletteSticker(index, palette) {
    selectedSticker = index;
    palette.querySelectorAll('.palette-sticker').forEach((btn, i) => {
      btn.classList.toggle('selected', i === index);
    });
    deselectPlaced();
  }

  /* ── Place sticker on canvas ─────────────────────── */
  function onCanvasTap(e) {
    if (selectedSticker === null) return;
    if (e.target !== e.currentTarget) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = SIZES[selectedSize];

    placeSticker(canvas, selectedSticker, x - size / 2, y - size / 2, size, true);
  }

  function placeSticker(canvas, stickerIndex, left, top, size, shouldSave) {
    const el = document.createElement('div');
    el.className = 'placed-sticker';
    el.innerHTML = STICKERS[stickerIndex].svg;
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    const entry = { el, index: stickerIndex };
    placedStickers.push(entry);
    canvas.appendChild(el);

    // Drag support
    makeDraggable(el, canvas);

    // Select on tap
    listen(el, 'pointerup', (e) => {
      if (el.dataset.dragged === 'true') {
        el.dataset.dragged = 'false';
        return;
      }
      e.stopPropagation();
      selectPlaced(el);
    });

    if (shouldSave) saveScene();
  }

  /* ── Select / deselect placed sticker ────────────── */
  function selectPlaced(el) {
    deselectPlaced();
    selectedPlaced = el;
    el.classList.add('selected-sticker');

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'sticker-delete';
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Delete sticker');
    listen(delBtn, 'pointerup', (e) => {
      e.stopPropagation();
      removeSticker(el);
    });
    el.appendChild(delBtn);

    // Resize handle
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'sticker-resize';
    makeResizable(el, resizeHandle);
    el.appendChild(resizeHandle);
  }

  function deselectPlaced() {
    if (!selectedPlaced) return;
    selectedPlaced.classList.remove('selected-sticker');
    const del = selectedPlaced.querySelector('.sticker-delete');
    if (del) del.remove();
    const resize = selectedPlaced.querySelector('.sticker-resize');
    if (resize) resize.remove();
    selectedPlaced = null;
  }

  function removeSticker(el) {
    placedStickers = placedStickers.filter(s => s.el !== el);
    if (selectedPlaced === el) selectedPlaced = null;
    el.remove();
    saveScene();
  }

  /* ── Drag ────────────────────────────────────────── */
  function makeDraggable(el, canvas) {
    let startX, startY, origLeft, origTop;
    let moved = false;

    function onDown(e) {
      if (e.target.closest('.sticker-delete') || e.target.closest('.sticker-resize')) return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseFloat(el.style.left);
      origTop = parseFloat(el.style.top);
      moved = false;
      el.dataset.dragged = 'false';
    }

    function onMove(e) {
      if (!el.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        moved = true;
        el.dataset.dragged = 'true';
      }
      el.style.left = (origLeft + dx) + 'px';
      el.style.top = (origTop + dy) + 'px';
    }

    function onUp(e) {
      if (el.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId);
        if (moved) saveScene();
      }
    }

    listen(el, 'pointerdown', onDown);
    listen(el, 'pointermove', onMove);
    listen(el, 'pointerup', onUp);
  }

  /* ── Resize ──────────────────────────────────────── */
  function makeResizable(el, handle) {
    let startX, startY, origW, origH;

    function onDown(e) {
      e.preventDefault();
      e.stopPropagation();
      handle.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      origW = el.offsetWidth;
      origH = el.offsetHeight;
    }

    function onMove(e) {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const delta = Math.max(dx, dy);
      const newSize = Math.max(30, origW + delta);
      el.style.width = newSize + 'px';
      el.style.height = newSize + 'px';
    }

    function onUp(e) {
      if (handle.hasPointerCapture(e.pointerId)) {
        handle.releasePointerCapture(e.pointerId);
        saveScene();
      }
    }

    listen(handle, 'pointerdown', onDown);
    listen(handle, 'pointermove', onMove);
    listen(handle, 'pointerup', onUp);
  }

  /* ── Undo ────────────────────────────────────────── */
  function onUndo() {
    if (placedStickers.length === 0) return;
    const last = placedStickers.pop();
    if (selectedPlaced === last.el) selectedPlaced = null;
    last.el.remove();
    saveScene();
  }

  /* ── Clear All ───────────────────────────────────── */
  function onClearAll(canvas) {
    if (placedStickers.length === 0) return;

    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-dialog">
        <p>Clear all stickers?</p>
        <div class="confirm-btns">
          <button class="confirm-yes">Yes</button>
          <button class="confirm-no">No</button>
        </div>
      </div>
    `;

    const yes = overlay.querySelector('.confirm-yes');
    const no = overlay.querySelector('.confirm-no');

    yes.addEventListener('pointerup', () => {
      placedStickers.forEach(s => s.el.remove());
      placedStickers = [];
      selectedPlaced = null;
      overlay.remove();
      saveScene();
    });

    no.addEventListener('pointerup', () => {
      overlay.remove();
    });

    document.body.appendChild(overlay);
  }

  /* ── Cleanup ─────────────────────────────────────── */
  function destroy() {
    listeners.forEach(({ el, event, handler, opts }) => {
      el.removeEventListener(event, handler, opts);
    });
    listeners = [];
    placedStickers = [];
    selectedSticker = null;
    selectedPlaced = null;
    selectedSize = 'M';
    canvasRef = null;
  }

  /* ── Register ────────────────────────────────────── */
  App.registerGame({
    id: 'sticker-scene',
    title: 'Sticker Scene Builder',
    description: 'Build a space scene with stickers!',
    icon: '🚀',
    init,
    destroy
  });
})();
