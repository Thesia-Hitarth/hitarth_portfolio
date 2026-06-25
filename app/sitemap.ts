import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { getAbsoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core pages
  const routes = ['', '/projects'].map((route) => ({
    url: getAbsoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic projects routes
  const projectRoutes = projects.map((project) => ({
    url: getAbsoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
