/**
 * components/sections/GitHubSection.tsx
 * ─────────────────────────────────────────────────────────
 * GitHub activity section — restyled for the premium dark theme.
 * Server component. Hoverable UI elements are extracted into
 * client sub-components to allow event handlers.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import { Flame, Activity, Trophy, BookOpen, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { getGitHubData } from '@/lib/github';
import { ContributionGraph } from '@/components/github/ContributionGraph';
import { GitHubStatCard } from '@/components/github/GitHubStatCard';
import { PinnedRepoCard } from '@/components/github/PinnedRepoCard';
import { SectionLabel } from '@/components/shared/SectionLabel';

export async function GitHubSection(): Promise<ReactElement> {
  const username = siteConfig.social.github.split('/').pop() || 'Thesia-Hitarth';
  const { stats, pinnedRepos, contributions, error } = await getGitHubData(username);

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container-site">
        <SectionLabel number="06" label="GitHub" />
        <h2
          id="github-heading"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            color: 'var(--color-text-1)',
            marginBottom: '0.75rem',
          }}
        >
          Open-Source &amp; Activity
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
          fontSize: '0.92rem',
          color: 'var(--color-text-2)',
          marginBottom: '3rem',
          maxWidth: '500px',
        }}>
          A live view into my contributions, active coding streaks, and pinned projects.
        </p>

        {error ? (
          /* Offline fallback */
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            background: 'var(--color-bg-3)',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <div style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'var(--color-accent-dim)',
              border: '1px solid rgba(232,201,122,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <Activity size={20} color="var(--color-accent)" />
            </div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: 'var(--color-text-1)',
              margin: '0 0 0.5rem',
              letterSpacing: 'var(--tracking-snug)',
            }}>
              GitHub Data Offline
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-2)',
              lineHeight: 1.7,
              margin: '0 0 1.5rem',
            }}>
              Couldn&apos;t reach the GitHub API (likely rate limiting). View my live
              contribution graph and repositories directly on my profile.
            </p>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.7rem 1.5rem',
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-wider)',
                textTransform: 'uppercase',
                borderRadius: '100px',
                textDecoration: 'none',
              }}
            >
              Visit GitHub Profile
              <ArrowUpRight size={12} />
            </a>
          </div>
        ) : (
          <div
            style={{ display: 'grid', gap: '2rem' }}
            className="grid-cols-1 lg:grid-cols-[3fr_2fr]"
          >
            {/* Left: heatmap + stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Contribution graph */}
              <div style={{
                background: 'var(--color-bg-3)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '1.5rem',
                overflow: 'hidden',
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  letterSpacing: 'var(--tracking-widest)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-3)',
                  marginBottom: '1.25rem',
                }}>
                  Contribution Activity
                </p>
                <ContributionGraph contributions={contributions} />
              </div>

              {/* 4-stat grid — using client GitHubStatCard */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                <GitHubStatCard
                  label="Contributions"
                  value={stats.totalContributions.toLocaleString()}
                  subtitle="Last 12 months"
                  icon={<Activity size={14} color="#5A9E6F" />}
                />
                <GitHubStatCard
                  label="Current Streak"
                  value={`${stats.currentStreak} days`}
                  subtitle="Consecutive coding days"
                  icon={<Flame size={14} color="var(--color-accent)" />}
                />
                <GitHubStatCard
                  label="Longest Streak"
                  value={`${stats.longestStreak} days`}
                  subtitle="All-time record"
                  icon={<Trophy size={14} color="var(--color-accent)" />}
                />
                <GitHubStatCard
                  label="Repositories"
                  value={stats.publicRepos}
                  subtitle="Public repositories"
                  icon={<BookOpen size={14} color="var(--color-accent)" />}
                />
              </div>
            </div>

            {/* Right: pinned repos */}
            <div style={{
              background: 'var(--color-bg-3)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase',
                color: 'var(--color-text-3)',
              }}>
                Pinned Repositories
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                {pinnedRepos.length > 0
                  ? pinnedRepos.map((repo) => (
                      <PinnedRepoCard key={repo.name} repo={repo} />
                    ))
                  : (
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-3)', textAlign: 'center', padding: '2rem 0' }}>
                      No pinned repositories found.
                    </p>
                  )}
              </div>

              {/* Profile link */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textDecoration: 'none',
                  }}
                >
                  github.com/Thesia-Hitarth
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
