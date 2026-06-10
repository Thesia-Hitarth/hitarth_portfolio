/**
 * lib/github.ts
 * ─────────────────────────────────────────────────────────
 * GitHub API fetchers and statistics helpers.
 * Handles rate limits and down endpoints gracefully.
 * ─────────────────────────────────────────────────────────
 */

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  language?: string;
  stars: number;
  forks: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  stats: {
    publicRepos: number;
    followers: number;
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
  };
  pinnedRepos: GitHubRepo[];
  contributions: ContributionDay[];
}

const DEFAULT_HEADERS = {
  'User-Agent': 'hitarth-portfolio-agent',
};

// Revalidate cache every 4 hours (14400 seconds)
const FETCH_OPTIONS = {
  headers: DEFAULT_HEADERS,
  next: { revalidate: 14400 },
};

/**
 * Calculates current and longest contribution streaks.
 */
function calculateStreaks(contributions: ContributionDay[]): { currentStreak: number; longestStreak: number } {
  if (!contributions || contributions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Sort by date ascending
  const sorted = [...contributions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak (backwards from today/yesterday)
  // Find the index of today/yesterday in sorted
  const todayIdx = sorted.findIndex((day) => day.date === todayStr);
  const yesterdayIdx = sorted.findIndex((day) => day.date === yesterdayStr);

  const startIdx = todayIdx !== -1 && sorted[todayIdx].count > 0 
    ? todayIdx 
    : yesterdayIdx !== -1 && sorted[yesterdayIdx].count > 0 
      ? yesterdayIdx 
      : -1;

  if (startIdx !== -1) {
    for (let i = startIdx; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, longestStreak };
}

/**
 * Fetch public stats from Github REST API
 */
async function fetchGitHubProfile(username: string): Promise<{ publicRepos: number; followers: number }> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, FETCH_OPTIONS);
    if (!res.ok) {
      throw new Error(`GitHub user endpoint returned ${res.status}`);
    }
    const data = await res.json();
    return {
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return { publicRepos: 0, followers: 0 };
  }
}

/**
 * Fetch pinned repositories or fallback to latest updated public repos.
 */
async function fetchPinnedRepos(username: string): Promise<GitHubRepo[]> {
  // Try the pinned repositories API first
  try {
    const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`, {
      next: { revalidate: 14400 }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.slice(0, 3).map((repo: any) => ({
          name: repo.repo,
          description: repo.description || 'No description provided.',
          url: repo.link,
          language: repo.language,
          stars: parseInt(repo.stars, 10) || 0,
          forks: parseInt(repo.forks, 10) || 0,
        }));
      }
    }
  } catch (error) {
    console.warn('Pinned repos API down, trying Github REST fallback:', error);
  }

  // Fallback: Fetch top 3 recently updated public repositories
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=3`,
      FETCH_OPTIONS
    );
    if (res.ok) {
      const repos = await res.json();
      if (Array.isArray(repos)) {
        return repos.map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description provided.',
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
        }));
      }
    }
  } catch (err) {
    console.error('Fallback GitHub repos fetch failed:', err);
  }

  return [];
}

/**
 * Fetch user contribution heatmap calendar data
 */
async function fetchContributions(username: string): Promise<{ contributions: ContributionDay[]; total: number }> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 14400 }
    });
    if (!res.ok) {
      throw new Error(`Contributions API returned status ${res.status}`);
    }
    const data = await res.json();

    if (data && Array.isArray(data.contributions)) {
      // Map to ContributionDay types
      const contributions: ContributionDay[] = data.contributions.map((d: any) => ({
        date: d.date,
        count: d.count,
        level: d.level as ContributionDay['level'],
      }));

      // Calculate total from last year/all-time
      const total = data.total?.user ?? contributions.reduce((acc, curr) => acc + curr.count, 0);

      return { contributions, total };
    }
  } catch (error) {
    console.error('Error fetching contributions:', error);
  }

  return { contributions: [], total: 0 };
}

/**
 * Orchestrator to load all GitHub information safely.
 */
export async function getGitHubData(username: string): Promise<GitHubData> {
  const [profile, pinned, contributionInfo] = await Promise.all([
    fetchGitHubProfile(username),
    fetchPinnedRepos(username),
    fetchContributions(username),
  ]);

  const { currentStreak, longestStreak } = calculateStreaks(contributionInfo.contributions);

  return {
    stats: {
      publicRepos: profile.publicRepos,
      followers: profile.followers,
      totalContributions: contributionInfo.total,
      currentStreak,
      longestStreak,
    },
    pinnedRepos: pinned,
    contributions: contributionInfo.contributions,
  };
}
