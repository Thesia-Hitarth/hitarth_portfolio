/**
 * components/ui/TechBadge.tsx
 */

import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'outline' | 'ghost';
  tooltip?: string;
}

const variantStyles: Record<NonNullable<TechBadgeProps['variant']>, string> = {
  default:
    'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20',
  outline:
    'border border-border text-muted-foreground bg-transparent hover:bg-muted',
  ghost: 'bg-muted text-muted-foreground hover:bg-muted/80',
};

export function TechBadge({
  name,
  variant = 'default',
  tooltip,
}: TechBadgeProps): ReactElement {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        'transition-colors duration-150 cursor-default',
        variantStyles[variant]
      )}
      title={tooltip}
    >
      {name}
    </span>
  );
}
