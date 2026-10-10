/**
 * Official DESA brand assets — the single source of truth for the logo.
 *
 * The logo is served from the DESA CDN as a transparent PNG, so it drops onto
 * the dark interface without a backing box. Every surface (navbar, footer,
 * favicon, social preview, QR stands and the in-app header previews) points at
 * this one file — swap the URL here and the whole application follows.
 *
 * `index.html` cannot import this module, so the same URL also appears there
 * for the favicon, the Apple touch icon and the Open Graph / Twitter meta
 * tags. Keep the two in sync.
 *
 * Two more places follow this URL: `/favicon.ico` — the path browsers probe on
 * their own, without reading the head — 302s to it (`vite-plugin-favicon.ts` in
 * dev and preview, `vercel.json` on Vercel), and `npm run icons` downloads it to
 * vendor a local raster set (favicon.ico, apple-touch-icon, manifest and
 * og-image PNGs) in `public/`.
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

/**
 * Official DESA contact details — the single source of truth for the email
 * address, phone / WhatsApp number and Instagram profile shown across the site
 * (navbar, footer, contact sections and the contact page sidebar). Every
 * surface imports from here, so updating a value in this one file updates the
 * whole application. Phone and WhatsApp are the same number.
 */
export const CONTACT = {
  /** Official email address. */
  email: 'desacontact.01@gmail.com',
  /** Clickable `mailto:` form of the email. */
  emailHref: 'mailto:desacontact.01@gmail.com',
  /** Official phone / WhatsApp number, formatted for display. */
  phone: '+212 638-212496',
  /** Clickable `tel:` form of the number (digits only, country code first). */
  phoneHref: 'tel:+212638212496',
  /** Clickable WhatsApp deep link for the same number. */
  whatsappHref: 'https://wa.me/212638212496',
  /** Official Instagram profile. */
  instagram: 'https://instagram.com/desa_menu/',
  /** Instagram handle, formatted for display. */
  instagramHandle: '@desa_menu',
} as const;
