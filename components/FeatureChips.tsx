import type { Feature } from '@/lib/content';
import { featureIcons } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Compact "what's included" chip row, driven by data. Same layout as the
 * homepage's WhyChooseUs grid — labels are kept short in `lib/content.ts` so
 * each chip holds its text on one line.
 */
export default function FeatureChips({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  items: Feature[];
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

        <div className="grid grid--features">
          {items.map((item, i) => {
            const Icon = featureIcons[item.icon];
            return (
              <Reveal key={item.label} delay={i * 22} className="card feature">
                <span className="feature__icon">
                  <Icon />
                </span>
                <span>{item.label}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
