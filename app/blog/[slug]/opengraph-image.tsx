import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/mdx';
import { siteConfig } from '@/config/site';

export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response('Post Not Found', { status: 404 });
  }

  // Fetch fonts
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp5GP12t_v3T.woff')
  ).then((res) => res.arrayBuffer());

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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
            TECHNICAL BLOG
          </span>
          <span style={{ color: '#71717a', fontSize: '14px', fontWeight: 500 }}>
            {formattedDate} • {post.readingTime}
          </span>
        </div>

        <h1
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 16px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: '22px',
            color: '#a1a1aa',
            margin: '0 0 40px 0',
            maxWidth: '950px',
            lineHeight: 1.4,
          }}
        >
          {post.excerpt}
        </p>

        {/* Tags pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px', maxWidth: '900px' }}>
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#a1a1aa',
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                padding: '4px 10px',
                borderRadius: '6px',
                textTransform: 'capitalize',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: 'auto', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                height: '32px',
                width: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1',
                fontSize: '12px',
                fontWeight: 700,
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(99, 102, 241, 0.2)',
              }}
            >
              HT
            </div>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600 }}>
              {siteConfig.name}
            </span>
          </div>
          
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
