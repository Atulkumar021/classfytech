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
import MobileActionBar from '@/components/MobileActionBar';
import { INTRO_BLOCKING_SCRIPT } from '@/lib/intro';
import { companyInfo, contactInfo } from '@/lib/content';
import './globals.css';

// NOTE: We intentionally load fonts via a plain <link> (below) rather than
// `next/font/google`. On restricted/slow networks next/font's build-time font
// download hangs and aborts ("The user aborted a request. Retrying…"), blocking
// dev compilation. A browser <link> loads with `display=swap` and falls back to
// the system stack gracefully if Google Fonts is unreachable. Font-family names
// are wired to the CSS variables in globals.css.

const siteUrl = companyInfo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: '/assets/logo-icon.png', apple: '/assets/logo-icon.png' },
  // The company name belongs in every title. This domain carries the NiaTalks
  // brand, and when the homepage title said only "Voice AI" the strongest
  // brand signal on the site was gone — leaving nothing for a navigational
  // "niatalks" search to match on.
  title: {
    template: '%s | NiaTalks',
    default: 'NiaTalks — AI Voice Agents & Call Centre Dialer',
  },
  // The homepage is the company, so this covers both products rather than
  // only Voice AI — /voice-ai and /dialer each carry their own description.
  description:
    'NiaTalks builds AI that talks to your customers — voice agents that make and take phone calls 24/7 in 40+ languages, plus a dialer that runs your whole calling team from one screen.',
  // Brand spellings first — a navigational "niatalks" search is the one query
  // this domain must own — then the two products' category terms.
  keywords: [
    'NiaTalks',
    'Nia Talks',
    'voice AI',
    'AI voice agent',
    'AI calling software',
    'AI phone agent',
    'inbound call automation',
    'conversational AI',
    'AI receptionist',
    'predictive dialer',
    'outbound dialer',
    'call centre software',
    'call center automation',
    'contact centre CRM',
    'sales automation',
  ],
  authors: [{ name: companyInfo.legalName }],
  publisher: companyInfo.legalName,
  alternates: { canonical: '/' },
  // Rendered only for whichever tokens are filled in; Next omits the key
  // entirely when the value is undefined. See the note on companyInfo.
  verification: {
    ...(companyInfo.verification.google ? { google: companyInfo.verification.google } : {}),
    ...(companyInfo.verification.bing ? { other: { 'msvalidate.01': companyInfo.verification.bing } } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'NiaTalks — AI Voice Agents & Call Centre Dialer',
    description:
      'AI that talks to your customers — natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock, and a dialer for the team that calls alongside them.',
    // The site is the company; Voice AI and the Dialer are the products on it.
    siteName: 'NiaTalks',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NiaTalks — AI Voice Agents & Call Centre Dialer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NiaTalks — AI Voice Agents & Call Centre Dialer',
    description:
      'AI that talks to your customers — natural-sounding voice agents that qualify leads, book meetings and handle support calls around the clock, and a dialer for the team that calls alongside them.',
    images: ['/assets/og-image.png'],
  },
};

export const viewport: Viewport = {
  // Matches the default (light) theme's page background. Soft UI moved that
  // background off near-white to a mid grey — the browser chrome has to move
  // with it, or there's a visible seam above the page.
  themeColor: '#e8ebf0',
  width: 'device-width',
  initialScale: 1,
};

/**
 * A linked graph rather than one nested blob.
 *
 * Previously the only entity here was `SoftwareApplication` named "Voice AI",
 * with the company buried as its `provider`. That gave search engines nothing
 * to bind the *domain* to the NiaTalks brand. Now `Organization` is a
 * first-class entity that `WebSite` publishes and each product references by
 * `@id`, which is what a brand/navigational query needs to resolve.
 *
 * Both products are listed, each pointing at its own page — a product entity
 * whose `url` is the homepage gives search engines nothing to rank for that
 * product's own query.
 */
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      // Multi-typed on purpose. `Organization` is what publishes the site and
      // provides the products; `ProfessionalService` is a LocalBusiness
      // subtype, and without it a company that trades from one registered
      // address in Moradabad gives Google nothing to place geographically.
      // One node rather than two, so there is no second competing entity.
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${siteUrl}/#organization`,
      name: 'NiaTalks',
      // `name` is the brand; `legalName` is the incorporated entity that
      // actually contracts. Search engines read them as different things, and
      // a Pvt Ltd site should state both.
      legalName: companyInfo.legalName,
      // Covers the spellings people actually search, the registered entity and
      // the email domain.
      alternateName: [
        'Nia Talks',
        'NiaTalks AI',
        'Nia',
        companyInfo.legalName,
        companyInfo.legalNameShort,
      ],
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/logo-icon.png`,
        width: 512,
        height: 512,
      },
      email: contactInfo.email,
      telephone: contactInfo.phoneHref,
      foundingLocation: {
        '@type': 'Place',
        name: companyInfo.incorporatedIn,
      },
      // Driven off the structured parts rather than the display string:
      // search engines match these fields individually, and a whole address
      // crammed into `streetAddress` resolves to nothing.
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.address.street,
        addressLocality: companyInfo.address.locality,
        addressRegion: companyInfo.address.region,
        postalCode: companyInfo.address.postalCode,
        addressCountry: companyInfo.address.country,
      },
      // Coordinates of the registered office, so the business can resolve on
      // a map. Same source as the contact page's pin.
      geo: {
        '@type': 'GeoCoordinates',
        latitude: companyInfo.geo.lat,
        longitude: companyInfo.geo.lon,
      },
      areaServed: { '@type': 'Country', name: 'India' },
      knowsLanguage: ['en', 'hi'],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: contactInfo.phoneHref,
        email: contactInfo.email,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      // `sameAs` is how a search engine decides which accounts *are* this
      // company, so an unset handle is simply omitted. Filling one in at
      // companyInfo.social puts it back here automatically.
      sameAs: Object.values(companyInfo.social).filter(Boolean),
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'NiaTalks',
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
      url: `${siteUrl}/voice-ai`,
      provider: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#dialer`,
      name: 'Dialer',
      applicationCategory: 'BusinessApplication',
      // An agent desktop app with a browser-based admin console behind it.
      operatingSystem: 'Windows, Web',
      description:
        'Call centre software for outbound and inbound teams — six dialing modes, IVR and queues, WhatsApp, SMS and email, a built-in CRM, supervisor monitoring and 100+ reports.',
      url: `${siteUrl}/dialer`,
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
          <MobileActionBar />
          <ScrollToTop />
          <DemoModal />
        </Providers>
      </body>
    </html>
  );
}
