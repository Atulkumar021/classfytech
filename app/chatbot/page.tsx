import ProductHero from '@/components/ProductHero';
import FeatureChips from '@/components/FeatureChips';
import CapabilityGrid from '@/components/CapabilityGrid';
import StepList from '@/components/StepList';
import UseCaseGrid from '@/components/UseCaseGrid';
import EnquiryPricing from '@/components/EnquiryPricing';
import FaqSection from '@/components/FaqSection';
import CTABand from '@/components/CTABand';
import ChatWidgetPreview from '@/components/ChatWidgetPreview';
import {
  chatbotCapabilities,
  chatbotSteps,
  chatbotFeatures,
  chatbotUseCases,
  chatbotPlans,
  chatbotFaqs,
} from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Chatbot — AI Chat Widget for Your Website',
  description:
    'An AI chat widget for your site, trained on your own content. Answers visitor questions instantly, captures leads around the clock and hands off to your team.',
  path: '/chatbot',
});

/** Complete Chatbot page — capabilities, process, use cases, pricing and FAQ. */
export default function ChatbotPage() {
  return (
    <>
      <ProductHero
        eyebrow="Chatbot"
        title="Answer every visitor, "
        accent="the moment they ask"
        titleTail="."
        subtitle="One script tag puts an AI assistant on your website. It answers from your own content, captures contact details before people leave, and hands the tricky ones to your team."
        chips={['Trained on your content', 'Lead capture', 'Human handoff', 'One script tag']}
        visual={<ChatWidgetPreview />}
      />

      <FeatureChips
        eyebrow="What's included"
        title="A widget that pulls its weight"
        subtitle="Answers, leads and a record of what people actually asked."
        items={chatbotFeatures}
      />

      <CapabilityGrid
        eyebrow="Platform"
        title="Set up in an afternoon, "
        accent="useful from day one"
        subtitle="Trained on your material, styled like your product, and honest when it doesn't know."
        items={chatbotCapabilities}
      />

      <StepList
        eyebrow="How it works"
        title="Live on your site in "
        accent="four steps"
        subtitle="No decision trees to build and no plugin to install."
        steps={chatbotSteps}
      />

      <UseCaseGrid
        eyebrow="Solutions"
        title="What the widget "
        accent="takes off your plate"
        subtitle="Every question it answers is one your team didn't have to, and every lead it captures is one that didn't leave."
        items={chatbotUseCases}
      />

      <EnquiryPricing
        eyebrow="Pricing"
        title="Priced by sites and "
        accent="conversation volume"
        subtitle="From one website to a multi-site rollout. Tell us your monthly chat traffic and we'll put a number on it."
        plans={chatbotPlans}
      />

      <FaqSection
        eyebrow="FAQ"
        title="About the "
        accent="Chatbot"
        subtitle="Setup time, where answers come from, and how handoff to a person works."
        items={chatbotFaqs}
      />

      <CTABand />
    </>
  );
}
