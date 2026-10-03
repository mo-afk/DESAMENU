import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Rows3 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { ProjectCard, ProjectRow } from '../components/ProjectCard';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => { if (active) setProjects(data); })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : 'Failed to load projects'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">01 - Portfolio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-[7.5vw]">Venues running <span className="text-outline">DESA Menu.</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">Every deployment below is a live venue. Filter by what we built - video menus, interactive menus, text menus or loyalty - then open a case study for the numbers.</motion.p>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${filter === c ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-bone/70 hover:border-bone hover:text-bone'}`}>
                {c}<span className="ml-2 opacity-60">{c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('grid')} aria-label="Grid view" className={`flex h-11 w-11 items-center justify-center border transition-colors ${view === 'grid' ? 'border-bone bg-bone text-ink' : 'border-bone/20 text-bone/70 hover:text-bone'}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView('list')} aria-label="List view" className={`flex h-11 w-11 items-center justify-center border transition-colors ${view === 'list' ? 'border-bone bg-bone text-ink' : 'border-bone/20 text-bone/70 hover:text-bone'}`}><Rows3 className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-12">
          {loading ? (
            view === 'grid' ? (
              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="aspect-[4/3] animate-pulse bg-carbon" />)}</div>
            ) : (
              <div className="space-y-4">{[0, 1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse bg-carbon" />)}</div>
            )
          ) : error ? (
            <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">Could not load projects: {error}</p>
          ) : visible.length === 0 ? (
            <p className="border border-bone/15 p-10 text-center font-mono text-sm text-fog">No venues in this deployment type yet.</p>
          ) : view === 'grid' ? (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {visible.map((p, i) => (<Reveal key={p.id} delay={(i % 2) * 0.08}><ProjectCard project={p} /></Reveal>))}
            </div>
          ) : (
            <div className="border-t border-bone/10">{visible.map((p, i) => <ProjectRow key={p.id} project={p} index={i} />)}</div>
          )}
        </div>
      </section>
    </div>
  );
}
