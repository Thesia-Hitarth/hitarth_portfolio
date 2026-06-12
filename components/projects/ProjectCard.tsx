'use client';

/**
 * components/projects/ProjectCard.tsx
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { ReactElement } from 'react';
import { TechBadge } from '@/components/ui/TechBadge';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GithubIcon } from '@/components/ui/BrandIcons';

interface ProjectCardProps {
  project: Project;
  cardProps?: any;
}

export function ProjectImagePlaceholder({ title, className }: { title: string; className?: string }): ReactElement {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-muted',
        className
      )}
      aria-label={`${title} — project image placeholder`}
    >
      <span className="font-mono text-sm font-medium text-primary/40 text-center px-4">
        {title}
      </span>
    </div>
  );
}

export function ProjectCard({ project, cardProps = {} }: ProjectCardProps): ReactElement {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      {...cardProps}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card cursor-pointer',
        'hover:border-primary/40 hover:-translate-y-1 hover:shadow-md',
        'transition-all duration-300'
      )}
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5">
        {project.coverImage && !imgError ? (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full h-full">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                onError={() => setImgError(true)}
              />
            </div>
          </div>
        ) : (
          <ProjectImagePlaceholder
            title={project.title}
            className="absolute inset-0 transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-primary capitalize">{project.category}</span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className="mt-1 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <TechBadge key={tech} name={tech} variant="ghost" />
          ))}
          {project.stack.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — live demo`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — GitHub repository`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={15} />
              </a>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Details →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
