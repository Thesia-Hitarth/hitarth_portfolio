'use client';

/**
 * components/ui/GradientText.tsx
 */

import { cn } from '@/lib/utils';
import type { ReactElement, ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps): ReactElement {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
