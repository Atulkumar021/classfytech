import type { MetadataRoute } from 'next';

const siteUrl = 'https://classifytechnology.in';

/**
 * Five URLs, one per distinct intent: the company, each of the three products,
 * and contact. Each product page carries its own platform / process / use-case
 * / pricing / FAQ sections, so there are no sub-pages to list.
 */
const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/voice-ai', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/dialer', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/chatbot', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
