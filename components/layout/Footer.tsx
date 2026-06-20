'use client';

/**
 * components/layout/Footer.tsx
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import type { ReactElement } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';

export function Footer(): ReactElement {
  const [showTop, setShowTop] = useState(false);
  const prefersReduced = useReducedMotion();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = (): void => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavClick = useCallback((href: string) => {
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

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center gap-6 text-center">

            {/* Row 1 */}
            <div>
              <p className="font-mono font-bold text-foreground">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{siteConfig.tagline}</p>
            </div>

            {/* Row 2: Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" role="list">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Row 3 */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between w-full border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                © {currentYear} {siteConfig.name} · Transforming ideas into digital experiences
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  <LinkedinIcon size={16} />
                </a>
                {siteConfig.social.twitter && (
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X profile"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    <TwitterIcon size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back-to-top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
              'fixed bottom-6 left-6 z-30',
              'flex h-10 w-10 items-center justify-center',
              'rounded-full bg-primary text-primary-foreground shadow-md',
              'hover:opacity-90 transition-opacity duration-200',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
            )}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
