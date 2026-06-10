'use client';

/**
 * components/sections/AboutSection.tsx
 */

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteConfig } from '@/config/site';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';

const STATS = [
  { value: '10+', label: 'Projects built' },
  { value: '15+', label: 'Technologies' },
  { value: '18+', label: 'Months exp.' },
];

const BIO_PARAGRAPHS = [
  siteConfig.description,
  "I'm a firm believer that great software is built at the intersection of engineering rigour and product empathy. I care about the developer experience just as much as the end-user experience — because maintainable code is what keeps a product alive long after launch.",
  "When I'm not writing code, I'm contributing to open-source projects, reading about distributed systems, or mentoring junior developers in my local tech community. I find the most satisfaction in turning complex, ambiguous problems into simple, elegant solutions.",
];

const INFO_ITEMS = [
  { icon: MapPin, text: siteConfig.location },
  { icon: Briefcase, text: 'Open to Full-time · Onsite / Hybrid / Remote' },
  { icon: GraduationCap, text: 'B.Tech · Computer Science' },
];

const INITIALS = siteConfig.name
  .split(' ')
  .map((w) => w[0])
  .join('')
  .toUpperCase()
  .slice(0, 2);

export function AboutSection(): ReactElement {
  const prefersReduced = useReducedMotion();

  const leftProps = prefersReduced
    ? {}
    : {
        variants: slideInLeft,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
      };

  const rightProps = prefersReduced
    ? {}
    : {
        variants: slideInRight,
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 lg:py-32 bg-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="about-heading"
          label="02 / About"
          title="A bit about me"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">

          {/* LEFT COLUMN */}
          <motion.div {...leftProps} className="lg:col-span-3 flex flex-col gap-6">
            <div className="space-y-4">
              {BIO_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-base md:text-lg leading-relaxed text-foreground'
                      : 'text-base leading-relaxed text-muted-foreground'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-stretch gap-0 pt-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col px-6 first:pl-0 ${
                    i < STATS.length - 1 ? 'border-r border-border' : ''
                  }`}
                >
                  <span className="text-3xl font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  <TwitterIcon size={16} />
                  Twitter / X
                </a>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div {...rightProps} className="lg:col-span-2 flex flex-col gap-5">
            {/* Avatar with decorative frame */}
            <div className="relative mx-auto w-full max-w-xs">
              <div
                aria-hidden="true"
                className="absolute -top-2 -left-2 right-2 bottom-2 rounded-2xl border-2 border-primary/30 z-0"
              />
              <div className="relative z-10 aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border overflow-hidden">
                <Image
                  src="/Passportsize_Hitarth.png"
                  alt={`${siteConfig.name} profile photo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-xl border border-border bg-muted/60 p-4 space-y-3">
              {INFO_ITEMS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={15} className="text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
