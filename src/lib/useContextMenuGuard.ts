import { useEffect } from 'react';

/**
 * Suppresses the browser's right-click menu across the site.
 *
 * What this buys, honestly: it stops the casual "Save image as…" and
 * "View page source" reflex and nothing else. Every photo on this site is still
 * in the network tab, in the page source, in the browser cache and one `curl`
 * away, and a screenshot costs a keystroke. Treat it as a deterrent for a
 * visitor who would otherwise grab a venue photograph without thinking — not as
 * protection, and not as a substitute for owning the rights to the imagery.
 *
 * Because the friction is real, the guard is deliberately not absolute. The
 * native menu stays available wherever people depend on it:
 *
 *   • form fields — right-click → Paste is how plenty of visitors fill in an
 *     email or phone number, and this site exists to collect those;
 *   • links — right-click → Open in new tab / Copy link address;
 *   • editable content and anything a visitor has actively selected.
 *
 * So the block lands on imagery, headings and decorative surfaces, which is the
 * part worth guarding, and leaves the lead forms alone.
 */

/** Elements (and their descendants) that keep the native menu. */
const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'textarea',
  'select',
  '[contenteditable]',
  '[role="textbox"]',
  '[role="menuitem"]',
  '[role="menuitemcheckbox"]',
  '[role="option"]',
  'label',
].join(', ');

/**
 * Decides whether a `contextmenu` event should be left alone.
 *
 * Exported separately from the hook so the rule can be exercised directly —
 * it is the part that decides what a visitor can and cannot do.
 */
export function isContextAllowed(target: EventTarget | null): boolean {
  /* Text nodes, the document itself, anything without `closest`: block. */
  const element = target as Element | null;
  if (!element || typeof element.closest !== 'function') return false;

  if (element.closest(INTERACTIVE_SELECTOR)) return true;

  /* A live selection: taking the menu away here would stop someone copying
     text they deliberately highlighted. */
  if (typeof window !== 'undefined' && typeof window.getSelection === 'function') {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && String(selection).length > 0) return true;
  }

  return false;
}

/**
 * Registers the guard for as long as the calling component is mounted.
 *
 * The listener is attached in the capture phase so a handler further down the
 * tree cannot re-open a menu we decided to suppress, and it is removed with the
 * same `capture` flag — `removeEventListener` only matches an earlier
 * registration when the options agree, which is the easy way to leak one.
 *
 * @param enabled set to false to leave the native menu everywhere
 */
export function useContextMenuGuard(enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return;

    const onContextMenu = (event: MouseEvent) => {
      if (isContextAllowed(event.target)) return;
      event.preventDefault();
    };

    document.addEventListener('contextmenu', onContextMenu, true);
    return () => {
      document.removeEventListener('contextmenu', onContextMenu, true);
    };
  }, [enabled]);
}

export default useContextMenuGuard;
