import { ArrowUpRight, Building2, Coffee, Martini, UtensilsCrossed } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { useI18n } from '../../i18n';

const USE_CASE_ICONS = [UtensilsCrossed, Coffee, Martini, Building2];

export default function DesaUseCases() {
  const { dict } = useI18n();
  const u = dict.useCases;
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 md:px-12 lg:py-28">
      <SectionHeading index={u.index} eyebrow={u.eyebrow} title={u.title} accent={u.accent} />

      <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4">
        {u.items.map((item, i) => {
          const Icon = USE_CASE_ICONS[i] ?? UtensilsCrossed;
          return (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-coal">
                <div className="flex items-center justify-between">
                  <Icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                  <ArrowUpRight className="h-4 w-4 text-smoke transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
                </div>
                <h3 className="mt-8 font-display text-lg uppercase leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{item.desc}</p>
                <span className="mt-6 border-t border-bone/10 pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke transition-colors group-hover:text-lime">
                  {u.builtFor}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
