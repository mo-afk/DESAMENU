import { Crown, Sparkles, TrendingUp, Users } from 'lucide-react';
import Reveal from '../Reveal';
import { DesaTag } from './DesaUI';
import { useI18n } from '../../i18n';

/** Icons stay in code; the words come from the dictionary, index for index. */
const VALUE_ICONS = [Sparkles, Users, Crown, TrendingUp];

export default function DesaValueGrid() {
  const { dict } = useI18n();
  const v = dict.value;
  return (
    <section id="desa-value" className="scroll-mt-20 border-b border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
              <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">{v.index}</span>&nbsp;&nbsp;{v.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
              {v.title} <span className="font-serif normal-case italic font-medium">{v.accent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <DesaTag>{v.tag}</DesaTag>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4">
          {v.items.map((item, i) => {
            const Icon = VALUE_ICONS[i] ?? Sparkles;
            return (
              <Reveal key={item.n} delay={i * 0.08} className="h-full">
                <div className="group flex h-full flex-col bg-coal p-8 transition-colors hover:bg-carbon">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-smoke">{item.n}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl uppercase leading-tight tracking-tight">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
