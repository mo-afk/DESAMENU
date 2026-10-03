import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

function Svg({
  className = "h-5 w-5",
  strokeWidth = 1.5,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

/* ----------------------------- Interface ----------------------------- */

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12h14" />
    <path d="M13 6.5 18.5 12 13 17.5" />
  </Svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </Svg>
);

export const ChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9.5 12 15.5 18 9.5" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </Svg>
);

export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const Play = ({ className = "h-5 w-5" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M8.4 5.2a1 1 0 0 1 1.5-.87l8.3 5.8a1 1 0 0 1 0 1.74l-8.3 5.8a1 1 0 0 1-1.5-.87z" />
  </svg>
);

export const Scan = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8.5V6.5A2.5 2.5 0 0 1 6.5 4h2M15.5 4h2A2.5 2.5 0 0 1 20 6.5v2M20 15.5v2a2.5 2.5 0 0 1-2.5 2.5h-2M8.5 20h-2A2.5 2.5 0 0 1 4 17.5v-2" />
    <path d="M10 10h4v4h-4z" />
  </Svg>
);

/* ------------------------------ Features ----------------------------- */

export const Video = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M10.5 9.6 15 12l-4.5 2.4z" />
  </Svg>
);

export const ListMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20" />
    <path d="M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />
  </Svg>
);

export const Dice = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <path d="M9 9h.01M15 9h.01M12 12h.01M9 15h.01M15 15h.01" />
  </Svg>
);

export const Award = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.5 13.6 7 21l5-2.8L17 21l-1.5-7.4" />
  </Svg>
);

/* ------------------------------- Values ------------------------------ */

export const Sparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5 13.6 8l4.5 1.6-4.5 1.7L12 15.8l-1.6-4.5L5.9 9.6 10.4 8z" />
    <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
  </Svg>
);

export const Users = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15.5 19.5v-1.6a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1.6" />
    <circle cx="9.2" cy="7.5" r="3.5" />
    <path d="M21 19.5v-1.6a4 4 0 0 0-3-3.85" />
    <path d="M15.8 4.2a3.5 3.5 0 0 1 0 6.7" />
  </Svg>
);

export const Gem = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3.5h11l3 6-8.5 11-8.5-11z" />
    <path d="M3 9.5h18" />
    <path d="M9.7 3.5 8 9.5l4 11" />
    <path d="M14.3 3.5 16 9.5l-4 11" />
  </Svg>
);

export const TrendingUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 17.5 8.5 12l4 4L21 7.5" />
    <path d="M15.5 7.5H21v5.5" />
  </Svg>
);

/* ------------------------------ Use cases ---------------------------- */

export const Restaurant = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 3v6.5a2.5 2.5 0 0 0 5 0V3" />
    <path d="M7 9.5V21" />
    <path d="M16.5 3c1.6 1.3 2.5 3.1 2.5 5.3 0 1.8-.9 3.3-2.5 4.2V21" />
  </Svg>
);

export const Coffee = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9h12v4.5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
    <path d="M16 10h1.6a2.6 2.6 0 0 1 0 5.2H16" />
    <path d="M7.5 5.5v-2M11 5.5v-2" />
    <path d="M3 21h14" />
  </Svg>
);

export const Martini = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 4.5h15L12 12z" />
    <path d="M12 12v7.5" />
    <path d="M8.5 19.5h7" />
    <path d="M17 5.5h.01" />
  </Svg>
);

export const Building = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20.5V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14.5" />
    <path d="M14 10h4a2 2 0 0 1 2 2v8.5" />
    <path d="M7.5 8h3M7.5 12h3M7.5 16h3M17 14h.01M17 17.5h.01" />
    <path d="M2.5 20.5h19" />
  </Svg>
);

/* ------------------------------ Contact ------------------------------ */

export const Mail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M4 7.5l8 5.6 8-5.6" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3h2.7l1.4 4-2 1.4a12.4 12.4 0 0 0 6.6 6.6l1.4-2 4 1.4v2.7A2.4 2.4 0 0 1 18.2 19.5 15.7 15.7 0 0 1 4.5 3.8 2.4 2.4 0 0 1 6.5 3z" />
  </Svg>
);

export const WhatsApp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20.5 12a8.5 8.5 0 0 1-12.7 7.4L3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 20.5 12z" />
    <path d="M9.4 9.2c0 3 2.4 5.4 5.4 5.4.6 0 1-.5 1-1l-1.4-.8-1 .9a6.2 6.2 0 0 1-2.3-2.4l.9-1-.8-1.4c-.5 0-1 .4-1 1z" />
  </Svg>
);

export const Instagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <path d="M17 7h.01" />
  </Svg>
);

/* ------------------------------ Assurance ---------------------------- */

export const ShieldCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 2.8v5.6c0 4.2-2.9 7.7-7 9.6-4.1-1.9-7-5.4-7-9.6V5.8z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Svg>
);

export const Zap = (p: IconProps) => (
  <Svg {...p}>
    <path d="M13.2 3 5.5 13.2h5L10 21l7.7-10.2h-5z" />
  </Svg>
);

export const Star = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4l2.5 5.1 5.5.8-4 3.9.95 5.5L12 16.6 7.05 19.3 8 13.8 4 9.9l5.5-.8z" />
  </Svg>
);
