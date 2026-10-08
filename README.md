# DESA Menu — Product Site

Marketing site for **DESA Menu**, a premium digital menu ecosystem for
restaurants, cafes, lounges and hotels. Four capabilities carry the product:

- **Interactive text menus** — fast, phone-first, editable in seconds
- **Cinematic video dishes** — short in-service films attached to signature plates
- **Gamified dining ecosystem** — *Who Pays?*, the *Ideal Combo Spinner*, the *Taste &
  Personality Quiz*, plus custom table games and loyalty micro-interactions
- **Digital loyalty cards** — retention and return visits, built in

Built with **Vite + React 19 + TypeScript + Tailwind CSS v4**, `framer-motion`
for motion, `react-router-dom` for routing and Supabase-backed serverless
handlers in `api/` (with an in-memory seed-data fallback, so the site runs with
zero configuration).

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the production build
npm run lint       # eslint
```

No environment variables are required to run the site: when Supabase isn't
configured the API handlers serve the content in `api/seed-data.js` and
inquiries are held in memory.

## Routes

| Route             | Page         | Notes                                                       |
| ----------------- | ------------ | ----------------------------------------------------------- |
| `/`               | Home         | Full product story: value, capabilities, live demos, process |
| `/features`       | Features     | The four capabilities, plus the games suite as tabs           |
| `/features/:slug` | Feature detail | Any capability or game in full — 8 pages                    |
| `/demos`          | Live demos   | 8 venues running DESA Menu (category filter, grid/list)      |
| `/demos/:slug`    | Demo detail  | Venue story, deployment, metrics                             |
| `/how-it-works`   | How it works | Five-week onboarding, shoot day, analytics review            |
| `/notes`          | Notes        | Field notes from deployments (filterable)                    |
| `/notes/:slug`    | Note detail  | Article, pull quote, related notes                           |
| `/contact`        | Contact      | Demo request form, wired to `POST /api/inquiries`            |

Legacy paths (`/desa-menu`, `/work/*`, `/journal/*`, `/services`, `/studio`)
redirect to their current equivalents so existing links never 404.

## Content

All site content lives in `api/seed-data.js` and is served through the API
handlers, so the same data drives the marketing pages and (when Supabase is
configured) production:

| Collection     | Contents                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------- |
| `projects`     | 3 venue demos — JUVIA (Italian fine dining & lounge), LE MANOIR (café, gastronomie & lounge), PAUSE À PARIS (café, boulangerie & bistro), each with its own feature pills |
| `testimonials` | 3 operator quotes, one per venue                                                              |
| `posts`        | 7 field notes on video menus, phone-first design, loyalty, table games, deployment and analytics |
| `inquiries`    | Empty — populated at runtime when a form is submitted                                          |

Demos span **Fine Dining**, **Lounges** and **Bistro**, and each carries a
tagline, long-form description, capability list, the `games` suite it runs,
metrics and a timeline.

Every venue also carries `features` — the tailored capabilities shown as pill
badges on the showcase cards, the `/demos` grid and list rows, and the detail
page header. Each pill is `{ label, kind }`, and `kind` decides how it reads:
`game` pills take the honey accent and the dice mark, `module` pills stay
neutral. That is what makes the three venues comparable at a glance — you can
see which ones run table games and which sell speed instead.

Imagery lives in `public/images/`. Dish and venue photography is treated with
`.img-warm` (warm saturation and contrast) and `.warm-veil` (ember/honey radial
gradients) so culinary media reads appetising against the dark system. Replace
the venue photography with real shoots before launch.

## Page composition

`src/pages/Home.tsx` composes nine reusable sections from `src/components/desa/`:

| Component         | Section                                              |
| ----------------- | ---------------------------------------------------- |
| `DesaHero`        | Headline, CTAs, device mockup, venue marquee          |
| `DesaValueGrid`   | Four business outcomes                                |
| `DesaFeatures`    | The four capabilities, each linking to its detail page |
| `DesaGames`       | The games suite as tabs — one panel swaps in place, no scrolling |
| `DesaDemos`       | Live demo showcase (featured venues from the API)     |
| `DesaComparison`  | Traditional QR/PDF menus vs DESA Menu                 |
| `DesaProcess`     | Three-step onboarding                                 |
| `DesaUseCases`    | Restaurants, cafes, lounges, hotels                   |
| `DesaCta`         | Closing call to action                                |
| `DesaContact`     | Contact details + `DesaContactForm`                   |
| `DesaUI`          | Shared button and tag primitives                      |

`PageHeader` is the shared header for inner pages (`/features`,
`/how-it-works`, `/demos`, `/notes`). Section indices run 01–07 across the page.

Home ships in the initial bundle; every other route is `React.lazy`-loaded with a
`Suspense` fallback, so the first paint carries only what the homepage needs.

## Gamified dining ecosystem

`DesaGames` presents the suite as an **interactive tab set**: clicking *Who Pays?*,
*Ideal Combo Spinner*, *Taste & Personality Quiz* or *Custom Games* swaps the copy
and the live mock panel in place, with no page change and no scroll jump (the panel
area holds a fixed minimum height). The active tab is mirrored into `?game=<slug>`
using `replace: true`, so tab clicks don't fill up the back button — and the URL is
shareable.

Each demo's `games` array drives the chips on the demo cards and the games panel on
`/demos/:slug`:

| Game | What it does |
| ---- | ------------ |
| **Who Pays?** | Bill roulette that decides who settles the check — the memorable, shareable one. |
| **Ideal Combo Spinner** | Spin-the-wheel pairing of a meal and a drink, weighted toward the combinations a venue wants to sell. |
| **Taste & Personality Quiz** | A few preference questions that curate a personal selection of plates and cocktails on the spot. |
| **Custom games & loyalty micro-interactions** | Built per venue: loyalty streaks, spin-to-unlock rewards, points on reorder, milestone bonuses, table leaderboards. |

All four appear across the seed demos; engagement figures quoted on the section
(1 in 3 tables, +23 min dwell, +41% reorders) come from the lounge deployments in
the same data set.

## Feature detail pages

`src/lib/features.ts` is the single source of truth for all eight entries — the four
capabilities and the four games. `DesaFeatures` renders the cards, `DesaGames` renders
the tabs, and `/features/:slug` renders any entry as a full page, so copy and mock
panels cannot drift between the three.

| Slug | Page |
| ---- | ---- |
| `video-menus` · `text-menus` · `gamified-dining` · `loyalty-cards` | Capabilities |
| `who-pays` · `combo-spinner` · `taste-quiz` · `custom-games` | Games |

Every detail page carries a **sticky "← Back to Features" bar** under the navbar and a
**return block at the bottom** with the same action, plus previous/next paging and a
"Where it runs" list matched from the demos' capabilities and games.

Navigating back is lossless: `ScrollToTop` in `App.tsx` remembers the scroll offset per
pathname and restores it on `POP`, and because the tab lives in the URL, a visitor
returns to the exact game they were reading.

Every form on the site — the hero, the `/contact` four-step form, the
`DesaContact` panel and the footer newsletter — posts through `submitInquiry()`
in `src/lib/api.ts` to `POST /api/inquiries`:

| Form field                    | Inquiry field                     |
| ----------------------------- | --------------------------------- |
| Name                          | `name`                            |
| Business Name                 | `company`                         |
| Venue Type                    | `project_type` → `DESA Menu - …`  |
| Email                         | `email`                           |
| Phone (optional)              | appended to `message`             |
| What would you like to show…  | `message`                         |

## API

`api/*.js` are Vercel-style serverless handlers (`(req, res) => …`):

| Endpoint            | Methods                | Purpose                                                   |
| ------------------- | ---------------------- | --------------------------------------------------------- |
| `/api/projects`     | GET                    | Venue demos (`?slug=`, `?category=`, `?featured=`)         |
| `/api/posts`        | GET                    | Field notes (`?slug=`)                                     |
| `/api/testimonials` | GET                    | Operator quotes                                           |
| `/api/inquiries`    | GET, POST, PUT, DELETE | Demo requests and leads                                    |

Each handler tries Supabase first (4s timeout) and falls back to seed data, so
the site is never blank.

### Supabase (optional)

```bash
NEXT_PUBLIC_SUPABASE_URL=…
SUPABASE_SERVICE_ROLE_KEY=…
```

### Local API in dev

A bare `vite` server doesn't serve the `api/` directory — `/api/*` would fall
through to the SPA history fallback and return `index.html` with a `200`, which
looks like success but breaks every fetch. `vite-plugin-api.ts` mounts the
handlers as dev middleware so `npm run dev` behaves like production. On Vercel
the same files run as real serverless functions; `vercel dev` also works.

## Design system

Tokens are declared in `@theme` in `src/index.css`, so they are available as
Tailwind utilities:

| Token      | Value     | Usage                        |
| ---------- | --------- | ---------------------------- |
| `ink`      | `#0a0a0b` | Page background              |
| `coal`     | `#131315` | Alternating sections         |
| `carbon`   | `#1c1c1f` | Cards, image placeholders    |
| `bone`     | `#f2efe9` | Primary text                 |
| `parchment`| `#e8e3d9` | Warm accents                 |
| `fog`      | `#a3a09a` | Secondary text               |
| `smoke`    | `#6e6c68` | Tertiary text                |
| `lime`     | `#d7ff3f` | Primary accent, CTA          |
| `ember`    | `#ff6a1a` | Warm culinary accent         |
| `honey`    | `#ffab2e` | Warm culinary accent         |
| `saffron`  | `#ffd166` | Warm highlight               |

Typography: `font-display` (Archivo Black), `font-body` (Inter), `font-serif`
(Playfair Display italic accents) and `font-mono` (Space Mono micro-labels).

Utility classes include `bg-blueprint`, `text-outline`, `text-outline-faint`,
`img-warm`, `warm-veil`, `glow-ember`, `link-sweep`, `writing-vertical`, `grain`
and the marquee animations.

## Languages

The interface ships in **English (default), French, Arabic and Spanish**. The
switcher sits beside *Book a Demo* in the navbar (a compact globe dropdown) and
as a four-button row in the mobile menu.

| File | Role |
| ---- | ---- |
| `src/i18n/en.ts`               | English dictionary — **the source of truth for the shape** |
| `src/i18n/fr.ts`, `ar.ts`, `es.ts` | The other three, each annotated `: Dict` |
| `src/i18n/features-*.ts`       | Per-locale copy for the eight capability/game entries |
| `src/i18n/core.ts`             | Language registry, detection, dot-path lookup, hooks |
| `src/i18n/provider.tsx`        | `I18nProvider` — the only component in the layer |
| `src/i18n/content.ts`          | `useLocalizedFeatures` / `useLocalizedFeature` for `lib/features.ts` |
| `src/components/LanguageSwitcher.tsx` | Dropdown (navbar) and inline (mobile menu) variants |

How it works:

- **No dependency.** ~250 lines of context in `src/i18n/`, nothing added to
  `package.json`.
- **`en.ts` is the schema.** `export type Dict = typeof en` widens every value to
  `string`; the other locales are annotated `const fr: Dict`, so a missing or
  misspelled key is a compile error rather than a string that quietly vanishes.
- **Two accessors.** `t('nav.features')` for one string, `tl('faq.items')`-style
  array reads via `dict` for lists and objects. Both fall back to English, then to
  the key path, so a gap is visible instead of blank.
- **No flash.** An inline script in `index.html` writes `lang`/`dir` onto `<html>`
  from `localStorage['desa-menu:lang']` before the first paint; the provider then
  keeps them in step. Switching languages loads the next dictionary first and
  swaps words and direction in one commit.
- **Code-split, not bloated.** English rides in the main chunk; FR/AR/ES are
  separate ~27–34 kB chunks (≈10 kB gzip each) fetched on first use and warmed
  during idle time. Switching to a language never re-downloads the app.
- **RTL.** `dir="rtl"` on `<html>` plus logical utilities (`ms-`, `start-`, `end-`)
  and mirrored chevrons in `src/index.css`; Arabic uses Noto Kufi Arabic and IBM
  Plex Sans Arabic with letter-spacing and text-transform neutralised.
- **Copy ownership.** UI chrome, FAQ and feature/game marketing copy are written
  per locale. Long-form feature essays and all API-driven content (venue demo
  bodies, field notes, operator quotes) stay English and fall back by design —
  that is editorial copy tied to real shoots, not interface text.

To add a locale: extend `LANGS`/`LANG_META` in `src/i18n/core.ts`, add the
dictionary file annotated with `Dict`, add its loader to `LOADERS`, then add the
code to the `index.html` bootstrap list.

## Brand assets

The official DESA Menu logo is a transparent PNG served from the DESA CDN and
declared once in `src/lib/brand.ts`:

```ts
export const BRAND_LOGO_URL = 'https://pub-…r2.dev/image.png_…-removebg-preview.png';
```

Every in-app surface reads it from there through `<BrandLogo />`
(`src/components/BrandLogo.tsx`), which sizes the mark by height (`h-9 w-auto`)
so any lockup keeps its own aspect ratio:

| Surface                        | Where                                            |
| ------------------------------ | ------------------------------------------------ |
| Navbar + mobile menu           | `components/Navbar.tsx`                          |
| Footer mark + agency credit    | `components/Footer.tsx`                          |
| In-app menu header preview     | `components/desa/DesaHero.tsx`                   |
| QR stands (demos + detail)     | `components/desa/DesaQr.tsx`                     |
| Favicon, `og:image`, Twitter   | `index.html` (static — keep in sync by hand)      |

`<BrandLogo />` falls back to the inline SVG monogram (`components/Logo.tsx`)
if the hosted file cannot be reached, so a blocked or offline request never
leaves the interface without a mark.

Because the asset is transparent, the mark carries no backing of its own: every
surface it sits on is dark. The one exception is the mock QR code in `DesaQr`,
whose code area has to stay light — the mark there sits on a dark chip inside
the code's cleared zone. That chip is the single place to flip if the artwork
ever changes from a light mark to a dark one.

Favicon and `og:image` use the same URL, so a light mark on a light browser
theme (or a social platform that composites transparency onto white) is the one
place transparency works against us; `public/favicon.svg` stays wired as the
`alternate icon` for that case, and a solid-background 1200×630 card is the
proper long-term `og:image`.

## Deployment

Deploys to Vercel as a static SPA (`dist/`) plus the `api/` functions. Set the
Supabase variables above to persist demo requests; without them the bundled
content is used.

## Before launch

- Set the operating locations in `Contact` (`contactPage.sidebar.locations`) —
  Casablanca and Dubai are placeholders. The official contact details (email,
  phone / WhatsApp, Instagram) are no longer scattered: they live in one place,
  `CONTACT` in `src/lib/brand.ts`, and every surface imports from there.
- Swap the AI-generated venue photography in `public/images/` for real venue
  shoots — the demos read far stronger with actual rooms and plates.
- If you deploy the marketing site and the `api/` functions to different
  origins, set `CORS` or a proxy for `/api/*`.
- The initial JS is ~503 kB (~158 kB gzip) across four long-lived chunks —
  `index` (318 kB), `motion` (126 kB), `react` (49 kB) and `icons` (10 kB) — so no
  single chunk trips Vite's 500 kB warning and a copy change never invalidates
  React. Per-route chunks are 0.7–13 kB and the locale dictionaries (FR/AR/ES)
  load on demand at ~10 kB gzip each.
