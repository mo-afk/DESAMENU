import { useI18n } from './index';
import type { FeatureEntry } from '../lib/features';

export interface LocalizedFeature extends FeatureEntry {
  /** True when this locale carries its own copy rather than falling back. */
  localized: boolean;
}

/**
 * Resolve feature/game entries for the active language.
 *
 * Structure (slug, icon, panel, numbering) always comes from `lib/features.ts`;
 * only the words are localised. Every locale now supplies every field, cards
 * and long-form essays included; the per-field fallback remains so that adding
 * an entry to `lib/features.ts` renders English rather than an empty page while
 * its translations are written.
 *
 * Takes the whole list so callers can localise inside a `map` without calling a
 * hook per item.
 */
export function useLocalizedFeatures(entries: FeatureEntry[]): LocalizedFeature[] {
  const { dict } = useI18n();
  return entries.map((entry) => {
    const override = dict.content.features?.[entry.slug];
    if (!override) return { ...entry, localized: false };
    return {
      ...entry,
      title: override.title ?? entry.title,
      short: override.short ?? entry.short,
      tagline: override.tagline ?? entry.tagline,
      paragraphs: override.paragraphs ?? entry.paragraphs,
      capabilities: override.capabilities ?? entry.capabilities,
      bullets: override.bullets ?? entry.bullets,
      stats: override.stats ?? entry.stats,
      kindLabel: override.kindLabel ?? entry.kindLabel,
      localized: true,
    };
  });
}

/** Single-entry convenience for the detail page. */
export function useLocalizedFeature(entry: FeatureEntry): LocalizedFeature {
  return useLocalizedFeatures([entry])[0];
}
