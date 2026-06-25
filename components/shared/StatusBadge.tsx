/**
 * components/shared/StatusBadge.tsx
 * "Available for work" badge with pulsing green dot.
 * Uses the .status-badge CSS class from globals.css.
 */

import type { ReactElement } from 'react';

export function StatusBadge(): ReactElement {
  return (
    <span className="status-badge">
      <span className="dot" aria-hidden="true" />
      Available for work
    </span>
  );
}
