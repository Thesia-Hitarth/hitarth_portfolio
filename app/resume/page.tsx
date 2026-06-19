'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactElement } from 'react';
import { resumeData } from '@/data/resume';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

export default function ResumePage(): ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-16 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
      {/* Action panel at the top (hidden in print) */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <a
          href="/Resume_Thesia_Hitarth.pdf"
          download="Resume_Thesia_Hitarth.pdf"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-4 py-2 shadow-sm"
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>

      {/* Main Resume Sheet */}
      <article className="max-w-4xl mx-auto print:shadow-none print:border-none print:bg-white print:p-0 print:mx-0 print:max-w-none">
        
        {/* Header Block */}
        <header className="border-b border-border pb-8 print:pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground print:text-black print:text-3xl">
              {resumeData.personal.name}
            </h1>
            <p className="text-lg font-medium text-primary mt-1 print:text-zinc-700">
              {resumeData.personal.title}
            </p>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed print:text-zinc-600 print:text-xs">
              {resumeData.personal.summary}
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground print:text-zinc-700 print:text-xs shrink-0">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-primary print:text-black" />
              <a href={`tel:${resumeData.personal.phone}`} className="hover:underline">
                {resumeData.personal.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary print:text-black" />
              <a href={`mailto:${resumeData.personal.email}`} className="hover:underline">
                {resumeData.personal.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkedinIcon size={14} className="text-primary print:text-black" />
              <a
                href={resumeData.personal.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {resumeData.personal.linkedin.display}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <GithubIcon size={14} className="text-primary print:text-black" />
              <a
                href={resumeData.personal.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {resumeData.personal.github.display}
              </a>
            </div>
          </div>
        </header>

        {/* Resume Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 print:mt-6 print:gap-6">
          
          {/* Main Experience & Projects Column */}
          <section className="md:col-span-2 space-y-8 print:space-y-6">
            
            {/* Professional Experience Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Experience
              </h2>

              <div className="space-y-6 print:space-y-4">
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="space-y-2">
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
                        <p>{job.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-2">
                      {job.techStack.map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground font-medium border border-border/30">
                          {tech}
                        </span>
                      ))}
                    </div>

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

            {/* Projects Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Projects
              </h2>

              <div className="space-y-6 print:space-y-4">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-foreground print:text-black print:text-sm">
                          {project.title} — <span className="text-xs font-normal text-muted-foreground">{project.subtitle}</span>
                        </h3>
                      </div>
                      <div className="text-right text-xs text-muted-foreground print:text-zinc-500 font-mono">
                        <p>{project.year}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="inline-flex items-center rounded bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground font-medium border border-border/30">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ul className="list-disc list-outside ml-4 text-xs text-muted-foreground space-y-1.5 print:text-zinc-600 print:text-[10px]" role="list">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sidebar Skills & Education Column */}
          <aside className="md:col-span-1 space-y-8 print:space-y-6">
            
            {/* Technical Skills Section */}
            <div>
              <h2 className="text-xl font-bold text-foreground border-b border-border pb-2 mb-4 print:text-black print:text-sm print:mb-3 uppercase tracking-wider font-mono">
                Technical Skills
              </h2>

              <div className="space-y-4 print:space-y-3">
                {resumeData.skills.map((cat) => (
                  <div key={cat.category} className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase text-primary tracking-wide print:text-black print:text-[10px]">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed print:text-zinc-700 print:text-[11px]">
                      {cat.items}
                    </p>
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
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-bold text-foreground text-sm print:text-black print:text-xs leading-snug">
                      {edu.institution}
                    </h3>
                    <p className="text-xs font-semibold text-primary print:text-zinc-700 print:text-[10px]">
                      {edu.degree}
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono mt-1">
                      <span>{edu.timeline}</span>
                      <span>{edu.gpaOrPercentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}
