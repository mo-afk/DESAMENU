import { useState } from 'react';
import { BRAND } from '../lib/brand';
import { LogoMark } from './Logo';

interface Props {
  /** Sizing utilities — always paired with `object-contain` for the image. */
  className?: string;
  alt?: string;
  loading?: 'eager' | 'lazy';
  /** Classes for the vector fallback; falls back to `className` when omitted. */
  fallbackClassName?: string;
}

/**
 * The official DESA Menu logo.
 *
 * Renders the hosted brand asset and, if that request fails for any reason
 * (offline preview, CDN hiccup, blocked request), silently swaps in the inline
 * SVG monogram so the interface is never left without a brand mark.
 *
 * Sizing: pass a height (`h-9`) and let the width follow the asset's own aspect
 * ratio (`w-auto`). `object-contain` keeps it undistorted if a max-width bites.
 */
export default function BrandLogo({
  className = 'h-9 w-auto',
  alt = BRAND.logoAlt,
  loading = 'eager',
  fallbackClassName,
}: Props) {
  const [failed, setFailed] = useState(false);
  const decorative = alt === '';

  if (failed) {
    return <LogoMark className={fallbackClassName ?? className} decorative={decorative} />;
  }

  return (
    <img
      src={BRAND.logo}
      alt={alt}
      /* The navbar and hero marks load eagerly with the first paint; footer and
         stand marks stay lazy. No priority hint: the transparent PNG is small
         and should not compete with the page's own LCP image. */
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      aria-hidden={decorative || undefined}
      className={`object-contain ${className}`}
    />
  );
}
