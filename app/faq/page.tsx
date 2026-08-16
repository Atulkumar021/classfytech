import FAQ from '@/components/FAQ';
import CTABand from '@/components/CTABand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Answers to common questions about Voice AI — how natural it sounds, integrations, security, pricing and more.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <FAQ />
      <CTABand />
    </>
  );
}
