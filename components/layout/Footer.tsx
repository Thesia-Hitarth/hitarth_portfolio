'use client';

/**
 * components/layout/Footer.tsx
 * Minimal dark footer. DM Mono 300, amber accented links.
 */

import type { ReactElement } from 'react';
import { siteConfig } from '@/config/site';

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        background: 'var(--color-bg)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 300,
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-3)',
          letterSpacing: 'var(--tracking-wide)',
          textTransform: 'uppercase',
        }}
      >
        © {year} {siteConfig.name}. Built with Next.js &amp; ☕
      </p>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {[
          { label: 'GitHub',   href: siteConfig.social.github },
          { label: 'LinkedIn', href: siteConfig.social.linkedin },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="transition-colors duration-300 text-[var(--color-text-3)] hover:text-[var(--color-accent)]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
              padding: '0.75rem 0',
              display: 'inline-block',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
