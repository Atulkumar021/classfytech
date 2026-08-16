import Services from '@/components/Services';
import Technologies from '@/components/Technologies';
import CTABand from '@/components/CTABand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Platform — Outbound, Inbound & Conversational AI',
  description:
    'Everything Voice AI includes — outbound and inbound voice agents, the conversational AI engine, analytics and integrations, all in one platform.',
  path: '/platform',
});

export default function PlatformPage() {
  return (
    <>
      <Services />
      <Technologies />
      <CTABand />
    </>
  );
}
