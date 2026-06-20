/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/**
 * components/projects/ProjectCard.tsx
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ExternalLink, ArrowRight } from 'lucide-react';
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
  const router = useRouter();
  
  // Spotlight Hover State & Coords
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`/projects/${project.slug}`);
    }
  };

  return (
    <motion.article
      {...cardProps}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View details for project ${project.title}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card cursor-pointer',
        'hover:border-primary/45 hover:-translate-y-1 hover:shadow-lg',
        'transition-all duration-300 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary'
      )}
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      {/* Vercel Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), var(--primary) / 0.07, transparent 80%)`,
        }}
      />

      {/* Image area */}
      <div className="relative aspect-video overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5 z-10">
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
      <div className="flex flex-grow flex-col p-5 z-10">
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

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — live demo`}
                className="relative z-20 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — GitHub repository`}
                className="relative z-20 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={12} />
                Code
              </a>
            )}
          </div>
          <span
            className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-0.5"
          >
            Case Study
            <ArrowRight size={12} className="transition-transform duration-250 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
