/**
 * app/page.tsx
 * ─────────────────────────────────────────────────────────
 * Homepage — assembles all section components in order.
 * Data is fetched here (server component) and passed
 * as props; no data access inside leaf components.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { featuredProjects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection categories={skillCategories} />
      <ExperienceSection items={experiences} />
      <ProjectsSection projects={featuredProjects} />
      <BlogSection />
      <ContactSection />
    </>
  );
}
