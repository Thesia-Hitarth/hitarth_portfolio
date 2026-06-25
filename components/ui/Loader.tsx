'use client';

/**
 * components/ui/Loader.tsx
 * Full-screen GSAP loader inspired by Dennis Snellenberg.
 *
 * Phase 1 (0–1.2s): Black overlay, "HT" monogram, counter 0→100, vertical line grows.
 * Phase 2 (1.2–2.0s): "HITARTH" letters clip up one by one.
 * Phase 3 (2.0–2.8s): Screen splits top/bottom, main content fades in.
 * Phase 4 (2.8s+): Unmount, set isLoaded = true.
 */

import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { useLoader } from '@/providers/LoaderProvider';
import gsap from 'gsap';

const LETTERS = 'HITARTH'.split('');

export function Loader(): ReactElement {
  const { setIsLoaded } = useLoader();
  const loaderRef   = useRef<HTMLDivElement | null>(null);
  const topRef      = useRef<HTMLDivElement | null>(null);
  const botRef      = useRef<HTMLDivElement | null>(null);
  const counterRef  = useRef<HTMLSpanElement | null>(null);
  const lineRef     = useRef<HTMLDivElement | null>(null);
  const lettersRef  = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Disable scroll during load
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsLoaded(true);
        // Remove loader from DOM
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      },
    });

    // Phase 1: counter + line
    tl.to(counterRef.current, {
      innerHTML: 100,
      duration: 1.2,
      snap: { innerHTML: 1 },
      ease: 'power2.inOut',
      onUpdate() {
        // zero-pad to 3 digits
        const val = Math.round(Number(counterRef.current?.innerHTML ?? 0));
        if (counterRef.current) {
          counterRef.current.innerHTML = String(val).padStart(3, '0');
        }
      },
    });

    // Phase 2: letters clip up
    tl.to(
      lettersRef.current,
      {
        yPercent: -100,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.2'
    );

    // Phase 3: split screen
    tl.to(
      topRef.current,
      { yPercent: -100, duration: 0.8, ease: 'power3.inOut' },
      '+=0.2'
    );
    tl.to(
      botRef.current,
      { yPercent: 100, duration: 0.8, ease: 'power3.inOut' },
      '<'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [setIsLoaded]);

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        overflow: 'hidden',
      }}
    >
      {/* Top half */}
      <div
        ref={topRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: 'var(--color-bg)',
        }}
      />

      {/* Bottom half */}
      <div
        ref={botRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'var(--color-bg)',
        }}
      />

      {/* Full overlay content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(2rem, 5vw, 4rem)',
        }}
      >
        {/* Top row: HT monogram */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'var(--color-accent)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
            }}
          >
            HT
          </span>
        </div>

        {/* Centre: HITARTH big text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(2rem, 5vw, 4rem)',
            transform: 'translateY(-50%)',
            overflow: 'hidden',
            display: 'flex',
          }}
        >
          {LETTERS.map((letter, i) => (
            <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <span
                ref={(el) => { if (el) lettersRef.current[i] = el; }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(4rem, 12vw, 11rem)',
                  color: 'var(--color-text-1)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 1,
                  transform: 'translateY(100%)',
                }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom row: counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <span
            ref={counterRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 300,
              fontSize: '0.75rem',
              color: 'var(--color-text-1)',
              letterSpacing: 'var(--tracking-widest)',
              textTransform: 'uppercase',
            }}
          >
            000
          </span>

          {/* Right: thin vertical line */}
          <div
            ref={lineRef}
            style={{
              width: '1px',
              height: '80px',
              background: 'var(--color-border-2)',
              transformOrigin: 'bottom',
              animation: 'grow-line 1.2s var(--ease-out-expo) forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
}
