import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  /** Renders a leading neon status dot. */
  dot?: boolean;
  className?: string;
  tone?: "default" | "brand";
};

/** Small tag / label pill used across the page. */
export default function Pill({
  children,
  dot = false,
  className,
  tone = "default",
}: PillProps) {
  const tones = {
    default:
      "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-fg",
    brand:
      "border-brand/30 bg-brand/[0.07] text-brand hover:border-brand/50 hover:bg-brand/[0.11]",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight transition-colors duration-300 ${tones[tone]} ${
        className ?? ""
      }`}
    >
      {dot ? (
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand animate-pulse-dot"
        />
      ) : null}
      {children}
    </span>
  );
}
