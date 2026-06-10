/**
 * components/sections/ExperienceSection.tsx
 * ─────────────────────────────────────────────────────────
 * Experience section — timeline view of work and education.
 * ─────────────────────────────────────────────────────────
 */

import type { Experience } from '@/lib/types';
import { formatDate, getDuration } from '@/lib/utils';

interface ExperienceSectionProps {
  items: Experience[];
}

export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-label="Experience"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Experience
      </h2>
      <div className="h-1 w-16 rounded-full bg-primary mb-10" />

      <ol className="relative border-l border-border pl-8 space-y-10" role="list">
        {items.map((exp) => (
          <li key={exp.id} className="relative">
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className="absolute -left-[2.0625rem] mt-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
            />

            {/* Date range */}
            <time className="mb-1 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {formatDate(exp.startDate)} — {exp.endDate === 'present' ? 'Present' : formatDate(exp.endDate)}
              {' · '}
              {getDuration(exp.startDate, exp.endDate)}
            </time>

            {/* Role + company */}
            <h3 className="text-lg font-bold text-foreground">
              {exp.role}
            </h3>
            <p className="mb-2 text-sm font-medium text-primary">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
              {' · '}
              <span className="font-normal text-muted-foreground capitalize">
                {exp.locationType}
              </span>
              {' · '}
              <span className="font-normal text-muted-foreground">{exp.location}</span>
            </p>

            {/* Description */}
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              {exp.description}
            </p>

            {/* Impact bullets */}
            <ul className="mb-4 space-y-2" role="list">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-0.5 shrink-0 text-primary">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
