'use client';

/**
 * components/layout/Navbar.tsx
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

const SECTION_IDS = siteConfig.nav
  .map((item) => item.href.replace('#', ''))
  .filter(Boolean);

export function Navbar(): ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = (): void => { setScrolled(window.scrollY > 60); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  useEffect(() => {
    const onResize = (): void => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        const el = document.getElementById(href.slice(1));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  }, [pathname, router]);

  const toggleTheme = (): void => { setTheme(theme === 'dark' ? 'light' : 'dark'); };

  const initials = siteConfig.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16"
          aria-label="Primary navigation"
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 font-mono font-bold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label={`${siteConfig.name} — scroll to top`}
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold"
            >
              {initials}
            </span>
            <span className="hidden sm:inline text-sm">{siteConfig.name}</span>
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {siteConfig.nav.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={item.href} className="relative">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                    {isActive && !prefersReduced && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isActive && prefersReduced && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full',
                  'text-muted-foreground hover:text-foreground hover:bg-muted',
                  'transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            <a
              href={siteConfig.resumeUrl}
              download
              className={cn(
                'hidden md:inline-flex items-center gap-1.5',
                'rounded-lg border border-primary/40 bg-primary/5 px-3 py-1.5',
                'text-sm font-medium text-primary hover:bg-primary/10',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
            >
              <Download size={14} />
              Resume
            </a>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                'flex md:hidden h-9 w-9 items-center justify-center rounded-full',
                'text-muted-foreground hover:text-foreground hover:bg-muted',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
              )}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-md pt-16"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
              {siteConfig.nav.map((item, i) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-full max-w-xs"
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'w-full rounded-xl px-6 py-4 text-xl font-semibold text-center',
                        'transition-colors duration-200',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                        isActive
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary hover:bg-muted'
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: siteConfig.nav.length * 0.05 + 0.05 }}
                className="flex items-center gap-4 mt-6"
              >
                <a
                  href={siteConfig.resumeUrl}
                  download
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Download size={16} />
                  Resume
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <LinkedinIcon size={18} />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
