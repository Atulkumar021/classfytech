import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Process from '@/components/Process';
import UseCaseGrid from '@/components/UseCaseGrid';
import Technologies from '@/components/Technologies';
import Pricing from '@/components/Pricing';
import FaqSection from '@/components/FaqSection';
import Reviews from '@/components/Reviews';
import CTABand from '@/components/CTABand';
import { projects, faqs } from '@/lib/content';
import { pageMetadata, breadcrumbJsonLd, jsonLdProps } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Voice AI — AI Voice Agents for Inbound & Outbound Calls',
  description:
    'NiaTalks Voice AI makes outbound calls and answers inbound ones — qualifying leads, booking meetings and resolving support questions in a natural voice, 24/7, in 40+ languages.',
  path: '/voice-ai',
  keywords: [
    'AI voice agent',
    'voice AI',
    'AI calling software',
    'AI phone agent',
    'AI receptionist',
    'inbound call automation',
    'outbound calling AI',
    'appointment booking AI',
    'lead qualification calls',
    'multilingual voice bot',
  ],
});

/**
 * The complete Voice AI page: platform, process, use cases, stack, pricing and
 * FAQ all live here as sections rather than as separate sub-pages, so a visitor
 * gets the whole product in one scroll. The in-page ids (#services, #process,
 * #solutions, #pricing, #faq) are what the old sub-page URLs now redirect to.
 */
export default function VoiceAiPage() {
  return (
    <>
      {/* Breadcrumb trail, so a result shows "niatalks.com > Voice AI"
          rather than a bare URL. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdProps(breadcrumbJsonLd('Voice AI', '/voice-ai'))}
      />
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <UseCaseGrid
        eyebrow="Solutions"
        title="One platform, "
        accent="endless use cases"
        subtitle="However your team uses the phone today, a Voice AI agent can do it around the clock."
        items={projects}
      />
      <Technologies />
      <Pricing />
      <FaqSection
        eyebrow="FAQ"
        title="About "
        accent="Voice AI"
        subtitle="The questions we hear most about running AI agents on real phone calls."
        items={faqs}
      />
      <Reviews />
      <CTABand />
    </>
  );
}
