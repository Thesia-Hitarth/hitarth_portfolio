'use client';

/**
 * components/sections/HeroSection.tsx
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { GradientText } from '@/components/ui/GradientText';
import { fadeInUp, fadeIn, floatVariants } from '@/lib/animations';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { CanvasBackground } from '@/components/ui/CanvasBackground';

const [firstName, ...restNameParts] = siteConfig.name.split(' ');
const restName = restNameParts.join(' ');

export function HeroSection(): ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewWork = (): void => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Interactive canvas particles */}
      <CanvasBackground />
      {/* Radial fade overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, var(--background) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">

            {/* 1. Availability badge */}
            {siteConfig.openToWork && (
              <motion.div
                variants={prefersReduced ? undefined : fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Available for work
                </span>
              </motion.div>
            )}

            {/* 2. Name */}
            <motion.div
              variants={prefersReduced ? undefined : fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <h1
                id="hero-heading"
                className="text-5xl font-bold tracking-tight leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl"
              >
                <GradientText>{firstName}</GradientText>
                {restName && <span className="text-foreground"> {restName}</span>}
              </h1>
            </motion.div>

            {/* 3. Title with blinking cursor */}
            <motion.div
              variants={prefersReduced ? undefined : fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl font-light text-muted-foreground sm:text-3xl md:text-4xl flex items-center gap-1">
                {siteConfig.title}
                <span
                  aria-hidden="true"
                  className="inline-block w-0.5 h-8 bg-primary ml-1 animate-[blink_1s_step-end_infinite]"
                />
              </p>
            </motion.div>

            {/* 4. Tagline */}
            <motion.p
              variants={prefersReduced ? undefined : fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {siteConfig.tagline}
            </motion.p>

            {/* 5. CTA Buttons */}
            <motion.div
              variants={prefersReduced ? undefined : fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={handleViewWork}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View my work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <FileText size={16} />
                Resume
              </Link>

              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Terminal code card */}
          <motion.div
            variants={prefersReduced ? undefined : fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <motion.div
              variants={prefersReduced ? undefined : floatVariants}
              animate={prefersReduced ? undefined : 'animate'}
              className="relative rounded-xl border border-primary/10 dark:border-zinc-800 bg-primary/[0.03] dark:bg-zinc-950/60 backdrop-blur-md shadow-2xl overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-primary/10 dark:border-zinc-800/60 bg-primary/[0.05] dark:bg-zinc-900/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-3 rounded-md border border-primary/10 dark:border-zinc-700 bg-primary/[0.02] dark:bg-zinc-800 px-3 py-0.5 text-xs font-semibold font-mono text-primary dark:text-zinc-400">
                  developer.ts
                </span>
              </div>

              {/* Code */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-violet-600 dark:text-violet-400">const</span>{' '}
                  <span className="text-sky-600 dark:text-sky-400">developer</span>{' '}
                  <span className="text-muted-foreground dark:text-zinc-500">= {'{'}</span>
                </p>
                <div className="ml-4 space-y-1">
                  <CodeLine k="name" v={`"${siteConfig.name}"`} vClass="text-emerald-600 dark:text-emerald-400" />
                  <CodeLine k="role" v={`"${siteConfig.title}"`} vClass="text-emerald-600 dark:text-emerald-400" />
                  <p>
                    <span className="text-sky-600 dark:text-sky-400">  stack</span>
                    <span className="text-muted-foreground dark:text-zinc-500">: [</span>
                    {['Next.js', 'TypeScript', 'Node.js'].map((t, i, arr) => (
                      <span key={t}>
                        <span className="text-emerald-600 dark:text-emerald-400">&quot;{t}&quot;</span>
                        {i < arr.length - 1 && <span className="text-muted-foreground dark:text-zinc-500">, </span>}
                      </span>
                    ))}
                    <span className="text-muted-foreground dark:text-zinc-500">],</span>
                  </p>
                  <CodeLine k="status" v='"open_to_work"' vClass="text-amber-600 dark:text-amber-400" />
                  <CodeLine k="location" v={`"${siteConfig.location}"`} vClass="text-emerald-600 dark:text-emerald-400" />
                  <CodeLine k="passion" v='"Building products people love"' vClass="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-muted-foreground dark:text-zinc-500">{'}'}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Scroll to explore
            </p>
            <ChevronDown size={20} className="text-muted-foreground animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CodeLine({ k, v, vClass }: { k: string; v: string; vClass: string }): ReactElement {
  return (
    <p>
      <span className="text-sky-600 dark:text-sky-400">  {k}</span>
      <span className="text-muted-foreground dark:text-zinc-500">: </span>
      <span className={vClass}>{v}</span>
      <span className="text-muted-foreground dark:text-zinc-500">,</span>
    </p>
  );
}
