import { ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n';

/** `'#'`, an empty string or a missing value all mean "not configured yet". */
const isPlaceholder = (url?: string) => !url || url.trim() === '' || url.trim().startsWith('#');

/**
 * Secondary action on a venue: open that venue's own live menu in a new tab.
 *
 * Until a venue's `externalMenuUrl` is filled in, the button renders in a
 * disabled state rather than as a link to `#` — an anchor that opens a blank
 * tab is worse than one that visibly is not ready. Paste a real URL into
 * `api/seed-data.js` and this becomes a live `target="_blank"` link with no
 * other change.
 */
export default function LiveMenuButton({
  url,
  venue,
  size = 'sm',
  className = '',
}: {
  url: string;
  /** Venue name, appended to the accessible label so a page of cards reads clearly. */
  venue: string;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const { t } = useI18n();

  const base =
    'inline-flex items-center gap-2 border font-mono uppercase tracking-[0.2em] transition-colors';
  const look =
    size === 'lg'
      ? 'border-bone/25 px-6 py-4 text-xs text-bone hover:bg-bone hover:text-ink'
      : 'border-bone/20 min-h-12 px-4 py-2.5 text-[10px] text-bone/80 hover:border-lime hover:text-lime';

  if (isPlaceholder(url)) {
    return (
      <span
        aria-disabled="true"
        title={t('common.liveMenuSoon')}
        className={`${base} ${look} cursor-not-allowed opacity-45 ${className}`}
      >
        {t('common.viewLiveMenu')}
        <ExternalLink className={size === 'lg' ? 'h-4 w-4 shrink-0' : 'h-3.5 w-3.5 shrink-0'} strokeWidth={1.6} />
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('common.viewLiveMenu')} — ${venue}`}
      className={`${base} ${look} ${className}`}
    >
      {t('common.viewLiveMenu')}
      <ExternalLink className={size === 'lg' ? 'h-4 w-4 shrink-0' : 'h-3.5 w-3.5 shrink-0'} strokeWidth={1.6} />
    </a>
  );
}
