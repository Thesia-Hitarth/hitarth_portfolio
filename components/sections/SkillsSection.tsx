'use client';

/**
 * components/sections/SkillsSection.tsx
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Monitor,
  Server,
  Database,
  Wrench,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactElement } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';
import { containerVariants } from '@/lib/animations';
import type { SkillCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Wrench,
  Sparkles,
};

const LEVEL_LABEL: Record<string, string> = {
  learning: 'Learning',
  comfortable: 'Comfortable',
  proficient: 'Proficient',
  expert: 'Expert',
};

// Card entrance variant — ease as 4-tuple
const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps): ReactElement {
  const prefersReduced = useReducedMotion();

  const containerProps = prefersReduced
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.1 },
      };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="skills-heading"
          label="03 / Skills"
          title="What I work with"
          subtitle="Technologies and tools I use to build things."
        />

        <motion.div
          {...containerProps}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const Icon = ICON_MAP[category.icon] ?? Monitor;
            const isLearning =
              category.name.toLowerCase().includes('learning') ||
              category.name.toLowerCase().includes('exploring');

            return (
              <motion.div
                key={category.name}
                variants={prefersReduced ? undefined : cardItemVariants}
                className={cn(
                  'rounded-2xl border bg-card p-6',
                  'hover:shadow-sm transition-all duration-300',
                  isLearning
                    ? 'border-dashed border-primary/30 hover:border-primary/50'
                    : 'border-border hover:border-primary/40'
                )}
              >
                <div className="flex flex-col">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">
                    {isLearning ? 'Currently Exploring' : category.name}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <TechBadge
                      key={skill.name}
                      name={skill.name}
                      variant={isLearning ? 'outline' : 'default'}
                      tooltip={LEVEL_LABEL[skill.level] ?? skill.level}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
