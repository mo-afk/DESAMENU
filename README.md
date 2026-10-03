# DESA — Hospitality Technology Studio

Marketing site for **DESA**, a hospitality technology studio, and **DESA Menu** —
our flagship product: a premium digital menu ecosystem for restaurants, cafes,
lounges and hotels.

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

| Route            | Page      | Notes                                                          |
| ---------------- | --------- | -------------------------------------------------------------- |
| `/`              | Home      | DESA agency story + the DESA Menu flagship spotlight            |
| `/desa-menu`     | DESA Menu | Full product page: capabilities, live demos, comparison, demos  |
| `/work`          | Portfolio | Venues running DESA Menu (filter + grid/list views)             |
| `/work/:slug`    | CaseStudy | Venue detail: story, deployment, results                        |
| `/services`      | Services  | Menu design, deployment, interactive experiences, loyalty       |
| `/studio`        | Studio    | The studio, team, integrations and journey                      |
| `/journal`       | Journal   | Field notes from hospitality deployments                        |
| `/journal/:slug` | Article   | Article detail                                                  |
| `/contact`       | Contact   | Four-step demo request, wired to `POST /api/inquiries`          |

## Brand architecture

- **DESA** — the parent studio. Hospitality technology: menu strategy, design,
  film, engineering and retention, delivered as one team.
- **DESA Menu** — the flagship product. Interactive text menus, cinematic dish
  video, table-side games (Who Pays?) and built-in loyalty cards, with analytics
  across scans, engagement and return visits.

## Content

All site content lives in `api/seed-data.js` and is served through the API
handlers, so the same data drives the marketing pages and (when Supabase is
configured) production:

| Collection     | Contents                                                          |
| -------------- | ----------------------------------------------------------------- |
| `projects`     | 7 venue deployments — La Terrasse, Noir Lounge, Café Atelier, Maison Verre, Velvet Hour, Forma Hotel, Pulse Beach Club |
| `testimonials` | 5 operator quotes tied to venues                                  |
| `team`         | 6 DESA disciplines                                                 |
| `posts`        | 6 journal articles on video menus, phone-first design, loyalty, table games, deployment and analytics |

Imagery lives in `public/images/` (`img-mono` renders it grayscale and restores
colour on hover). Replace the venue photography with your own before launch.

## The DESA Menu page

`src/pages/DesaMenu.tsx` composes nine reusable sections from
`src/components/desa/`:

| Component         | Section                                                    |
| ----------------- | ---------------------------------------------------------- |
| `DesaHero`        | Headline, CTAs, device mockup, venue marquee                |
| `DesaValueGrid`   | Four business outcomes                                      |
| `DesaFeatures`    | Video menus, text menus, table games, loyalty cards         |
| `DesaDemos`       | Live demo showcase                                          |
| `DesaComparison`  | Traditional QR/PDF menus vs DESA Menu                       |
| `DesaProcess`     | Three-step onboarding                                       |
| `DesaUseCases`    | Restaurants, cafes, lounges, hotels                         |
| `DesaCta`         | Closing call to action                                      |
| `DesaContact`     | Contact details + `DesaContactForm`                         |
| `DesaMenuSpotlight` | Homepage spotlight (reuses the feature mock panels)       |
| `DesaUI`          | Shared button and tag primitives                            |

The product page form and the four-step `/contact` form both post through
`submitInquiry()` in `src/lib/api.ts` to `POST /api/inquiries`:

| Product form field             | Inquiry field                      |
| ------------------------------ | ---------------------------------- |
| Name                           | `name`                             |
| Business Name                  | `company`                          |
| Venue Type                     | `project_type` → `DESA Menu - …`   |
| Email                          | `email`                            |
| Phone (optional)               | appended to `message`              |
| What would you like to show…   | `message`                          |

## API

`api/*.js` are Vercel-style serverless handlers (`(req, res) => …`):

| Endpoint            | Methods                | Purpose                                    |
| ------------------- | ---------------------- | ------------------------------------------ |
| `/api/projects`     | GET                    | Venue deployments (`?slug=`, `?category=`, `?featured=`) |
| `/api/posts`        | GET                    | Journal articles (`?slug=`)                |
| `/api/testimonials` | GET                    | Operator quotes                            |
| `/api/team`         | GET                    | Studio disciplines                         |
| `/api/inquiries`    | GET, POST, PUT, DELETE | Demo requests and leads                    |

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

| Token       | Value     | Usage                     |
| ----------- | --------- | ------------------------- |
| `ink`       | `#0a0a0b` | Page background           |
| `coal`      | `#131315` | Alternating sections      |
| `carbon`    | `#1c1c1f` | Cards, image placeholders |
| `bone`      | `#f2efe9` | Primary text              |
| `parchment` | `#e8e3d9` | Warm accents              |
| `fog`       | `#a3a09a` | Secondary text            |
| `smoke`     | `#6e6c68` | Tertiary text             |
| `lime`      | `#d7ff3f` | Accent, active states     |

Typography: `font-display` (Archivo Black), `font-body` (Inter), `font-serif`
(Playfair Display italic accents) and `font-mono` (Space Mono micro-labels).
Utility classes include `bg-blueprint`, `text-outline`, `text-outline-faint`,
`img-mono`, `link-sweep`, `writing-vertical`, `grain` and the marquee
animations.

## Deployment

Deploys to Vercel as a static SPA (`dist/`) plus the `api/` functions. Set the
Supabase variables above to persist demo requests; without them the bundled
content is used.

## Before launch

- Replace the placeholder contact details: `hello@desamenu.com`, the WhatsApp
  link and the phone number (search for `wa.me` and `+212`), and the studio
  locations in `Contact`, `Footer` and `DesaContact`.
- Swap the AI-generated venue photography in `public/images/` for real venue
  shoots — the case studies read far stronger with actual rooms.
- If you deploy the marketing site and the `api/` functions to different
  origins, set `CORS` or a proxy for `/api/*`.
- The bundle is a single ~520 kB chunk (155 kB gzip); route-level code
  splitting would be the next win.
