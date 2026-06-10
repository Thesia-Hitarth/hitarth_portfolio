/**
 * components/sections/ContactSection.tsx
 * ─────────────────────────────────────────────────────────
 * Contact section shell — Phase 1.
 * Form submission wired to /api/contact in Phase 4.
 * ─────────────────────────────────────────────────────────
 */

import { siteConfig } from '@/config/site';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-muted/30 px-6 py-24"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get In Touch
        </h2>
        <div className="mx-auto h-1 w-16 rounded-full bg-primary mb-6" />

        <p className="mb-8 text-muted-foreground">
          Whether you have a project in mind, a role to fill, or just want to talk
          tech — my inbox is always open. I&apos;ll get back to you within 24 hours.
        </p>

        {/* Direct email CTA */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          id="contact-email-btn"
        >
          Say hello →
        </a>

        {/* Social links */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          {siteConfig.social.twitter && (
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter / X
            </a>
          )}
        </div>

        {/* TODO Phase 4: Replace with a full contact form that posts to /api/contact
            The form should include name, email, message fields, and Zod validation. */}
      </div>
    </section>
  );
}
