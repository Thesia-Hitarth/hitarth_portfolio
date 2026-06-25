/**
 * hooks/useCountUp.ts
 * Animates a number from 0 to target using GSAP when the element
 * enters the viewport.
 */

'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseCountUpOptions {
  target: number;
  duration?: number;
  suffix?: string;
}

export function useCountUp({ target, duration = 1.5, suffix = '' }: UseCountUpOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState<string>('0' + suffix);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      snap: { val: 1 },
      onUpdate: () => setValue(Math.round(obj.val) + suffix),
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [target, duration, suffix]);

  return { ref, value };
}
