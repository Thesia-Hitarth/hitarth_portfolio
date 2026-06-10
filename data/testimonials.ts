/**
 * data/testimonials.ts
 * ─────────────────────────────────────────────────────────
 * Placeholder testimonials from colleagues and managers.
 * Replace with real quotes before going live.
 * ─────────────────────────────────────────────────────────
 */

import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-anand-mehta",
    name: "Anand Mehta",
    role: "Engineering Manager",
    company: "TechWave Solutions",
    linkedinUrl: "https://linkedin.com/in/anand-mehta",
    content:
      "Hitarth joined as a junior but consistently operated above his level. " +
      "What stands out most is his obsession with correctness — he was the one who flagged our multi-tenant data isolation gap before it became a security incident. " +
      "He doesn't just ship features; he thinks about the system as a whole. He'll grow into a strong technical lead.",
  },
  {
    id: "testimonial-priya-desai",
    name: "Priya Desai",
    role: "Senior Frontend Engineer",
    company: "PixelCraft Studio",
    linkedinUrl: "https://linkedin.com/in/priya-desai-dev",
    content:
      "Working with Hitarth during his internship was genuinely impressive. " +
      "He picked up our design system in the first week and was delivering pixel-accurate Figma implementations faster than some full-time devs. " +
      "His component library work saved the team countless hours on subsequent projects. " +
      "I'd hire him again without hesitation.",
  },
];
