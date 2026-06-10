/**
 * components/sections/AboutSection.tsx
 * ─────────────────────────────────────────────────────────
 * About section shell — Phase 1.
 * ─────────────────────────────────────────────────────────
 */

import { siteConfig } from '@/config/site';

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-label="About me"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        About Me
      </h2>
      <div className="h-1 w-16 rounded-full bg-primary mb-10" />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>{siteConfig.description}</p>
          <p>
            Based in {siteConfig.location}, I work across the full stack — from designing
            relational schemas and building RESTful APIs to crafting pixel-perfect UIs with
            Next.js and Tailwind CSS. I care deeply about code quality, developer experience,
            and shipping software that actually works in production.
          </p>
          <p>
            When I&apos;m not writing code, I&apos;m contributing to open source, writing technical
            articles, or mentoring junior developers in my local community.
          </p>
        </div>

        {/* Quick-facts grid — TODO Phase 2: animate these in */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Location', value: siteConfig.location },
            { label: 'Email', value: siteConfig.email },
            { label: 'Status', value: siteConfig.openToWork ? 'Open to work' : 'Not available' },
            { label: 'Focus', value: 'Full-Stack Development' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground break-words">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
