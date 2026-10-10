import { motion } from 'framer-motion';
import { ArrowDown, Play, ScanLine, Sparkles, Star } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { useI18n } from '../../i18n';
import DesaMarquee from './DesaMarquee';
import { DesaButtonAnchor, DesaTag } from './DesaUI';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Square device mockup of the guest-facing DESA Menu interface.
 * Decorative: exposed to assistive tech as one labelled figure.
 */
function DesaDeviceMockup() {
  const { t, dict } = useI18n();
  const d = dict.device;
  return (
    <div className="relative mx-auto w-full max-w-[360px]" role="img" aria-label={t('device.aria')}>
      {/* Floating card — table game */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -start-4 top-[12%] z-20 w-[150px] border border-bone/20 bg-coal/95 p-3 backdrop-blur-sm sm:-start-10"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">{d.gameLabel}</p>
        <p className="mt-1 font-display text-sm uppercase">{d.gameName}</p>
        <div className="mt-3 flex items-center gap-1.5">
          {['A', 'B', 'C'].map((l, i) => (
            <span key={l} className={`flex h-6 w-6 items-center justify-center border font-mono text-[10px] ${i === 2 ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-fog'}`}>
              {l}
            </span>
          ))}
          <span className="ms-auto font-mono text-[9px] uppercase tracking-[0.2em] text-lime">{d.gameResult}</span>
        </div>
      </motion.div>

      {/* Floating card — loyalty */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -end-3 bottom-[10%] z-20 w-[168px] border border-lime/40 bg-coal/95 p-3 backdrop-blur-sm sm:-end-8"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">{d.loyaltyPing}</p>
          <Star className="h-3 w-3 text-lime" />
        </div>
        <p className="mt-2 text-[11px] leading-snug text-bone/85">{d.loyaltyMessage}</p>
      </motion.div>

      {/* Device */}
      <div className="relative border border-bone/20 bg-carbon p-2.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="relative overflow-hidden border border-bone/10 bg-ink">
          {/* status bar */}
          <div className="flex items-center justify-between border-b border-bone/10 px-4 py-2.5">
            <span className="font-mono text-[9px] text-fog">21:04</span>
            <span className="flex items-center gap-1.5">
              <ScanLine className="h-3 w-3 text-lime" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">{d.table}</span>
            </span>
          </div>

          {/* venue header — venue identity left, official brand mark right */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">{d.appName}</p>
              <p className="mt-1 truncate font-display text-lg uppercase leading-tight">{d.venue}</p>
            </div>
            {/* Dark graphite chip — no light plate behind the transparent mark */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-bone/15 bg-carbon/80 p-1.5">
              <BrandLogo className="h-full w-full" alt="" />
            </span>
          </div>

          {/* categories */}
          <div className="flex gap-2 overflow-hidden px-4 pb-3.5">
            {d.categories.map((c, i) => (
              <span key={c} className={`shrink-0 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${i === 0 ? 'border-lime bg-lime text-ink' : 'border-bone/15 text-fog'}`}>
                {c}
              </span>
            ))}
          </div>

          {/* video dish card */}
          <div className="relative mx-4 overflow-hidden border border-bone/15">
            <div className="relative aspect-[4/3]">
              <img src="/images/hero-dish.jpg" alt="" className="img-warm h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/25" />
              <div aria-hidden className="warm-veil pointer-events-none absolute inset-0" />
              {/* scanning highlight */}
              <motion.span
                aria-hidden
                animate={{ y: ['-120%', '320%'] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-lime/15 to-transparent"
              />
              <span className="absolute start-2.5 top-2.5 inline-flex items-center gap-1.5 border border-bone/20 bg-ink/70 px-2 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/85">{d.playing}</span>
              </span>
              <span className="absolute end-2.5 top-2.5 inline-flex items-center gap-1 border border-bone/20 bg-ink/70 px-2 py-1 backdrop-blur-sm">
                <Star className="h-2.5 w-2.5 text-lime" />
                <span className="font-mono text-[8px] text-bone/85">4.9</span>
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 bg-ink/50 backdrop-blur-sm">
                <Play className="h-3.5 w-3.5 translate-x-px text-bone" />
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-honey">{d.signature}</p>
                  <p className="mt-0.5 font-display text-sm uppercase leading-tight">{d.dish}</p>
                </div>
                <span className="font-mono text-[11px] text-bone" dir="ltr">{d.price}</span>
              </div>
            </div>
          </div>

          {/* menu rows */}
          <div className="space-y-2 px-4 py-3.5">
            {[
              { ...d.rows[0], img: '/images/demo-atelier.jpg' },
              { ...d.rows[1], img: '/images/demo-noir.jpg' },
            ].map((row) => (
              <div key={row.name} className="flex items-center gap-3 border border-bone/10 p-2 transition-colors hover:border-lime/40">
                <img src={row.img} alt="" className="h-10 w-10 shrink-0 object-cover img-mono" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] text-bone">{row.name}</span>
                  <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">{row.note}</span>
                </span>
                <span className="shrink-0 font-mono text-[10px] text-lime" dir="ltr">{row.price}</span>
              </div>
            ))}
          </div>

          {/* loyalty strip */}
          <div className="mx-4 mb-4 border border-lime/30 bg-lime/[0.06] p-3">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
              <span className="text-lime">{d.loyaltyName}</span>
              <span className="text-fog">{d.loyaltyProgress}</span>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((d) => (
                <span key={d} className={`h-1.5 flex-1 ${d < 3 ? 'bg-lime' : 'bg-bone/15'}`} />
              ))}
            </div>
            <p className="mt-2.5 text-[10px] leading-snug text-fog">
              {d.loyaltyNote} <span className="text-bone">{d.loyaltyReward}</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesaHero() {
  const { t, dict } = useI18n();
  const h = dict.hero;
  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-blueprint">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-bone/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[420px] w-[420px] rounded-full bg-lime/[0.05] blur-[130px]" />
      <p className="text-outline-faint pointer-events-none absolute -bottom-8 start-0 select-none whitespace-nowrap font-display text-[20vw] uppercase leading-none opacity-50">
        DESA Menu
      </p>
      <p className="writing-vertical absolute end-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] text-smoke xl:block">
        {h.vertical}
      </p>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 md:px-12 lg:pb-24 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Copy.
              `min-w-0` lets the grid track shrink below the width of the
              longest word instead of pushing the column past the viewport, and
              `container-type` makes the column the reference for the headline's
              fluid size — so the type tracks its own column rather than the
              window. Without those two, "TRANSFORMEZ" sets a min-content floor
              wider than a phone and the line is clipped at the edge. */}
          <div className="w-full min-w-0 max-w-full overflow-hidden [container-type:inline-size] lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/80">
                <Sparkles className="h-3.5 w-3.5 text-lime" />
                {h.badge}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">{h.disciplines}</span>
            </motion.div>

            {/* One size for the whole block, set on the h1 rather than
                repeated per line. `break-words` is the backstop: if a locale
                ever ships a word wider than the column, it breaks inside the
                line instead of running past the edge. */}
            <h1 className="display-type display-hero mt-8 font-display uppercase leading-[0.92] tracking-tight">
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }} className="block">
                {h.titleLine1}
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="block">
                {h.titleLine2Pre ? `${h.titleLine2Pre} ` : ''}
                <span className="text-outline">{h.titleLine2Accent}</span>
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.32, ease: EASE }} className="block">
                {h.titleLine3Pre ? `${h.titleLine3Pre} ` : ''}
                <span className="font-serif normal-case italic font-medium tracking-normal text-lime">{h.titleLine3Accent}</span>
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-8 max-w-2xl break-words text-base leading-relaxed text-bone/70 sm:text-lg">
              {h.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.62 }} className="mt-10 flex flex-wrap items-center gap-4">
              <DesaButtonAnchor href="#desa-demo" variant="solid">
                {t('common.bookDemo')}
              </DesaButtonAnchor>
              <DesaButtonAnchor href="#desa-demos" variant="outline">
                {t('common.exploreDemos')}
              </DesaButtonAnchor>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.72 }} className="mt-8 border-l-2 border-lime pl-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              {h.note}
            </motion.p>

            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-8 flex flex-wrap gap-2">
              {h.pillars.map((p) => (
                <li key={p}>
                  <DesaTag>{p}</DesaTag>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }} className="min-w-0 lg:col-span-5">
            <DesaDeviceMockup />
          </motion.div>
        </div>

        <motion.a
          href="#desa-value"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('desa-value');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.history?.replaceState) {
              const url = new URL(window.location.href);
              url.hash = '#desa-value';
              window.history.replaceState(null, '', url.toString());
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fog hover:text-lime"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </span>
          {h.scroll}
        </motion.a>
      </div>

      <DesaMarquee className="border-t border-bone/10 bg-coal py-5" />
    </section>
  );
}
