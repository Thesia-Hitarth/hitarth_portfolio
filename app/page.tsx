/**
 * app/page.tsx
 * ─────────────────────────────────────────────────────────
 * Homepage — assembles all section components in order.
 * Data is fetched here (server component) and passed
 * as props; no data access inside leaf components.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { GitHubSection } from '@/components/sections/GitHubSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { projects, featuredProjects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { experiences } from '@/data/experience';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.title}`,
  },
  description: siteConfig.description,
};

export default function HomePage(): ReactElement {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    image: `${siteConfig.url}Passportsize_Hitarth.png`,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'India',
    },
    description: siteConfig.description,
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <HeroSection />
      <AboutSection />
      <SkillsSection categories={skillCategories} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} featured={featuredProjects} />
      <GitHubSection />
      <BlogSection />
      <ContactSection />
      <TestimonialsSection />
    </>
  );
}
