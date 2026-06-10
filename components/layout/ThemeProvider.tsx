'use client';

/**
 * components/layout/ThemeProvider.tsx
 * ─────────────────────────────────────────────────────────
 * Thin wrapper around next-themes <ThemeProvider>.
 * Must be a Client Component because it uses React context.
 * ─────────────────────────────────────────────────────────
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
