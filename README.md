# Carlo & Alexandra — 9 January 2027

Wedding site for Carlo & Alexandra. Static: no build step, no dependencies.

## Deploying on GitHub Pages

1. Push this folder to a repository.
2. Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site is served from `index.html`.

`.nojekyll` must stay in the repo — without it GitHub ignores folders that start with an underscore.

## Files

- `index.html` — the site (deploy this)
- `Wedding V2 Midnight Burgundy.dc.html` — editable source; regenerate `index.html` after changing it
- `support.js`, `image-slot.js` — runtime
- `.image-slots.state.json` — the gallery photographs (must be uploaded with the site)
- `assets/` — hero photo, venue photos, monogram, background music

Names, timeline and FAQ copy live inside the page itself.

## Pending assets

- `assets/save-the-date.mp4` — the save-the-date film (the story section's player looks for this exact filename)
