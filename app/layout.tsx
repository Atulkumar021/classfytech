import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import Backdrop from '@/components/Backdrop';
import SpotlightController from '@/components/ui/SpotlightController';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollToTop from '@/components/ui/ScrollToTop';
import DemoModal from '@/components/DemoModal';
import './globals.css';

// NOTE: We intentionally load fonts via a plain <link> (below) rather than
// `next/font/google`. On restricted/slow networks next/font's build-time font
// download hangs and aborts ("The user aborted a request. Retrying…"), blocking
// dev compilation. A browser <link> loads with `display=swap` and falls back to
// the system stack gracefully if Google Fonts is unreachable. Font-family names
// are wired to the CSS variables in globals.css.

const siteUrl = 'https://voiceai.classifytechnology.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: '/assets/logo.png', apple: '/assets/logo.png' },
  title: 'Voice AI — Human-Like AI Voice Agents for Inbound & Outbound Calls',
  description:
    'Voice AI by Classify Technology is an AI voice agent platform that makes and takes phone calls for you — qualifying leads, booking meetings and resolving support calls 24/7, in 40+ languages.',
  keywords: [
    'voice AI',
    'AI voice agent',
    'AI calling software',
    'outbound dialer',
    'inbound call automation',
    'conversational AI',
    'AI phone agent',
    'call center automation',
    'AI receptionist',
    'sales automation',
  ],
  authors: [{ name: 'Classify Technology' }],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Voice AI — Human-Like AI Voice Agents for Inbound & Outbound Calls',
    description:
      'One platform, natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock.',
    siteName: 'Voice AI',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voice AI — Human-Like AI Voice Agents for Inbound & Outbound Calls',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice AI — Human-Like AI Voice Agents for Inbound & Outbound Calls',
    description:
      'One platform, natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock.',
    images: ['/assets/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Voice AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI voice agent platform for inbound and outbound phone calls — lead qualification, appointment booking, customer support and more, in 40+ languages.',
  url: siteUrl,
  provider: {
    '@type': 'Organization',
    name: 'Classify Technology',
    email: 'classifytechnologies@gmail.com',
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700;800&display=swap"
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
          <DemoModal />
        </Providers>
      </body>
    </html>
  );
}
