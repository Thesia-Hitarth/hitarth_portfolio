'use client';

import { motion } from 'framer-motion';
import type { ReactElement } from 'react';

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98], // Premium cubic bezier ease
      }}
    >
      {children}
    </motion.div>
  );
}
