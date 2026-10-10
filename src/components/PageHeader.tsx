import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

/** Shared blueprint page header used by every inner page. */
export default function PageHeader({ index, eyebrow, title, description, children }: Props) {
  return (
    <section className="bg-blueprint border-b border-bone/10">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 md:px-12 lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-fog"
        >
          {index} — {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="display-type display-page mt-6 font-display uppercase tracking-tight"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
