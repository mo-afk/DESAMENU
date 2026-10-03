import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Award, Compass, PenTool, Rocket, TrendingUp } from 'lucide-react';
import Marquee from '../components/Marquee';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import TestimonialSlider from '../components/TestimonialSlider';
import { ProjectCard } from '../components/ProjectCard';
import { getPosts, getProjects, getTestimonials, formatDate } from '../lib/api';
import type { Post, Project, Testimonial } from '../lib/api';

const CLIENTS = ['Noir Atelier', 'Ledgerline', 'Kinetic', 'Verre', 'Velvet Hour', 'Forma', 'Pulse', 'Kilo & Co'];

const STATS = [
  { value: '240+', label: 'Projects shipped' },
  { value: '$480M', label: 'Client revenue influenced' },
  { value: '38', label: 'Global design awards' },
  { value: '92%', label: 'Clients who return' },
];

const SERVICES = [
  { n: '01', icon: PenTool, title: 'Brand Identity', desc: 'Naming, logo systems, guidelines and art direction that make you impossible to ignore.' },
  { n: '02', icon: Compass, title: 'Web Design & Build', desc: 'Award-calibre marketing sites, e-commerce and product interfaces, designed and engineered in-house.' },
  { n: '03', icon: Rocket, title: 'Campaigns & Content', desc: 'Launch campaigns, photo and film direction, and social systems built to travel.' },
  { n: '04', icon: TrendingUp, title: 'Growth & CRO', desc: 'Experimentation roadmaps, landing systems and lifecycle creative that compound revenue.' },
];

const PROCESS = [
  { step: 'Discover', week: 'Week 0-2', desc: 'Stakeholder interviews, audits, market and audience research. We find the sharp edge.' },
  { step: 'Define', week: 'Week 2-4', desc: 'Positioning, creative territories and a measurable brief everyone signs in blood.' },
  { step: 'Design', week: 'Week 4-10', desc: 'Identity, interface and campaign craft in weekly drops. You see everything, early.' },
  { step: 'Deploy', week: 'Week 10+', desc: 'Launch, measure, iterate. Growth sprints keep the work compounding after ship.' },
];

function Hero() {
  return (
    <section className="bg-blueprint relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-bone/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-lime/[0.05] blur-[120px]" />
      <p className="text-outline-faint pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[22vw] uppercase leading-none opacity-60">Demand</p>
      <p className="writing-vertical absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] text-smoke xl:block">Independent agency - Est. 2016</p>
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-16 pt-36 sm:px-8 lg:pt-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center gap-3">
          <span className="border border-bone/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/80">Design and Growth Agency</span>
          <span className="hidden items-center gap-2 px-1 font-mono text-[11px] uppercase tracking-[0.25em] text-fog sm:inline-flex">
            <Award className="h-4 w-4 text-lime" /> Site of the Day x 12
          </span>
        </motion.div>
        <h1 className="mt-8 font-display uppercase leading-[0.88] tracking-tight">
          <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="block text-[13vw] sm:text-[11vw] lg:text-[8.5vw]">We build</motion.span>
          <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }} className="block text-[13vw] sm:text-[11vw] lg:text-[8.5vw]">brands that</motion.span>
          <motion.span initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }} className="block text-[13vw] sm:text-[11vw] lg:text-[8.5vw]">
            <span className="text-outline">demand</span> <span className="font-serif normal-case italic font-medium tracking-normal text-lime">attention.</span>
          </motion.span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-xl text-base leading-relaxed text-bone/70 sm:text-lg">
            DG is a 24-person team of designers, engineers and growth strategists. One partner for identity, website and revenue - from first sketch to scale.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-4">
            <Link to="/contact" className="group inline-flex items-center gap-2 bg-bone px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-lime">Start a project <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            <Link to="/work" className="inline-flex items-center gap-2 border border-bone/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink">See the work</Link>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }} className="mt-16 grid grid-cols-2 gap-px border border-bone/15 bg-bone/15 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink p-5 sm:p-6">
              <p className="font-display text-3xl text-bone sm:text-4xl lg:text-5xl">{s.value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{s.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.a href="#work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fog hover:text-lime">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20"><ArrowDown className="h-4 w-4 animate-bounce" /></span>
          Scroll - selected work
        </motion.a>
      </div>
    </section>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [p, t, postsData] = await Promise.all([getProjects(), getTestimonials(), getPosts()]);
        if (!active) return;
        setProjects(p.filter((x) => x.featured).slice(0, 4));
        setTestimonials(t);
        setPosts(postsData.slice(0, 3));
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : 'Failed to load content');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div>
      <Hero />
      <Marquee items={CLIENTS} className="border-y border-bone/10 bg-coal py-5" />
      <section id="work" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="01" eyebrow="Selected Work" title="Proof, not" accent="promises." linkTo="/work" linkLabel="All case studies" />
        <div className="mt-12">
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="aspect-[16/10] animate-pulse bg-carbon" />)}</div>
          ) : error ? (
            <p className="border border-red-500/30 bg-red-500/10 p-6 font-mono text-sm text-red-300">Could not load projects: {error}</p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={(i % 2) * 0.1}><ProjectCard project={p} large /></Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="border-y border-bone/10 bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading index="02" eyebrow="What we do" title="Full-stack" accent="creative." linkTo="/services" linkLabel="All services" />
          <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="h-full">
                <Link to="/services" className="group flex h-full flex-col bg-coal p-8 transition-colors hover:bg-carbon">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-smoke">{s.n}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl uppercase tracking-tight">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 group-hover:text-lime">Explore <ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="03" eyebrow="How we work" title="Sharp process," accent="zero drama." />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="border-t-2 border-lime pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog">{p.week}</p>
                <h3 className="mt-3 font-display text-3xl uppercase">{p.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-bone/10 bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading index="04" eyebrow="Client words" title="Loud" accent="results." />
          <div className="mt-12">
            {loading ? <div className="h-64 animate-pulse bg-carbon" /> : testimonials.length > 0 ? <Reveal><TestimonialSlider items={testimonials} /></Reveal> : null}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="05" eyebrow="Journal" title="Thinking" accent="out loud." linkTo="/journal" linkLabel="All articles" />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {loading ? (
            [0, 1, 2].map((i) => <div key={i} className="aspect-[4/3] animate-pulse bg-carbon" />)
          ) : (
            posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <Link to={`/journal/${post.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden bg-carbon">
                    <img src={post.image_url} alt={post.title} loading="lazy" className="img-mono h-full w-full object-cover group-hover:scale-[1.04]" />
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{post.category} - {formatDate(post.published_at)}</p>
                  <h3 className="mt-2 font-display text-xl uppercase leading-tight tracking-tight group-hover:text-lime">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bone/60">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </section>
      <section className="relative overflow-hidden border-t border-bone/10">
        <img src="/images/texture-ink.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8 lg:py-36">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Currently booking - 2 slots left for Q1 2027</p>
            <h2 className="mx-auto mt-6 max-w-5xl font-display text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">Have something <span className="font-serif normal-case italic font-medium">worth building?</span></h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-lime px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-transform hover:scale-105">Get a proposal <ArrowUpRight className="h-4 w-4" /></Link>
              <a href="mailto:hello@dg-agency.co" className="inline-flex items-center gap-2 border border-bone/30 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink">hello@dg-agency.co</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
