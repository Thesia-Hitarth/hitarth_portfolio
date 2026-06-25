/**
 * lib/types.ts
 * ─────────────────────────────────────────────────────────
 * All shared TypeScript interfaces / types for the portfolio.
 * Import from this file — never duplicate type definitions.
 * ─────────────────────────────────────────────────────────
 */

// ─── Project ─────────────────────────────────────────────

export interface Project {
  /** URL-safe identifier used for the /projects/[slug] dynamic route */
  slug: string;

  /** Display title of the project */
  title: string;

  /** One-line description shown on the project card */
  tagline: string;

  /** 2–3 sentence summary for the project detail page */
  description: string;

  /** Optional markdown string used for a full written case study */
  longDescription?: string;

  /** Path relative to /public/images/projects/ for the cover image */
  coverImage: string;

  /** Additional screenshot paths for the detail page gallery */
  images?: string[];

  /** Technology tags rendered as pills on the project card */
  stack: string[];

  /** URL to the live deployed version */
  liveUrl?: string;

  /** URL to the GitHub repository */
  githubUrl?: string;

  /** When true the project appears in the featured spotlight on the homepage */
  featured: boolean;

  /** Deployment / development status */
  status: "live" | "in-progress" | "archived";

  /** Year the project was shipped / is being built */
  year: number;

  /** Broad category used for filtering */
  category: "fullstack" | "frontend" | "backend" | "opensource";

  /** 3–4 bullet points that explain the technical depth or business impact */
  highlights: string[];

  /** Optional engineering challenges and key decisions */
  challenges?: string[];
}

// ─── Skills ──────────────────────────────────────────────

export interface SkillCategory {
  /** Display name for the category group */
  name: string;

  /** Lucide icon name (as a string) rendered next to the category header */
  icon: string;

  /** Ordered list of skills within this category */
  skills: Skill[];
}

export interface Skill {
  /** Display name of the skill / technology */
  name: string;

  /** Self-assessed proficiency level */
  level: "learning" | "comfortable" | "proficient" | "expert";

  /** Devicon CSS class name or path to a custom SVG icon */
  icon?: string;
}

// ─── Experience ───────────────────────────────────────────

export interface Experience {
  /** Unique identifier for the experience entry */
  id: string;

  /** Classifies the entry for filtering and icon selection */
  type: "work" | "education" | "freelance";

  /** Company, university, or client name */
  company: string;

  /** Optional public URL for the company / institution */
  companyUrl?: string;

  /** Job title, degree, or engagement type */
  role: string;

  /**
   * Start date as an ISO partial date string.
   * Use format "YYYY-MM" (e.g. "2023-06").
   */
  startDate: string;

  /**
   * End date as an ISO partial date string, or the literal
   * string "present" when the role is ongoing.
   */
  endDate: string | "present";

  /** City / country or "Remote" */
  location: string;

  /** Work arrangement */
  locationType: "remote" | "onsite" | "hybrid";

  /** Paragraph-level summary shown in collapsed / card view */
  description: string;

  /**
   * Impact-focused bullet points.
   * Each bullet should follow the pattern "Action verb + outcome metric."
   */
  bullets: string[];

  /** Technologies used during this role */
  technologies: string[];

  /** Path to the company / institution logo inside /public */
  logo?: string;
}

