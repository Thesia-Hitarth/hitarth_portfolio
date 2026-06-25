/**
 * hooks/useTextScramble.ts
 * Scrambles text on mount, characters settle left-to-right.
 */

'use client';

import { useState, useEffect, useRef } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

export function useTextScramble(finalText: string, enabled = true): string {
  const [output, setOutput] = useState<string>('');
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const totalDuration = 800; // ms
    const chars = finalText.split('');

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / totalDuration, 1);

      const settledCount = Math.floor(progress * chars.length);

      const scrambled = chars
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < settledCount) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join('');

      setOutput(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setOutput(finalText);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      startRef.current = null;
    };
  }, [finalText, enabled]);

  return enabled ? output : finalText;
}
