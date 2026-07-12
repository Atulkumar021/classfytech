import { plans } from '@/lib/content';
import { Check } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Pricing</span>
          <h2 className="section__title">
            Simple, <span className="gradient-text">transparent</span> plans
          </h2>
          <p className="section__subtitle">
            Flexible engagement models that scale with your ambition.
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
              <a
                className={`btn ${plan.featured ? 'btn--primary' : 'btn--ghost'} btn--block`}
                href="#contact"
              >
                {plan.cta}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="pricing__note">
          Working on something large-scale or unique?{' '}
          <a href="#contact">Request a custom quote →</a>
        </Reveal>
      </div>
    </section>
  );
}
