import { features } from '@/lib/content';
import { featureIcons } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

export default function WhyChooseUs() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Why Voice AI</span>
          <h2 className="section__title">
            Built for <span className="gradient-text">scale, speed and trust</span>
          </h2>
          <p className="section__subtitle">
            Everything you need to put a reliable, natural-sounding voice agent to work — fast.
          </p>
        </Reveal>

        <div className="grid grid--features">
          {features.map((feature, i) => {
            const Icon = featureIcons[feature.icon];
            return (
              <Reveal key={feature.label} delay={i * 22} className="card feature">
                <span className="feature__icon">
                  <Icon />
                </span>
                <span>{feature.label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
