/**
 * components/sections/SkillsSection.tsx
 * ─────────────────────────────────────────────────────────
 * Skills section — renders skill categories passed as props.
 * ─────────────────────────────────────────────────────────
 */

import type { SkillCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

/** Visual indicator for each proficiency level */
const LEVEL_STYLES: Record<string, string> = {
  learning: 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30',
  comfortable: 'bg-violet-500/20 text-violet-600 dark:text-violet-400 border-violet-500/30',
  proficient: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
  expert: 'bg-primary/15 text-primary border-primary/30',
};

export function SkillsSection({ categories }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="bg-muted/30 px-6 py-24"
      aria-label="Skills"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills
        </h2>
        <div className="h-1 w-16 rounded-full bg-primary mb-10" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-2" role="list">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                        LEVEL_STYLES[skill.level]
                      )}
                      title={`Level: ${skill.level}`}
                    >
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="font-semibold">Proficiency:</span>
          {Object.entries(LEVEL_STYLES).map(([level, styles]) => (
            <span
              key={level}
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 capitalize',
                styles
              )}
            >
              {level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
