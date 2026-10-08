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
 * only the words are localised. Any field a locale has translated is used, and
 * anything it has not — currently the long-form essays, which are authored per
 * venue and cost real translation budget — falls back to the English entry
 * rather than rendering an empty page.
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
