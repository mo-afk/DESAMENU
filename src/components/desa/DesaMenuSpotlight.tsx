import { Link } from 'react-router-dom';
import { ArrowUpRight, BadgeCheck, Dices, ListOrdered, Play, Video } from 'lucide-react';
import Reveal from '../Reveal';
import { GamePanel, LoyaltyPanel, MenuPanel, VideoPanel } from './DesaFeatures';

const CAPABILITIES = [
  {
    n: '01',
    icon: Video,
    title: 'Video Menus',
    desc: 'Every dish filmed on the pass and cut to six-second loops that load instantly in a full dining room.',
    panel: <VideoPanel />,
  },
  {
    n: '02',
    icon: Dices,
    title: 'Interactive Table Games',
    desc: '“Who Pays?” and other branded table-side games that give a table a reason to stay and order the next round.',
    panel: <GamePanel />,
  },
  {
    n: '03',
    icon: BadgeCheck,
    title: 'Integrated Loyalty',
    desc: 'A loyalty card inside the menu, not in a guest’s wallet — visits tracked, rewards shown at the moment they matter.',
    panel: <LoyaltyPanel />,
  },
  {
    n: '04',
    icon: ListOrdered,
    title: 'Text & Standard Menus',
    desc: 'Fast, clean, beautifully structured menus for venues where speed matters more than spectacle.',
    panel: <MenuPanel />,
  },
];

const DEMOS = [
  { name: 'La Terrasse', type: 'Fine Dining', image: '/images/demo-terrace.jpg' },
  { name: 'Noir Lounge', type: 'Lounge', image: '/images/demo-noir.jpg' },
  { name: 'Café Atelier', type: 'Specialty Coffee', image: '/images/demo-atelier.jpg' },
];

/**
 * Homepage spotlight for DESA Menu — the flagship product.
 * Reuses the same capability visuals as the dedicated product page.
 */
export default function DesaMenuSpotlight() {
  return (
    <section id="desa-menu" className="border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-6 border-t border-bone/15 pt-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
              <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">02</span>&nbsp;&nbsp;Flagship product
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
              DESA <span className="text-outline">Menu</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/desa-menu"
              className="group inline-flex shrink-0 items-center gap-2 border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-bone hover:text-ink"
            >
              Explore the product
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-bone/70 sm:text-lg">
            DESA Menu replaces static QR menus with interactive text menus, cinematic dish videos, table-side games and built-in loyalty systems.
            It is the product we build for restaurants, cafes, lounges and hotels that care how they are experienced — designed to raise guest
            satisfaction and average order value at the same time.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08} className="h-full">
              <article className="group flex h-full flex-col bg-coal p-8 transition-colors hover:bg-carbon">
                <div className="flex items-center justify-between">
                  <c.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-smoke">{c.n}</span>
                </div>
                <h3 className="mt-8 font-display text-xl uppercase leading-tight tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{c.desc}</p>
                <div className="mt-6 h-[150px] border border-bone/15 bg-ink p-5 transition-colors group-hover:border-lime/30">
                  {c.panel}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Live demos */}
        <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Live demos</p>
            <h3 className="mt-3 font-display text-2xl uppercase tracking-tight sm:text-3xl">See it running in a real venue.</h3>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-lime"
            >
              All demos and case studies
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {DEMOS.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08}>
              <Link to="/work" className="group block border border-bone/15 bg-ink">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.name} — DESA Menu demo`}
                    loading="lazy"
                    className="img-mono h-full w-full object-cover group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-bone/20 bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85">Live demo</span>
                  </span>
                  <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-bone/25 bg-ink/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <Play className="h-4 w-4 translate-x-px text-lime" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="font-display text-lg uppercase tracking-tight transition-colors group-hover:text-lime">{d.name}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{d.type}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col gap-6 border-t border-bone/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-fog">
              Want to see DESA Menu with your dishes, your branding and your menu structure? We will build a private walkthrough of your own venue.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/desa-menu"
                className="group inline-flex items-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                Explore DESA Menu
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                Book a Demo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
