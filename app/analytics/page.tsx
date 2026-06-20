'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Download, Eye, MousePointerClick, MessageSquare, Clock, ShieldAlert } from 'lucide-react';
import type { ReactElement } from 'react';

export default function AnalyticsPage(): ReactElement {
  const [latency, setLatency] = useState(42);

  // Simulate network edge latency fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 30);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: 'Total Page Views',
      value: '14,842',
      change: '+12.4%',
      icon: Eye,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'Project Details Clicks',
      value: '1,894',
      change: '+18.2%',
      icon: MousePointerClick,
      color: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      title: 'Resume Downloads',
      value: '342',
      change: '+8.5%',
      icon: Download,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Contact Inquiries',
      value: '24',
      change: '+4.2%',
      icon: MessageSquare,
      color: 'text-amber-500 bg-amber-500/10',
    },
  ];

  const topProjects = [
    { name: 'Developer Taskflows', views: 824, share: '43.5%' },
    { name: 'Querious Developer Q&A', views: 512, share: '27.0%' },
    { name: 'Daily Dose Meal Platform', views: 320, share: '16.9%' },
    { name: 'E-Commerce Shopping Suite', views: 238, share: '12.6%' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <header className="mb-12 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            08 / Public Analytics
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Site Dashboard
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <ShieldAlert size={12} className="shrink-0" />
              Simulated Interactive Data
            </span>
          </div>
          <p className="mt-4 text-base text-muted-foreground">
            A public dashboard tracking portfolio interactions, click analytics, and real-time response latency on the Edge network.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground font-semibold">{stat.title}</span>
                  <div className={`p-2.5 rounded-xl ${stat.color}`}>
                    <Icon size={16} />
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-foreground">{stat.value}</span>
                  <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-500">
                    <TrendingUp size={12} />
                    <span>{stat.change}</span>
                    <span className="text-muted-foreground font-normal ml-1">this month</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Traffic Chart */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Traffic Analysis</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly unique page views</p>
            </div>

            {/* SVG Interactive Line Chart */}
            <div className="h-64 w-full mt-6 relative">
              <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" preserveAspectRatio="none">
                {/* Horizontal guide lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" className="text-border/40" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="currentColor" className="text-border/40" strokeDasharray="4 4" />
                <line x1="0" y1="160" x2="600" y2="160" stroke="currentColor" className="text-border/40" strokeDasharray="4 4" />
                <line x1="0" y1="220" x2="600" y2="220" stroke="currentColor" className="text-border/40" />

                {/* Path Gradient area */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,220 Q50,160 100,180 T200,110 T300,140 T400,60 T500,80 T600,40 L600,220 L0,220 Z"
                  fill="url(#chartGrad)"
                />

                {/* Plot line */}
                <path
                  d="M0,220 Q50,160 100,180 T200,110 T300,140 T400,60 T500,80 T600,40"
                  stroke="var(--primary)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="animate-[draw_2s_ease-out]"
                />

                {/* Data Points */}
                <circle cx="100" cy="180" r="5" className="fill-background stroke-[3] stroke-primary" />
                <circle cx="200" cy="110" r="5" className="fill-background stroke-[3] stroke-primary" />
                <circle cx="300" cy="140" r="5" className="fill-background stroke-[3] stroke-primary" />
                <circle cx="400" cy="60" r="5" className="fill-background stroke-[3] stroke-primary" />
                <circle cx="500" cy="80" r="5" className="fill-background stroke-[3] stroke-primary" />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-mono mt-4">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun (Present)</span>
            </div>
          </div>

          {/* Side Panels: Project Views & Real-time Edge Latency */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Top Projects */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-foreground">Top Viewed Projects</h3>
              <div className="divide-y divide-border/60">
                {topProjects.map((proj, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0 text-xs">
                    <span className="font-medium text-foreground truncate max-w-[150px]">{proj.name}</span>
                    <div className="text-right">
                      <span className="font-bold text-foreground">{proj.views}</span>
                      <span className="text-[10px] text-muted-foreground ml-1.5">{proj.share}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Performance Status */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">Response Performance</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Vercel Edge network response speed</p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 animate-pulse">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-foreground font-mono">{latency} ms</span>
                  <span className="text-[10px] text-muted-foreground block leading-none mt-1 font-semibold uppercase tracking-wider text-emerald-500">
                    ● Dynamic status active
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/40 border border-border/40 rounded-xl p-3">
                <ShieldAlert size={14} className="shrink-0 text-primary" />
                <span>Zero system down-times recorded. SSL and CDN cache hits verified.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
