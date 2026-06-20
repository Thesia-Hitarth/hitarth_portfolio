'use client';

/**
 * components/sections/SkillsSection.tsx
 */

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
import type { SkillCategory, Skill } from '@/lib/types';
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

interface SkillWithIcon extends Skill {
  icon: string;
}

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsSectionProps): ReactElement {
  const uniqueSkillsMap = new Map();
  categories.forEach((cat) => {
    cat.skills.forEach((skill) => {
      if (!uniqueSkillsMap.has(skill.name)) {
        uniqueSkillsMap.set(skill.name, {
          ...skill,
          icon: cat.icon,
        });
      }
    });
  });
  const allSkills = Array.from(uniqueSkillsMap.values());

  const midpoint = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, midpoint);
  const row2 = allSkills.slice(midpoint);

  const renderSkillCard = (skill: SkillWithIcon, index: number, isCopy: boolean) => {
    const Icon = ICON_MAP[skill.icon] ?? Monitor;
    const isLearning = skill.level === 'learning';
    return (
      <div
        key={`${skill.name}-${isCopy ? 'copy' : 'orig'}-${index}`}
        className={cn(
          'flex items-center gap-4 rounded-2xl border bg-card py-4 px-7 md:py-5 md:px-8 shrink-0',
          'transition-all duration-300 hover:scale-103 hover:shadow-md',
          isLearning
            ? 'border-dashed border-primary/30 hover:border-primary/50'
            : 'border-border hover:border-primary/40'
        )}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon size={20} className="shrink-0" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-bold text-foreground whitespace-nowrap">{skill.name}</span>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap">
            {isLearning ? 'Exploring' : LEVEL_LABEL[skill.level] ?? skill.level}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-32 lg:py-40 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="skills-heading"
          label="03 / Skills"
          title="What I work with"
          subtitle="Technologies and tools I use to build things."
        />

        <div className="space-y-8 mt-16 relative w-full">
          {/* Gradient overlay masks on left and right for fade effect */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1: Left to Right / Reverse Marquee */}
          <div className="flex overflow-hidden w-full">
            <div className="flex shrink-0 gap-6 pr-6 animate-marquee">
              {row1.map((skill, idx) => renderSkillCard(skill, idx, false))}
            </div>
            <div className="flex shrink-0 gap-6 pr-6 animate-marquee" aria-hidden="true">
              {row1.map((skill, idx) => renderSkillCard(skill, idx, true))}
            </div>
          </div>

          {/* Row 2: Right to Left / Forward Marquee */}
          <div className="flex overflow-hidden w-full">
            <div className="flex shrink-0 gap-6 pr-6 animate-marquee-reverse">
              {row2.map((skill, idx) => renderSkillCard(skill, idx, false))}
            </div>
            <div className="flex shrink-0 gap-6 pr-6 animate-marquee-reverse" aria-hidden="true">
              {row2.map((skill, idx) => renderSkillCard(skill, idx, true))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
