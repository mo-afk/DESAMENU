import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Dices, Play, Tag, User } from 'lucide-react';
import Reveal from '../components/Reveal';
import { getProject, getProjects } from '../lib/api';
import type { Project } from '../lib/api';

const EASE = [0.22, 1, 0.36, 1] as const;

/** A single live DESA Menu demo — the venue, what runs there and the numbers. */
export default function DemoDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [demo, setDemo] = useState<Project | null>(null);
  const [next, setNext] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* Slug the currently held data belongs to. `loading` is derived from it so
     the effect never has to call setState synchronously. */
  const [loadedSlug, setLoadedSlug] = useState<string | undefined>(undefined);

  const loading = loadedSlug !== slug;

  useEffect(() => {
    const previous = document.title;
    document.title = demo ? `${demo.title} — DESA Menu demo` : 'Live demo — DESA Menu';
    return () => {
      document.title = previous;
    };
  }, [demo]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!slug) throw new Error('Missing demo');
        const [d, all] = await Promise.all([getProject(slug), getProjects()]);
        if (!active) return;
        if (!d) {
          setDemo(null);
          setError('Demo not found.');
          setLoadedSlug(slug);
          return;
        }
        setDemo(d);
        const idx = all.findIndex((x) => x.slug === slug);
        setNext(all.length > 1 ? all[(idx + 1) % all.length] : null);
        setError(null);
        setLoadedSlug(slug);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Failed to load demo');
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

  if (error || !demo) {
    return (
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-40 sm:px-8">
        <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">{error || 'Not found'}</p>
        <Link to="/demos" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone hover:text-lime"><ArrowLeft className="h-4 w-4" /> Back to demos</Link>
      </div>
    );
  }

  const meta = [
    { icon: User, label: 'Venue', value: demo.client },
    { icon: Calendar, label: 'Live since', value: String(demo.year) },
    { icon: Tag, label: 'Deployment', value: `${demo.industry} · ${demo.category}` },
    { icon: Dices, label: 'Table games', value: `${demo.games.length} live` },
    { icon: Clock, label: 'Onboarding', value: demo.timeline || '-' },
  ];

  return (
    <div className="pt-[72px]">
      <section className="mx-auto max-w-[1600px] px-5 pt-12 sm:px-8 lg:pt-16">
        <Link to="/demos" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog hover:text-lime"><ArrowLeft className="h-4 w-4" /> All demos</Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border border-lime/40 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Live demo</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-honey">{demo.industry}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{demo.category}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">{demo.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-4 max-w-2xl font-serif text-xl italic text-bone/75 sm:text-2xl">{demo.tagline}</motion.p>
      </section>

      <section className="mx-auto mt-10 max-w-[1600px] px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }} className="group relative overflow-hidden">
          <img src={demo.image_url} alt={demo.title} className="img-warm aspect-[16/8] w-full object-cover" />
          <div aria-hidden className="warm-veil pointer-events-none absolute inset-0" />
          <span className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center border border-bone/25 bg-ink/70 backdrop-blur-sm">
            <Play className="h-5 w-5 translate-x-px text-lime" />
          </span>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
        <div className="grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-5">
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
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">The venue</p>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-bone/80 sm:text-lg">
                {demo.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-fog">Running in this venue</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {demo.services.map((s) => (<span key={s} className="border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-bone/80">{s}</span>))}
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-10 border border-honey/25 bg-honey/[0.04] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-honey">
                    <Dices className="h-4 w-4" />
                    Gamified dining ecosystem
                  </p>
                  <Link to="/features" className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70 hover:text-honey">
                    Explore the full suite
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <ul className="mt-5 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2">
                  {demo.games.map((g) => (
                    <li key={g} className="flex items-center gap-3 bg-ink p-4 text-sm text-bone/85">
                      <span className="h-1.5 w-1.5 shrink-0 bg-honey" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <div className="glow-ember border border-ember/40 bg-ember/[0.05] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-honey">Service results</p>
                <div className="mt-6 space-y-6">
                  {demo.metrics.map((m) => (
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
                <span className="font-display text-lg uppercase">Want this in your venue?</span>
                <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {next && (
        <section className="border-t border-bone/10">
          <Link to={`/demos/${next.slug}`} className="group mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-12 sm:px-8 lg:py-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">Next demo</p>
              <p className="mt-3 font-display text-4xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-6xl">{next.title}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">{next.industry} — {next.category}</p>
            </div>
            <ArrowUpRight className="h-8 w-8 shrink-0 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
          </Link>
        </section>
      )}
    </div>
  );
}
