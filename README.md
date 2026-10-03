# DG® — Design & Growth Agency

Marketing site for **DG®**, an independent design and growth agency, plus the
product page for **DESA Menu** — the flagship hospitality product by DESA Agency.

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
configured the API handlers serve the demo content in `api/seed-data.js` and
inquiries are held in memory.

## Routes

| Route                | Page        | Notes                                                        |
| -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                  | Home        | Hero, selected work, services, process, testimonials, journal |
| `/desa-menu`         | **DESA Menu** | Product page for the hospitality menu platform              |
| `/work`              | Work        | Project index                                                |
| `/work/:slug`        | CaseStudy   | Project detail                                               |
| `/services`          | Services    | Service lines                                                |
| `/studio`            | Studio       | Team and studio story                                        |
| `/journal`           | Journal      | Article index                                                |
| `/journal/:slug`     | Article     | Article detail                                               |
| `/contact`           | Contact     | Multi-step project brief                                     |

## The DESA Menu page

`src/pages/DesaMenu.tsx` composes nine self-contained sections, each a reusable
component in `src/components/desa/`:

| Component            | Section                                                       |
| -------------------- | ------------------------------------------------------------- |
| `DesaHero`           | Headline, CTAs, device mockup, venue marquee                   |
| `DesaValueGrid`      | Four business outcomes                                         |
| `DesaFeatures`       | Video menus, text menus, table games, loyalty cards            |
| `DesaDemos`          | Live demo showcase (La Terrasse, Noir Lounge, Café Atelier)    |
| `DesaComparison`     | Traditional QR/PDF menus vs DESA Menu                          |
| `DesaProcess`        | Three-step onboarding                                          |
| `DesaUseCases`       | Restaurants, cafes, lounges, hotels                            |
| `DesaCta`            | Closing call to action                                         |
| `DesaContact`        | Contact details + `DesaContactForm`                            |
| `DesaUI`             | Shared buttons and tag primitives                              |

Copy is inline in each section component — edit the component to change the
page. Imagery lives in `public/images/`.

The contact form posts to `/api/inquiries` through `submitInquiry()` in
`src/lib/api.ts`, mapping the hospitality fields onto the shared inquiry model:

| Form field                       | Inquiry field                    |
| -------------------------------- | -------------------------------- |
| Name                             | `name`                           |
| Business Name                    | `company`                        |
| Venue Type                       | `project_type` → `DESA Menu - …` |
| Email                            | `email`                          |
| Phone (optional)                 | appended to `message`            |
| What would you like to show…     | `message`                        |

## API

`api/*.js` are Vercel-style serverless handlers (`(req, res) => …`):

| Endpoint            | Methods                | Purpose                        |
| ------------------- | ---------------------- | ------------------------------ |
| `/api/projects`     | GET                    | Case studies (`?slug=`, `?category=`, `?featured=`) |
| `/api/posts`        | GET                    | Journal articles (`?slug=`)    |
| `/api/testimonials` | GET                    | Client quotes                  |
| `/api/team`         | GET                    | Studio team                    |
| `/api/inquiries`    | GET, POST, PUT, DELETE | Project briefs and leads       |

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

| Token      | Value     | Usage                    |
| ---------- | --------- | ------------------------ |
| `ink`      | `#0a0a0b` | Page background          |
| `coal`     | `#131315` | Alternating sections     |
| `carbon`   | `#1c1c1f` | Cards, image placeholders |
| `bone`     | `#f2efe9` | Primary text             |
| `parchment`| `#e8e3d9` | Warm accents             |
| `fog`      | `#a3a09a` | Secondary text           |
| `smoke`    | `#6e6c68` | Tertiary text            |
| `lime`     | `#d7ff3f` | Accent, active states    |

Typography: `font-display` (Archivo Black), `font-body` (Inter), `font-serif`
(Playfair Display italic accents) and `font-mono` (Space Mono micro-labels).
Utility classes include `bg-blueprint`, `text-outline`, `text-outline-faint`,
`img-mono` (grayscale → colour on hover), `link-sweep`, `writing-vertical`,
`grain` and the marquee animations.

## Deployment

Deploys to Vercel as a static SPA (`dist/`) plus the `api/` functions. Set the
Supabase variables above to persist inquiries; without them the demo data is
used. Hero and venue imagery is served from `public/images/`.

## Before launch

- Replace the placeholder contact details in `src/components/desa/DesaContact.tsx`
  (WhatsApp link and phone number) and `src/components/Footer.tsx`
  (`hello@dg-agency.co`, social links).
- The agency site is branded **DG®** while DESA Menu is presented as a DESA
  Agency product — align the naming if both should share one brand.
