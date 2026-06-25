'use client';

/**
 * components/github/PinnedRepoCard.tsx
 * Client-side hoverable pinned repo card for GitHubSection.
 */

import type { ReactElement } from 'react';
import { ArrowUpRight, Star, GitBranch } from 'lucide-react';

interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars: number;
  forks: number;
}

export function PinnedRepoCard({ repo }: { repo: PinnedRepo }): ReactElement {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      style={{
        display: 'block',
        background: 'var(--color-bg-4)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '1rem',
        transition: 'border-color var(--dur-base) var(--ease-out-expo)',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--color-text-1)',
          letterSpacing: 'var(--tracking-snug)',
        }}>
          {repo.name}
        </span>
        <ArrowUpRight size={14} color="var(--color-text-3)" />
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 300,
        color: 'var(--color-text-2)',
        lineHeight: 1.5,
        margin: '0 0 0.75rem',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      }}>
        {repo.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-3)', letterSpacing: 'var(--tracking-wide)' }}>
              {repo.language}
            </span>
          </span>
        )}
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Star size={11} color="var(--color-text-3)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-3)' }}>{repo.stars}</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <GitBranch size={11} color="var(--color-text-3)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-text-3)' }}>{repo.forks}</span>
        </span>
      </div>
    </a>
  );
}
