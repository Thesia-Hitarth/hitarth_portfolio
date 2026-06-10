/**
 * components/sections/HeroSection.tsx
 * ─────────────────────────────────────────────────────────
 * Hero section shell — Phase 1.
 * Receives no props; reads from siteConfig directly.
 * Animations (Framer Motion) added in Phase 2.
 * ─────────────────────────────────────────────────────────
 */

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
      aria-label="Hero"
    >
      <div className="mx-auto max-w-4xl text-center">
        {/* Open-to-work badge */}
        {siteConfig.openToWork && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to work
          </div>
        )}

        {/* Headline */}
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>

        {/* Sub-headline */}
        <p className="mb-4 text-2xl font-semibold text-primary sm:text-3xl">
          {siteConfig.title}
        </p>

        {/* Tagline */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {siteConfig.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#projects"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          >
            View my work
          </Link>
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Download résumé
          </a>
        </div>

        {/* Location */}
        <p className="mt-8 text-sm text-muted-foreground">
          📍 {siteConfig.location}
        </p>
      </div>
    </section>
  );
}
