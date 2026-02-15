/* ── Playground Scene Builder ─────────────────────── */
(() => {
  /* ── SVG Sticker Definitions ─────────────────────── */
  const STICKERS = [
    {
      name: 'Boy',
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Hair back -->
        <ellipse cx="50" cy="28" rx="22" ry="20" fill="#6b4226"/>
        <!-- Head -->
        <ellipse cx="50" cy="32" rx="18" ry="17" fill="#f5cba7"/>
        <!-- Hair top/bangs -->
        <path d="M32 28 Q35 14 50 12 Q65 14 68 28 Q65 20 50 18 Q35 20 32 28Z" fill="#6b4226"/>
        <path d="M33 30 Q35 22 42 24" fill="#6b4226"/>
        <!-- Eyes -->
        <ellipse cx="42" cy="33" rx="3" ry="3.5" fill="#fff"/>
        <circle cx="42" cy="33.5" r="2" fill="#5a3a1a"/>
        <circle cx="42.5" cy="32.5" r="0.7" fill="#fff"/>
        <ellipse cx="58" cy="33" rx="3" ry="3.5" fill="#fff"/>
        <circle cx="58" cy="33.5" r="2" fill="#5a3a1a"/>
        <circle cx="58.5" cy="32.5" r="0.7" fill="#fff"/>
        <!-- Mouth -->
        <path d="M45 40 Q50 44 55 40" stroke="#c0392b" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Nose -->
        <ellipse cx="50" cy="37" rx="1.5" ry="1" fill="#e6b08a"/>
        <!-- Body / shirt -->
        <rect x="35" y="50" width="30" height="30" rx="6" fill="#3498db"/>
        <rect x="35" y="50" width="30" height="10" rx="4" fill="#2980b9"/>
        <!-- Arms -->
        <rect x="22" y="52" width="15" height="10" rx="5" fill="#3498db"/>
        <rect x="63" y="52" width="15" height="10" rx="5" fill="#3498db"/>
        <circle cx="23" cy="57" r="5" fill="#f5cba7"/>
        <circle cx="77" cy="57" r="5" fill="#f5cba7"/>
        <!-- Legs / shorts -->
        <rect x="36" y="78" width="12" height="16" rx="4" fill="#2c3e50"/>
        <rect x="52" y="78" width="12" height="16" rx="4" fill="#2c3e50"/>
        <!-- Shoes -->
        <rect x="34" y="92" width="16" height="8" rx="4" fill="#e74c3c"/>
        <rect x="50" y="92" width="16" height="8" rx="4" fill="#e74c3c"/>
      </svg>`
    },
    {
      name: 'Girl',
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Hair back (long) -->
        <path d="M28 28 Q28 10 50 8 Q72 10 72 28 L72 70 Q72 75 65 75 L60 60 L40 60 L35 75 Q28 75 28 70Z" fill="#b5834b"/>
        <!-- Head -->
        <ellipse cx="50" cy="32" rx="18" ry="17" fill="#f5cba7"/>
        <!-- Hair top/bangs -->
        <path d="M32 28 Q34 14 50 12 Q66 14 68 28 Q65 18 50 16 Q35 18 32 28Z" fill="#b5834b"/>
        <path d="M32 26 Q36 20 44 24 L40 28Z" fill="#b5834b"/>
        <path d="M68 26 Q64 20 56 24 L60 28Z" fill="#b5834b"/>
        <!-- Cat ear headband -->
        <path d="M30 22 L28 20 L32 10 L38 18 L36 22" fill="#333" stroke="#333" stroke-width="1"/>
        <path d="M70 22 L72 20 L68 10 L62 18 L64 22" fill="#333" stroke="#333" stroke-width="1"/>
        <path d="M36 22 Q50 18 64 22" stroke="#333" stroke-width="2.5" fill="none"/>
        <path d="M33 14 L36 17" stroke="#ffb6c1" stroke-width="1.5"/>
        <path d="M67 14 L64 17" stroke="#ffb6c1" stroke-width="1.5"/>
        <!-- Eyes -->
        <ellipse cx="42" cy="33" rx="3.5" ry="4" fill="#fff"/>
        <circle cx="42" cy="34" r="2.2" fill="#4a90d9"/>
        <circle cx="42.6" cy="33" r="0.8" fill="#fff"/>
        <ellipse cx="58" cy="33" rx="3.5" ry="4" fill="#fff"/>
        <circle cx="58" cy="34" r="2.2" fill="#4a90d9"/>
        <circle cx="58.6" cy="33" r="0.8" fill="#fff"/>
        <!-- Eyelashes -->
        <path d="M38 30 L39 32" stroke="#5a3a1a" stroke-width="0.8"/>
        <path d="M62 30 L61 32" stroke="#5a3a1a" stroke-width="0.8"/>
        <!-- Mouth -->
        <path d="M45 41 Q50 45 55 41" stroke="#e75480" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Nose -->
        <ellipse cx="50" cy="37" rx="1.5" ry="1" fill="#e6b08a"/>
        <!-- Pink dress -->
        <path d="M35 50 L30 90 Q50 95 70 90 L65 50 Q50 48 35 50Z" fill="#ff69b4"/>
        <path d="M35 50 L32 65 Q50 68 68 65 L65 50 Q50 48 35 50Z" fill="#ff85c8"/>
        <!-- Dress collar -->
        <path d="M40 50 Q50 54 60 50" stroke="#fff" stroke-width="1.5" fill="none"/>
        <!-- Arms -->
        <rect x="22" y="52" width="14" height="9" rx="4.5" fill="#ff69b4"/>
        <rect x="64" y="52" width="14" height="9" rx="4.5" fill="#ff69b4"/>
        <circle cx="22" cy="56" r="5" fill="#f5cba7"/>
        <circle cx="78" cy="56" r="5" fill="#f5cba7"/>
        <!-- Legs -->
        <rect x="38" y="88" width="8" height="14" rx="3" fill="#f5cba7"/>
        <rect x="54" y="88" width="8" height="14" rx="3" fill="#f5cba7"/>
        <!-- Shoes -->
        <rect x="36" y="99" width="12" height="7" rx="3.5" fill="#9b59b6"/>
        <rect x="52" y="99" width="12" height="7" rx="3.5" fill="#9b59b6"/>
      </svg>`
    },
    {
      name: 'Swing Set',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- A-frame -->
        <line x1="10" y1="95" x2="30" y2="10" stroke="#e67e22" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="95" x2="30" y2="10" stroke="#e67e22" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="95" x2="70" y2="10" stroke="#e67e22" stroke-width="4" stroke-linecap="round"/>
        <line x1="90" y1="95" x2="70" y2="10" stroke="#e67e22" stroke-width="4" stroke-linecap="round"/>
        <!-- Top bar -->
        <line x1="28" y1="10" x2="72" y2="10" stroke="#e67e22" stroke-width="5" stroke-linecap="round"/>
        <!-- Swing 1 chains -->
        <line x1="38" y1="10" x2="34" y2="65" stroke="#7f8c8d" stroke-width="1.5"/>
        <line x1="46" y1="10" x2="46" y2="65" stroke="#7f8c8d" stroke-width="1.5"/>
        <!-- Swing 1 seat -->
        <rect x="31" y="65" width="18" height="5" rx="2" fill="#2c3e50"/>
        <!-- Swing 2 chains -->
        <line x1="58" y1="10" x2="56" y2="60" stroke="#7f8c8d" stroke-width="1.5"/>
        <line x1="66" y1="10" x2="68" y2="60" stroke="#7f8c8d" stroke-width="1.5"/>
        <!-- Swing 2 seat -->
        <rect x="53" y="60" width="18" height="5" rx="2" fill="#e74c3c"/>
      </svg>`
    },
    {
      name: 'Slide',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Slide surface -->
        <path d="M25 20 Q25 60 55 78 L80 90" stroke="#f1c40f" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M25 20 Q25 60 55 78 L80 90" stroke="#f39c12" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Side rails -->
        <path d="M20 18 Q20 58 52 76 L78 88" stroke="#e74c3c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M30 18 Q30 56 58 74 L82 86" stroke="#e74c3c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Ladder -->
        <line x1="22" y1="20" x2="22" y2="92" stroke="#e67e22" stroke-width="3" stroke-linecap="round"/>
        <line x1="32" y1="20" x2="32" y2="92" stroke="#e67e22" stroke-width="3" stroke-linecap="round"/>
        <!-- Ladder rungs -->
        <line x1="22" y1="30" x2="32" y2="30" stroke="#e67e22" stroke-width="2.5"/>
        <line x1="22" y1="42" x2="32" y2="42" stroke="#e67e22" stroke-width="2.5"/>
        <line x1="22" y1="54" x2="32" y2="54" stroke="#e67e22" stroke-width="2.5"/>
        <line x1="22" y1="66" x2="32" y2="66" stroke="#e67e22" stroke-width="2.5"/>
        <line x1="22" y1="78" x2="32" y2="78" stroke="#e67e22" stroke-width="2.5"/>
        <!-- Platform -->
        <rect x="18" y="17" width="18" height="6" rx="2" fill="#e67e22"/>
      </svg>`
    },
    {
      name: 'Teeter-Totter',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Fulcrum / triangle base -->
        <polygon points="50,60 40,88 60,88" fill="#e67e22"/>
        <polygon points="50,64 43,85 57,85" fill="#d35400"/>
        <!-- Board (slightly tilted) -->
        <rect x="5" y="52" width="90" height="7" rx="3" fill="#8e44ad" transform="rotate(-5 50 56)"/>
        <!-- Left handle -->
        <line x1="18" y1="40" x2="18" y2="54" stroke="#7f8c8d" stroke-width="3" stroke-linecap="round" transform="rotate(-5 50 56)"/>
        <circle cx="18" cy="39" r="3" fill="#e74c3c" transform="rotate(-5 50 56)"/>
        <!-- Right handle -->
        <line x1="82" y1="45" x2="82" y2="58" stroke="#7f8c8d" stroke-width="3" stroke-linecap="round" transform="rotate(-5 50 56)"/>
        <circle cx="82" cy="44" r="3" fill="#3498db" transform="rotate(-5 50 56)"/>
        <!-- Ground shadow -->
        <ellipse cx="50" cy="92" rx="35" ry="4" fill="rgba(0,0,0,0.1)"/>
      </svg>`
    },
    {
      name: 'Sandbox',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Box sides -->
        <path d="M10 40 L10 75 L90 75 L90 40Z" fill="#c0772b"/>
        <path d="M10 40 L10 75 L20 75 L20 40Z" fill="#a0621e"/>
        <!-- Sand -->
        <rect x="12" y="42" width="76" height="31" rx="2" fill="#f4d98c"/>
        <ellipse cx="50" cy="42" rx="38" ry="5" fill="#f0d080"/>
        <!-- Sand texture bumps -->
        <ellipse cx="35" cy="58" rx="10" ry="4" fill="#e8c870" opacity="0.6"/>
        <ellipse cx="60" cy="52" rx="8" ry="3" fill="#e8c870" opacity="0.5"/>
        <!-- Wooden edges top -->
        <rect x="8" y="36" width="84" height="6" rx="2" fill="#d4883e"/>
        <!-- Corner posts -->
        <rect x="8" y="34" width="6" height="44" rx="1" fill="#a0621e"/>
        <rect x="86" y="34" width="6" height="44" rx="1" fill="#a0621e"/>
        <!-- Little shovel -->
        <line x1="70" y1="35" x2="75" y2="55" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M72 55 Q75 62 78 55" fill="#e74c3c"/>
        <!-- Little bucket -->
        <path d="M25 48 L22 62 L35 62 L32 48Z" fill="#3498db"/>
        <rect x="23" y="46" width="12" height="3" rx="1" fill="#2980b9"/>
        <path d="M24 46 Q29 40 34 46" stroke="#7f8c8d" stroke-width="1.5" fill="none"/>
      </svg>`
    },
    {
      name: 'Soccer Ball',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" fill="#fff" stroke="#ccc" stroke-width="1"/>
        <!-- Pentagon patches -->
        <polygon points="50,18 58,28 54,38 46,38 42,28" fill="#2c3e50"/>
        <polygon points="26,38 36,34 40,44 34,52 24,48" fill="#2c3e50"/>
        <polygon points="74,38 64,34 60,44 66,52 76,48" fill="#2c3e50"/>
        <polygon points="34,66 40,58 50,62 50,72 38,74" fill="#2c3e50"/>
        <polygon points="66,66 60,58 50,62 50,72 62,74" fill="#2c3e50"/>
        <!-- Seam lines -->
        <line x1="42" y1="28" x2="36" y2="34" stroke="#bbb" stroke-width="1"/>
        <line x1="58" y1="28" x2="64" y2="34" stroke="#bbb" stroke-width="1"/>
        <line x1="46" y1="38" x2="40" y2="44" stroke="#bbb" stroke-width="1"/>
        <line x1="54" y1="38" x2="60" y2="44" stroke="#bbb" stroke-width="1"/>
        <line x1="34" y1="52" x2="40" y2="58" stroke="#bbb" stroke-width="1"/>
        <line x1="66" y1="52" x2="60" y2="58" stroke="#bbb" stroke-width="1"/>
        <line x1="50" y1="62" x2="50" y2="72" stroke="#bbb" stroke-width="1"/>
        <!-- Shine -->
        <circle cx="40" cy="35" r="8" fill="rgba(255,255,255,0.4)"/>
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
        <!-- Paws -->
        <ellipse cx="34" cy="90" rx="5" ry="3" fill="#a06e20"/>
        <ellipse cx="66" cy="90" rx="5" ry="3" fill="#a06e20"/>
        <!-- Head -->
        <ellipse cx="50" cy="38" rx="18" ry="16" fill="#d4993a"/>
        <!-- Ears -->
        <ellipse cx="33" cy="30" rx="8" ry="12" fill="#a06e20" transform="rotate(-15 33 30)"/>
        <ellipse cx="67" cy="30" rx="8" ry="12" fill="#a06e20" transform="rotate(15 67 30)"/>
        <!-- Face -->
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
        <!-- Mouth -->
        <path d="M47 45 Q50 48 53 45" stroke="#8b5e3c" stroke-width="1.2" fill="none"/>
        <!-- Tail -->
        <path d="M76 58 Q85 45 80 35" stroke="#c0872b" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Tongue -->
        <ellipse cx="50" cy="48" rx="3" ry="4" fill="#e75480"/>
      </svg>`
    },
    {
      name: 'Butterfly',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Upper wings -->
        <ellipse cx="32" cy="38" rx="22" ry="18" fill="#9b59b6" transform="rotate(-15 32 38)"/>
        <ellipse cx="68" cy="38" rx="22" ry="18" fill="#9b59b6" transform="rotate(15 68 38)"/>
        <ellipse cx="33" cy="37" rx="14" ry="11" fill="#bb77dd" transform="rotate(-15 33 37)"/>
        <ellipse cx="67" cy="37" rx="14" ry="11" fill="#bb77dd" transform="rotate(15 67 37)"/>
        <!-- Wing spots -->
        <circle cx="28" cy="35" r="5" fill="#e74c3c" opacity="0.6"/>
        <circle cx="72" cy="35" r="5" fill="#e74c3c" opacity="0.6"/>
        <circle cx="35" cy="42" r="3" fill="#f1c40f" opacity="0.7"/>
        <circle cx="65" cy="42" r="3" fill="#f1c40f" opacity="0.7"/>
        <!-- Lower wings -->
        <ellipse cx="35" cy="60" rx="16" ry="14" fill="#8e44ad" transform="rotate(-10 35 60)"/>
        <ellipse cx="65" cy="60" rx="16" ry="14" fill="#8e44ad" transform="rotate(10 65 60)"/>
        <ellipse cx="36" cy="59" rx="10" ry="8" fill="#a855c7" transform="rotate(-10 36 59)"/>
        <ellipse cx="64" cy="59" rx="10" ry="8" fill="#a855c7" transform="rotate(10 64 59)"/>
        <!-- Body -->
        <ellipse cx="50" cy="50" rx="4" ry="22" fill="#2c3e50"/>
        <circle cx="50" cy="28" r="5" fill="#2c3e50"/>
        <!-- Eyes -->
        <circle cx="48" cy="27" r="1.5" fill="#fff"/>
        <circle cx="52" cy="27" r="1.5" fill="#fff"/>
        <!-- Antennae -->
        <path d="M48 24 Q42 12 38 10" stroke="#2c3e50" stroke-width="1.5" fill="none"/>
        <circle cx="38" cy="10" r="2.5" fill="#f39c12"/>
        <path d="M52 24 Q58 12 62 10" stroke="#2c3e50" stroke-width="1.5" fill="none"/>
        <circle cx="62" cy="10" r="2.5" fill="#f39c12"/>
      </svg>`
    },
    {
      name: 'Kite',
      svg: `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <!-- Kite body -->
        <polygon points="50,5 75,40 50,70 25,40" fill="#e74c3c"/>
        <polygon points="50,5 50,70 25,40" fill="#c0392b"/>
        <!-- Cross struts -->
        <line x1="50" y1="5" x2="50" y2="70" stroke="#f39c12" stroke-width="1.5"/>
        <line x1="25" y1="40" x2="75" y2="40" stroke="#f39c12" stroke-width="1.5"/>
        <!-- Decorations -->
        <circle cx="50" cy="32" r="6" fill="#f1c40f" opacity="0.8"/>
        <circle cx="40" cy="45" r="4" fill="#3498db" opacity="0.7"/>
        <circle cx="60" cy="45" r="4" fill="#3498db" opacity="0.7"/>
        <!-- String -->
        <path d="M50 70 Q55 80 48 90 Q52 100 47 110" stroke="#7f8c8d" stroke-width="1.5" fill="none"/>
        <!-- Tail bows -->
        <polygon points="48,85 42,82 42,88" fill="#2ecc71"/>
        <polygon points="50,95 44,92 44,98" fill="#9b59b6"/>
        <polygon points="47,105 41,102 41,108" fill="#f39c12"/>
      </svg>`
    }
  ];

  const SIZES = { S: 60, M: 100, L: 150 };
  const STORAGE_KEY = 'playground-scene-save';

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

  /* ── Background scene ────────────────────────────── */
  function createBackground() {
    const bg = document.createElement('div');
    bg.className = 'playground-bg';
    bg.innerHTML = `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">
      <!-- Sun -->
      <circle cx="680" cy="70" r="45" fill="#f1c40f"/>
      <circle cx="680" cy="70" r="45" fill="url(#pgSun)"/>
      <g stroke="#f39c12" stroke-width="4" stroke-linecap="round">
        <line x1="680" y1="15" x2="680" y2="5"/>
        <line x1="680" y1="125" x2="680" y2="135"/>
        <line x1="625" y1="70" x2="615" y2="70"/>
        <line x1="735" y1="70" x2="745" y2="70"/>
        <line x1="644" y1="34" x2="637" y2="27"/>
        <line x1="716" y1="34" x2="723" y2="27"/>
        <line x1="644" y1="106" x2="637" y2="113"/>
        <line x1="716" y1="106" x2="723" y2="113"/>
      </g>
      <!-- Clouds -->
      <g fill="#fff" opacity="0.85">
        <ellipse cx="150" cy="60" rx="50" ry="22"/>
        <ellipse cx="120" cy="55" rx="30" ry="18"/>
        <ellipse cx="185" cy="58" rx="28" ry="16"/>
        <ellipse cx="420" cy="45" rx="45" ry="20"/>
        <ellipse cx="395" cy="40" rx="28" ry="16"/>
        <ellipse cx="450" cy="42" rx="25" ry="14"/>
      </g>
      <!-- Tree 1 (left) -->
      <rect x="85" y="200" width="16" height="80" rx="4" fill="#8B5E3C"/>
      <circle cx="93" cy="185" r="35" fill="#27ae60"/>
      <circle cx="75" cy="195" r="22" fill="#2ecc71"/>
      <circle cx="110" cy="195" r="22" fill="#2ecc71"/>
      <circle cx="93" cy="170" r="20" fill="#2ecc71"/>
      <!-- Tree 2 (right) -->
      <rect x="640" y="190" width="14" height="90" rx="4" fill="#8B5E3C"/>
      <circle cx="647" cy="175" r="32" fill="#27ae60"/>
      <circle cx="628" cy="186" r="22" fill="#2ecc71"/>
      <circle cx="665" cy="186" r="22" fill="#2ecc71"/>
      <circle cx="647" cy="160" r="18" fill="#2ecc71"/>
      <!-- Shrub left -->
      <ellipse cx="30" cy="278" rx="28" ry="18" fill="#27ae60"/>
      <ellipse cx="15" cy="280" rx="16" ry="12" fill="#2ecc71"/>
      <ellipse cx="48" cy="280" rx="16" ry="12" fill="#2ecc71"/>
      <!-- Shrub right -->
      <ellipse cx="750" cy="278" rx="30" ry="18" fill="#27ae60"/>
      <ellipse cx="730" cy="280" rx="18" ry="14" fill="#2ecc71"/>
      <ellipse cx="770" cy="278" rx="16" ry="12" fill="#2ecc71"/>
      <!-- Shrub center-right -->
      <ellipse cx="540" cy="282" rx="20" ry="14" fill="#2ecc71"/>
      <ellipse cx="555" cy="284" rx="14" ry="10" fill="#27ae60"/>
      <!-- Ground / grass line -->
      <rect x="0" y="275" width="800" height="225" fill="#4a9e4a"/>
      <rect x="0" y="275" width="800" height="8" fill="#3d8b3d"/>
      <!-- Grass blades scattered -->
      <g stroke="#2d7a2d" stroke-width="1.5" fill="none" stroke-linecap="round">
        <path d="M50 290 Q48 282 52 278"/>
        <path d="M180 300 Q178 292 182 288"/>
        <path d="M300 285 Q298 277 302 273"/>
        <path d="M450 295 Q452 287 448 283"/>
        <path d="M600 290 Q598 282 602 278"/>
        <path d="M720 288 Q718 280 722 276"/>
        <path d="M100 310 Q98 302 102 298"/>
        <path d="M350 305 Q352 297 348 293"/>
        <path d="M550 300 Q548 292 552 288"/>
      </g>
      <!-- Flowers -->
      <!-- Flower 1 -->
      <g transform="translate(65,295)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-4" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="4" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-5" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-1" r="2" fill="#f1c40f"/>
      </g>
      <!-- Flower 2 -->
      <g transform="translate(220,290)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-4" cy="-2" r="3" fill="#e74c3c"/>
        <circle cx="4" cy="-2" r="3" fill="#e74c3c"/>
        <circle cx="0" cy="-5" r="3" fill="#e74c3c"/>
        <circle cx="0" cy="-1" r="2" fill="#f39c12"/>
      </g>
      <!-- Flower 3 -->
      <g transform="translate(480,292)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-3" cy="-2" r="3" fill="#9b59b6"/>
        <circle cx="3" cy="-2" r="3" fill="#9b59b6"/>
        <circle cx="0" cy="-5" r="3" fill="#9b59b6"/>
        <circle cx="0" cy="-1" r="2" fill="#f1c40f"/>
      </g>
      <!-- Flower 4 -->
      <g transform="translate(700,293)">
        <line x1="0" y1="0" x2="0" y2="11" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-4" cy="-2" r="3" fill="#3498db"/>
        <circle cx="4" cy="-2" r="3" fill="#3498db"/>
        <circle cx="0" cy="-5" r="3" fill="#3498db"/>
        <circle cx="0" cy="-1" r="2" fill="#fff"/>
      </g>
      <!-- Flower 5 -->
      <g transform="translate(370,288)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#2d7a2d" stroke-width="2"/>
        <circle cx="-4" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="4" cy="-2" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-5" r="3" fill="#ff69b4"/>
        <circle cx="0" cy="-1" r="2" fill="#f1c40f"/>
      </g>
      <defs>
        <radialGradient id="pgSun" cx="40%" cy="38%"><stop offset="0%" stop-color="rgba(255,255,255,0.35)"/><stop offset="100%" stop-color="transparent"/></radialGradient>
      </defs>
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
    canvas.className = 'scene-canvas playground-canvas';
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
      if (e.target === canvas || e.target.closest('.playground-bg')) {
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
    // Allow clicks on canvas or the background layer
    if (e.target !== e.currentTarget && !e.target.closest('.playground-bg')) return;

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
    id: 'playground-scene',
    title: 'Playground Builder',
    description: 'Build a playground scene!',
    icon: '🛝',
    init,
    destroy
  });
})();
