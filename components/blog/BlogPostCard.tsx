'use client';

/**
 * components/blog/BlogPostCard.tsx
 */

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { ReactElement } from 'react';
import type { PostMeta } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  post: PostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps): ReactElement {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article
        className={cn(
          'relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-border bg-card',
          'hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-sm',
          'transition-all duration-200 cursor-pointer h-full'
        )}
      >
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary border-l border-b border-primary/20">
            ★ Featured
          </div>
        )}

        {/* Cover Image Area */}
        {post.coverImage ? (
          <div className="relative aspect-video md:aspect-square w-full md:w-48 overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          </div>
        ) : (
          // Dynamic gradient placeholder if cover image isn't specified
          <div className="relative aspect-video md:aspect-square w-full md:w-48 shrink-0 border-b md:border-b-0 md:border-r border-border bg-gradient-to-br from-primary/10 via-primary/5 to-muted flex items-center justify-center p-4">
            <span className="font-mono text-2xl font-bold tracking-widest text-primary/10 select-none">
              MDX
            </span>
          </div>
        )}

        {/* Card Body content */}
        <div className="flex flex-col justify-between flex-1 p-5 md:p-6">
          <div>
            {/* Tags line */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 border border-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary capitalize"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Excerpt */}
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Metadata Footer */}
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-muted-foreground/60" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-muted-foreground/60" />
                {post.readingTime}
              </span>
            </div>

            <span className="inline-flex items-center gap-1 text-primary group-hover:translate-x-0.5 transition-transform font-bold">
              Read <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
