'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface ActivityState {
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

interface PresenceContextType {
  data: ActivityState | null;
  timeText: string;
  hasError: boolean;
  mounted: boolean;
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export function PresenceProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ActivityState | null>(null);
  const [timeText, setTimeText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Fetch initial activity data and set up interval
  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await fetch('/api/activity');
        if (res.ok) {
          const json: ActivityState = await res.json();
          setData(json);
          setTimeText(json.localTime);
          setHasError(false);
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error('Failed to fetch presence status: ', err);
        setHasError(true);
      }
    }

    fetchActivity();
    const interval = setInterval(fetchActivity, 15000);
    return () => clearInterval(interval);
  }, []);

  // Sync clock locally every second
  useEffect(() => {
    if (!data) return;

    const startLocal = new Date();
    const match = data.localTime.match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return;

    let serverHours = parseInt(match[1], 10);
    const serverMinutes = parseInt(match[2], 10);
    const serverSeconds = parseInt(match[3], 10);
    const isPM = match[4].toUpperCase() === 'PM';

    if (isPM && serverHours < 12) serverHours += 12;
    if (!isPM && serverHours === 12) serverHours = 0;

    const serverDate = new Date();
    serverDate.setHours(serverHours, serverMinutes, serverSeconds);

    if (timerRef.current) clearInterval(timerRef.current);

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
  }, [data]);

  return (
    <PresenceContext.Provider value={{ data, timeText, hasError, mounted }}>
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresence() {
  const context = useContext(PresenceContext);
  if (context === undefined) {
    throw new Error('usePresence must be used within a PresenceProvider');
  }
  return context;
}
