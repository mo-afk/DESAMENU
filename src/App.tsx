import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useContextMenuGuard } from './lib/useContextMenuGuard';
import { useI18n } from './i18n';

/* Home ships in the initial bundle; every other route is split out and
   fetched on navigation. */
const Features = lazy(() => import('./pages/Features'));
const FeatureDetail = lazy(() => import('./pages/FeatureDetail'));
const Demos = lazy(() => import('./pages/Demos'));
const DemoDetail = lazy(() => import('./pages/DemoDetail'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Notes = lazy(() => import('./pages/Notes'));
const Note = lazy(() => import('./pages/Note'));
const Contact = lazy(() => import('./pages/Contact'));

/**
 * Scroll positions by pathname, so returning from a detail page puts a visitor
 * back where they left off rather than at the top of the features page.
 */
const scrollPositions = new Map<string, number>();

function ScrollToTop() {
  const location = useLocation();
  const { pathname, search, hash } = location;
  const navigationType = useNavigationType();

  /* Track the previous pathname (ignoring search + hash) so we can tell a
     real page change from an in-page update (tab clicks that write ?game=…,
     anchor jumps, filter chips on the same page). Anything that leaves the
     pathname untouched must NOT touch `window.scrollY`. */
  const prevPathname = useRef<string>(pathname);

  /* Save the scroll offset when we unmount/leave a given pathname, so back
     navigation can return to exactly where the visitor was reading. */
  useEffect(() => {
    return () => {
      scrollPositions.set(pathname, window.scrollY);
    };
  }, [pathname]);

  useEffect(() => {
    const prev = prevPathname.current;
    const pathnameChanged = prev !== pathname;
    prevPathname.current = pathname;

    /* Anchor link (#section) — let the browser handle it; never reset to top.
       The sections set `scroll-mt-20` to account for the fixed navbar. */
    if (hash) return;

    /* Same page (search-only change, or initial mount of the same route) —
       preserve scroll. This covers DesaGames tab clicks that write ?game=…
       via `setParams({ replace: true })`, and any future filter/tab that
       syncs to the URL. */
    if (!pathnameChanged) return;

    /* Back / Forward: restore the previously-saved position, if any.
       Lazy-loaded routes can still be mounting on the first frame so we
       retry briefly. */
    if (navigationType === 'POP') {
      const saved = scrollPositions.get(pathname);
      if (typeof saved === 'number') {
        const restore = () => window.scrollTo({ top: saved, left: 0, behavior: 'auto' });
        restore();
        const timers = [
          window.setTimeout(restore, 120),
          window.setTimeout(restore, 320),
        ];
        return () => timers.forEach((t) => window.clearTimeout(t));
      }
    }

    /* Real new-page navigation (PUSH/REPLACE to a different route, or POP to
       a route with no saved position) — start at the top. This is the ONLY
       place a scroll reset is allowed to happen. Modals, tabs, filters,
       accordions, FAQ rows and search-param toggles never reach here. */
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search, hash, navigationType]);

  return null;
}

/** Shown while a lazily-imported route chunk downloads. */
function RouteFallback() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
        {t('common.loading')}<span className="text-lime">…</span>
      </span>
    </div>
  );
}

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">{t('common.error404')}</p>
      <h1 className="display-type display-page mt-4 font-display uppercase">{t('notFound.title')}<span className="text-outline">?</span></h1>
      <p className="mt-4 max-w-sm text-bone/60">{t('notFound.body')}</p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="bg-bone px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:bg-lime">{t('notFound.home')}</Link>
        <Link to="/demos" className="border border-bone/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-bone hover:text-ink">{t('notFound.demos')}</Link>
      </div>
    </div>
  );
}

export default function App() {
  /* Site-wide: suppress the right-click menu so imagery is not one click from
     "Save image as". Links, buttons and the lead forms keep the native menu —
     the rule lives in `lib/useContextMenuGuard`. */
  useContextMenuGuard();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="grain min-h-screen overflow-x-hidden bg-ink font-body text-bone">
        <Navbar />
        <main>
          <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/features/:slug" element={<FeatureDetail />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/demos/:slug" element={<DemoDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<Note />} />
            <Route path="/contact" element={<Contact />} />
            {/* Previous routes kept alive so existing links never 404 */}
            <Route path="/desa-menu" element={<Navigate to="/" replace />} />
            <Route path="/work" element={<Navigate to="/demos" replace />} />
            <Route path="/work/:slug" element={<Navigate to="/demos" replace />} />
            <Route path="/journal" element={<Navigate to="/notes" replace />} />
            <Route path="/journal/:slug" element={<Navigate to="/notes" replace />} />
            <Route path="/services" element={<Navigate to="/features" replace />} />
            <Route path="/studio" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
