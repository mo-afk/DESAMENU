import { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import Studio from './pages/Studio';
import Journal from './pages/Journal';
import Article from './pages/Article';
import Contact from './pages/Contact';
import DesaMenu from './pages/DesaMenu';

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
        <Link to="/desa-menu" className="border border-bone/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] hover:bg-bone hover:text-ink">DESA Menu</Link>
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
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/services" element={<Services />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/desa-menu" element={<DesaMenu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
