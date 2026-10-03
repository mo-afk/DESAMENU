# DESA Menu — Landing Page

Marketing site for **DESA Menu**, the flagship hospitality product by DESA Agency:
a premium digital menu ecosystem for restaurants, cafes, lounges and hospitality
venues.

Built with **Next.js (App Router) + React + Tailwind CSS v4 + TypeScript**, with
no third-party UI or animation libraries — everything is hand-built with
semantic HTML, CSS transitions and a single lightweight `IntersectionObserver`
for scroll reveals.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals + typescript)
```

## Project structure

```
src/
├─ app/
│  ├─ globals.css        # design tokens, custom utilities, keyframes
│  ├─ layout.tsx         # metadata, self-hosted fonts, skip link, grain overlay
│  ├─ icon.svg           # favicon (file convention)
│  └─ page.tsx           # composes the landing page sections
├─ components/
│  ├─ sections/          # one component per page section
│  │  ├─ Header.tsx          sticky transparent → blurred on scroll
│  │  ├─ Hero.tsx            headline, CTAs, product visual
│  │  ├─ VenueStrip.tsx      venue-type marquee
│  │  ├─ ValueStrip.tsx      4 value cards
│  │  ├─ FeatureGrid.tsx     4 feature cards + mock UI panels
│  │  ├─ DemoShowcase.tsx    live-demo showcase (grid / snap rail)
│  │  ├─ WhyDesa.tsx         traditional vs DESA comparison
│  │  ├─ HowItWorks.tsx      3-step process
│  │  ├─ UseCases.tsx        audience cards
│  │  ├─ CtaBanner.tsx       closing CTA panel
│  │  ├─ Contact.tsx         contact section shell
│  │  ├─ ContactForm.tsx     client-side form + success state
│  │  └─ Footer.tsx
│  └─ ui/                # reusable primitives
│     ├─ Container.tsx   SectionHeading.tsx   Reveal.tsx
│     ├─ Button.tsx      Pill.tsx             Icons.tsx
│     ├─ Backdrop.tsx    Logo.tsx             PhoneMockup.tsx
├─ fonts/                # self-hosted Inter + JetBrains Mono (SIL OFL 1.1)
└─ lib/site.ts           # brand, nav and contact configuration
public/images/           # cinematic venue + dish imagery
```

## Design system

Tokens live in `@theme` inside `src/app/globals.css`, so they are available as
Tailwind utilities (`bg-ink`, `text-muted`, `bg-brand`, `ease-premium`, …).

| Token          | Value     | Usage                          |
| -------------- | --------- | ------------------------------ |
| `--color-ink`  | `#111111` | page background (matte charcoal) |
| `--color-fg`   | `#F4F4F5` | primary text                   |
| `--color-muted`| `#A1A1AA` | secondary text                 |
| `--color-brand`| `#CCFF00` | accent, active and hover states |

Custom utilities: `grid-lines`, `grid-lines-sm`, `text-eyebrow`,
`hairline-fade`, plus the `grain-layer` and `no-scrollbar` helpers.

Motion: one reveal system (`[data-reveal]` + `Reveal.tsx`), hover glows,
elevation on cards, an animated sheen on primary buttons, and `prefers-reduced-motion`
is fully respected.

## Customising

- **Brand facts, nav links, venue types** → `src/lib/site.ts`.
  The WhatsApp and Instagram values are placeholders — replace them before launch.
- **Contact form delivery** → `ContactForm.tsx` currently simulates a request and
  shows a success state. Point it at your CRM/email endpoint at the marked
  `fetch("/api/leads", …)` hook.
- **Fonts** → swap the `woff2` files in `src/fonts/` (see `src/fonts/README.md`).
- **Imagery** → replace files in `public/images/`; they are served through
  `next/image`.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`), one `h1`,
  labelled sections, skip-to-content link, visible focus rings.
- Decorative layers are `aria-hidden`; the hero device mockup is exposed as a
  single labelled image.
- Self-hosted variable fonts (no runtime requests to Google Fonts), statically
  prerendered page, and no client-side JS beyond the header and contact form.
