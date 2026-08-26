import type { Service } from '@/lib/content';
import { serviceIcons } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Capability cards driven by data, so each product page describes itself from
 * `lib/content.ts` rather than duplicating this markup. Same visual language as
 * the Voice AI platform bento (numbered card, icon, chips).
 */
export default function CapabilityGrid({
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
  items: Service[];
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

        <div className="grid grid--capabilities">
          {items.map((item, i) => {
            const Icon = serviceIcons[item.icon];
            return (
              <Reveal key={item.title} delay={i * 40} as="article" className="card service">
                <span className="service__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="service__icon">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p className="service__desc">{item.description}</p>
                <ul className="service__pills">
                  {item.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
