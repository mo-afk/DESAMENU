import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.8125rem]",
  lg: "h-[3.25rem] px-7 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-black hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0",
  secondary:
    "border border-white/12 bg-white/[0.02] text-fg backdrop-blur-sm hover:-translate-y-0.5 hover:border-brand/45 hover:bg-white/[0.05] hover:shadow-glow-soft active:translate-y-0",
  ghost:
    "text-muted hover:text-fg hover:bg-white/[0.04] border border-transparent",
};

/** Animated light sweep that runs across primary buttons on hover. */
function Sheen({ tone }: { tone: "light" | "soft" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-premium group-hover:translate-x-full ${
        tone === "light"
          ? "bg-gradient-to-r from-transparent via-white/55 to-transparent"
          : "bg-gradient-to-r from-transparent via-brand/12 to-transparent"
      }`}
    />
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  arrow?: "right" | "up-right";
};

type ButtonLinkProps = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Anchor / route CTA. Renders an internal link or an external `a`. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
  withArrow = true,
  arrow = "right",
  ...rest
}: ButtonLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <span className="relative z-10 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px">
          {arrow === "up-right" ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </span>
      ) : null}
      <Sheen tone={variant === "primary" ? "light" : "soft"} />
    </>
  );

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`;

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button">;

/** Native button, used by the contact form. */
export function Button({
  children,
  variant = "primary",
  size = "lg",
  className,
  withArrow = false,
  arrow = "right",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        className ?? ""
      }`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <span className="relative z-10 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px">
          {arrow === "up-right" ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </span>
      ) : null}
      <Sheen tone={variant === "primary" ? "light" : "soft"} />
    </button>
  );
}

export default ButtonLink;
