import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import { LANGS, LANG_META, useI18n } from '../i18n';
import type { Lang } from '../i18n';

/**
 * Language selector.
 *
 * `variant="dropdown"` is the navbar control: a compact globe + current code
 * that opens the full list, so the brand wordmark and the CTA keep their room
 * on narrow desktop widths.
 *
 * `variant="inline"` is the full four-way row used inside the mobile menu
 * overlay, where the space is free and a one-tap choice is faster.
 */
export default function LanguageSwitcher({ variant = 'dropdown' }: { variant?: 'dropdown' | 'inline' }) {
  const { lang, setLang, t } = useI18n();

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('nav.switchAria')}>
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={code === lang}
            className={`inline-flex items-center gap-2 border px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
              code === lang ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-bone/70 hover:border-bone hover:text-bone'
            }`}
          >
            <span>{LANG_META[code].label}</span>
            <span className="text-[10px] normal-case tracking-normal opacity-70">{LANG_META[code].native}</span>
          </button>
        ))}
      </div>
    );
  }

  return <LanguageDropdown />;
}

function LanguageDropdown() {
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
    <div ref={wrapper} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.switchAria')}
        className={`inline-flex h-11 items-center gap-2 border px-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
          open ? 'border-lime text-lime' : 'border-bone/20 text-bone/80 hover:border-bone hover:text-bone'
        }`}
      >
        <Globe className="h-4 w-4" strokeWidth={1.5} />
        <span>{LANG_META[lang].label}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('nav.switchLabel')}
          className="absolute end-0 top-[calc(100%+8px)] z-[120] min-w-[168px] border border-bone/20 bg-coal/98 py-1 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md"
        >
          {LANGS.map((code) => {
            const active = code === lang;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(code)}
                  className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-start transition-colors ${
                    active ? 'text-lime' : 'text-bone/80 hover:bg-bone/[0.04] hover:text-bone'
                  }`}
                >
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs uppercase tracking-[0.2em]">{LANG_META[code].label}</span>
                    <span className="text-sm">{LANG_META[code].native}</span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
