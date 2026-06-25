'use client';

/**
 * components/sections/SkillsSection.tsx
 * ─────────────────────────────────────────────────────────
 * Part A: Infinite scrolling marquee (two rows, opposite directions)
 * Part B: Three-column categorized skill list with animated bars
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { SkillMarquee } from '@/components/shared/SkillMarquee';
import { SkillRow } from '@/components/shared/SkillRow';
import type { SkillCategory } from '@/lib/types';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
};

export function SkillsSection({ categories }: SkillsSectionProps): ReactElement {
  // Use first 3 categories for 3-column layout
  const [frontend, backend, tools] = [
    categories.find((c) => c.name === 'Frontend'),
    categories.find((c) => c.name === 'Backend'),
    categories.find((c) => c.name === 'CMS & Tools'),
  ];

  const cols = [
    { title: 'Frontend', cat: frontend },
    { title: 'Backend',  cat: backend },
    { title: 'Tools & Other', cat: tools },
  ].filter((c) => c.cat);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section"
      style={{ background: 'var(--color-bg-2)' }}
    >
      <div className="container-site">
        <SectionLabel number="03" label="Skills" />
        <h2
          id="skills-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-text-1)',
            marginBottom: '3rem',
          }}
        >
          What I work with
        </h2>
      </div>

      {/* Part A: Marquee — edge to edge */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '5rem' }}>
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetBlock: 0,
            left: 0,
            width: '10vw',
            background: 'linear-gradient(to right, var(--color-bg-2), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetBlock: 0,
            right: 0,
            width: '10vw',
            background: 'linear-gradient(to left, var(--color-bg-2), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <SkillMarquee />
      </div>

      {/* Part B: Categorized lists */}
      <div className="container-site">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gap: '3rem',
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {cols.map(({ title, cat }) => (
            <div key={title}>
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  fontWeight: 400,
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '1.5rem',
                }}
              >
                {title}
              </h3>
              <div>
                {cat?.skills.map((skill, i) => (
                  <SkillRow
                    key={skill.name}
                    name={skill.name}
                    level={skill.level === 'learning' ? 'comfortable' : skill.level}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
