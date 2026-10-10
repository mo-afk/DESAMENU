import type { SVGProps } from 'react';

/**
 * TikTok glyph — the official music-note silhouette, drawn as a single
 * filled path to sit beside the other social icons (Instagram, Mail,
 * MessageCircle). Uses `fill="currentColor"` so it inherits the same
 * text-bone/text-lime colour as the lucide outline icons it sits next to,
 * and keeps a 24x24 viewBox so size classes (h-4 w-4, h-5 w-5) scale
 * identically to the adjacent lucide icons.
 */
export default function TikTokIcon({
  className = 'h-4 w-4',
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      {...rest}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.38a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.64a6.34 6.34 0 0 0 10.83 4.48A6.27 6.27 0 0 0 15.82 15V8.12a8.28 8.28 0 0 0 4.77 1.52V6.19a4.83 4.83 0 0 1-1-.50z" />
    </svg>
  );
}
