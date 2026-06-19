/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

/**
 * app/api/activity/route.ts
 * ─────────────────────────────────────────────────────────
 * Dynamic developer activity and presence API route.
 * Returns local time, WakaTime/coding simulation, and Spotify
 * player status (real integration if env variables set, fallback
 * to realistic mock status otherwise).
 * ─────────────────────────────────────────────────────────
 */

export const dynamic = 'force-dynamic';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

// Curated list of mock tracks for demo/fallback purposes
const FALLBACK_TRACKS = [
  { title: 'Intro', artist: 'The xx', albumArt: 'https://i.scdn.co/image/ab67616d0000b273b4b5c777d56e72c84ccdbd47', isPlaying: true },
  { title: 'Starboy', artist: 'The Weeknd', albumArt: 'https://i.scdn.co/image/ab67616d0000b2734718dec6954e1105cc08bc6a', isPlaying: true },
  { title: 'Sweater Weather', artist: 'The Neighbourhood', albumArt: 'https://i.scdn.co/image/ab67616d0000b2733d73507d726b1580ee4f7c1b', isPlaying: true },
  { title: 'Stressed Out', artist: 'Twenty One Pilots', albumArt: 'https://i.scdn.co/image/ab67616d0000b27341e3ed9fb5390c5aa8417fb7', isPlaying: true },
];

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.access_token as string;
  } catch (err) {
    console.error('[spotify] Failed to refresh token: ', err);
    return null;
  }
}

async function fetchRealSpotifyData(accessToken: string) {
  try {
    const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const song = await response.json();
    if (!song.item) {
      return null;
    }

    return {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((art: any) => art.name).join(', '),
      album: song.item.album.name,
      albumArt: song.item.album.images[0]?.url || '',
      songUrl: song.item.external_urls.spotify,
    };
  } catch (err) {
    console.error('[spotify] Error fetching current track: ', err);
    return null;
  }
}

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

  // 3. Spotify Now Playing Integration
  let spotifyData = null;
  const accessToken = await getSpotifyAccessToken();

  if (accessToken) {
    spotifyData = await fetchRealSpotifyData(accessToken);
  }

  // Fallback to simulated activity if no Spotify data found/configured
  if (!spotifyData) {
    // Only simulate listening during waking/active hours (8 AM to Midnight)
    const isWakingHours = hourInKolkata >= 8 && hourInKolkata < 24;
    if (isWakingHours) {
      // Pick a track based on the current minute to keep it stable but dynamic
      const trackIndex = now.getMinutes() % FALLBACK_TRACKS.length;
      spotifyData = {
        ...FALLBACK_TRACKS[trackIndex],
        album: 'Featured Collection',
        songUrl: 'https://open.spotify.com',
      };
    } else {
      spotifyData = {
        isPlaying: false,
        title: 'Not playing',
        artist: 'Spotify Offline',
        albumArt: '',
        album: '',
        songUrl: '',
      };
    }
  }

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
