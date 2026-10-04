import { useEffect } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Demos from './pages/Demos';
import DemoDetail from './pages/DemoDetail';
import HowItWorks from './pages/HowItWorks';
import Notes from './pages/Notes';
import Note from './pages/Note';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
