'use client';

import Link from 'next/link';
import { ArrowLeft, Printer, Mail, MapPin, Globe } from 'lucide-react';
import type { ReactElement } from 'react';
import { experiences } from '@/data/experience';
import { siteConfig } from '@/config/site';
import { skillCategories } from '@/data/skills';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

export default function ResumePage(): ReactElement {
  const handlePrint = (): void => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const workItems = experiences.filter((e) => e.type === 'work');
  const educationItems = experiences.filter((e) => e.type === 'education');

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
      {/* Action panel at the top (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-3 py-1.5 border border-border bg-card"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-4 py-2 shadow-sm"
        >
          <Printer size={16} />
          Print Resume
        </button>
      </div>

      {/* Main Resume Sheet */}
      <article className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-md print:shadow-none print:border-none print:bg-white print:p-0 print:mx-0 print:max-w-none">
        
        {/* Header Block */}
        <header className="border-b border-border pb-8 print:pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground print:text-black print:text-3xl">
              {siteConfig.name}
            </h1>
            <p className="text-lg font-medium text-primary mt-1 print:text-zinc-700">
              {siteConfig.title}
            </p>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed print:text-zinc-600 print:text-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground print:text-zinc-700 print:text-xs shrink-0">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary print:text-black" />
              <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary print:text-black" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <GithubIcon size={14} className="text-primary print:text-black" />
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github.com/Thesia-Hitarth
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon size={14} className="text-primary print:text-black" />
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/hitarth-thesia
              </a>
            </div>
          </div>
        </header>

        {/* Resume Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 print:mt-6 print:gap-6">
          
          {/* Main Experience Column */}
          <section className="md:col-span-2 space-y-8 print:space-y-6">
            
            {/* Professional Experience Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Experience
              </h2>

              <div className="space-y-6 print:space-y-4">
                {workItems.map((job) => (
                  <div key={job.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-foreground print:text-black print:text-sm">
                          {job.role}
                        </h3>
                        <p className="text-sm font-semibold text-primary print:text-zinc-700 print:text-xs">
                          {job.company}
                        </p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground print:text-zinc-500 font-mono">
                        <p>{job.startDate} — {job.endDate}</p>
                        <p className="capitalize">{job.locationType}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed print:text-zinc-600 print:text-[11px]">
                      {job.description}
                    </p>

                    <ul className="list-disc list-outside ml-4 text-xs text-muted-foreground space-y-1.5 print:text-zinc-600 print:text-[10px]" role="list">
                      {job.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Education
              </h2>

              <div className="space-y-4">
                {educationItems.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground print:text-black print:text-sm">
                        {edu.role}
                      </h3>
                      <p className="text-sm font-semibold text-primary print:text-zinc-700 print:text-xs">
                        {edu.company}
                      </p>
                      <p className="text-xs text-muted-foreground print:text-zinc-500 print:text-[10px]">
                        CGPA: 7.50 / 10
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground print:text-zinc-500 font-mono">
                      <p>{edu.startDate} — {edu.endDate}</p>
                      <p>{edu.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar Skills/Tech Column */}
          <aside className="md:col-span-1 space-y-8 print:space-y-6">
            
            {/* Skill Sets */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Technical Skills
              </h2>

              <div className="space-y-4 print:space-y-3">
                {skillCategories.map((cat) => (
                  <div key={cat.name} className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase text-primary tracking-wide print:text-black print:text-[10px]">
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 print:gap-1">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center rounded bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground font-medium print:bg-transparent print:border print:border-zinc-300 print:text-black print:text-[9px]"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Print Note */}
            <div className="rounded-xl border border-dashed border-border p-4 bg-muted/30 print:hidden text-center">
              <Globe size={18} className="mx-auto text-primary mb-2" />
              <h4 className="text-xs font-bold text-foreground">Interactive Web Version</h4>
              <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                Scan or click to view project case studies, code repositories, and dynamic API states.
              </p>
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-semibold text-primary hover:underline"
              >
                hitarththesia.vercel.app
              </a>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
