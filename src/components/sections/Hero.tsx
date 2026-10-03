import ButtonLink from "../ui/Button";
import Container from "../ui/Container";
import { Check } from "../ui/Icons";
import PhoneMockup from "../ui/PhoneMockup";
import Pill from "../ui/Pill";
import Reveal from "../ui/Reveal";
import { GridBackdrop, RadialGlow } from "../ui/Backdrop";

const TAGS = [
  "Video Menus",
  "Interactive Games",
  "Loyalty Systems",
  "Higher Average Order Value",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop />
        <RadialGlow className="-top-32 left-1/2 h-[520px] w-[860px] -translate-x-1/2" />
        <RadialGlow
          color="white"
          className="-right-40 top-24 h-[420px] w-[520px]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10 xl:gap-16">
          {/* ---------------------------- Copy ---------------------------- */}
          <div className="flex flex-col items-start">
            <Reveal>
              <Pill dot tone="brand">
                DESA Menu
              </Pill>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="mt-7 text-[2.55rem] font-medium leading-[0.98] tracking-[-0.045em] text-fg sm:text-[3.35rem] lg:text-[3.9rem] xl:text-[4.35rem]">
                Turn every menu into a{" "}
                <span className="relative inline-block">
                  <span className="relative text-brand">premium</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-[0.06em] h-[0.1em] rounded-full bg-brand/30 blur-[5px]"
                  />
                </span>{" "}
                digital experience.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                DESA Menu helps restaurants, cafes, and lounges replace static QR
                menus with interactive text menus, cinematic dish videos,
                table-side games, and built-in loyalty systems that elevate guest
                experience and increase average order value.
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 flex items-start gap-3 border-t border-white/[0.07] pt-6 sm:items-center">
                <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/10 text-brand sm:mt-0">
                  <Check className="h-3 w-3" strokeWidth={2.25} />
                </span>
                <p className="text-[0.8125rem] tracking-tight text-muted">
                  Built for modern hospitality brands that want to stand out.
                </p>
              </div>
            </Reveal>

            <Reveal delay={350}>
              <ul className="mt-7 flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* --------------------------- Visual --------------------------- */}
          <Reveal delay={180} className="relative">
            <div className="relative mx-auto w-full max-w-[460px]">
              {/* Stage panel behind the device */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="absolute left-1/2 top-1/2 h-[92%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/[0.06] bg-white/[0.012]" />
                <GridBackdrop size="sm" className="opacity-80" />
                <RadialGlow className="left-1/2 top-[6%] h-[380px] w-[380px] -translate-x-1/2" />
              </div>

              <div className="relative mx-auto w-[262px] sm:w-[312px] lg:w-[330px]">
                <PhoneMockup />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
