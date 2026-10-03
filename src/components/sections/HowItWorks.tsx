import Container from "../ui/Container";
import { Scan, Sparkle, Zap } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import { GridBackdrop, SectionDivider } from "../ui/Backdrop";
import SectionHeading from "../ui/SectionHeading";

const STEPS = [
  {
    step: "01",
    title: "We design your menu ecosystem",
    copy: "We structure your food, drinks, visuals, and brand into a refined digital experience tailored to your venue.",
    Icon: Sparkle,
  },
  {
    step: "02",
    title: "We launch your interactive experience",
    copy: "Your menu goes live with text navigation, optional video dishes, engagement features, and loyalty integration.",
    Icon: Zap,
  },
  {
    step: "03",
    title: "Your guests scan, explore, and engage",
    copy: "Customers discover dishes more visually, interact with the experience, and return through built-in retention tools.",
    Icon: Scan,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop className="opacity-40" />
      </div>

      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From concept to guest interaction in three steps."
        />

        <div className="relative mt-14 lg:mt-16">
          {/* Connector line behind the cards (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[54px] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
          />

          <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
            {STEPS.map(({ step, title, copy, Icon }, i) => (
              <Reveal as="li" key={step} delay={i * 110} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.028] to-white/[0.008] p-7 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand/28 hover:shadow-glow-soft sm:p-8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-brand/[0.12] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-ink text-fg/85 transition-colors duration-500 group-hover:border-brand/35 group-hover:text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[2.5rem] font-medium leading-none tracking-[-0.04em] text-white/[0.07] transition-colors duration-500 group-hover:text-brand/25">
                      {step}
                    </span>
                  </div>

                  <h3 className="relative mt-7 text-lg font-medium leading-snug tracking-[-0.025em] text-fg sm:text-xl">
                    {title}
                  </h3>
                  <p className="relative mt-3 text-[0.875rem] leading-relaxed text-muted">
                    {copy}
                  </p>

                  <span
                    aria-hidden
                    className="relative mt-7 h-px w-full bg-white/[0.07]"
                  />
                  <span className="relative mt-6 inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/50">
                    Step {step}
                    <span aria-hidden className="h-px w-6 bg-muted/30" />
                  </span>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={80}>
          <p className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted/60">
            <span>Fast onboarding.</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brand/50" />
            <span>Premium execution.</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brand/50" />
            <span>Built around your service flow.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
