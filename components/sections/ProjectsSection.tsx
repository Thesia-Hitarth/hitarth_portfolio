'use client';

/**
 * components/sections/ProjectsSection.tsx
 */

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import type { ReactElement } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { containerVariants, scaleIn } from '@/lib/animations';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { ProjectCard, ProjectImagePlaceholder } from '@/components/projects/ProjectCard';

const STATUS_STYLES: Record<Project['status'], string> = {
  live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  archived: 'bg-muted text-muted-foreground border border-border',
};

const STATUS_LABELS: Record<Project['status'], string> = {
  live: '● Live',
  'in-progress': '● In Progress',
  archived: 'Archived',
};

interface ProjectsSectionProps {
  projects: Project[];
  featured: Project[];
}

export function ProjectsSection({ projects, featured }: ProjectsSectionProps): ReactElement {
  const prefersReduced = useReducedMotion();

  const gridContainerProps = prefersReduced
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.1 },
      };

  const cardProps = prefersReduced ? {} : { variants: scaleIn };

  const gridProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="projects-heading"
          label="05 / Projects"
          title="Things I've built"
          subtitle="A selection of projects that show my range."
        />

        {/* PART A: Featured spotlight */}
        {featured.map((project) => (
          <AnimatedSection key={project.slug} className="mb-12">
            <div
              className={cn(
                'grid grid-cols-1 overflow-hidden rounded-2xl border border-border',
                'hover:border-primary/40 transition-all duration-300 lg:grid-cols-2'
              )}
            >
              {/* Left: Image */}
              <div className="group relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[420px] bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5 border-b lg:border-b-0 lg:border-r border-border">
                <FeaturedProjectImage project={project} />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"
                />
              </div>

              {/* Right: Content */}
              <div className="flex flex-col justify-between bg-card p-6 md:p-8">
                <div>
                  <span
                    className={cn(
                      'inline-block rounded-full px-2.5 py-1 text-xs font-medium',
                      STATUS_STYLES[project.status]
                    )}
                  >
                    {STATUS_LABELS[project.status]}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-foreground">{project.title}</h3>
                  <p className="mt-1 text-muted-foreground">{project.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-2" role="list">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <TechBadge key={tech} name={tech} variant="default" />
                    ))}
                  </div>

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <ExternalLink size={14} />
                        Live demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        <GithubIcon size={14} />
                        View code
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    >
                      Case study →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* PART B: Projects grid */}
        {gridProjects.length > 0 && (
          <motion.div
            {...gridContainerProps}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12"
          >
            {gridProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                cardProps={cardProps}
              />
            ))}
          </motion.div>
        )}

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            View all projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectImage({ project }: { project: Project }): ReactElement {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {project.coverImage && !imgError ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12">
          <div className="relative w-full h-full">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              priority
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      ) : (
        <ProjectImagePlaceholder
          title={project.title}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </>
  );
}

