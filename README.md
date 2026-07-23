# Patchbay

Patchbay is a small, deliberately changeable demo site for testing Codex, GitHub
updates, and OpenAI Sites deployment.

The page includes a live color signal, an interactive patch counter, a compact
file map, and a visible changelog. Those surfaces make future edits easy to
identify both in the repository and on the deployed site.

## Run locally

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open the local URL printed by the development server.

## Verify a production build

```bash
npm run build
npm test
```

## Good follow-up tests

- Change the hero headline or supporting copy.
- Add a fourth accent color to the interaction playground.
- Add another card to the file surface.
- Add a new entry to the changelog.
- Replace the social preview in `public/og.jpg`.
- Add a second route and link it from the navigation.

## Project map

- `app/page.tsx` — page content and interactions
- `app/globals.css` — complete visual system and responsive behavior
- `app/layout.tsx` — page metadata and social sharing
- `public/og.jpg` — social link preview
- `.openai/hosting.json` — OpenAI Sites project binding

The site uses the vinext starter shape so its output is compatible with the
OpenAI Sites hosting environment.
