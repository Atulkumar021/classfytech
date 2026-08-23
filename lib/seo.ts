import type { Metadata } from 'next';

const siteUrl = 'https://classifytechnology.in';

/**
 * Builds a page's metadata, including Open Graph / Twitter previews.
 *
 * Next.js does NOT deep-merge `openGraph`/`twitter` between a page and its
 * parent layout — a page that sets its own `openGraph` replaces the layout's
 * entirely, dropping `images`/`siteName`/`type` unless repeated. This keeps
 * every page's social preview on-topic (not the homepage's) without losing
 * the shared OG image or site name.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  // Brand suffix matches the layout title template, so every shared
  // link carries the company name.
  const socialTitle = `${title} | Classify Technology`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `${siteUrl}${path}`,
      title: socialTitle,
      description,
      siteName: 'Classify Technology',
      images: [
        {
          url: '/assets/og-image.png',
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: ['/assets/og-image.png'],
    },
  };
}
