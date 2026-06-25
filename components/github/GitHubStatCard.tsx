'use client';

/**
 * components/github/GitHubStatCard.tsx
 * Client-side hoverable stat card for GitHubSection.
 * Extracted so the parent server component can pass data without event handlers.
 */

import type { ReactElement } from 'react';

interface GitHubStatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: ReactElement;
}

export function GitHubStatCard({ label, value, subtitle, icon }: GitHubStatCardProps): ReactElement {
  return (
    <div
      style={{
        background: 'var(--color-bg-3)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '1.25rem 1.5rem',
        transition: 'border-color var(--dur-base) var(--ease-out-expo)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-hover)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)'; }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
        color: 'var(--color-text-3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
      }}>
        <span>{label}</span>
        {icon}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 600,
        letterSpacing: 'var(--tracking-tight)',
        color: 'var(--color-text-1)',
        lineHeight: 1,
      }}>
        {value}
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--color-text-3)',
        letterSpacing: 'var(--tracking-wide)',
        marginTop: '0.3rem',
      }}>
        {subtitle}
      </p>
    </div>
  );
}
