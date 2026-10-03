import { ScanLine, Sparkles, Zap } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';

const STEPS = [
  {
    n: '01',
    icon: Sparkles,
    title: 'We design your menu ecosystem',
    desc: 'We structure your food, drinks, visuals, and brand into a refined digital experience tailored to your venue.',
  },
  {
    n: '02',
    icon: Zap,
    title: 'We launch your interactive experience',
    desc: 'Your menu goes live with text navigation, optional video dishes, engagement features, and loyalty integration.',
  },
  {
    n: '03',
    icon: ScanLine,
    title: 'Your guests scan, explore, and engage',
    desc: 'Customers discover dishes more visually, interact with the experience, and return through built-in retention tools.',
  },
];

export default function DesaProcess() {
  return (
    <section className="border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="05" eyebrow="How it works" title="Concept to guest interaction," accent="three steps." />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group border-t-2 border-lime pt-6">
                <div className="flex items-center justify-between">
                  <s.icon className="h-7 w-7 text-lime" strokeWidth={1.5} />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">Step {s.n}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-bone/10 pt-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
            <span>Fast onboarding.</span>
            <span className="h-1 w-1 bg-lime" />
            <span>Premium execution.</span>
            <span className="h-1 w-1 bg-lime" />
            <span>Built around your service flow.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
