'use client';

/**
 * components/blog/ShareButtons.tsx
 */

import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TwitterIcon } from '@/components/ui/BrandIcons';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps): ReactElement {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl || `${window.location.origin}/blog/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Check out this article: "${title}" by Hitarth Thesia`
  )}&url=${encodeURIComponent(currentUrl || `https://hitarththesia.vercel.app/blog/${slug}`)}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Twitter Share */}
      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all cursor-pointer select-none',
          'hover:bg-muted hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-primary'
        )}
      >
        <TwitterIcon size={13} className="text-sky-500 fill-sky-500" />
        Share on Twitter
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground transition-all cursor-pointer select-none',
          'hover:bg-muted hover:border-border-hover focus:outline-none focus:ring-2 focus:ring-primary',
          copied && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
        )}
      >
        {copied ? (
          <>
            <Check size={13} />
            Link Copied!
          </>
        ) : (
          <>
            <LinkIcon size={13} />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
