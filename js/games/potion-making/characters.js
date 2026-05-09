/* ── Potion Making: composable character SVGs ──── */
(function () {
  window.PotionMaking = window.PotionMaking || {};

  /* Build top-down body+head+indicator on a 100x100 canvas.
     Body and head always face south. Indicator is in a <g class="pm-indicator-rot">
     that the village renderer rotates via setAttribute('transform', ...). */
  function topDownSVG(opts) {
    const skin = opts.skin;
    const hairColor = opts.hair.color;
    const shirt = opts.shirt;
    const pants = opts.pants;
    const shoes = opts.shoes;

    return `<svg class="pm-char-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="#000" opacity="0.25"/>
      <!-- legs/shoes peek out under torso -->
      <rect x="36" y="74" width="10" height="18" rx="3" fill="${pants}"/>
      <rect x="54" y="74" width="10" height="18" rx="3" fill="${pants}"/>
      <ellipse cx="41" cy="91" rx="6" ry="3" fill="${shoes}"/>
      <ellipse cx="59" cy="91" rx="6" ry="3" fill="${shoes}"/>
      <!-- torso -->
      <ellipse cx="50" cy="62" rx="20" ry="16" fill="${shirt}"/>
      <!-- arms -->
      <ellipse cx="28" cy="58" rx="7" ry="10" fill="${shirt}" transform="rotate(-12 28 58)"/>
      <ellipse cx="72" cy="58" rx="7" ry="10" fill="${shirt}" transform="rotate(12 72 58)"/>
      <ellipse cx="26" cy="66" rx="4" ry="4" fill="${skin}"/>
      <ellipse cx="74" cy="66" rx="4" ry="4" fill="${skin}"/>
      <!-- head: hair halo, face -->
      <circle cx="50" cy="40" r="20" fill="${hairColor}"/>
      <ellipse cx="50" cy="42" rx="15" ry="14" fill="${skin}"/>
      <!-- bangs hint -->
      <path d="M35 36 Q50 28 65 36 Q60 30 50 30 Q40 30 35 36Z" fill="${hairColor}"/>
      <!-- eyes -->
      <ellipse cx="44" cy="44" rx="1.6" ry="2" fill="#1a1a1a"/>
      <ellipse cx="56" cy="44" rx="1.6" ry="2" fill="#1a1a1a"/>
      <!-- mouth -->
      <path d="M46 50 Q50 53 54 50" stroke="#a83030" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <!-- indicator: a tiny "front" hair tuft / cap that points the facing direction.
           Wrapped in a group the renderer rotates around (50,30) — top of head. -->
      <g class="pm-indicator-rot" transform="rotate(0 50 50)">
        <circle cx="50" cy="22" r="4" fill="${hairColor}"/>
        <circle cx="50" cy="22" r="2" fill="#fff" opacity="0.6"/>
      </g>
    </svg>`;
  }

  /* Portrait: face + shoulders for character-select cards. */
  function portraitSVG(opts) {
    const skin = opts.skin;
    const hairColor = opts.hair.color;
    const shirt = opts.shirt;

    return `<svg class="pm-char-portrait" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <!-- shoulders -->
      <path d="M10 120 Q10 84 30 78 L70 78 Q90 84 90 120Z" fill="${shirt}"/>
      <!-- neck -->
      <rect x="42" y="64" width="16" height="18" rx="4" fill="${skin}"/>
      <!-- hair back -->
      <ellipse cx="50" cy="46" rx="34" ry="34" fill="${hairColor}"/>
      <!-- face -->
      <ellipse cx="50" cy="48" rx="26" ry="28" fill="${skin}"/>
      <!-- bangs -->
      <path d="M22 42 Q34 22 50 22 Q66 22 78 42 Q70 30 50 30 Q30 30 22 42Z" fill="${hairColor}"/>
      <!-- eyes -->
      <ellipse cx="40" cy="50" rx="3" ry="3.5" fill="#fff"/>
      <ellipse cx="40" cy="51" rx="1.6" ry="2.2" fill="#1a1a1a"/>
      <ellipse cx="60" cy="50" rx="3" ry="3.5" fill="#fff"/>
      <ellipse cx="60" cy="51" rx="1.6" ry="2.2" fill="#1a1a1a"/>
      <!-- nose hint -->
      <ellipse cx="50" cy="56" rx="1.4" ry="1" fill="#c89070" opacity="0.6"/>
      <!-- mouth -->
      <path d="M44 62 Q50 66 56 62" stroke="#a83030" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    </svg>`;
  }

  function factory(opts) {
    const merged = mergeWithDefaults(opts);
    return {
      topDown: topDownSVG(merged),
      portrait: portraitSVG(merged)
    };
  }

  function mergeWithDefaults(opts) {
    return {
      skin: opts.skin || '#f5cba7',
      hair: { color: (opts.hair && opts.hair.color) || '#5a3a1a', style: (opts.hair && opts.hair.style) || 'short' },
      shirt: opts.shirt || '#3498db',
      pants: opts.pants || '#2c3e50',
      shoes: opts.shoes || '#e74c3c'
    };
  }

  const PRESETS = [
    {
      id: 'boy1', name: 'Sandy',
      skin: '#f5cba7', hair: { color: '#5a3a1a', style: 'short' },
      shirt: '#3498db', pants: '#2c3e50', shoes: '#e74c3c'
    },
    {
      id: 'boy2', name: 'Rio',
      skin: '#c89070', hair: { color: '#1a1a1a', style: 'short' },
      shirt: '#27ae60', pants: '#7a4a26', shoes: '#ecf0f1'
    },
    {
      id: 'girl1', name: 'Posy',
      skin: '#f5d2b5', hair: { color: '#e6c068', style: 'short' },
      shirt: '#ff6fb0', pants: '#8e44ad', shoes: '#ecf0f1'
    },
    {
      id: 'girl2', name: 'Mira',
      skin: '#9c6a4a', hair: { color: '#2a1a0a', style: 'short' },
      shirt: '#f1c40f', pants: '#2a5298', shoes: '#ff6fb0'
    }
  ];

  function fromPreset(presetId, customizations) {
    const p = PRESETS.find(x => x.id === presetId);
    if (!p) return factory({});
    const c = customizations || {};
    return factory({
      skin: c.skin || p.skin,
      hair: c.hair || p.hair,
      shirt: c.shirt || p.shirt,
      pants: c.pants || p.pants,
      shoes: c.shoes || p.shoes
    });
  }

  window.PotionMaking.Characters = { factory, fromPreset, PRESETS };
})();
