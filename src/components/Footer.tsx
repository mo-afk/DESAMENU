import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Instagram, Mail, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';
import Marquee from './Marquee';
import { submitInquiry } from '../lib/api';
import { useI18n } from '../i18n';
import type { StringPath } from '../i18n';

const EXPLORE: { to: string; key: StringPath }[] = [
  { to: '/features', key: 'footer.explore.features' },
  { to: '/demos', key: 'footer.explore.demos' },
  { to: '/how-it-works', key: 'footer.explore.howItWorks' },
  { to: '/notes', key: 'footer.explore.notes' },
  { to: '/contact', key: 'footer.explore.contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const { t, dict } = useI18n();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitInquiry({ name: 'Newsletter subscriber', email, project_type: 'Newsletter', message: 'Newsletter signup from the footer.' });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <Marquee items={dict.footer.marquee} className="border-b border-bone/10 py-5" outline />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-bone" aria-label={t('nav.homeAria')}>
              {/* Official brand logo — primary mark in the footer */}
              <BrandLogo className="h-11 w-auto max-w-[240px] shrink-0" loading="lazy" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{t('nav.tagline')}</span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">{t('footer.about')}</p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm">
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{t('footer.newsletterLabel')}</label>
              <div className="mt-3 flex border border-bone/20 focus-within:border-lime">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder={t('footer.newsletterPlaceholder')}
                  dir="ltr"
                  className="w-full bg-transparent px-4 py-3 text-sm text-bone placeholder:text-smoke focus:outline-none"
                />
                <button type="submit" className="flex items-center gap-2 bg-bone px-5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-lime" aria-label={t('footer.subscribeAria')}>
                  {status === 'done' ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
              {status === 'done' && <p className="mt-2 font-mono text-xs text-lime">{t('footer.newsletterDone')}</p>}
              {status === 'error' && <p className="mt-2 font-mono text-xs text-red-400">{t('footer.newsletterError')}</p>}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{t('footer.exploreTitle')}</p>
              <ul className="mt-4 space-y-3 text-sm">
                {EXPLORE.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="link-sweep text-bone/80 hover:text-bone">{t(item.key)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{t('footer.productTitle')}</p>
              <ul className="mt-4 space-y-3 text-sm text-bone/80">
                {dict.footer.productItems.map((item) => (
                  <li key={item.title}>
                    {item.title}
                    <br />
                    <span className="text-fog">{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{t('footer.contactTitle')}</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="mailto:hello@desamenu.com" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">{t('footer.email')} <ArrowUpRight className="h-3 w-3" /></a></li>
                <li><a href="https://wa.me/" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">{t('footer.whatsapp')} <ArrowUpRight className="h-3 w-3" /></a></li>
                <li><a href="https://instagram.com/desamenu" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">{t('footer.instagram')} <ArrowUpRight className="h-3 w-3" /></a></li>
                <li className="flex gap-3 pt-2">
                  {[Instagram, MessageCircle, Mail].map((Icon, i) => (
                    <span key={i} className="flex h-9 w-9 items-center justify-center border border-bone/15 text-bone/70">
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke sm:flex-row sm:items-center sm:justify-between">
          <span>{t('footer.legal')}</span>
          <span className="hidden md:inline">{t('footer.segments')}</span>
          <a href="mailto:hello@desamenu.com" dir="ltr" className="hover:text-bone">hello@desamenu.com</a>
        </div>

        {/* Micro-footer — the agency credit behind the product */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-bone/10 pt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-smoke sm:flex-row">
          <BrandLogo className="h-4 w-auto max-w-[96px] shrink-0" alt="" loading="lazy" />
          <span>
            {t('footer.poweredBy')} <span className="text-bone/60">{t('footer.agency')}</span>
          </span>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden pb-2">
        <p className="text-outline-faint whitespace-nowrap text-center font-display text-[18vw] uppercase leading-none">Menu</p>
      </div>
    </footer>
  );
}
