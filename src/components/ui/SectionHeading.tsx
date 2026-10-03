import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Shared editorial section intro: eyebrow + headline + supporting copy. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      } ${className ?? ""}`}
    >
      {eyebrow ? (
        <Reveal>
          <div
            className={`mb-5 flex items-center gap-3 ${
              centered ? "justify-center" : ""
            }`}
          >
            <span aria-hidden className="h-px w-6 bg-brand/60" />
            <span className="text-eyebrow text-brand/85">{eyebrow}</span>
          </div>
        </Reveal>
      ) : null}

      <Reveal delay={60}>
        <h2
          id={id}
          className={`text-balance text-[1.75rem] font-medium leading-[1.08] tracking-[-0.03em] text-fg sm:text-4xl lg:text-[2.85rem] ${
            centered ? "mx-auto max-w-3xl" : "max-w-3xl"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={120}>
          <p
            className={`mt-5 text-[0.9375rem] leading-relaxed text-muted sm:text-base ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
