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
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Tag,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import { siteConfig } from '@/config/site';
import { ProjectImagePlaceholder } from '@/components/projects/ProjectCard';
import { TechBadge } from '@/components/ui/TechBadge';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { cn } from '@/lib/utils';

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

// ── Helper to find sibling projects for looping navigation ─────
function getProjectSiblings(currentSlug: string) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return { prev: null, next: null };

  const total = projects.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}

const STATUS_STYLES: Record<string, string> = {
  live: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  'in-progress': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  archived: 'bg-muted text-muted-foreground border border-border',
};

// ── Page component ─────────────────────────────────────

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getProjectSiblings(slug);

  return (
    <div className="min-h-screen bg-background">
      {/* ZONE 1: Navigation & Breadcrumbs */}
      <div className="border-b border-border bg-card/20 backdrop-blur-md sticky top-[65px] z-30">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          >
            <ArrowLeft size={16} />
            <span>Back to projects</span>
          </Link>

          <nav aria-label="Breadcrumb" className="hidden sm:block">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground" role="list">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-muted-foreground/40">/</li>
              <li>
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-muted-foreground/40">/</li>
              <li className="text-foreground font-medium select-all" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ZONE 2: Hero Banner Block */}
      <header className="relative w-full overflow-hidden border-b border-border bg-gradient-to-b from-muted/30 to-background py-16 lg:py-24">
        <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                {project.category === 'fullstack' ? 'Full-Stack' : project.category}
              </span>
              <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold capitalize border', STATUS_STYLES[project.status])}>
                {project.status === 'live' ? '● Live' : project.status === 'in-progress' ? '● In Progress' : project.status}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar size={13} />
                {project.year}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>
      </header>

      {/* ZONE 3: Split Overview & Sidebar Block */}
      <section className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="overview-heading">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Case Study Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h2 id="overview-heading" className="text-2xl font-bold text-foreground tracking-tight border-b border-border pb-3">
                Overview
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                Key Technical Accomplishments
              </h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex gap-3 items-start border border-border bg-card/30 rounded-xl p-4 transition-colors hover:border-primary/20">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges / Engineering Decisions */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                Engineering Challenges & Decisions
              </h3>
              {project.challenges && project.challenges.length > 0 ? (
                <div className="space-y-4">
                  {project.challenges.map((challenge, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-primary/10 bg-primary/5">
                      <ShieldCheck size={20} className="shrink-0 text-primary mt-0.5" />
                      <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 p-5 rounded-2xl border border-dashed border-border bg-card/25 text-left">
                  <AlertCircle size={20} className="shrink-0 text-muted-foreground/60 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Architecture Details</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Detailed code walkthroughs, design patterns, and engineering decision log books for this showcase are available upon request.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Metadata Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Sidebar Info Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-6">
                  Project Details
                </h3>

                <dl className="space-y-4" role="presentation">
                  <div>
                    <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground capitalize">
                      {project.status === 'live' ? 'Live Production' : project.status === 'in-progress' ? 'In Active Development' : project.status}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Timeline</dt>
                    <dd className="mt-1 text-sm text-foreground flex items-center gap-1.5 font-medium">
                      <Calendar size={14} className="text-muted-foreground" />
                      {project.year} Release
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Category</dt>
                    <dd className="mt-1 text-sm text-foreground flex items-center gap-1.5 font-medium">
                      <Tag size={14} className="text-muted-foreground" />
                      <span className="capitalize">{project.category === 'fullstack' ? 'Full-Stack App' : project.category}</span>
                    </dd>
                  </div>
                </dl>

                {/* Direct Action CTAs */}
                <div className="mt-8 space-y-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <ExternalLink size={16} />
                      Launch Live Demo
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-muted py-3 text-sm font-semibold text-muted-foreground opacity-60"
                    >
                      Demo Offline / Internal
                    </button>
                  )}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <GithubIcon size={16} />
                      Browse Repository
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm font-semibold text-muted-foreground opacity-60"
                    >
                      Codebase Private
                    </button>
                  )}
                </div>
              </div>

              {/* Stack Preview */}
              <div className="rounded-2xl border border-border bg-card/30 p-6">
                <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} name={tech} variant="default" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE 4: Related Stack / Overrides Grid */}
      <section className="border-t border-b border-border bg-muted/10 py-16" aria-labelledby="tech-grid-heading">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 id="tech-grid-heading" className="text-2xl font-bold text-foreground tracking-tight">
              Technology Ecosystem
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Full breakdown of languages, databases, tools, and runtimes leveraged specifically for {project.title}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {project.stack.map((tech) => (
              <div
                key={tech}
                className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-sm font-semibold text-foreground">{tech}</span>
                <span className="font-mono text-[10px] text-muted-foreground mt-6 uppercase tracking-wider">
                  Verified Stack
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE 5: Next/Prev Looping Navigators */}
      <footer className="container mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" aria-label="Project Navigation">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <ChevronLeft size={20} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Previous Project
                  </span>
                  <h4 className="text-base font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {prev.title}
                  </h4>
                </div>
              </div>
            </Link>
          )}

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 text-right"
            >
              <div className="flex items-center gap-4 ml-auto justify-end">
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    Next Project
                  </span>
                  <h4 className="text-base font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors">
                    {next.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
