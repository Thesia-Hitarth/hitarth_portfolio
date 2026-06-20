'use client';

/**
 * components/blog/BlogList.tsx
 */

import { useState, useMemo, useRef } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { BlogPostCard } from './BlogPostCard';
import type { PostMeta } from '@/lib/mdx';
import { cn } from '@/lib/utils';

interface BlogListProps {
  posts: PostMeta[];
}

export function BlogList({ posts }: BlogListProps): ReactElement {
  const [activeTag, setActiveTag] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset hasDragged after click events have had a chance to fire
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed modifier
    if (Math.abs(x - startX) > 5) {
      setHasDragged(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Extract all unique tags dynamically
  const uniqueTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => set.add(tag.toLowerCase()));
    });
    return Array.from(set);
  }, [posts]);

  // Filter posts based on active tag selection
  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') {
      return posts;
    }
    return posts.filter((post) =>
      post.tags.map((t) => t.toLowerCase()).includes(activeTag)
    );
  }, [posts, activeTag]);

  return (
    <div className="space-y-10">
      {/* Scrollable & Draggable Tag Filter Pills Bar */}
      <div className="w-full border-b border-border pb-6">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={cn(
            "flex items-center gap-2 overflow-x-auto pb-3 select-none scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          role="tablist"
          aria-label="Blog tags filter"
        >
          {/* "All" Tag Pill */}
          <button
            role="tab"
            aria-selected={activeTag === 'all'}
            onClick={() => {
              if (!hasDragged) setActiveTag('all');
            }}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 shrink-0',
              activeTag === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-border-hover',
              isDragging ? 'cursor-grabbing pointer-events-none' : 'cursor-pointer'
            )}
          >
            All Writing
          </button>

          {/* Dynamic Tag Pills */}
          {uniqueTags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  if (!hasDragged) setActiveTag(tag);
                }}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 shrink-0 capitalize',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-border-hover',
                  isDragging ? 'cursor-grabbing pointer-events-none' : 'cursor-pointer'
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single Column Posts List */}
      <div className="max-w-3xl mx-auto">
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <BlogPostCard post={post} priority={index === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl bg-card/30">
            <SlidersHorizontal className="h-10 w-10 text-muted-foreground/60 mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-foreground">No articles found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              There are no articles filed under the &quot;{activeTag}&quot; category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
