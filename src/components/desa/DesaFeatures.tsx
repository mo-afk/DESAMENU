import { BadgeCheck, Check, Dices, ListOrdered, Play, Video } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';

/* ------------------------------------------------------------------ */
/* Bespoke mock panels — pure markup, no external assets.              */
/* Exported so other sections (e.g. the homepage spotlight) can reuse   */
/* the exact same visuals.                                             */
/* ------------------------------------------------------------------ */

export function VideoPanel() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-end gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-1 border ${i === 1 ? 'h-16 border-lime/50 bg-lime/[0.08]' : 'h-10 border-bone/15'} transition-all duration-500 group-hover:h-16`}>
            {i === 1 && (
              <span className="flex h-full items-center justify-center">
                <Play className="h-3 w-3 text-lime" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-2/3 bg-lime transition-all duration-700 group-hover:w-[88%]" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Cinematic dish preview</p>
    </div>
  );
}

export function MenuPanel() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[
        { w: '72%', p: '42%' },
        { w: '88%', p: '30%' },
        { w: '56%', p: '36%' },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 bg-lime" />
          <span className="flex-1">
            <span className="block h-[6px] bg-bone/20 transition-colors duration-500 group-hover:bg-bone/30" style={{ width: row.w }} />
            <span className="mt-1.5 block h-[4px] bg-bone/10" style={{ width: row.p }} />
          </span>
          <span className="font-mono text-[10px] text-smoke">€</span>
        </div>
      ))}
    </div>
  );
}

export function GamePanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        {['A', 'B', 'C'].map((l, i) => (
          <span key={l} className={`flex h-8 w-8 items-center justify-center border font-mono text-[11px] transition-all ${i === 2 ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-fog'}`}>
            {l}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 border border-bone/15 px-3 py-1.5">
        <Dices className="h-3 w-3 text-lime" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/85">
          Who Pays? — <span className="text-lime">Player 2</span>
        </span>
      </div>
    </div>
  );
}

export function LoyaltyPanel() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-lime">DESA Loyalty</span>
        <span className="text-smoke">3 / 5</span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((d) => (
          <span key={d} className={`flex h-7 flex-1 items-center justify-center border ${d < 3 ? 'border-lime/40 bg-lime/[0.1] text-lime' : 'border-bone/10 text-smoke/40'}`}>
            <BadgeCheck className="h-3 w-3" />
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-3/5 bg-lime transition-all duration-700 group-hover:w-4/5" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Feature = {
  n: string;
  icon: typeof Video;
  title: string;
  desc: string;
  bullets: string[];
  panel: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    n: '01',
    icon: Video,
    title: 'Video Menus',
    desc: 'Show every dish with high-quality visuals and motion that make ordering more intuitive, more premium, and more persuasive.',
    bullets: ['Cinematic dish previews', 'Stronger appetite appeal', 'Upsell through presentation'],
    panel: <VideoPanel />,
  },
  {
    n: '02',
    icon: ListOrdered,
    title: 'Text & Standard Menus',
    desc: 'Fast, clean, beautifully structured digital menus designed for clarity, speed, and effortless browsing across all devices.',
    bullets: ['Mobile-first layout', 'Easy category navigation', 'Elegant menu presentation'],
    panel: <MenuPanel />,
  },
  {
    n: '03',
    icon: Dices,
    title: 'Interactive Table Games',
    desc: 'Add memorable moments to the dining experience with lightweight table-side interactions like “Who Pays?” and other branded mini-games.',
    bullets: ['Boost guest engagement', 'Make visits more memorable', 'Shareable brand moments'],
    panel: <GamePanel />,
  },
  {
    n: '04',
    icon: BadgeCheck,
    title: 'Integrated Loyalty Cards',
    desc: 'Turn one-time visits into repeat business with loyalty systems built directly into the menu experience.',
    bullets: ['Retention-focused design', 'Digital fidelity experience', 'Encourage return visits'],
    panel: <LoyaltyPanel />,
  },
];

export default function DesaFeatures() {
  return (
    <section id="desa-features" className="mx-auto scroll-mt-20 max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        index="02"
        eyebrow="Features"
        title="Everything your menu"
        accent="needs to do."
      />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
          DESA Menu combines visual storytelling, smart interaction, and retention tools into one seamless hospitality experience.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-2">
        {FEATURES.map((f, i) => (
          <Reveal key={f.n} delay={(i % 2) * 0.08} className="h-full">
            <article className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-coal lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <f.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                <span className="font-mono text-xs text-smoke">{f.n}</span>
              </div>

              <h3 className="mt-8 font-display text-2xl uppercase leading-tight tracking-tight">{f.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">{f.desc}</p>

              <div className="mt-8 h-[150px] border border-bone/15 bg-carbon/60 p-5 transition-colors group-hover:border-lime/30">
                {f.panel}
              </div>

              <ul className="mt-8 space-y-3 border-t border-bone/10 pt-6">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-bone/75">
                    <Check className="h-4 w-4 shrink-0 text-lime" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
