import Process from '@/components/Process';
import CTABand from '@/components/CTABand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How It Works',
  description:
    'How Voice AI goes from a call flow idea to a live, natural-sounding voice agent — in days, not months.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <>
      <Process />
      <CTABand />
    </>
  );
}
