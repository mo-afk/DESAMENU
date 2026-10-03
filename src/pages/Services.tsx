import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Minus, Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const SERVICES = [
  { n: '01', title: 'Brand Identity', price: 'from $18k', time: '4-8 weeks', desc: 'Positioning, naming, visual identity and guidelines - the full foundation for being remembered.', deliverables: ['Brand strategy & positioning', 'Naming & verbal identity', 'Logo & visual system', 'Brand guidelines book', 'Art direction & templates', 'Launch asset kit'] },
  { n: '02', title: 'Web Design & Build', price: 'from $24k', time: '6-12 weeks', desc: 'Marketing sites, e-commerce and web apps. Designed to win awards, engineered to convert.', deliverables: ['UX research & sitemaps', 'UI design system', 'Creative development', 'CMS & e-commerce setup', 'Motion & interaction', 'SEO & performance tuning'] },
  { n: '03', title: 'Campaigns & Content', price: 'from $12k', time: '3-6 weeks', desc: 'Launch campaigns, film and photo direction, and always-on social systems with a point of view.', deliverables: ['Campaign concept & rollout', 'Photo & film direction', 'Social content systems', 'OOH & print', 'Influencer toolkits', 'Launch playbooks'] },
  { n: '04', title: 'Growth & CRO', price: 'from $6k/mo', time: 'ongoing', desc: 'Experimentation programs, landing page systems and lifecycle creative that compound month over month.', deliverables: ['Growth audits & roadmaps', 'A/B testing program', 'Landing page sprints', 'Email & lifecycle creative', 'Analytics & dashboards', 'Monthly insight reports'] },
];

const MODELS = [
  { name: 'Project', price: 'Fixed scope', desc: 'One defined outcome - a rebrand, a site, a launch. Fixed price, fixed timeline, senior team throughout.', points: ['Fixed price & timeline', 'Senior-only team', 'Weekly demos', '30-day post-launch support'] },
  { name: 'Partner', price: '$8k-$20k / mo', desc: 'An embedded creative team on retainer. Design, build and growth shipped in weekly sprints.', points: ['Dedicated pod of 3-5', 'Pause or cancel monthly', 'Unlimited requests, queued', 'Slack + same-day replies'], highlight: true },
  { name: 'Sprint', price: '$9k / week', desc: 'A one-week intensive to crack one hard problem - positioning, a landing page, a prototype.', points: ['Kickoff Monday, ship Friday', 'Daily working sessions', 'Prototype or live page', 'Decision-ready readout'] },
];

const FAQS = [
  { q: 'How much does a typical project cost?', a: 'Most engagements land between $18k and $80k depending on scope. Brand identities start at $18k, websites at $24k, campaigns at $12k. Retainers run $8k-$20k/month. Every proposal is fixed-price - no hourly billing surprises.' },
  { q: 'How long does a project take?', a: 'Sprints ship in a week, campaigns in 3-6 weeks, identities in 4-8 weeks, and full websites in 6-12 weeks. You will see real creative direction by week two on any engagement.' },
  { q: 'Who will actually work on our account?', a: 'Seniors only. Your pod includes a creative director, a designer, an engineer and a strategist - the people you meet in the pitch are the people who ship the work.' },
  { q: 'Do you work with early-stage startups?', a: 'Yes - roughly a third of our work is Seed to Series B. We offer sprint-based engagements and phased scopes so you can start sharp and scale the partnership as you grow.' },
  { q: 'Can you take over from another agency?', a: 'Absolutely. We audit what exists, keep what works, and rebuild what does not. About 40% of our projects start as rescues or redesigns of work begun elsewhere.' },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-bone/10">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="font-display text-lg uppercase tracking-tight sm:text-xl">{q}</span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-bone/20">{open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="max-w-3xl pb-6 text-sm leading-relaxed text-bone/70 sm:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(0);
  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-24">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">02 - Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-[7.5vw]">Everything the <span className="font-serif normal-case italic font-medium text-lime">funnel</span> needs.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">Four disciplines, one team, zero handoffs. Expand each service to see exactly what you get - and what it costs.</motion.p>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 lg:py-16">
        <div className="border-t border-bone/15">
          {SERVICES.map((s, i) => {
            const open = expanded === i;
            return (
              <div key={s.n} className="border-b border-bone/15">
                <button onClick={() => setExpanded(open ? null : i)} className="grid w-full grid-cols-12 items-center gap-3 py-7 text-left sm:gap-6 sm:px-4">
                  <span className="col-span-2 font-mono text-sm text-lime sm:col-span-1">{s.n}</span>
                  <span className={`col-span-10 font-display text-2xl uppercase tracking-tight transition-colors sm:col-span-5 sm:text-4xl lg:text-5xl ${open ? 'text-lime' : ''}`}>{s.title}</span>
                  <span className="col-span-6 col-start-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog sm:col-span-3 sm:col-start-auto">{s.price}</span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-fog sm:col-span-2 sm:block">{s.time}</span>
                  <span className="col-span-4 flex justify-end sm:col-span-1"><span className={`flex h-11 w-11 items-center justify-center border transition-colors ${open ? 'border-lime bg-lime text-ink' : 'border-bone/20'}`}>{open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</span></span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="grid gap-8 px-0 pb-10 sm:px-4 lg:grid-cols-2">
                        <p className="max-w-xl text-base leading-relaxed text-bone/70">{s.desc}</p>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {s.deliverables.map((d) => (<li key={d} className="flex items-start gap-3 text-sm text-bone/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" /> {d}</li>))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
      <section className="border-y border-bone/10 bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading index="A" eyebrow="Engagement models" title="Pick your" accent="pace." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MODELS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className={`flex h-full flex-col p-8 ${'highlight' in m && m.highlight ? 'border border-lime bg-lime/[0.05]' : 'border border-bone/15 bg-ink'}`}>
                  {'highlight' in m && m.highlight && <span className="mb-4 w-fit bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Most popular</span>}
                  <h3 className="font-display text-3xl uppercase">{m.name}</h3>
                  <p className="mt-2 font-mono text-sm text-lime">{m.price}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-bone/70">{m.desc}</p>
                  <ul className="mt-6 space-y-3 border-t border-bone/10 pt-6">
                    {m.points.map((pt) => (<li key={pt} className="flex items-start gap-3 text-sm text-bone/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />{pt}</li>))}
                  </ul>
                  <Link to="/contact" className={`group mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${'highlight' in m && m.highlight ? 'bg-lime text-ink hover:bg-bone' : 'border border-bone/25 hover:bg-bone hover:text-ink'}`}>Start with {m.name} <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-5 py-20 sm:px-8 lg:py-24">
        <SectionHeading index="B" eyebrow="FAQ" title="Fair" accent="questions." />
        <div className="mt-8 border-t border-bone/10">{FAQS.map((f) => <Faq key={f.q} q={f.q} a={f.a} />)}</div>
      </section>
    </div>
  );
}
