import BrandLogo from '../BrandLogo';

/* ------------------------------------------------------------------ */
/* Mock QR components — pure markup, no external QR library.          */
/*                                                                    */
/* The code is a deterministic mock (it is never scanned in a demo),  */
/* but it is drawn like a real matrix — three finder eyes, timing     */
/* rows and an alignment square — with the official brand logo        */
/* sitting in the cleared centre, exactly like the table stands and   */
/* in-app menu headers that ship with a DESA Menu deployment.          */
/* ------------------------------------------------------------------ */

const SIZE = 25;
/** 7×7 modules of quiet space in the middle of the matrix for the logo. */
const LOGO_ZONE = { from: 9, to: 15 };

const FINDERS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0, SIZE - 7],
  [SIZE - 7, 0],
];
const ALIGNMENT = { row: SIZE - 9, col: SIZE - 9 };
const TIMING = 6;

/** Finder eye + its separator row/column, or `null` outside the block. */
function finderModule(r: number, c: number, row: number, col: number): boolean | null {
  if (r < row - 1 || r > row + 7 || c < col - 1 || c > col + 7) return null;
  if (r < row || r > row + 6 || c < col || c > col + 6) return false; // separator
  const rr = r - row;
  const cc = c - col;
  if (rr === 0 || rr === 6 || cc === 0 || cc === 6) return true; // outer ring
  if (rr === 1 || rr === 5 || cc === 1 || cc === 5) return false;
  return true; // 3×3 core
}

/** 5×5 alignment square with a dark ring and a dark centre. */
function alignmentModule(r: number, c: number): boolean | null {
  const { row, col } = ALIGNMENT;
  if (r < row || r > row + 4 || c < col || c > col + 4) return null;
  const rr = r - row;
  const cc = c - col;
  if (rr === 0 || rr === 4 || cc === 0 || cc === 4) return true;
  return rr === 2 && cc === 2;
}

/** Stable pseudo-random fill — the same matrix on every render and reload. */
function noise(r: number, c: number) {
  const n = Math.sin(r * 12.9898 + c * 78.233 + 3.7) * 43758.5453;
  return n - Math.floor(n) > 0.52;
}

function isDark(r: number, c: number) {
  if (r >= LOGO_ZONE.from && r <= LOGO_ZONE.to && c >= LOGO_ZONE.from && c <= LOGO_ZONE.to) {
    return false; // cleared for the brand mark
  }
  for (const [row, col] of FINDERS) {
    const value = finderModule(r, c, row, col);
    if (value !== null) return value;
  }
  const alignment = alignmentModule(r, c);
  if (alignment !== null) return alignment;
  if (r === TIMING || c === TIMING) return (r + c) % 2 === 0;
  return noise(r, c);
}

/** Every dark module as one path — a single node instead of 600 rects. */
const MODULE_PATH = (() => {
  let d = '';
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      if (isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  return d;
})();

interface QrProps {
  className?: string;
}

/**
 * Mock QR code with the official brand mark in its centre.
 * Decorative by default — pass a label when it stands alone.
 */
export function BrandQr({ className = 'h-24 w-24' }: QrProps) {
  return (
    <div className={`relative bg-bone ${className}`}>
      {/* Absolute insets give the code definite geometry: a flex child with a
          percentage height inside a percentage-padded box is the kind of
          sizing that can collapse to zero and leave an empty light plate. */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-[7%] text-ink"
        shapeRendering="crispEdges"
        aria-hidden="true"
        focusable="false"
      >
        <path d={MODULE_PATH} fill="currentColor" />
      </svg>
      {/* Cleared zone → dark brand chip → official mark. The logo is a
          transparent PNG of the light mark, so the chip is what keeps it
          legible over the code's light background. */}
      <span className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ink">
        <BrandLogo className="h-[76%] w-auto max-w-[76%]" alt="" />
      </span>
    </div>
  );
}

interface StandProps {
  /** Venue name printed on the stand. */
  venue?: string;
  /** Table label — reinforces the "scan at the table" story. */
  table?: string;
  className?: string;
}

/**
 * Mock table stand: the printed card a venue drops on every table, carrying the
 * QR (branded in its centre) and the DESA Menu mark along the bottom.
 */
export default function DesaQrStand({ venue = 'La Terrasse', table = 'Table 07', className = '' }: StandProps) {
  return (
    <div className={`flex flex-col items-center ${className}`} role="img" aria-label={`DESA Menu table stand for ${venue}: a branded QR code, a scan-for-the-menu prompt and the DESA Menu logo.`}>
      <div className="w-full max-w-[260px] border border-bone/20 bg-coal/95 px-6 py-7 text-center shadow-[0_40px_90px_-45px_rgba(0,0,0,0.95)] backdrop-blur-sm">
        <BrandQr className="mx-auto h-32 w-32" />

        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-lime">Scan for the menu</p>
        <p className="mt-2 font-display text-lg uppercase leading-none">{venue}</p>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">{table}</p>

        <span className="mt-5 flex items-center justify-center gap-2.5 border-t border-bone/10 pt-4">
          <BrandLogo className="h-4 w-auto max-w-[96px]" alt="" loading="lazy" />
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-smoke">DESA Menu</span>
        </span>
      </div>

      {/* Folded card base */}
      <span aria-hidden className="h-3.5 w-[58%] border-x border-b border-bone/15 bg-carbon" />
      <span aria-hidden className="h-1.5 w-[74%] bg-bone/10 blur-[3px]" />
    </div>
  );
}
