import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Dribbble, Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';
import Marquee from './Marquee';
import { submitInquiry } from '../lib/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitInquiry({ name: 'Newsletter subscriber', email, project_type: 'Newsletter', message: 'Newsletter signup from footer.' });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <Marquee items={['Start a project', 'Design & Growth', 'Brand - Web - Campaigns']} className="border-b border-bone/10 py-5" outline />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 text-bone">
              <Logo className="h-12 w-14" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg">DG</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Design & Growth</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">
              An independent design and growth agency. We build brands, websites and campaigns that demand attention - and convert it into revenue.
            </p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm">
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">The Double Take - monthly insights</label>
              <div className="mt-3 flex border border-bone/20 focus-within:border-lime">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="your@email.com"
                  className="w-full bg-transparent px-4 py-3 text-sm text-bone placeholder:text-smoke focus:outline-none"
                />
                <button type="submit" className="flex items-center gap-2 bg-bone px-5 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:bg-lime" aria-label="Subscribe">
                  {status === 'done' ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
              {status === 'done' && <p className="mt-2 font-mono text-xs text-lime">You are in. First issue lands soon.</p>}
              {status === 'error' && <p className="mt-2 font-mono text-xs text-red-400">Please enter a valid email.</p>}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Sitemap</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[['/work', 'Work'], ['/services', 'Services'], ['/studio', 'Studio'], ['/journal', 'Journal'], ['/contact', 'Contact']].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="link-sweep text-bone/80 hover:text-bone">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Studios</p>
              <ul className="mt-4 space-y-3 text-sm text-bone/80">
                <li>New York<br /><span className="text-fog">77 Greene St, SoHo</span></li>
                <li>London<br /><span className="text-fog">14 Rivington St</span></li>
                <li>Tokyo<br /><span className="text-fog">2-11-3 Meguro</span></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Connect</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="mailto:hello@dg-agency.co" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">hello@dg-agency.co <ArrowUpRight className="h-3 w-3" /></a></li>
                <li><a href="tel:+12125550194" className="link-sweep text-bone/80 hover:text-bone">+1 (212) 555-0194</a></li>
                <li className="flex gap-3 pt-2">
                  {[Instagram, Twitter, Linkedin, Dribbble].map((Icon, i) => (
                    <a key={i} href="#" onClick={(e) => e.preventDefault()} aria-label="Social link" className="flex h-9 w-9 items-center justify-center border border-bone/15 text-bone/70 transition-colors hover:border-lime hover:text-lime">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke sm:flex-row sm:items-center sm:justify-between">
          <span>2026 DG Design and Growth Agency</span>
          <span className="hidden md:inline">Brand - Web - Motion - Growth</span>
          <span>Made with obsession in NYC</span>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden pb-2">
        <p className="text-outline-faint whitespace-nowrap text-center font-display text-[18vw] uppercase leading-none">DG Agency</p>
      </div>
    </footer>
  );
}
