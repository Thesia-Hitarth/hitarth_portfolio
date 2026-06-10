/**
 * app/projects/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────
 * Dynamic project detail page.
 * - generateStaticParams() pre-renders all slugs at build time
 * - generateMetadata() returns OG metadata per project
 * ─────────────────────────────────────────────────────────
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects, getProjectBySlug } from '@/data/projects';
import { siteConfig } from '@/config/site';

// ── Static generation ──────────────────────────────────

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// All slugs not in the array above will 404
export const dynamicParams = false;

// ── Per-page metadata ──────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const url = `${siteConfig.url}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      url,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${siteConfig.name}`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

// ── Page component ─────────────────────────────────────

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-32">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground" role="list">
          <li>
            <a href="/#projects" className="hover:text-foreground transition-colors">
              Projects
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium">{project.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
            {project.category}
          </span>
          <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
            {project.status}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-xl text-muted-foreground">{project.tagline}</p>
      </header>

      {/* Links */}
      <div className="mb-10 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Live Demo ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            GitHub Repository
          </a>
        )}
      </div>

      {/* Description */}
      <section className="mb-10" aria-label="Project description">
        <h2 className="mb-3 text-xl font-bold text-foreground">Overview</h2>
        <p className="leading-relaxed text-muted-foreground">{project.description}</p>
      </section>

      {/* Highlights */}
      <section className="mb-10" aria-label="Technical highlights">
        <h2 className="mb-4 text-xl font-bold text-foreground">Key Highlights</h2>
        <ul className="space-y-3" role="list">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <span aria-hidden="true" className="mt-1 shrink-0 text-primary font-bold">▸</span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section aria-label="Technology stack">
        <h2 className="mb-4 text-xl font-bold text-foreground">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* TODO Phase 2: Replace with full MDX case study via project.longDescription */}
    </article>
  );
}
