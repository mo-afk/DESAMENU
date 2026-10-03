import { NAV_LINKS, site } from "@/lib/site";
import Container from "../ui/Container";
import { Instagram, Mail, WhatsApp } from "../ui/Icons";
import Logo from "../ui/Logo";

const SOCIALS = [
  { label: "Instagram", href: site.instagram, Icon: Instagram },
  { label: "WhatsApp", href: site.whatsapp, Icon: WhatsApp },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#0d0d0d]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-brand/[0.07] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-10 lg:py-16">
          {/* Brand */}
          <div>
            <a
              href="#top"
              aria-label="DESA Menu — back to top"
              className="group inline-block"
            >
              <Logo hideMicro />
            </a>
            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/50">
              Powered by {site.agency}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/55">
              Explore
            </h2>
            <ul className="mt-5 space-y-3.5">
              {NAV_LINKS.filter((link) =>
                ["#features", "#demos", "#contact"].includes(link.href),
              ).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[0.875rem] tracking-tight text-muted transition-colors duration-300 hover:text-fg"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-brand/70 transition-all duration-400 ease-premium group-hover:w-4"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/55">
              Connect
            </h2>
            <ul className="mt-5 space-y-3.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2.5 text-[0.875rem] tracking-tight text-muted transition-colors duration-300 hover:text-brand"
                  >
                    <Icon className="h-4 w-4 text-muted/60 transition-colors duration-300 group-hover:text-brand" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/[0.07] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] tracking-tight text-muted/60">
            © {year} DESA Menu — a {site.agency} product. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="text-[0.75rem] tracking-tight text-muted/60 transition-colors duration-300 hover:text-fg"
            >
              {site.email}
            </a>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/60 transition-colors duration-300 hover:text-brand"
            >
              Back to top
              <span
                aria-hidden
                className="transition-transform duration-400 ease-premium group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
