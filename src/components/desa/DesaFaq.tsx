import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import { useI18n } from '../../i18n';

/**
 * Frequently asked questions.
 *
 * Every answer is grounded in what the site already claims elsewhere (no app
 * download, five-week onboarding, existing QR codes keep working, video is
 * optional, loyalty runs without a download) — nothing invented, and nothing
 * that would need a commercial decision from the operator.
 *
 * One row is open at a time; the first is open on arrival so the section never
 * reads as a wall of closed bars.
 */
export default function DesaFaq() {
  const { dict } = useI18n();
  const f = dict.faq;
  const [open, setOpen] = useState(0);

  return (
    <section id="desa-faq" className="border-y border-bone/10 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading index={f.index} eyebrow={f.eyebrow} title={f.title} accent={f.accent} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-fog">{dict.cta.sub}</p>
            <a
              href="#desa-demo"
              className="mt-6 inline-flex items-center gap-2 border border-bone/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              {dict.contact.title} {dict.contact.accent}
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ul className="border-t border-bone/15">
              {f.items.map((item, i) => {
                const isOpen = i === open;
                return (
                  <li key={item.q} className="border-b border-bone/15">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-start"
                    >
                      <span className={`font-display text-base uppercase leading-tight tracking-tight transition-colors sm:text-lg ${isOpen ? 'text-lime' : 'text-bone group-hover:text-lime'}`}>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300 ${
                          isOpen ? 'rotate-45 border-lime text-lime' : 'border-bone/25 text-bone/70'
                        }`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 text-sm leading-relaxed text-bone/70">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
