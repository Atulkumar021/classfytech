import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import Backdrop from '@/components/Backdrop';
import SpotlightController from '@/components/ui/SpotlightController';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollToTop from '@/components/ui/ScrollToTop';
import './globals.css';

// NOTE: We intentionally load fonts via a plain <link> (below) rather than
// `next/font/google`. On restricted/slow networks next/font's build-time font
// download hangs and aborts ("The user aborted a request. Retrying…"), blocking
// dev compilation. A browser <link> loads with `display=swap` and falls back to
// the system stack gracefully if Google Fonts is unreachable. Font-family names
// are wired to the CSS variables in globals.css.

const siteUrl = 'https://classifytechnology.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: '/assets/logo.png', apple: '/assets/logo.png' },
  title: 'Classify Technology — Websites, Mobile Apps & AI Solutions That Grow Your Business',
  description:
    'Classify Technology is a full-service software agency in New Delhi building stunning websites, scalable mobile apps, AI-powered automation, cloud infrastructure and custom software for startups and enterprises.',
  keywords: [
    'web development',
    'mobile app development',
    'AI development',
    'custom software',
    'cloud',
    'DevOps',
    'SaaS',
    'CRM',
    'ERP',
    'agency',
  ],
  authors: [{ name: 'Classify Technology' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Classify Technology — We Build Websites, Mobile Apps & AI Solutions',
    description:
      'From stunning websites and scalable mobile apps to AI automation and custom software, we help you build the future.',
    siteName: 'Classify Technology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classify Technology — We Build Websites, Mobile Apps & AI Solutions',
    description:
      'From stunning websites and scalable mobile apps to AI automation and custom software, we help you build the future.',
  },
};

export const viewport: Viewport = {
  themeColor: '#070914',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Classify Technology',
  description:
    'Software agency building websites, mobile apps, AI solutions, cloud infrastructure and custom software.',
  url: siteUrl,
  email: 'hello@classifytechnology.in',
  telephone: '+91-7017672081',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://twitter.com/classifytechin',
    'https://www.linkedin.com/company/classify-technology',
    'https://github.com/classifytechnology',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>
          <SmoothScroll />
          <Backdrop />
          <SpotlightController />
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
