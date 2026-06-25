'use client';

/**
 * components/sections/ExperienceSection.tsx
 * ─────────────────────────────────────────────────────────
 * Charlie-template inspired accordion redesign.
 * Large numbered rows (01, 02, etc.) expand to reveal details.
 * Tab switch with Framer Motion AnimatePresence between Work and Education.
 * ─────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar, GraduationCap } from 'lucide-react';
import type { Experience } from '@/lib/types';
import { SectionLabel } from '@/components/shared/SectionLabel';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPeriod(start: string, end: string): string {
  const format = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.toLowerCase() === 'present') return 'Present';
    const parts = dateStr.split('-');
    if (parts.length === 2) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return dateStr;
  };
  return `${format(start)} – ${format(end)}`;
}

function calculateDuration(start: string, end: string): string {
  const startDate = new Date(start + '-01');
  const endDate = end.toLowerCase() === 'present' ? new Date() : new Date(end + '-01');
  const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tag({ label }: { label: string }): ReactElement {
  return <span className="tag">{label}</span>;
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function TabButton({ label, active, onClick }: TabButtonProps): ReactElement {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      data-cursor="link"
      style={{
        position: 'relative',
        paddingBottom: '0.6rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 400,
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        color: active ? 'var(--color-text-1)' : 'var(--color-text-3)',
        background: 'none',
        border: 'none',
        cursor: 'none',
        transition: 'color 300ms var(--ease-out-expo)',
      }}
    >
      {label}
      {active && (
        <motion.span
          layoutId="tab-indicator"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'var(--color-accent)',
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </button>
  );
}

function ToggleIcon({ isOpen }: { isOpen: boolean }): ReactElement {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 45 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        border: `1px solid ${isOpen ? 'var(--color-border-hover)' : 'var(--color-border-2)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: isOpen ? 'var(--color-accent-dim)' : 'transparent',
        transition: 'background 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)',
      }}
    >
      <ArrowUpRight
        size={14}
        style={{
          color: isOpen ? 'var(--color-accent)' : 'var(--color-text-3)',
          transition: 'color 350ms var(--ease-out-expo)',
        }}
      />
    </motion.div>
  );
}

interface MetaPillProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: boolean;
}

function MetaPill({ icon, children, accent }: MetaPillProps): ReactElement {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: accent ? 'var(--color-accent)' : 'var(--color-text-3)',
        letterSpacing: 'var(--tracking-wide)',
      }}
    >
      {icon}
      {children}
    </span>
  );
}

function TypeBadge({ label }: { label: string }): ReactElement {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.15rem 0.5rem',
        background: 'var(--color-bg-4)',
        border: '1px solid var(--color-border)',
        borderRadius: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        color: 'var(--color-text-3)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function ExpandedPanel({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Work Accordion Row ───────────────────────────────────────────────────────

interface WorkRowProps {
  item: Experience & { index: string; period: string; duration: string };
  isOpen: boolean;
  onToggle: () => void;
}

function WorkRow({ item, isOpen, onToggle }: WorkRowProps): ReactElement {
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      {/* Clickable Header */}
      <button
        onClick={onToggle}
        onMouseEnter={() => { if (!isOpen) onToggle(); }}
        data-cursor="link"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '3.5rem 1fr auto',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2rem 0',
          background: 'none',
          border: 'none',
          cursor: 'none',
          textAlign: 'left',
        }}
      >
        {/* Index */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: isOpen ? 'var(--color-accent)' : 'var(--color-text-3)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transition: 'color 350ms var(--ease-out-expo)',
          }}
        >
          {item.index}
        </span>

        {/* Company & Role */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.8rem)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-snug)',
              color: 'var(--color-text-1)',
              lineHeight: 1.15,
              marginBottom: '0.3rem',
            }}
          >
            {item.company}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 300,
              color: 'var(--color-text-2)',
            }}
          >
            {item.role}
          </div>
        </div>

        {/* Desktop Meta & Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="exp-desktop-meta" style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-3)',
                letterSpacing: 'var(--tracking-wide)',
                marginBottom: '0.2rem',
              }}
            >
              {item.period}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-text-3)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'capitalize',
              }}
            >
              {item.location} · {item.locationType}
            </div>
          </div>
          <ToggleIcon isOpen={isOpen} />
        </div>
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <ExpandedPanel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3.5rem 1fr',
              gap: '1.5rem',
              paddingBottom: '2.5rem',
            }}
          >
            <div style={{ paddingTop: '0.25rem' }}>
              <TypeBadge label={item.type} />
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '1.25rem',
                }}
              >
                <MetaPill icon={<Calendar size={11} />}>
                  {item.period} · {item.duration}
                </MetaPill>
                <MetaPill icon={<MapPin size={11} />}>
                  {item.location} · {item.locationType}
                </MetaPill>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: 'var(--color-text-2)',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                }}
              >
                {item.description}
              </p>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                }}
              >
                {item.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'var(--color-text-2)',
                      paddingLeft: '1.25rem',
                      position: 'relative',
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--color-accent)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        lineHeight: 1.75,
                      }}
                    >
                      —
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.technologies.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </ExpandedPanel>
      )}
    </div>
  );
}

// ─── Education Accordion Row ──────────────────────────────────────────────────

interface EduRowProps {
  item: Experience & { index: string; period: string; cgpa?: string; eduType: string };
  isOpen: boolean;
  onToggle: () => void;
}

function EduRow({ item, isOpen, onToggle }: EduRowProps): ReactElement {
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      {/* Clickable Header */}
      <button
        onClick={onToggle}
        onMouseEnter={() => { if (!isOpen) onToggle(); }}
        data-cursor="link"
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '3.5rem 1fr auto',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '2rem 0',
          background: 'none',
          border: 'none',
          cursor: 'none',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            color: isOpen ? 'var(--color-accent)' : 'var(--color-text-3)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            transition: 'color 350ms var(--ease-out-expo)',
          }}
        >
          {item.index}
        </span>

        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.8rem)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-snug)',
              color: 'var(--color-text-1)',
              lineHeight: 1.15,
              marginBottom: '0.3rem',
            }}
          >
            {item.company}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 300,
              color: 'var(--color-text-2)',
            }}
          >
            {item.role}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="exp-desktop-meta" style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-3)',
                letterSpacing: 'var(--tracking-wide)',
                marginBottom: '0.2rem',
              }}
            >
              {item.period}
            </div>
            {item.cgpa && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--color-accent)',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                CGPA {item.cgpa}
              </div>
            )}
          </div>
          <ToggleIcon isOpen={isOpen} />
        </div>
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <ExpandedPanel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '3.5rem 1fr',
              gap: '1.5rem',
              paddingBottom: '2.5rem',
            }}
          >
            <div style={{ paddingTop: '0.25rem' }}>
              <TypeBadge label={item.eduType} />
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  marginBottom: '1.25rem',
                }}
              >
                <MetaPill icon={<Calendar size={11} />}>
                  {item.period}
                </MetaPill>
                <MetaPill icon={<MapPin size={11} />}>
                  {item.location}
                </MetaPill>
                {item.cgpa && (
                  <MetaPill icon={<GraduationCap size={11} />} accent>
                    CGPA: {item.cgpa}
                  </MetaPill>
                )}
              </div>

              {item.description && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    color: 'var(--color-text-2)',
                    lineHeight: 1.75,
                    marginBottom: '1.25rem',
                  }}
                >
                  {item.description}
                </p>
              )}

              {item.bullets.length > 0 && (
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  {item.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        fontWeight: 300,
                        color: 'var(--color-text-2)',
                        paddingLeft: '1.25rem',
                        position: 'relative',
                        lineHeight: 1.65,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: 'var(--color-accent)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          lineHeight: 1.75,
                        }}
                      >
                        —
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.technologies.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
          </div>
        </ExpandedPanel>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps): ReactElement {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');
  const [openWork, setOpenWork] = useState<string | null>('codage-habitation-intern');
  const [openEdu, setOpenEdu] = useState<string | null>('charusat-btech');

  const toggleWork = (id: string) =>
    setOpenWork((prev) => (prev === id ? null : id));
  const toggleEdu = (id: string) =>
    setOpenEdu((prev) => (prev === id ? null : id));

  // Map raw data dynamically to Redesign shapes
  const workItems = experiences
    .filter((e) => e.type === 'work' || e.type === 'freelance')
    .map((item, index) => ({
      ...item,
      index: (index + 1).toString().padStart(2, '0'),
      period: formatPeriod(item.startDate, item.endDate),
      duration: calculateDuration(item.startDate, item.endDate),
    }));

  const educationItems = experiences
    .filter((e) => e.type === 'education')
    .map((item, index) => {
      const cgpaMatch = item.description.match(/(?:CGPA|Percentage):\s*([^\.]+)/i);
      const cgpa = cgpaMatch ? cgpaMatch[1].trim() : undefined;

      let eduType: 'B.Tech' | 'Diploma' | 'School' = 'School';
      if (item.role.toLowerCase().includes('b.tech')) eduType = 'B.Tech';
      else if (item.role.toLowerCase().includes('diploma')) eduType = 'Diploma';

      return {
        ...item,
        index: (index + 1).toString().padStart(2, '0'),
        period: formatPeriod(item.startDate, item.endDate),
        cgpa,
        eduType,
      };
    });

  return (
    <section id="experience" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container-site">
        {/* Section label */}
        <div style={{ marginBottom: '2.5rem' }}>
          <SectionLabel number="04" label="Experience" />
        </div>

        {/* Tab strip */}
        <div
          role="tablist"
          style={{
            display: 'flex',
            gap: '2rem',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1rem',
          }}
        >
          <TabButton
            label="Work"
            active={activeTab === 'work'}
            onClick={() => setActiveTab('work')}
          />
          <TabButton
            label="Education"
            active={activeTab === 'education'}
            onClick={() => setActiveTab('education')}
          />
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {workItems.map((item) => (
                <WorkRow
                  key={item.id}
                  item={item}
                  isOpen={openWork === item.id}
                  onToggle={() => toggleWork(item.id)}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {educationItems.map((item) => (
                <EduRow
                  key={item.id}
                  item={item}
                  isOpen={openEdu === item.id}
                  onToggle={() => toggleEdu(item.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive styling */}
      <style>{`
        .exp-desktop-meta { display: none; }
        @media (min-width: 768px) {
          .exp-desktop-meta { display: block; }
        }
      `}</style>
    </section>
  );
}
