const VENUES = [
  "Fine Dining",
  "Cocktail Bars",
  "Specialty Cafés",
  "Lounges",
  "Boutique Hotels",
  "Beach Clubs",
  "Rooftop Bars",
  "Brunch Spots",
];

/** Thin editorial marquee of the venue types DESA Menu is built for. */
export default function VenueStrip() {
  return (
    <section
      aria-label="Venue types using DESA Menu"
      className="relative overflow-hidden border-y border-white/[0.06] py-5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent sm:w-40"
      />

      <div className="flex w-max animate-marquee items-center gap-10 sm:gap-16">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-10 sm:gap-16"
          >
            {VENUES.map((venue) => (
              <span
                key={`${copy}-${venue}`}
                className="flex shrink-0 items-center gap-10 sm:gap-16"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-muted/55">
                  {venue}
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
