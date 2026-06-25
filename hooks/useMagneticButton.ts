/**
 * hooks/useMagneticButton.ts
 * Attaches GSAP magnetic pull/spring effect to a button element.
 * Formula: offset = (cursor - center) * 0.35, springs back on leave.
 */

'use client';

import { useRef, useEffect, RefObject } from 'react';
import gsap from 'gsap';

export function useMagneticButton<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only attach on non-touch devices
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;

      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return ref;
}
