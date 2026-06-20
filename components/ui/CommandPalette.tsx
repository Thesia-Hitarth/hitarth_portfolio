'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Search,
  Sparkles,
  Command,
  Sun,
  Moon,
  Mail,
  FileText,
  Briefcase,
  FolderKanban,
  BookOpen,
  Code
} from 'lucide-react';
import type { ReactElement } from 'react';
import { projects } from '@/data/projects';
import { siteConfig } from '@/config/site';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Pages & Sections' | 'Actions' | 'Projects' | 'Articles';
  icon: React.ComponentType<{ className?: string; size?: number }>;
  action: () => void;
  shortcut?: string[];
}

export function CommandPalette(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs, setBlogs] = useState<Array<{ slug: string; title: string; excerpt: string }>>([]);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch blogs metadata on mount
  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data || []);
        }
      } catch (err) {
        console.error('Failed to load command palette blogs:', err);
      }
    }
    loadBlogs();
  }, []);

  // Listen for hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        setSearch('');
        setActiveIndex(0);
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Navigate to sections smoothly
  const handleSectionClick = useCallback((sectionId: string) => {
    setIsOpen(false);
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, router]);

  // List of all static commands
  const staticCommands = useMemo<CommandItem[]>(() => {
    return [
      {
        id: 'nav-home',
        title: 'Go to Home',
        category: 'Pages & Sections',
        icon: Sparkles,
        action: () => handleSectionClick('hero'),
      },
      {
        id: 'nav-about',
        title: 'Go to About Me',
        category: 'Pages & Sections',
        icon: Briefcase,
        action: () => handleSectionClick('about'),
      },
      {
        id: 'nav-skills',
        title: 'Go to Skills',
        category: 'Pages & Sections',
        icon: Code,
        action: () => handleSectionClick('skills'),
      },
      {
        id: 'nav-experience',
        title: 'Go to Experience',
        category: 'Pages & Sections',
        icon: Briefcase,
        action: () => handleSectionClick('experience'),
      },
      {
        id: 'nav-projects',
        title: 'Go to Projects Section',
        category: 'Pages & Sections',
        icon: FolderKanban,
        action: () => handleSectionClick('projects'),
      },
      {
        id: 'nav-blog',
        title: 'Go to Blog Feed',
        category: 'Pages & Sections',
        icon: BookOpen,
        action: () => handleSectionClick('blog'),
      },
      {
        id: 'nav-contact',
        title: 'Go to Contact Form',
        category: 'Pages & Sections',
        icon: Mail,
        action: () => handleSectionClick('contact'),
      },
      {
        id: 'action-theme',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        category: 'Actions',
        icon: theme === 'dark' ? Sun : Moon,
        action: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
          setIsOpen(false);
        },
      },
      {
        id: 'action-resume',
        title: 'View Digital Resume',
        category: 'Actions',
        icon: FileText,
        action: () => {
          router.push('/resume');
          setIsOpen(false);
        },
      },
      {
        id: 'action-playground',
        title: 'Open Code Sandbox / Playground',
        category: 'Actions',
        icon: Code,
        action: () => {
          router.push('/playground');
          setIsOpen(false);
        },
      },
      {
        id: 'action-analytics',
        title: 'Open Live Analytics Dashboard',
        category: 'Actions',
        icon: Sparkles,
        action: () => {
          router.push('/analytics');
          setIsOpen(false);
        },
      },
      {
        id: 'action-email',
        title: 'Copy Email to Clipboard',
        subtitle: siteConfig.email,
        category: 'Actions',
        icon: Mail,
        action: () => {
          navigator.clipboard.writeText(siteConfig.email);
          setIsOpen(false);
        },
      },
    ];
  }, [theme, router, setTheme, handleSectionClick]);

  // Combine static commands, projects, and blogs
  const allItems = useMemo<CommandItem[]>(() => {
    const list: CommandItem[] = [...staticCommands];

    // Projects
    projects.forEach((proj) => {
      list.push({
        id: `project-${proj.slug}`,
        title: `Project: ${proj.title}`,
        subtitle: proj.tagline,
        category: 'Projects',
        icon: FolderKanban,
        action: () => {
          router.push(`/projects/${proj.slug}`);
          setIsOpen(false);
        },
      });
    });

    // Blogs
    blogs.forEach((post) => {
      list.push({
        id: `blog-${post.slug}`,
        title: `Article: ${post.title}`,
        subtitle: post.excerpt,
        category: 'Articles',
        icon: BookOpen,
        action: () => {
          router.push(`/blog/${post.slug}`);
          setIsOpen(false);
        },
      });
    });

    return list;
  }, [staticCommands, blogs, router]);

  // Filter list based on search text
  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems;
    const query = search.toLowerCase().trim();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query))
    );
  }, [allItems, search]);

  // Reset activeIndex directly on search input changes instead of using useEffect.

  // Handle keyboard traversal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        filteredItems[activeIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[activeIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  return (
    <>
      {/* Search trigger floating reminder on homepage / global navbar helper */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-6 md:pt-36">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-zinc-950/60 dark:bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl flex flex-col max-h-[480px] pointer-events-auto"
            >
              {/* Header / Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
                <Search size={18} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full text-sm text-foreground bg-transparent outline-none placeholder-zinc-400 dark:placeholder-zinc-500 font-sans"
                />
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-300/30 dark:border-zinc-700/30">
                  ESC
                </span>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto py-2 divide-y divide-zinc-100/50 dark:divide-zinc-900/50 scrollbar-thin"
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const isSelected = index === activeIndex;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => item.action()}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary border-l-2 border-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            size={16}
                            className={`shrink-0 ${
                              isSelected ? 'text-primary' : 'text-zinc-400 dark:text-zinc-500'
                            }`}
                          />
                          <div className="min-w-0">
                            <p
                              className={`text-xs font-semibold truncate ${
                                isSelected ? 'text-primary' : 'text-foreground'
                              }`}
                            >
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="text-[10px] text-muted-foreground truncate mt-0.5 max-w-sm">
                                {item.subtitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-200/40 dark:bg-zinc-800/40 px-1.5 py-0.5 rounded text-zinc-400 dark:text-zinc-500">
                            {item.category}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[10px] text-primary">
                              ↵
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    No results found for &quot;{search}&quot;
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Command size={10} /> + K to close
                  </span>
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                </div>
                <div>
                  Press <kbd className="font-mono">ESC</kbd> to exit
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
