'use client';

/**
 * components/ui/AnimatedSection.tsx
 */

import { motion, useReducedMotion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import type { ReactElement, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps): ReactElement {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number], delay }}
    >
      {children}
    </motion.div>
  );
}
