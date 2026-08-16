import Pricing from '@/components/Pricing';
import CTABand from '@/components/CTABand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Simple, per-minute pricing for Voice AI — Starter, Growth and Enterprise plans for every call volume.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <CTABand />
    </>
  );
}
