import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import Reveal from '../Reveal';
import DesaContactForm from './DesaContactForm';
import { useI18n } from '../../i18n';

export default function DesaContact() {
  const { t } = useI18n();
  /* Contact details are not translated — only the labels around them are. */
  const CHANNELS = [
    { icon: Mail, label: t('contact.channelLabels.email'), value: 'hello@desamenu.com', href: 'mailto:hello@desamenu.com', ltr: true },
    { icon: MessageCircle, label: t('contact.channelLabels.whatsapp'), value: t('contact.channelValues.whatsapp'), href: 'https://wa.me/', ltr: false },
    { icon: Instagram, label: t('contact.channelLabels.instagram'), value: '@desamenu', href: 'https://instagram.com/desamenu', ltr: true },
    { icon: Phone, label: t('contact.channelLabels.phone'), value: t('contact.channelValues.phone'), href: 'tel:+212600000000', ltr: true },
  ];
  return (
    <section id="desa-demo" className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Intro */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
              <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">{t('contact.index')}</span>&nbsp;&nbsp;{t('contact.eyebrow')}
            </p>
            <h2 className="display-section mt-4 break-words font-display uppercase tracking-tight">
              {t('contact.title')} <span className="font-serif normal-case italic font-medium text-lime">{t('contact.accent')}</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70">
              {t('contact.intro')}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 border-t border-bone/10">
              {CHANNELS.map(({ icon: Icon, label, value, href, ltr }) => (
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
                      <span className="mt-1 block truncate text-sm text-bone/85" dir={ltr ? 'ltr' : undefined}>{value}</span>
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
