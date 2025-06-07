# Frontend Overview

This folder contains the static pages that make up the Fallout Alabama user interface. Each HTML file represents a section of the PIP‑Boy styled app and they all use the shared assets located in `css/`, `js/`, `fonts/`, `img/` and `assets/`.

## Page structure

- **index.html** – entry page with the intro video and character selection.
- **player.html** – main status screen for a player.
- **inv.html** – inventory management page.
- **overseer.html** – special interface for the Overseer role.
- **radio.html** – list of songs to play in an embedded YouTube player.

The pages are linked together through a navbar at the top of each HTML file. Links labelled `STAT`, `INV`, `DATA`, `MAP` and `RADIO` open the corresponding page. Selecting `HOME` returns to `index.html` and using the query `?skipIntro=1` skips the intro video. The Overseer page also loads `js/navigation.js` to handle tab navigation without reloading the page.

## Running locally

From the repository root install the dependencies and start the development server provided by the Vercel CLI:

```bash
npm install
npx vercel dev
```

The command serves the frontend together with the API endpoints defined in `api/`. Open the printed local address in your browser to explore the pages.
