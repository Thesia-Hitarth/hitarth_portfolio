/**
 * data/experience.ts
 * ─────────────────────────────────────────────────────────
 * Work history and education entries.
 * Sorted chronologically — most recent first.
 * ─────────────────────────────────────────────────────────
 */

import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  // ── Most Recent: Junior Full-Stack Developer ──────────
  {
    id: "junior-fullstack-techwave",
    type: "work",
    company: "TechWave Solutions",
    companyUrl: "https://techwavesolutions.io",
    role: "Junior Full-Stack Developer",
    startDate: "2024-01",
    endDate: "present",
    location: "Vadodara, India",
    locationType: "hybrid",
    description:
      "Building and maintaining customer-facing web applications and internal tooling for a B2B SaaS product used by over 200 SME clients. " +
      "Work closely with a five-person engineering team to ship features on a two-week sprint cadence.",
    bullets: [
      "Re-architected the legacy client dashboard from a Create React App SPA to a Next.js 15 App Router application, cutting initial page load from 4.2 s to 1.1 s and improving Core Web Vitals LCP score from 62 to 94",
      "Designed and implemented a multi-tenant report generation microservice using Node.js and BullMQ job queues, reducing peak server load by 38% during end-of-month batch runs",
      "Introduced GitHub Actions CI with TypeScript strict-mode checks and automated Lighthouse audits, catching three regressions in the first sprint before they reached production",
      "Mentored two intern developers through bi-weekly pair-programming sessions and authored the team's internal guide on Prisma schema migration workflows",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "BullMQ",
      "Redis",
      "Tailwind CSS",
      "GitHub Actions",
    ],
  },

  // ── Internship: Frontend Developer ────────────────────
  {
    id: "intern-frontend-pixelcraft",
    type: "freelance",
    company: "PixelCraft Studio",
    companyUrl: "https://pixelcraftstudio.in",
    role: "Frontend Developer Intern",
    startDate: "2023-06",
    endDate: "2023-12",
    location: "Remote",
    locationType: "remote",
    description:
      "Six-month internship at a digital product agency building polished marketing sites and interactive web experiences for clients across the e-commerce and fintech verticals.",
    bullets: [
      "Delivered seven client-facing landing pages using Next.js and Framer Motion, averaging a Lighthouse Performance score of 96 across all projects",
      "Built a reusable component library of 24 UI primitives in Storybook, reducing average feature-delivery time by an estimated 30% on subsequent client engagements",
      "Integrated Stripe Elements and a custom webhook handler for a fintech client's subscription upgrade flow, processing ₹18 L in test-mode transactions without a single integration bug",
      "Collaborated directly with two senior designers to translate Figma prototypes into pixel-accurate, accessible React components with WCAG 2.1 AA compliance",
    ],
    technologies: [
      "Next.js",
      "React",
      "Framer Motion",
      "Stripe",
      "Storybook",
      "Tailwind CSS",
      "TypeScript",
    ],
  },

  // ── Education ─────────────────────────────────────────
  {
    id: "btech-cs-msu-baroda",
    type: "education",
    company: "The Maharaja Sayajirao University of Baroda",
    companyUrl: "https://www.msubaroda.ac.in",
    role: "B.Tech in Computer Science & Engineering",
    startDate: "2020-07",
    endDate: "2024-05",
    location: "Vadodara, India",
    locationType: "onsite",
    description:
      "Four-year undergraduate degree with a focus on data structures, algorithms, distributed systems, and software engineering. " +
      "Graduated with a CGPA of 8.6/10.",
    bullets: [
      "Ranked in the top 5% of the graduating batch with a CGPA of 8.6/10 across 8 semesters",
      "Led a four-person capstone team that built a real-time collaborative code editor (like Replit) using Next.js, Socket.IO, and Docker sandboxing — awarded 'Best Final Year Project' by the department",
      "Won first place at the university's annual hackathon (HackMSU 2023) for a smart-waste management dashboard that used IoT sensor data to optimise garbage collection routes",
      "Served as the Technical Lead of the university's Developer Society, organising three workshops on web development and open-source contribution for 120+ students",
    ],
    technologies: [
      "C++",
      "Java",
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "MySQL",
      "Linux",
    ],
  },
];

/** Work and freelance entries only */
export const workExperience = experiences.filter(
  (e) => e.type === "work" || e.type === "freelance"
);

/** Education entries only */
export const education = experiences.filter((e) => e.type === "education");
