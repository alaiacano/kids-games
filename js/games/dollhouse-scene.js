/* ── Dollhouse Scene Builder ──────────────────────── */
(() => {
  /* ── SVG Sticker Definitions ─────────────────────── */
  const STICKERS = [
    {
      name: 'Fire',
      svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 5 Q50 25 55 35 Q60 20 58 10 Q70 30 65 50 Q62 60 55 65 Q50 70 40 72 Q30 70 25 65 Q18 60 15 50 Q10 30 22 10 Q20 20 25 35 Q30 25 40 5Z" fill="#e67e22"/>
        <path d="M40 18 Q48 32 50 40 Q55 28 52 22 Q60 38 56 50 Q52 58 45 62 Q40 64 35 62 Q28 58 24 50 Q20 38 28 22 Q25 28 30 40 Q32 32 40 18Z" fill="#f39c12"/>
        <path d="M40 35 Q46 42 46 48 Q46 55 40 58 Q34 55 34 48 Q34 42 40 35Z" fill="#f1c40f"/>
        <ellipse cx="40" cy="52" rx="4" ry="5" fill="#fff5cc" opacity="0.7"/>
      </svg>`
    },
    {
      name: 'Black Recliner',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Back -->
        <path d="M20 25 L20 70 L35 70 L35 30 Q35 22 28 22Z" fill="#2c2c2c"/>
        <path d="M22 28 L22 65 L33 65 L33 32 Q33 26 27 26Z" fill="#3a3a3a"/>
        <!-- Seat -->
        <rect x="33" y="55" width="40" height="15" rx="3" fill="#2c2c2c"/>
        <rect x="35" y="57" width="36" height="10" rx="2" fill="#3a3a3a"/>
        <!-- Armrest -->
        <path d="M70 45 Q80 45 80 55 L80 70 L73 70 L73 55 Q73 52 70 52Z" fill="#2c2c2c"/>
        <!-- Footrest -->
        <rect x="60" y="70" width="22" height="6" rx="2" fill="#2c2c2c"/>
        <rect x="62" y="68" width="18" height="4" rx="1" fill="#3a3a3a"/>
        <!-- Legs -->
        <rect x="22" y="70" width="4" height="10" rx="1" fill="#1a1a1a"/>
        <rect x="72" y="76" width="4" height="6" rx="1" fill="#1a1a1a"/>
        <!-- Cushion detail -->
        <path d="M24 40 L31 40" stroke="#444" stroke-width="1" opacity="0.5"/>
        <path d="M24 48 L31 48" stroke="#444" stroke-width="1" opacity="0.5"/>
      </svg>`
    },
    {
      name: 'Sofa',
      svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <!-- Back -->
        <rect x="10" y="10" width="100" height="35" rx="6" fill="#7a8a7a"/>
        <!-- Seat base -->
        <rect x="5" y="40" width="110" height="22" rx="5" fill="#8a9a8a"/>
        <!-- Cushions -->
        <rect x="10" y="42" width="32" height="18" rx="4" fill="#95a595"/>
        <rect x="44" y="42" width="32" height="18" rx="4" fill="#95a595"/>
        <rect x="78" y="42" width="32" height="18" rx="4" fill="#95a595"/>
        <!-- Arms -->
        <rect x="2" y="20" width="12" height="42" rx="5" fill="#7a8a7a"/>
        <rect x="106" y="20" width="12" height="42" rx="5" fill="#7a8a7a"/>
        <!-- Legs -->
        <rect x="12" y="62" width="5" height="8" rx="1" fill="#5a5a5a"/>
        <rect x="103" y="62" width="5" height="8" rx="1" fill="#5a5a5a"/>
        <!-- Back cushion lines -->
        <line x1="40" y1="14" x2="40" y2="38" stroke="#6a7a6a" stroke-width="1.5" opacity="0.5"/>
        <line x1="80" y1="14" x2="80" y2="38" stroke="#6a7a6a" stroke-width="1.5" opacity="0.5"/>
      </svg>`
    },
    {
      name: 'Coffee Table',
      svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Table top -->
        <rect x="5" y="10" width="90" height="10" rx="3" fill="#8B5E3C"/>
        <rect x="5" y="10" width="90" height="4" rx="2" fill="#a0703c"/>
        <!-- Shelf -->
        <rect x="15" y="35" width="70" height="5" rx="2" fill="#7a4e2c"/>
        <!-- Legs -->
        <rect x="12" y="20" width="5" height="30" rx="1" fill="#6b3e1c"/>
        <rect x="83" y="20" width="5" height="30" rx="1" fill="#6b3e1c"/>
      </svg>`
    },
    {
      name: 'Stars',
      svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,5 23,15 33,15 25,21 28,31 20,25 12,31 15,21 7,15 17,15" fill="#f1c40f"/>
        <polygon points="55,10 57,17 64,17 58,21 60,28 55,24 50,28 52,21 46,17 53,17" fill="#f39c12"/>
        <polygon points="35,30 37,36 43,36 38,40 40,46 35,42 30,46 32,40 27,36 33,36" fill="#f1c40f"/>
        <polygon points="60,40 62,46 68,46 63,50 65,56 60,52 55,56 57,50 52,46 58,46" fill="#e67e22"/>
        <polygon points="15,50 17,56 23,56 18,60 20,66 15,62 10,66 12,60 7,56 13,56" fill="#f39c12"/>
        <polygon points="42,58 44,63 49,63 45,66 46,71 42,68 38,71 39,66 35,63 40,63" fill="#f1c40f" opacity="0.8"/>
      </svg>`
    },
    { name: 'Boy', svg: SharedStickers.BOY },
    { name: 'Girl', svg: SharedStickers.GIRL },
    {
      name: 'TV',
      svg: `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <!-- Frame -->
        <rect x="5" y="5" width="90" height="55" rx="4" fill="#1a1a2e"/>
        <rect x="8" y="8" width="84" height="49" rx="2" fill="#2a3a5c"/>
        <!-- Screen glare -->
        <rect x="10" y="10" width="80" height="45" rx="1" fill="#3a4a6c"/>
        <path d="M12 12 L50 12 L12 35Z" fill="rgba(255,255,255,0.06)"/>
        <!-- Stand -->
        <rect x="35" y="60" width="30" height="4" rx="1" fill="#1a1a2e"/>
        <rect x="25" y="64" width="50" height="4" rx="2" fill="#2c2c3e"/>
      </svg>`
    },
    {
      name: 'Floor Lamp',
      svg: `<svg viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Shade -->
        <path d="M15 10 L10 35 L50 35 L45 10Z" fill="#f5e6ca"/>
        <path d="M15 10 L10 35 L30 35 L30 10Z" fill="#efe0c8"/>
        <line x1="18" y1="12" x2="14" y2="33" stroke="#e8d4b0" stroke-width="0.8"/>
        <line x1="30" y1="10" x2="30" y2="35" stroke="#e8d4b0" stroke-width="0.8"/>
        <line x1="42" y1="12" x2="46" y2="33" stroke="#e8d4b0" stroke-width="0.8"/>
        <!-- Pole -->
        <rect x="28" y="35" width="4" height="70" fill="#b0a090"/>
        <rect x="29" y="35" width="2" height="70" fill="#c0b0a0"/>
        <!-- Base -->
        <ellipse cx="30" cy="108" rx="14" ry="5" fill="#a09080"/>
        <ellipse cx="30" cy="106" rx="12" ry="4" fill="#b0a090"/>
      </svg>`
    },
    {
      name: 'Table Lamp',
      svg: `<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">
        <!-- Shade -->
        <path d="M15 8 L10 30 L50 30 L45 8Z" fill="#f0d870"/>
        <path d="M15 8 L10 30 L30 30 L30 8Z" fill="#e8d060"/>
        <!-- Pole -->
        <rect x="28" y="30" width="4" height="20" fill="#c0a060"/>
        <!-- Base -->
        <ellipse cx="30" cy="52" rx="12" ry="5" fill="#c0a060"/>
        <ellipse cx="30" cy="50" rx="10" ry="4" fill="#d0b070"/>
      </svg>`
    },
    {
      name: 'Potted Plant',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Leaves -->
        <ellipse cx="40" cy="25" rx="8" ry="18" fill="#27ae60"/>
        <ellipse cx="28" cy="30" rx="7" ry="16" fill="#2ecc71" transform="rotate(-25 28 30)"/>
        <ellipse cx="52" cy="30" rx="7" ry="16" fill="#2ecc71" transform="rotate(25 52 30)"/>
        <ellipse cx="22" cy="38" rx="6" ry="12" fill="#27ae60" transform="rotate(-40 22 38)"/>
        <ellipse cx="58" cy="38" rx="6" ry="12" fill="#27ae60" transform="rotate(40 58 38)"/>
        <ellipse cx="35" cy="22" rx="5" ry="14" fill="#2ecc71" transform="rotate(-10 35 22)"/>
        <ellipse cx="48" cy="24" rx="5" ry="13" fill="#2ecc71" transform="rotate(15 48 24)"/>
        <!-- Pot -->
        <path d="M25 55 L22 90 L58 90 L55 55Z" fill="#c0562b"/>
        <rect x="22" y="52" width="36" height="6" rx="2" fill="#d4663a"/>
        <!-- Soil -->
        <ellipse cx="40" cy="58" rx="14" ry="3" fill="#5a3a1a"/>
      </svg>`
    },
    {
      name: 'Bookshelf',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Frame -->
        <rect x="5" y="5" width="70" height="90" rx="2" fill="#8B5E3C"/>
        <rect x="8" y="8" width="64" height="84" fill="#a07040"/>
        <!-- Shelves -->
        <rect x="5" y="32" width="70" height="4" fill="#8B5E3C"/>
        <rect x="5" y="60" width="70" height="4" fill="#8B5E3C"/>
        <!-- Top row books -->
        <rect x="12" y="10" width="7" height="20" rx="1" fill="#e74c3c"/>
        <rect x="20" y="12" width="6" height="18" rx="1" fill="#3498db"/>
        <rect x="27" y="10" width="8" height="20" rx="1" fill="#2ecc71"/>
        <rect x="36" y="11" width="6" height="19" rx="1" fill="#f39c12"/>
        <rect x="43" y="10" width="7" height="20" rx="1" fill="#9b59b6"/>
        <rect x="51" y="13" width="6" height="17" rx="1" fill="#e67e22"/>
        <rect x="58" y="10" width="8" height="20" rx="1" fill="#1abc9c"/>
        <!-- Middle row books -->
        <rect x="12" y="38" width="8" height="20" rx="1" fill="#f1c40f"/>
        <rect x="21" y="40" width="6" height="18" rx="1" fill="#e74c3c"/>
        <rect x="28" y="38" width="7" height="20" rx="1" fill="#8e44ad"/>
        <rect x="36" y="39" width="9" height="19" rx="1" fill="#2980b9"/>
        <rect x="46" y="38" width="6" height="20" rx="1" fill="#d35400"/>
        <rect x="53" y="40" width="7" height="18" rx="1" fill="#27ae60"/>
        <!-- Bottom row books -->
        <rect x="12" y="66" width="9" height="22" rx="1" fill="#c0392b"/>
        <rect x="22" y="68" width="7" height="20" rx="1" fill="#2c3e50"/>
        <rect x="30" y="66" width="6" height="22" rx="1" fill="#16a085"/>
        <rect x="37" y="67" width="8" height="21" rx="1" fill="#f39c12"/>
        <rect x="46" y="66" width="7" height="22" rx="1" fill="#8e44ad"/>
        <rect x="54" y="68" width="8" height="20" rx="1" fill="#e74c3c"/>
      </svg>`
    },
    {
      name: 'Teddy Bear',
      svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
        <!-- Ears -->
        <circle cx="22" cy="18" r="10" fill="#a0703c"/>
        <circle cx="22" cy="18" r="6" fill="#c09060"/>
        <circle cx="58" cy="18" r="10" fill="#a0703c"/>
        <circle cx="58" cy="18" r="6" fill="#c09060"/>
        <!-- Head -->
        <circle cx="40" cy="30" r="18" fill="#b8834b"/>
        <!-- Body -->
        <ellipse cx="40" cy="60" rx="18" ry="20" fill="#b8834b"/>
        <!-- Belly -->
        <ellipse cx="40" cy="62" rx="12" ry="14" fill="#d4a86a"/>
        <!-- Arms -->
        <ellipse cx="18" cy="55" rx="8" ry="12" fill="#b8834b" transform="rotate(-15 18 55)"/>
        <ellipse cx="62" cy="55" rx="8" ry="12" fill="#b8834b" transform="rotate(15 62 55)"/>
        <!-- Legs -->
        <ellipse cx="28" cy="78" rx="9" ry="7" fill="#b8834b"/>
        <ellipse cx="52" cy="78" rx="9" ry="7" fill="#b8834b"/>
        <ellipse cx="28" cy="79" rx="6" ry="4" fill="#d4a86a"/>
        <ellipse cx="52" cy="79" rx="6" ry="4" fill="#d4a86a"/>
        <!-- Eyes -->
        <circle cx="34" cy="27" r="3" fill="#2c2c2c"/>
        <circle cx="46" cy="27" r="3" fill="#2c2c2c"/>
        <circle cx="35" cy="26" r="1" fill="#fff"/>
        <circle cx="47" cy="26" r="1" fill="#fff"/>
        <!-- Nose -->
        <ellipse cx="40" cy="33" rx="4" ry="3" fill="#6b3e1c"/>
        <ellipse cx="40" cy="32" rx="2" ry="1" fill="#8a5a30"/>
        <!-- Mouth -->
        <path d="M37 36 Q40 40 43 36" stroke="#6b3e1c" stroke-width="1.2" fill="none"/>
      </svg>`
    },
    {
      name: 'Cat',
      svg: `<svg viewBox="0 0 80 90" xmlns="http://www.w3.org/2000/svg">
        <!-- Tail -->
        <path d="M65 60 Q78 50 75 35 Q73 28 68 30" stroke="#808080" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Body -->
        <ellipse cx="40" cy="62" rx="22" ry="16" fill="#909090"/>
        <ellipse cx="40" cy="62" rx="18" ry="12" fill="#a0a0a0"/>
        <!-- Front paws -->
        <ellipse cx="28" cy="76" rx="6" ry="4" fill="#909090"/>
        <ellipse cx="52" cy="76" rx="6" ry="4" fill="#909090"/>
        <!-- Head -->
        <ellipse cx="40" cy="38" rx="16" ry="14" fill="#a0a0a0"/>
        <!-- Ears -->
        <polygon points="26,30 22,14 34,26" fill="#909090"/>
        <polygon points="54,30 58,14 46,26" fill="#909090"/>
        <polygon points="27,28 24,18 32,26" fill="#d4a0a0"/>
        <polygon points="53,28 56,18 48,26" fill="#d4a0a0"/>
        <!-- Eyes -->
        <ellipse cx="34" cy="36" rx="4" ry="4.5" fill="#2ecc71"/>
        <ellipse cx="34" cy="36" rx="1.5" ry="4" fill="#111"/>
        <ellipse cx="46" cy="36" rx="4" ry="4.5" fill="#2ecc71"/>
        <ellipse cx="46" cy="36" rx="1.5" ry="4" fill="#111"/>
        <!-- Nose -->
        <polygon points="40,42 38,44 42,44" fill="#e8a0a0"/>
        <!-- Whiskers -->
        <line x1="20" y1="42" x2="34" y2="44" stroke="#666" stroke-width="0.8"/>
        <line x1="20" y1="46" x2="34" y2="46" stroke="#666" stroke-width="0.8"/>
        <line x1="46" y1="44" x2="60" y2="42" stroke="#666" stroke-width="0.8"/>
        <line x1="46" y1="46" x2="60" y2="46" stroke="#666" stroke-width="0.8"/>
        <!-- Mouth -->
        <path d="M38 46 Q40 48 42 46" stroke="#888" stroke-width="0.8" fill="none"/>
      </svg>`
    },
    {
      name: 'Dog',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="50" cy="62" rx="26" ry="18" fill="#c0872b"/>
        <ellipse cx="50" cy="62" rx="22" ry="14" fill="#d4993a"/>
        <!-- Legs -->
        <rect x="30" y="72" width="8" height="18" rx="4" fill="#c0872b"/>
        <rect x="62" y="72" width="8" height="18" rx="4" fill="#c0872b"/>
        <rect x="38" y="74" width="7" height="16" rx="3.5" fill="#c0872b"/>
        <rect x="56" y="74" width="7" height="16" rx="3.5" fill="#c0872b"/>
        <ellipse cx="34" cy="90" rx="5" ry="3" fill="#a06e20"/>
        <ellipse cx="66" cy="90" rx="5" ry="3" fill="#a06e20"/>
        <!-- Head -->
        <ellipse cx="50" cy="38" rx="18" ry="16" fill="#d4993a"/>
        <!-- Ears -->
        <ellipse cx="33" cy="30" rx="8" ry="12" fill="#a06e20" transform="rotate(-15 33 30)"/>
        <ellipse cx="67" cy="30" rx="8" ry="12" fill="#a06e20" transform="rotate(15 67 30)"/>
        <ellipse cx="50" cy="42" rx="10" ry="8" fill="#e8c88a"/>
        <!-- Eyes -->
        <circle cx="43" cy="36" r="3" fill="#fff"/>
        <circle cx="43" cy="36.5" r="1.8" fill="#2c3e50"/>
        <circle cx="43.5" cy="35.5" r="0.6" fill="#fff"/>
        <circle cx="57" cy="36" r="3" fill="#fff"/>
        <circle cx="57" cy="36.5" r="1.8" fill="#2c3e50"/>
        <circle cx="57.5" cy="35.5" r="0.6" fill="#fff"/>
        <!-- Nose -->
        <ellipse cx="50" cy="42" rx="4" ry="3" fill="#2c3e50"/>
        <ellipse cx="50" cy="41" rx="2" ry="1" fill="#555"/>
        <path d="M47 45 Q50 48 53 45" stroke="#8b5e3c" stroke-width="1.2" fill="none"/>
        <!-- Tail -->
        <path d="M76 58 Q85 45 80 35" stroke="#c0872b" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="48" rx="3" ry="4" fill="#e75480"/>
      </svg>`
    },
    {
      name: 'Picture Frame',
      svg: `<svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg">
        <!-- Frame -->
        <rect x="2" y="2" width="66" height="56" rx="2" fill="#8B5E3C"/>
        <rect x="5" y="5" width="60" height="50" rx="1" fill="#a07040"/>
        <!-- Mat -->
        <rect x="8" y="8" width="54" height="44" fill="#f5f0e0"/>
        <!-- Landscape -->
        <!-- Sky -->
        <rect x="8" y="8" width="54" height="28" fill="#87ceeb"/>
        <!-- Mountains -->
        <polygon points="8,36 22,16 36,36" fill="#6b8e6b"/>
        <polygon points="28,36 42,20 56,36" fill="#5a7a5a"/>
        <polygon points="44,36 54,24 62,36" fill="#6b8e6b"/>
        <!-- Ground -->
        <rect x="8" y="34" width="54" height="18" fill="#4a9e4a"/>
        <!-- Sun -->
        <circle cx="52" cy="16" r="5" fill="#f1c40f"/>
      </svg>`
    },
    {
      name: 'Round Rug',
      svg: `<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="25" rx="45" ry="22" fill="#c0562b"/>
        <ellipse cx="50" cy="25" rx="35" ry="17" fill="#d4883e"/>
        <ellipse cx="50" cy="25" rx="25" ry="12" fill="#e8a050"/>
        <ellipse cx="50" cy="25" rx="15" ry="7" fill="#c0562b"/>
        <ellipse cx="50" cy="25" rx="7" ry="3.5" fill="#d4883e"/>
        <!-- Fringe -->
        <ellipse cx="50" cy="25" rx="45" ry="22" fill="none" stroke="#a04020" stroke-width="1.5" stroke-dasharray="3 3"/>
      </svg>`
    }
  ];

  const SIZES = { S: 60, M: 100, L: 150 };
  const STORAGE_KEY = 'dollhouse-scene-save';

  /* ── State ───────────────────────────────────────── */
  let selectedSticker = null;
  let selectedSize = 'M';
  let placedStickers = [];
  let selectedPlaced = null;
  let listeners = [];
  let canvasRef = null;

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

  /* ── Background scene (house cross-section) ──────── */
  function createBackground() {
    const bg = document.createElement('div');
    bg.className = 'dollhouse-bg';
    bg.innerHTML = `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dhWood" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#b8834b"/>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#a07040" stroke-width="0.5" opacity="0.4"/>
          <line x1="0" y1="12" x2="20" y2="12" stroke="#a07040" stroke-width="0.5" opacity="0.3"/>
          <line x1="0" y1="18" x2="20" y2="18" stroke="#a07040" stroke-width="0.3" opacity="0.2"/>
        </pattern>
        <pattern id="dhConcrete" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#999"/>
          <circle cx="2" cy="3" r="0.5" fill="#888" opacity="0.5"/>
          <circle cx="6" cy="7" r="0.4" fill="#aaa" opacity="0.4"/>
        </pattern>
      </defs>

      <!-- ═══ SKY ═══ -->
      <rect x="0" y="0" width="800" height="480" fill="#87ceeb"/>
      <!-- Clouds -->
      <g fill="#fff" opacity="0.7">
        <ellipse cx="60" cy="30" rx="35" ry="14"/>
        <ellipse cx="40" cy="26" rx="20" ry="10"/>
        <ellipse cx="85" cy="28" rx="18" ry="9"/>
        <ellipse cx="720" cy="25" rx="30" ry="12"/>
        <ellipse cx="700" cy="20" rx="18" ry="9"/>
        <ellipse cx="745" cy="22" rx="16" ry="8"/>
      </g>

      <!-- ═══ HOUSE STRUCTURE ═══ -->
      <!-- Exterior walls (below roofline) -->
      <rect x="100" y="110" width="600" height="370" fill="#f0e6d2" stroke="#8B5E3C" stroke-width="3"/>

      <!-- ═══ PEAKED ROOF ═══ -->
      <!-- Roof exterior triangle with overhang -->
      <polygon points="400,10 70,118 730,118" fill="#a0522d" stroke="#6b3e1c" stroke-width="3"/>
      <!-- Right half darker for depth -->
      <polygon points="400,10 730,118 400,118" fill="#8b4513"/>
      <!-- Shingle detail lines -->
      <line x1="152" y1="90" x2="648" y2="90" stroke="#7a3b10" stroke-width="0.8" opacity="0.5"/>
      <line x1="185" y1="68" x2="615" y2="68" stroke="#7a3b10" stroke-width="0.8" opacity="0.5"/>
      <line x1="220" y1="46" x2="580" y2="46" stroke="#7a3b10" stroke-width="0.8" opacity="0.4"/>

      <!-- ═══ ATTIC INTERIOR (cross-section cutaway) ═══ -->
      <polygon points="100,150 100,113 400,18 700,113 700,150" fill="url(#dhWood)"/>
      <!-- Angled ceiling beams -->
      <line x1="100" y1="113" x2="400" y2="18" stroke="#6b3e1c" stroke-width="2" opacity="0.5"/>
      <line x1="700" y1="113" x2="400" y2="18" stroke="#6b3e1c" stroke-width="2" opacity="0.5"/>
      <!-- Round window -->
      <circle cx="400" cy="105" r="20" fill="#87ceeb" stroke="#8B5E3C" stroke-width="3"/>
      <line x1="400" y1="85" x2="400" y2="125" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="380" y1="105" x2="420" y2="105" stroke="#8B5E3C" stroke-width="2"/>
      <!-- Attic items: old boxes -->
      <rect x="155" y="128" width="28" height="20" rx="2" fill="#c0a070"/>
      <rect x="157" y="130" width="24" height="8" fill="#b08a5a"/>
      <rect x="190" y="132" width="22" height="16" rx="2" fill="#a08050"/>
      <!-- Vertical rafters -->
      <line x1="250" y1="113" x2="250" y2="150" stroke="#6b3e1c" stroke-width="3" opacity="0.3"/>
      <line x1="550" y1="113" x2="550" y2="150" stroke="#6b3e1c" stroke-width="3" opacity="0.3"/>

      <!-- Floor line between attic and 2nd floor -->
      <rect x="100" y="148" width="600" height="4" fill="#6b3e1c"/>

      <!-- ═══ 2ND FLOOR (y=150..270) ═══ -->
      <!-- Bedroom 1: Left (100-400), light purple walls -->
      <rect x="100" y="152" width="300" height="118" fill="#e8d8f0"/>
      <!-- Pink carpet -->
      <rect x="100" y="240" width="300" height="30" fill="#f0b0c0"/>
      <!-- Windows -->
      <rect x="150" y="170" width="40" height="50" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="170" y1="170" x2="170" y2="220" stroke="#8B5E3C" stroke-width="1.5"/>
      <line x1="150" y1="195" x2="190" y2="195" stroke="#8B5E3C" stroke-width="1.5"/>
      <rect x="300" y="170" width="40" height="50" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="320" y1="170" x2="320" y2="220" stroke="#8B5E3C" stroke-width="1.5"/>
      <line x1="300" y1="195" x2="340" y2="195" stroke="#8B5E3C" stroke-width="1.5"/>
      <!-- Bed -->
      <rect x="200" y="218" width="80" height="40" rx="4" fill="#f5f0e0" stroke="#c0a080" stroke-width="1.5"/>
      <!-- Headboard -->
      <rect x="195" y="208" width="10" height="52" rx="3" fill="#8B5E3C"/>
      <!-- Pink blanket -->
      <rect x="210" y="225" width="70" height="28" rx="3" fill="#ff85c8"/>
      <rect x="210" y="225" width="70" height="10" rx="2" fill="#ff9ad8"/>
      <!-- Purple pillow -->
      <ellipse cx="218" cy="232" rx="12" ry="8" fill="#b088d0"/>

      <!-- Bedroom 2: Right (400-700), blue walls -->
      <rect x="400" y="152" width="300" height="118" fill="#c0d8f0"/>
      <!-- Floor -->
      <rect x="400" y="250" width="300" height="20" fill="#c0b8a8"/>
      <!-- Window -->
      <rect x="530" y="170" width="40" height="50" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="550" y1="170" x2="550" y2="220" stroke="#8B5E3C" stroke-width="1.5"/>
      <line x1="530" y1="195" x2="570" y2="195" stroke="#8B5E3C" stroke-width="1.5"/>
      <!-- Bed -->
      <rect x="440" y="218" width="80" height="40" rx="4" fill="#f5f0e0" stroke="#c0a080" stroke-width="1.5"/>
      <!-- Headboard -->
      <rect x="435" y="208" width="10" height="52" rx="3" fill="#8B5E3C"/>
      <!-- Dark blue sheets -->
      <rect x="450" y="225" width="70" height="28" rx="3" fill="#2a5298"/>
      <rect x="450" y="225" width="70" height="10" rx="2" fill="#3468b8"/>
      <!-- Light blue pillow -->
      <ellipse cx="458" cy="232" rx="12" ry="8" fill="#8ac4e8"/>
      <!-- Room divider wall -->
      <rect x="398" y="152" width="4" height="118" fill="#8B5E3C"/>

      <!-- Floor line between 2nd and 1st floor -->
      <rect x="100" y="268" width="600" height="4" fill="#6b3e1c"/>

      <!-- ═══ 1ST FLOOR (y=270..390) ═══ -->
      <!-- Living room: Left (100-400), white walls -->
      <rect x="100" y="272" width="300" height="118" fill="#f8f8f0"/>
      <!-- Fireplace -->
      <rect x="130" y="320" width="60" height="68" fill="#8a7060"/>
      <rect x="126" y="316" width="68" height="8" rx="2" fill="#6b4e3c"/>
      <rect x="140" y="338" width="40" height="50" rx="3" fill="#2c2c2c"/>
      <!-- Windows (4) -->
      <rect x="210" y="285" width="35" height="45" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="227" y1="285" x2="227" y2="330" stroke="#8B5E3C" stroke-width="1.5"/>
      <rect x="255" y="285" width="35" height="45" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="272" y1="285" x2="272" y2="330" stroke="#8B5E3C" stroke-width="1.5"/>
      <rect x="300" y="285" width="35" height="45" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="317" y1="285" x2="317" y2="330" stroke="#8B5E3C" stroke-width="1.5"/>
      <rect x="345" y="285" width="35" height="45" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="362" y1="285" x2="362" y2="330" stroke="#8B5E3C" stroke-width="1.5"/>

      <!-- Kitchen: Right (400-700), white walls -->
      <rect x="400" y="272" width="300" height="118" fill="#f8f8f0"/>
      <!-- Kitchen floor (tile) -->
      <rect x="400" y="365" width="300" height="25" fill="#e8e0d0"/>
      <g stroke="#d0c8b8" stroke-width="0.5" opacity="0.6">
        <line x1="425" y1="365" x2="425" y2="390"/>
        <line x1="450" y1="365" x2="450" y2="390"/>
        <line x1="475" y1="365" x2="475" y2="390"/>
        <line x1="500" y1="365" x2="500" y2="390"/>
        <line x1="525" y1="365" x2="525" y2="390"/>
        <line x1="550" y1="365" x2="550" y2="390"/>
        <line x1="575" y1="365" x2="575" y2="390"/>
        <line x1="600" y1="365" x2="600" y2="390"/>
        <line x1="625" y1="365" x2="625" y2="390"/>
        <line x1="650" y1="365" x2="650" y2="390"/>
        <line x1="675" y1="365" x2="675" y2="390"/>
        <line x1="400" y1="378" x2="700" y2="378"/>
      </g>
      <!-- Sink + window -->
      <rect x="530" y="285" width="40" height="45" fill="#a0d8f0" stroke="#8B5E3C" stroke-width="2"/>
      <line x1="550" y1="285" x2="550" y2="330" stroke="#8B5E3C" stroke-width="1.5"/>
      <!-- Sink below window -->
      <rect x="525" y="335" width="50" height="20" rx="3" fill="#ddd" stroke="#bbb" stroke-width="1.5"/>
      <ellipse cx="540" cy="345" rx="8" ry="6" fill="#c0c0c0"/>
      <ellipse cx="560" cy="345" rx="8" ry="6" fill="#c0c0c0"/>
      <circle cx="550" cy="332" r="3" fill="#bbb"/>
      <!-- Upper cabinets -->
      <rect x="420" y="278" width="45" height="30" rx="2" fill="#c09060" stroke="#a07040" stroke-width="1"/>
      <rect x="468" y="278" width="45" height="30" rx="2" fill="#c09060" stroke="#a07040" stroke-width="1"/>
      <circle cx="442" cy="293" r="2" fill="#8B5E3C"/>
      <circle cx="490" cy="293" r="2" fill="#8B5E3C"/>
      <!-- Lower cabinets -->
      <rect x="420" y="345" width="45" height="45" rx="2" fill="#c09060" stroke="#a07040" stroke-width="1"/>
      <rect x="468" y="345" width="45" height="45" rx="2" fill="#c09060" stroke="#a07040" stroke-width="1"/>
      <circle cx="442" cy="367" r="2" fill="#8B5E3C"/>
      <circle cx="490" cy="367" r="2" fill="#8B5E3C"/>
      <!-- Counter top -->
      <rect x="418" y="340" width="98" height="5" fill="#e0d0c0"/>
      <!-- Fridge -->
      <rect x="650" y="278" width="40" height="110" rx="3" fill="#e8e8e8" stroke="#ccc" stroke-width="1.5"/>
      <line x1="650" y1="340" x2="690" y2="340" stroke="#ccc" stroke-width="1.5"/>
      <rect x="653" y="310" width="4" height="20" rx="2" fill="#bbb"/>
      <rect x="653" y="350" width="4" height="25" rx="2" fill="#bbb"/>
      <!-- Kitchen table + 2 chairs -->
      <rect x="590" y="360" width="45" height="5" rx="1" fill="#8B5E3C"/>
      <rect x="595" y="365" width="3" height="22" fill="#7a4e2c"/>
      <rect x="627" y="365" width="3" height="22" fill="#7a4e2c"/>
      <!-- Chair left -->
      <rect x="580" y="355" width="10" height="32" rx="2" fill="#6b3e1c"/>
      <rect x="578" y="372" width="14" height="4" rx="1" fill="#7a4e2c"/>
      <!-- Chair right -->
      <rect x="640" y="355" width="10" height="32" rx="2" fill="#6b3e1c"/>
      <rect x="638" y="372" width="14" height="4" rx="1" fill="#7a4e2c"/>
      <!-- Room divider wall -->
      <rect x="398" y="272" width="4" height="118" fill="#8B5E3C"/>

      <!-- Floor line between 1st floor and basement -->
      <rect x="100" y="388" width="600" height="4" fill="#6b3e1c"/>

      <!-- ═══ BASEMENT (y=390..480) ═══ -->
      <!-- Utility room: Left (100-400), concrete -->
      <rect x="100" y="392" width="300" height="88" fill="#a0a0a0"/>
      <!-- Concrete floor -->
      <rect x="100" y="455" width="300" height="25" fill="url(#dhConcrete)"/>
      <!-- Washer -->
      <rect x="150" y="415" width="50" height="55" rx="4" fill="#e8e8e8" stroke="#ccc" stroke-width="1.5"/>
      <circle cx="175" cy="442" r="14" fill="#ddd" stroke="#bbb" stroke-width="1.5"/>
      <circle cx="175" cy="442" r="8" fill="#c8d8e8"/>
      <rect x="155" y="418" width="20" height="6" rx="2" fill="#bbb"/>
      <!-- Dryer -->
      <rect x="210" y="415" width="50" height="55" rx="4" fill="#e8e8e8" stroke="#ccc" stroke-width="1.5"/>
      <circle cx="235" cy="442" r="14" fill="#ddd" stroke="#bbb" stroke-width="1.5"/>
      <circle cx="235" cy="442" r="8" fill="#e0e0e0"/>
      <rect x="215" y="418" width="20" height="6" rx="2" fill="#bbb"/>
      <!-- Pipes -->
      <line x1="175" y1="392" x2="175" y2="415" stroke="#999" stroke-width="3"/>
      <line x1="235" y1="392" x2="235" y2="415" stroke="#999" stroke-width="3"/>

      <!-- Finished basement: Right (400-700), painted walls -->
      <rect x="400" y="392" width="300" height="88" fill="#d8d0c0"/>
      <!-- Carpet floor -->
      <rect x="400" y="455" width="300" height="25" fill="#b0a890"/>
      <!-- Room divider wall -->
      <rect x="398" y="392" width="4" height="88" fill="#8B5E3C"/>

      <!-- ═══ GROUND / EXTERIOR (ground level at 1st floor base, y=390) ═══ -->
      <!-- Left side: earth + grass -->
      <rect x="0" y="398" width="100" height="202" fill="#5a4a30"/>
      <rect x="0" y="390" width="100" height="10" fill="#4a9e4a"/>
      <rect x="0" y="400" width="100" height="4" fill="#3d8b3d"/>
      <!-- Right side: earth + grass -->
      <rect x="700" y="398" width="100" height="202" fill="#5a4a30"/>
      <rect x="700" y="390" width="100" height="10" fill="#4a9e4a"/>
      <rect x="700" y="400" width="100" height="4" fill="#3d8b3d"/>
      <!-- Below house underground -->
      <rect x="100" y="480" width="600" height="120" fill="#5a4a30"/>
      <!-- Foundation -->
      <rect x="95" y="476" width="610" height="8" fill="#808080"/>
      <!-- Earth layers on sides (visible cross-section) -->
      <rect x="0" y="430" width="100" height="4" fill="#4a3a20" opacity="0.4"/>
      <rect x="0" y="460" width="100" height="3" fill="#4a3a20" opacity="0.3"/>
      <rect x="700" y="430" width="100" height="4" fill="#4a3a20" opacity="0.4"/>
      <rect x="700" y="460" width="100" height="3" fill="#4a3a20" opacity="0.3"/>

      <!-- Grass blades -->
      <g stroke="#2d7a2d" stroke-width="1.5" fill="none" stroke-linecap="round">
        <path d="M20 403 Q18 395 22 391"/>
        <path d="M55 405 Q53 397 57 393"/>
        <path d="M80 403 Q78 395 82 391"/>
        <path d="M720 403 Q718 395 722 391"/>
        <path d="M750 405 Q748 397 752 393"/>
        <path d="M780 403 Q778 395 782 391"/>
      </g>

      <!-- Flowers outside -->
      <g transform="translate(40,398)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-3" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="3" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-4" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-1" r="2" fill="#f1c40f"/>
      </g>
      <g transform="translate(755,398)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-3" cy="-2" r="3" fill="#9b59b6"/>
        <circle cx="3" cy="-2" r="3" fill="#9b59b6"/>
        <circle cx="0" cy="-4" r="3" fill="#9b59b6"/>
        <circle cx="0" cy="-1" r="2" fill="#f1c40f"/>
      </g>

      <!-- Sun -->
      <circle cx="60" cy="60" r="30" fill="#f1c40f" opacity="0.9"/>
      <g stroke="#f39c12" stroke-width="3" stroke-linecap="round" opacity="0.7">
        <line x1="60" y1="22" x2="60" y2="14"/>
        <line x1="60" y1="98" x2="60" y2="106"/>
        <line x1="22" y1="60" x2="14" y2="60"/>
        <line x1="98" y1="60" x2="106" y2="60"/>
        <line x1="33" y1="33" x2="27" y2="27"/>
        <line x1="87" y1="33" x2="93" y2="27"/>
        <line x1="33" y1="87" x2="27" y2="93"/>
        <line x1="87" y1="87" x2="93" y2="93"/>
      </g>
    </svg>`;
    return bg;
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
    canvas.className = 'scene-canvas dollhouse-canvas';
    canvas.appendChild(createBackground());
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

    const undoBtn = document.createElement('button');
    undoBtn.className = 'toolbar-btn';
    undoBtn.innerHTML = '&#8630; Undo';
    listen(undoBtn, 'pointerup', onUndo);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'toolbar-btn danger';
    clearBtn.textContent = 'Clear All';
    listen(clearBtn, 'pointerup', () => onClearAll(canvas));

    toolbar.appendChild(sizeGroup);
    toolbar.appendChild(undoBtn);
    toolbar.appendChild(clearBtn);

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

    listen(canvas, 'pointerdown', (e) => {
      if (e.target === canvas || e.target.closest('.dollhouse-bg')) {
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
    if (e.target !== e.currentTarget && !e.target.closest('.dollhouse-bg')) return;

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

    makeDraggable(el, canvas);

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

    const delBtn = document.createElement('button');
    delBtn.className = 'sticker-delete';
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Delete sticker');
    listen(delBtn, 'pointerup', (e) => {
      e.stopPropagation();
      removeSticker(el);
    });
    el.appendChild(delBtn);

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

    overlay.querySelector('.confirm-yes').addEventListener('pointerup', () => {
      placedStickers.forEach(s => s.el.remove());
      placedStickers = [];
      selectedPlaced = null;
      overlay.remove();
      saveScene();
    });

    overlay.querySelector('.confirm-no').addEventListener('pointerup', () => {
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
    id: 'dollhouse-scene',
    title: 'Dollhouse Builder',
    description: 'Decorate a dollhouse!',
    icon: '🏠',
    init,
    destroy
  });
})();
