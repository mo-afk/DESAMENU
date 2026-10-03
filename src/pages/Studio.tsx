import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import TestimonialSlider from '../components/TestimonialSlider';
import Marquee from '../components/Marquee';
import { getTeam, getTestimonials } from '../lib/api';
import type { TeamMember, Testimonial } from '../lib/api';

const VALUES = [
  { n: '01', title: 'The floor comes first', desc: 'We design for a guest holding a phone in a dim room, mid-conversation. If it does not work there, it does not ship.' },
  { n: '02', title: 'Filmed, not downloaded', desc: 'Every dish we shoot is filmed in your venue, on your pass. Stock photography sells nothing and tastes like nothing.' },
  { n: '03', title: 'Numbers or nothing', desc: 'We report scan rate, video opens, spend per cover and return visits. If the work cannot move a number, we say so upfront.' },
  { n: '04', title: 'One studio, no handoffs', desc: 'Strategy, menu design, film and engineering sit in the same room. Your menu is not passed between three vendors.' },
];

const INTEGRATIONS = [
  ['POS & payments', 'Order routing where supported'],
  ['Reservations', 'Guest identity on arrival'],
  ['Delivery & takeaway', 'Same menu, same brand'],
  ['PMS for hotels', 'In-room dining and outlets'],
  ['WhatsApp & social', 'Menus that travel'],
  ['Analytics & CRM', 'Scan, engagement, retention'],
];

const TIMELINE = [
  { year: '2019', event: 'DESA starts as a two-person studio rebuilding menus for a single restaurant group in Casablanca.' },
  { year: '2021', event: 'First DESA Menu deployment goes live. The venue doubles the selection of its signature dishes within a month.' },
  { year: '2023', event: 'Dish film production becomes an in-house discipline. Video menus ship as standard, not as an add-on.' },
  { year: '2024', event: 'The loyalty engine launches. Return visits become a number venues can plan against instead of hope for.' },
  { year: '2025', event: 'Who Pays? ships and becomes the most-played table-side game in our venues. Multi-outlet rollout for hotels.' },
  { year: '2026', event: 'Today: 120+ venues across 9 countries, one studio, and a product roadmap written on restaurant floors.' },
];

export default function Studio() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [t, tm] = await Promise.all([getTestimonials(), getTeam()]);
        if (!active) return;
        setTestimonials(t);
        setTeam(tm);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">03 - The Studio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-6xl font-display text-5xl uppercase leading-[0.92] sm:text-7xl lg:text-[6.5vw]">A hospitality studio that works <span className="font-serif normal-case italic font-medium text-lime">on the floor.</span></motion.h1>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8">
        <Reveal>
          <div className="overflow-hidden"><img src="/images/studio-editorial.jpg" alt="Inside the DESA studio" className="img-mono aspect-[16/7] w-full object-cover" /></div>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">Manifesto</p>
            <p className="mt-5 font-serif text-2xl italic leading-snug text-bone sm:text-3xl">Most menu projects end at a PDF. We stay until the guest at table seven orders the dish the kitchen is proud of.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-bone/75">
              <p>DESA started in 2019 with a frustration every operator knows: menus were the most-read document in a venue and the least designed one. We began rebuilding them for a single restaurant group, then for their neighbours, then for hotels.</p>
              <p>Today we are a studio of six disciplines - menu strategy, design, film, engineering, hospitality operations and retention - and 120+ venues across nine countries run DESA Menu. Every deployment is still onboarded by a person who has worked a service.</p>
              <p>We are independent and plan to stay that way. No holding company, no reseller network, no stock photography - just one obsession: a menu that looks better, sells better and brings the guest back.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <Marquee items={['The floor comes first', 'Filmed, not downloaded', 'Numbers or nothing', 'One studio, no handoffs']} className="border-y border-bone/10 bg-coal py-5" outline />
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading index="04" eyebrow="What we believe" title="Four rules" accent="we live by." />
        <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.08} className="h-full">
              <div className="h-full bg-ink p-8">
                <p className="font-mono text-sm text-lime">{v.n}</p>
                <h3 className="mt-4 font-display text-xl uppercase leading-tight">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-y border-bone/10 bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading index="05" eyebrow="The team" title="Six disciplines," accent="one room." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="h-72 animate-pulse bg-carbon" />)
            ) : (
              team.map((m, i) => (
                <Reveal key={m.id} delay={(i % 3) * 0.08}>
                  <div className="group h-full border border-bone/15 bg-ink p-8 transition-colors hover:border-lime/60">
                    <div className="flex items-start justify-between">
                      <span className="flex h-16 w-16 items-center justify-center bg-bone font-display text-xl text-ink transition-colors group-hover:bg-lime">{m.initials}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">{m.years} yrs</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl uppercase tracking-tight">{m.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-lime">{m.role}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{m.department}</p>
                    <p className="mt-4 text-sm leading-relaxed text-bone/65">{m.bio}</p>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading index="06" eyebrow="Integrations" title="Plugs into" accent="your stack." />
            <div className="mt-10 border-t border-bone/10">
              {INTEGRATIONS.map(([org, what]) => (
                <div key={org + what} className="flex items-center justify-between gap-4 border-b border-bone/10 py-5">
                  <span className="flex items-center gap-3 font-display text-lg uppercase"><Award className="h-5 w-5 text-lime" strokeWidth={1.5} />{org}</span>
                  <span className="text-right font-mono text-xs uppercase tracking-[0.15em] text-fog">{what}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading index="07" eyebrow="Since 2019" title="The" accent="journey." />
            <div className="mt-10 space-y-0 border-t border-bone/10">
              {TIMELINE.map((t) => (
                <div key={t.year} className="grid grid-cols-12 gap-4 border-b border-bone/10 py-5">
                  <span className="col-span-3 font-display text-2xl text-lime sm:col-span-2">{t.year}</span>
                  <span className="col-span-9 text-sm leading-relaxed text-bone/70 sm:col-span-10">{t.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-bone/10 bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading index="08" eyebrow="Receipts" title="Don't take" accent="our word." />
          <div className="mt-12">{loading ? <div className="h-64 animate-pulse bg-carbon" /> : <Reveal><TestimonialSlider items={testimonials} /></Reveal>}</div>
          <Reveal className="mt-12 text-center">
            <Link to="/contact" className="group inline-flex items-center gap-2 bg-bone px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-lime">Work with this studio <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
