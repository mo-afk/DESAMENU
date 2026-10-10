#!/usr/bin/env node
/**
 * Vendor the official DESA Menu logo as a complete local icon set.
 *
 * The head markup in `index.html` points the favicon, the shortcut icon and the
 * Apple touch icon straight at the CDN file, which works everywhere but leaves
 * the tab icon dependent on a third-party host and gives browsers nothing for
 * the sizes they ask for by name (`/favicon.ico`, `apple-touch-icon.png`,
 * manifest icons). This script downloads that one file and derives the whole
 * set from it, so the artwork is never redrawn by hand.
 *
 *   npm run icons                     download from src/lib/brand.ts and build
 *   npm run icons -- --apply          …and repoint index.html at the local set
 *   npm run icons -- --source a.png   build from a local copy of the logo
 *   npm run icons -- --out /tmp/icons preview the output somewhere else
 *
 * Needs ImageMagick (`magick` or `convert`) on PATH. Nothing is written unless
 * every step succeeds, so a failed run leaves the repository untouched.
 */

import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BRAND_FILE = path.join(ROOT, 'src/lib/brand.ts');
const INDEX_FILE = path.join(ROOT, 'index.html');

/** Brand surfaces: the dark backdrop the light mark is designed to sit on. */
const BRAND_BG = '#0a0a0b';
const THEME_COLOR = '#0a0a0b';

/* ------------------------------------------------------------------ CLI --- */

function parseArgs(argv) {
  const args = { apply: false, out: path.join(ROOT, 'public'), source: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--apply') args.apply = true;
    else if (arg === '--source') args.source = argv[++i];
    else if (arg === '--out') args.out = path.resolve(argv[++i]);
    else if (arg === '--help' || arg === '-h') args.help = true;
    else fail(`unknown argument: ${arg} (try --help)`);
  }
  return args;
}

const USAGE = `Usage: npm run icons -- [options]

  --source <url|file>  build from this logo instead of BRAND_LOGO_URL
  --out <dir>          write here instead of public/
  --apply              also repoint the icon links in index.html
`;

function fail(message) {
  console.error(`\n[icons] ${message}\n`);
  process.exit(1);
}

/* ------------------------------------------------------- brand metadata --- */

/** The single source of truth for the logo URL is src/lib/brand.ts. */
function readBrandLogoUrl() {
  try {
    const source = readFileSync(BRAND_FILE, 'utf8');
    return /BRAND_LOGO_URL\s*=\s*['"]([^'"]+)['"]/.exec(source)?.[1] ?? null;
  } catch {
    return null;
  }
}

/* ----------------------------------------------------------- ImageMagick --- */

function run(binary, args) {
  const result = spawnSync(binary, args, { encoding: 'utf8' });
  if (result.error) fail(`could not run \`${binary}\`: ${result.error.message}`);
  if (result.status !== 0) {
    fail(`\`${binary} ${args.join(' ')}\` failed:\n${(result.stderr || result.stdout || '').trim()}`);
  }
  return (result.stdout || '').trim();
}

/**
 * Prefers ImageMagick 7 (`magick` / `magick identify`) and falls back to
 * ImageMagick 6 (`convert` / `identify`).
 */
function detectImageMagick() {
  const candidates = [
    { convert: ['magick'], identify: ['magick', 'identify'] },
    { convert: ['convert'], identify: ['identify'] },
  ];
  for (const im of candidates) {
    const probe = spawnSync(im.convert[0], ['-version'], { encoding: 'utf8' });
    if (!probe.error && probe.status === 0) return im;
  }
  fail(
    'ImageMagick is required but not on PATH.\n' +
      '         Install it first: brew install imagemagick  |  apt-get install imagemagick',
  );
}

let IM;

function convert(...args) {
  run(IM.convert[0], [...IM.convert.slice(1), ...args]);
}

/** `{ width, height, alpha }` for an image file. */
function measure(file) {
  const [w, h, alpha] = run(IM.identify[0], [...IM.identify.slice(1), '-format', '%w %h %A', file]).split(' ');
  return { width: Number(w), height: Number(h), alpha: alpha === 'Blend' || alpha === 'True' };
}

/* ------------------------------------------------------------ generators --- */

/** Transparent square PNG: the mark fitted inside `size` and centred. */
function transparentIcon(source, file, size) {
  convert(source, '-background', 'none', '-resize', `${size}x${size}`, '-gravity', 'center', '-extent', `${size}x${size}`, file);
}

/**
 * Opaque square PNG on the brand background, with the mark held inside
 * `ratio` of the canvas.
 *
 * Apple and Android both composite home-screen icons onto their own surfaces
 * and clip them to a mask, so transparency is not an option here: a
 * transparent PNG of a light mark turns into a light mark on a white tile —
 * effectively invisible. Padding keeps the mark clear of the mask's edges.
 */
function paddedIcon(source, file, size, ratio) {
  const fit = Math.round(size * ratio);
  convert(
    source,
    '-resize',
    `${fit}x${fit}`,
    '-background',
    BRAND_BG,
    '-gravity',
    'center',
    '-extent',
    `${size}x${size}`,
    '-flatten',
    '-alpha',
    'remove',
    file,
  );
}

/* ------------------------------------------------------------------ main --- */

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(USAGE);
    return;
  }

  IM = detectImageMagick();
  /* Where the head markup points today (brand.ts) and where the bytes come
     from — normally the same URL, unless --source overrides the artwork. */
  const brandUrl = readBrandLogoUrl();
  const sourceRef = args.source ?? brandUrl;
  if (!sourceRef) fail(`BRAND_LOGO_URL not found in ${path.relative(ROOT, BRAND_FILE)}; pass --source`);
  if (!brandUrl && args.apply) fail('--apply needs BRAND_LOGO_URL in src/lib/brand.ts to know which href to replace');
  const work = mkdtempSync(path.join(tmpdir(), 'desa-icons-'));

  try {
    /* 1. Get the artwork. */
    const source = path.join(work, 'logo.png');
    if (args.source && !/^https?:\/\//i.test(args.source)) {
      if (!existsSync(args.source)) fail(`--source file not found: ${args.source}`);
      copyFileSync(args.source, source);
      console.log(`[icons] source: ${args.source}`);
    } else {
      console.log(`[icons] downloading ${sourceRef}`);
      let response;
      try {
        response = await fetch(sourceRef);
      } catch (error) {
        fail(
          `could not reach the CDN (${error?.cause?.code || error?.message || 'network error'}).\n` +
            '         Run this on a machine that can reach the host, or save the logo\n' +
            '         yourself and pass it in: npm run icons -- --source ./logo.png',
        );
      }
      if (!response.ok) fail(`download failed: HTTP ${response.status} ${response.statusText}`);
      writeFileSync(source, Buffer.from(await response.arrayBuffer()));
    }

    /* 2. Trim the transparent margins the artwork was exported with, so every
          generated size pads the *mark* rather than its empty canvas. */
    const mark = path.join(work, 'mark.png');
    convert(source, '-trim', '+repage', mark);
    const trimmed = measure(mark);
    const usable = trimmed.width > 8 && trimmed.height > 8;
    const art = usable ? mark : source;
    const dims = usable ? trimmed : measure(source);
    console.log(`[icons] mark is ${dims.width}x${dims.height}px${dims.alpha ? ' with alpha' : ''}`);

    /* 3. Render the set. */
    const out = args.out;
    mkdirSync(out, { recursive: true });
    const written = [];
    const emit = (name, build) => {
      const file = path.join(out, name);
      build(file);
      written.push(name);
      const size = measure(file);
      console.log(`[icons]   ${name.padEnd(22)} ${size.width}x${size.height}`);
    };

    /* Multi-resolution .ico — the path browsers probe on their own, and the
       format old Windows, Firefox's per-site icon cache and assorted crawlers
       still ask for by name. */
    const icoSizes = [16, 24, 32, 48];
    const icoFrames = icoSizes.map((size) => {
      const frame = path.join(work, `frame-${size}.png`);
      transparentIcon(art, frame, size);
      return frame;
    });
    emit('favicon.ico', (file) => {
      convert('-background', 'none', ...icoFrames, file);
    });

    emit('favicon-192.png', (file) => transparentIcon(art, file, 192));
    /* The primary raster icon, named the way the head markup references it. */
    emit('favicon.png', (file) => transparentIcon(art, file, 512));
    emit('apple-touch-icon.png', (file) => paddedIcon(art, file, 180, 0.72));
    /* Android adaptive icons crop to a mask, so the mark stays inside the
       inner 80% safe zone. */
    emit('maskable-icon.png', (file) => paddedIcon(art, file, 512, 0.6));
    /* Solid-background social card — a transparent PNG as og:image composites
       onto white on most platforms, which swallows a light mark. */
    emit('og-image.png', (file) => {
      convert(
        art,
        '-resize',
        '360x360',
        '-background',
        BRAND_BG,
        '-gravity',
        'center',
        '-extent',
        '1200x630',
        '-flatten',
        '-alpha',
        'remove',
        file,
      );
    });

    /* 4. Manifest, with the sizes actually measured above. */
    const manifest = {
      name: 'DESA Menu',
      short_name: 'DESA Menu',
      description: 'Premium digital menu ecosystems for hospitality',
      start_url: '/',
      display: 'standalone',
      theme_color: THEME_COLOR,
      background_color: BRAND_BG,
      icons: [
        { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
        { src: '/maskable-icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    };
    writeFileSync(path.join(out, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
    written.push('site.webmanifest');
    console.log('[icons]   site.webmanifest');

    /* 5. Hand back the markup, or apply it to index.html. Each CDN link is
          swapped for the local file that serves the same role, so the head
          keeps its one-link-per-role shape. */
    const block = [
      '<link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />',
      '<link rel="shortcut icon" type="image/png" href="/favicon.ico" />',
      '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
      '<link rel="manifest" href="/site.webmanifest" />',
    ];

    if (!args.apply) {
      console.log(`\n[icons] wrote ${written.length} file(s) to ${describe(out)}`);
      console.log('[icons] replace the CDN icon links in index.html with:\n');
      for (const line of block) console.log(`         ${line}`);
      console.log('\n[icons] or re-run with --apply to do it automatically.');
      return;
    }

    const html = readFileSync(INDEX_FILE, 'utf8');
    const cdnIcon = new RegExp(`<link rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*href="${escapeRegExp(brandUrl)}"[^>]*/>`, 'g');
    const matches = html.match(cdnIcon);
    if (!matches) {
      const done = /<link rel="icon"[^>]*href="\/favicon\.png"/.test(html);
      console.log(
        done
          ? `\n[icons] wrote ${written.length} file(s); index.html already points at the local set`
          : `\n[icons] wrote ${written.length} file(s), but found no CDN icon links to replace in index.html`,
      );
      return;
    }
    let updated = html.replace(cdnIcon, (tag) => LOCAL_LINKS[/rel="([^"]+)"/.exec(tag)[1]] ?? tag);
    /* One manifest link, straight after the touch icon — added only if the
       head does not already have one. */
    if (!/rel="manifest"/.test(updated)) {
      updated = updated.replace(
        /(<link rel="apple-touch-icon"[^>]*\/>\n)/,
        '$1    <link rel="manifest" href="/site.webmanifest" />\n',
      );
    }
    writeFileSync(INDEX_FILE, updated);
    console.log(
      `\n[icons] wrote ${written.length} file(s) to ${describe(out)} and repointed` +
        ` ${matches.length} link(s) in index.html` +
        '\n[icons] trim the head comment there — it still describes the CDN setup',
    );
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** A repo-relative path when the output is inside the repo, absolute otherwise. */
function describe(dir) {
  const relative = path.relative(ROOT, dir);
  return !relative || relative.startsWith('..') ? dir : relative;
}

/** The local file each head role points at once the set is vendored. */
const LOCAL_LINKS = {
  icon: '<link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />',
  'shortcut icon': '<link rel="shortcut icon" type="image/png" href="/favicon.ico" />',
  'apple-touch-icon': '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
};

main().catch((error) => fail(error?.message || String(error)));
