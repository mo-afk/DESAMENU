import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BRAND } from '../lib/brand';

const LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/demos', label: 'Demos' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/notes', label: 'Notes' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-bone" aria-label="DESA Menu home">
            {/* Official brand logo — sized by height so any lockup keeps its ratio */}
            <BrandLogo className="h-9 w-auto max-w-[190px] shrink-0" />
            <span className="hidden max-w-[8.5rem] border-l border-bone/15 pl-3 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.25em] text-fog lg:block">
              {BRAND.tagline}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`link-sweep font-mono text-xs uppercase tracking-[0.25em] text-bone/80 hover:text-bone ${location.pathname.startsWith(l.to) ? 'active text-bone' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 border border-bone/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog xl:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              Onboarding new venues
            </span>
            <Link
              to="/contact"
              className="group hidden items-center gap-2 bg-lime px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone sm:inline-flex"
            >
              Book a Demo
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-bone/20 text-bone lg:hidden"
              aria-label="Open menu"
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
            className="fixed inset-0 z-[110] flex flex-col bg-ink"
          >
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">
              <div className="flex items-center gap-3 text-bone">
                <BrandLogo className="h-9 w-auto max-w-[190px] shrink-0" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">{BRAND.tagline}</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-bone/20 text-bone"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
              {[{ to: '/', label: 'Home' }, ...LINKS].map((l, i) => (
                <motion.div
                  key={l.to + l.label}
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
                    <span className="font-display text-5xl uppercase tracking-tight text-bone transition-colors group-hover:text-lime sm:text-6xl">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fog sm:px-8">
              <span>Fine dining · Lounges · Cafes</span>
              <span>hello@desamenu.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
