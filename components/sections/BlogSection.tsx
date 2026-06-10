/**
 * components/sections/BlogSection.tsx
 * ─────────────────────────────────────────────────────────
 * Blog section shell — Phase 1.
 * Phase 4 will connect this to real MDX posts.
 * ─────────────────────────────────────────────────────────
 */

import Link from 'next/link';

export function BlogSection() {
  return (
    <section
      id="blog"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-label="Blog"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Blog
      </h2>
      <div className="h-1 w-16 rounded-full bg-primary mb-10" />

      {/* Coming-soon placeholder — replace in Phase 4 */}
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-lg font-semibold text-foreground">
          Articles coming soon
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          I write about Next.js, TypeScript, distributed systems, and developer tooling.
          Subscribe to get notified when the first post drops.
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Visit the blog →
        </Link>
      </div>
    </section>
  );
}
