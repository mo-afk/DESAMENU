import { createContext, useContext } from 'react';
import { en } from './en';
import type { Dict } from './en';

/* ------------------------------------------------------------------ */
/* Language registry                                                   */
/* ------------------------------------------------------------------ */

export const LANGS = ['en', 'fr', 'ar', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_META: Record<Lang, { label: string; native: string; dir: 'ltr' | 'rtl' }> = {
  en: { label: 'EN', native: 'English', dir: 'ltr' },
  fr: { label: 'FR', native: 'Français', dir: 'ltr' },
  ar: { label: 'AR', native: 'العربية', dir: 'rtl' },
  es: { label: 'ES', native: 'Español', dir: 'ltr' },
};

/** Shared with the inline bootstrap script in index.html — keep in sync. */
export const STORAGE_KEY = 'desa-menu:lang';

/**
 * Dictionaries are code-split: English travels in the main bundle (it is the
 * default and the fallback), the other three are fetched the first time they
 * are needed and cached for the session. A locale costs the visitor who uses
 * it roughly nothing, instead of taxing everyone with four copies of the copy.
 */
const LOADERS: Record<Lang, () => Promise<Dict>> = {
  en: async () => en,
  fr: async () => (await import('./fr')).fr,
  ar: async () => (await import('./ar')).ar,
  es: async () => (await import('./es')).es,
};

const cache: Partial<Record<Lang, Dict>> = { en };

/** Resolve a dictionary, loading its chunk on first use. */
export async function loadDict(lang: Lang): Promise<Dict> {
  const hit = cache[lang];
  if (hit) return hit;
  const dict = await LOADERS[lang]();
  cache[lang] = dict;
  return dict;
}

/** Warm every other locale once the app is idle, so switching feels instant. */
export function preloadOtherLocales(current: Lang): void {
  for (const lang of LANGS) {
    if (lang !== current && !cache[lang]) {
      void loadDict(lang).catch(() => {
        /* offline or blocked — the switch will retry on demand */
      });
    }
  }
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/** `fr-CA` → `fr`; anything unsupported falls back to English. */
export function fromLocaleTag(tag: string | undefined | null): Lang | null {
  if (!tag) return null;
  const base = tag.toLowerCase().split('-')[0];
  return isLang(base) ? base : null;
}

/** Stored choice first, then the browser's own preference, then English. */
export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* private mode / storage disabled — fall through to the browser locale */
  }
  const tags = [navigator.language, ...(navigator.languages ?? [])];
  for (const tag of tags) {
    const match = fromLocaleTag(tag);
    if (match) return match;
  }
  return 'en';
}

/* ------------------------------------------------------------------ */
/* Lookup                                                             */
/* ------------------------------------------------------------------ */

export function lookup(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, source);
}

/** Keys addressable through `t()` / `tl()`. `content` is resolved separately. */
type Translatable = Omit<Dict, 'content'>;

type Paths<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends readonly unknown[]
      ? never
      : T[K] extends object
        ? `${K}.${Paths<T[K]>}`
        : never;
}[keyof T & string];

export type StringPath = Paths<Translatable>;

type ArrayPaths<T> = {
  [K in keyof T & string]: T[K] extends string ? never : T[K] extends readonly unknown[] ? K : T[K] extends object ? `${K}.${ArrayPaths<T[K]>}` : never;
}[keyof T & string];

export type ArrayPath = ArrayPaths<Translatable>;

/* ------------------------------------------------------------------ */
/* Context                                                            */
/* ------------------------------------------------------------------ */

export interface I18nValue {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  /** The active dictionary — use it for structured content (lists, objects). */
  dict: Dict;
  setLang: (lang: Lang) => void;
  /** One string by dot path. Falls back to English, then to the path itself. */
  t: (path: StringPath) => string;
  /** One string array by dot path. */
  tl: (path: ArrayPath) => string[];
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}

export type { Dict };
