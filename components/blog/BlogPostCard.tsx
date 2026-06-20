'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { ReactElement } from 'react';
import type { PostMeta } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
  post: PostMeta;
  layout?: 'horizontal' | 'vertical';
  priority?: boolean;
}

export function BlogPostCard({ post, layout = 'horizontal', priority = false }: BlogPostCardProps): ReactElement {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isHorizontal = layout === 'horizontal';

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article
        onMouseMove={handleMouseMove}
        className={cn(
          'relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card',
          isHorizontal && 'md:flex-row md:min-h-[260px]',
          'hover:border-primary/45 hover:-translate-y-0.5 hover:shadow-lg',
          'transition-all duration-300 cursor-pointer h-full select-none'
        )}
        style={{
          '--mouse-x': `${coords.x}px`,
          '--mouse-y': `${coords.y}px`,
        } as React.CSSProperties}
      >
        {/* Vercel Spotlight Radial Gradient */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), var(--primary) / 0.06, transparent 80%)`,
          }}
        />

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary border-l border-b border-primary/20">
            ★ Featured
          </div>
        )}

        {/* Cover Image Area */}
        {post.coverImage ? (
          <div
            className={cn(
              'relative aspect-square overflow-hidden shrink-0 border-b border-border',
              isHorizontal && 'md:h-full md:w-auto md:border-b-0 md:border-r'
            )}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-102"
              sizes={isHorizontal ? '(max-width: 768px) 100vw, 260px' : '(max-width: 768px) 100vw, 500px'}
            />
          </div>
        ) : (
          // Dynamic gradient placeholder if cover image isn't specified
          <div
            className={cn(
              'relative aspect-square shrink-0 border-b border-border bg-gradient-to-br from-primary/10 via-primary/5 to-muted flex items-center justify-center p-4',
              isHorizontal && 'md:h-full md:w-auto md:border-b-0 md:border-r'
            )}
          >
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
