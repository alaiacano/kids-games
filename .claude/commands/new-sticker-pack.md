Create a new sticker pack for this project.

Ask the user for:
- Pack name (e.g. "Ocean", "Farm", "Fantasy")
- SharedStickers key — ALLCAPS, e.g. `OCEAN`
- Which game(s) will use these stickers

Then do ALL of the following steps:

## Step 1: Create the sticker file

Create `js/stickers/<name-lowercase>-stickers.js` with this structure.
Use the SVGs provided by the user, or generate appropriate kid-friendly inline SVG art.
All SVGs use `viewBox="0 0 100 100"`.

```js
/* ── <Name> Sticker SVGs ────────────────────────── */
(function () {
  window.SharedStickers = window.SharedStickers || {};

  window.SharedStickers.<KEY> = [
    {
      name: '<StickerName>',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG content here -->
      </svg>`
    },
    // IMPORTANT: Never reorder entries — indices are persisted in localStorage saves
  ];
})();
```

## Step 2: Add the script tag to index.html

Read `index.html` and find the sticker script block. Add the new tag AFTER the last `js/stickers/` script tag and BEFORE any `js/games/` script tags.

Example of where to insert:
```html
<script src="js/stickers/dino-stickers.js"></script>
<script src="js/stickers/<name>-stickers.js"></script>  <!-- add here -->
<script src="js/games/sticker-scene.js"></script>
```

## Step 3: Tell the user what to do next

Print a short summary:
- File created: `js/stickers/<name>-stickers.js`
- Script tag added to `index.html`
- Remind them to reference `SharedStickers.<KEY>` in the game files that use it
- Remind them to update the Sticker System section in `CLAUDE.md` with the new index range
- **Critical reminder**: never reorder entries in the array — it breaks localStorage saves
