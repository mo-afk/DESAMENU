import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
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
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  /* Capture the position of the page being left. */
  useEffect(() => {
    return () => {
      scrollPositions.set(pathname, window.scrollY);
    };
  }, [pathname]);

  /* Restore on back/forward, otherwise start at the top. Lazy-loaded routes
     can still be mounting on the first frame, so retry briefly. */
  useEffect(() => {
    const saved = navigationType === 'POP' ? scrollPositions.get(pathname) : undefined;
    if (typeof saved !== 'number') {
      window.scrollTo(0, 0);
      return;
    }
    const restore = () => window.scrollTo(0, saved);
    restore();
    const timers = [window.setTimeout(restore, 120), window.setTimeout(restore, 320)];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname, navigationType]);

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
      <h1 className="mt-4 font-display text-7xl uppercase sm:text-9xl">{t('notFound.title')}<span className="text-outline">?</span></h1>
      <p className="mt-4 max-w-sm text-bone/60">{t('notFound.body')}</p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="bg-bone px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:bg-lime">{t('notFound.home')}</Link>
        <Link to="/demos" className="border border-bone/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-bone hover:text-ink">{t('notFound.demos')}</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="grain min-h-screen bg-ink font-body text-bone">
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
