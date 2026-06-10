'use client';

/**
 * components/sections/ExperienceSection.tsx
 * ─────────────────────────────────────────────────────────
 * Vertical timeline layout:
 * - Animated vertical line that draws from top
 * - Circle nodes (Briefcase for work, GraduationCap for education)
 * - Content cards that slide in from left with stagger
 * ─────────────────────────────────────────────────────────
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';
import {
  slideInLeft,
  timelineLineVariants,
  containerVariants,
} from '@/lib/animations';
import { formatDate, getDuration } from '@/lib/utils';
import type { Experience } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps): ReactElement {
  const prefersReduced = useReducedMotion();

  const containerProps = prefersReduced
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.1 },
      };

  const cardProps = prefersReduced
    ? {}
    : {
        variants: slideInLeft,
      };

  const lineProps = prefersReduced
    ? {}
    : {
        variants: timelineLineVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.1 },
      };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 lg:py-32 bg-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="experience-heading"
          label="04 / Experience"
          title="Where I've worked"
        />

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            {...lineProps}
            aria-hidden="true"
            className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-border md:left-[27px]"
            style={{ transformOrigin: 'top' }}
          />

          {/* Experience cards */}
          <motion.ol
            {...containerProps}
            role="list"
            className="relative flex flex-col"
          >
            {experiences.map((exp) => {
              const isWork = exp.type === 'work' || exp.type === 'freelance';
              const Icon = isWork ? Briefcase : GraduationCap;

              return (
                <motion.li
                  key={exp.id}
                  {...cardProps}
                  className="flex gap-6 pb-8 last:pb-0 md:gap-8"
                >
                  {/* Timeline node */}
                  <div
                    className={cn(
                      'relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2',
                      'mt-1',
                      isWork
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-muted text-muted-foreground'
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={16} />
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      'flex-1 rounded-2xl border border-border bg-card p-5 md:p-6',
                      'hover:border-primary/30 transition-colors duration-200',
                      'mb-2'
                    )}
                  >
                    {/* Row 1: Role + Company + Dates */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="flex items-center gap-1 mt-0.5 font-medium text-primary">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                            >
                              {exp.company}
                              <ExternalLink size={12} className="opacity-60" />
                            </a>
                          ) : (
                            exp.company
                          )}
                        </p>
                      </div>

                      {/* Date + location type badges */}
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                          {formatDate(exp.startDate)} –{' '}
                          {exp.endDate === 'present' ? 'Present' : formatDate(exp.endDate)}
                        </span>
                        <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground capitalize">
                          {exp.locationType}
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Location */}
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin size={12} className="shrink-0" />
                      {exp.location} · {getDuration(exp.startDate, exp.endDate)}
                    </div>

                    {/* Row 3: Description */}
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    {/* Row 4: Impact bullets */}
                    <ul className="mt-3 space-y-1.5" role="list">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"
                          />
                          <span className="text-sm text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Row 5: Tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} variant="ghost" />
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
