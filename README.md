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
npm test           # API and environment tests
```

The site renders without any environment variables: when Supabase isn't
configured the API handlers serve the content in `api/seed-data.js` and
inquiries are held in memory. In Vite dev, lead forms also work without
`RESEND_API_KEY`: `POST /api/contact` logs the validated submission to the
server console and returns `{ ok: true, id: null, mocked: true }` (no email is
sent). Production requires the key and returns `503` without it. Copy
`.env.example` to `.env.local` for real email delivery in local dev; replace
its example key. `.env` and `.env.local` are gitignored.

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
| `/contact`        | Contact      | Single contact form, wired to `POST /api/contact`            |

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

Every lead form on the site — the `DesaContact` demo request, the single form on
`/contact` and the footer newsletter — posts through `submitLead()` in
`src/lib/api.ts` to `POST /api/contact`, which emails the lead to the DESA
inbox with Resend. Nothing leaves the page: the submit button shows a spinner,
and an inline alert reports either the confirmation or the failure. No form
hands the visitor off to WhatsApp or reloads.

The `/contact` page is deliberately short — full name and phone number are the
only required fields, and email, establishment and message are optional. It
replaced a four-step qualification wizard that asked for budget and kickoff
before it would take a phone number.

| Form field                    | Lead field                                          |
| ----------------------------- | --------------------------------------------------- |
| Full name                     | `name`                                              |
| Phone number                  | `phone`                                             |
| Email (optional)              | `email`, also used as `replyTo` when present         |
| Establishment (optional)      | `venue` (`DesaContactForm` joins business and venue type) |
| Message (optional)            | `message`, no minimum length                        |
| —                             | `source`, so the email says which form it came from |

## API

`api/*.js` are Vercel-style serverless handlers (`(req, res) => …`):

| Endpoint            | Methods                | Purpose                                                   |
| ------------------- | ---------------------- | --------------------------------------------------------- |
| `/api/projects`     | GET                    | Venue demos (`?slug=`, `?category=`, `?featured=`)         |
| `/api/posts`        | GET                    | Field notes (`?slug=`)                                     |
| `/api/testimonials` | GET                    | Operator quotes                                           |
| `/api/inquiries`    | GET, POST, PUT, DELETE | Demo requests and leads                                    |
| `/api/contact`      | POST                   | Emails a lead to the DESA inbox (Resend)                   |

Each handler tries Supabase first (4s timeout) and falls back to seed data, so
the site is never blank.

### Resend (lead emails)

```bash
RESEND_API_KEY=re_…
LEADS_INBOX=desacontact.01@gmail.com      # optional, this is the default
LEADS_FROM=DESA Menu Leads <onboarding@resend.dev>
```

`api/contact.js` builds a styled dark-theme notification (plus a plain-text
part) and sends it with `resend.emails.send()`, subject
`New Lead: [Customer Name] - DESA Menu`, `replyTo` set to the lead's address so
a reply goes straight back to them. Every value a visitor typed is HTML-escaped
before it reaches the template. Provider errors are logged server-side and
answered with one friendly message — the form never shows an API key problem or
a stack detail to a visitor.

`LEADS_FROM` must be an address on a domain verified in Resend;
`onboarding@resend.dev` only works while the account has no verified domain, and
Resend limits it to sending to the account's own address.

Locally the variable reaches the handler through `vite.config.ts`, which loads
`.env`, `.env.local` and mode-specific files into `process.env` before the
SSR-loaded handlers run. Vite reloads the file values when an env file changes;
restart `npm run dev` if you change a host-provided variable. A host-provided
value takes precedence over the files. The key stays out of
the client bundle: only `VITE_*` and `NEXT_PUBLIC_*` are inlined by `define`.
With no key (or the `re_your_key_here` example value), **Vite dev only** logs
validated submissions to its terminal and returns success marked `mocked: true`;
nothing is delivered. Validation errors still return `400`. A configured key
uses Resend normally; a failed send still returns `502` and is never mocked.
On Vercel, set `RESEND_API_KEY` in the project settings; missing configuration
continues to return `503` in production. Do not put secrets in `VITE_*` vars.

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
  per locale — including the long-form essays on `/features/:slug`, which live in
  `i18n/features-{fr,ar,es}.ts` and cover all eight entries in every language.
  `useLocalizedFeatures()` still falls back field by field to the English entry,
  so adding a ninth capability renders English rather than an empty page while
  its translations are written. API-driven content (venue demo bodies, field
  notes, operator quotes) is English-only by design: that is editorial copy tied
  to real shoots, authored per venue in the database, not interface text.

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
| Favicon, `og:image`, Twitter   | `index.html` (static — keep in sync by hand) and `npm run icons` |

`<BrandLogo />` falls back to the inline SVG monogram (`components/Logo.tsx`)
if the hosted file cannot be reached, so a blocked or offline request never
leaves the interface without a mark.

Because the asset is transparent, the mark carries no backing of its own: every
surface it sits on is dark. The one exception is the mock QR code in `DesaQr`,
whose code area has to stay light — the mark there sits on a dark chip inside
the code's cleared zone. That chip is the single place to flip if the artwork
ever changes from a light mark to a dark one.

### Venue covers

The three demo venues carry their own cover photography from the same bucket,
declared once through `venueCover()` at the top of `api/seed-data.js`:

| Venue          | File on the bucket     |
| -------------- | ---------------------- |
| JUVIA          | `juvia.png`            |
| LE MANOIR      | `le%20manoire.png`     |
| PAUSE À PARIS  | `pause%20a%20paris.png` |

Every surface that renders a venue reads `project.image_url`, so the homepage
showcase (`DesaDemos`), the `/demos` cards (`ProjectCard`) and the detail hero
(`DemoDetail`) all follow the same file. Each frame is a fixed ratio with
`object-cover` and `overflow-hidden` — 16/9 on the showcase, 4/3 or 16/10 on the
demo cards, 16/8 on the hero — so a cover of any proportion is cropped to the
frame instead of stretched.

Two things sit on top of every cover and will affect how artwork reads: the
`.img-warm` filter (`saturate(1.14) contrast(1.07) brightness(1.05)`, rising on
hover) and, on the showcase cards, a bottom `from-ink` scrim plus the orange
`.warm-veil`. They were tuned for photography; if a cover is really a graphic on
a light background, that is the first place to look.

### Site icons

The favicon, the shortcut icon, the Apple touch icon and `og:image` /
`twitter:image` all point at that same CDN file from the head of `index.html`:

```html
<link rel="icon" type="image/png" href="https://pub-…r2.dev/image.png_…-removebg-preview.png" />
<link rel="shortcut icon" type="image/png" href="…" />
<link rel="apple-touch-icon" href="…" />
```

`rel="icon"` and the legacy `rel="shortcut icon"` cover Chrome, Edge, Firefox
and Safari plus the in-app browsers that only understand the old spelling, and
both resolve to one file so the "last icon link wins" rule can never surface a
different mark. Nothing local is registered as an icon: the old
`public/favicon.svg` monogram was declared `alternate icon`, and browsers that
prefer SVG (Firefox, Chrome) picked it *over* the PNG — which is why the tab
kept showing the placeholder instead of the logo.

`/favicon.ico`, the path browsers probe without reading the head, used to 404.
It now 302s to the logo: `vite-plugin-favicon.ts` does it in dev and preview,
`vercel.json` does it on Vercel. Keep the two in sync.

Vendoring the set locally — recommended before launch, so the tab icon does not
depend on a third-party host and browsers get the exact sizes they ask for:

```bash
npm run icons          # downloads the logo and writes the whole set to public/
npm run icons -- --apply            # …and repoints the head at the local files
npm run icons -- --source logo.png  # build from a local copy of the artwork
```

It needs ImageMagick on PATH and writes `favicon.ico` (16/24/32/48),
`favicon.png` (512), `favicon-192.png`, `apple-touch-icon.png` (180, flattened
onto `#0a0a0b`), `maskable-icon.png` (512, inside the Android safe zone),
`og-image.png` (1200×630 solid card — a transparent PNG as `og:image`
composites onto white on most platforms, which swallows a light mark) and a
`site.webmanifest` whose sizes are measured from the files it just wrote.
`--apply` also adds the `<link rel="manifest">`. Once a real `public/favicon.ico`
exists the dev middleware steps aside and Vite serves it — but delete the
`/favicon.ico` entry from `vercel.json`, because Vercel matches redirects before
the filesystem and would keep sending the CDN copy.

The remaining transparency caveat: a light mark on a light browser theme has
little contrast. The vendored `.ico` and PNGs inherit it, so if it ever matters,
regenerate them with the mark flattened onto `#0a0a0b` — `paddedIcon()` in
`scripts/build-favicons.mjs` already does exactly that for the touch and
maskable icons.

## Deployment

Deploys to Vercel as a static SPA (`dist/`) plus the `api/` functions. Set the
Supabase variables above to persist demo requests; without them the bundled
content is used.

## Before launch

- Run `npm run icons -- --apply` on a machine that can reach the DESA CDN, so
  the tab and home-screen icons are served from `public/` instead of the CDN —
  see [Site icons](#site-icons).
- Set the operating locations in `Contact` (`contactPage.sidebar.locations`) —
  Casablanca and Dubai are placeholders. The official contact details (email,
  phone / WhatsApp, Instagram) are no longer scattered: they live in one place,
  `CONTACT` in `src/lib/brand.ts`, and every surface imports from there.
- The three venue covers (JUVIA, LE MANOIR, PAUSE À PARIS) now load from the
  DESA CDN — see `venueCover()` at the top of `api/seed-data.js`. The remaining
  AI-generated photography in `public/images/` (field notes, hero, process) is
  still placeholder and wants real shoots. `public/images/work-verre.jpg` is no
  longer referenced by anything and can be deleted.
- If you deploy the marketing site and the `api/` functions to different
  origins, set `CORS` or a proxy for `/api/*`.
- The initial JS is ~503 kB (~158 kB gzip) across four long-lived chunks —
  `index` (318 kB), `motion` (126 kB), `react` (49 kB) and `icons` (10 kB) — so no
  single chunk trips Vite's 500 kB warning and a copy change never invalidates
  React. Per-route chunks are 0.7–13 kB and the locale dictionaries (FR/AR/ES)
  load on demand at ~10 kB gzip each.
