import { ArrowUpRight, Play } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { DesaButtonAnchor, DesaTag } from './DesaUI';

type Demo = {
  name: string;
  type: string;
  tags: string[];
  image: string;
  items: { name: string; price: string }[];
};

const DEMOS: Demo[] = [
  {
    name: 'La Terrasse',
    type: 'Fine Dining',
    tags: ['Video Menu', 'Loyalty', 'Elegant UI'],
    image: '/images/demo-terrace.jpg',
    items: [
      { name: 'Seared Scallops', price: '€24' },
      { name: 'Grilled Turbot', price: '€32' },
    ],
  },
  {
    name: 'Noir Lounge',
    type: 'Lounge',
    tags: ['Interactive Menu', 'Table Game', 'Mobile UX'],
    image: '/images/demo-noir.jpg',
    items: [
      { name: 'Noir Spritz', price: '€12' },
      { name: 'Smoked Old Fashioned', price: '€16' },
    ],
  },
  {
    name: 'Café Atelier',
    type: 'Cafe',
    tags: ['Fast Menu', 'Video Highlights', 'Retention Flow'],
    image: '/images/demo-atelier.jpg',
    items: [
      { name: 'Flat White', price: '€4.5' },
      { name: 'Cold Brew Tonic', price: '€6' },
    ],
  },
];

function DemoCard({ demo }: { demo: Demo }) {
  return (
    <a href="#desa-demo" className="group block" aria-label={`${demo.name} — ${demo.type} demo`}>
      <div className="relative aspect-[16/11] overflow-hidden border border-bone/15 bg-carbon">
        <img
          src={demo.image}
          alt={`${demo.name} — ${demo.type} venue interface`}
          loading="lazy"
          className="img-mono h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 border border-bone/20 bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse bg-lime" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85">Live demo</span>
        </span>

        <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-bone/25 bg-ink/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Play className="h-4 w-4 translate-x-px text-lime" />
        </span>

        {/* glass menu snippet */}
        <div className="absolute inset-x-4 bottom-4 border border-bone/15 bg-ink/85 p-3 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
          {demo.items.map((item, i) => (
            <div key={item.name} className={`flex items-center justify-between gap-4 ${i > 0 ? 'mt-2 border-t border-bone/10 pt-2' : ''}`}>
              <span className="flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/85">
                {i === 0 ? <Play className="h-2.5 w-2.5 shrink-0 text-lime" /> : <span className="h-1 w-1 shrink-0 bg-fog" />}
                <span className="truncate">{item.name}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] text-lime">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <h3 className="font-display text-xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-2xl">{demo.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{demo.type}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {demo.tags.map((tag) => (
              <li key={tag}>
                <DesaTag>{tag}</DesaTag>
              </li>
            ))}
          </ul>
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
      </div>
    </a>
  );
}

export default function DesaDemos() {
  return (
    <section id="desa-demos" className="scroll-mt-20 border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index="03" eyebrow="Live Demos" title="See DESA Menu" accent="in action." />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70">
            Explore live menu demos, real client interfaces, and premium hospitality experiences built for modern venues.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {DEMOS.map((demo, i) => (
            <Reveal key={demo.name} delay={(i % 3) * 0.08}>
              <DemoCard demo={demo} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col gap-6 border-t border-bone/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-fog">
              Want to see how DESA Menu would look with your dishes, your branding, and your menu structure?
            </p>
            <DesaButtonAnchor href="#desa-demo" variant="lime">
              Request a Private Walkthrough
            </DesaButtonAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
