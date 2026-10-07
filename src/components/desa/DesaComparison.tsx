import { Check, X } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { useI18n } from '../../i18n';

export default function DesaComparison() {
  const { dict } = useI18n();
  const c = dict.comparison;
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading index={c.index} eyebrow={c.eyebrow} title={c.title} accent={c.accent} />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
          {c.intro}
        </p>
      </Reveal>

      <div className="relative mt-12 grid gap-px border border-bone/15 bg-bone/15 lg:grid-cols-2">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-bone/20 bg-ink font-mono text-[11px] uppercase tracking-[0.2em] text-fog lg:flex"
        >
          {c.versus}
        </span>

        {/* Traditional */}
        <Reveal className="h-full">
          <div className="flex h-full flex-col bg-ink p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg uppercase tracking-tight text-fog">{c.traditionalTitle}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{c.before}</span>
            </div>
            <ul className="mt-8 divide-y divide-bone/10 border-t border-bone/10">
              {c.traditional.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-sm text-fog">
                  <X className="h-4 w-4 shrink-0 text-smoke" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* DESA Menu */}
        <Reveal delay={0.1} className="h-full">
          <div className="flex h-full flex-col bg-coal p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg uppercase tracking-tight text-bone">{c.desaTitle}</h3>
              <span className="inline-flex items-center gap-2 border border-lime/40 px-2.5 py-1">
                <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">{c.after}</span>
              </span>
            </div>
            <ul className="mt-8 divide-y divide-bone/10 border-t border-bone/10">
              {c.desa.map((item) => (
                <li key={item} className="flex items-center gap-4 py-4 text-sm text-bone">
                  <Check className="h-4 w-4 shrink-0 text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 border-t border-bone/10 pt-10 text-center font-display text-2xl uppercase leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          {c.closingPre} <span className="font-serif normal-case italic font-medium text-lime">{c.closingAccent}</span>
        </p>
      </Reveal>
    </section>
  );
}
