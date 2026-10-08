import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Rows3 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import DesaQrStand from '../components/desa/DesaQr';
import { ProjectCard, ProjectRow } from '../components/ProjectCard';
import { getProjects } from '../lib/api';
import type { Project } from '../lib/api';
import { useI18n } from '../i18n';

/** Every live DESA Menu deployment, filterable by venue type. */
const PLURAL: Record<string, string> = { Lounge: 'Lounges', Cafe: 'Cafes', Hotel: 'Hotels' };
export default function Demos() {
  const { t, dict } = useI18n();
  const d = dict.demos;
  const [demos, setDemos] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.demos');
    return () => {
      document.title = previous;
    };
  }, [t]);

  useEffect(() => {
    let active = true;
    getProjects()
      .then((data) => { if (active) setDemos(data); })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const industries = useMemo(() => ['All', ...Array.from(new Set(demos.map((d) => d.industry)))], [demos]);
  const visible = filter === 'All' ? demos : demos.filter((item) => item.industry === filter);

  return (
    <div className="pt-[72px]">
      <PageHeader
        index={d.page.index}
        eyebrow={d.eyebrow}
        title={
          <>
            {d.page.titlePre} <span className="text-outline">{d.page.titleAccent}</span>
          </>
        }
        description={d.page.description}
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
                {c === 'All' ? d.filterAll : (PLURAL[c] ?? c)}
                <span className="ms-2 opacity-60">{c === 'All' ? demos.length : demos.filter((item) => item.industry === c).length}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView('grid')} aria-label={d.gridView} className={`flex h-11 w-11 items-center justify-center border transition-colors ${view === 'grid' ? 'border-bone bg-bone text-ink' : 'border-bone/20 text-bone/70 hover:text-bone'}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView('list')} aria-label={d.listView} className={`flex h-11 w-11 items-center justify-center border transition-colors ${view === 'list' ? 'border-bone bg-bone text-ink' : 'border-bone/20 text-bone/70 hover:text-bone'}`}><Rows3 className="h-4 w-4" /></button>
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
            <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">{d.errorPrefix}{error}</p>
          ) : visible.length === 0 ? (
            <p className="border border-bone/15 p-10 text-center font-mono text-sm text-fog">{d.empty}</p>
          ) : view === 'grid' ? (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {visible.map((d, i) => (<Reveal key={d.id} delay={(i % 2) * 0.08}><ProjectCard project={d} /></Reveal>))}
            </div>
          ) : (
            <div className="border-t border-bone/10">{visible.map((d, i) => <ProjectRow key={d.id} project={d} index={i} />)}</div>
          )}
        </div>

        {/* Every deployment leaves the screen and lands on the table */}
        <Reveal>
          <div className="mt-20 grid gap-12 border-t border-bone/10 pt-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{d.stand.onTheTable}</p>
              <h2 className="display-section mt-4 max-w-2xl break-words font-display uppercase tracking-tight">
                {d.stand.title} <span className="font-serif normal-case italic font-medium">{d.stand.titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/70">
                {d.stand.body}
              </p>
              <ul className="mt-8 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-3">
                {d.stand.points.map((item) => (
                  <li key={item} className="flex items-center gap-3 bg-ink p-4 text-xs leading-snug text-bone/85">
                    <span className="h-1.5 w-1.5 shrink-0 bg-lime" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <DesaQrStand venue="La Terrasse" table="Table 07" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-fog">
              {d.intro}
            </p>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone"
            >
              {t('common.privateWalkthrough')}
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
