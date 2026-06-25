'use client';

/**
 * components/sections/HeroSection.tsx
 * ─────────────────────────────────────────────────────────
 * Premium hero: HITARTH / THESIA big display type,
 * italic editorial role, code block right column,
 * bottom strip with live clock, GSAP entrance.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useLoader } from '@/providers/LoaderProvider';
import gsap from 'gsap';

// Typing animation component for code block
function TypedString({ text }: { text: string }): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let i = 0;
    el.textContent = '';
    const id = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [text]);
  return <span ref={ref} />;
}

export function HeroSection(): ReactElement {
  const clock = useLiveClock();
  const { isLoaded } = useLoader();
  const scrambledName = useTextScramble('HITARTH', isLoaded);
  const scrambledLast = useTextScramble('THESIA', isLoaded);
  const ctaViewRef = useMagneticButton<HTMLButtonElement>();
  const ctaDownRef = useMagneticButton<HTMLAnchorElement>();
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP entrance after loader
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.hero-status', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' })
      .from('.hero-name', { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.2')
      .from('.hero-role', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.4')
      .from('.hero-copy', { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero-cta', { opacity: 0, y: 15, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
      .from('.hero-location', { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero-code', { opacity: 0, x: 30, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-bottom', { opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, [isLoaded]);

  const handleViewWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        paddingTop: '80px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle amber radial gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main grid wrapper to center it and prevent overlap */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
        {/* Main grid */}
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="grid-cols-1 lg:grid-cols-[1fr_1fr]"
        >
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Status badge */}
            <div className="hero-status">
              <StatusBadge />
            </div>

            {/* Name lines */}
            <div>
              <h1 id="hero-heading" style={{ margin: 0, padding: 0 }}>
                <span
                  className="headline-hero hero-name"
                  style={{ display: 'block' }}
                  aria-label="HITARTH"
                >
                  {scrambledName}
                </span>
                <span
                  className="headline-hero hero-name"
                  style={{ display: 'block', color: 'var(--color-text-2)' }}
                  aria-label="THESIA"
                >
                  {scrambledLast}
                </span>
              </h1>
            </div>

            {/* Role — editorial italic */}
            <p
              className="hero-role"
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                letterSpacing: 'var(--tracking-snug)',
                color: 'var(--color-accent)',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Software Developer.
            </p>

            {/* Tagline */}
            <p
              className="hero-copy"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.92rem',
                color: 'var(--color-text-2)',
                lineHeight: 1.7,
                maxWidth: '420px',
                margin: 0,
              }}
            >
              {siteConfig.tagline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                ref={ctaViewRef}
                onClick={handleViewWork}
                data-cursor="magnetic"
                className="btn-magnetic btn-filled hero-cta"
              >
                <span>View my work ↗</span>
              </button>
              <Link
                ref={ctaDownRef}
                href="/resume"
                data-cursor="magnetic"
                className="btn-magnetic hero-cta"
              >
                <span> Resume </span>
              </Link>
            </div>

            {/* Location & Time Info */}
            <p
              className="hero-location"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-text-2)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                margin: 0,
                marginTop: '1.25rem',
              }}
            >
              Ahmedabad, India · IST UTC+5:30 · {clock}
            </p>
          </div>

          {/* RIGHT COLUMN — Code block */}
          <div
            className="hero-code hidden lg:block"
            aria-hidden="true"
            data-cursor="text"
          >
            <div className="code-block">
              <div className="code-block__header">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="filename">developer.ts</span>
              </div>
              <div className="code-block__body">
                <div>
                  <span className="line-num">1</span>
                  <span className="kw">const</span>{' '}
                  <span className="fn">developer</span>{' '}
                  <span className="pu">= {'{'}</span>
                </div>
                <div>
                  <span className="line-num">2</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>name</span>
                  <span className="pu">: </span>
                  <span className="str">&quot;{siteConfig.name}&quot;</span>
                  <span className="pu">,</span>
                </div>
                <div>
                  <span className="line-num">3</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>role</span>
                  <span className="pu">: </span>
                  <span className="str">&quot;{siteConfig.title}&quot;</span>
                  <span className="pu">,</span>
                </div>
                <div>
                  <span className="line-num">4</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>stack</span>
                  <span className="pu">: [</span>
                  <span className="str">&quot;Next.js&quot;</span>
                  <span className="pu">, </span>
                  <span className="str">&quot;TypeScript&quot;</span>
                  <span className="pu">, </span>
                  <span className="str">&quot;Node.js&quot;</span>
                  <span className="pu">],</span>
                </div>
                <div>
                  <span className="line-num">5</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>status</span>
                  <span className="pu">: </span>
                  <span className="ac">&quot;open_to_work&quot;</span>
                  <span className="pu">,</span>
                </div>
                <div>
                  <span className="line-num">6</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>location</span>
                  <span className="pu">: </span>
                  <span className="str">&quot;Ahmedabad, India&quot;</span>
                  <span className="pu">,</span>
                </div>
                <div>
                  <span className="line-num">7</span>
                  <span className="fn" style={{ marginLeft: '1.5rem' }}>passion</span>
                  <span className="pu">: </span>
                  <span className="str">
                    &quot;<TypedString text="Building products people love" />&quot;
                  </span>
                  <span className="pu">,</span>
                </div>
                <div>
                  <span className="line-num">8</span>
                  <span className="pu">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="hero-bottom"
        style={{
          marginTop: 'auto',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-text-3)',
            letterSpacing: 'var(--tracking-widest)',
            textTransform: 'uppercase',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span className="animate-bob" style={{ display: 'inline-block' }}>↓</span>
          {' '}Scroll to explore
        </p>
      </div>
    </section>
  );
}
