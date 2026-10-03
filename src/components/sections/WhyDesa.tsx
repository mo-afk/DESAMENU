import Container from "../ui/Container";
import { Check, Close } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import { GridBackdrop, RadialGlow, SectionDivider } from "../ui/Backdrop";
import SectionHeading from "../ui/SectionHeading";

const TRADITIONAL = [
  "Static",
  "Forgettable",
  "Low engagement",
  "No emotional pull",
  "No retention layer",
];

const DESA = [
  "Interactive",
  "Premium branded",
  "Visually persuasive",
  "Built for engagement",
  "Loyalty-enabled",
];

export default function WhyDesa() {
  return (
    <section
      aria-labelledby="why-desa-menu"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop className="opacity-40" />
        <RadialGlow
          color="white"
          className="-left-40 top-1/3 h-[420px] w-[480px]"
        />
      </div>

      <Container>
        <SectionHeading
          id="why-desa-menu"
          eyebrow="Positioning"
          align="center"
          title="Beyond the QR code."
          description="Most digital menus stop at access. DESA Menu turns the menu into an experience — combining design, motion, interaction, and retention into a system that feels as refined as the venue itself."
        />

        <div className="relative mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {/* “vs” marker */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted lg:grid"
          >
            vs
          </span>

          {/* Traditional */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-3xl border border-white/[0.06] bg-white/[0.012] p-7 sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-muted">
                  Traditional QR / PDF Menus
                </h3>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/40">
                  Before
                </span>
              </div>

              <ul className="mt-7 divide-y divide-white/[0.05] border-t border-white/[0.05]">
                {TRADITIONAL.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3.5 py-4 text-[0.875rem] tracking-tight text-muted/75"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-white/[0.08] text-muted/50">
                      <Close className="h-3 w-3" strokeWidth={1.75} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* DESA Menu */}
          <Reveal delay={120} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-b from-brand/[0.055] to-transparent p-7 shadow-glow-soft transition-shadow duration-500 hover:shadow-glow sm:p-9">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand/[0.16] blur-3xl"
              />

              <div className="relative flex items-center justify-between gap-4">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.02em] text-fg">
                  DESA Menu
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/[0.08] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-brand">
                    After
                  </span>
                </span>
              </div>

              <ul className="relative mt-7 divide-y divide-white/[0.07] border-t border-white/[0.07]">
                {DESA.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3.5 py-4 text-[0.875rem] font-medium tracking-tight text-fg"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand/45 bg-brand text-black">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <p className="mt-12 border-t border-white/[0.07] pt-10 text-center text-balance text-xl font-medium leading-snug tracking-[-0.025em] text-fg sm:text-2xl lg:text-[1.75rem]">
            This is not just a menu.{" "}
            <span className="text-muted">
              It is a modern hospitality touchpoint.
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
