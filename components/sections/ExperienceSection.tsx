'use client';

/**
 * components/sections/ExperienceSection.tsx
 * ─────────────────────────────────────────────────────────
 * Two tabs: Work Experience | Education
 * Tab switch with Framer Motion AnimatePresence.
 * Each entry: TimelineItem component.
 * ─────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { TimelineItem } from '@/components/shared/TimelineItem';
import type { Experience } from '@/lib/types';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const TABS = ['Work Experience', 'Education'] as const;
type Tab = typeof TABS[number];

const tabContent = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  exit:    { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export function ExperienceSection({ experiences }: ExperienceSectionProps): ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>('Work Experience');

  const workExp = experiences.filter((e) => e.type === 'work' || e.type === 'freelance');
  const education = experiences.filter((e) => e.type === 'education');
  const items = activeTab === 'Work Experience' ? workExp : education;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-site">
        <SectionLabel number="04" label="Experience" />
        <h2
          id="experience-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-text-1)',
            marginBottom: '2.5rem',
          }}
        >
          Where I've worked
        </h2>

        {/* Tabs */}
        <div
          role="tablist"
          style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0' }}
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--color-text-1)' : 'var(--color-text-3)',
                  cursor: 'none',
                  paddingBottom: '0.75rem',
                  borderBottom: isActive ? `1px solid var(--color-accent)` : '1px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color var(--dur-base) var(--ease-out-expo), border-color var(--dur-base) var(--ease-out-expo)',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContent}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {items.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <TimelineItem exp={exp} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
