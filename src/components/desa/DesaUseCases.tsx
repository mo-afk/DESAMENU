import { ArrowUpRight, Building2, Coffee, Martini, UtensilsCrossed } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';

const USE_CASES = [
  { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Present dishes with more impact and increase table-side upselling.' },
  { icon: Coffee, title: 'Cafes', desc: 'Create a cleaner, faster, more branded customer journey.' },
  { icon: Martini, title: 'Lounges', desc: 'Add atmosphere, interactivity, and memorable brand touchpoints.' },
  { icon: Building2, title: 'Hotels & Hospitality Concepts', desc: 'Deliver a modern digital service layer that reflects premium standards.' },
];

export default function DesaUseCases() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading index="07" eyebrow="Use cases" title="Designed for hospitality brands" accent="that care how they are experienced." />

      <div className="mt-12 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 xl:grid-cols-4">
        {USE_CASES.map((u, i) => (
          <Reveal key={u.title} delay={i * 0.08} className="h-full">
            <div className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-coal">
              <div className="flex items-center justify-between">
                <u.icon className="h-8 w-8 text-lime" strokeWidth={1.5} />
                <ArrowUpRight className="h-4 w-4 text-smoke transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
              </div>
              <h3 className="mt-8 font-display text-lg uppercase leading-tight tracking-tight">{u.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{u.desc}</p>
              <span className="mt-6 border-t border-bone/10 pt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-smoke transition-colors group-hover:text-lime">
                Built for
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
