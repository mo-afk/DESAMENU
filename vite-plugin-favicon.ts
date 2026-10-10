import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Connect, Plugin, PreviewServer, ViteDevServer } from 'vite';

/**
 * Serves `/favicon.ico` — the path browsers probe on their own, without looking
 * at any `<link rel="icon">` — as a redirect to the official DESA logo.
 *
 * Why this exists: the brand mark is a PNG on the DESA CDN and the repository
 * holds no `.ico`, so `/favicon.ico` answered 404. Firefox, Safari and a long
 * tail of crawlers, bookmarking tools and in-app browsers request that exact
 * path regardless of the head markup, and a 404 leaves them with a blank or
 * generic globe instead of the logo.
 *
 * A redirect keeps a single source of truth (the CDN file named in
 * `src/lib/brand.ts`) instead of a second copy of the artwork drifting out of
 * sync. `npm run icons` can vendor a real `public/favicon.ico`; once that file
 * exists this middleware steps aside and Vite serves it statically.
 *
 * Production on Vercel gets the same behaviour from the `/favicon.ico` entry in
 * `vercel.json` — keep the two in sync.
 */

/** Used only if `src/lib/brand.ts` cannot be read or parsed. */
const FALLBACK_LOGO_URL =
  'https://pub-29827e9bf6264adc912660207eecba67.r2.dev/image.png_20261006110214-removebg-preview.png';

/** Reads BRAND_LOGO_URL out of the brand module so the icon never forks. */
export function readBrandLogoUrl(root: string): string {
  try {
    const source = readFileSync(path.resolve(root, 'src/lib/brand.ts'), 'utf8');
    const match = /BRAND_LOGO_URL\s*=\s*['"]([^'"]+)['"]/.exec(source);
    return match?.[1] ?? FALLBACK_LOGO_URL;
  } catch {
    return FALLBACK_LOGO_URL;
  }
}

export default function faviconRedirect(): Plugin {
  let logoUrl = FALLBACK_LOGO_URL;
  let publicDir = 'public';

  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const pathname = (req.url ?? '/').split('?')[0];
    if (pathname !== '/favicon.ico') return next();

    /* A vendored public/favicon.ico wins — this middleware is only the
       fallback for when the repository has no local .ico. */
    if (existsSync(path.resolve(publicDir, 'favicon.ico'))) return next();

    res.statusCode = 302;
    res.setHeader('Location', logoUrl);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.end();
  };

  return {
    name: 'desa-favicon-redirect',
    configResolved(config) {
      logoUrl = readBrandLogoUrl(config.root);
      publicDir = config.publicDir;
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use(middleware);
      server.config.logger.info('[favicon] /favicon.ico → 302 ' + logoUrl);
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(middleware);
    },
  };
}
