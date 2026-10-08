import { Dices } from 'lucide-react';
import type { ProjectFeature } from '../lib/api';

/**
 * The tailored capability pills for one venue.
 *
 * Two families, deliberately different so the comparison is instant:
 *
 *  - **module** pills wear the neutral outline used for capability chips
 *    everywhere else on the site (`Video Menu`, `Multi-Language`,
 *    `Direct Ordering`).
 *  - **game** pills take the honey accent and the dice mark, matching how
 *    table games are signed elsewhere — so a glance down the row tells you
 *    which venues run games and which do not.
 *
 * `size="sm"` is the compact form for the list rows and the detail header;
 * `size="md"` is the card form.
 */
export function FeaturePills({
  features,
  size = 'md',
  limit,
  className = '',
}: {
  features: ProjectFeature[];
  size?: 'sm' | 'md';
  /** Show at most this many, then a "+n" marker. */
  limit?: number;
  className?: string;
}) {
  const shown = typeof limit === 'number' ? features.slice(0, limit) : features;
  const hidden = features.length - shown.length;

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {shown.map((feature) => {
        const game = feature.kind === 'game';
        return (
          <li
            key={feature.label}
            className={`inline-flex items-center gap-1.5 border font-mono uppercase ${
              size === 'sm'
                ? 'px-2.5 py-1 text-[10px] tracking-[0.15em]'
                : 'px-3 py-1.5 text-[10px] tracking-[0.18em]'
            } ${
              game
                ? 'border-honey/40 bg-honey/[0.07] text-honey'
                : 'border-bone/20 bg-bone/[0.03] text-bone/75'
            }`}
          >
            {game && <Dices className="h-3 w-3 shrink-0" strokeWidth={1.6} />}
            {feature.label}
          </li>
        );
      })}
      {hidden > 0 && (
        <li className="font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">+{hidden}</li>
      )}
    </ul>
  );
}
