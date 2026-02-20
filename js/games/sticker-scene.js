/* ── Sticker Scene Builder ────────────────────────── */
(() => {
  /* ── Sticker Definitions (from shared modules) ──── */
  const STICKERS = [
    ...SharedStickers.SPACE,
    ...SharedStickers.DINOS,
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
