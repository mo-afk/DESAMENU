import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { LANGS, LANG_META, useI18n } from '../i18n';
import type { Lang } from '../i18n';

/**
 * Language selector.
 *
 * `variant="navbar"` is the control in the top bar, next to *Book a Demo*. It
 * is the same badge at two densities so it stays prominent without ever pushing
 * the CTA off the row:
 *
 *  - below `xl` — the compact badge: globe + current code, opening a dropdown.
 *    Between 1024 and 1280 the bar already carries the wordmark and five nav
 *    links, so the four codes would be the thing that overflows.
 *  - from `xl` — the full segmented control: globe + `EN | FR | AR | ES`, every
 *    language one tap away and the active one lit, so the control reads as a
 *    language selector at a glance rather than a mystery icon.
 *
 * `variant="inline"` is the four-button row for the mobile menu overlay.
 *
 * The codes are Latin and pinned `dir="ltr"` in both variants: the order
 * `EN FR AR ES` should not shuffle when Arabic flips the page, or every switch
 * to and from RTL would move the target under the reader's thumb.
 */
export default function LanguageSwitcher({ variant = 'navbar' }: { variant?: 'navbar' | 'inline' }) {
  if (variant === 'inline') return <InlineRow />;
  return (
    <>
      <Segmented className="hidden xl:inline-flex" />
      <CompactDropdown className="inline-flex xl:hidden" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* xl and up — every language visible as a segment                     */
/* ------------------------------------------------------------------ */

function Segmented({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('nav.switchAria')}
      className={`h-10 shrink-0 items-stretch border border-bone/10 bg-coal/80 backdrop-blur-sm transition-colors hover:border-honey/50 ${className}`}
    >
      <span aria-hidden className="flex w-8 items-center justify-center border-e border-bone/10 text-honey">
        <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>

      {/* Fixed reading order regardless of page direction. */}
      <div dir="ltr" className="flex items-stretch divide-x divide-bone/10">
        {LANGS.map((code) => {
          const active = code === lang;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={active}
              aria-current={active ? 'true' : undefined}
              title={LANG_META[code].native}
              className={`flex items-center px-2.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-lime ${
                active
                  ? 'bg-lime/15 text-lime'
                  : 'text-bone/45 hover:bg-bone/[0.05] hover:text-bone'
              }`}
            >
              {LANG_META[code].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* below xl — one badge, current code, full list on open               */
/* ------------------------------------------------------------------ */

function CompactDropdown({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  /* Close on outside click and on Escape — the two things a menu is expected
     to do, and neither is worth a dependency. */
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div ref={wrapper} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.switchAria')}
        className={`inline-flex h-10 items-center gap-2 border bg-coal/80 ps-3 pe-2.5 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-lime ${
          open
            ? 'border-honey/60 bg-carbon/80 text-bone'
            : 'border-bone/10 text-bone/80 hover:border-honey/50 hover:text-bone'
        }`}
      >
        <Globe className="h-3.5 w-3.5 shrink-0 text-honey" strokeWidth={1.5} />
        <span>{LANG_META[lang].label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-bone/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div className="absolute end-0 top-[calc(100%+8px)] z-[120] min-w-[196px] border border-bone/10 bg-coal/95 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <p className="border-b border-bone/10 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.3em] text-fog">
            {t('nav.switchLabel')}
          </p>
          <ul role="listbox" aria-label={t('nav.switchLabel')}>
            {LANGS.map((code) => {
              const active = code === lang;
              return (
                <li key={code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => choose(code)}
                    className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-start transition-colors focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-lime ${
                      active ? 'bg-lime/10 text-lime' : 'text-bone/80 hover:bg-bone/[0.05] hover:text-bone'
                    }`}
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{LANG_META[code].label}</span>
                      <span className="text-sm">{LANG_META[code].native}</span>
                    </span>
                    {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* mobile menu — one tap per language, no menu to open                 */
/* ------------------------------------------------------------------ */

function InlineRow() {
  const { lang, setLang, t } = useI18n();

  return (
    <div role="group" aria-label={t('nav.switchAria')} className="flex flex-wrap items-center gap-2">
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`inline-flex items-center gap-2 border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
              active
                ? 'border-lime bg-lime/15 text-lime'
                : 'border-bone/10 bg-coal/80 text-bone/70 hover:border-honey/50 hover:text-bone'
            }`}
          >
            <span>{LANG_META[code].label}</span>
            <span className="text-[10px] normal-case tracking-normal opacity-70">{LANG_META[code].native}</span>
          </button>
        );
      })}
    </div>
  );
}
