"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

declare global {
  interface Window {
    /** Signals that the client bundle hydrated — disarms the reveal failsafe. */
    __desaRevealReady?: boolean;
  }
}

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "span";
};

/**
 * Lightweight scroll-reveal. Uses a single IntersectionObserver per element
 * and a CSS transition — no animation library required.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Hydration reached this component: the failsafe is no longer needed. */
    window.__desaRevealReady = true;

    /* Already force-revealed by the failsafe — leave it visible. */
    if (document.documentElement.classList.contains("reveal-all")) {
      node.dataset.reveal = "in";
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "in";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal="out"
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
