/**
 * app/blog/[slug]/page.tsx
 * ─────────────────────────────────────────────────────────
 * Dynamic blog post details page.
 * Renders MDX static content at build time.
 * ─────────────────────────────────────────────────────────
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolink from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/mdx';
import { siteConfig } from '@/config/site';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { LinkedinIcon } from '@/components/ui/BrandIcons';
import { JsonLd } from '@/components/seo/JsonLd';

// ── Static generation ──────────────────────────────────

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// All slugs not pre-rendered will 404
export const dynamicParams = false;

// ── Per-page metadata ──────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url,
      images: [
        {
          url: post.coverImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: [post.coverImage || siteConfig.ogImage],
    },
  };
}

// ── Page Component ─────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Extract headings from raw markdown content for Table of Contents
  const headings = post.content
    .split('\n')
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const level = line.startsWith('### ') ? 3 : 2;
      const text = line.replace(/^#{2,3} /, '').trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      return { level, text, id };
    });

  const relatedPosts = getRelatedPosts(slug, post.tags);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const authorInitials = siteConfig.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const mdxOptions: any = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolink, { behavior: 'wrap' }],
        [rehypeHighlight, { detect: true }],
      ],
    },
  };

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    url: `${siteConfig.url}blog/${post.slug}`,
    image: post.coverImage
      ? `${siteConfig.url.replace(/\/$/, '')}${post.coverImage}`
      : `${siteConfig.url.replace(/\/$/, '')}${siteConfig.ogImage}`,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <JsonLd data={blogPostSchema} />
      {/* ZONE 1: Post Header */}
      <header className="pt-32 pb-8 border-b border-border bg-muted/5">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          {/* Back Nav Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
          >
            <ArrowLeft size={16} />
            <span>Back to blog</span>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 border border-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary capitalize"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-4 sm:text-4xl lg:text-5xl leading-[1.1]">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 mt-8 text-xs text-muted-foreground font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-muted-foreground/60" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-muted-foreground/60" />
              {post.readingTime}
            </span>
            <div className="flex items-center gap-2 border-l border-border pl-6">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {authorInitials}
              </div>
              <span className="text-foreground">{siteConfig.name}</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted mt-8 shadow-sm">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
        </div>
      </header>

      {/* ZONE 2: Content + Sidebar Grid */}
      <div className="container mx-auto max-w-5xl px-4 mt-12 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Main Article Content */}
          <main className="lg:col-span-3">
            <article className="prose-custom max-w-none">
              <MDXRemote
                source={post.content}
                components={MDXComponents}
                options={mdxOptions}
              />
            </article>

            {/* Post Footer: Share & Tags */}
            <div className="mt-16 pt-8 border-t border-border space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mr-2">
                  Filed under:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted border border-border px-3 py-1 text-xs font-semibold text-muted-foreground capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-6">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Share this article
                </span>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-border pt-12">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="h-full">
                      <BlogPostCard post={relatedPost} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Table of Contents */}
              {headings.length >= 2 && <TableOfContents headings={headings} />}

              {/* Author Info Card */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="font-mono text-[10px] font-semibold text-primary uppercase tracking-widest block mb-4">
                  Written By
                </span>
                
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {authorInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {siteConfig.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {siteConfig.title}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex justify-end">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`${siteConfig.name} on LinkedIn`}
                  >
                    <LinkedinIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
