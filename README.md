# Hitarth Thesia — Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

A world-class Software Developer portfolio built with Next.js 15 App Router, TypeScript (strict mode), Tailwind CSS v4, and next-themes. Every piece of content lives in the `data/` directory — no hardcoded strings in components.

---

## ✨ Tech Stack

| Layer       | Technology                                  |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 15 (App Router, RSC by default)     |
| Language    | TypeScript 5 — strict mode                  |
| Styling     | Tailwind CSS v4                             |
| Themes      | next-themes (system / dark / light)         |
| Animations  | Framer Motion (Phase 2+)                    |
| Validation  | Zod                                         |
| Package Mgr | npm (switch to pnpm for production)         |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install          # or: pnpm install

# 2. Copy environment variables
cp .env.local.example .env.local

# 3. Start the development server
npm run dev          # or: pnpm dev

# 4. Open http://localhost:3000
```

> The dev server uses Turbopack by default for fast HMR.

---

## 📁 Folder Structure

```
hitarth_portfolio/
├── app/
│   ├── layout.tsx               ← Root layout, fonts, ThemeProvider, metadata
│   ├── page.tsx                 ← Homepage (assembles all sections)
│   ├── globals.css              ← Tailwind base + CSS custom properties
│   ├── projects/[slug]/page.tsx ← Statically generated project detail pages
│   ├── blog/
│   │   ├── page.tsx             ← Blog listing
│   │   └── [slug]/page.tsx      ← Blog post (MDX in Phase 4)
│   └── api/contact/route.ts     ← Contact form API (Resend in Phase 4)
│
├── components/
│   ├── layout/                  ← Navbar, Footer, ThemeProvider
│   └── sections/                ← One component per homepage section
│
├── data/                        ← ← ← ALL CONTENT LIVES HERE
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   └── testimonials.ts
│
├── lib/
│   ├── utils.ts                 ← cn(), formatDate(), getDuration()
│   ├── metadata.ts              ← generatePageMetadata() helper
│   └── types.ts                 ← All shared TypeScript interfaces
│
├── config/
│   └── site.ts                  ← ← ← EDIT THIS TO PERSONALISE THE SITE
│
├── hooks/
│   └── use-active-section.ts    ← Scroll-spy hook (wired in Phase 2)
│
└── content/
    └── blog/                    ← MDX blog posts (Phase 4)
```

---

## ✏️ How to Update Content

All content is data-driven. Edit the relevant file in `data/` and the site updates automatically — no touching components.

### How to add a new project

1. Open [`data/projects.ts`](./data/projects.ts)
2. Add a new object to the `projects` array following the `Project` interface
3. Drop the cover image in `public/images/projects/<your-slug>.png`
4. Set `featured: true` to include it in the homepage spotlight

```typescript
{
  slug: "my-new-project",
  title: "My New Project",
  tagline: "One-line description for the card",
  description: "2–3 sentence overview for the detail page.",
  coverImage: "/images/projects/my-new-project.png",
  stack: ["Next.js", "TypeScript", "PostgreSQL"],
  featured: true,
  status: "live",
  year: 2025,
  category: "fullstack",
  highlights: [
    "Built X which reduced latency by Y%",
    "Implemented Z pattern to solve W problem",
  ],
}
```

### How to update skills

Edit [`data/skills.ts`](./data/skills.ts) — add or remove `Skill` objects inside any `SkillCategory`. Proficiency levels: `"learning"` | `"comfortable"` | `"proficient"` | `"expert"`.

### How to update experience

Edit [`data/experience.ts`](./data/experience.ts) — add an `Experience` object. Keep bullets impact-focused: _"Built X that resulted in Y."_

### How to write a blog post (Phase 4)

1. Create an MDX file in `content/blog/<slug>.mdx`
2. Add YAML frontmatter: `title`, `date`, `excerpt`, `tags`, `published`
3. The `/blog/[slug]` route will automatically pick it up

---

## 🌍 Environment Variables

| Variable                  | Required | Description                             |
| ------------------------- | -------- | --------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Yes      | Canonical URL (used for sitemap / OG)   |
| `RESEND_API_KEY`          | Phase 4  | Email provider for contact form         |
| `NEXT_PUBLIC_GA_ID`       | Optional | Google Analytics 4 Measurement ID       |

Copy `.env.local.example` to `.env.local` and fill in the values.

---

## 🚢 Deployment

### One-click Vercel deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hitarththesia/hitarth_portfolio)

### Manual steps

1. Push your fork to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables in the Vercel dashboard
4. Deploy — every push to `main` triggers an automatic deployment

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
