'use client';

/**
 * components/ui/LiveActivity.tsx
 * ─────────────────────────────────────────────────────────
 * Premium glassmorphic widget displaying local timezone clock,
 * current status, and active Spotify now-playing tracking.
 * Collapses to a compact status badge and expands to a rich card.
 * ─────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Music, ChevronUp, ChevronDown } from 'lucide-react';
import type { ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { usePresence } from '@/context/PresenceContext';

export function LiveActivity(): ReactElement {
  const { data, timeText, hasError, mounted } = usePresence();
  const [isExpanded, setIsExpanded] = useState(false);

  if (hasError) {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur-md px-3.5 py-1.5 text-xs text-muted-foreground font-semibold shadow-md select-none">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
        <span>Status offline</span>
      </div>
    );
  }

  if (!mounted || !data) {
    return <div className="fixed bottom-6 right-6 z-40 h-10 w-36 rounded-full border border-border bg-card/60 backdrop-blur-md animate-pulse" />;
  }

  const isListening = !!(data.spotify && data.spotify.isPlaying);
  const isCoding = data.activity.code === 'coding';
  const isLearning = data.activity.code === 'learning';

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans select-none pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // COLLAPSED CAPSULE BADGE
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            onClick={() => setIsExpanded(true)}
            className={cn(
              'flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-md transition-all duration-300',
              'bg-background/80 hover:bg-muted border-border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary',
              isListening ? 'border-emerald-500/20' : 'border-border'
            )}
          >
            {/* Status Pulse Dot */}
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
                  isListening ? 'bg-emerald-400' : isCoding ? 'bg-indigo-400' : 'bg-amber-400'
                )}
              />
              <span
                className={cn(
                  'relative inline-flex rounded-full h-2 w-2',
                  isListening ? 'bg-emerald-500' : isCoding ? 'bg-indigo-500' : 'bg-amber-500'
                )}
              />
            </span>

            {/* Content Preview */}
            <div className="flex items-center gap-1.5 truncate max-w-[200px]">
              {isListening ? (
                <>
                  <Music className="h-3 w-3 text-emerald-500 shrink-0 animate-spin [animation-duration:8s]" />
                  <span className="text-foreground font-bold truncate">
                    {data.spotify?.title}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground truncate">
                  {isCoding ? 'Coding' : isLearning ? 'Learning' : 'Resting'}
                </span>
              )}
            </div>

            <ChevronUp size={14} className="text-muted-foreground ml-1 shrink-0" />
          </motion.button>
        ) : (
          // EXPANDED CARD DIALOGUE
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'w-72 overflow-hidden rounded-2xl border bg-card/90 dark:bg-zinc-950/90 shadow-2xl backdrop-blur-xl transition-all duration-300',
              isListening ? 'border-emerald-500/30' : 'border-border'
            )}
          >
            {/* Header / Toggle button */}
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-emerald-400" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Live Presence
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors"
                aria-label="Collapse live status"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
              {/* Location and clock row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span className="text-xs font-semibold text-foreground">
                    {data.location}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <Clock size={13} className="shrink-0" />
                  <span>{timeText || data.localTime}</span>
                </div>
              </div>

              {/* Current activity block */}
              <div className="rounded-xl bg-muted/40 border border-border/40 p-3 flex items-start gap-3">
                <span className="text-xl shrink-0" role="img" aria-label="Activity Emoji">
                  {isCoding ? '💻' : isLearning ? '📚' : '😴'}
                </span>
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    Current Focus
                  </h4>
                  <p className="text-xs font-semibold text-foreground mt-0.5">
                    {data.activity.status}
                  </p>
                </div>
              </div>

              {/* Spotify listening showcase */}
              {data.spotify && (
                <div className="border-t border-border/60 pt-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Music size={13} className={cn(isListening ? 'text-emerald-500' : 'text-muted-foreground')} />
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                        {isListening ? 'Now Playing' : 'Last Played'}
                      </span>
                    </div>

                    {/* Equalizer animation */}
                    {isListening && (
                      <div className="flex items-end gap-[2px] h-3 pr-1">
                        <span className="w-[2px] bg-emerald-500 rounded-full animate-[equalize_0.8s_ease-in-out_infinite]" />
                        <span className="w-[2px] bg-emerald-500 rounded-full animate-[equalize_1.2s_ease-in-out_infinite_0.2s] h-full" />
                        <span className="w-[2px] bg-emerald-500 rounded-full animate-[equalize_0.9s_ease-in-out_infinite_0.4s]" />
                      </div>
                    )}
                  </div>

                  {data.spotify.songUrl ? (
                    <a
                      href={data.spotify.songUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-3 rounded-xl border border-border/30 bg-card p-2.5 transition-all duration-300 hover:border-emerald-500/20 hover:shadow-sm"
                    >
                      <SpotifyCoverArt art={data.spotify.albumArt} isPlaying={isListening} title={data.spotify.title} />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-xs font-bold text-foreground group-hover:text-emerald-500 transition-colors truncate">
                          {data.spotify.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {data.spotify.artist}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="flex gap-3 rounded-xl border border-border/30 bg-card p-2.5">
                      <SpotifyCoverArt art={data.spotify.albumArt} isPlaying={false} title={data.spotify.title} />
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="text-xs font-bold text-foreground truncate">
                          {data.spotify.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {data.spotify.artist}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

interface SpotifyCoverArtProps {
  art?: string;
  isPlaying: boolean;
  title: string;
}

function SpotifyCoverArt({ art, isPlaying, title }: SpotifyCoverArtProps): ReactElement {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted border border-border/60">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art || "/Music.png"}
        alt={title}
        className={cn(
          'h-full w-full object-cover rounded-lg transition-transform duration-500',
          isPlaying && 'animate-[spin_10s_linear_infinite]'
        )}
      />
      {/* Vinyl record middle pinhole overlay */}
      {isPlaying && (
        <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-black/30 bg-card shadow-inner" />
      )}
    </div>
  );
}
