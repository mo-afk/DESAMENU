import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Tag, User } from 'lucide-react';
import Reveal from '../components/Reveal';
import { getProject, getProjects } from '../lib/api';
import type { Project } from '../lib/api';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [next, setNext] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* Slug the currently held data belongs to. `loading` is derived from it so
     the effect never has to call setState synchronously. */
  const [loadedSlug, setLoadedSlug] = useState<string | undefined>(undefined);

  const loading = loadedSlug !== slug;

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!slug) throw new Error('Missing project');
        const [p, all] = await Promise.all([getProject(slug), getProjects()]);
        if (!active) return;
        if (!p) {
          setProject(null);
          setError('Case study not found.');
          setLoadedSlug(slug);
          return;
        }
        setProject(p);
        const idx = all.findIndex((x) => x.slug === slug);
        setNext(all.length > 1 ? all[(idx + 1) % all.length] : null);
        setError(null);
        setLoadedSlug(slug);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load case study');
        setLoadedSlug(slug);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 sm:px-8">
        <div className="h-16 w-2/3 animate-pulse bg-carbon" />
        <div className="mt-8 aspect-[16/8] animate-pulse bg-carbon" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-32 animate-pulse bg-carbon" />)}</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-40 sm:px-8">
        <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">{error || 'Not found'}</p>
        <Link to="/work" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone hover:text-lime"><ArrowLeft className="h-4 w-4" /> Back to work</Link>
      </div>
    );
  }

  const meta = [
    { icon: User, label: 'Client', value: project.client },
    { icon: Calendar, label: 'Year', value: String(project.year) },
    { icon: Tag, label: 'Discipline', value: project.category },
    { icon: Clock, label: 'Timeline', value: project.timeline || '-' },
  ];

  return (
    <div className="pt-[72px]">
      <section className="mx-auto max-w-[1600px] px-5 pt-12 sm:px-8 lg:pt-16">
        <Link to="/work" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog hover:text-lime"><ArrowLeft className="h-4 w-4" /> All work</Link>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">{project.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-4 max-w-2xl font-serif text-xl italic text-bone/75 sm:text-2xl">{project.tagline}</motion.p>
      </section>
      <section className="mx-auto mt-10 max-w-[1600px] px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
          <img src={project.image_url} alt={project.title} className="aspect-[16/8] w-full object-cover" />
        </motion.div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
        <div className="grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label} className="bg-ink p-6">
              <m.icon className="h-5 w-5 text-lime" strokeWidth={1.5} />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{m.label}</p>
              <p className="mt-1 font-display text-lg uppercase">{m.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">The story</p>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-bone/80 sm:text-lg">
                {project.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-fog">Services delivered</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.services.map((s) => (<span key={s} className="border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bone/80">{s}</span>))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="border border-lime/40 bg-lime/[0.04] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Results</p>
                <div className="mt-6 space-y-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="border-b border-bone/10 pb-6 last:border-0 last:pb-0">
                      <p className="font-display text-5xl text-bone">{m.value}</p>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <Link to="/contact" className="group mt-6 flex items-center justify-between bg-bone p-6 text-ink transition-colors hover:bg-lime">
                <span className="font-display text-lg uppercase">Want results like these?</span>
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
      {next && (
        <section className="border-t border-bone/10">
          <Link to={`/work/${next.slug}`} className="group mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-12 sm:px-8 lg:py-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">Next case study</p>
              <p className="mt-3 font-display text-4xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-6xl">{next.title}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">{next.client} - {next.year}</p>
            </div>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-bone/25 transition-all group-hover:border-lime group-hover:bg-lime group-hover:text-ink sm:h-24 sm:w-24"><ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" /></span>
          </Link>
        </section>
      )}
    </div>
  );
}
