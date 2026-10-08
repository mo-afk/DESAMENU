/**
 * Public entry point for the i18n layer. Code imports everything from here;
 * the provider itself lives in `provider.tsx` and the rest in `core.ts`.
 */
export * from './core';
export { I18nProvider } from './provider';
export { en } from './en';
