import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';

/**
 * Shared button styles for the DESA Menu page.
 * Square, mono, uppercase — matching the existing button language.
 */
const buttonBase =
  'group inline-flex items-center gap-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors';

/**
 * Smooth-scrolls to an in-page anchor while preventing default anchor
 * navigation (which would otherwise re-fire the router and, depending on
 * configuration, fight with ScrollToTop). Keeps scroll-mt offsets intact
 * so the target clears the fixed navbar.
 */
function scrollToHash(hash: string) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) {
    /* Fallback: let the native behavior at least update the URL. */
    window.location.hash = hash;
    return;
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  /* Update the URL without triggering scroll or adding a history entry
     that would fight with back navigation. */
  if (window.history?.replaceState) {
    const url = new URL(window.location.href);
    url.hash = `#${id}`;
    window.history.replaceState(null, '', url.toString());
  }
}

export function DesaButtonLink({
  to,
  children,
  variant = 'solid',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'lime';
  className?: string;
}) {
  const variants = {
    solid: 'bg-bone text-ink hover:bg-lime',
    lime: 'bg-lime text-ink hover:bg-bone',
    outline: 'border border-bone/25 text-bone hover:bg-bone hover:text-ink',
  } as const;

  return (
    <Link to={to} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function DesaButtonAnchor({
  href,
  children,
  variant = 'outline',
  className = '',
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'lime';
  className?: string;
  /** Optional extra click handler; runs after the default smooth-scroll logic. */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const variants = {
    solid: 'bg-bone text-ink hover:bg-lime',
    lime: 'bg-lime text-ink hover:bg-bone',
    outline: 'border border-bone/25 text-bone hover:bg-bone hover:text-ink',
  } as const;

  const isHash = href.startsWith('#');

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      /* Prevent the browser's hard jump to the anchor — it bypasses React
         and can cause a visible scroll flicker when the router re-evaluates
         the location. We handle the scroll ourselves with smooth behavior. */
      e.preventDefault();
      scrollToHash(href);
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${buttonBase} ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/** Small mono label pill used for tags and eyebrows. */
export function DesaTag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-block border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${
        accent ? 'border-lime/40 text-lime' : 'border-bone/20 text-fog'
      }`}
    >
      {children}
    </span>
  );
}
