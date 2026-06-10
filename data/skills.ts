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
      { name: "Next.js", level: "expert", icon: "devicon-nextjs-plain" },
      { name: "React", level: "expert", icon: "devicon-react-original" },
      { name: "TypeScript", level: "proficient", icon: "devicon-typescript-plain" },
      { name: "Tailwind CSS", level: "expert", icon: "devicon-tailwindcss-plain" },
      { name: "Framer Motion", level: "comfortable", icon: "devicon-framermotion-original" },
      { name: "HTML / CSS", level: "expert", icon: "devicon-html5-plain" },
      { name: "Redux", level: "comfortable", icon: "devicon-redux-original" },
    ],
  },

  // ── 2. Backend ────────────────────────────────────────
  {
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "proficient", icon: "devicon-nodejs-plain" },
      { name: "Express.js", level: "proficient", icon: "devicon-express-original" },
      { name: "REST APIs", level: "proficient" },
      { name: "GraphQL", level: "comfortable", icon: "devicon-graphql-plain" },
      { name: "WebSockets", level: "comfortable" },
      { name: "NextAuth.js", level: "comfortable" },
    ],
  },

  // ── 3. Database ───────────────────────────────────────
  {
    name: "Database",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: "comfortable", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", level: "proficient", icon: "devicon-mongodb-plain" },
      { name: "Prisma ORM", level: "comfortable" },
      { name: "Redis", level: "learning", icon: "devicon-redis-plain" },
      { name: "MySQL", level: "comfortable", icon: "devicon-mysql-plain" },
    ],
  },

  // ── 4. DevOps & Tools ─────────────────────────────────
  {
    name: "DevOps & Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: "expert", icon: "devicon-git-plain" },
      { name: "GitHub Actions", level: "comfortable", icon: "devicon-github-original" },
      { name: "Docker", level: "learning", icon: "devicon-docker-plain" },
      { name: "Vercel", level: "proficient" },
      { name: "Postman", level: "proficient" },
      { name: "Linux", level: "comfortable", icon: "devicon-linux-plain" },
    ],
  },

  // ── 5. Currently Learning ─────────────────────────────
  {
    name: "Currently Learning",
    icon: "Sparkles",
    skills: [
      { name: "AWS", level: "learning", icon: "devicon-amazonwebservices-original" },
      { name: "Kubernetes", level: "learning", icon: "devicon-kubernetes-plain" },
      { name: "Rust", level: "learning", icon: "devicon-rust-plain" },
    ],
  },
];
