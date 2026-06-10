/**
 * next.config.ts
 * ─────────────────────────────────────────────────────────
 * Production-ready Next.js configuration.
 * TypeScript and ESLint errors break the build (never disabled).
 * ─────────────────────────────────────────────────────────
 */

import type { NextConfig } from 'next';

// ── Bundle analyzer (uncomment to enable) ─────────────
// import bundleAnalyzer from '@next/bundle-analyzer';
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig: NextConfig = {
  // ── Image optimisation ────────────────────────────────
  images: {
    remotePatterns: [
      // GitHub user avatars (for testimonials / about section)
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      // Cloudinary CDN (optional — add if using image CDN)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // ── HTTP Security Headers ─────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Strict CSP — tighten before production launch
          // Allow 'unsafe-inline' for next-themes script injection
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://avatars.githubusercontent.com https://res.cloudinary.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // ── Build quality gates ───────────────────────────────
  // NOTE: In Next.js 16, `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`
  // were removed from next.config. TypeScript errors now always break the build.
  // ESLint is run separately via the ESLint CLI (not next lint).
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js

  // ── Output compression ────────────────────────────────
  compress: true,

  // ── Experimental ─────────────────────────────────────
  experimental: {
    // Opt in to optimised package imports for icon libraries
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

// Wrap with bundle analyzer when ANALYZE=true
// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
