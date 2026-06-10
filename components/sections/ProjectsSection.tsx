/**
 * components/sections/ProjectsSection.tsx
 * ─────────────────────────────────────────────────────────
 * Projects section — renders featured project cards.
 * ─────────────────────────────────────────────────────────
 */

import Link from 'next/link';
import type { Project } from '@/lib/types';

interface ProjectsSectionProps {
  projects: Project[];
}

const STATUS_STYLES: Record<Project['status'], string> = {
  live: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'in-progress': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  archived: 'bg-muted text-muted-foreground border-border',
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="bg-muted/30 px-6 py-24"
      aria-label="Projects"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Featured Projects
        </h2>
        <div className="h-1 w-16 rounded-full bg-primary mb-10" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Card header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>
                <span
                  className={`ml-3 shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              {/* Highlights */}
              <ul className="flex-1 space-y-1.5 px-6 pb-4" role="list">
                {project.highlights.slice(0, 2).map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-1.5 px-6 pb-4">
                {project.stack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 5 && (
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    +{project.stack.length - 5}
                  </span>
                )}
              </div>

              {/* Card footer actions */}
              <div className="flex items-center gap-3 border-t border-border px-6 py-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Case Study →
                </Link>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
