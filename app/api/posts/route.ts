import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';

export const dynamic = 'force-static'; // Pre-build static listing

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to get posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
