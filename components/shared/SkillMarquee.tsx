/**
 * components/shared/SkillMarquee.tsx
 * Two-row infinite horizontal skill ticker.
 * Row 1 scrolls LEFT, Row 2 scrolls RIGHT.
 * Uses .skill-marquee / .skill-marquee-reverse CSS classes.
 */

import type { ReactElement } from 'react';

const ROW_1 = [
  'React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit',
  'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth',
  'Framer Motion', 'GSAP', 'ShadCN/UI',
];

const ROW_2 = [
  'Git', 'GitHub', 'Postman', 'JavaScript', 'Java', 'C/C++',
  'Python', 'Firebase', 'Sanity', 'Strapi', 'MySQL',
  'TypeScript', 'AI / ML',
];

function MarqueeItem({ text }: { text: string }): ReactElement {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--color-text-2)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-wider)',
        paddingInline: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1.5rem',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <span style={{ color: 'var(--color-accent)', fontSize: '0.5rem' }}>◆</span>
    </span>
  );
}

function MarqueeRow({
  items,
  direction = 'left',
}: {
  items: string[];
  direction?: 'left' | 'right';
}): ReactElement {
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div className={direction === 'left' ? 'skill-marquee' : 'skill-marquee-reverse'}>
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  );
}

export function SkillMarquee(): ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <MarqueeRow items={ROW_1} direction="left" />
      <MarqueeRow items={ROW_2} direction="right" />
    </div>
  );
}
