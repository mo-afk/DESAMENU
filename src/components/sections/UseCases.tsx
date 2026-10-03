import Container from "../ui/Container";
import { ArrowUpRight, Building, Coffee, Martini, Restaurant } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import { GridBackdrop, SectionDivider } from "../ui/Backdrop";
import SectionHeading from "../ui/SectionHeading";

const USE_CASES = [
  {
    title: "Restaurants",
    copy: "Present dishes with more impact and increase table-side upselling.",
    Icon: Restaurant,
  },
  {
    title: "Cafes",
    copy: "Create a cleaner, faster, more branded customer journey.",
    Icon: Coffee,
  },
  {
    title: "Lounges",
    copy: "Add atmosphere, interactivity, and memorable brand touchpoints.",
    Icon: Martini,
  },
  {
    title: "Hotels & Hospitality Concepts",
    copy: "Deliver a modern digital service layer that reflects premium standards.",
    Icon: Building,
  },
];

export default function UseCases() {
  return (
    <section
      aria-labelledby="use-cases"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop className="opacity-35" />
      </div>

      <Container>
        <SectionHeading
          id="use-cases"
          eyebrow="Use Cases"
          title="Designed for hospitality brands that care how they are experienced."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {USE_CASES.map(({ title, copy, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 90} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015] p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand/28 hover:bg-white/[0.03] hover:shadow-glow-soft sm:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-brand/70 to-transparent transition-transform duration-700 ease-premium group-hover:scale-x-100"
                />

                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-fg/85 transition-colors duration-500 group-hover:border-brand/35 group-hover:text-brand">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-6 text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] text-fg">
                  {title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.8125rem] leading-relaxed text-muted">
                  {copy}
                </p>

                <span className="mt-7 inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/45 transition-colors duration-500 group-hover:text-brand/80">
                  Built for
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-premium group-hover:translate-x-0.5"
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
