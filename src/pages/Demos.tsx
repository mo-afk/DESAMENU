import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Rows3 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { ProjectCard, ProjectRow } from '../components/ProjectCard';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';

/** Every live DESA Menu deployment, filterable by venue type. */
const PLURAL: Record<string, string> = { Lounge: 'Lounges', Cafe: 'Cafes', Hotel: 'Hotels' };
export default function Demos() {
  const [demos, setDemos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const previous = document.title;
    document.title = 'Live demos — DESA Menu';
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => { if (active) setDemos(data); })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : 'Failed to load demos'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const industries = useMemo(() => ['All', ...Array.from(new Set(demos.map((d) => d.industry)))], [demos]);
  const visible = filter === 'All' ? demos : demos.filter((d) => d.industry === filter);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index="03"
        eyebrow="Live demos"
        title={
          <>
            See DESA Menu <span className="text-outline">in action.</span>
          </>
        }
        description="Real venues, real menus, live right now — fine dining, lounges, cafes and hotels across nine countries. Filter by venue type, then open a demo for the full story."
      />

      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {industries.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${filter === c ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-bone/70 hover:border-bone hover:text-bone'}`}
              >
                {PLURAL[c] ?? c}
                <span className="ml-2 opacity-60">{c === 'All' ? demos.length : demos.filter((d) => d.industry === c).length}</span>
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
            <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">Could not load demos: {error}</p>
          ) : visible.length === 0 ? (
            <p className="border border-bone/15 p-10 text-center font-mono text-sm text-fog">No demos in this venue type yet.</p>
          ) : view === 'grid' ? (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {visible.map((d, i) => (<Reveal key={d.id} delay={(i % 2) * 0.08}><ProjectCard project={d} /></Reveal>))}
            </div>
          ) : (
            <div className="border-t border-bone/10">{visible.map((d, i) => <ProjectRow key={d.id} project={d} index={i} />)}</div>
          )}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-fog">
              Want to see DESA Menu with your dishes, your branding and your menu structure? We will build a private walkthrough of your own venue.
            </p>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
            >
              Request a Private Walkthrough
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
