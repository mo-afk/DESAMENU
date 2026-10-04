# DESA Menu — Product Site

Marketing site for **DESA Menu**, a premium digital menu ecosystem for
restaurants, cafes, lounges and hotels. Four capabilities carry the product:

- **Interactive text menus** — fast, phone-first, editable in seconds
- **Cinematic video dishes** — short in-service films attached to signature plates
- **Table-side games** — branded experiences like *Who Pays?*
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
| `/features`       | Features     | The four pillars, in depth                                   |
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
| `projects`     | 8 venue demos — La Terrasse, Noir Lounge, Café Atelier, Maison Verre, Velvet Hour, Forma Hotel, Pulse Beach Club, Brasserie Soleil |
| `testimonials` | 5 operator quotes tied to venues                                                              |
| `posts`        | 6 field notes on video menus, phone-first design, loyalty, table games, deployment and analytics |
| `inquiries`    | Empty — populated at runtime when a form is submitted                                          |

Demos span **Fine Dining**, **Lounges** and **Cafes**, and each carries a
tagline, long-form description, capability list, metrics and a timeline.

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
| `DesaFeatures`    | Video menus, text menus, table games, loyalty cards   |
| `DesaDemos`       | Live demo showcase (featured venues from the API)     |
| `DesaComparison`  | Traditional QR/PDF menus vs DESA Menu                 |
| `DesaProcess`     | Three-step onboarding                                 |
| `DesaUseCases`    | Restaurants, cafes, lounges, hotels                   |
| `DesaCta`         | Closing call to action                                |
| `DesaContact`     | Contact details + `DesaContactForm`                   |
| `DesaUI`          | Shared button and tag primitives                      |

`PageHeader` is the shared header for inner pages (`/features`,
`/how-it-works`, `/demos`, `/notes`).

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

## Deployment

Deploys to Vercel as a static SPA (`dist/`) plus the `api/` functions. Set the
Supabase variables above to persist demo requests; without them the bundled
content is used.

## Before launch

- Replace the placeholder contact details: `hello@desamenu.com`, the WhatsApp
  link and the phone number (search for `wa.me` and `+212`), and the location
  strings in `Contact`, `Footer` and `DesaContact`.
- Swap the AI-generated venue photography in `public/images/` for real venue
  shoots — the demos read far stronger with actual rooms and plates.
- If you deploy the marketing site and the `api/` functions to different
  origins, set `CORS` or a proxy for `/api/*`.
- The bundle is a single ~487 kB chunk (146 kB gzip); route-level code
  splitting would be the next win.
