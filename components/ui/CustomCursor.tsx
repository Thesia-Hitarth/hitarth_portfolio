'use client';

/**
 * components/ui/CustomCursor.tsx
 * Two-layer premium custom cursor.
 * Layer 1 (dot): 5px accent circle, follows at full speed.
 * Layer 2 (ring): 36px outline ring, follows with lerp lag (factor 0.10).
 * State machine via data-cursor attribute on elements.
 * Disabled on touch devices.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactElement } from 'react';

type CursorState = 'default' | 'link' | 'project' | 'text' | 'magnetic';

export function CustomCursor(): ReactElement | null {
  const dotRef  = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const posRef  = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId   = useRef<number | null>(null);
  const [state, setState] = useState<CursorState>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const LERP = 0.10;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Dot follows immediately
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;

      // Detect cursor state from target
      const target = e.target as HTMLElement;
      const closest = target.closest('[data-cursor]');
      const cursorType = closest?.getAttribute('data-cursor') as CursorState | null;
      setState(cursorType ?? 'default');
    };

    // Ring follows with lerp (RAF loop)
    const loop = () => {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * LERP;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [mounted]);

  if (!mounted) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  // State-based ring sizes
  const ringSize =
    state === 'project'  ? 90 :
    state === 'link'     ? 64 :
    state === 'magnetic' ? 64 :
    36;

  const ringBg =
    state === 'link' || state === 'magnetic' || state === 'project'
      ? 'rgba(0, 0, 0, 0.05)'
      : 'transparent';

  const dotVisible = state !== 'link' && state !== 'project' && state !== 'magnetic';

  const cursor = (
    <>
      {/* Layer 1: dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: dotVisible ? 1 : 0,
          transition: 'opacity 200ms ease',
          left: '-100px',
          top: '-100px',
        }}
      />

      {/* Layer 2: ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
          background: ringBg,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), height 400ms cubic-bezier(0.16,1,0.3,1), background 200ms ease',
          left: '-100px',
          top: '-100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {state === 'project' && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            whiteSpace: 'nowrap',
          }}>
            VIEW ↗
          </span>
        )}
      </div>
    </>
  );

  return createPortal(cursor, document.body);
}
