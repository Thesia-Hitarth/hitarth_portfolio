/**
 * components/shared/TimelineItem.tsx
 * Two-column experience timeline item.
 * Uses .timeline-item CSS classes from globals.css.
 */

import type { ReactElement } from 'react';
import type { Experience } from '@/lib/types';
import { formatDate, getDuration } from '@/lib/utils';

interface TimelineItemProps {
  exp: Experience;
}

export function TimelineItem({ exp }: TimelineItemProps): ReactElement {
  const isWork = exp.type === 'work' || exp.type === 'freelance';
  const typeLabel = isWork
    ? exp.locationType
    : exp.role.toLowerCase().includes('diploma')
    ? 'Diploma'
    : exp.role.toLowerCase().includes('b.tech') || exp.role.toLowerCase().includes('btech')
    ? 'B.Tech'
    : exp.role.toLowerCase().includes('ssc') || exp.role.toLowerCase().includes('secondary')
    ? 'SSC'
    : 'Education';

  return (
    <div className="timeline-item">
      {/* Left: Meta */}
      <div className="timeline-item__meta">
        <p className="timeline-item__company">{exp.company}</p>
        <p className="timeline-item__date">
          {formatDate(exp.startDate)} —{' '}
          {exp.endDate === 'present' ? 'Present' : formatDate(exp.endDate)}
        </p>
        <p className="timeline-item__date" style={{ marginTop: '0.15rem' }}>
          {exp.location} · {getDuration(exp.startDate, exp.endDate)}
        </p>
        <span className="timeline-item__type">{typeLabel}</span>
      </div>

      {/* Right: Content */}
      <div>
        <h3 className="timeline-item__role">{exp.role}</h3>
        <p className="timeline-item__body">{exp.description}</p>

        {exp.bullets && exp.bullets.length > 0 && (
          <ul className="timeline-item__bullets">
            {exp.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        )}

        {exp.technologies && exp.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {exp.technologies.map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
