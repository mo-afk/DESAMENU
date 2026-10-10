import { ScanLine, Sparkles, Zap } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { useI18n } from '../../i18n';

const STEP_ICONS = [Sparkles, Zap, ScanLine];

export default function DesaProcess() {
  const { dict } = useI18n();
  const p = dict.process;
  return (
    <section className="border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 md:px-12 lg:py-28">
        <SectionHeading index={p.index} eyebrow={p.eyebrow} title={p.title} accent={p.accent} />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {p.steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Sparkles;
            const n = String(i + 1).padStart(2, '0');
            return (
              <Reveal key={n} delay={i * 0.08}>
                <div className="group border-t-2 border-lime pt-6">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-lime" strokeWidth={1.5} />
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">{p.stepLabel} {n}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl uppercase leading-tight tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/65">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-bone/10 pt-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-fog">
            {p.footerPoints.map((point, i) => (
              <span key={point} className="inline-flex flex-wrap items-center gap-x-4">
                {i > 0 && <span className="h-1 w-1 bg-lime" />}
                <span>{point}</span>
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
