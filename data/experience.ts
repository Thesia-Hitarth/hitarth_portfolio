/**
 * data/experience.ts
 * ─────────────────────────────────────────────────────────
 * Work history and education entries.
 * Sorted chronologically — most recent first.
 * ─────────────────────────────────────────────────────────
 */

import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  // ── 1. Codage Habitation (Current Internship) ──────────
  {
    id: "codage-habitation-intern",
    type: "work",
    company: "Codage Habitation",
    companyUrl: "",
    role: "Frontend Developer Intern",
    startDate: "2026-01",
    endDate: "present",
    location: "Ahmedabad, Gujarat",
    locationType: "onsite",
    description:
      "Building a multi-module tax-management platform serving financial advisors. " +
      "Contributed across UI components, state management, and headless CMS integrations to deliver a responsive, performant user experience.",
    bullets: [
      "Built 25+ reusable UI components in React.js, TypeScript, and Tailwind CSS, directly improving user engagement by 30% as measured by session depth analytics.",
      "Cut component re-renders by 45% by replacing local state with Redux Toolkit slices and scoping React Context precisely to the subtrees that needed it.",
      "Achieved and maintained a 90+ Google Lighthouse performance score through code splitting, lazy loading, and strategic memoization of expensive render paths.",
      "Integrated Sanity and Strapi headless CMS, enabling non-technical team members to manage content independently without developer involvement.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Sanity",
      "Strapi",
    ],
  },

  // ── 2. Zikasha Consultancy LLP (Previous Internship) ───
  {
    id: "zikasha-intern",
    type: "work",
    company: "Zikasha Consultancy LLP",
    companyUrl: "",
    role: "Software Developer Intern",
    startDate: "2025-02",
    endDate: "2025-08",
    location: "Gandhinagar, Gujarat",
    locationType: "onsite",
    description:
      "Developed a full-stack food delivery platform serving 150+ daily active users. " +
      "Built multiple REST API endpoints and enhanced checkout security and stability.",
    bullets: [
      "Developed a full-stack food delivery platform serving 150+ daily users, handling real-time order tracking, cart management, and meal subscription workflows end-to-end.",
      "Designed and built 10+ REST API endpoints in Node.js and Express.js covering authentication, order lifecycle, and subscription management.",
      "Diagnosed and fixed a broken checkout flow and added client-side and server-side form validation, eliminating the user-reported order errors that had been logged weekly.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "ShadCN/UI",
      "REST APIs",
    ],
  },

  // ── 3. CHARUSAT University (Education) ────────────────
  {
    id: "charusat-btech",
    type: "education",
    company: "CHARUSAT University",
    companyUrl: "",
    role: "B.Tech in Computer Engineering",
    startDate: "2022-07",
    endDate: "2025-06",
    location: "Anand, Gujarat",
    locationType: "onsite",
    description:
      "Bachelor of Technology in Computer Engineering from Charotar University of Science and Technology (CHARUSAT), Anand. CGPA: 7.50 / 10.",
    bullets: [
      "Completed full B.Tech curriculum covering data structures, algorithms, databases, operating systems, and software engineering.",
      "Built and shipped 3 full-stack projects during the program, all of which are live and publicly accessible.",
    ],
    technologies: [
      "Java",
      "C/C++",
      "Data Structures",
      "Algorithms",
      "DBMS",
      "Operating Systems",
    ],
  },

  // ── 4. Government Polytechnic, Gandhinagar (Education) ───
  {
    id: "government-polytechnic-diploma",
    type: "education",
    company: "Government Polytechnic, Gandhinagar",
    companyUrl: "",
    role: "Diploma in Computer Engineering",
    startDate: "2019-06",
    endDate: "2022-06",
    location: "Gandhinagar, Gujarat",
    locationType: "onsite",
    description:
      "Diploma in Computer Engineering from Government Polytechnic, Gandhinagar. CGPA: 8.96 / 10.",
    bullets: [
      "Completed core coursework in computer programming, database systems, computer networks, and operating systems.",
    ],
    technologies: [
      "C",
      "C++",
      "HTML",
      "CSS",
      "JavaScript",
      "DBMS",
      "Computer Networks",
    ],
  },

  // ── 5. Shree Swaminarayan Gurukul Gyanbag (Education) ────
  {
    id: "swaminarayan-gurukul-ssc",
    type: "education",
    company: "Shree Swaminarayan Gurukul Gyanbag International School, Junagadh",
    companyUrl: "",
    role: "CBSE Secondary School Certificate (SSC)",
    startDate: "2018-06",
    endDate: "2019-05",
    location: "Junagadh, Gujarat",
    locationType: "onsite",
    description:
      "Secondary School Certificate (Class X) under the Central Board of Secondary Education (CBSE). Percentage: 85.60%.",
    bullets: [
      "Completed secondary school education with high performance in Science, Mathematics, and Computer Applications.",
    ],
    technologies: [],
  },
];

/** Work and freelance entries only */
export const workExperience = experiences.filter(
  (e) => e.type === "work" || e.type === "freelance"
);

/** Education entries only */
export const education = experiences.filter((e) => e.type === "education");
