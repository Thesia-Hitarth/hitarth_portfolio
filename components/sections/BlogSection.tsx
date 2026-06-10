/**
 * components/sections/BlogSection.tsx
 * ─────────────────────────────────────────────────────────
 * Blog section shell — Phase 1.
 * Phase 4 will connect this to real MDX posts.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function BlogSection(): ReactElement {
  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="blog-heading"
          label="06 / Blog"
          title="Latest writing"
          subtitle="Thoughts on Next.js, TypeScript, distributed systems, and developer tooling."
        />

        <AnimatedSection>
          {/* Coming-soon placeholder */}
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-lg font-semibold text-foreground">Articles coming soon</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              I write about Next.js architecture, TypeScript patterns, and lessons learned
              shipping production software.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              Visit the blog
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
