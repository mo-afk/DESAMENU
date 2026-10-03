import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  linkTo?: string;
  linkLabel?: string;
}

export default function SectionHeading({ index, eyebrow, title, accent, linkTo, linkLabel }: Props) {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 border-t border-bone/15 pt-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
            <span className="bg-lime px-1.5 py-0.5 font-bold text-ink">{index}</span>&nbsp;&nbsp;{eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
            {title} {accent && <span className="font-serif normal-case italic font-medium">{accent}</span>}
          </h2>
        </div>
        {linkTo && linkLabel && (
          <Link
            to={linkTo}
            className="group inline-flex shrink-0 items-center gap-2 border border-bone/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-bone hover:text-ink"
          >
            {linkLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}
