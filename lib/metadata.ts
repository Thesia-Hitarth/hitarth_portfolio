/**
 * lib/metadata.ts
 * ─────────────────────────────────────────────────────────
 * Reusable helper to generate consistent Next.js Metadata
 * objects across all pages.
 * ─────────────────────────────────────────────────────────
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getAbsoluteUrl } from "@/lib/utils";

interface GeneratePageMetadataParams {
  /** Page-level title — will be suffixed with siteConfig.name */
  title: string;
  /** Page-level description shown in search results and link previews */
  description: string;
  /** Absolute URL or root-relative path to the OG image */
  image?: string;
  /** When true, tells crawlers not to index this page */
  noIndex?: boolean;
  /** Root-relative path for the canonical URL, e.g. "/projects/my-project" */
  path?: string;
}

/**
 * Generates a fully typed Next.js `Metadata` object for a given page.
 *
 * @example
 * export const metadata = generatePageMetadata({
 *   title: "Codebase",
 *   description: "A showcase of my work.",
 *   path: "/projects",
 * });
 */
export function generatePageMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = "",
}: GeneratePageMetadataParams): Metadata {
  const resolvedImage = image ?? siteConfig.ogImage;
  const ogImage = resolvedImage.startsWith("http") ? resolvedImage : getAbsoluteUrl(resolvedImage);
  const canonicalUrl = getAbsoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${siteConfig.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.social.twitter
        ? `@${siteConfig.social.twitter.split("/").pop()}`
        : undefined,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}
