/**
 * components/layout/Footer.tsx
 * ─────────────────────────────────────────────────────────
 * Site footer — shell component (Phase 1).
 * ─────────────────────────────────────────────────────────
 */

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear}{' '}
          <span className="font-medium text-foreground">{siteConfig.name}</span>. All rights reserved.
        </p>

        {/* Social links */}
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4" role="list">
            <li>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            {siteConfig.social.twitter && (
              <li>
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Twitter / X
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Back to top */}
        <Link
          href="#top"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
