'use client';

/**
 * components/ui/MobileMenu.tsx
 * Full-screen overlay mobile navigation.
 * Links stagger in from left. Hamburger animates to ×.
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { ReactElement } from 'react';
import { siteConfig } from '@/config/site';

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Work',       href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'GitHub',     href: '#github' },
  { label: 'Contact',    href: '#contact' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
  exit: { opacity: 0, x: -10 },
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps): ReactElement {
  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--color-bg)',
            zIndex: 9990,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 'clamp(1rem, 3vw, 2rem)',
              right: 'clamp(1.5rem, 5vw, 4rem)',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-2)',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              letterSpacing: 'var(--tracking-wide)',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ borderBottom: '1px solid var(--color-border)', padding: '1.25rem 0' }}
                >
                  <button
                    onClick={() => handleLinkClick(href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 'clamp(1.8rem, 6vw, 3rem)',
                      color: 'var(--color-text-1)',
                      letterSpacing: 'var(--tracking-tight)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      transition: 'color var(--dur-base) var(--ease-out-expo)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-1)';
                    }}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Bottom social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(2rem, 5vw, 4rem)',
              left: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex',
              gap: '2rem',
            }}
          >
            {[
              { label: 'GitHub', href: siteConfig.social.github },
              { label: 'LinkedIn', href: siteConfig.social.linkedin },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-3)',
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  transition: 'color var(--dur-base) var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-3)';
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
