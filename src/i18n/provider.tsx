/**
 * The provider lives on its own so this file exports only a component
 * (react-refresh likes it that way); hooks, registry and types come from core.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { en } from './en';
import type { Dict } from './en';
import { I18nContext, LANG_META, STORAGE_KEY, detectLang, fromLocaleTag, isLang, loadDict, lookup, preloadOtherLocales } from './core';
import type { I18nValue, Lang } from './core';

function readInitialLang(): Lang {
  /* The bootstrap script in index.html has already resolved this before first
     paint; re-reading keeps the provider correct if that script is skipped. */
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute('data-lang');
    if (isLang(attr)) return attr;
    const htmlLang = fromLocaleTag(document.documentElement.lang);
    if (htmlLang) return htmlLang;
  }
  return detectLang();
}

export function I18nProvider({
  children,
  initialLang,
  initialDict,
}: {
  children: ReactNode;
  /** Set by main.tsx (and tests) once the locale's dictionary is in memory. */
  initialLang?: Lang;
  initialDict?: Dict;
}) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? readInitialLang());
  const [dict, setDict] = useState<Dict>(() => initialDict ?? en);
  /* Guards against out-of-order chunk arrivals when someone clicks twice. */
  const request = useRef(0);

  const dir = LANG_META[lang].dir;

  /* Keep the document in step: `lang` drives font selection and hyphenation,
     `dir` drives the whole layout. Both flip in the same commit as the copy,
     so a switch never paints RTL words in an LTR layout or vice versa. */
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    root.setAttribute('data-lang', lang);
  }, [lang, dir]);

  /* Fetch the other three dictionaries once the app is interactive; by the
     time a visitor reaches for the switcher they are usually already here. */
  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (typeof idle === 'function') {
      const handle = idle(() => preloadOtherLocales(lang));
      return () => {
        const cancel = (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
        if (typeof cancel === 'function') cancel(handle);
      };
    }
    const timer = window.setTimeout(() => preloadOtherLocales(lang), 1500);
    return () => window.clearTimeout(timer);
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const id = ++request.current;
      /* Hold the current language on screen until the next dictionary is in
         memory: switching swaps the words and the direction in one commit
         instead of flashing English while the chunk downloads. */
      void loadDict(next)
        .then((loaded) => {
          if (id !== request.current) return;
          setDict(loaded);
          setLangState(next);
          try {
            window.localStorage.setItem(STORAGE_KEY, next);
          } catch {
            /* storage unavailable — the session still switches, it just will not persist */
          }
        })
        .catch(() => {
          /* chunk failed to load: stay on the current language rather than
             leaving the interface in a half-switched state */
        });
    },
    [lang],
  );

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dir,
      dict,
      setLang,
      t: (path) => {
        const hit = lookup(dict, path) ?? lookup(en, path);
        return typeof hit === 'string' ? hit : (path as string);
      },
      tl: (path) => {
        const hit = lookup(dict, path) ?? lookup(en, path);
        return Array.isArray(hit) ? (hit as string[]) : [];
      },
    }),
    [lang, dir, dict, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
