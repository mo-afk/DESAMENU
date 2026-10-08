import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Dices, Sparkles } from 'lucide-react';
import Reveal from '../components/Reveal';
import { FEATURES, getFeature, GAMES, neighbours } from '../lib/features';
import type { FeatureEntry } from '../lib/features';
import { FeaturePanel } from '../components/desa/panels';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Detail page for one capability or game (`/features/:slug`).
 *
 * Carries a sticky back bar at the top and a return block at the bottom, so a
 * visitor who arrived from the tabbed section can get back to it in one click
 * from wherever they have scrolled to.
 */
import { useI18n } from '../i18n';
import { useLocalizedFeature } from '../i18n/content';

export default function FeatureDetail() {
  const { t, dict } = useI18n();
  const fd = dict.features.detail;
  const { slug } = useParams<{ slug: string }>();
  const entry = getFeature(slug);
  /* Localised copy for this entry. Called unconditionally so the hook order is
     stable even while the slug is resolving. */
  const localized = useLocalizedFeature(entry ?? FEATURES[0]);
  const feature = entry ? localized : undefined;
  const [demos, setDemos] = useState<Project[]>([]);
  const [demosLoaded, setDemosLoaded] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = feature ? `${feature.title} — DESA Menu` : t('meta.features');
    return () => {
      document.title = previous;
    };
  }, [feature, t]);

  useEffect(() => {
    let active = true;
    getProjects()
      .then((all) => {
        if (!active || !feature) return;
        // "Where it runs": match the page's keywords against what each demo has.
        setDemos(
          all.filter((p) => {
            const haystack = [p.category, ...(p.services ?? []), ...(p.games ?? [])].join(' · ');
            return feature.matchKeywords.some((k) => haystack.includes(k));
          }),
        );
      })
      .catch(() => {
        /* the block simply stays hidden if content is unavailable */
      })
      .finally(() => {
        if (active) setDemosLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [feature]);

  if (!feature) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-40 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">{t('common.error404')}</p>
        <h1 className="mt-4 font-display text-5xl uppercase sm:text-6xl">{t('notFound.title')}</h1>
        <p className="mt-4 max-w-md text-bone/60">{fd.notFoundBody}</p>
        <Link to="/features" className="mt-8 inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:bg-bone">
          <ArrowLeft className="h-4 w-4" /> {fd.backToFeaturesLabel}
        </Link>
      </div>
    );
  }

  const { prev, next } = neighbours(feature.slug);
  const related: FeatureEntry[] = (feature.related ?? [])
    .map((slug) => getFeature(slug))
    .filter((f): f is FeatureEntry => Boolean(f));

  return (
    <div className="pt-[72px]">
      {/* ------------------------- sticky back bar ------------------------- */}
      <div className="sticky top-[72px] z-40 border-b border-bone/10 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            to="/features"
            className="group inline-flex items-center gap-2 border border-bone/25 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {fd.backToFeaturesLabel}
          </Link>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-fog md:inline">
            {feature.n} — {feature.kindLabel}
          </span>
          {next && (
            <Link
              to={`/features/${next.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70 transition-colors hover:text-lime"
            >
              <span className="hidden sm:inline">{fd.nextLabel}</span> {next.title}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      {/* ------------------------------- hero ------------------------------ */}
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-honey/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-honey">
                <feature.icon className="h-3.5 w-3.5" />
                {feature.kindLabel}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{feature.n}</span>
            </div>

            <h1 className="display-type display-narrow mt-6 max-w-4xl font-display uppercase tracking-tight">
              {feature.title}
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-xl italic text-bone/75 sm:text-2xl">{feature.tagline}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                {t('common.bookDemo')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/demos"
                className="group inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                {t('common.exploreDemos')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------ body ------------------------------- */}
      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-honey">{fd.overview}</p>
              <div className="mt-6 space-y-5 text-base leading-[1.85] text-bone/80 sm:text-lg">
                {feature.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-fog">{fd.whatsIncluded}</p>
              <ul className="mt-5 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2">
                {feature.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 bg-ink p-5 text-sm text-bone/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>

            {feature.kind === 'capability' && feature.slug === 'gamified-dining' && (
              <Reveal delay={0.1}>
                <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-fog">{fd.related}</p>
                <div className="mt-5 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2">
                  {GAMES.map((g) => (
                    <Link key={g.slug} to={`/features/${g.slug}`} className="group flex items-start gap-4 bg-ink p-5 transition-colors hover:bg-carbon/60">
                      <g.icon className="mt-0.5 h-5 w-5 shrink-0 text-honey" strokeWidth={1.5} />
                      <span>
                        <span className="block font-display text-base uppercase leading-tight group-hover:text-lime">{g.title}</span>
                        <span className="mt-1 block text-sm text-fog">{g.bullets[0]}</span>
                      </span>
                      <ArrowUpRight className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-smoke transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {demosLoaded && demos.length > 0 && (
              <Reveal delay={0.12}>
                <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-fog">{dict.demos.detail.runningHere}</p>
                <div className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
                  {demos.map((d) => (
                    <Link key={d.slug} to={`/demos/${d.slug}`} className="group flex items-center justify-between gap-6 py-4">
                      <span>
                        <span className="block font-display text-lg uppercase leading-tight group-hover:text-lime">{d.title}</span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                          {d.industry} — {d.client}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-4">
                        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-honey sm:inline">{d.metrics[0]?.value} {d.metrics[0]?.label}</span>
                        <ArrowUpRight className="h-4 w-4 text-smoke transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime" />
                      </span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                <span>{dict.games.livePreview}</span>
                <span>{feature.n}</span>
              </div>
              <div className="group mt-4 h-[260px] border border-bone/15 bg-carbon/60 p-6 transition-colors hover:border-honey/30">
                <FeaturePanel name={feature.panel} />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glow-ember mt-6 border border-ember/40 bg-ember/[0.05] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-honey">{fd.inTheNumbers}</p>
                <div className="mt-6 space-y-6">
                  {feature.stats.map((s) => (
                    <div key={s.label} className="border-b border-bone/10 pb-6 last:border-0 last:pb-0">
                      <p className="font-display text-4xl text-bone sm:text-5xl">{s.value}</p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-6 border border-bone/15 bg-coal p-6">
                <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
                  <Sparkles className="h-3.5 w-3.5 text-honey" />
                  {fd.partOfSuite}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bone/75">{fd.suiteBody}</p>
                <Link
                  to="/features"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/70 transition-colors hover:text-lime"
                >
                  <Dices className="h-3.5 w-3.5" />
                  {fd.allCapabilities}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------- related ------------------------------- */}
      {related.length > 0 && (
        <section className="border-t border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{t('features.detail.related')}</p>
            <div className="mt-8 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to={`/features/${r.slug}`} className="group flex flex-col bg-ink p-6 transition-colors hover:bg-coal">
                  <r.icon className="h-6 w-6 text-honey" strokeWidth={1.5} />
                  <span className="mt-5 font-display text-lg uppercase leading-tight group-hover:text-lime">{r.title}</span>
                  <span className="mt-3 flex-1 text-sm text-fog">{r.bullets[0]}</span>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70 group-hover:text-lime">
                    {t('features.viewDetails')} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------ bottom return block ---------------------- */}
      <section className="border-t border-bone/10 bg-coal">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{fd.endOfPage}</p>
            <p className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight sm:text-3xl">{fd.backToWhere}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/features"
              className="group inline-flex items-center gap-3 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {fd.backToFeaturesLabel}
            </Link>
            {prev && (
              <Link
                to={`/features/${prev.slug}`}
                className="group inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {fd.prevLabel} {prev.title}
              </Link>
            )}
          </div>
        </div>
        {next && (
          <Link to={`/features/${next.slug}`} className="group block border-t border-bone/10 transition-colors hover:bg-ink">
            <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-10 sm:px-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{dict.demos.detail.next}</p>
                <p className="mt-3 font-display text-3xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-5xl">{next.title}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">{next.n} — {next.kindLabel}</p>
              </div>
              <ArrowRight className="h-8 w-8 shrink-0 text-fog transition-all group-hover:translate-x-1 group-hover:text-lime" />
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}
