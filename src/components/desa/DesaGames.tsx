import { Brain, Dices, Disc3, Gift, Puzzle, Sparkles } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { DesaButtonLink, DesaTag } from './DesaUI';

/* ------------------------------------------------------------------ */
/* Bespoke mock panels — pure markup, no external assets.              */
/* Exported so other sections can reuse the exact same visuals.        */
/* ------------------------------------------------------------------ */

/** Who Pays? — bill roulette landing on a seat. */
export function RoulettePanel() {
  const seats = ['You', 'Maya', 'Sam', 'Luca'];
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-honey">Who Pays?</span>
        <span className="text-smoke">Bill roulette</span>
      </div>
      <div className="flex items-center gap-2">
        {seats.map((s, i) => (
          <span
            key={s}
            className={`flex-1 border px-2 py-2 text-center font-mono text-[10px] transition-all duration-500 ${
              i === 2 ? 'border-ember/60 bg-ember/[0.16] text-bone' : 'border-bone/15 text-fog'
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-2/3 bg-gradient-to-r from-ember to-honey transition-all duration-700 group-hover:w-full" />
      </div>
      <div className="flex items-center gap-2 border border-bone/15 px-3 py-2">
        <Dices className="h-3 w-3 shrink-0 text-honey" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/85">
          Landing on <span className="text-honey">Sam</span> — Sam covers the round
        </span>
      </div>
    </div>
  );
}

/** Ideal Combo Spinner — wheel plus the pairing it lands on. */
export function SpinnerPanel() {
  return (
    <div className="flex h-full items-center gap-5">
      <div className="relative h-24 w-24 shrink-0 transition-transform duration-700 group-hover:rotate-[150deg]">
        <div
          aria-hidden
          className="h-full w-full rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, var(--color-ember) 0deg 45deg, var(--color-carbon) 45deg 90deg, var(--color-honey) 90deg 135deg, var(--color-carbon) 135deg 180deg, var(--color-ember) 180deg 225deg, var(--color-carbon) 225deg 270deg, var(--color-honey) 270deg 315deg, var(--color-carbon) 315deg 360deg)',
          }}
        />
        <div aria-hidden className="absolute inset-[26%] rounded-full bg-carbon" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] text-bone">
          Spin
        </span>
        <span aria-hidden className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-lime" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-honey">Ideal combo</p>
        <p className="mt-2 font-display text-sm uppercase leading-tight text-bone">
          Truffle risotto <span className="text-smoke">+</span> Amber sour
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
          Combo 7 of 24 — 2 items, both high margin
        </p>
      </div>
    </div>
  );
}

/** Taste & Personality Quiz — questions landing on a curated selection. */
export function QuizPanel() {
  const answers = ['Bright & citrusy', 'Rich & smoky', 'Something sweet'];
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-honey">Taste &amp; personality</span>
        <span className="text-smoke">3 / 4</span>
      </div>
      <p className="text-sm leading-snug text-bone/85">How do you like to start the evening?</p>
      <div className="flex flex-wrap gap-1.5">
        {answers.map((a, i) => (
          <span
            key={a}
            className={`border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
              i === 1 ? 'border-ember/60 bg-ember/[0.16] text-bone' : 'border-bone/15 text-fog'
            }`}
          >
            {a}
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-3/4 bg-gradient-to-r from-ember to-honey" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-lime">
        Curated for Sam — 3 plates, 1 cocktail
      </p>
    </div>
  );
}

/** Custom games & loyalty micro-interactions — the configurable layer. */
export function MicroPanel() {
  const chips = [
    'Loyalty streaks',
    'Spin-to-unlock rewards',
    'Points on reorder',
    'Birthday bonuses',
    'Table leaderboards',
    'Badge hunts',
    'Refer-a-friend codes',
    'Seasonal campaigns',
  ];
  return (
    <div className="flex h-full flex-wrap items-start gap-2">
      {chips.map((c) => (
        <DesaTag key={c}>{c}</DesaTag>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Game = {
  id: string;
  n: string;
  icon: typeof Dices;
  title: string;
  kind: string;
  desc: string;
  bullets: string[];
  panel: React.ReactNode;
};

const GAMES: Game[] = [
  {
    id: 'who-pays',
    n: 'G1',
    icon: Dices,
    title: 'Who Pays?',
    kind: 'Bill roulette',
    desc: 'The classic table-side game that decides who settles the check. Fifteen seconds, branded to your venue, and the most photographed moment in the room.',
    bullets: ['Decides the bill without friction', 'Best played between rounds', 'Turns tables into repeat orders'],
    panel: <RoulettePanel />,
  },
  {
    id: 'combo-spinner',
    n: 'G2',
    icon: Disc3,
    title: 'Ideal Combo Spinner',
    kind: 'Spin to discover',
    desc: 'A spin-the-wheel tool that builds fun, personalised meal and drink combinations — and quietly recommends the pairings your kitchen most wants to sell.',
    bullets: ['Meal and drink pairings in one tap', 'Weighted toward high-margin items', 'Campaign and seasonal variants'],
    panel: <SpinnerPanel />,
  },
  {
    id: 'taste-quiz',
    n: 'G3',
    icon: Brain,
    title: 'Taste & Personality Quiz',
    kind: 'AI-curated selection',
    desc: 'A short interactive quiz asks guests how they like to eat and drink, then instantly curates a personal selection of dishes and cocktails in the menu itself.',
    bullets: ['Three or four preference questions', 'Curated plates and cocktails on the spot', 'Personalised guests explore further'],
    panel: <QuizPanel />,
  },
];

const STATS = [
  { value: '1 in 3', label: 'Tables play a table game' },
  { value: '23 min', label: 'Longer average dwell time' },
  { value: '+41%', label: 'Second-round reorders' },
];

export default function DesaGames() {
  return (
    <section id="desa-games" className="relative scroll-mt-20 overflow-hidden border-y border-bone/10 bg-coal">
      <div aria-hidden className="warm-veil pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading
          index="03"
          eyebrow="Gamified dining"
          title="The gamified"
          accent="dining ecosystem."
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
            Three interactive experiences ship with every DESA Menu — plus custom table games and loyalty micro-interactions built around your brand.
            Guests play, tables stay longer, and the average order grows.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 lg:grid-cols-3">
          {GAMES.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.08} className="h-full">
              <article className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-carbon/40 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <g.icon className="h-8 w-8 text-honey" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-smoke">{g.n}</span>
                </div>

                <h3 className="mt-8 font-display text-2xl uppercase leading-tight tracking-tight">{g.title}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-honey">{g.kind}</p>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-fog">{g.desc}</p>

                <div className="mt-8 h-[176px] border border-bone/15 bg-carbon/60 p-5 transition-colors group-hover:border-honey/30">
                  {g.panel}
                </div>

                <ul className="mt-8 space-y-3 border-t border-bone/10 pt-6">
                  {g.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-bone/75">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-honey" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal className="h-full lg:col-span-3">
            <article className="flex h-full flex-col gap-8 bg-ink p-8 transition-colors hover:bg-carbon/40 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <Puzzle className="h-8 w-8 text-honey" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-smoke">G4</span>
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-tight">
                  Custom table games <span className="text-smoke">&amp;</span> loyalty micro-interactions
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-fog">
                  Beyond the core three, we build gamified touches shaped around your brand — loyalty streaks, spin-to-unlock rewards, points on
                  reorder, milestone bonuses and table leaderboards. Every one is designed to lift table engagement and average order value, and every
                  one is measured in the analytics you already get.
                </p>
                <ul className="mt-6 flex flex-wrap items-center gap-2">
                  <li>
                    <DesaTag accent>Fully customisable</DesaTag>
                  </li>
                  <li>
                    <DesaTag accent>On-brand</DesaTag>
                  </li>
                  <li>
                    <DesaTag accent>Measured</DesaTag>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:max-w-md">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-honey">
                  <Gift className="h-3.5 w-3.5" />
                  Micro-interaction library
                </div>
                <div className="mt-4 border border-bone/15 bg-carbon/60 p-5">
                  <MicroPanel />
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-8 border-t border-bone/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <dl className="grid grid-cols-3 gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl uppercase tracking-tight text-honey sm:text-4xl">{s.value}</span>
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-4">
              <DesaButtonLink to="/demos" variant="outline">
                See the games live
              </DesaButtonLink>
              <DesaButtonLink to="/contact" variant="lime">
                Book a Demo
              </DesaButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            Engagement figures measured across lounge and bar deployments, thirty days post-launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
