import type { MetadataRoute } from 'next';

const siteUrl = 'https://voiceai.classifytechnology.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
