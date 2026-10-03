import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Shared button styles for the DESA Menu page.
 * Square, mono, uppercase — matching the agency's existing button language.
 */
const buttonBase =
  'group inline-flex items-center gap-2 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors';

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
}: {
  href: string;
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
    <a href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
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
