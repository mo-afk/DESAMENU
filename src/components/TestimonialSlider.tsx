import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import type { Testimonial } from '../lib/api';
import { useI18n } from '../i18n';

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, items.length]);

  if (items.length === 0) return null;
  const item = items[index % items.length];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative border border-bone/15 bg-coal p-8 sm:p-12 lg:p-16">
      <Quote className="h-10 w-10 text-lime" strokeWidth={1.5} />
      <div className="mt-6 min-h-[190px] sm:min-h-[150px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="max-w-4xl font-serif text-2xl italic leading-snug text-bone sm:text-3xl lg:text-4xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-display text-sm uppercase tracking-wide">{item.author}</span>
              <span className="font-mono text-xs text-fog">{item.role} - {item.company}</span>
              <span className="flex gap-1">
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-lime text-lime" />
                ))}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-bone/10 pt-6">
        <span className="font-mono text-xs tracking-[0.25em] text-fog">
          {String((index % items.length) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <div className="flex gap-3">
          <button onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors hover:bg-bone hover:text-ink" aria-label={t('common.prevTestimonial')}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setIndex((i) => (i + 1) % items.length)} className="flex h-11 w-11 items-center justify-center border border-bone/20 transition-colors hover:bg-bone hover:text-ink" aria-label={t('common.nextTestimonial')}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
