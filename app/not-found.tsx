'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import type { ReactElement } from 'react';

export default function NotFound(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-24 select-none relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto space-y-8">
        {/* Animated 404 Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative inline-block"
        >
          <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-primary via-indigo-400 to-indigo-600 dark:from-primary dark:via-primary/70 dark:to-indigo-500 select-text">
            404
          </h1>
          <div className="absolute -inset-2 bg-primary/5 blur-xl -z-10 rounded-full" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Page Not Found
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved to a new URL. Check the address bar or return home.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Home size={16} />
            Go back home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
