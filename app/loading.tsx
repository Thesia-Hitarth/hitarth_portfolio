'use client';

import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

export default function Loading(): ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 py-24 select-none relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm text-center">
        {/* Animated Custom Loader */}
        <div className="relative h-16 w-16">
          {/* Inner pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-2 rounded-xl bg-primary/20"
          />

          {/* Spinning borders */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="h-full w-full rounded-2xl border-[3px] border-primary/10 border-t-primary"
          />
        </div>

        {/* Text */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground font-mono uppercase tracking-widest animate-pulse">
            Loading...
          </p>
          <p className="text-xs text-muted-foreground">
            Assembling components & fetching data
          </p>
        </div>
      </div>
    </div>
  );
}
