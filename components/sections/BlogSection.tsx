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
          label="08 / Writing"
          title="Recent writing"
          subtitle="Technical posts on what I'm building and learning."
          align="left"
        />

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {posts.map((post) => (
            <div key={post.slug} className="h-full">
              <BlogPostCard post={post} />
            </div>
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
