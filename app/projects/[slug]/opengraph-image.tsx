import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/data/projects';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';
export const alt = 'Project Detail';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new Response('Project Not Found', { status: 404 });
  }

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
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              padding: '4px 10px',
              borderRadius: '9999px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            {project.category === 'fullstack' ? 'Full-Stack' : project.category}
          </span>
          <span style={{ color: '#71717a', fontSize: '14px', fontWeight: 500 }}>
            {project.year} Release
          </span>
        </div>

        <h1
          style={{
            fontSize: '60px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: '24px',
            color: '#a1a1aa',
            margin: '0 0 32px 0',
            maxWidth: '900px',
            lineHeight: 1.4,
          }}
        >
          {project.tagline}
        </p>

        {/* Tech Stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px', maxWidth: '900px' }}>
          {project.stack.slice(0, 6).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                padding: '6px 12px',
                borderRadius: '8px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: 'auto', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#71717a', fontSize: '16px', fontWeight: 500 }}>
            {siteConfig.name} — Portfolio
          </span>
          <span style={{ color: '#6366f1', fontSize: '16px', fontWeight: 600 }}>
            {siteConfig.url.replace('https://', '').replace(/\/$/, '')}
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
