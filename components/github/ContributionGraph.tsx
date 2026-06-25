'use client';

/**
 * components/github/ContributionGraph.tsx
 */

import { useMemo } from 'react';
import type { ReactElement } from 'react';
import type { ContributionDay } from '@/lib/github';
import { cn } from '@/lib/utils';

interface ContributionGraphProps {
  contributions: ContributionDay[];
}

const LEVEL_STYLES: Record<number, React.CSSProperties> = {
  0: { background: 'var(--color-bg-4)', border: '1px solid var(--color-border)' },
  1: { background: 'rgba(232, 201, 122, 0.15)', border: '1px solid rgba(232, 201, 122, 0.1)' },
  2: { background: 'rgba(232, 201, 122, 0.35)', border: '1px solid rgba(232, 201, 122, 0.2)' },
  3: { background: 'rgba(232, 201, 122, 0.65)', border: '1px solid rgba(232, 201, 122, 0.4)' },
  4: { background: 'var(--color-accent)',        border: '1px solid rgba(232, 201, 122, 0.6)' },
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function ContributionGraph({ contributions }: ContributionGraphProps): ReactElement {
  // Create a map for quick contribution lookups
  const contributionMap = useMemo(() => {
    const map = new Map<string, ContributionDay>();
    if (contributions && Array.isArray(contributions)) {
      contributions.forEach((day) => {
        map.set(day.date, day);
      });
    }
    return map;
  }, [contributions]);

  // Generate 53 weeks (Sunday-aligned) ending today
  const gridData = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date();
    // 52 weeks ago
    startDate.setDate(endDate.getDate() - 364);
    // Align to Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    const cols: Array<Array<{ date: string; formattedDate: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>> = [];

    // Temporary date tracker
    const current = new Date(startDate);

    // 53 columns (weeks)
    for (let c = 0; c < 53; c++) {
      const week: typeof cols[number] = [];
      // 7 rows (days)
      for (let r = 0; r < 7; r++) {
        const dateStr = current.toISOString().split('T')[0];
        const match = contributionMap.get(dateStr);
        
        // Formatted date string for accessibility/tooltips
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = current.toLocaleDateString('en-US', options);

        week.push({
          date: dateStr,
          formattedDate,
          count: match?.count ?? 0,
          level: match?.level ?? 0,
        });

        // Advance by 1 day
        current.setDate(current.getDate() + 1);
      }
      cols.push(week);
    }
    return cols;
  }, [contributionMap]);

  // Calculate Month label columns
  const monthLabels = useMemo(() => {
    const labels: Array<{ label: string; colIndex: number }> = [];
    let prevMonth = '';

    gridData.forEach((week, colIndex) => {
      // Look at the Wednesday of the week to determine the month label placement
      const wednesday = new Date(week[3].date);
      const monthName = MONTHS[wednesday.getMonth()];

      if (monthName !== prevMonth) {
        labels.push({ label: monthName, colIndex });
        prevMonth = monthName;
      }
    });

    return labels;
  }, [gridData]);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-text-3)', letterSpacing: 'var(--tracking-wide)' }}>Less</span>
        <div style={{ display: 'flex', gap: '3px' }}>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              style={{ width: '10px', height: '10px', borderRadius: '2px', ...LEVEL_STYLES[lvl] }}
              aria-hidden="true"
            />
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-micro)', color: 'var(--color-text-3)', letterSpacing: 'var(--tracking-wide)' }}>More</span>
      </div>

      <div style={{ width: '100%', overflowX: 'auto' }} className="no-scrollbar">
        <div style={{ minWidth: '720px', paddingBottom: '0.5rem', paddingTop: '0.25rem' }}>
          {/* Month labels */}
          <div style={{ position: 'relative', height: '1.25rem', marginBottom: '0.25rem' }}>
            {monthLabels.map(({ label, colIndex }) => (
              <span
                key={`${label}-${colIndex}`}
                style={{
                  position: 'absolute',
                  left: `${(colIndex * 13) + 30}px`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-text-3)',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '28px', paddingBlock: '2px' }}>
              {['Sun', 'Tue', 'Thu', 'Sat'].map((d) => (
                <span key={d} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--color-text-3)' }}>{d}</span>
              ))}
            </div>

            {/* Columns */}
            <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
              {gridData.map((week, colIdx) => (
                <div key={colIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.count} contributions on ${day.formattedDate}`}
                      style={{
                        width: '10px', height: '10px', borderRadius: '2px',
                        cursor: 'crosshair',
                        transition: 'transform 150ms ease, box-shadow 150ms ease',
                        ...LEVEL_STYLES[day.level],
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.3)';
                        if (day.level > 0) (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 6px rgba(232,201,122,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
