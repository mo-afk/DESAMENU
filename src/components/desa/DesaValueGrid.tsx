import { Crown, Sparkles, TrendingUp, Users } from 'lucide-react';
import Reveal from '../Reveal';
import { DesaTag } from './DesaUI';

const VALUES = [
  { n: '01', icon: Sparkles, title: 'More engaging ordering', desc: 'Motion and appetite-driven visuals that make guests explore more of the menu.' },
  { n: '02', icon: Users, title: 'Higher guest retention', desc: 'Loyalty built into the menu itself — not bolted on as an afterthought.' },
  { n: '03', icon: Crown, title: 'Stronger brand presentation', desc: 'Every dish presented inside your visual language, at every table.' },
  { n: '04', icon: TrendingUp, title: 'Smarter digital upselling', desc: 'Recommendations placed exactly where guests make their decisions.' },
];

export default function DesaValueGrid() {
  return (
    <section id="desa-value" className="scroll-mt-20 border-b border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
              <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">01</span>&nbsp;&nbsp;What it changes
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
              Four outcomes, <span className="font-serif normal-case italic font-medium">every service.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <DesaTag>Hospitality operating layer</DesaTag>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-coal p-8 transition-colors hover:bg-carbon">
                <div className="flex items-center justify-between">
                  <v.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                  <span className="font-mono text-xs text-smoke">{v.n}</span>
                </div>
                <h3 className="mt-8 font-display text-xl uppercase leading-tight tracking-tight">{v.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
