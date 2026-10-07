import { motion } from 'framer-motion';
import { ArrowDown, Play, ScanLine, Sparkles, Star } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import DesaMarquee from './DesaMarquee';
import { DesaButtonAnchor, DesaTag } from './DesaUI';

const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = ['Video Menus', 'Gamified Dining Suite', 'Loyalty Systems', 'Higher Average Order Value'];

/**
 * Square device mockup of the guest-facing DESA Menu interface.
 * Decorative: exposed to assistive tech as one labelled figure.
 */
function DesaDeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]" role="img" aria-label="Preview of the DESA Menu guest interface: a cinematic dish video, category navigation, menu rows and an integrated loyalty card.">
      {/* Floating card — table game */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-4 top-[12%] z-20 w-[150px] border border-bone/20 bg-coal/95 p-3 backdrop-blur-sm sm:-left-10"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">Table Game</p>
        <p className="mt-1 font-display text-sm uppercase">Who Pays?</p>
        <div className="mt-3 flex items-center gap-1.5">
          {['A', 'B', 'C'].map((l, i) => (
            <span key={l} className={`flex h-6 w-6 items-center justify-center border font-mono text-[10px] ${i === 2 ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-fog'}`}>
              {l}
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.2em] text-lime">P2</span>
        </div>
      </motion.div>

      {/* Floating card — loyalty */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-3 bottom-[10%] z-20 w-[168px] border border-lime/40 bg-coal/95 p-3 backdrop-blur-sm sm:-right-8"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-lime">Loyalty +1</p>
          <Star className="h-3 w-3 text-lime" />
        </div>
        <p className="mt-2 text-[11px] leading-snug text-bone/85">Visit recorded — welcome back, Sofia.</p>
      </motion.div>

      {/* Device */}
      <div className="relative border border-bone/20 bg-carbon p-2.5 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="relative overflow-hidden border border-bone/10 bg-ink">
          {/* status bar */}
          <div className="flex items-center justify-between border-b border-bone/10 px-4 py-2.5">
            <span className="font-mono text-[9px] text-fog">21:04</span>
            <span className="flex items-center gap-1.5">
              <ScanLine className="h-3 w-3 text-lime" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">Table 07</span>
            </span>
          </div>

          {/* venue header — venue identity left, official brand mark right */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-smoke">DESA Menu</p>
              <p className="mt-1 truncate font-display text-lg uppercase leading-none">La Terrasse</p>
            </div>
            {/* Dark graphite chip — no light plate behind the transparent mark */}
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-bone/15 bg-carbon/80 p-1.5">
              <BrandLogo className="h-full w-full" alt="" />
            </span>
          </div>

          {/* categories */}
          <div className="flex gap-2 overflow-hidden px-4 pb-3.5">
            {['Starters', 'Mains', 'Desserts', 'Drinks'].map((c, i) => (
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
              <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 border border-bone/20 bg-ink/70 px-2 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/85">Playing</span>
              </span>
              <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 border border-bone/20 bg-ink/70 px-2 py-1 backdrop-blur-sm">
                <Star className="h-2.5 w-2.5 text-lime" />
                <span className="font-mono text-[8px] text-bone/85">4.9</span>
              </span>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 bg-ink/50 backdrop-blur-sm">
                <Play className="h-3.5 w-3.5 translate-x-px text-bone" />
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-honey">Chef&apos;s signature</p>
                  <p className="mt-0.5 font-display text-sm uppercase leading-none">Seared Scallops</p>
                </div>
                <span className="font-mono text-[11px] text-bone">€24</span>
              </div>
            </div>
          </div>

          {/* menu rows */}
          <div className="space-y-2 px-4 py-3.5">
            {[
              { name: 'Truffle Arancini', note: 'Aged parmesan · black truffle', price: '€14', img: '/images/demo-atelier.jpg' },
              { name: 'Noir Spritz', note: 'Bergamot · prosecco · basil', price: '€12', img: '/images/demo-noir.jpg' },
            ].map((row) => (
              <div key={row.name} className="flex items-center gap-3 border border-bone/10 p-2 transition-colors hover:border-lime/40">
                <img src={row.img} alt="" className="h-10 w-10 shrink-0 object-cover img-mono" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] text-bone">{row.name}</span>
                  <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.12em] text-smoke">{row.note}</span>
                </span>
                <span className="shrink-0 font-mono text-[10px] text-lime">{row.price}</span>
              </div>
            ))}
          </div>

          {/* loyalty strip */}
          <div className="mx-4 mb-4 border border-lime/30 bg-lime/[0.06] p-3">
            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
              <span className="text-lime">DESA Loyalty</span>
              <span className="text-fog">3 / 5</span>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((d) => (
                <span key={d} className={`h-1.5 flex-1 ${d < 3 ? 'bg-lime' : 'bg-bone/15'}`} />
              ))}
            </div>
            <p className="mt-2.5 text-[10px] leading-snug text-fog">
              One more visit unlocks your <span className="text-bone">complimentary dessert</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesaHero() {
  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-blueprint">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-bone/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[420px] w-[420px] rounded-full bg-lime/[0.05] blur-[130px]" />
      <p className="text-outline-faint pointer-events-none absolute -bottom-8 left-0 select-none whitespace-nowrap font-display text-[20vw] uppercase leading-none opacity-50">
        DESA Menu
      </p>
      <p className="writing-vertical absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] text-smoke xl:block">
        Hospitality menu ecosystem
      </p>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/80">
                <Sparkles className="h-3.5 w-3.5 text-lime" />
                DESA Menu
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">Text · Video · Games · Loyalty</span>
            </motion.div>

            <h1 className="mt-8 font-display uppercase leading-[0.88] tracking-tight">
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: EASE }} className="block text-[12vw] sm:text-[9vw] lg:text-[5.4vw]">
                Turn every menu
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="block text-[12vw] sm:text-[9vw] lg:text-[5.4vw]">
                into a <span className="text-outline">premium</span>
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.32, ease: EASE }} className="block text-[12vw] sm:text-[9vw] lg:text-[5.4vw]">
                digital <span className="font-serif normal-case italic font-medium tracking-normal text-lime">experience.</span>
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-8 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">
              DESA Menu helps restaurants, cafes and lounges replace static QR menus with interactive text menus, cinematic dish videos, a full suite of table games — Who Pays?, the Ideal Combo Spinner and the Taste & Personality Quiz —
              and built-in loyalty systems that elevate guest experience and increase average order value.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.62 }} className="mt-10 flex flex-wrap items-center gap-4">
              <DesaButtonAnchor href="#desa-demo" variant="solid">
                Book a Demo
              </DesaButtonAnchor>
              <DesaButtonAnchor href="#desa-demos" variant="outline">
                Explore Live Demos
              </DesaButtonAnchor>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.72 }} className="mt-8 border-l-2 border-lime pl-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              Built for modern hospitality brands that want to stand out.
            </motion.p>

            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-8 flex flex-wrap gap-2">
              {PILLARS.map((p) => (
                <li key={p}>
                  <DesaTag>{p}</DesaTag>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }} className="lg:col-span-5">
            <DesaDeviceMockup />
          </motion.div>
        </div>

        <motion.a
          href="#desa-value"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fog hover:text-lime"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </span>
          Scroll — what it does
        </motion.a>
      </div>

      <DesaMarquee className="border-t border-bone/10 bg-coal py-5" />
    </section>
  );
}
