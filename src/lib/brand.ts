/**
 * Official DESA brand assets — the single source of truth for the logo.
 *
 * The logo is served from the DESA CDN as a transparent PNG, so it drops onto
 * the dark interface without a backing box. Every surface (navbar, footer,
 * favicon, social preview, QR stands and the in-app header previews) points at
 * this one file — swap the URL here and the whole application follows.
 *
 * `index.html` cannot import this module, so the same URL also appears there
 * for the favicon and the Open Graph / Twitter meta tags. Keep the two in sync.
 *
 * Colour assumption: the artwork is the light mark (bone/lime) the interface
 * already used, so it is placed on dark surfaces everywhere. The one exception
 * is the mock QR code, whose code area must stay light — `DesaQr` therefore
 * sets the mark on a dark chip inside the code's cleared zone. If the artwork
 * ever becomes a *dark* mark, that chip is the single place to flip.
 */
export const BRAND_LOGO_URL =
  'https://pub-29827e9bf6264adc912660207eecba67.r2.dev/image.png_20261006110214-removebg-preview.png';

/** MIME type of the hosted asset — kept next to the URL so they move together. */
export const BRAND_LOGO_TYPE = 'image/png';

export const BRAND = {
  /** Product name — used in copy, alt text and structured labels. */
  name: 'DESA Menu',
  /** One-line descriptor shown beside the mark in the navbar and footer. */
  tagline: 'Digital menu ecosystem',
  /** Official brand logo — transparent PNG (the mark used everywhere). */
  logo: BRAND_LOGO_URL,
  logoAlt: 'DESA Menu',
  /** Site icon — the official logo asset. */
  favicon: BRAND_LOGO_URL,
  /** Social preview image for `og:image` / `twitter:image`. */
  ogImage: BRAND_LOGO_URL,
  ogImageAlt: 'DESA Menu — official brand logo',
  /** The agency that builds and operates DESA Menu. */
  agency: 'DESA Agency',
} as const;
