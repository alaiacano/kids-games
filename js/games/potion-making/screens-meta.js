/* ── Potion Making: meta screens (character select / gallery / mixing) ── */
(function () {
  window.PotionMaking = window.PotionMaking || {};
  const PM = window.PotionMaking;

  const STORAGE_CHARS = 'pm-characters';
  const STORAGE_POTIONS = 'pm-potions';

  /* ── Storage helpers ─────────────────────────────── */
  function loadStore(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { version: 1, items: [] };
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.items)) return { version: 1, items: [] };
      return data;
    } catch (e) {
      return { version: 1, items: [] };
    }
  }

  function saveStore(key, store) {
    try { localStorage.setItem(key, JSON.stringify(store)); } catch (e) {}
  }

  function uid() {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }

  /* ── Jar/bottle SVG (used by gallery and mixing) ──── */
  function jarSVG(blendColor, opts) {
    opts = opts || {};
    const fill = blendColor || '#888';
    const accent = opts.accent || '#fff';
    return `<svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="2" width="16" height="8" rx="2" fill="#7a5a3a"/>
      <rect x="20" y="8" width="20" height="6" rx="2" fill="#9c7c54"/>
      <path d="M22 14 Q14 22 14 36 L14 70 Q14 76 20 76 L40 76 Q46 76 46 70 L46 36 Q46 22 38 14Z" fill="${fill}" opacity="0.92"/>
      <path d="M22 14 Q14 22 14 36 L14 70 Q14 76 20 76 L40 76 Q46 76 46 70 L46 36 Q46 22 38 14Z" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.5"/>
      <ellipse cx="22" cy="30" rx="4" ry="10" fill="${accent}" opacity="0.35"/>
      <ellipse cx="38" cy="56" rx="3" ry="6" fill="${accent}" opacity="0.18"/>
    </svg>`;
  }

  function bottleSVG(potion) {
    return `<svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="2" width="12" height="10" rx="2" fill="#5a3a1a"/>
      <rect x="22" y="10" width="16" height="6" rx="2" fill="#7a5a3a"/>
      <path d="M22 16 Q14 24 14 40 L14 78 Q14 84 22 84 L38 84 Q46 84 46 78 L46 40 Q46 24 38 16Z" fill="${potion.primary}"/>
      <path d="M18 30 Q26 22 30 32 Q34 42 22 46 Q14 44 18 30Z" fill="${potion.secondary}" opacity="0.7"/>
      <path d="M30 50 Q38 44 42 56 Q40 66 30 64 Q22 60 30 50Z" fill="${potion.tertiary}" opacity="0.7"/>
      <ellipse cx="22" cy="34" rx="3" ry="8" fill="#fff" opacity="0.3"/>
    </svg>`;
  }

  /* ── Character Select ────────────────────────────── */
  const CharacterSelect = {
    render(container, t, ctx) {
      const charsStore = loadStore(STORAGE_CHARS);

      let pickedPresetId = null;
      let nameValue = '';

      const wrap = document.createElement('div');
      wrap.className = 'pm-screen pm-char-screen';
      wrap.innerHTML = `
        <h1 class="pm-screen-title">Choose Your Brewer</h1>
        <div class="pm-char-section">
          <div class="pm-char-section-label">Saved Brewers</div>
          <div class="pm-char-saved"></div>
        </div>
        <div class="pm-char-section">
          <div class="pm-char-section-label">Create New</div>
          <div class="pm-char-presets"></div>
          <div class="pm-char-create">
            <input class="pm-char-name-input" type="text" placeholder="Your name…" maxlength="14"/>
            <button class="pm-btn pm-char-start" disabled>Start</button>
          </div>
        </div>
      `;
      container.appendChild(wrap);

      const savedEl = wrap.querySelector('.pm-char-saved');
      const presetsEl = wrap.querySelector('.pm-char-presets');
      const nameInput = wrap.querySelector('.pm-char-name-input');
      const startBtn = wrap.querySelector('.pm-char-start');

      /* Saved characters */
      function renderSaved() {
        savedEl.innerHTML = '';
        if (charsStore.items.length === 0) {
          savedEl.innerHTML = `<div class="pm-empty-hint">No saved brewers yet.</div>`;
          return;
        }
        charsStore.items.forEach(item => {
          const sprites = PM.Characters.fromPreset(item.presetId, item.customizations);
          const card = document.createElement('div');
          card.className = 'pm-char-saved-card';
          card.innerHTML = `
            <div class="pm-char-saved-portrait">${sprites.portrait}</div>
            <div class="pm-char-saved-name">${escapeHTML(item.name)}</div>
            <button class="pm-char-saved-delete" aria-label="Delete">×</button>
          `;
          t.listen(card, 'pointerup', (e) => {
            if (e.target.closest('.pm-char-saved-delete')) return;
            ctx.character = item;
            t.setScreen('Gallery', ctx);
          });
          t.listen(card.querySelector('.pm-char-saved-delete'), 'pointerup', (e) => {
            e.stopPropagation();
            confirmDelete(`Delete ${item.name}?`, () => {
              charsStore.items = charsStore.items.filter(c => c.id !== item.id);
              saveStore(STORAGE_CHARS, charsStore);
              renderSaved();
            });
          });
          savedEl.appendChild(card);
        });
      }

      /* Preset picker */
      PM.Characters.PRESETS.forEach(p => {
        const sprites = PM.Characters.fromPreset(p.id);
        const btn = document.createElement('button');
        btn.className = 'pm-char-preset-btn';
        btn.dataset.id = p.id;
        btn.innerHTML = `
          <div class="pm-char-preset-portrait">${sprites.portrait}</div>
          <div class="pm-char-preset-label">${p.name}</div>
        `;
        t.listen(btn, 'pointerup', () => {
          pickedPresetId = p.id;
          presetsEl.querySelectorAll('.pm-char-preset-btn').forEach(b => {
            b.classList.toggle('pm-selected', b.dataset.id === p.id);
          });
          updateStart();
        });
        presetsEl.appendChild(btn);
      });

      function updateStart() {
        startBtn.disabled = !(pickedPresetId && nameValue.trim().length > 0);
      }

      t.listen(nameInput, 'input', () => {
        nameValue = nameInput.value;
        updateStart();
      });

      t.listen(startBtn, 'pointerup', () => {
        if (startBtn.disabled) return;
        const newChar = {
          id: uid(),
          name: nameValue.trim(),
          presetId: pickedPresetId,
          customizations: {}
        };
        charsStore.items.push(newChar);
        saveStore(STORAGE_CHARS, charsStore);
        ctx.character = newChar;
        t.setScreen('Gallery', ctx);
      });

      renderSaved();
    }
  };

  /* ── Potion Gallery ──────────────────────────────── */
  const Gallery = {
    render(container, t, ctx) {
      const potionsStore = loadStore(STORAGE_POTIONS);
      let selectedPotion = null;
      let monsterTarget = 5;

      const wrap = document.createElement('div');
      wrap.className = 'pm-screen pm-gal-screen';
      wrap.innerHTML = `
        <div class="pm-gal-header">
          <button class="pm-link-btn pm-gal-back">‹ Switch Brewer</button>
          <h1 class="pm-screen-title">${escapeHTML(ctx.character.name)}'s Shelf</h1>
          <div></div>
        </div>
        <div class="pm-gal-shelves"></div>
        <div class="pm-gal-footer">
          <div class="pm-gal-selected-info"></div>
          <div class="pm-gal-target">
            <span class="pm-gal-target-label">Monsters:</span>
            <button class="pm-gal-target-btn" data-target="5">5</button>
            <button class="pm-gal-target-btn" data-target="10">10</button>
            <button class="pm-gal-target-btn" data-target="15">15</button>
          </div>
          <button class="pm-btn pm-gal-start" disabled>Start Game</button>
        </div>
      `;
      container.appendChild(wrap);

      const shelvesEl = wrap.querySelector('.pm-gal-shelves');
      const infoEl = wrap.querySelector('.pm-gal-selected-info');
      const startBtn = wrap.querySelector('.pm-gal-start');

      const SLOT_COUNT = 30; // 6 × 5

      function renderShelves() {
        shelvesEl.innerHTML = '';
        for (let i = 0; i < SLOT_COUNT; i++) {
          const slot = document.createElement('div');
          slot.className = 'pm-gal-slot';
          const potion = potionsStore.items[i];
          if (potion) {
            const blend = PM.Potions.getBlendColor(potion.componentIds);
            const name = PM.Potions.getComboName(potion.componentIds);
            slot.classList.add('pm-gal-slot-filled');
            slot.innerHTML = `
              <div class="pm-gal-jar">${jarSVG(blend)}</div>
              <div class="pm-gal-jar-name">${escapeHTML(name)}</div>
            `;
            slot.title = `${name} — ${potion.componentIds.map(id => PM.Potions.getById(id).name).join(' + ')}`;
            t.listen(slot, 'pointerup', () => selectPotion(potion, slot));
            // long-press to delete
            attachLongPress(slot, () => {
              confirmDelete(`Delete ${name}?`, () => {
                potionsStore.items = potionsStore.items.filter(p => p.id !== potion.id);
                saveStore(STORAGE_POTIONS, potionsStore);
                if (selectedPotion && selectedPotion.id === potion.id) selectedPotion = null;
                renderShelves();
                renderInfo();
              });
            }, t);
          } else {
            slot.classList.add('pm-gal-slot-empty');
            slot.innerHTML = `<div class="pm-gal-plus">+</div>`;
            t.listen(slot, 'pointerup', () => {
              t.setScreen('Mixing', ctx);
            });
          }
          shelvesEl.appendChild(slot);
        }
      }

      function selectPotion(potion, slotEl) {
        selectedPotion = potion;
        shelvesEl.querySelectorAll('.pm-gal-slot').forEach(s => s.classList.remove('pm-gal-slot-active'));
        slotEl.classList.add('pm-gal-slot-active');
        renderInfo();
      }

      function renderInfo() {
        if (!selectedPotion) {
          infoEl.innerHTML = '<span class="pm-gal-info-hint">Tap a potion to select it. Tap + to brew a new one.</span>';
        } else {
          const name = PM.Potions.getComboName(selectedPotion.componentIds);
          const effects = PM.Potions.getEffects(selectedPotion.componentIds);
          const effDesc = effects.map(e => describeMechanic(e)).join(' · ');
          infoEl.innerHTML = `
            <div class="pm-gal-info-name">${escapeHTML(name)}</div>
            <div class="pm-gal-info-effects">${effDesc}</div>
          `;
        }
        startBtn.disabled = !selectedPotion;
      }

      // Monster target picker
      wrap.querySelectorAll('.pm-gal-target-btn').forEach(btn => {
        if (parseInt(btn.dataset.target) === monsterTarget) btn.classList.add('pm-active');
        t.listen(btn, 'pointerup', () => {
          monsterTarget = parseInt(btn.dataset.target);
          wrap.querySelectorAll('.pm-gal-target-btn').forEach(b => {
            b.classList.toggle('pm-active', parseInt(b.dataset.target) === monsterTarget);
          });
        });
      });

      t.listen(startBtn, 'pointerup', () => {
        if (!selectedPotion) return;
        ctx.potion = selectedPotion;
        ctx.target = monsterTarget;
        t.setScreen('Village', ctx);
      });

      t.listen(wrap.querySelector('.pm-gal-back'), 'pointerup', () => {
        ctx.character = null;
        t.setScreen('CharacterSelect', ctx);
      });

      renderShelves();
      renderInfo();
    }
  };

  /* ── Mixing (first-person) ───────────────────────── */
  const Mixing = {
    render(container, t, ctx) {
      let components = []; // FIFO, max 3

      const wrap = document.createElement('div');
      wrap.className = 'pm-screen pm-mix-screen';
      wrap.innerHTML = `
        <div class="pm-mix-header">
          <button class="pm-link-btn pm-mix-cancel">‹ Cancel</button>
          <h1 class="pm-screen-title">Brew a Potion</h1>
          <div></div>
        </div>
        <div class="pm-mix-stage">
          <div class="pm-mix-cauldron-area">
            <div class="pm-mix-jar"></div>
            <div class="pm-mix-slots">
              <div class="pm-mix-slot" data-i="0"></div>
              <div class="pm-mix-slot" data-i="1"></div>
              <div class="pm-mix-slot" data-i="2"></div>
            </div>
            <div class="pm-mix-name-preview">Choose ingredients…</div>
          </div>
          <div class="pm-mix-bottles"></div>
        </div>
        <div class="pm-mix-footer">
          <button class="pm-btn pm-btn-secondary pm-mix-clear">Clear</button>
          <button class="pm-btn pm-mix-brew" disabled>Brew Potion</button>
        </div>
      `;
      container.appendChild(wrap);

      const jarEl = wrap.querySelector('.pm-mix-jar');
      const slotsEl = wrap.querySelector('.pm-mix-slots');
      const namePreview = wrap.querySelector('.pm-mix-name-preview');
      const bottlesEl = wrap.querySelector('.pm-mix-bottles');
      const brewBtn = wrap.querySelector('.pm-mix-brew');
      const clearBtn = wrap.querySelector('.pm-mix-clear');

      function renderJar() {
        const blend = components.length > 0 ? PM.Potions.getBlendColor(components) : '#444a';
        jarEl.innerHTML = jarSVG(blend);
      }

      function renderSlots() {
        slotsEl.querySelectorAll('.pm-mix-slot').forEach(slot => {
          const i = parseInt(slot.dataset.i);
          const id = components[i];
          if (id) {
            const p = PM.Potions.getById(id);
            slot.classList.add('pm-mix-slot-filled');
            slot.style.setProperty('--pm-slot-color', p.primary);
            slot.title = p.name;
          } else {
            slot.classList.remove('pm-mix-slot-filled');
            slot.style.removeProperty('--pm-slot-color');
            slot.title = '';
          }
        });
      }

      function renderName() {
        if (components.length === 0) {
          namePreview.textContent = 'Choose ingredients…';
        } else {
          const name = PM.Potions.getComboName(components);
          const effects = PM.Potions.getEffects(components);
          const effDesc = effects.map(e => describeMechanic(e)).join(' · ');
          namePreview.innerHTML = `<div class="pm-mix-name">${escapeHTML(name)}</div><div class="pm-mix-effects">${effDesc}</div>`;
        }
        brewBtn.disabled = components.length === 0;
      }

      function addComponent(id, originRect) {
        // FIFO: drop oldest if 3
        if (components.length >= 3) components.shift();
        components.push(id);

        const p = PM.Potions.getById(id);
        const stageRect = wrap.querySelector('.pm-mix-stage').getBoundingClientRect();
        const jarRect = jarEl.getBoundingClientRect();
        const droplet = document.createElement('div');
        droplet.className = 'pm-mix-droplet';
        droplet.style.background = p.primary;
        droplet.style.left = (originRect.left - stageRect.left + originRect.width / 2 - 10) + 'px';
        droplet.style.top = (originRect.top - stageRect.top + 10) + 'px';
        const dx = (jarRect.left + jarRect.width / 2) - (originRect.left + originRect.width / 2);
        const dy = (jarRect.top + jarRect.height / 2) - (originRect.top + originRect.height / 2);
        droplet.style.setProperty('--pm-dx', dx + 'px');
        droplet.style.setProperty('--pm-dy', dy + 'px');
        wrap.querySelector('.pm-mix-stage').appendChild(droplet);
        setTimeout(() => {
          droplet.remove();
          renderJar();
          renderSlots();
          renderName();
        }, 380);
      }

      // Bottles
      PM.Potions.SINGULAR.forEach(p => {
        const btn = document.createElement('button');
        btn.className = 'pm-mix-bottle-btn';
        btn.style.setProperty('--pm-bottle-glow', p.primary);
        btn.innerHTML = `
          <div class="pm-mix-bottle-svg">${bottleSVG(p)}</div>
          <div class="pm-mix-bottle-label">${escapeHTML(p.name)}</div>
        `;
        t.listen(btn, 'pointerup', () => {
          const r = btn.getBoundingClientRect();
          addComponent(p.id, r);
        });
        bottlesEl.appendChild(btn);
      });

      t.listen(clearBtn, 'pointerup', () => {
        components = [];
        renderJar();
        renderSlots();
        renderName();
      });

      t.listen(brewBtn, 'pointerup', () => {
        if (components.length === 0) return;
        const potionsStore = loadStore(STORAGE_POTIONS);
        const newPotion = {
          id: uid(),
          componentIds: components.slice(),
          createdAt: Date.now()
        };
        potionsStore.items.push(newPotion);
        saveStore(STORAGE_POTIONS, potionsStore);
        t.setScreen('Gallery', ctx);
      });

      t.listen(wrap.querySelector('.pm-mix-cancel'), 'pointerup', () => {
        t.setScreen('Gallery', ctx);
      });

      renderJar();
      renderSlots();
      renderName();
    }
  };

  /* ── Helpers ────────────────────────────────────── */
  function describeMechanic(eff) {
    const m = eff.mechanic;
    if (m.type === 'line') {
      return `${eff.name}: line${m.freezeTurns ? ` + freeze ${m.freezeTurns}` : ''}`;
    } else if (m.type === 'arc') {
      return `${eff.name}: ${m.width}-wide cone`;
    } else if (m.type === 'aoe') {
      return `${eff.name}: ${m.radius * 2 + 1}×${m.radius * 2 + 1} burst`;
    }
    return eff.name;
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  function confirmDelete(msg, onYes) {
    const overlay = document.createElement('div');
    overlay.className = 'pm-confirm-overlay';
    overlay.innerHTML = `
      <div class="pm-confirm-dialog">
        <p>${escapeHTML(msg)}</p>
        <div class="pm-confirm-btns">
          <button class="pm-btn pm-confirm-yes">Delete</button>
          <button class="pm-btn pm-btn-secondary pm-confirm-no">Cancel</button>
        </div>
      </div>
    `;
    overlay.querySelector('.pm-confirm-yes').addEventListener('pointerup', () => {
      overlay.remove();
      onYes();
    });
    overlay.querySelector('.pm-confirm-no').addEventListener('pointerup', () => {
      overlay.remove();
    });
    document.body.appendChild(overlay);
  }

  function attachLongPress(el, onLong, t) {
    let timer = null;
    let triggered = false;
    t.listen(el, 'pointerdown', () => {
      triggered = false;
      timer = setTimeout(() => {
        triggered = true;
        onLong();
      }, 600);
    });
    const cancel = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    t.listen(el, 'pointerup', cancel);
    t.listen(el, 'pointercancel', cancel);
    t.listen(el, 'pointerleave', cancel);
    t.listen(el, 'contextmenu', (e) => {
      e.preventDefault();
      cancel();
      onLong();
    });
  }

  PM.Screens = PM.Screens || {};
  PM.Screens.CharacterSelect = CharacterSelect;
  PM.Screens.Gallery = Gallery;
  PM.Screens.Mixing = Mixing;

  PM.MetaUtil = { jarSVG, bottleSVG, describeMechanic, escapeHTML };
})();
