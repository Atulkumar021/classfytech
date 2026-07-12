import { processSteps } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Our Process</span>
          <h2 className="section__title">
            A clear path from <span className="gradient-text">idea to impact</span>
          </h2>
          <p className="section__subtitle">
            A proven, transparent workflow that keeps you in the loop at every stage.
          </p>
        </Reveal>

        <div className="timeline" style={{ maxWidth: '820px', marginInline: 'auto' }}>
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 35} className="step">
              <div className="step__num">{i + 1}</div>
              <div className="step__body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
