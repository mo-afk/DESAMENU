import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { getProjects } from '../../lib/api';
import type { Project } from '../../lib/api';
import { DesaTag } from './DesaUI';

/**
 * Live demo showcase on the homepage.
 * Demos come from the same API the /demos page uses, so the venues are
 * single-sourced from the content layer.
 */
export default function DesaDemos() {
  const [demos, setDemos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => {
        if (active) setDemos(data.filter((d) => d.featured).slice(0, 3));
      })
      .catch(() => {
        /* the section simply does not render if content is unavailable */
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="desa-demos" className="scroll-mt-20 border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="04" eyebrow="Live demos" title="See DESA Menu" accent="in action." />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
            Real venues, real menus, live right now — fine dining, lounges and cafes running DESA Menu across nine countries.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {loading
            ? [0, 1, 2].map((i) => <div key={i} className="aspect-[16/11] animate-pulse bg-carbon" />)
            : demos.map((demo, i) => (
                <Reveal key={demo.id} delay={(i % 3) * 0.08}>
                  <Link to={`/demos/${demo.slug}`} className="group block" aria-label={`${demo.title} — ${demo.industry} demo`}>
                    <div className="relative aspect-[16/11] overflow-hidden border border-bone/15 bg-carbon">
                      <img
                        src={demo.image_url}
                        alt={`${demo.title} — ${demo.industry} venue interface`}
                        loading="lazy"
                        className="img-warm h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <div aria-hidden className="warm-veil pointer-events-none absolute inset-0" />

                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-bone/20 bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85">Live demo</span>
                      </span>

                      <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-bone/25 bg-ink/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <Play className="h-4 w-4 translate-x-px text-lime" />
                      </span>

                      <div className="absolute inset-x-4 bottom-4 border border-bone/15 bg-ink/85 p-3 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-honey">{demo.industry} · {demo.category}</span>
                          <span className="font-mono text-[10px] text-fog">{demo.metrics[0]?.value} {demo.metrics[0]?.label.split(' ').slice(0, 3).join(' ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-4 pt-5">
                      <div>
                        <h3 className="font-display text-xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-2xl">{demo.title}</h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{demo.client}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {demo.services.slice(0, 3).map((tag) => (
                            <li key={tag}>
                              <DesaTag>{tag}</DesaTag>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
                    </div>
                  </Link>
                </Reveal>
              ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-fog">
              Want to see how DESA Menu would look with your dishes, your branding and your menu structure?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/demos"
                className="group inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                View More Demos
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                Request a Private Walkthrough
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
