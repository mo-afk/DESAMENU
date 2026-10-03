/**
 * Decorative background layers shared by several sections.
 * All of them are purely presentational and hidden from assistive tech.
 */

type LayerProps = { className?: string };

/** Technical grid overlay with a soft radial mask. */
export function GridBackdrop({
  className,
  size = "lg",
  fade = "radial",
}: LayerProps & { size?: "lg" | "sm"; fade?: "radial" | "linear" }) {
  const mask =
    fade === "radial"
      ? "[mask-image:radial-gradient(120%_85%_at_50%_0%,#000_15%,transparent_75%)]"
      : "[mask-image:linear-gradient(to_bottom,#000,transparent_88%)]";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${
        size === "lg" ? "grid-lines" : "grid-lines-sm"
      } ${mask} ${className ?? ""}`}
    />
  );
}

/** Neon-lime or neutral radial bloom. */
export function RadialGlow({
  className,
  color = "brand",
}: LayerProps & { color?: "brand" | "white" }) {
  const tints = {
    brand: "from-brand/[0.16]",
    white: "from-white/[0.07]",
  } as const;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-gradient-to-b to-transparent blur-[110px] ${
        tints[color]
      } ${className ?? ""}`}
    />
  );
}

/** Hairline that separates major sections. */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="hairline-fade pointer-events-none absolute inset-x-0 top-0 h-px"
    />
  );
}
