/**
 * hooks/use-active-section.ts
 * ─────────────────────────────────────────────────────────
 * Custom hook — scroll-spy to track the currently visible
 * section. Used by Navbar in Phase 2 to highlight the
 * active nav link.
 *
 * Usage (Phase 2+):
 *   const activeSection = useActiveSection(sectionIds);
 * ─────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Tracks which section ID is currently most visible in the viewport.
 *
 * @param sectionIds - Ordered array of section `id` attributes to observe,
 *                     matching the href fragments in siteConfig.nav.
 * @param offset     - Top margin (px) to account for the fixed navbar height.
 *                     Defaults to 80px.
 * @returns The `id` string of the currently active section, or an empty string
 *          before any section has been observed.
 */
export function useActiveSection(
  sectionIds: string[],
  offset: number = 80
): string {
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any existing observer before creating a new one
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const rootMarginTop = `-${offset}px`;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting, favouring entries
        // that are entering from the top (scrolling down)
        const intersecting = entries.find((e) => e.isIntersecting);
        if (intersecting) {
          setActiveSection(intersecting.target.id);
        }
      },
      {
        root: null,
        rootMargin: `${rootMarginTop} 0px -60% 0px`,
        threshold: 0,
      }
    );

    const observer = observerRef.current;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, offset]);

  return activeSection;
}
