type LogoProps = {
  /** Hides the "Powered by DESA Agency" micro-line (used in tight spaces). */
  hideMicro?: boolean;
  className?: string;
};

/** DESA Menu wordmark + mark. */
export default function Logo({ hideMicro = false, className }: LogoProps) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ""}`}>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] border border-white/12 bg-gradient-to-b from-white/[0.11] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)] transition-all duration-500 ease-premium group-hover:border-brand/40 group-hover:shadow-glow-soft">
        <span
          aria-hidden
          className="absolute -bottom-4 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-brand/40 blur-md transition-opacity duration-500 group-hover:opacity-100 opacity-60"
        />
        <svg viewBox="0 0 24 24" className="relative h-[17px] w-[17px]">
          <rect x="3.5" y="6" width="17" height="2.3" rx="1.15" fill="#F4F4F5" opacity="0.92" />
          <rect x="3.5" y="10.85" width="11" height="2.3" rx="1.15" fill="#CCFF00" />
          <rect x="3.5" y="15.7" width="17" height="2.3" rx="1.15" fill="#F4F4F5" opacity="0.32" />
        </svg>
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span className="text-[0.95rem] font-medium tracking-[-0.025em] text-fg">
          DESA <span className="font-normal text-fg/60">Menu</span>
        </span>
        {!hideMicro ? (
          <span className="mt-[0.3rem] font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/65">
            Powered by DESA Agency
          </span>
        ) : null}
      </span>
    </span>
  );
}
