/**
 * data/projects.ts
 * ─────────────────────────────────────────────────────────
 * ALL project content lives here. Zero hardcoded strings
 * in components — import from this file instead.
 * ─────────────────────────────────────────────────────────
 */

import type { Project } from "@/lib/types";

export const projects: Project[] = [

  // ── 1. Cartza E-Commerce ──────────────────────────────
  {
    slug: "Cartza-ecommerce",
    title: "Cartza E-Commerce",
    tagline: "Full-stack MERN shopping platform with secure checkout.",
    year: 2025,
    category: "fullstack",
    featured: true,
    status: "live",
    coverImage: "/images/projects/Cartza.png",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "REST APIs",
    ],
    description:
      "A complete online shopping platform supporting product browsing, shopping cart state persistence, secure payments, and token-based session verification.",
    longDescription: `
## Overview
This full-stack MERN application was built to deeply explore database security, session handling, and backend authorization patterns. The focus was on securing checkout pathways and validating client inputs at the route boundaries.

## Technical Decisions
To handle state securely, authentication is implemented using JWT tokens with protected routes enforced on both the React client-side router and the Express.js server middleware. The checkout flow features third-party payment API integrations and server-side verification checks to prevent fraud.

## Learnings
Designing this project provided crucial insights into relational schema modeling in MongoDB, token storage strategies (such as HTTP-only cookies), and the orchestration of transactional order lifecycles.
    `,
    highlights: [
      "Built end-to-end from product listing to checkout, covering the complete MERN stack without any scaffolding.",
      "Implemented JWT-based authentication with protected routes enforced on both the React frontend and Express backend.",
      "Integrated a third-party payment API with server-side order verification to prevent client-side manipulation.",
      "Designed a normalized MongoDB schema to handle products, users, carts, and orders as separate collections with references.",
    ],
    liveUrl: "https://cartza-by-hitarth.vercel.app/",
    githubUrl: "https://github.com/Thesia-Hitarth/Cartza-by-hitarth",
    challenges: [
      "Securing route endpoints by validating JWT tokens on both frontend and backend handlers.",
      "Implementing custom Express validation middleware to intercept malformed request payloads before they reach controllers."
    ],
  },

  // ── 2. Querious (Featured Project) ────────────────────
  {
    slug: "querious",
    title: "Querious",
    tagline: "Community Q&A platform for developers.",
    year: 2024,
    category: "fullstack",
    featured: true,
    status: "live",
    coverImage: "/images/projects/Quereious.png",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT Authentication",
      "REST APIs",
    ],
    description:
      "A developer community Q&A platform featuring structured posts, answer upvoting, JWT authentication, and complex data aggregation.",
    longDescription: `
## Overview
Querious is a community-driven Q&A site tailored for software developers. The main engineering challenge was building a low-latency ranking system that scores and bubbles up relevant answers based on community votes and recency.

## Design and Integration
The platform uses JWT Authentication to manage user identity securely, decoupling login management from our database layer. In MongoDB, relational-style data schemas represent users, questions, answers, and votes, which are queried through optimized pipelines.

## Outcomes
By employing MongoDB aggregation pipelines, we implemented high-performance query logic that calculates voting scores on the fly, eliminating the need to cache stale values or run expensive post-processing in application memory.
    `,
    highlights: [
      "Built answer ranking using MongoDB aggregation pipelines that score by upvote count and recency combined.",
      "Integrated JWT Authentication for social login, decoupling identity management from the core API.",
      "Designed REST APIs for questions, answers, and votes with consistent error handling and HTTP status codes.",
      "Modeled a graph-like social data structure (users, questions, answers, votes) in MongoDB with efficient query patterns.",
    ],
    liveUrl: "https://querious-hitarth.vercel.app/",
    githubUrl: "https://github.com/Thesia-Hitarth/Querious",
  },

  // ── 3. TaskFlow (Featured Project) ──────────────────────
  {
    slug: "taskflow",
    title: "Developer Taskflows",
    tagline: "An interactive developer roadmap and career-guidance platform.",
    year: 2026,
    category: "opensource",
    featured: true,
    status: "live",
    coverImage: "/images/projects/taskflow.png",
    stack: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma (PostgreSQL)",
      "NextAuth",
    ],
    description:
      "An open-source developer roadmap and career guidance platform containing structured learning paths, interactive roadmaps, and a personalized recommendation engine.",
    longDescription: `
## Overview
Developer Taskflows (taskflow.sh) is a community-driven career guidance and roadmap platform built for developers. The goal was to provide high-quality learning paths that guide beginners and advanced engineers alike through the complexities of modern tech stacks.

## Key Features & Architecture
- **Interactive Roadmaps:** Role-based (Frontend, Backend, DevOps, AI Engineer) and skill-based (JavaScript, Python, Docker, Next.js) learning tracks with duration and difficulty estimates.
- **Find My Path Recommendation Engine:** A responsive 5-question diagnostic quiz that analyzes a developer's goals and experience to recommend the most optimal path.
- **Unified Navigation & Command Palette:** A custom-built, accessible search palette that allows quick filtering and keyword lookup across guides and roadmap paths.
- **Active Community Integrations:** An open contribution framework that maps structural career tracks dynamically and maintains a live, detailed release and changelog timeline.
    `,
    highlights: [
      "Designed and structured role-based and skill-based roadmaps covering 30+ career tracks and technologies.",
      "Developed a personalized recommendation engine ('Find My Path' quiz) recommending tailored learning tracks based on user inputs.",
      "Built a highly responsive search command palette for instant navigation across various roadmaps and articles.",
      "Established an open-source contribution workflow allowing developers to submit new guides and roadmap timelines.",
    ],
    liveUrl: "https://task-flow-by-hitarth.vercel.app/",
    githubUrl: "https://github.com/Thesia-Hitarth/TaskFlow-By-Hitarth-",
  },

  // ── 4. Daily Dose ──────────────────────────────────────
  {
    slug: "daily-dose",
    title: "Daily Dose",
    tagline: "Tiffin ordering and meal subscription platform.",
    year: 2025,
    category: "fullstack",
    featured: false,
    status: "live",
    coverImage: "/images/projects/daily-dose.png",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "ShadCN/UI",
      "REST APIs",
    ],
    description:
      "A live food subscription web app built as the sole frontend developer. " +
      "Features real-time order tracking, comprehensive cart state management, and a custom component library with ShadCN/UI supporting 150+ daily active users.",
    longDescription: `
## Overview
Daily Dose was engineered to solve the complex coordination of daily tiffin deliveries and meal subscription management. As the sole frontend developer, the primary goal was to deliver an intuitive, cross-device interface that simplifies subscription configuration and ordering.

## Architecture & Contributions
The frontend is built on React.js using ShadCN/UI, communicating with a Node.js/Express backend through well-defined, shared API contracts. I designed and implemented a consistent component library spanning over 10 pages, ensuring responsiveness across desktop and mobile layouts.

## Key Decisions & Outcomes
- Designed a unified component library to maintain aesthetic consistency across all application views.
- Leveraged shared API contracts to reduce development-time integration errors and speed up delivery cycles.
- Integrated optimistic UI updates in state management to ensure instant user feedback on order status updates.
- Reduced UI defects on mobile devices by conducting extensive cross-browser testing and device-agnostic responsive design.
    `,
    highlights: [
      "Sole frontend developer — designed and built a component library covering 10+ pages with consistent UI across desktop and mobile.",
      "Collaborated with the backend team using shared API contracts, reducing integration bugs during development.",
      "Implemented real-time order tracking and cart state management with REST API integration.",
      "Achieved consistent cross-device experience without a UI framework — custom components only with ShadCN/UI.",
    ],
    liveUrl: "https://daily-dose-tiffin.vercel.app/",
    githubUrl: "https://github.com/Thesia-Hitarth/Daily-Dose-Meal-Ordering",
  },

];

/** Projects marked as featured, used for the homepage spotlight */
export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Looks up a single project by its URL-safe slug.
 * Returns undefined if no match is found.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
