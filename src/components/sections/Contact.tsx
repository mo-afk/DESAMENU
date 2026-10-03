import { site } from "@/lib/site";
import Container from "../ui/Container";
import { Instagram, Mail, WhatsApp } from "../ui/Icons";
import Reveal from "../ui/Reveal";
import { GridBackdrop, RadialGlow, SectionDivider } from "../ui/Backdrop";
import ContactForm from "./ContactForm";

const CHANNELS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  {
    label: "WhatsApp",
    value: "Start a conversation",
    href: site.whatsapp,
    Icon: WhatsApp,
  },
  {
    label: "Instagram",
    value: "@desamenu",
    href: site.instagram,
    Icon: Instagram,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <SectionDivider />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackdrop className="opacity-40" />
        <RadialGlow className="-bottom-40 right-0 h-[440px] w-[520px]" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Intro + channels */}
          <div className="flex flex-col">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-brand/60" />
                <span className="text-eyebrow text-brand/85">Contact</span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-6 text-[1.9rem] font-medium leading-[1.06] tracking-[-0.035em] text-fg sm:text-4xl lg:text-[3rem]">
                Request a custom demo.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                Tell us about your venue and we&apos;ll show you how DESA Menu
                can be tailored to your guest experience.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-10 space-y-2.5">
                {CHANNELS.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.015] px-4 py-3.5 transition-all duration-400 ease-premium hover:-translate-y-0.5 hover:border-brand/30 hover:bg-white/[0.035]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-fg/80 transition-colors duration-400 group-hover:border-brand/35 group-hover:text-brand">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/60">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-[0.8125rem] tracking-tight text-fg/90">
                          {value}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="text-muted/40 transition-all duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
