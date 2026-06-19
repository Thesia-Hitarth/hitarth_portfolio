'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, Music, ArrowUpRight, GraduationCap, Briefcase, Sparkles, FileText, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../../public/Passportsize_Hitarth.png';
import type { ReactElement } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteConfig } from '@/config/site';
import { fadeInUp } from '@/lib/animations';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/BrandIcons';
import { skillCategories } from '@/data/skills';

const STATS = [
  { value: '8+', label: 'Projects built' },
  { value: '10+', label: 'Tech Stack' },
  { value: '12+', label: 'Months exp.' },
];

const BIO_PARAGRAPHS = [
  siteConfig.description,
  "I'm a firm believer that great software is built at the intersection of engineering rigour and product empathy. I care about the developer experience just as much as the end-user experience — because maintainable code is what keeps a product alive long after launch.",
];

interface ActivityState {
  localTime: string;
  location: string;
  activity: {
    status: string;
    code: 'coding' | 'learning' | 'resting';
  };
  spotify?: {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    songUrl: string;
  };
}

export function AboutSection(): ReactElement {
  const prefersReduced = useReducedMotion();
  const [activity, setActivity] = useState<ActivityState | null>(null);
  const [timeText, setTimeText] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch activity status (clocks, focus, spotify)
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/activity');
        if (res.ok) {
          const json: ActivityState = await res.json();
          setActivity(json);
          setTimeText(json.localTime);
        }
      } catch (err) {
        console.error('Bento Clock fetch error:', err);
      }
    }
    fetchActivity();
    const interval = setInterval(fetchActivity, 15000);
    return () => clearInterval(interval);
  }, []);

  // Tick clock locally every second
  useEffect(() => {
    if (!activity) return;

    const startLocal = new Date();
    const match = activity.localTime.match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return;

    let serverHours = parseInt(match[1], 10);
    const serverMinutes = parseInt(match[2], 10);
    const serverSeconds = parseInt(match[3], 10);
    const isPM = match[4].toUpperCase() === 'PM';

    if (isPM && serverHours < 12) serverHours += 12;
    if (!isPM && serverHours === 12) serverHours = 0;

    const serverDate = new Date();
    serverDate.setHours(serverHours, serverMinutes, serverSeconds);

    timerRef.current = setInterval(() => {
      const elapsedMs = new Date().getTime() - startLocal.getTime();
      const currentServerTime = new Date(serverDate.getTime() + elapsedMs);
      
      setTimeText(
        currentServerTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activity]);

  const blockAnimation = prefersReduced ? {} : fadeInUp;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 lg:py-32 bg-muted/10 border-t border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader
          id="about-heading"
          label="02 / About"
          title="About & Presence"
          subtitle="Explore my background, developer focus, and technical stack."
        />

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          
          {/* Block 1: Bio Narrative (Large: Spans 2 cols) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-2 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div className="space-y-4 z-10">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                Engineering Philosophy
              </h3>
              {BIO_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="text-sm md:text-base leading-relaxed text-muted-foreground"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/60 mt-6 z-10">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                >
                  <TwitterIcon size={14} />
                  Twitter
                </a>
              )}
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
          </motion.div>

          {/* Block 2: Profile Photo (Spans 1 col) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-1 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col items-center justify-center shadow-sm relative overflow-hidden"
          >
            <div className="relative w-full aspect-[4/5] max-w-[200px] rounded-xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 to-indigo-500/5 shadow-sm">
              <Image
                src={profilePic}
                alt={`${siteConfig.name} profile`}
                fill
                sizes="200px"
                priority
                className="object-cover transition-transform duration-500 hover:scale-103"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="text-sm font-bold text-foreground leading-tight">{siteConfig.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{siteConfig.title}</p>
            </div>
          </motion.div>

          {/* Block 3: Ahmedabad Clock (Spans 1 col) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-1 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div>
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest block mb-4">
                Local Time
              </span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={14} className="text-primary shrink-0 animate-bounce" />
                <span className="text-xs font-semibold text-foreground">Ahmedabad, India</span>
              </div>
            </div>

            <div className="my-6">
              <div className="text-3xl font-extrabold font-mono text-foreground tracking-tight">
                {timeText || '12:00:00 PM'}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                <Clock size={12} />
                <span>IST Zone (UTC+5:30)</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground bg-muted/40 border border-border/40 rounded-xl p-2.5">
              Ahmedabad coordinates: 23.0225° N, 72.5714° E
            </div>
          </motion.div>

          {/* Block 4: Live Focus & Activity Widget (Spans 1 col) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-1 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div>
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest block mb-4">
                Active Focus
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-foreground">
                  {activity?.activity?.status || '💻 Developing applications'}
                </span>
              </div>
            </div>

            {/* Spotify fallback showcase */}
            <div className="mt-4 pt-4 border-t border-border/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Music size={12} className={activity?.spotify?.isPlaying ? 'text-emerald-500 animate-spin [animation-duration:8s]' : 'text-muted-foreground'} />
                  <span className="font-mono text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
                    {activity?.spotify?.isPlaying ? 'Now Playing' : 'Spotify Status'}
                  </span>
                </div>
              </div>

              {activity?.spotify && (
                <div className="flex items-center gap-2.5 rounded-xl border border-border/30 bg-muted/30 p-2">
                  {activity.spotify.albumArt && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activity.spotify.albumArt}
                      alt="album cover"
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate max-w-[120px]">{activity.spotify.title}</p>
                    <p className="text-[9px] text-muted-foreground truncate max-w-[120px] mt-0.5">{activity.spotify.artist}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Block 5: Core stats counter (Spans 1 col) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-1 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest block">
              Stats Dashboard
            </span>

            <div className="grid grid-cols-3 gap-2 my-auto py-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-primary">{stat.value}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-muted-foreground flex gap-2 items-center bg-muted/40 border border-border/40 rounded-xl p-2.5">
              <Code size={13} className="text-primary shrink-0" />
              <span>Full-Stack MERN, Next.js & REST API profiles active</span>
            </div>
          </motion.div>

          {/* Block 6: Resume PDF and print CTA (Spans 1 col) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-1 bg-gradient-to-br from-primary/10 to-indigo-500/5 rounded-2xl border border-primary/25 p-6 flex flex-col justify-between shadow-sm group cursor-pointer hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="z-10">
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest block mb-4">
                Career Resume
              </span>
              <h4 className="text-base font-bold text-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
                <FileText size={16} />
                Interactive Resume
              </h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Open my digital print-optimized resume page. Perfect for physical PDF generation and sharing.
              </p>
            </div>

            <Link
              href="/resume"
              className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline z-10"
            >
              Open Resume page
              <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
          </motion.div>

          {/* Block 7: Comfort Stack pills (Spans 2 cols) */}
          <motion.div
            variants={blockAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-2 bg-card/65 backdrop-blur-md rounded-2xl border border-border p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <div>
              <span className="font-mono text-[9px] font-bold text-primary uppercase tracking-widest block mb-4">
                Core Technologies
              </span>
              
              <div className="space-y-4">
                {skillCategories.slice(0, 3).map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <span className="text-[10px] font-bold text-foreground/80 uppercase tracking-wide">
                      {cat.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center rounded-full bg-muted/60 border border-border px-2.5 py-0.5 text-xs text-muted-foreground font-medium"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-[10px] text-muted-foreground font-semibold flex items-center gap-1 select-none opacity-50">
              <Sparkles size={11} />
              Verified Stack
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}