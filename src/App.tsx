import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';

/* Home ships in the initial bundle; every other route is split out and
   fetched on navigation. */
const Features = lazy(() => import('./pages/Features'));
const Demos = lazy(() => import('./pages/Demos'));
const DemoDetail = lazy(() => import('./pages/DemoDetail'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const Notes = lazy(() => import('./pages/Notes'));
const Note = lazy(() => import('./pages/Note'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Shown while a lazily-imported route chunk downloads. */
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
        Loading<span className="text-lime">…</span>
      </span>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Error 404</p>
      <h1 className="mt-4 font-display text-7xl uppercase sm:text-9xl">Lost<span className="text-outline">?</span></h1>
      <p className="mt-4 max-w-sm text-bone/60">This page left the pass and never came back. Let us get you somewhere better.</p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="bg-bone px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink hover:bg-lime">Home</Link>
        <Link to="/demos" className="border border-bone/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-bone hover:text-ink">Live demos</Link>
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
