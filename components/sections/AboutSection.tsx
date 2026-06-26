'use client';

/**
 * components/sections/AboutSection.tsx
 * ─────────────────────────────────────────────────────────
 * Premium About: editorial quote + bio (left 60%) · photo (right 40%)
 * Stats row with count-up cards below.
 * ─────────────────────────────────────────────────────────
 */

import Image from 'next/image';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { StatCard } from '@/components/shared/StatCard';
import { siteConfig } from '@/config/site';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

const PROFILE_IMG = '/Passportsize_Hitarth.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

const STATS = [
  { value: 2, suffix: '+', label: 'Dev Internships' },
  { value: 6, suffix: '+', label: 'MERN & Next.js Apps' },
  { value: 90, suffix: '+', label: 'Lighthouse Score' },
  { value: 45, suffix: '%', label: 'Fewer Re-renders' },
];

export function AboutSection(): ReactElement {
  const ghRef = useMagneticButton<HTMLAnchorElement>();
  const liRef = useMagneticButton<HTMLAnchorElement>();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-site">
        <SectionLabel number="02" label="About" />

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-[3fr_2fr]"
        >
          {/* LEFT: text content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Editorial quote */}
            <blockquote
              style={{
                fontFamily: 'var(--font-editorial)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                letterSpacing: 'var(--tracking-snug)',
                color: 'var(--color-text-2)',
                lineHeight: 1.4,
                margin: 0,
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: '1.5rem',
              }}
            >
              &ldquo;I&rsquo;m a firm believer that great software is built at the intersection of engineering rigour and product empathy.&rdquo;
            </blockquote>

            {/* Body copy */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.92rem',
                color: 'var(--color-text-2)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {siteConfig.description}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '0.92rem',
                color: 'var(--color-text-2)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              I care about the developer experience just as much as the end-user experience — because maintainable code is what keeps a product alive long after launch. Currently interning at{' '}
              <span style={{ color: 'var(--color-text-1)' }}>Codage Habitation</span>,
              building a multi-module tax-management platform.
            </p>

            {/* Social CTA buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                ref={ghRef}
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="btn-magnetic"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <GithubIcon size={14} />
                <span>GitHub ↗</span>
              </a>
              <a
                ref={liRef}
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="btn-magnetic"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn ↗</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Profile photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.15 }}
            className="w-full max-w-[340px] mx-auto lg:mx-0 lg:ml-auto"
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                aspectRatio: '4/5',
              }}
            >
              <Image
                src={PROFILE_IMG}
                alt={`${siteConfig.name} — Software Developer`}
                fill
                sizes="(max-width: 1024px) 90vw, 360px"
                priority
                style={{
                  objectFit: 'cover',
                  filter: 'grayscale(20%)',
                  transition: 'filter var(--dur-slower) var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(20%)';
                }}
              />

              {/* Gradient bottom shadow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(245,245,245,0.85) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Glassmorphism overlay card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-text-1)',
                  margin: 0,
                  letterSpacing: 'var(--tracking-snug)',
                }}>
                  {siteConfig.name}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-text-3)',
                  margin: '0.15rem 0 0',
                  letterSpacing: 'var(--tracking-wide)',
                }}>
                  Software Developer
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginTop: '0.4rem',
                }}>
                  <span style={{
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#5A9E6F',
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--color-accent)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                  }}>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginTop: '4rem',
          }}
          className="md:grid-cols-4"
        >
          {STATS.map(({ value, suffix, label }) => (
            <StatCard key={label} value={value} suffix={suffix} label={label} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}