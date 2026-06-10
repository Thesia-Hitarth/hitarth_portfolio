/**
 * data/projects.ts
 * ─────────────────────────────────────────────────────────
 * ALL project content lives here. Zero hardcoded strings
 * in components — import from this file instead.
 * ─────────────────────────────────────────────────────────
 */

import type { Project } from "@/lib/types";

export const projects: Project[] = [
  // ── 1. SaaS Analytics Dashboard ─────────────────────────
  {
    slug: "nexus-dashboard",
    title: "Nexus Dashboard",
    tagline: "Multi-tenant SaaS analytics platform with real-time data pipelines",
    description:
      "Nexus is a production-grade SaaS analytics dashboard built for B2B teams that need live visibility into their business metrics. " +
      "The platform handles multi-tenant data isolation, real-time WebSocket updates, and a role-based access control system — all deployed on Vercel with a zero-downtime CI/CD pipeline.",
    longDescription: `
## Overview
Nexus Dashboard was designed to replace fragmented spreadsheet workflows for growing B2B teams. The core challenge was engineering a system that could serve deeply isolated per-tenant datasets at sub-100ms latency while keeping infrastructure costs predictable at scale.

## Architecture
The frontend is a Next.js 15 App Router application with React Server Components handling data-heavy views and a thin client layer for real-time chart updates via WebSockets. Authentication is delegated to NextAuth.js backed by a PostgreSQL session store.

On the backend, a Prisma-managed PostgreSQL instance uses row-level security policies to enforce multi-tenant isolation at the database layer — no application-level filtering required.

## Key Decisions
- Row-Level Security over application-level filtering eliminates an entire class of data-leak bugs
- WebSocket events are broadcast through a Redis pub/sub channel so horizontal scaling doesn't break real-time updates
- CI/CD via GitHub Actions runs type-checks, unit tests, and a Lighthouse CI audit before every merge to main
    `,
    coverImage: "/images/projects/nexus-dashboard.png",
    images: [
      "/images/projects/nexus-dashboard.png",
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth.js",
      "Redis",
      "Tailwind CSS",
      "Recharts",
      "Vercel",
      "GitHub Actions",
    ],
    liveUrl: "https://nexus-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/hitarththesia/nexus-dashboard",
    featured: true,
    status: "live",
    year: 2024,
    category: "fullstack",
    highlights: [
      "Implemented row-level security in PostgreSQL to enforce zero-trust multi-tenant data isolation without any application-level filtering",
      "Designed a WebSocket broadcast layer backed by Redis pub/sub, enabling real-time chart updates across horizontally scaled instances",
      "Achieved sub-100ms server response times on the analytics endpoints by combining Prisma query optimisation with Next.js partial pre-rendering",
      "Shipped with a GitHub Actions pipeline that enforces TypeScript strict mode, ESLint, unit tests, and Lighthouse CI ≥ 90 on every PR",
    ],
  },

  // ── 2. E-commerce REST API ───────────────────────────────
  {
    slug: "cartforge-api",
    title: "CartForge API",
    tagline: "Production-ready e-commerce API with Stripe payment orchestration",
    description:
      "CartForge is a RESTful API built with Node.js and Express that powers the core commerce operations — product catalogue, cart state, orders, and Stripe Checkout sessions — for a headless storefront. " +
      "It exposes a clean, versioned API contract documented with OpenAPI 3.0 and includes webhook handling for asynchronous payment confirmation.",
    coverImage: "/images/projects/cartforge-api.png",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Stripe",
      "JWT",
      "Zod",
      "Docker",
      "Railway",
    ],
    githubUrl: "https://github.com/hitarththesia/cartforge-api",
    featured: false,
    status: "live",
    year: 2024,
    category: "backend",
    highlights: [
      "Engineered idempotent Stripe webhook processing with event deduplication via MongoDB unique indexes, eliminating double-charge edge cases",
      "Implemented a layered Zod validation pipeline that catches malformed payloads at the route boundary before any business logic executes",
      "Designed a JWT refresh-token rotation scheme with Redis-backed token revocation for immediate session invalidation on logout",
      "Containerised the entire stack with Docker Compose so local development exactly mirrors the production Railway deployment",
    ],
  },

  // ── 3. Real-time Chat Application ───────────────────────
  {
    slug: "pingroom",
    title: "PingRoom",
    tagline: "Real-time group chat with typing indicators and message persistence",
    description:
      "PingRoom is a full-stack chat application where users can create rooms, exchange messages in real-time, and see live typing indicators — all with full message history persisted in MongoDB. " +
      "The WebSocket layer is built on Socket.IO with a Redis adapter for multi-process support, and the frontend uses optimistic UI updates to keep perceived latency near zero.",
    coverImage: "/images/projects/pingroom.png",
    stack: [
      "Next.js 14",
      "Socket.IO",
      "Redis",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Zustand",
      "TypeScript",
    ],
    githubUrl: "https://github.com/hitarththesia/pingroom",
    liveUrl: "https://pingroom.vercel.app",
    featured: false,
    status: "live",
    year: 2023,
    category: "fullstack",
    highlights: [
      "Built a Socket.IO event architecture backed by the Redis adapter, enabling seamless horizontal scaling without sticky-session constraints",
      "Implemented optimistic UI updates with Zustand so messages appear instantly while the server acknowledgement propagates in the background",
      "Designed an efficient MongoDB cursor-based pagination strategy for chat history that avoids the skip-offset N+1 query anti-pattern",
      "Delivered typing-indicator broadcasting with a debounced client-side emission and a server-side TTL cleanup to prevent ghost indicators",
    ],
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
