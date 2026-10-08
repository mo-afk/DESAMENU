import Reveal from '../Reveal';
import { DesaButtonAnchor } from './DesaUI';
import { useI18n } from '../../i18n';

export default function DesaCta() {
  const { t, dict } = useI18n();
  const c = dict.cta;
  return (
    <section className="relative overflow-hidden border-y border-bone/10">
      <img src="/images/texture-ink.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-center sm:px-8 lg:py-32">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">{c.eyebrow}</p>
          <h2 className="display-type display-section mx-auto mt-6 max-w-5xl break-words font-display uppercase">
            {c.title} <span className="font-serif normal-case italic font-medium text-lime">{c.accent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">
            {c.sub}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <DesaButtonAnchor href="#desa-demo" variant="lime">
              {t('common.bookDemo')}
            </DesaButtonAnchor>
            <DesaButtonAnchor href="#desa-demos" variant="outline">
              {t('common.exploreDemos')}
            </DesaButtonAnchor>
          </div>

          <ul className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {c.proof.map((p) => (
              <li key={p} className="border border-bone/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
