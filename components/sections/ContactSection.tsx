/**
 * components/sections/ContactSection.tsx
 * ─────────────────────────────────────────────────────────
 * Contact section with centered CTA + social links.
 * Phase 4 will add a full form that posts to /api/contact.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import { Mail } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/config/site';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';

export function ContactSection(): ReactElement {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 lg:py-32 bg-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="contact-heading"
          label="07 / Contact"
          title="Get in touch"
          subtitle="Whether you have a project in mind, a role to fill, or just want to talk tech — my inbox is always open."
          align="center"
        />

        <AnimatedSection className="flex flex-col items-center gap-8">
          {/* Email CTA */}
          <a
            href={`mailto:${siteConfig.email}`}
            id="contact-email-btn"
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Mail size={20} />
            {siteConfig.email}
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or find me on</span>
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            {siteConfig.social.twitter && (
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X profile"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <TwitterIcon size={16} />
                Twitter
              </a>
            )}
          </div>

          {/* Response time note */}
          <p className="text-xs text-muted-foreground">
            I typically reply within 24 hours.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
