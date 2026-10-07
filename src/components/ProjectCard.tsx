import { Link } from 'react-router-dom';
import { ArrowUpRight, Dices } from 'lucide-react';
import type { Project } from '../lib/api';

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <Link to={`/demos/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-carbon ${large ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
        <img
          src={project.image_url}
          alt={project.title}
          loading="lazy"
          className="img-warm h-full w-full object-cover group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
        <div aria-hidden className="warm-veil pointer-events-none absolute inset-0" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-honey backdrop-blur-sm">{project.industry}</span>
          <span className="bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">{project.category}</span>
        </div>
        <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
        {project.featured && (
          <span className="absolute right-4 top-4 bg-lime px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Featured</span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <h3 className="font-display text-xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-2xl">{project.title}</h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-fog">{project.client}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-bone/70">{project.tagline}</p>
          {project.games.length > 0 && (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-honey/90">
              {project.games.slice(0, 2).map((g) => (
                <span key={g} className="inline-flex items-center gap-1"><Dices className="h-3 w-3" />{g}</span>
              ))}
              {project.games.length > 2 && <span className="text-smoke">+{project.games.length - 2} more</span>}
            </p>
          )}
        </div>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
      </div>
    </Link>
  );
}

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link to={`/demos/${project.slug}`} className="group grid grid-cols-12 items-center gap-4 border-b border-bone/10 py-6 transition-colors hover:bg-bone/[0.03] sm:gap-6 sm:px-4">
      <span className="col-span-2 font-mono text-xs text-fog sm:col-span-1">{String(index + 1).padStart(2, '0')}</span>
      <div className="col-span-10 sm:col-span-5">
        <h3 className="font-display text-2xl uppercase tracking-tight transition-colors group-hover:text-lime sm:text-4xl">{project.title}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{project.client} - {project.industry}</p>
      </div>
      <div className="hidden sm:col-span-4 sm:block">
        <p className="text-sm text-bone/60">{project.tagline}</p>
      </div>
      <div className="col-span-10 col-start-3 flex items-center justify-between sm:col-span-2 sm:col-start-auto sm:justify-end sm:gap-4">
        <span className="inline-flex items-center gap-2 border border-honey/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-honey"><Dices className="h-3 w-3" />{project.games.length} game{project.games.length === 1 ? '' : 's'}</span>
        <ArrowUpRight className="h-5 w-5 text-fog transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" />
      </div>
    </Link>
  );
}
