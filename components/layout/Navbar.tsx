'use client';

/**
 * components/layout/Navbar.tsx
 * ─────────────────────────────────────────────────────────
 * Premium dark navbar:
 * - Logo: "HT" in Syne, hover widens letter-spacing
 * - Links: home · about · work · contact (DM Sans, lowercase)
 * - Active section via IntersectionObserver
 * - CTA: "Let's talk ↗" magnetic pill
 * - Scroll: transparent → glass after 60px
 * - Mobile: hamburger → MobileMenu overlay
 * ─────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { useMagneticButton } from '@/hooks/useMagneticButton';

const NAV_LINKS = [
  { label: 'home',       href: '#hero' },
  { label: 'about',      href: '#about' },
  { label: 'work',       href: '#projects' },
  { label: 'contact',    href: '#contact' },
];

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'github', 'contact'];

export function Navbar(): ReactElement {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaRef = useMagneticButton<HTMLAnchorElement>();

  // Scroll glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const linkMatches = (href: string) => {
    const id = href.replace('#', '');
    if (href === '#projects') return activeSection === 'projects';
    return activeSection === id;
  };

  return (
    <>
      <header
        data-scrolled={scrolled}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: scrolled ? '64px' : '72px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(1.5rem, 5vw, 4rem)',
          transition: 'height 400ms cubic-bezier(0.16,1,0.3,1), background 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms cubic-bezier(0.16,1,0.3,1), backdrop-filter 400ms cubic-bezier(0.16,1,0.3,1)',
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          href="/#hero"
          data-cursor="link"
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            color: 'var(--color-text-1)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            transition: 'letter-spacing 400ms cubic-bezier(0.16,1,0.3,1)',
            marginRight: 'auto',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.letterSpacing = '0.35em';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.letterSpacing = '0.2em';
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-1)';
          }}
        >
          HT
        </Link>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ label, href }, i) => {
            const isActive = linkMatches(href);
            return (
              <span key={href} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {i > 0 && (
                  <span style={{
                    color: 'var(--color-text-3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    userSelect: 'none',
                  }}>
                    ·
                  </span>
                )}
                <button
                  onClick={() => handleNavClick(href)}
                  data-cursor="link"
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '0.72rem',
                    letterSpacing: 'var(--tracking-wide)',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-2)',
                    cursor: 'none',
                    padding: '0.25rem 0.5rem',
                    position: 'relative',
                    transition: 'color var(--dur-base) var(--ease-out-expo)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-1)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = isActive ? 'var(--color-accent)' : 'var(--color-text-2)';
                  }}
                >
                  {label}
                </button>
              </span>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          data-cursor="magnetic"
          className="btn-magnetic hidden md:inline-flex"
          style={{ marginLeft: '2rem', fontSize: '0.7rem' }}
        >
          <span>Let&apos;s talk ↗</span>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            padding: '0.5rem',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--color-text-1)', transition: 'all 300ms' }} />
          <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--color-text-1)', transition: 'all 300ms' }} />
        </button>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}