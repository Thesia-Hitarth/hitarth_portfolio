/**
 * app/blog/page.tsx
 * ─────────────────────────────────────────────────────────
 * Blog directory listing page.
 * Fetches published posts on the server and mounts the
 * client-side tags and posts filter component.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/config/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BlogList } from '@/components/blog/BlogList';
import { getAbsoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on React, Next.js, Node.js, MongoDB, and full-stack web development.',
  alternates: {
    canonical: getAbsoluteUrl('/blog'),
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: 'Technical writing on React, Next.js, Node.js, MongoDB, and full-stack web development.',
    url: getAbsoluteUrl('/blog'),
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
        >
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>
        {/* Header Block */}
        <header className="mb-12">
          <SectionHeader
            id="blog-heading"
            label="Blog"
            title="Writing about what I build"
            subtitle="Technical deep-dives into problems I've solved, decisions I've made, and things I've learned. No fluff — only posts I'd want to read myself."
            align="left"
          />
        </header>

        {/* Dynamic Client List with Filters */}
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
