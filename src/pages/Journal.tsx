import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import { formatDate, getPosts } from '../lib/api';
import type { Post } from '../lib/api';

export default function Journal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let active = true;
    getPosts()
      .then((data) => { if (active) setPosts(data); })
      .catch((e) => { if (active) setError(e instanceof Error ? e.message : 'Failed to load articles'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map((p) => p.category)))], [posts]);
  const visible = filter === 'All' ? posts : posts.filter((p) => p.category === filter);
  const [featured, ...rest] = visible;

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">04 - Journal</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-[7.5vw]">Thinking <span className="text-outline">out loud.</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">Playbooks, teardowns and strong opinions from the studio floor. No fluff - every article earns its read time.</motion.p>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${filter === c ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-bone/70 hover:border-bone hover:text-bone'}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        {loading ? (
          <div className="space-y-8">
            <div className="aspect-[16/7] animate-pulse bg-carbon" />
            <div className="grid gap-8 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] animate-pulse bg-carbon" />)}</div>
          </div>
        ) : error ? (
          <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">Could not load articles: {error}</p>
        ) : visible.length === 0 ? (
          <p className="border border-bone/15 p-10 text-center font-mono text-sm text-fog">No articles in this category yet.</p>
        ) : (
          <>
            {featured && (
              <Reveal>
                <Link to={`/journal/${featured.slug}`} className="group grid gap-0 border border-bone/15 bg-coal lg:grid-cols-2">
                  <div className="overflow-hidden"><img src={featured.image_url} alt={featured.title} className="img-mono aspect-[16/10] h-full w-full object-cover group-hover:scale-[1.03] lg:aspect-auto" /></div>
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                      <span className="bg-lime px-3 py-1 font-bold text-ink">Featured</span>
                      <span className="text-fog">{featured.category}</span>
                      <span className="inline-flex items-center gap-1 text-fog"><Clock className="h-3.5 w-3.5" />{featured.read_time} min</span>
                    </div>
                    <h2 className="mt-5 font-display text-3xl uppercase leading-[0.95] tracking-tight transition-colors group-hover:text-lime sm:text-4xl lg:text-5xl">{featured.title}</h2>
                    <p className="mt-4 line-clamp-3 leading-relaxed text-bone/65">{featured.excerpt}</p>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">{featured.author} - {formatDate(featured.published_at)}</p>
                  </div>
                </Link>
              </Reveal>
            )}
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 0.08}>
                  <Link to={`/journal/${post.slug}`} className="group block border-t border-bone/15 pt-6">
                    <div className="aspect-[16/10] overflow-hidden bg-carbon"><img src={post.image_url} alt={post.title} loading="lazy" className="img-mono h-full w-full object-cover group-hover:scale-[1.04]" /></div>
                    <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                      <span>{post.category}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.read_time} min</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-tight transition-colors group-hover:text-lime">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bone/60">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 group-hover:text-lime">Read article <ArrowUpRight className="h-4 w-4" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
