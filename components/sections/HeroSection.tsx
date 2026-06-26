'use client';

/**
 * components/sections/HeroSection.tsx
 * ─────────────────────────────────────────────────────────
 * Premium hero: HITARTH / THESIA display type on left,
 * animated orbital tech-stack visualization on right.
 * ─────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { Briefcase, FileText } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useLoader } from '@/providers/LoaderProvider';
import gsap from 'gsap';

export function HeroSection(): ReactElement {
  const clock = useLiveClock();
  const { isLoaded } = useLoader();
  const scrambledName = useTextScramble('HITARTH', isLoaded);
  const scrambledLast = useTextScramble('THESIA', isLoaded);
  const ctaViewRef = useMagneticButton<HTMLButtonElement>();
  const ctaDownRef = useMagneticButton<HTMLAnchorElement>();
  const sectionRef = useRef<HTMLElement | null>(null);

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
      {/* Subtle bg gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,0,0,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main grid */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
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

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="hero-status">
              <StatusBadge />
            </div>

            <div>
              <h1 id="hero-heading" style={{ margin: 0, padding: 0 }}>
                <span className="headline-hero hero-name" style={{ display: 'block' }} aria-label="HITARTH">
                  {scrambledName}
                </span>
                <span className="headline-hero hero-name" style={{ display: 'block', color: 'var(--color-text-2)' }} aria-label="THESIA">
                  {scrambledLast}
                </span>
              </h1>
            </div>

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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                ref={ctaViewRef}
                onClick={handleViewWork}
                data-cursor="magnetic"
                className="btn-magnetic btn-filled hero-cta"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Briefcase size={14} />
                <span>View my work ↗</span>
              </button>
              <Link
                ref={ctaDownRef}
                href="/resume"
                data-cursor="magnetic"
                className="btn-magnetic hero-cta"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FileText size={14} />
                <span>Resume</span>
              </Link>
            </div>

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

          {/* ── RIGHT COLUMN — Animated Tech Orbit ── */}
          <div className="hero-code hidden lg:block" aria-hidden="true">
            <div className="techsphere-wrapper">
              <div className="techsphere">

                {/* Ambient purple/blue glow blob */}
                <div className="techsphere__glow" />

                {/* Orbital ring paths (visual only) */}
                <div className="techsphere__ring ts-ring--inner" />
                <div className="techsphere__ring ts-ring--mid" />
                <div className="techsphere__ring ts-ring--outer" />

                {/* Center core with pulsing halo */}
                <div className="techsphere__core">
                  <span className="techsphere__core-icon">&lt;/&gt;</span>
                  <div className="techsphere__core-halo" />
                </div>

                {/* Inner orbit (r = 70px, 14s CW) */}
                <div className="ts-node ts-node--1"><span>React</span></div>
                <div className="ts-node ts-node--2"><span>Git</span></div>

                {/* Middle orbit (r = 145px, 22s CCW) */}
                <div className="ts-node ts-node--3"><span>Next</span></div>
                <div className="ts-node ts-node--4"><span>Node</span></div>

                {/* Outer orbit (r = 220px, 34s CW) */}
                <div className="ts-node ts-node--5"><span>TypeScript</span></div>
                <div className="ts-node ts-node--6"><span>Tailwind</span></div>
                <div className="ts-node ts-node--7"><span>MongoDB</span></div>

              </div>

              {/* Caption label — placed below the sphere container to avoid overlapping */}
              <p className="techsphere__caption">
                <span className="techsphere__caption-dot" />
                Tech Stack Orbit
              </p>
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
