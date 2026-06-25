/**
 * app/layout.tsx
 * ─────────────────────────────────────────────────────────
 * Root layout — new typography, LoaderProvider, CustomCursor,
 * Loader. Dark-mode only. All existing metadata preserved.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Syne, Cormorant_Garamond } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { getAbsoluteUrl } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { LoaderProvider } from '@/providers/LoaderProvider';
import { Loader } from '@/components/ui/Loader';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

// ── Google Fonts ────────────────────────────────────────

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['italic'],
  variable: '--font-editorial',
  display: 'swap',
});

// ── Root Metadata ───────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name} — ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    'Software Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.social.twitter
      ? `@${siteConfig.social.twitter.split('/').pop()}`
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: getAbsoluteUrl(''),
  },
};

// ── Root Layout ─────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} ${cormorant.variable}`}
    >
      <body className="noise">
        <LoaderProvider>
          {/* Page loader overlay */}
          <Loader />

          {/* Custom cursor (portal, disabled on touch) */}
          <CustomCursor />

          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
        </LoaderProvider>
      </body>
    </html>
  );
}
