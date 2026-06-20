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

  const workExperiences = experiences.filter(
    (exp) => exp.type === 'work' || exp.type === 'freelance'
  );
  
  const educationExperiences = experiences.filter(
    (exp) => exp.type === 'education'
  );

  const renderExperienceItem = (exp: Experience) => {
    const isWork = exp.type === 'work' || exp.type === 'freelance';
    const Icon = isWork ? Briefcase : GraduationCap;

    return (
      <motion.li
        key={exp.id}
        {...cardProps}
        className="flex gap-4 pb-8 last:pb-0 md:gap-6"
      >
        {/* Timeline node */}
        <div
          className={cn(
            'relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 mt-1',
            isWork
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-muted text-muted-foreground'
          )}
          aria-hidden="true"
        >
          <Icon size={14} />
        </div>

        {/* Content card */}
        <div
          className={cn(
            'flex-1 rounded-2xl border border-border bg-card p-4 md:p-5',
            'hover:border-primary/30 transition-colors duration-200',
            'mb-2'
          )}
        >
          {/* Row 1: Role + Company + Dates */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h4 className="text-base font-semibold text-foreground">
                {exp.role}
              </h4>
              <p className="flex items-center gap-1 mt-0.5 text-sm font-medium text-primary">
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
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground font-mono">
                {formatDate(exp.startDate)} –{' '}
                {exp.endDate === 'present' ? 'Present' : formatDate(exp.endDate)}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground capitalize">
                {exp.locationType}
              </span>
            </div>
          </div>

          {/* Row 2: Location */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin size={11} className="shrink-0" />
            {exp.location} · {getDuration(exp.startDate, exp.endDate)}
          </div>

          {/* Row 3: Description */}
          <p className="mt-2.5 text-xs md:text-sm leading-relaxed text-muted-foreground">
            {exp.description}
          </p>

          {/* Row 4: Impact bullets */}
          {exp.bullets && exp.bullets.length > 0 && (
            <ul className="mt-2.5 space-y-1" role="list">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary"
                  />
                  <span className="text-xs text-muted-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Row 5: Tech tags */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {exp.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} variant="ghost" />
              ))}
            </div>
          )}
        </div>
      </motion.li>
    );
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
          title="Experience & Education"
        />

        {/* Timeline columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mt-12">
          
          {/* Work Experience Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Briefcase className="text-primary h-4 w-4 shrink-0" />
              <span>Work Experience</span>
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <motion.div
                {...lineProps}
                aria-hidden="true"
                className="absolute left-[17px] top-0 bottom-0 w-[1px] bg-border"
                style={{ transformOrigin: 'top' }}
              />

              <motion.ol
                {...containerProps}
                role="list"
                className="relative flex flex-col"
              >
                {workExperiences.map((exp) => renderExperienceItem(exp))}
              </motion.ol>
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <GraduationCap className="text-primary h-4 w-4 shrink-0" />
              <span>Education</span>
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <motion.div
                {...lineProps}
                aria-hidden="true"
                className="absolute left-[17px] top-0 bottom-0 w-[1px] bg-border"
                style={{ transformOrigin: 'top' }}
              />

              <motion.ol
                {...containerProps}
                role="list"
                className="relative flex flex-col"
              >
                {educationExperiences.map((exp) => renderExperienceItem(exp))}
              </motion.ol>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
