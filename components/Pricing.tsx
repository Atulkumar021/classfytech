import Link from 'next/link';
import { plans } from '@/lib/content';
import { Check } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

// Only plans with a real per-minute rate go into structured data — "Custom"
// enterprise pricing has no fixed price, so it isn't a valid Offer.
const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Voice AI',
  description: 'AI voice agent platform for inbound and outbound phone calls, billed per minute.',
  offers: plans
    .filter((plan) => plan.unit === '/min')
    .map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price.replace('₹', ''),
      priceCurrency: 'INR',
      description: plan.description,
    })),
};

export default function Pricing() {
  return (
    <section className="section section--page-top" id="pricing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Pricing</span>
          <h1 className="section__title">
            Simple, <span className="gradient-text">usage-based</span> plans
          </h1>
          <p className="section__subtitle">
            Pay for the minutes you use — plans that scale from your first agent to your whole
            call center.
          </p>
        </Reveal>

        <div className="grid grid--pricing">
          {plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 45}
              as="article"
              className={`card plan ${plan.featured ? 'plan--featured' : ''}`}
            >
              {plan.featured && <span className="plan__badge">Most Popular</span>}
              {plan.originalPrice && <span className="plan__discount">50% OFF</span>}
              <h3>{plan.name}</h3>
              <div className="plan__price">
                {plan.originalPrice && <span className="plan__price-old">{plan.originalPrice}</span>}
                {plan.price}
                {plan.unit && <span>{plan.unit}</span>}
              </div>
              <p className="plan__desc">{plan.description}</p>
              <ul className="plan__list">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                className={`btn ${plan.featured ? 'btn--primary' : 'btn--ghost'} btn--block`}
                href="/contact"
              >
                {plan.cta}
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="pricing__note">
          Need more minutes, agents or a dedicated setup?{' '}
          <Link href="/contact">Request a custom quote →</Link>
        </Reveal>
      </div>
    </section>
  );
}
