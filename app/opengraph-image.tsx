import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Fetch fonts
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp5GP12t_v3T.woff')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%)',
          backgroundSize: '40px 40px',
          padding: '80px',
          fontFamily: 'Inter',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div
            style={{
              height: '16px',
              width: '16px',
              borderRadius: '50%',
              backgroundColor: '#6366f1',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: '20px', fontWeight: 600, letterSpacing: '0.05em' }}>
            PORTFOLIO
          </span>
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {siteConfig.name}
        </h1>

        <p
          style={{
            fontSize: '32px',
            color: '#6366f1',
            margin: '12px 0 24px 0',
            fontWeight: 600,
          }}
        >
          {siteConfig.title}
        </p>

        <p
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            margin: 0,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </p>

        <div style={{ display: 'flex', marginTop: 'auto', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#71717a', fontSize: '16px', fontWeight: 500 }}>
            {siteConfig.url.replace('https://', '').replace(/\/$/, '')}
          </span>
          <span style={{ color: '#71717a', fontSize: '16px', fontWeight: 500 }}>
            {siteConfig.location}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
