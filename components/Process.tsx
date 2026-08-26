import { processSteps } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">How It Works</span>
          <h2 className="section__title">
            From script to <span className="gradient-text">live agent</span>
          </h2>
          <p className="section__subtitle">
            No code, no call center to hire — just a clear path from idea to a live voice agent.
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
