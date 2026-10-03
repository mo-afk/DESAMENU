"use client";

import { useEffect, useState } from "react";
import ButtonLink from "../ui/Button";
import { Close, Plus } from "../ui/Icons";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Demos", href: "#demos" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* Throttle scroll reads to a single animation frame. */
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Lock page scroll while the mobile sheet is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const surface = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium ${
        surface
          ? "border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/60"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between gap-6 transition-[height] duration-500 ease-premium ${
            surface ? "h-16 md:h-[68px]" : "h-[72px] md:h-20"
          }`}
        >
          <a
            href="#top"
            aria-label="DESA Menu — back to top"
            className="group relative -m-2 rounded-xl p-2 transition-transform duration-500 ease-premium hover:-translate-y-px"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-[0.8125rem] tracking-tight text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brand/70 transition-transform duration-400 ease-premium group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <ButtonLink
              href="#contact"
              size="md"
              className="hidden sm:inline-flex"
            >
              Book a Demo
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-fg transition-colors duration-300 hover:border-brand/40 hover:text-brand lg:hidden"
            >
              {open ? (
                <Close className="h-[18px] w-[18px]" />
              ) : (
                <Plus className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/[0.06] bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-premium lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="py-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-white/[0.06]">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base tracking-tight text-fg/90 transition-colors duration-300 hover:text-brand"
                >
                  {link.label}
                  <span aria-hidden className="text-muted/50">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ButtonLink
            href="#contact"
            className="mt-6 w-full"
            onClick={() => setOpen(false)}
          >
            Book a Demo
          </ButtonLink>

          <p className="mt-5 text-center font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/60">
            Powered by DESA Agency
          </p>
        </Container>
      </div>
    </header>
  );
}
