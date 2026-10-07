import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Dices, Sparkles } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { DesaButtonLink } from './DesaUI';
import { GAMES } from '../../lib/features';
import { FeaturePanel } from './panels';
import { useLocalizedFeatures } from '../../i18n/content';
import { useI18n } from '../../i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Gamified dining ecosystem, as tabs.
 *
 * Switching a tab swaps the panel and copy in place — no scroll, no page
 * change. The active tab is mirrored into `?game=` with `replace`, so the
 * browser's back button returns a visitor to the exact game they were reading.
 */
export default function DesaGames() {
  const { t, dict } = useI18n();
  const g = dict.games;
  const GAME_LIST = useLocalizedFeatures(GAMES);
  const [params, setParams] = useSearchParams();
  const [activeSlug, setActiveSlug] = useState<string>(() => {
    const requested = params.get('game');
    return GAMES.some((g) => g.slug === requested) ? (requested as string) : GAMES[0].slug;
  });
  const active = GAME_LIST.find((item) => item.slug === activeSlug) ?? GAME_LIST[0];

  const select = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      // replace (not push) so tab clicks don't stack up in history
      const next = new URLSearchParams(params);
      next.set('game', slug);
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = GAME_LIST.findIndex((item) => item.slug === activeSlug);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      select(GAMES[(i + 1) % GAMES.length].slug);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      select(GAMES[(i - 1 + GAMES.length) % GAMES.length].slug);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(GAMES[0].slug);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(GAMES[GAMES.length - 1].slug);
    }
  };

  return (
    <section id="desa-games" className="relative scroll-mt-20 overflow-hidden border-y border-bone/10 bg-coal">
      <div aria-hidden className="warm-veil pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index={g.index} eyebrow={g.eyebrow} title={g.title} accent={g.accent} />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
            {g.intro}
          </p>
        </Reveal>

        {/* ------------------------------- tabs ------------------------------- */}
        <Reveal delay={0.12}>
          <div
            role="tablist"
            aria-label={g.tablist}
            onKeyDown={onKeyDown}
            className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4"
          >
            {GAME_LIST.map((item) => {
              const selected = item.slug === active.slug;
              return (
                <button
                  key={item.slug}
                  role="tab"
                  id={`game-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls={`game-panel-${item.slug}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(item.slug)}
                  className={`group flex items-start gap-4 p-5 text-left transition-colors lg:p-6 ${
                    selected ? 'bg-ink' : 'bg-coal hover:bg-carbon/60'
                  }`}
                >
                  <item.icon className={`mt-0.5 h-6 w-6 shrink-0 transition-colors ${selected ? 'text-honey' : 'text-smoke group-hover:text-fog'}`} strokeWidth={1.5} />
                  <span className="min-w-0">
                    <span className={`block font-display text-base uppercase leading-tight tracking-tight transition-colors sm:text-lg ${selected ? 'text-bone' : 'text-bone/70'}`}>
                      {item.title}
                    </span>
                    <span className={`mt-1.5 block font-mono text-[9px] uppercase tracking-[0.2em] ${selected ? 'text-honey' : 'text-smoke'}`}>
                      {item.kindLabel} · {item.n}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`ms-auto mt-1 block h-[6px] w-[6px] shrink-0 transition-colors ${selected ? 'bg-honey' : 'bg-transparent'}`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ------------------------------ panel ------------------------------ */}
        <div
          className="relative mt-px border border-bone/15 bg-ink"
          role="tabpanel"
          id={`game-panel-${active.slug}`}
          aria-labelledby={`game-tab-${active.slug}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="grid gap-10 p-8 lg:min-h-[430px] lg:grid-cols-12 lg:gap-14 lg:p-12"
            >
              <div className="flex flex-col lg:col-span-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-honey">{active.kindLabel}</p>
                <h3 className="mt-4 font-display text-3xl uppercase leading-[0.95] tracking-tight sm:text-4xl">{active.title}</h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/75">{active.short}</p>

                <ul className="mt-7 space-y-3 border-t border-bone/10 pt-6">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-bone/75">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-honey" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={`/features/${active.slug}`}
                    className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
                  >
                    {t('features.viewDetails')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    to="/demos"
                    className="group inline-flex items-center gap-2 border border-bone/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
                  >
                    {g.seeLive}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">
                  <span>{g.livePreview}</span>
                  <span>{active.n}</span>
                </div>
                <div className="group mt-4 h-[240px] border border-bone/15 bg-carbon/60 p-6 transition-colors hover:border-honey/30 sm:h-[260px]">
                  <FeaturePanel name={active.panel} />
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                  {g.guestInterface}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-8 border-t border-bone/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
            <dl className="grid grid-cols-3 gap-8">
              {g.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl uppercase tracking-tight text-honey sm:text-4xl">{s.value}</span>
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/features/gamified-dining"
                className="group inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
              >
                <Dices className="h-4 w-4" />
                {g.wholeSuite}
              </Link>
              <DesaButtonLink to="/contact" variant="lime">
                {t('common.bookDemo')}
              </DesaButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
            {g.statsNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
