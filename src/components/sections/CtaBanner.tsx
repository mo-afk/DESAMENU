import ButtonLink from "../ui/Button";
import Container from "../ui/Container";
import Pill from "../ui/Pill";
import Reveal from "../ui/Reveal";
import { GridBackdrop, RadialGlow } from "../ui/Backdrop";

const PROOF = [
  "Video Menus",
  "Text Menus",
  "Table Games",
  "Loyalty Cards",
  "Branded UI",
];

export default function CtaBanner() {
  return (
    <section aria-labelledby="final-cta" className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <GridBackdrop fade="radial" className="opacity-70" />
              <RadialGlow className="-top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            </div>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <Pill dot tone="brand">
                Next Step
              </Pill>

              <h2
                id="final-cta"
                className="mt-7 text-balance text-[1.9rem] font-medium leading-[1.04] tracking-[-0.035em] text-fg sm:text-4xl lg:text-[3.15rem]"
              >
                Ready to upgrade the way guests order?
              </h2>

              <p className="mt-6 max-w-xl text-balance text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                Let&apos;s build a digital menu experience that looks better,
                sells better, and keeps customers coming back.
              </p>

              <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
                  Book a Demo
                </ButtonLink>
                <ButtonLink
                  href="#demos"
                  variant="secondary"
                  size="lg"
                  arrow="up-right"
                  className="w-full sm:w-auto"
                >
                  Explore Live Demos
                </ButtonLink>
              </div>

              <ul className="mt-12 flex flex-wrap items-center justify-center gap-2">
                {PROOF.map((item) => (
                  <li key={item}>
                    <Pill>{item}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
