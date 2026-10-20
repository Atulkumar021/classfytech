import type { Metadata } from 'next';
import { companyInfo } from '@/lib/content';

const siteUrl = companyInfo.siteUrl;

/**
 * Builds a page's metadata, including Open Graph / Twitter previews.
 *
 * Next.js does NOT deep-merge `openGraph`/`twitter` between a page and its
 * parent layout — a page that sets its own `openGraph` replaces the layout's
 * entirely, dropping `images`/`siteName`/`type` unless repeated. This keeps
 * every page's social preview on-topic (not the homepage's) without losing
 * the shared OG image or site name.
 *
 * `keywords` is per-page on purpose: the layout's list is the company's, and
 * inheriting it everywhere told search engines the Dialer page was about
 * voice agents too. Omit it and the page simply inherits the layout's.
 */
/**
 * BreadcrumbList for an inner page.
 *
 * Every page here is one level below the homepage, so the trail is always
 * Home > This Page. Google uses it to replace the bare URL in a result with a
 * readable path.
 */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

/** Serialises a schema.org object into a <script> tag's props. */
export function jsonLdProps(data: unknown) {
  return { __html: JSON.stringify(data) };
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  // Brand suffix matches the layout title template, so every shared
  // link carries the company name.
  const socialTitle = `${title} | NiaTalks`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: `${siteUrl}${path}`,
      title: socialTitle,
      description,
      siteName: 'NiaTalks',
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
