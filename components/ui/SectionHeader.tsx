'use client';

/**
 * components/ui/SectionHeader.tsx
 */

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactElement } from 'react';

interface SectionHeaderProps {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

export function SectionHeader({
  id,
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps): ReactElement {
  const prefersReduced = useReducedMotion();

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  if (prefersReduced) {
    return (
      <div className={cn('flex flex-col mb-12 lg:mb-16', alignClass)}>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
        <h2
          id={id}
          className="mt-3 text-3xl font-bold tracking-tight text-foreground leading-[1.1] md:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className={cn('mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl md:text-lg', align === 'center' && 'mx-auto')}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className={cn('flex flex-col mb-12 lg:mb-16', alignClass)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p
        variants={itemVariants}
        className="font-mono text-xs uppercase tracking-widest text-primary"
      >
        {label}
      </motion.p>

      <motion.h2
        id={id}
        variants={itemVariants}
        className="mt-3 text-3xl font-bold tracking-tight text-foreground leading-[1.1] md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className={cn(
            'mt-4 text-base leading-relaxed text-muted-foreground max-w-2xl md:text-lg',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
