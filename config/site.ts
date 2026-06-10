/**
 * config/site.ts
 * ─────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all site configuration.
 * Edit this file to personalise the entire portfolio.
 * ─────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Full legal / display name */
  name: "Hitarth Thesia",

  /** Short professional title shown in browser tab / OG */
  title: "Full-Stack Developer",

  /** Punchy one-liner shown in the hero section */
  tagline: "I build fast, scalable web products that ship.",

  /** 2-sentence bio used as SEO meta description */
  description:
    "Full-stack developer specialising in Next.js, Node.js, and cloud-native architectures. " +
    "I turn complex requirements into elegant, production-ready software with a focus on performance and developer experience.",

  /** Canonical production URL — update before deploying */
  url: "https://hitarththesia.dev",

  /** Path to Open Graph image inside /public */
  ogImage: "/og-image.png",

  /** Primary contact e-mail */
  email: "hello@hitarththesia.dev",

  /** Physical / time-zone location */
  location: "Vadodara, India",

  /** When true, an "Open to work" badge appears in the hero */
  openToWork: true,

  /** Path to downloadable résumé inside /public */
  resumeUrl: "/resume.pdf",

  /** Social media handles / profile URLs */
  social: {
    github: "https://github.com/hitarththesia",
    linkedin: "https://linkedin.com/in/hitarththesia",
    twitter: "https://twitter.com/hitarththesia",
  },

  /**
   * Primary navigation links.
   * hrefs must match the section id attributes in app/page.tsx.
   */
  nav: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ] as Array<{ label: string; href: string }>,
} as const;

export type SiteConfig = typeof siteConfig;
