/**
 * components/shared/SkillRow.tsx
 * Single skill row: name | animated bar | level label.
 * Uses .skill-row CSS class from globals.css.
 * Bar animates in width via IntersectionObserver + CSS transition.
 */

'use client';

import type { ReactElement } from 'react';
import { useRef, useEffect, useState } from 'react';

interface SkillRowProps {
  name: string;
  level: 'expert' | 'proficient' | 'comfortable' | 'learning';
  delay?: number; // stagger delay in seconds
}

const LEVEL_WIDTHS = {
  expert:      '90%',
  proficient:  '75%',
  comfortable: '60%',
  learning:    '35%',
};

const LEVEL_LABELS = {
  expert:      'Expert',
  proficient:  'Proficient',
  comfortable: 'Comfortable',
  learning:    'Exploring',
};

export function SkillRow({ name, level, delay = 0 }: SkillRowProps): ReactElement {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const barStyle: React.CSSProperties = {
    '--bar-w': visible ? LEVEL_WIDTHS[level] : '0%',
    '--delay': `${delay}s`,
  } as React.CSSProperties;

  return (
    <div className="skill-row">
      <span className="skill-row__name">{name}</span>
      <div
        ref={barRef}
        className="skill-row__bar"
        style={barStyle}
        aria-label={`${name}: ${LEVEL_LABELS[level]}`}
      />
      <span className="skill-row__level">{LEVEL_LABELS[level]}</span>
    </div>
  );
}
