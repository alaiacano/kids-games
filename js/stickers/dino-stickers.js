/* ── Dinosaur Sticker SVGs ──────────────────────── */
(function () {
  window.SharedStickers = window.SharedStickers || {};

  window.SharedStickers.DINOS = [
    {
      name: 'Stegosaurus',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="50" cy="62" rx="30" ry="18" fill="#66bb6a"/>
        <!-- Belly -->
        <ellipse cx="50" cy="68" rx="22" ry="10" fill="#a5d6a7"/>
        <!-- Tail -->
        <path d="M80 60 Q92 55 95 45 Q90 50 85 52 Q88 44 90 38 Q85 46 82 48 L80 55Z" fill="#66bb6a"/>
        <!-- Tail spikes -->
        <circle cx="95" cy="44" r="3" fill="#ef5350"/>
        <circle cx="90" cy="37" r="3" fill="#ff9800"/>
        <!-- Head -->
        <ellipse cx="20" cy="52" rx="12" ry="10" fill="#66bb6a"/>
        <!-- Neck -->
        <path d="M26 48 Q32 45 35 50 Q32 58 26 56Z" fill="#66bb6a"/>
        <!-- Eye -->
        <circle cx="16" cy="49" r="3" fill="#fff"/>
        <circle cx="16" cy="49" r="1.5" fill="#333"/>
        <!-- Mouth -->
        <path d="M10 54 Q14 57 18 55" stroke="#333" stroke-width="1" fill="none"/>
        <!-- Rainbow plates along back -->
        <path d="M30 44 L33 32 L36 44Z" fill="#ef5350"/>
        <path d="M37 42 L41 28 L45 42Z" fill="#ff9800"/>
        <path d="M45 41 L49 26 L53 41Z" fill="#ffee58"/>
        <path d="M53 42 L57 28 L61 42Z" fill="#66bb6a"/>
        <path d="M61 44 L64 32 L67 44Z" fill="#42a5f5"/>
        <path d="M67 46 L70 36 L73 46Z" fill="#ab47bc"/>
        <!-- Legs -->
        <rect x="32" y="74" width="8" height="14" rx="3" fill="#4caf50"/>
        <rect x="60" y="74" width="8" height="14" rx="3" fill="#4caf50"/>
        <!-- Feet -->
        <ellipse cx="36" cy="88" rx="6" ry="3" fill="#388e3c"/>
        <ellipse cx="64" cy="88" rx="6" ry="3" fill="#388e3c"/>
      </svg>`
    },
    {
      name: 'T-Rex',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Tail -->
        <path d="M75 55 Q88 48 95 35 Q90 45 85 48Z" fill="#558b2f"/>
        <!-- Body -->
        <ellipse cx="55" cy="58" rx="24" ry="18" fill="#689f38"/>
        <!-- Belly -->
        <ellipse cx="52" cy="64" rx="16" ry="10" fill="#aed581"/>
        <!-- Head -->
        <rect x="15" y="25" width="30" height="22" rx="8" fill="#689f38"/>
        <!-- Upper jaw -->
        <path d="M15 37 L12 37 L12 42 L30 42 L30 37Z" fill="#689f38"/>
        <!-- Lower jaw -->
        <path d="M15 42 L12 42 L12 46 L30 46 L30 42Z" fill="#558b2f"/>
        <!-- Teeth -->
        <path d="M14 42 L16 45 L18 42 L20 45 L22 42 L24 45 L26 42 L28 45 L30 42" fill="#fff" stroke="#fff" stroke-width="0.5"/>
        <!-- Eye -->
        <circle cx="22" cy="32" r="4" fill="#fff"/>
        <circle cx="23" cy="32" r="2" fill="#333"/>
        <circle cx="23.5" cy="31.5" r="0.6" fill="#fff"/>
        <!-- Nostril -->
        <circle cx="14" cy="34" r="1.2" fill="#33691e"/>
        <!-- Neck -->
        <path d="M35 38 Q42 35 45 45 Q42 55 35 50Z" fill="#689f38"/>
        <!-- Tiny arms -->
        <path d="M40 50 Q35 52 33 56 L35 57 Q37 54 40 53Z" fill="#689f38"/>
        <circle cx="33" cy="57" r="2" fill="#aed581"/>
        <!-- Legs -->
        <rect x="42" y="72" width="10" height="16" rx="4" fill="#558b2f"/>
        <rect x="60" y="72" width="10" height="16" rx="4" fill="#558b2f"/>
        <!-- Feet -->
        <path d="M40 86 L44 92 L48 86 L52 92 L54 86Z" fill="#33691e"/>
        <path d="M58 86 L62 92 L66 86 L70 92 L72 86Z" fill="#33691e"/>
      </svg>`
    },
    {
      name: 'Triceratops',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Tail -->
        <path d="M82 58 Q90 52 95 48 Q92 56 85 60Z" fill="#8d6e63"/>
        <!-- Body -->
        <ellipse cx="58" cy="60" rx="26" ry="18" fill="#a1887f"/>
        <!-- Belly -->
        <ellipse cx="58" cy="66" rx="18" ry="10" fill="#d7ccc8"/>
        <!-- Frill -->
        <ellipse cx="22" cy="32" rx="18" ry="18" fill="#a1887f" stroke="#8d6e63" stroke-width="2"/>
        <ellipse cx="22" cy="32" rx="14" ry="14" fill="#bcaaa4"/>
        <!-- Frill spots -->
        <circle cx="15" cy="26" r="3" fill="#ff8a65"/>
        <circle cx="28" cy="26" r="3" fill="#ff8a65"/>
        <circle cx="22" cy="38" r="3" fill="#ff8a65"/>
        <!-- Head -->
        <path d="M18 38 Q10 42 8 50 Q10 56 18 58 Q28 58 32 52 Q32 42 28 38Z" fill="#a1887f"/>
        <!-- Neck -->
        <path d="M28 48 Q36 44 40 50 Q38 62 30 58Z" fill="#a1887f"/>
        <!-- Horns -->
        <path d="M14 36 L8 22 L18 34Z" fill="#fff9c4" stroke="#f9a825" stroke-width="0.5"/>
        <path d="M28 36 L32 20 L24 34Z" fill="#fff9c4" stroke="#f9a825" stroke-width="0.5"/>
        <!-- Nose horn -->
        <path d="M10 48 L4 44 L12 46Z" fill="#fff9c4" stroke="#f9a825" stroke-width="0.5"/>
        <!-- Eye -->
        <circle cx="18" cy="47" r="3" fill="#fff"/>
        <circle cx="19" cy="47" r="1.5" fill="#333"/>
        <!-- Mouth -->
        <path d="M9 54 Q12 56 16 54" stroke="#5d4037" stroke-width="1" fill="none"/>
        <!-- Beak -->
        <path d="M8 50 Q6 52 8 54 Q10 52 8 50Z" fill="#8d6e63"/>
        <!-- Legs -->
        <rect x="40" y="74" width="10" height="14" rx="4" fill="#8d6e63"/>
        <rect x="64" y="74" width="10" height="14" rx="4" fill="#8d6e63"/>
        <!-- Feet -->
        <ellipse cx="45" cy="88" rx="7" ry="3" fill="#6d4c41"/>
        <ellipse cx="69" cy="88" rx="7" ry="3" fill="#6d4c41"/>
      </svg>`
    },
    {
      name: 'Brontosaurus',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Tail (curves up) -->
        <path d="M78 60 Q88 55 92 45 Q95 38 98 32" stroke="#78909c" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Body -->
        <ellipse cx="58" cy="62" rx="24" ry="16" fill="#78909c"/>
        <!-- Belly -->
        <ellipse cx="58" cy="68" rx="17" ry="9" fill="#b0bec5"/>
        <!-- Neck -->
        <path d="M36 55 Q28 40 22 28 Q18 20 15 14" stroke="#78909c" stroke-width="10" fill="none" stroke-linecap="round"/>
        <!-- Neck underside (lighter) -->
        <path d="M38 58 Q30 44 24 32 Q20 24 18 18" stroke="#b0bec5" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Head -->
        <ellipse cx="14" cy="12" rx="10" ry="7" fill="#78909c"/>
        <!-- Eye -->
        <circle cx="10" cy="10" r="2.5" fill="#fff"/>
        <circle cx="10" cy="10" r="1.2" fill="#333"/>
        <!-- Mouth -->
        <path d="M6 15 Q10 17 14 15" stroke="#546e7a" stroke-width="1" fill="none"/>
        <!-- Nostril -->
        <circle cx="6" cy="11" r="1" fill="#546e7a"/>
        <!-- Smile/cheek -->
        <circle cx="18" cy="14" r="2" fill="rgba(255,138,128,0.4)"/>
        <!-- Legs -->
        <rect x="40" y="74" width="9" height="16" rx="4" fill="#607d8b"/>
        <rect x="52" y="74" width="9" height="16" rx="4" fill="#607d8b"/>
        <rect x="64" y="74" width="9" height="16" rx="4" fill="#607d8b"/>
        <!-- Feet -->
        <ellipse cx="44" cy="90" rx="6" ry="3" fill="#546e7a"/>
        <ellipse cx="56" cy="90" rx="6" ry="3" fill="#546e7a"/>
        <ellipse cx="68" cy="90" rx="6" ry="3" fill="#546e7a"/>
      </svg>`
    },
    {
      name: 'Pterodactyl',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Left wing -->
        <path d="M48 45 Q30 30 5 20 Q10 28 15 32 Q8 30 3 32 Q12 35 18 36 Q10 36 6 40 Q15 40 22 38 Q30 40 40 44Z" fill="#d4a056"/>
        <!-- Right wing -->
        <path d="M52 45 Q70 30 95 20 Q90 28 85 32 Q92 30 97 32 Q88 35 82 36 Q90 36 94 40 Q85 40 78 38 Q70 40 60 44Z" fill="#d4a056"/>
        <!-- Wing inner (lighter) -->
        <path d="M48 46 Q35 38 20 30 Q30 38 40 44Z" fill="#e6be82"/>
        <path d="M52 46 Q65 38 80 30 Q70 38 60 44Z" fill="#e6be82"/>
        <!-- Body -->
        <ellipse cx="50" cy="52" rx="14" ry="10" fill="#c08a3e"/>
        <!-- Belly -->
        <ellipse cx="50" cy="55" rx="10" ry="6" fill="#e6be82"/>
        <!-- Head crest -->
        <path d="M42 35 Q38 20 32 15 Q38 22 40 30Z" fill="#e57373"/>
        <!-- Head -->
        <ellipse cx="44" cy="38" rx="8" ry="7" fill="#c08a3e"/>
        <!-- Beak -->
        <path d="M36 38 L28 42 L36 42Z" fill="#f9a825"/>
        <path d="M36 42 L28 42 L36 44Z" fill="#f57f17"/>
        <!-- Eye -->
        <circle cx="41" cy="36" r="2.5" fill="#fff"/>
        <circle cx="41" cy="36" r="1.2" fill="#333"/>
        <!-- Legs -->
        <path d="M44 60 L40 72 L36 72 L40 70 L38 72 L42 70 L44 72 L42 62Z" fill="#a67c30"/>
        <path d="M56 60 L60 72 L64 72 L60 70 L62 72 L58 70 L56 72 L58 62Z" fill="#a67c30"/>
      </svg>`
    },
    {
      name: 'Ankylosaurus',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Tail -->
        <path d="M80 58 Q90 54 94 50 Q96 48 95 46" stroke="#6d4c41" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Tail club -->
        <ellipse cx="96" cy="44" rx="6" ry="5" fill="#5d4037"/>
        <!-- Body (armored shell) -->
        <ellipse cx="50" cy="56" rx="32" ry="20" fill="#8d6e63"/>
        <!-- Armor plates row 1 -->
        <ellipse cx="30" cy="44" rx="6" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <ellipse cx="44" cy="42" rx="6" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <ellipse cx="58" cy="42" rx="6" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <ellipse cx="72" cy="44" rx="6" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <!-- Armor plates row 2 -->
        <ellipse cx="36" cy="54" rx="7" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <ellipse cx="51" cy="52" rx="7" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <ellipse cx="66" cy="54" rx="7" ry="5" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <!-- Side spikes -->
        <path d="M20 50 L14 46 L20 48Z" fill="#795548"/>
        <path d="M19 58 L12 56 L19 55Z" fill="#795548"/>
        <path d="M80 50 L86 46 L80 48Z" fill="#795548"/>
        <path d="M80 58 L86 56 L80 55Z" fill="#795548"/>
        <!-- Belly -->
        <ellipse cx="50" cy="66" rx="24" ry="8" fill="#d7ccc8"/>
        <!-- Head -->
        <ellipse cx="16" cy="56" rx="10" ry="9" fill="#8d6e63"/>
        <!-- Head armor -->
        <path d="M10 50 Q16 44 22 50" fill="#a1887f" stroke="#795548" stroke-width="1"/>
        <!-- Horn nubs -->
        <circle cx="8" cy="50" r="2.5" fill="#795548"/>
        <circle cx="24" cy="50" r="2.5" fill="#795548"/>
        <!-- Eye -->
        <circle cx="12" cy="54" r="2.5" fill="#fff"/>
        <circle cx="12" cy="54" r="1.2" fill="#333"/>
        <!-- Mouth -->
        <path d="M8 60 Q12 63 16 60" stroke="#5d4037" stroke-width="1" fill="none"/>
        <!-- Legs -->
        <rect x="28" y="72" width="10" height="12" rx="4" fill="#6d4c41"/>
        <rect x="62" y="72" width="10" height="12" rx="4" fill="#6d4c41"/>
        <!-- Feet -->
        <ellipse cx="33" cy="84" rx="7" ry="3" fill="#5d4037"/>
        <ellipse cx="67" cy="84" rx="7" ry="3" fill="#5d4037"/>
      </svg>`
    }
  ];
})();
