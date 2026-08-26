import type { ProcessStep } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

/**
 * Numbered "how it works" timeline, driven by data. Reuses the same
 * `.timeline` / `.step` styling as the Voice AI process section so every
 * product explains itself the same way.
 */
export default function StepList({
  eyebrow,
  title,
  accent,
  subtitle,
  steps,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  steps: ProcessStep[];
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title">
            {title}
            {accent && <span className="gradient-text">{accent}</span>}
          </h2>
          <p className="section__subtitle">{subtitle}</p>
        </Reveal>

        <Reveal className="timeline">
          {steps.map((step, i) => (
            <div className="step" key={step.title}>
              <div className="step__num">{i + 1}</div>
              <div className="step__body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
