'use client';

/**
 * app/loading.tsx
 * ─────────────────────────────────────────────────────────
 * Next.js route-level loading state.
 * Shows a minimal premium spinner — no "Loading..." text.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';

export default function Loading(): ReactElement {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Spinner ring */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid var(--color-border-2)',
          borderTopColor: 'var(--color-accent)',
          animation: 'spin 0.8s linear infinite',
        }}
      />

      {/* Monogram */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '0.75rem',
          color: 'var(--color-text-3)',
          letterSpacing: 'var(--tracking-widest)',
          textTransform: 'uppercase',
        }}
      >
        HT
      </span>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
