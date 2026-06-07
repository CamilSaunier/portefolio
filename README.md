# Camil Saunier — Portfolio

Personal portfolio of Camil Saunier, full-stack developer. Built from scratch with
React and hand-written CSS (no UI framework), bilingual (FR/EN) with a light/dark theme.

## Highlights

- **Bilingual** (French / English) via `react-i18next`, with language detection and
  dynamic `<title>`/`<meta description>` and `<html lang>`.
- **Light / dark theme** driven by CSS custom properties, persisted in `localStorage`,
  with an anti-FOUC inline script. The dark theme uses a warm ember accent; the favicon
  and mobile `theme-color` follow the theme.
- **Liquid-glass design**: translucent surfaces (`backdrop-filter`) over an animated
  "lava lamp" background, with subtle motion (sliding droplet toggles, periodic light
  sweeps) and a typewriter hero.
- **Accessibility**: skip link, visible focus styles, focus-trapped modals, keyboard
  navigation, `prefers-reduced-motion` support, screen-reader labels.
- **Projects**: detail modal with the per-project tech stack (logos) and a screenshot
  lightbox.
- **CVs**: downloadable FR/EN résumés, each in a light and a dark variant, with an
  in-page preview modal (see [CV generation](#cv-generation)).
- **Social sharing**: Open Graph / Twitter meta with a generated preview image.

## Tech stack

- **React 19** + **Vite 7** (JavaScript / JSX, no TypeScript)
- **CSS Modules** — hand-written, co-located with each component
- **react-i18next** for internationalisation
- **react-icons** for technology/skill logos
- No UI framework, no CSS framework.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```text
public/            static assets (logos, screenshots, favicons, generated CVs)
cv-src/            CV source files (HTML) -> compiled to PDF + preview images
scripts/           generate-cv.sh : regenerates the CVs and their previews
src/
  components/      reusable UI (Navbar, Footer, Lightbox, CvPreview, toggles…)
  sections/        page sections (Hero, About, Experience, Skills, Projects, Contact)
  context/         ThemeContext (light/dark)
  hooks/           useReveal (scroll animations), typewriter hooks
  i18n/            i18next config + locales/{fr,en}.json
```

## CV generation

The CVs are **generated assets**, not edited by hand in `public/`. The source of truth
is `cv-src/cv-fr.html` and `cv-src/cv-en.html`. Each source produces a light and a dark
variant (the dark one is enabled via a `?dark` query in the generation URL).

```bash
bash scripts/generate-cv.sh
```

This renders the PDFs with headless Chrome (`--print-to-pdf`) and the preview images with
`pdftocairo`, writing them to `public/cv/`. Requirements: `google-chrome-stable` and
`poppler-utils` (`pdftocairo`).

After regenerating, bump the `V` cache-busting constant in
`src/sections/About/About.jsx` so browsers reload the updated files.

## Configuration

Open Graph tags need the site's public URL. It is injected at build time by Vite from an
environment variable — set it in `.env` (or in your host's dashboard):

```dotenv
VITE_SITE_URL=https://domain.com
```

## License

Personal project — all rights reserved.
