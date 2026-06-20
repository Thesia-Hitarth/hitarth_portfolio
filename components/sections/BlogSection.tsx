/**
 * components/sections/BlogSection.tsx
 * ─────────────────────────────────────────────────────────
 * Homepage Blog section.
 * Fetches featured blog posts at build-time.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { getFeaturedPosts } from '@/lib/mdx';

export function BlogSection(): ReactElement | null {
  const posts = getFeaturedPosts();

  // Hide the entire section if there are no published posts
  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="blog-heading"
          label="07 / Writing"
          title="Recent writing"
          subtitle="Technical posts on what I'm building and learning."
          align="left"
        />

        {/* Featured Posts Vertical Stack */}
        <div className="flex flex-col gap-6 mt-12 max-w-4xl mx-auto">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} layout="horizontal" priority={index === 0} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center md:text-left">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            Read all posts
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
