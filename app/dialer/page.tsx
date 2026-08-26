import ProductHero from '@/components/ProductHero';
import FeatureChips from '@/components/FeatureChips';
import CapabilityGrid from '@/components/CapabilityGrid';
import StepList from '@/components/StepList';
import UseCaseGrid from '@/components/UseCaseGrid';
import EnquiryPricing from '@/components/EnquiryPricing';
import FaqSection from '@/components/FaqSection';
import CTABand from '@/components/CTABand';
import DialerPreview from '@/components/DialerPreview';
import {
  dialerCapabilities,
  dialerSteps,
  dialerFeatures,
  dialerUseCases,
  dialerPlans,
  dialerFaqs,
} from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Dialer — Call Centre Software with Predictive Dialing & CRM',
  description:
    'A calling desk for your agents: six dialing modes, inbound queues and IVR, WhatsApp/SMS/email, a built-in CRM, supervisor monitoring and 100+ reports.',
  path: '/dialer',
});

/** Complete Dialer page — capabilities, process, use cases, pricing and FAQ. */
export default function DialerPage() {
  return (
    <>
      <ProductHero
        eyebrow="Dialer"
        title="Every call, every channel, "
        accent="one screen"
        titleTail="."
        subtitle="A calling desk for your agents. Six dialing modes and inbound queues on one side, the customer record and a guided script on the other — plus WhatsApp, SMS and email, supervisor monitoring, and an admin console for the people running the floor."
        chips={['Six dialing modes', 'Inbound & outbound', 'Built-in CRM', 'Supervisor monitoring']}
        visual={<DialerPreview />}
      />

      <FeatureChips
        eyebrow="What's included"
        title="Everything a calling floor needs"
        subtitle="Built for the day-to-day of a real contact centre — not a feature list nobody uses."
        items={dialerFeatures}
      />

      <CapabilityGrid
        eyebrow="Platform"
        title="Made for teams that "
        accent="live on the phone"
        subtitle="Calling, live call control, every messaging channel, the CRM, supervision, reporting and the admin console behind all of it."
        items={dialerCapabilities}
      />

      <StepList
        eyebrow="How it works"
        title="From configuration to "
        accent="a working floor"
        subtitle="Set the campaigns up once, then it's just agents signing in and taking calls."
        steps={dialerSteps}
      />

      <UseCaseGrid
        eyebrow="Solutions"
        title="What teams "
        accent="run on it"
        subtitle="Sales floors, support desks, verification teams and multi-campaign BPOs — inbound, outbound, or both at once."
        items={dialerUseCases}
      />

      <EnquiryPricing
        eyebrow="Pricing"
        title="Priced by seats and "
        accent="call volume"
        subtitle="Three tiers covering a small sales team through to a full contact centre. Tell us where you sit and we'll put a number on it."
        plans={dialerPlans}
      />

      <FaqSection
        eyebrow="FAQ"
        title="About the "
        accent="Dialer"
        subtitle="How it differs from Voice AI, what it connects to, and how compliance is handled."
        items={dialerFaqs}
      />

      <CTABand />
    </>
  );
}
