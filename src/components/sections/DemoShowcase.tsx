import Image from "next/image";
import ButtonLink from "../ui/Button";
import Container from "../ui/Container";
import { ArrowUpRight, Play } from "../ui/Icons";
import Pill from "../ui/Pill";
import Reveal from "../ui/Reveal";
import { GridBackdrop, RadialGlow, SectionDivider } from "../ui/Backdrop";
import SectionHeading from "../ui/SectionHeading";

type Demo = {
  name: string;
  type: string;
  tags: string[];
  image: string;
  items: { name: string; price: string }[];
};

const DEMOS: Demo[] = [
  {
    name: "La Terrasse",
    type: "Fine Dining",
    tags: ["Video Menu", "Loyalty", "Elegant UI"],
    image: "/images/demo-terrace.jpg",
    items: [
      { name: "Seared Scallops", price: "€24" },
      { name: "Grilled Turbot", price: "€32" },
    ],
  },
  {
    name: "Noir Lounge",
    type: "Lounge",
    tags: ["Interactive Menu", "Table Game", "Mobile UX"],
    image: "/images/demo-noir.jpg",
    items: [
      { name: "Noir Spritz", price: "€12" },
      { name: "Smoked Old Fashioned", price: "€16" },
    ],
  },
  {
    name: "Café Atelier",
    type: "Cafe",
    tags: ["Fast Menu", "Video Highlights", "Retention Flow"],
    image: "/images/demo-atelier.jpg",
    items: [
      { name: "Flat White", price: "€4.5" },
      { name: "Cold Brew Tonic", price: "€6" },
    ],
  },
];

function DemoCard({ demo, delay }: { demo: Demo; delay: number }) {
  return (
    <Reveal delay={delay} className="w-[84vw] shrink-0 snap-start sm:w-[420px] lg:w-auto lg:h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-glow-soft">
        {/* Preview */}
        <div className="relative aspect-[16/12] overflow-hidden">
          <Image
            src={demo.image}
            alt={`${demo.name} — ${demo.type} venue interface concept`}
            fill
            sizes="(max-width: 1024px) 84vw, 400px"
            className="object-cover brightness-[0.72] transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.06] group-hover:brightness-[0.82]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/25"
          />
          <div aria-hidden className="grid-lines-sm absolute inset-0 opacity-40" />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-fg/85">
              Live demo
            </span>
          </span>

          {/* Hover play affordance */}
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 opacity-0 backdrop-blur-md transition-all duration-500 ease-premium group-hover:opacity-100 group-hover:border-brand/40">
            <Play className="h-3 w-3 translate-x-px text-fg" />
          </span>

          {/* Glass menu snippet */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-ink/72 p-3 backdrop-blur-xl transition-transform duration-500 ease-premium group-hover:-translate-y-1">
            {demo.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex items-center justify-between gap-4 ${
                  i > 0 ? "mt-2 border-t border-white/[0.07] pt-2" : ""
                }`}
              >
                <span className="flex items-center gap-2 truncate text-[0.6875rem] tracking-tight text-fg/85">
                  {i === 0 ? (
                    <Play className="h-2.5 w-2.5 shrink-0 text-brand" />
                  ) : (
                    <span className="h-1 w-1 shrink-0 rounded-full bg-muted/50" />
                  )}
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="shrink-0 font-mono text-[0.625rem] text-brand/90">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-medium tracking-[-0.025em] text-fg sm:text-xl">
              {demo.name}
            </h3>
            <span className="mt-1 text-muted/40 transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/70">
            {demo.type}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {demo.tags.map((tag) => (
              <li key={tag}>
                <Pill className="text-[0.6875rem]">{tag}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export default function DemoShowcase() {
  return (
    <section
      id="demos"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop fade="linear" className="opacity-50" />
        <RadialGlow className="left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2" />
      </div>

      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Live Demos"
            title="See DESA Menu in action."
            description="Explore live menu demos, real client interfaces, and premium hospitality experiences built for modern venues."
            className="lg:max-w-2xl"
          />
          <Reveal delay={120}>
            <p className="hidden max-w-[15rem] text-[0.8125rem] leading-relaxed text-muted/80 lg:block">
              Three of the venues we&apos;ve designed for. Additional demos are
              available on request.
            </p>
          </Reveal>
        </div>

        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:gap-5 sm:px-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {DEMOS.map((demo, i) => (
            <DemoCard key={demo.name} demo={demo} delay={i * 100} />
          ))}
        </div>

        <Reveal>
          <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/50 lg:hidden">
            Swipe to explore →
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 flex flex-col items-stretch gap-4 border-t border-white/[0.07] pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.9375rem] leading-relaxed text-muted sm:max-w-md">
              Want to see how DESA Menu would look with your dishes, your
              branding, and your menu structure?
            </p>
            <ButtonLink
              href="#contact"
              size="lg"
              className="shrink-0 sm:w-auto"
            >
              Request a Private Walkthrough
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
