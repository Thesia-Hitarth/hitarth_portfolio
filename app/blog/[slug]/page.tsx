/**
 * app/blog/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────
 * Blog post detail page — shell (Phase 1).
 * Phase 4 will wire this to MDX content in /content/blog/.
 * ─────────────────────────────────────────────────────────
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// TODO Phase 4: Import blog post data from MDX content layer

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // TODO Phase 4: Look up frontmatter from MDX file and return real metadata
  const { slug } = await params;
  return {
    title: `Blog Post — ${slug}`,
    description: 'Blog post content coming soon.',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // TODO Phase 4: Load and render MDX content for this slug
  // If no post found, call notFound()
  if (!slug) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-32">
      <p className="text-muted-foreground">
        Blog post content for <code className="font-mono text-primary">{slug}</code> will be
        available in Phase 4.
      </p>
    </article>
  );
}
