/**
 * app/projects/page.tsx
 * ─────────────────────────────────────────────────────────
 * Static page listing all projects.
 * Includes search & filter controls.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my projects ranging from full-stack applications to open-source contributions.',
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: 'Explore my projects ranging from full-stack applications to open-source contributions.',
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header Section */}
        <header className="mb-12 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </Link>
          <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            05 / Projects
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            My Projects
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            A comprehensive catalog of applications, tools, and integrations I have built. Use the filters below to search by technology stack or category.
          </p>
        </header>

        {/* Searchable and Filterable Projects Grid */}
        <ProjectsGrid initialProjects={projects} />
      </div>
    </div>
  );
}
