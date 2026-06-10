'use client';

/**
 * components/projects/ProjectsGrid.tsx
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import type { ReactElement } from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
  initialProjects: Project[];
}

type CategoryFilter = 'all' | 'fullstack' | 'frontend' | 'backend' | 'opensource';

const CATEGORY_TABS: Array<{ label: string; value: CategoryFilter }> = [
  { label: 'All Projects', value: 'all' },
  { label: 'Full-Stack', value: 'fullstack' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Open Source', value: 'opensource' },
];

export function ProjectsGrid({ initialProjects }: ProjectsGridProps): ReactElement {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;

      // Search filter
      const matchesSearch =
        searchQuery.trim() === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, searchQuery, activeCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="space-y-10">
      {/* Controls: Search and Categories */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, stack, or tagline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-full border border-border bg-card/50 py-3 pl-11 pr-4 text-sm text-foreground',
              'placeholder-muted-foreground outline-none transition-all',
              'focus:border-primary/50 focus:ring-2 focus:ring-primary/20'
            )}
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project Categories">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.value;
            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.value)}
                className={cn(
                  'rounded-full px-4 py-2 text-xs font-medium border transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-border-hover'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Display */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border rounded-2xl bg-card/30"
        >
          <SlidersHorizontal className="h-10 w-10 text-muted-foreground/60 mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold text-foreground">No projects found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            We couldn't find any projects matching "{searchQuery}" under this category.
          </p>
          <button
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={12} />
            Reset all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
