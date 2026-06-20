import { NextResponse } from 'next/server';

/**
 * app/api/activity/route.ts
 * ─────────────────────────────────────────────────────────
 * Dynamic developer activity and presence API route.
 * Returns local time, WakaTime/coding simulation, and a mock
 * Spotify player status displaying curated tracks in rotation.
 * ─────────────────────────────────────────────────────────
 */

export const dynamic = 'force-dynamic';

const MOCK_TRACKS = [
  {
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    albumArt: '/Music.png',
    songUrl: 'https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB',
    isPlaying: true,
  },
  {
    title: 'Sweater Weather',
    artist: 'The Neighbourhood',
    album: 'I Love You.',
    albumArt: '/Music.png',
    songUrl: 'https://open.spotify.com/track/2QjOHCTQ1Jl3zawyYOpxh6',
    isPlaying: true,
  },
  {
    title: 'Stressed Out',
    artist: 'Twenty One Pilots',
    album: 'Blurryface',
    albumArt: '/Music.png',
    songUrl: 'https://open.spotify.com/artist/3YQKmKGau1PzlVlkL1iodx',
    isPlaying: true,
  },
  {
    title: 'Intro',
    artist: 'The xx',
    album: 'xx',
    albumArt: '/Music.png',
    songUrl: 'https://open.spotify.com/track/2usrT8QIbIk9y0NEtQwS4j',
    isPlaying: true,
  },
  {
    title: 'Circles',
    artist: 'Post Malone',
    album: "Hollywood's Bleeding",
    albumArt: '/Music.png',
    songUrl: 'https://open.spotify.com/track/21jGcNKet2qwijlDFuPiPb',
    isPlaying: true,
  }
];

export async function GET() {
  // 1. Calculate local time in Ahmedabad, Gujarat, India (UTC+5:30)
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });

  const hourInKolkata = parseInt(
    now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: 'numeric',
    }),
    10
  );

  // 2. Determine developer status based on time of day (Ahmedabad timezone)
  let statusText = 'Coding';
  let statusCode: 'coding' | 'learning' | 'resting' = 'coding';

  if (hourInKolkata >= 9 && hourInKolkata < 18) {
    statusText = '💻 Building Web Products';
    statusCode = 'coding';
  } else if (hourInKolkata >= 18 && hourInKolkata < 22) {
    statusText = '⚙️ Improving Development Skills';
    statusCode = 'learning';
  } else {
    statusText = '😴 Offline / Rest Mode';
    statusCode = 'resting';
  }

  // 3. Cycle through the mock tracks based on current time (stable but changes every minute)
  const trackIndex = Math.floor(now.getTime() / 60000) % MOCK_TRACKS.length;
  const spotifyData = MOCK_TRACKS[trackIndex];

  return NextResponse.json({
    localTime: timeString,
    location: 'Ahmedabad, India',
    activity: {
      status: statusText,
      code: statusCode,
    },
    spotify: spotifyData,
  });
}
