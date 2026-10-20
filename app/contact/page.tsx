import { Suspense } from 'react';
import Contact from '@/components/Contact';
import { pageMetadata, breadcrumbJsonLd, jsonLdProps } from '@/lib/seo';
import { companyInfo, contactInfo } from '@/lib/content';

export const metadata = pageMetadata({
  title: 'Book a Demo',
  description:
    "Book a free live demo of NiaTalks — tell us about your use case and we'll show you a real Voice AI call flow, or the Dialer running, within one business day.",
  path: '/contact',
  keywords: ['NiaTalks demo', 'AI voice agent demo', 'dialer demo', 'contact NiaTalks'],
});

export default function ContactPage() {
  // Contact reads the `plan` query parameter (set by the pricing buttons) via
  // useSearchParams, which Next requires to sit inside a Suspense boundary —
  // without one this page cannot be statically rendered and the build fails.
  // This page had no page-level markup at all. ContactPage tells Google what
  // kind of page it is, and repeating the contact details here (rather than
  // only in the site-wide Organization) is what lets them surface against a
  // "niatalks phone number" style query.
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${companyInfo.siteUrl}/contact#webpage`,
    url: `${companyInfo.siteUrl}/contact`,
    name: `Contact ${companyInfo.brand}`,
    description:
      'Book a live demo, or call or message the team directly. We build the call flow you describe and have an agent ring you with it.',
    isPartOf: { '@id': `${companyInfo.siteUrl}/#website` },
    about: { '@id': `${companyInfo.siteUrl}/#organization` },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${companyInfo.siteUrl}/#organization`,
      telephone: contactInfo.phoneHref,
      email: contactInfo.email,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(contactJsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdProps(breadcrumbJsonLd('Contact', '/contact'))}
      />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </>
  );
}
