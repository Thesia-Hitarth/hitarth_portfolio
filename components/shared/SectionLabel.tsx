/**
 * components/shared/SectionLabel.tsx
 * Renders the "01 — Label" monospace section header.
 * Uses the .section-label CSS class from globals.css.
 */

import type { ReactElement } from 'react';

interface SectionLabelProps {
  number: string;   // e.g. "01"
  label: string;    // e.g. "About"
  className?: string;
}

export function SectionLabel({ number, label, className = '' }: SectionLabelProps): ReactElement {
  return (
    <span className={`section-label ${className}`}>
      {number} — {label}
    </span>
  );
}
