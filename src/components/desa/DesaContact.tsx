import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import Reveal from '../Reveal';
import DesaContactForm from './DesaContactForm';

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'hello@desamenu.com', href: 'mailto:hello@desamenu.com' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Start a conversation', href: 'https://wa.me/' },
  { icon: Instagram, label: 'Instagram', value: '@desamenu', href: 'https://instagram.com/desamenu' },
  { icon: Phone, label: 'Phone', value: '+212 6 00 00 00 00', href: 'tel:+212600000000' },
];

export default function DesaContact() {
  return (
    <section id="desa-demo" className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Intro */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
              <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">07</span>&nbsp;&nbsp;Contact
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
              Request a <span className="font-serif normal-case italic font-medium text-lime">custom demo.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70">
              Tell us about your venue and we&apos;ll show you how DESA Menu can be tailored to your guest experience.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 border-t border-bone/10">
              {CHANNELS.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-4 border-b border-bone/10 py-4 transition-colors hover:bg-bone/[0.03]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-bone/15 text-bone/70 transition-colors group-hover:border-lime group-hover:text-lime">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">{label}</span>
                      <span className="mt-1 block truncate text-sm text-bone/85">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.12} className="lg:col-span-7">
          <DesaContactForm />
        </Reveal>
      </div>
    </section>
  );
}
