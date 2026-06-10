/**
 * lib/animations.ts
 * ─────────────────────────────────────────────────────────
 * Shared Framer Motion variants.
 * Import from here — never define variants inline in components.
 * ─────────────────────────────────────────────────────────
 */

import type { Variants } from 'framer-motion';

// Custom cubic-bezier — feels physical/natural
const EASE = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

/** Standard entrance: fade + rise from below */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Fade only — no vertical movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Timeline / slide-from-left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Mirror of slideInLeft — slide from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Scale in — for cards */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE },
  },
};

/**
 * Stagger container — wraps a list of children that each use
 * fadeInUp / scaleIn. Apply to the grid/list wrapper.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Combined: stagger + fade — for lists/grids that also need
 * the parent itself to fade in.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/** Timeline vertical line: scaleY 0 → 1 from top */
export const timelineLineVariants: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

/** Floating loop — used for hero code card */
export const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
