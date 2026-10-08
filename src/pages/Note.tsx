import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import { formatDate, getPost, getPosts } from '../lib/api';
import type { Post } from '../lib/api';

const EASE = [0.22, 1, 0.36, 1] as const;

/** A single field note. */
import { useI18n } from '../i18n';

export default function Note() {
  const { t, dict } = useI18n();
  const n = dict.notes;
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  /* Slug the currently held data belongs to. `loading` is derived from it so
     the effect never has to call setState synchronously. */
  const [loadedSlug, setLoadedSlug] = useState<string | undefined>(undefined);

  const loading = loadedSlug !== slug;

  useEffect(() => {
    const previous = document.title;
    document.title = post ? `${post.title} — DESA Menu` : t('meta.notes');
    return () => {
      document.title = previous;
    };
  }, [post, t]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        if (!slug) throw new Error('Missing note');
        const [p, all] = await Promise.all([getPost(slug), getPosts()]);
        if (!active) return;
        if (!p) {
          setPost(null);
          setError(n.notFound);
          setLoadedSlug(slug);
          return;
        }
        setPost(p);
        setRelated(all.filter((x) => x.slug !== slug).slice(0, 2));
        setError(null);
        setLoadedSlug(slug);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : n.loadError);
        setLoadedSlug(slug);
      }
    })();
    return () => { active = false; };
  }, [slug, n.notFound, n.loadError]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8">
        <div className="h-10 w-1/3 animate-pulse bg-carbon" />
        <div className="mt-6 h-16 w-full animate-pulse bg-carbon" />
        <div className="mt-8 aspect-[16/8] animate-pulse bg-carbon" />
        <div className="mt-8 space-y-4">{[0, 1, 2].map((i) => <div key={i} className="h-6 animate-pulse bg-carbon" />)}</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-40 sm:px-8">
        <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">{error || n.notFound}</p>
        <Link to="/notes" className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone hover:text-lime"><ArrowLeft className="h-4 w-4" /> {n.backToNotes}</Link>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
          <Link to="/notes" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog hover:text-lime"><ArrowLeft className="h-4 w-4" /> {n.backToNotes}</Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              <span className="border border-lime/60 px-3 py-1 text-lime">{post.category}</span>
              <span className="text-fog">{formatDate(post.published_at)}</span>
              <span className="inline-flex items-center gap-1 text-fog"><Clock className="h-3.5 w-3.5" />{post.read_time} {n.minRead}</span>
            </div>
            <h1 className="display-type display-page mt-5 font-display uppercase tracking-tight">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 border-t border-bone/10 pt-6">
              <span className="flex h-12 w-12 items-center justify-center bg-bone font-display text-sm text-ink">{post.author.split(' ').map((w) => w[0]).join('')}</span>
              <div>
                <p className="font-display text-sm uppercase">{post.author}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{post.author_role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden">
            <img src={post.image_url} alt={post.title} className="img-warm aspect-[16/8] w-full object-cover" />
            <div aria-hidden className="warm-veil pointer-events-none absolute inset-0" />
          </div>
        </Reveal>
        <Reveal delay={0.05}><p className="mt-8 border-l-2 border-ember pl-5 font-serif text-xl italic leading-relaxed text-bone/85 sm:text-2xl">{post.excerpt}</p></Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 space-y-6 text-base leading-[1.85] text-bone/80 sm:text-lg">
            {post.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col gap-4 border border-bone/15 bg-coal p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl uppercase">{n.ctaTitle}</p>
              <p className="mt-1 text-sm text-fog">{n.ctaBody}</p>
            </div>
            <Link to="/contact" className="group inline-flex shrink-0 items-center gap-2 bg-lime px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone">{n.ctaButton} <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="border-t border-bone/10">
          <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{n.keepReading}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} to={`/notes/${r.slug}`} className="group grid gap-5 border border-bone/15 bg-coal p-5 sm:grid-cols-5 sm:p-6">
                  <div className="overflow-hidden sm:col-span-2"><img src={r.image_url} alt={r.title} loading="lazy" className="img-warm aspect-[16/10] h-full w-full object-cover group-hover:scale-[1.04]" /></div>
                  <div className="sm:col-span-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{r.category} — {r.read_time} {n.minShort}</p>
                    <h3 className="mt-2 font-display text-xl uppercase leading-tight group-hover:text-lime">{r.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 group-hover:text-lime">{n.read} <ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
