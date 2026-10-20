import type { MetadataRoute } from 'next';
import { companyInfo } from '@/lib/content';

const siteUrl = companyInfo.siteUrl;

/**
 * Four URLs, one per distinct intent: the company, each of the two products,
 * and contact. Each product page carries its own platform / process / use-case
 * / pricing / FAQ sections, so there are no sub-pages to list.
 */
const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/voice-ai', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/dialer', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed date from companyInfo, not `new Date()`. The old version restamped
  // every URL on every build, so a deploy that changed nothing but a stylesheet
  // still claimed all four pages were modified — a signal crawlers learn to
  // discount entirely.
  const lastModified = new Date(companyInfo.contentUpdated);
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
