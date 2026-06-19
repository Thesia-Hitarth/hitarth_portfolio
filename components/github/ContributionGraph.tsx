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

const LEVEL_CLASSES: Record<number, string> = {
  0: 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200/40 dark:border-zinc-800/40',
  1: 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-200/30 dark:border-emerald-900/20',
  2: 'bg-emerald-300 dark:bg-emerald-800/70 border-emerald-400/30 dark:border-emerald-800/30',
  3: 'bg-emerald-500 dark:bg-emerald-600 border-emerald-500/30 dark:border-emerald-600/30',
  4: 'bg-emerald-700 dark:bg-emerald-400 border-emerald-700/30 dark:border-emerald-400/30',
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
    <div className="w-full rounded-2xl border border-border bg-card/40 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Contribution Activity</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className={cn('h-3.5 w-3.5 rounded-sm border', LEVEL_CLASSES[lvl])}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Area */}
      <div className="w-full overflow-x-auto select-none scrollbar-thin scrollbar-thumb-border">
        <div className="min-w-[720px] pb-2 pt-1">
          {/* Month Header Labels */}
          <div className="relative h-6 text-xs text-muted-foreground mb-1 font-mono">
            {monthLabels.map(({ label, colIndex }) => (
              <span
                key={`${label}-${colIndex}`}
                className="absolute"
                style={{ left: `${(colIndex * 13) + 30}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid Layout (Columns of Weeks) */}
          <div className="flex gap-[3px]">
            {/* Days Indicator Sidebar */}
            <div className="flex flex-col justify-between text-[10px] text-muted-foreground w-7 font-mono pr-2 py-0.5 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Heatmap Columns */}
            <div className="flex gap-[3px] flex-1">
              {gridData.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.count} contributions on ${day.formattedDate}`}
                      className={cn(
                        'h-[10px] w-[10px] rounded-[2px] border cursor-crosshair transition-all duration-150',
                        'hover:scale-125 hover:z-10 hover:shadow-[0_0_8px_rgba(16,185,129,0.3)]',
                        LEVEL_CLASSES[day.level]
                      )}
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
