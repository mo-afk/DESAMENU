import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Minus, Plus } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';

const SERVICES = [
  { n: '01', title: 'Menu Design & Film', price: 'from €2.4k', time: '2-3 weeks', desc: 'We restructure your menu around how guests decide, then film the dishes worth selling.', deliverables: ['Menu architecture & copy', 'Dish film production', 'Photography direction', 'Menu typography system', 'Price & category strategy', 'Brand asset kit'] },
  { n: '02', title: 'DESA Menu Deployment', price: 'from €3.6k', time: '3-5 weeks', desc: 'Your menu built, tested and live — text navigation, video, categories, analytics and staff training.', deliverables: ['Menu build & setup', 'Video & image pipeline', 'Category navigation', 'Multi-language menus', 'Analytics dashboard', 'Team onboarding'] },
  { n: '03', title: 'Interactive Experiences', price: 'from €4.2k', time: '3-4 weeks', desc: 'Branded table-side games and interactions that add dwell time — starting with Who Pays?.', deliverables: ['Who Pays? game setup', 'Custom branded games', 'Table-side engagement flows', 'Shareable brand moments', 'Game analytics', 'Seasonal game drops'] },
  { n: '04', title: 'Loyalty & Retention', price: 'from €1.8k/mo', time: 'ongoing', desc: 'A loyalty programme inside the menu, with lifecycle messaging that brings guests back.', deliverables: ['Loyalty programme design', 'Reward & tier strategy', 'Guest identity across outlets', 'Off-season messaging', 'Return-visit reporting', 'Quarterly optimisation'] },
];

const MODELS = [
  { name: 'Single venue', price: 'Fixed scope', desc: 'One venue, live in five weeks. Menu design, dish film and a full DESA Menu deployment.', points: ['Fixed price & timeline', 'On-site shoot day', 'Staff training included', '30-day performance review'] },
  { name: 'Group', price: '€1.8k-€6k / mo', desc: 'An ongoing partnership across outlets. Seasonal menus, new films and loyalty operations, shipped monthly.', points: ['Multi-venue rollout', 'Quarterly film drops', 'Loyalty programme managed', 'Pause or cancel monthly'], highlight: true },
  { name: 'Hospitality group', price: 'Custom', desc: 'Ten outlets or more, multiple brands and PMS or POS integration. Scoped and priced on a call.', points: ['Group-wide guest identity', 'POS & PMS integration', 'Dedicated hospitality lead', 'Executive reporting'] },
];

const FAQS = [
  { q: 'What does a DESA Menu deployment cost?', a: 'A single venue typically lands between €5k and €9k depending on how many dishes we film and how much of the menu is video. Menu design alone starts at €2.4k, loyalty programmes from €1.8k/month. Every proposal is fixed-price — no hourly billing surprises.' },
  { q: 'How long until we are live?', a: 'Five weeks for a single venue: one week structuring your menu, one shoot day on site, two weeks building and reviewing, then launch and training. Larger multi-outlet deployments run six to ten weeks in phases, so your first outlet goes live while we build the rest.' },
  { q: 'Do we need to close for the shoot?', a: 'No. We film on the pass before service or during it — whichever suits your kitchen. One day on site, eight to twelve dishes, plus atmosphere frames you can use across your own channels.' },
  { q: 'Does it integrate with our POS?', a: 'Yes. We integrate with the major POS and payment systems for order routing where supported, plus reservations, delivery platforms and PMS for hotels. If an integration does not exist, we build the data flow rather than asking you to change systems.' },
  { q: 'What happens if we already have a QR menu?', a: 'We keep what works. About half our projects begin as a rebuild: we audit the existing menu, migrate the content that earns its place, and replace the static experience with film, navigation and loyalty. Nothing goes live until your team signs off.' },
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
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-[7.5vw]">Everything a menu <span className="font-serif normal-case italic font-medium text-lime">needs.</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">Four disciplines, one studio and no handoffs. Expand each service to see exactly what you get - and what it costs.</motion.p>
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
