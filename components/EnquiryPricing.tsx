import Link from 'next/link';
import type { EnquiryPlan } from '@/lib/content';
import { Check } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Pricing tiers for products whose rates aren't published yet.
 *
 * Deliberately shows no figures — inventing prices would mislead, and a wrong
 * number is worse than no number. The tiers still do the real job of a pricing
 * page (showing where a buyer fits and what they get), with the amount coming
 * from a conversation. Swap in `<Pricing>` once the rates are set.
 */
export default function EnquiryPricing({
  eyebrow,
  title,
  accent,
  subtitle,
  plans,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  plans: EnquiryPlan[];
}) {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title">
            {title}
            {accent && <span className="gradient-text">{accent}</span>}
          </h2>
          <p className="section__subtitle">{subtitle}</p>
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
              <h3>{plan.name}</h3>
              <div className="plan__price plan__price--enquire">Let&apos;s talk</div>
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
          Pricing depends on seats and volume — tell us your numbers and we&apos;ll quote it.{' '}
          <Link href="/contact">Get a quote →</Link>
        </Reveal>
      </div>
    </section>
  );
}
