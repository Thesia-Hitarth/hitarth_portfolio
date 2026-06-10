/**
 * components/layout/Navbar.tsx
 * ─────────────────────────────────────────────────────────
 * Top navigation bar — shell component (Phase 1).
 * Fully wired up in Phase 2 with scroll-spy and animations.
 * ─────────────────────────────────────────────────────────
 */

import Link from 'next/link';
import { siteConfig } from '@/config/site';

// TODO Phase 2: add ThemeToggle, mobile drawer, scroll-spy highlighting

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Primary navigation"
      >
        {/* Logotype / home link */}
        <Link
          href="#hero"
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — resume download */}
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
