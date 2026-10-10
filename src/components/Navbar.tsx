import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Menu, MessageCircle, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';
import TikTokIcon from './TikTokIcon';
import { CONTACT } from '../lib/brand';
import { useI18n } from '../i18n';
import type { StringPath } from '../i18n';

/** Routes stay constant across locales; only the labels come from the dictionary. */
const LINKS: { to: string; key: StringPath }[] = [
  { to: '/features', key: 'nav.features' },
  { to: '/demos', key: 'nav.demos' },
  { to: '/how-it-works', key: 'nav.howItWorks' },
  { to: '/notes', key: 'nav.notes' },
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
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between gap-3 px-5 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 text-bone sm:gap-3" aria-label={t('nav.homeAria')}>
            {/* Official brand logo — sized by height so any lockup keeps its
                ratio. The max-width steps keep logo + wordmark + nav + CTA
                inside the viewport at every breakpoint; `truncate` below is the
                final backstop. */}
            <BrandLogo className="h-8 w-auto max-w-[96px] shrink-0 sm:h-9 sm:max-w-[130px] xl:max-w-[150px] 2xl:max-w-[190px]" />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-base uppercase tracking-wider xl:text-lg">
                DESA <span className="text-lime">Menu</span>
              </span>
              <span className="mt-1 hidden truncate font-mono text-[9px] uppercase tracking-[0.25em] text-fog 2xl:block">
                {t('nav.tagline')}
              </span>
            </span>
          </Link>

          {/* Tighter gaps below xl: the brand wordmark now competes for the
              same row, and this keeps 1024–1279 comfortable even if the logo
              asset is a wide lockup. */}
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
            <span className="hidden items-center gap-2 border border-bone/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog 2xl:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              {t('nav.status')}
            </span>

            {/* Language control, right beside the CTA. Two densities live in
                the component: the full EN|FR|AR|ES control from xl, the compact
                badge below it — see LanguageSwitcher for why. */}
            <div className="hidden shrink-0 md:block">
              <LanguageSwitcher />
            </div>

            {/* Social shortcuts — hidden on mobile where the full menu carries
                the email and CTA. Kept subtle so they never compete with the
                Book a Demo button. */}
            <div className="hidden items-center gap-1 lg:flex">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center text-bone/50 transition-colors hover:text-lime"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center text-bone/50 transition-colors hover:text-lime"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center text-bone/50 transition-colors hover:text-lime"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <Link
              to="/contact"
              className="group hidden shrink-0 items-center gap-2 bg-lime px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone sm:inline-flex"
            >
              {t('nav.cta')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-bone/20 text-bone lg:hidden"
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
            className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-ink"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between px-5 sm:px-8">
              <div className="flex min-w-0 items-center gap-2.5 text-bone sm:gap-3">
                <BrandLogo className="h-8 w-auto max-w-[96px] shrink-0 sm:h-9 sm:max-w-[130px]" />
                <span className="truncate font-display text-base uppercase tracking-wider xl:text-lg">
                  DESA <span className="text-lime">Menu</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-bone/20 text-bone"
                aria-label={t('nav.closeMenu')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 py-8 sm:px-8">
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
            <div className="shrink-0 space-y-5 px-5 pb-8 sm:px-8">
              <LanguageSwitcher variant="inline" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone/60 transition-colors hover:border-lime hover:text-lime"
                  >
                    <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                  <a
                    href={CONTACT.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone/60 transition-colors hover:border-lime hover:text-lime"
                  >
                    <TikTokIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={CONTACT.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center border border-bone/15 text-bone/60 transition-colors hover:border-lime hover:text-lime"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </div>
                <a href={CONTACT.emailHref} dir="ltr" className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog hover:text-lime">{CONTACT.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
