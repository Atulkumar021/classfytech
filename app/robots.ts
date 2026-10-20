import type { MetadataRoute } from 'next';
import { companyInfo } from '@/lib/content';

const siteUrl = companyInfo.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The contact endpoint accepts POSTs and returns nothing useful to a
      // crawler; leaving it open just wastes crawl budget on 405s. Next's
      // own build output is never meant to be indexed directly.
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    // Which spelling of the domain is canonical. Honoured by some crawlers and
    // harmless to the rest.
    host: siteUrl,
  };
}
