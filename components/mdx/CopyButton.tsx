'use client';

/**
 * components/mdx/CopyButton.tsx
 */

import { useState } from 'react';
import type { ReactElement } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps): ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'absolute right-3 top-3 z-10 rounded-md border border-zinc-800 bg-zinc-900/80 p-1.5 text-xs text-zinc-400 backdrop-blur-sm transition-all duration-200 cursor-pointer',
        'hover:bg-zinc-800 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-950',
        copied && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
      )}
      aria-label="Copy code block"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}
