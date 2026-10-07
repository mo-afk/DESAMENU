import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { CAPABILITIES } from '../../lib/features';
import { FeaturePanel } from './panels';

/** The four DESA Menu capabilities. Each card links to its detail page. */
export default function DesaFeatures() {
  return (
    <section id="desa-features" className="mx-auto scroll-mt-20 max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading index="02" eyebrow="Features" title="Everything your menu" accent="needs to do." />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
          DESA Menu combines visual storytelling, smart interaction, and retention tools into one seamless hospitality experience.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-2">
        {CAPABILITIES.map((f, i) => (
          <Reveal key={f.slug} delay={(i % 2) * 0.08} className="h-full">
            <article className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-coal lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <f.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                <span className="font-mono text-xs text-smoke">{f.n}</span>
              </div>

              <h3 className="mt-8 font-display text-2xl uppercase leading-tight tracking-tight">
                <Link to={`/features/${f.slug}`} className="transition-colors hover:text-lime">
                  {f.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">{f.short}</p>

              <div className="mt-8 h-[150px] border border-bone/15 bg-carbon/60 p-5 transition-colors group-hover:border-lime/30">
                <FeaturePanel name={f.panel} />
              </div>

              <ul className="mt-8 space-y-3 border-t border-bone/10 pt-6">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-bone/75">
                    <Check className="h-4 w-4 shrink-0 text-lime" />
                    {b}
                  </li>
                ))}
              </ul>

              <Link
                to={`/features/${f.slug}`}
                className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70 transition-colors hover:text-lime group-hover:text-lime"
              >
                View details
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
