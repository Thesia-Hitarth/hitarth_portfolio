/**
 * app/blog/page.tsx
 * ─────────────────────────────────────────────────────────
 * Blog listing page — shell (Phase 1).
 * Phase 4 will populate this with MDX frontmatter.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog',
  description:
    'Articles on Next.js, TypeScript, distributed systems, and developer tooling — written by Hitarth Thesia.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-32">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground">
        Blog
      </h1>
      <div className="h-1 w-16 rounded-full bg-primary mb-10" />

      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-lg font-semibold text-foreground">Posts coming soon</p>
        <p className="mt-2 text-sm text-muted-foreground">
          I write about Next.js architecture, TypeScript patterns, and lessons
          learned shipping production software. Check back soon.
        </p>
      </div>
    </div>
  );
}
