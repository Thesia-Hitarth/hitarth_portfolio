'use client';

/**
 * components/blog/TableOfContents.tsx
 */

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps): ReactElement | null {
  const [activeId, setActiveId] = useState<string>('');

  // If there are fewer than 2 headings, don't show the TOC at all
  if (!headings || headings.length < 2) {
    return null;
  }

  useEffect(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the heading that is closest to the top of the viewport
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-80px 0px -60% 0px', // check when elements enter the upper-middle of viewport
    });

    headingElements.forEach((el) => observer.observe(el));

    // Fallback: If no heading is intersecting but we scroll to the top
    const handleScroll = () => {
      if (window.scrollY < 100 && headings.length > 0) {
        setActiveId(headings[0].id);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // offset to clear sticky navbar and headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="font-mono text-xs font-semibold text-primary uppercase tracking-widest mb-4">
        On This Page
      </h3>
      
      <nav aria-label="Table of contents">
        <ul className="space-y-2.5" role="list">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                className={cn(
                  'transition-all duration-150',
                  heading.level === 3 ? 'pl-3' : 'pl-0'
                )}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={cn(
                    'block text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none leading-tight',
                    heading.level === 3 ? 'text-xs' : 'text-sm',
                    isActive && 'text-primary font-semibold hover:text-primary'
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
