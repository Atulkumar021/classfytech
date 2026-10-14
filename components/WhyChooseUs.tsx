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
            The boring parts, <span className="gradient-text">done properly</span>
          </h2>
          <p className="section__subtitle">
            A voice that sounds good is the easy half. These are the things that decide whether
            you are still running it in six months.
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
