'use client';

/**
 * components/sections/ProjectsSection.tsx
 * ─────────────────────────────────────────────────────────
 * Part A: Featured projects — full-width 55/45 editorial card
 * Part B: Other projects — 3-column card grid
 * ─────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionLabel } from '@/components/shared/SectionLabel';
import type { Project } from '@/lib/types';
import { useMagneticButton } from '@/hooks/useMagneticButton';

interface ProjectsSectionProps {
  projects: Project[];
  featured: Project[];
}

function FeaturedCard({ project, index }: { project: Project; index: number }): ReactElement {
  const [imgError, setImgError] = useState(false);
  const liveRef = useMagneticButton<HTMLAnchorElement>();
  const codeRef = useMagneticButton<HTMLAnchorElement>();
  const isOdd = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gap: 0,
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '3rem',
        background: 'var(--color-bg-3)',
        transition: 'border-color var(--dur-base) var(--ease-out-expo)',
      }}
      className={`grid-cols-1 ${isOdd ? 'lg:grid-cols-[45fr_55fr]' : 'lg:grid-cols-[55fr_45fr]'}`}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Image column */}
      <motion.div
        initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="project"
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          overflow: 'hidden',
          background: 'var(--color-bg-4)',
          minHeight: '280px',
        }}
        className={`lg:aspect-auto lg:min-h-[420px] ${isOdd ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {project.coverImage && !imgError ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{ objectFit: 'cover', transition: 'transform var(--dur-slower) var(--ease-out-expo)' }}
            onError={() => setImgError(true)}
            className="group-hover:scale-[1.04]"
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700,
            color: 'var(--color-border-2)',
          }}>
            {project.title[0]}
          </div>
        )}
        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, rgba(245,245,245,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Info column */}
      <motion.div
        initial={{ opacity: 0, x: isOdd ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
        }}
        className={isOdd ? 'lg:order-1' : 'lg:order-2'}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-text-3)', letterSpacing: 'var(--tracking-wide)', margin: 0 }}>
          {String(index + 1).padStart(2, '0')}
        </p>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, letterSpacing: 'var(--tracking-snug)', color: 'var(--color-text-1)', margin: 0 }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-text-3)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', margin: 0 }}>
          {project.tagline}
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'var(--color-text-2)', lineHeight: 1.7, margin: 0 }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.stack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {project.liveUrl && (
            <a
              ref={liveRef}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnetic"
              className="btn-magnetic btn-filled"
              style={{ fontSize: '0.65rem' }}
            >
              <span>Live Demo ↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              ref={codeRef}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magnetic"
              className="btn-magnetic"
              style={{ fontSize: '0.65rem' }}
            >
              <span>View Code ↗</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection({ projects, featured }: ProjectsSectionProps): ReactElement {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div className="container-site">
        <SectionLabel number="05" label="Projects" />
        <h2
          id="projects-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-text-1)',
            marginBottom: '3rem',
          }}
        >
          Things I&rsquo;ve built
        </h2>

        {/* Featured */}
        {featured.map((project, i) => (
          <FeaturedCard key={project.slug} project={project} index={i} />
        ))}

        {/* View all */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/projects" className="link-underline" data-cursor="link" style={{ fontSize: 'var(--text-sm)' }}>
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
