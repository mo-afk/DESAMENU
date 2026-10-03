import Image from "next/image";
import { Play, Scan, Star } from "./Icons";

/** Small helper for the mocked in-app menu rows. */
function MenuRow({
  name,
  note,
  price,
  image,
}: {
  name: string;
  note: string;
  price: string;
  image: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 transition-colors duration-300 hover:border-brand/25 hover:bg-white/[0.04]">
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={image}
          alt=""
          fill
          sizes="44px"
          className="object-cover brightness-[0.85]"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.75rem] font-medium tracking-tight text-fg">
          {name}
        </span>
        <span className="mt-0.5 block truncate text-[0.625rem] text-muted/80">
          {note}
        </span>
      </span>
      <span className="shrink-0 font-mono text-[0.6875rem] text-brand">
        {price}
      </span>
    </div>
  );
}

/**
 * Cinematic preview of the DESA Menu guest interface. Purely decorative:
 * exposed to assistive tech as a single labelled image.
 */
export default function PhoneMockup() {
  return (
    <div
      role="img"
      aria-label="Preview of the DESA Menu interface on a phone: a cinematic video dish card, category navigation, menu rows and an integrated loyalty progress bar."
      className="relative"
    >
      {/* Phone body */}
      <div className="relative rounded-[2.75rem] border border-white/12 bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0b0b0b] p-[10px] shadow-panel">
        <div
          aria-hidden
          className="absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-white/[0.06]"
        />

        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.07] bg-[#0c0c0c]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pb-2 pt-3.5">
            <span className="font-mono text-[0.625rem] text-fg/70">21:04</span>
            <span className="h-[18px] w-[62px] rounded-full bg-black" />
            <span className="flex items-center gap-1.5">
              <span className="flex items-end gap-[2px]">
                {[5, 7, 9, 11].map((h) => (
                  <span
                    key={h}
                    style={{ height: h }}
                    className="w-[2px] rounded-full bg-fg/70"
                  />
                ))}
              </span>
              <span className="h-[9px] w-[18px] rounded-[3px] border border-fg/40 p-[1.5px]">
                <span className="block h-full w-[70%] rounded-[1px] bg-brand" />
              </span>
            </span>
          </div>

          {/* Venue header */}
          <div className="flex items-center justify-between gap-3 px-5 pb-3.5 pt-2">
            <div className="min-w-0">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/70">
                Table 07
              </p>
              <p className="mt-1 truncate text-[0.9375rem] font-medium tracking-[-0.02em] text-fg">
                La Terrasse
              </p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand/30 bg-brand/[0.08]">
              <Scan className="h-4 w-4 text-brand" />
            </span>
          </div>

          {/* Category chips */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
            {["Starters", "Mains", "Desserts", "Drinks"].map((chip, i) => (
              <span
                key={chip}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[0.625rem] tracking-tight ${
                  i === 0
                    ? "border-brand/40 bg-brand text-black"
                    : "border-white/10 bg-white/[0.03] text-muted"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Cinematic dish video card */}
          <div className="relative mx-5 overflow-hidden rounded-3xl border border-white/[0.08]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/hero-dish.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 240px, 300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/35" />

              {/* Animated scanning line */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-brand/[0.14] to-transparent"
              />

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-dot" />
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-fg/85">
                  Playing
                </span>
              </span>

              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2 py-1 backdrop-blur-sm">
                <Star className="h-2.5 w-2.5 text-brand" strokeWidth={1.5} />
                <span className="font-mono text-[0.5rem] text-fg/85">4.9</span>
              </span>

              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/12 backdrop-blur-md">
                <Play className="h-4 w-4 translate-x-[1px] text-fg" />
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5">
                <div className="min-w-0">
                  <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-brand/90">
                    Chef&apos;s signature
                  </p>
                  <p className="mt-1 truncate text-[0.8125rem] font-medium tracking-tight text-fg">
                    Seared Scallops
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[0.6875rem] text-fg">
                  €24
                </span>
              </div>
            </div>
          </div>

          {/* Menu rows */}
          <div className="space-y-2 px-5 py-4">
            <MenuRow
              image="/images/demo-atelier.jpg"
              name="Truffle Arancini"
              note="Aged parmesan · black truffle"
              price="€14"
            />
            <MenuRow
              image="/images/demo-noir.jpg"
              name="Noir Spritz"
              note="Bergamot · prosecco · basil"
              price="€12"
            />
          </div>

          {/* Loyalty strip */}
          <div className="mx-5 mb-5 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/[0.11] to-transparent p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-brand/90">
                DESA Loyalty
              </span>
              <span className="font-mono text-[0.5rem] text-muted">3 / 5</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map((dot) => (
                <span
                  key={dot}
                  className={`h-1.5 flex-1 rounded-full ${
                    dot < 3 ? "bg-brand" : "bg-white/12"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2.5 text-[0.625rem] leading-snug text-muted">
              One more visit unlocks your{" "}
              <span className="text-fg">complimentary dessert</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Floating card — table game */}
      <div className="absolute -right-6 top-[13%] w-[152px] rotate-[3deg] rounded-2xl border border-white/12 bg-ink-soft/85 p-3.5 shadow-panel backdrop-blur-xl animate-float sm:-right-10">
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-muted/75">
          Table Game
        </p>
        <p className="mt-1.5 text-[0.8125rem] font-medium tracking-tight text-fg">
          Who Pays?
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          {["A", "B", "C"].map((label, i) => (
            <span
              key={label}
              className={`grid h-6 w-6 place-items-center rounded-lg border text-[0.5625rem] ${
                i === 2
                  ? "border-brand/50 bg-brand text-black"
                  : "border-white/12 bg-white/[0.04] text-muted"
              }`}
            >
              {label}
            </span>
          ))}
          <span className="ml-auto font-mono text-[0.5rem] text-brand">P2</span>
        </div>
      </div>

      {/* Floating card — loyalty toast */}
      <div className="absolute -left-5 bottom-[13%] w-[163px] -rotate-[2.5deg] rounded-2xl border border-brand/25 bg-ink-soft/85 p-3.5 shadow-glow-soft backdrop-blur-xl animate-float-slow sm:-left-11">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-brand/90">
            Loyalty +1
          </span>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-black">
            <Star className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>
        <p className="mt-2 text-[0.6875rem] leading-snug text-fg/90">
          Visit recorded — welcome back, Sofia.
        </p>
      </div>
    </div>
  );
}
