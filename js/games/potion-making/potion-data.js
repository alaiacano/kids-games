/* ── Potion Making: data layer ──────────────────── */
(function () {
  window.PotionMaking = window.PotionMaking || {};

  /* ── Singular potions ─────────────────────────────
     CRITICAL: ids are persisted in localStorage saves.
     Never remove or rename an id once shipped — only append. */
  const SINGULAR = [
    {
      id: 'fire', name: 'Fire',
      primary: '#ff3a1a', secondary: '#ff8c1a', tertiary: '#ffd000',
      mechanic: { type: 'line', range: 2 }
    },
    {
      id: 'ice', name: 'Ice',
      primary: '#1a8cff', secondary: '#7ad7ff', tertiary: '#ffffff',
      mechanic: { type: 'line', range: 2, freezeTurns: 2 }
    },
    {
      id: 'sky', name: 'Sky',
      primary: '#5e6273', secondary: '#aab1c4', tertiary: '#ffffff',
      mechanic: { type: 'arc', width: 3, range: 2 }
    },
    {
      id: 'rain', name: 'Rain',
      primary: '#2436a8', secondary: '#7a3aff', tertiary: '#7ad7ff',
      mechanic: { type: 'aoe', radius: 1 }
    }
  ];

  const BY_ID = {};
  SINGULAR.forEach(p => { BY_ID[p.id] = p; });

  /* ── Combo names (sorted-multiset key → mystical name) ──
     Key is componentIds.slice().sort().join(',').
     34 entries: 4 singles + 4 same-pairs + 6 distinct pairs +
     4 same-triples + 12 two-same triples + 4 distinct triples. */
  const COMBO_NAMES = {
    // Singles
    'fire': 'Fire',
    'ice':  'Ice',
    'sky':  'Sky',
    'rain': 'Rain',

    // Same-pair doubles
    'fire,fire': 'Inferno',
    'ice,ice':   'Glacier',
    'sky,sky':   'Tempest',
    'rain,rain': 'Deluge',

    // Distinct doubles (sorted alphabetically)
    'fire,ice':  'Steam Burst',
    'fire,rain': 'Crimson Storm',
    'fire,sky':  'Solar Flare',
    'ice,rain':  'Sleet',
    'ice,sky':   'Blizzard',
    'rain,sky':  'Thunderhead',

    // All-same triples
    'fire,fire,fire': 'Phoenix Wrath',
    'ice,ice,ice':    'Frozen Heart',
    'sky,sky,sky':    'Hurricane',
    'rain,rain,rain': 'Monsoon',

    // Two-same + one-distinct triples (sorted alphabetically)
    'fire,fire,ice':  'Searing Frost',
    'fire,fire,rain': 'Volcano',
    'fire,fire,sky':  'Wildfire',
    'fire,ice,ice':   'Frostbite',
    'fire,rain,rain': 'Boiling Mist',
    'fire,sky,sky':   'Sunray',
    'ice,ice,rain':   'Hailstorm',
    'ice,ice,sky':    'Snowsquall',
    'ice,rain,rain':  'Snowfall',
    'ice,sky,sky':    'Frostgale',
    'rain,rain,sky':  'Thunderstorm',
    'rain,sky,sky':   'Galeforce',

    // All-distinct triples (sorted alphabetically)
    'fire,ice,rain': 'Maelstrom',
    'fire,ice,sky':  'Aurora',
    'fire,rain,sky': 'Rainbow',
    'ice,rain,sky':  'Northern Lights'
  };

  /* ── Helpers ───────────────────────────────────── */

  function clamp255(n) { return Math.max(0, Math.min(255, Math.round(n))); }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16)
    };
  }

  function rgbToHex(r, g, b) {
    const h = (n) => clamp255(n).toString(16).padStart(2, '0');
    return '#' + h(r) + h(g) + h(b);
  }

  function mixColors(hexColors) {
    if (!hexColors || hexColors.length === 0) return '#888888';
    let r = 0, g = 0, b = 0;
    hexColors.forEach(hex => {
      const c = hexToRgb(hex);
      r += c.r; g += c.g; b += c.b;
    });
    const n = hexColors.length;
    return rgbToHex(r / n, g / n, b / n);
  }

  function comboKey(componentIds) {
    return componentIds.slice().sort().join(',');
  }

  function getComboName(componentIds) {
    if (!componentIds || componentIds.length === 0) return 'Empty Brew';
    return COMBO_NAMES[comboKey(componentIds)] || 'Mystic Brew';
  }

  function getById(id) {
    return BY_ID[id] || null;
  }

  /* Returns one effect per unique component id (dedup by id).
     Each effect: { id, name, mechanic, primary } — used for attack resolution
     and gallery descriptions. */
  function getEffects(componentIds) {
    if (!componentIds) return [];
    const seen = new Set();
    const out = [];
    componentIds.forEach(id => {
      if (seen.has(id)) return;
      seen.add(id);
      const p = BY_ID[id];
      if (!p) return;
      out.push({ id: p.id, name: p.name, mechanic: p.mechanic, primary: p.primary });
    });
    return out;
  }

  function getBlendColor(componentIds) {
    if (!componentIds || componentIds.length === 0) return '#888888';
    const primaries = componentIds.map(id => BY_ID[id] && BY_ID[id].primary).filter(Boolean);
    return mixColors(primaries);
  }

  window.PotionMaking.Potions = {
    SINGULAR,
    COMBO_NAMES,
    mixColors,
    getComboName,
    getEffects,
    getById,
    getBlendColor
  };

  /* ── Monsters ─────────────────────────────────── */
  const MONSTER_TYPES = [
    {
      id: 'slime', name: 'Slime', hp: 1, weight: 6, moveMs: 900,
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="78" rx="36" ry="8" fill="#1a3a1a" opacity="0.35"/>
        <path d="M14 70 Q14 30 50 28 Q86 30 86 70 Q86 78 78 78 L22 78 Q14 78 14 70Z" fill="#3ec23e"/>
        <path d="M22 62 Q22 38 50 36 Q78 38 78 62" fill="#5fdb5f" opacity="0.6"/>
        <ellipse cx="36" cy="56" rx="6" ry="7" fill="#fff"/>
        <ellipse cx="36" cy="58" rx="3" ry="4" fill="#1a1a1a"/>
        <ellipse cx="64" cy="56" rx="6" ry="7" fill="#fff"/>
        <ellipse cx="64" cy="58" rx="3" ry="4" fill="#1a1a1a"/>
        <path d="M40 70 Q50 76 60 70" stroke="#1a4a1a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <ellipse cx="42" cy="46" rx="5" ry="3" fill="#a8f0a8" opacity="0.7"/>
      </svg>`
    },
    {
      id: 'goblin', name: 'Goblin', hp: 2, weight: 3, moveMs: 750,
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="86" rx="32" ry="6" fill="#1a1a1a" opacity="0.35"/>
        <ellipse cx="50" cy="68" rx="22" ry="16" fill="#6b3e1c"/>
        <ellipse cx="30" cy="64" rx="6" ry="9" fill="#7a4a26" transform="rotate(-22 30 64)"/>
        <ellipse cx="70" cy="64" rx="6" ry="9" fill="#7a4a26" transform="rotate(22 70 64)"/>
        <ellipse cx="50" cy="44" rx="20" ry="18" fill="#7ab33e"/>
        <polygon points="30,40 18,18 38,32" fill="#7ab33e"/>
        <polygon points="70,40 82,18 62,32" fill="#7ab33e"/>
        <ellipse cx="42" cy="44" rx="4" ry="5" fill="#fff"/>
        <ellipse cx="42" cy="46" rx="2.4" ry="3" fill="#a83030"/>
        <ellipse cx="58" cy="44" rx="4" ry="5" fill="#fff"/>
        <ellipse cx="58" cy="46" rx="2.4" ry="3" fill="#a83030"/>
        <path d="M44 54 L48 58 L46 60 L44 58Z" fill="#fff"/>
        <path d="M52 54 L56 58 L54 60 L52 58Z" fill="#fff"/>
        <path d="M40 56 Q50 60 60 56" stroke="#2a1a0a" stroke-width="1.8" fill="none"/>
      </svg>`
    },
    {
      id: 'ogre', name: 'Ogre', hp: 3, weight: 1, moveMs: 600,
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="92" rx="38" ry="6" fill="#1a1a1a" opacity="0.4"/>
        <ellipse cx="50" cy="70" rx="32" ry="20" fill="#5a4030"/>
        <ellipse cx="22" cy="64" rx="9" ry="13" fill="#6b4e3c" transform="rotate(-25 22 64)"/>
        <ellipse cx="78" cy="64" rx="9" ry="13" fill="#6b4e3c" transform="rotate(25 78 64)"/>
        <ellipse cx="50" cy="40" rx="26" ry="22" fill="#866b54"/>
        <path d="M28 30 L24 16 L36 26Z" fill="#dcdcdc"/>
        <path d="M72 30 L76 16 L64 26Z" fill="#dcdcdc"/>
        <ellipse cx="40" cy="40" rx="5" ry="6" fill="#fff"/>
        <ellipse cx="40" cy="42" rx="3" ry="4" fill="#f0c020"/>
        <ellipse cx="40" cy="42" rx="1.4" ry="2" fill="#1a1a1a"/>
        <ellipse cx="60" cy="40" rx="5" ry="6" fill="#fff"/>
        <ellipse cx="60" cy="42" rx="3" ry="4" fill="#f0c020"/>
        <ellipse cx="60" cy="42" rx="1.4" ry="2" fill="#1a1a1a"/>
        <path d="M38 54 Q50 62 62 54" stroke="#2a1a0a" stroke-width="2.2" fill="none"/>
        <path d="M44 54 L42 62 L46 58Z" fill="#fff"/>
        <path d="M56 54 L58 62 L54 58Z" fill="#fff"/>
        <ellipse cx="50" cy="22" rx="6" ry="3" fill="#5a4030" opacity="0.6"/>
      </svg>`
    }
  ];

  window.PotionMaking.Monsters = { TYPES: MONSTER_TYPES };
})();
