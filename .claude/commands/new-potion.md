Add a new singular potion to the Potion Making game.

Ask the user for:
- **id** — lowercase, single word (e.g. `lightning`, `nature`, `void`). MUST be unique. Will be persisted to localStorage saves so once shipped, NEVER remove or rename.
- **Display name** — capitalized (e.g. "Lightning")
- **Three swirl colors** — primary, secondary, tertiary (hex)
- **Mechanic type** — one of: `line`, `arc`, `aoe`
  - For `line`: ask for `range` (default 2). Optional `freezeTurns` (number).
  - For `arc`: ask for `width` (default 3) and `range` (default 2).
  - For `aoe`: ask for `radius` (default 1).

Then do ALL of the following steps:

## Step 1: Append to SINGULAR array

Read `js/games/potion-making/potion-data.js` and append the new entry to the end of the `SINGULAR` array, right before its closing `]`. Example:

```js
{
  id: 'lightning', name: 'Lightning',
  primary: '#f1c40f', secondary: '#fff5cc', tertiary: '#a86fff',
  mechanic: { type: 'line', range: 3, freezeTurns: 1 }
},
```

## Step 2: Add combo names for every combination involving the new potion

The combo lookup uses sorted-multiset keys (`componentIds.slice().sort().join(',')`). For a new id `X` against existing ids `[fire, ice, sky, rain]`, generate names for all NEW combos:

- 1 single: `'X'`
- 1 same-pair double: `'X,X'`
- 4 distinct doubles (alphabetically sorted with each existing id): `'X,fire'` (or `'fire,X'` — whichever sorts first), `'X,ice'`, `'X,rain'`, `'X,sky'`
- 1 all-same triple: `'X,X,X'`
- 8 two-same triples: `'X,X,fire'`, `'X,X,ice'`, `'X,X,rain'`, `'X,X,sky'`, plus `'fire,fire,X'`, `'ice,ice,X'`, `'rain,rain,X'`, `'sky,sky,X'` (all sorted)
- 6 distinct triples: every pair of existing ids combined with X (sorted)

That's 21 new combo entries. Show the user a table of needed combo keys and let them fill in mystical names, OR propose draft names and let them confirm. Then insert all entries into the `COMBO_NAMES` object in `potion-data.js`.

**Important:** insert each entry with the key already sorted alphabetically — that's what the lookup uses.

## Step 3: Verify it shows up

Tell the user to:
- Open `index.html` in the browser.
- Click "Potion Making" → pick a brewer → tap any empty slot to open Mixing.
- Confirm a 5th bottle appears with the new potion's name and colors.
- Brew a single-ingredient version and confirm the gallery shows the new combo name.

## Step 4: Reminders

- **Never reorder or remove SINGULAR entries** — saved potions reference ids, so removing one will break saves silently (the helper returns `null` for unknown ids).
- No `index.html` changes needed — `potion-data.js` is already loaded.
- If the new mechanic type isn't `line`/`arc`/`aoe`, you'll also need to update `computeAttackCells` in `js/games/potion-making/potion-making.js` and add a corresponding `.pm-vil-flash-<type>` CSS animation in `css/style.css`.
