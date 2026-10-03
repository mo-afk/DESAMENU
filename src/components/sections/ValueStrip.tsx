import Container from "../ui/Container";
import { Gem, Sparkle, TrendingUp, Users } from "../ui/Icons";
import Reveal from "../ui/Reveal";

const VALUES = [
  {
    index: "01",
    title: "More engaging ordering",
    copy: "Motion and appetite-driven visuals that make guests explore more of the menu.",
    Icon: Sparkle,
  },
  {
    index: "02",
    title: "Higher guest retention",
    copy: "Loyalty built into the menu itself — not bolted on as an afterthought.",
    Icon: Users,
  },
  {
    index: "03",
    title: "Stronger brand presentation",
    copy: "Every dish presented inside your visual language, at every table.",
    Icon: Gem,
  },
  {
    index: "04",
    title: "Smarter digital upselling",
    copy: "Recommendations placed exactly where guests make their decisions.",
    Icon: TrendingUp,
  },
];

export default function ValueStrip() {
  return (
    <section aria-label="Why DESA Menu works" className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {VALUES.map(({ index, title, copy, Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 90} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.026] to-white/[0.008] p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-glow-soft">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-brand/[0.14] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand/70 to-transparent transition-transform duration-600 ease-premium group-hover:scale-x-100"
                />

                <div className="relative flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-fg/85 transition-colors duration-500 group-hover:border-brand/35 group-hover:text-brand">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted/45">
                    {index}
                  </span>
                </div>

                <h3 className="relative mt-6 text-[1.0625rem] font-medium leading-snug tracking-[-0.02em] text-fg">
                  {title}
                </h3>
                <p className="relative mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
                  {copy}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
