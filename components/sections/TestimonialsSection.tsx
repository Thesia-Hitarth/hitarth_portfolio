/**
 * components/sections/TestimonialsSection.tsx
 * ─────────────────────────────────────────────────────────
 * Testimonials Section.
 * Returns null if the testimonials array is empty.
 * ─────────────────────────────────────────────────────────
 */

import type { ReactElement } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { testimonials } from '@/data/testimonials';
import { LinkedinIcon } from '@/components/ui/BrandIcons';

export function TestimonialsSection(): ReactElement | null {
  // Hide section completely when empty
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 lg:py-32 bg-muted/5 border-t border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="testimonials-heading"
          label="09 / Testimonials"
          title="What people say"
          align="center"
        />

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((t) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={t.id}
                className="relative bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-primary/30 transition-all duration-300 group"
              >
                {/* Large floating quote mark background */}
                <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10 shrink-0 select-none pointer-events-none" />

                {/* Quote Text */}
                <blockquote className="text-muted-foreground leading-relaxed italic text-sm md:text-base pr-4">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                {/* Author Footer */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar initial circle or Next Image */}
                    {t.avatar ? (
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                        {initials}
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {t.role} at <span className="font-semibold text-foreground">{t.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* LinkedIn Connect Button */}
                  {t.linkedinUrl && (
                    <a
                      href={t.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`${t.name} LinkedIn Profile`}
                    >
                      <LinkedinIcon size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
