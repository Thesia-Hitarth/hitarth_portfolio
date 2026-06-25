/**
 * components/shared/StatCard.tsx
 * A stat card with GSAP count-up animation on scroll-in.
 * Uses the .stat-card CSS class from globals.css.
 */

'use client';

import type { ReactElement } from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCard({ value, suffix = '', label }: StatCardProps): ReactElement {
  const { ref, value: displayValue } = useCountUp({ target: value, suffix });

  return (
    <div className="stat-card">
      <div className="stat-card__num">
        <span ref={ref as React.RefObject<HTMLSpanElement>}>{displayValue}</span>
      </div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}
