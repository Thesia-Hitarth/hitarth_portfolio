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

  // Fallback if no Spotify data found/configured
  if (!spotifyData) {
    spotifyData = {
      isPlaying: false,
      title: 'Not playing',
      artist: 'Spotify Offline',
      albumArt: '',
      album: '',
      songUrl: '',
    };
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
