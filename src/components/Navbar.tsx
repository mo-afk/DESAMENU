import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n';
import type { StringPath } from '../i18n';

/** Routes stay constant across locales; only the labels come from the dictionary. */
const LINKS: { to: string; key: StringPath }[] = [
  { to: '/features', key: 'nav.features' },
  { to: '/demos', key: 'nav.demos' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    /* Lock body scroll when the mobile menu is open, WITHOUT losing the
       visitor's scroll position. Setting `overflow: hidden` on <body>
       directly would otherwise collapse the scroll offset to 0 and leave
       the user at the top when the menu closes. */
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-3 px-5 sm:px-8 md:px-12">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-bone sm:gap-3"
            aria-label={t('nav.homeAria')}
          >
            {/* Keep the complete mark and wordmark visible at every width. */}
            <BrandLogo className="h-8 w-auto max-w-[96px] shrink-0 sm:h-9 sm:max-w-[130px] xl:max-w-[150px] 2xl:max-w-[190px]" />
            <span className="flex shrink-0 flex-col whitespace-nowrap leading-none">
              <span className="whitespace-nowrap font-display text-base uppercase tracking-wider xl:text-lg">
                DESA <span className="text-lime">Menu</span>
              </span>
              <span className="mt-1 hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.25em] text-fog 2xl:block">
                {t('nav.tagline')}
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`link-sweep font-mono text-xs uppercase tracking-[0.25em] text-bone/80 hover:text-bone ${location.pathname.startsWith(l.to) ? 'active text-bone' : ''}`}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Compact language control, kept immediately beside the CTA. */}
            <div className="hidden shrink-0 md:block">
              <LanguageSwitcher />
            </div>

            <Link
              to="/contact"
              className="group hidden shrink-0 items-center gap-2 bg-lime px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone sm:inline-flex"
            >
              {t('nav.cta')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-12 w-12 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-lime hover:text-lime lg:hidden"
              aria-label={t('nav.openMenu')}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-5 sm:px-8 md:px-12">
              <div className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-bone sm:gap-3">
                <BrandLogo className="h-8 w-auto max-w-[96px] shrink-0 sm:h-9 sm:max-w-[130px]" />
                <span className="shrink-0 whitespace-nowrap font-display text-base uppercase tracking-wider xl:text-lg">
                  DESA <span className="text-lime">Menu</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-lime hover:text-lime"
                aria-label={t('nav.closeMenu')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 py-8 sm:px-8 md:px-12">
              {[{ to: '/', key: 'nav.home' as StringPath }, ...LINKS].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-bone/10 py-4"
                  >
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    <span className="font-display text-4xl uppercase tracking-tight text-bone transition-colors group-hover:text-lime sm:text-5xl">
                      {t(l.key)}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="shrink-0 space-y-5 px-5 pb-8 sm:px-8 md:px-12">
              <LanguageSwitcher variant="inline" />
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2 bg-lime px-5 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
              >
                {t('nav.cta')}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
