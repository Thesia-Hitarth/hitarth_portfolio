import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';

/**
 * lib/mdx.ts
 * ─────────────────────────────────────────────────────────
 * MDX Blog system file system helpers and schema parsers.
 * ─────────────────────────────────────────────────────────
 */

// Define the frontmatter schema with Zod
const frontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(), // ISO: "2025-06-15"
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface Post extends PostFrontmatter {
  slug: string;
  readingTime: string; // "5 min read"
  content: string; // raw MDX content string
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Gets all MDX slug filenames from content/blog/
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  return fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx'));
}

/**
 * Reads and parses a single post by its slug filename
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const cleanSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(POSTS_DIR, `${cleanSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const result = frontmatterSchema.safeParse(data);
    if (!result.success) {
      console.warn(`[mdx] Malformed frontmatter in post: ${cleanSlug}`, result.error.format());
      return null;
    }

    const calculatedReading = readingTime(content).text;

    return {
      ...result.data,
      slug: cleanSlug,
      readingTime: calculatedReading,
      content,
    };
  } catch (error) {
    console.error(`[mdx] Error reading post by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Returns all published blog posts sorted by date descending (without post content)
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null && post.published);

  // Sort descending by date
  return posts
    .map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns featured posts. If none marked, returns the first 3 posts.
 */
export function getFeaturedPosts(): PostMeta[] {
  const allPosts = getAllPosts();
  const featured = allPosts.filter((post) => post.featured);
  
  if (featured.length === 0) {
    return allPosts.slice(0, 3);
  }
  
  return featured;
}

/**
 * Scores and returns up to 3 posts related to the current slug based on tag overlap.
 * If no overlap, returns the most recent posts.
 */
export function getRelatedPosts(currentSlug: string, tags: string[]): PostMeta[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

  const scored = allPosts.map((post) => {
    const overlap = post.tags.filter((t) => tags.includes(t)).length;
    return { post, score: overlap };
  });

  // Sort by score (descending), then date (descending)
  return scored
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, 3)
    .map((item) => item.post);
}
