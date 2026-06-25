/*
  TODO — complete before going live:

  1. Verify LinkedIn URL slug and update social.linkedin
  2. Drop your actual resume PDF at /public/resume.pdf
  3. Add real project screenshots to /public/images/projects/
     Filenames: daily-dose.png, ecommerce.png, querious.png
     Recommended size: 1200×675px (16:9), under 200KB each
  4. Add real liveUrl and githubUrl to every project in
     data/projects.ts
  5. Fill the "Currently exploring" skills in data/skills.ts
     with technologies you are genuinely learning right now
  6. Once you have real testimonials, populate
     data/testimonials.ts
  7. Replace /public/og-image.png with a real OG image
     (1200×630px) — use a tool like Figma or og-image.vercel.app
  8. Add company logo images if available:
     /public/images/companies/codage.png
     /public/images/companies/zikasha.png
     /public/images/companies/charusat.png
*/

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
   title: "Software Developer",

   /** Punchy one-liner shown in the hero section */
   tagline: "I build fast, production-ready web products.",

   /** 2-sentence bio used as SEO meta description */
   description:
      "Software Developer with a track record of delivering 90+ Lighthouse scores and 45% fewer re-renders. " +
      "Skilled across both frontend and backend, from custom React components to scalable REST APIs and database design.",

   /** Canonical production URL — update before deploying */
   url: "https://hitarththesia.vercel.app/",

   /** Path to Open Graph image inside /public */
   ogImage: "/og-image.png",

   /** Primary contact e-mail */
   email: "hitarththesia123@gmail.com",

   /** Physical / time-zone location */
   location: "Ahmedabad, Gujarat, India",

   /** When true, an "Open to work" badge appears in the hero */
   openToWork: true,

   /** Path to downloadable résumé inside /public */
   resumeUrl: "/Resume_Thesia_Hitarth.pdf",

   /** Social media handles / profile URLs */
   social: {
      github: "https://github.com/Thesia-Hitarth",
      linkedin: "https://www.linkedin.com/in/hitarth-thesia-2043b0170/",
      twitter: "" as string,
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
      { label: "GitHub", href: "#github" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
   ] as Array<{ label: string; href: string }>,
} as const;

export type SiteConfig = typeof siteConfig;
