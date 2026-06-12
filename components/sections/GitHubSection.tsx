/**
 * components/sections/GitHubSection.tsx
 * ─────────────────────────────────────────────────────────
 * GitHub activity dashboard section.
 * Fetches metrics, streaks, and pinned repos on the server.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import {
  Flame,
  GitBranch,
  Star,
  BookOpen,
  Users,
  Activity,
  ArrowUpRight,
  Trophy
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getGitHubData } from '@/lib/github';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContributionGraph } from '@/components/github/ContributionGraph';

export async function GitHubSection(): Promise<ReactElement> {
  // Extract github username from siteConfig
  const username = siteConfig.social.github.split('/').pop() || 'Thesia-Hitarth';

  // Load github profile, streaks, and contribution grid data
  const { stats, pinnedRepos, contributions } = await getGitHubData(username);

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-24 lg:py-32 border-t border-border bg-muted/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="github-heading"
          label="06 / GitHub"
          title="Open-Source & Activity"
          subtitle="A live view into my contributions, active coding streaks, and pinned projects."
        />

        {/* ── Grid for Heatmap and Pinned Repos ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Heatmap and Stats Column */}
          <div className="lg:col-span-2 space-y-6">
            <ContributionGraph contributions={contributions} />

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Total Contributions */}
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-sm transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider">Contributions</span>
                  <Activity className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">
                    {stats.totalContributions.toLocaleString()}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1">Total in last 12 months</p>
                </div>
              </div>

              {/* Card 2: Current Streak */}
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-sm transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider">Current Streak</span>
                  <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{stats.currentStreak}</span>
                  <span className="text-sm font-medium text-muted-foreground ml-1">days</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Consecutive active coding days</p>
                </div>
              </div>

              {/* Card 3: Longest Streak */}
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-sm transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider">Longest Streak</span>
                  <Trophy className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{stats.longestStreak}</span>
                  <span className="text-sm font-medium text-muted-foreground ml-1">days</span>
                  <p className="text-[11px] text-muted-foreground mt-1">All-time record streak</p>
                </div>
              </div>

              {/* Card 4: Public Repos */}
              <div className="rounded-2xl border border-border bg-card/40 p-5 shadow-sm transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="text-xs font-mono uppercase tracking-wider">Public Repos</span>
                  <BookOpen className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{stats.publicRepos}</span>
                  <p className="text-[11px] text-muted-foreground mt-1">Repositories on GitHub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Repos Area */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Pinned Repositories
                </h3>

                <div className="space-y-4">
                  {pinnedRepos.length > 0 ? (
                    pinnedRepos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {repo.name}
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {repo.description}
                        </p>
                        
                        <div className="mt-4 flex items-center gap-4 text-[10px] text-muted-foreground font-semibold">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-primary" />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3" />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitBranch className="h-3 w-3" />
                            {repo.forks}
                          </span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground py-6 text-center">
                      No pinned repositories found.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border text-center">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  View full profile on GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
