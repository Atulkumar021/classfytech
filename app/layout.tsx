import type { Metadata, Viewport } from 'next';
import Providers from './providers';
import Backdrop from '@/components/Backdrop';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollToTop from '@/components/ui/ScrollToTop';
import DemoModal from '@/components/DemoModal';
import IntroScreen from '@/components/IntroScreen';
import OfferBar from '@/components/OfferBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INTRO_BLOCKING_SCRIPT } from '@/lib/intro';
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
  icons: { icon: '/assets/logo-icon.png', apple: '/assets/logo-icon.png' },
  // The company name belongs in every title. This domain is the Classify
  // Technology brand, and when the homepage title said only "Voice AI" the
  // strongest brand signal on the site was gone — leaving nothing for a
  // navigational "classify technology" search to match on.
  title: {
    template: '%s | Classify Technology',
    default: 'Classify Technology — AI Voice Agents for Sales & Support Calls',
  },
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
    title: 'Classify Technology — AI Voice Agents for Sales & Support Calls',
    description:
      'Voice AI by Classify Technology — natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock.',
    // The site is the company; "Voice AI" is the product on it.
    siteName: 'Classify Technology',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Classify Technology — AI Voice Agents for Sales & Support Calls',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classify Technology — AI Voice Agents for Sales & Support Calls',
    description:
      'Voice AI by Classify Technology — natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock.',
    images: ['/assets/og-image.png'],
  },
};

export const viewport: Viewport = {
  // Matches the default (light) theme's page background, so the mobile browser
  // chrome doesn't sit dark above a light page.
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
};

/**
 * A linked graph rather than one nested blob.
 *
 * Previously the only entity here was `SoftwareApplication` named "Voice AI",
 * with the company buried as its `provider`. That gave search engines nothing
 * to bind the *domain* to the Classify Technology brand. Now `Organization` is
 * a first-class entity that `WebSite` publishes and the product references by
 * `@id`, which is what a brand/navigational query needs to resolve.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Classify Technology',
      // Covers the spellings people actually search and the email domain.
      alternateName: ['Classify Technologies', 'Classify Tech', 'Classify'],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/logo-icon.png`,
        width: 512,
        height: 512,
      },
      email: 'classifytechnologies@gmail.com',
      telephone: '+91-9457636571',
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
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Classify Technology',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#voice-ai`,
      name: 'Voice AI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'AI voice agent platform for inbound and outbound phone calls — lead qualification, appointment booking, customer support and more, in 40+ languages.',
      url: siteUrl,
      provider: { '@id': `${siteUrl}/#organization` },
    },
  ],
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
        {/* Runs before first paint so a repeat navigation never flashes the
            intro overlay — same trick next-themes uses to avoid a theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_BLOCKING_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <Providers>
          {/* Mounted before DemoModal so the modal can synchronously see whether
              an intro is still pending before scheduling itself. */}
          <IntroScreen />
          <SmoothScroll />
          <Backdrop />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <OfferBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ScrollToTop />
          <DemoModal />
        </Providers>
      </body>
    </html>
  );
}
