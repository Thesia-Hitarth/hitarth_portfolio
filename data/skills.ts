/**
 * data/skills.ts
 * ─────────────────────────────────────────────────────────
 * Full skill categorisation for the Skills section.
 * All content lives here — never in components.
 * ─────────────────────────────────────────────────────────
 */

import type { SkillCategory } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  // ── 1. Frontend ───────────────────────────────────────
  {
    name: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React.js", level: "expert" },
      { name: "Next.js", level: "proficient" },
      { name: "TypeScript", level: "proficient" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Redux Toolkit", level: "comfortable" },
      { name: "ShadCN/UI", level: "comfortable" },
    ],
  },

  // ── 2. Backend ────────────────────────────────────────
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "proficient" },
      { name: "Express.js", level: "proficient" },
      { name: "REST APIs", level: "proficient" },
      { name: "JWT Auth", level: "comfortable" },
      { name: "Firebase Auth", level: "comfortable" },
    ],
  },

  // ── 3. Database ───────────────────────────────────────
  {
    name: "Database",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: "proficient" },
      { name: "MySQL", level: "comfortable" },
    ],
  },

  // ── 4. CMS & Tools ────────────────────────────────────
  {
    name: "CMS & Tools",
    icon: "Wrench",
    skills: [
      { name: "Sanity", level: "comfortable" },
      { name: "Strapi", level: "comfortable" },
      { name: "Git", level: "proficient" },
      { name: "GitHub", level: "proficient" },
      { name: "Postman", level: "comfortable" },
    ],
  },

  // ── 5. Languages ──────────────────────────────────────
  {
    name: "Languages",
    icon: "Wrench",
    skills: [
      { name: "JavaScript", level: "expert" },
      { name: "TypeScript", level: "proficient" },
      { name: "Java", level: "comfortable" },
      { name: "C / C++", level: "comfortable" },
    ],
  },

  // ── 6. Currently Exploring ────────────────────────────
  {
    name: "Currently Exploring",
    icon: "Sparkles",
    skills: [
      { name: "AI", level: "learning" },
      { name: "ML", level: "learning" },
    ],
  },
];
