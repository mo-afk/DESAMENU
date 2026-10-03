import type { ReactNode } from "react";
import { SectionDivider } from "../ui/Backdrop";
import Container from "../ui/Container";
import { Award, Check, Dice, ListMenu, Play, Video } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/* ------------------------------------------------------------------ */
/* Per-feature mock visuals — pure markup, no external assets.         */
/* ------------------------------------------------------------------ */

function VideoVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-end gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`relative flex-1 overflow-hidden rounded-lg border ${
              i === 1
                ? "h-16 border-brand/35 bg-gradient-to-b from-brand/[0.16] to-transparent"
                : "h-12 border-white/[0.07] bg-gradient-to-b from-white/[0.07] to-transparent"
            } transition-all duration-500 ease-premium group-hover:h-16`}
          >
            {i === 1 ? (
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-brand/50 bg-black/50">
                  <Play className="h-2.5 w-2.5 translate-x-px text-brand" />
                </span>
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full w-2/3 rounded-full bg-brand/70 transition-all duration-700 ease-premium group-hover:w-[88%]" />
      </div>
    </div>
  );
}

function MenuVisual() {
  const rows = [
    { label: "68%", price: "42%" },
    { label: "84%", price: "30%" },
    { label: "52%", price: "36%" },
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" />
          <span className="flex-1">
            <span
              className="block h-[6px] rounded-full bg-white/12 transition-colors duration-500 group-hover:bg-white/20"
              style={{ width: row.label }}
            />
            <span
              className="mt-1.5 block h-[4px] rounded-full bg-white/[0.07]"
              style={{ width: row.price }}
            />
          </span>
          <span className="font-mono text-[0.5625rem] text-muted/50">€</span>
        </div>
      ))}
    </div>
  );
}

function GameVisual() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        {["A", "B", "C"].map((label, i) => (
          <span
            key={label}
            className={`grid h-8 w-8 place-items-center rounded-xl border text-[0.625rem] font-medium transition-all duration-500 ${
              i === 2
                ? "border-brand/50 bg-brand text-black shadow-glow-soft"
                : "border-white/[0.09] bg-white/[0.04] text-muted"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5">
        <Dice className="h-3 w-3 text-brand" />
        <span className="text-[0.625rem] tracking-tight text-fg/85">
          Who Pays? — <span className="text-brand">Player 2</span>
        </span>
      </div>
    </div>
  );
}

function LoyaltyVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-brand/85">
          DESA Loyalty
        </span>
        <span className="font-mono text-[0.5625rem] text-muted/60">3 / 5</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={`grid h-7 flex-1 place-items-center rounded-lg border transition-all duration-500 ease-premium ${
              dot < 3
                ? "border-brand/35 bg-brand/[0.14] text-brand"
                : "border-white/[0.08] bg-white/[0.02] text-muted/30"
            }`}
          >
            <Award className="h-3 w-3" />
          </span>
        ))}
      </div>
      <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full w-3/5 rounded-full bg-brand/70 transition-all duration-700 ease-premium group-hover:w-4/5" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Feature = {
  index: string;
  title: string;
  description: string;
  bullets: string[];
  icon: (props: { className?: string }) => ReactNode;
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    index: "01",
    title: "Video Menus",
    description:
      "Show every dish with high-quality visuals and motion that make ordering more intuitive, more premium, and more persuasive.",
    bullets: [
      "Cinematic dish previews",
      "Stronger appetite appeal",
      "Upsell through presentation",
    ],
    icon: Video,
    visual: <VideoVisual />,
  },
  {
    index: "02",
    title: "Text & Standard Menus",
    description:
      "Fast, clean, beautifully structured digital menus designed for clarity, speed, and effortless browsing across all devices.",
    bullets: [
      "Mobile-first layout",
      "Easy category navigation",
      "Elegant menu presentation",
    ],
    icon: ListMenu,
    visual: <MenuVisual />,
  },
  {
    index: "03",
    title: "Interactive Table Games",
    description:
      "Add memorable moments to the dining experience with lightweight table-side interactions like “Who Pays?” and other branded mini-games.",
    bullets: [
      "Boost guest engagement",
      "Make visits more memorable",
      "Shareable brand moments",
    ],
    icon: Dice,
    visual: <GameVisual />,
  },
  {
    index: "04",
    title: "Integrated Loyalty Cards",
    description:
      "Turn one-time visits into repeat business with loyalty systems built directly into the menu experience.",
    bullets: [
      "Retention-focused design",
      "Digital fidelity experience",
      "Encourage return visits",
    ],
    icon: Award,
    visual: <LoyaltyVisual />,
  },
];

function FeatureCard({ feature, delay }: { feature: Feature; delay: number }) {
  const Icon = feature.icon;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.028] to-white/[0.008] p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-glow-soft sm:p-7 lg:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand/[0.11] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-fg/85 transition-colors duration-500 group-hover:border-brand/35 group-hover:text-brand">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted/40">
            {feature.index}
          </span>
        </div>

        <h3 className="relative mt-6 text-xl font-medium tracking-[-0.025em] text-fg sm:text-[1.375rem]">
          {feature.title}
        </h3>

        <p className="relative mt-3 max-w-lg text-[0.875rem] leading-relaxed text-muted">
          {feature.description}
        </p>

        <div className="relative mt-7 h-[124px] overflow-hidden rounded-2xl border border-white/[0.06] bg-black/35 px-5 py-4 transition-colors duration-500 group-hover:border-brand/20">
          <div aria-hidden className="grid-lines-sm absolute inset-0 opacity-60" />
          <div className="relative h-full">{feature.visual}</div>
        </div>

        <ul className="relative mt-7 space-y-3 border-t border-white/[0.07] pt-7">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
              </span>
              <span className="text-[0.8125rem] tracking-tight text-fg/80">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <Container>
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything your menu needs to do —{" "}
              <span className="text-muted">in one digital system.</span>
            </>
          }
          description="DESA Menu combines visual storytelling, smart interaction, and retention tools into one seamless hospitality experience."
        />

        <div className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              delay={(i % 2) * 90}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
