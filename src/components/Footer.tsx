import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Instagram, Mail, MessageCircle } from 'lucide-react';
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
      await submitInquiry({ name: 'Newsletter subscriber', email, project_type: 'Newsletter', message: 'Newsletter signup from the footer.' });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <Marquee items={['DESA Menu', 'Video menus', 'Who Pays?', 'Loyalty cards', 'Live demos']} className="border-b border-bone/10 py-5" outline />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 text-bone" aria-label="DESA Menu home">
              <Logo className="h-12 w-14" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg">DESA <span className="text-lime">Menu</span></span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Digital menu ecosystem</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-fog">
              A premium digital menu ecosystem for hospitality. Interactive text menus, cinematic dish video, table-side games and digital loyalty cards —
              built for restaurants, cafes, lounges and hotels.
            </p>
            <form onSubmit={subscribe} className="mt-8 max-w-sm">
              <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">The Service Note — monthly menu insights</label>
              <div className="mt-3 flex border border-bone/20 focus-within:border-lime">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="your@venue.com"
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
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Explore</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[['/features', 'Features'], ['/demos', 'Live demos'], ['/how-it-works', 'How it works'], ['/notes', 'Notes'], ['/contact', 'Book a demo']].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="link-sweep text-bone/80 hover:text-bone">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">The product</p>
              <ul className="mt-4 space-y-3 text-sm text-bone/80">
                <li>Text &amp; video menus<br /><span className="text-fog">Interactive dish cards</span></li>
                <li>Who Pays?<br /><span className="text-fog">Branded table games</span></li>
                <li>Digital loyalty cards<br /><span className="text-fog">Retention built in</span></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Contact</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="mailto:hello@desamenu.com" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">Email <ArrowUpRight className="h-3 w-3" /></a></li>
                <li><a href="https://wa.me/" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">WhatsApp <ArrowUpRight className="h-3 w-3" /></a></li>
                <li><a href="https://instagram.com/desamenu" className="link-sweep inline-flex items-center gap-1 text-bone/80 hover:text-bone">Instagram <ArrowUpRight className="h-3 w-3" /></a></li>
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
          <span>© 2026 DESA Menu — Premium digital menu ecosystems for hospitality</span>
          <span className="hidden md:inline">Fine dining · Lounges · Cafes · Hotels</span>
          <span>hello@desamenu.com</span>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden pb-2">
        <p className="text-outline-faint whitespace-nowrap text-center font-display text-[18vw] uppercase leading-none">Menu</p>
      </div>
    </footer>
  );
}
