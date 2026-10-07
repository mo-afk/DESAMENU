import { BadgeCheck, Brain, Dices, Disc3, Play, Puzzle } from 'lucide-react';
import type { ReactElement } from 'react';
import type { PanelKey } from '../../lib/features';
import { DesaTag } from './DesaUI';
import { useI18n } from '../../i18n';

/* ------------------------------------------------------------------ */
/* Bespoke mock panels — pure markup, no external assets.              */
/* Shared by the feature grid, the games tabs and the detail pages so   */
/* a capability looks identical wherever it appears.                    */
/* ------------------------------------------------------------------ */

/** Video menus — a dish loop with progress. */
export function VideoPanel() {
  const { t } = useI18n();
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-end gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-1 border ${i === 1 ? 'h-16 border-ember/50 bg-gradient-to-b from-ember/[0.18] to-honey/[0.06]' : 'h-10 border-bone/15'} transition-all duration-500 group-hover:h-16`}>
            {i === 1 && (
              <span className="flex h-full items-center justify-center">
                <Play className="h-3 w-3 text-honey" />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-2/3 bg-gradient-to-r from-ember to-honey transition-all duration-700 group-hover:w-[88%]" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{t('panels.cinematic')}</p>
    </div>
  );
}

/** Text menus — structured rows with prices. */
export function MenuPanel() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {[
        { w: '72%', p: '42%' },
        { w: '88%', p: '30%' },
        { w: '56%', p: '36%' },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 bg-lime" />
          <span className="flex-1">
            <span className="block h-[6px] bg-bone/20 transition-colors duration-500 group-hover:bg-bone/30" style={{ width: row.w }} />
            <span className="mt-1.5 block h-[4px] bg-bone/10" style={{ width: row.p }} />
          </span>
          <span className="font-mono text-[10px] text-smoke">€</span>
        </div>
      ))}
    </div>
  );
}

/** Gamified dining — the suite in miniature. */
export function GamePanel() {
  const { t } = useI18n();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        {['A', 'B', 'C'].map((l, i) => (
          <span key={l} className={`flex h-8 w-8 items-center justify-center border font-mono text-[11px] transition-all ${i === 2 ? 'border-ember bg-ember text-ink' : 'border-bone/20 text-fog'}`}>
            {l}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 border border-bone/15 px-3 py-1.5">
        <Dices className="h-3 w-3 text-honey" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/85">
          {t('panels.whoPays')} — <span className="text-honey">{t('device.gameResult')}</span>
        </span>
      </div>
      <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-smoke">
        <span className="inline-flex items-center gap-1"><Disc3 className="h-3 w-3" />{t('panels.spinner')}</span>
        <span className="inline-flex items-center gap-1"><Brain className="h-3 w-3" />{t('panels.tasteTitle')}</span>
        <span className="inline-flex items-center gap-1"><Puzzle className="h-3 w-3" />{t('games.wholeSuite')}</span>
      </div>
    </div>
  );
}

/** Loyalty — card with stamps. */
export function LoyaltyPanel() {
  const { t } = useI18n();
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-lime">{t('panels.loyaltyName')}</span>
        <span className="text-smoke">{t('panels.loyaltyProgress')}</span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((d) => (
          <span key={d} className={`flex h-7 flex-1 items-center justify-center border ${d < 3 ? 'border-lime/40 bg-lime/[0.1] text-lime' : 'border-bone/10 text-smoke/40'}`}>
            <BadgeCheck className="h-3 w-3" />
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-3/5 bg-lime transition-all duration-700 group-hover:w-4/5" />
      </div>
    </div>
  );
}

/** Who Pays? — bill roulette landing on a seat. */
export function RoulettePanel() {
  const { t } = useI18n();
  const seats = [t('panels.seatYou'), 'Maya', 'Sam', 'Luca'];
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-honey">{t('panels.whoPays')}</span>
        <span className="text-smoke">{t('panels.billRoulette')}</span>
      </div>
      <div className="flex items-center gap-2">
        {seats.map((s, i) => (
          <span
            key={s}
            className={`flex-1 border px-2 py-2 text-center font-mono text-[10px] transition-all duration-500 ${
              i === 2 ? 'border-ember/60 bg-ember/[0.16] text-bone' : 'border-bone/15 text-fog'
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-2/3 bg-gradient-to-r from-ember to-honey transition-all duration-700 group-hover:w-full" />
      </div>
      <div className="flex items-center gap-2 border border-bone/15 px-3 py-2">
        <Dices className="h-3 w-3 shrink-0 text-honey" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-bone/85">
          {t('panels.landingOn')} <span className="text-honey">Sam</span> {t('panels.coversRound')}
        </span>
      </div>
    </div>
  );
}

/** Ideal Combo Spinner — wheel plus the pairing it lands on. */
export function SpinnerPanel() {
  const { t } = useI18n();
  return (
    <div className="flex h-full items-center gap-5">
      <div className="relative h-24 w-24 shrink-0 transition-transform duration-700 group-hover:rotate-[150deg]">
        <div
          aria-hidden
          className="h-full w-full rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, var(--color-ember) 0deg 45deg, var(--color-carbon) 45deg 90deg, var(--color-honey) 90deg 135deg, var(--color-carbon) 135deg 180deg, var(--color-ember) 180deg 225deg, var(--color-carbon) 225deg 270deg, var(--color-honey) 270deg 315deg, var(--color-carbon) 315deg 360deg)',
          }}
        />
        <div aria-hidden className="absolute inset-[26%] rounded-full bg-carbon" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.15em] text-bone">
          {t('panels.spinner')}
        </span>
        <span aria-hidden className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-lime" />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-honey">{t('panels.idealCombo')}</p>
        <p className="mt-2 font-display text-sm uppercase leading-tight text-bone">
          {t('panels.comboPair')} <span className="text-smoke">+</span> {t('panels.comboPairSecond')}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
          {t('panels.comboCaveat')}
        </p>
      </div>
    </div>
  );
}

/** Taste & Personality Quiz — questions landing on a curated selection. */
export function QuizPanel() {
  const { t, tl } = useI18n();
  const answers = tl('panels.tasteAnswers');
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="text-honey">{t('panels.tasteTitle')}</span>
        <span className="text-smoke">{t('panels.tasteProgress')}</span>
      </div>
      <p className="text-sm leading-snug text-bone/85">{t('panels.tasteQuestion')}</p>
      <div className="flex flex-wrap gap-1.5">
        {answers.map((a, i) => (
          <span
            key={a}
            className={`border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
              i === 1 ? 'border-ember/60 bg-ember/[0.16] text-bone' : 'border-bone/15 text-fog'
            }`}
          >
            {a}
          </span>
        ))}
      </div>
      <div className="h-[3px] w-full bg-bone/10">
        <div className="h-full w-3/4 bg-gradient-to-r from-ember to-honey" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-lime">
        {t('panels.tasteResult')}
      </p>
    </div>
  );
}

/** Custom games & loyalty micro-interactions — the configurable layer. */
export function MicroPanel() {
  const { tl } = useI18n();
  const chips = tl('panels.microChips');
  return (
    <div className="flex h-full flex-wrap items-start gap-2">
      {chips.map((c) => (
        <DesaTag key={c}>{c}</DesaTag>
      ))}
    </div>
  );
}

const PANELS: Record<PanelKey, () => ReactElement> = {
  video: VideoPanel,
  menu: MenuPanel,
  game: GamePanel,
  loyalty: LoyaltyPanel,
  roulette: RoulettePanel,
  spinner: SpinnerPanel,
  quiz: QuizPanel,
  micro: MicroPanel,
};

/** Renders the mock panel for a feature entry by key. */
export function FeaturePanel({ name }: { name: PanelKey }) {
  const Panel = PANELS[name] ?? VideoPanel;
  return <Panel />;
}
