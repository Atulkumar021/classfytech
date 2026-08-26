import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, Calendar } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Shared hero for a product page. Kept generic so Dialer, Chatbot and the
 * Voice AI hub all read as the same family instead of three bespoke layouts —
 * the `visual` slot is where each product puts its own illustration.
 */
export default function ProductHero({
  eyebrow,
  title,
  accent,
  titleTail,
  subtitle,
  chips,
  visual,
}: {
  eyebrow: string;
  title: string;
  /** Phrase rendered in the accent colour. */
  accent?: string;
  /** Copy after the accent phrase (e.g. a trailing full stop). */
  titleTail?: string;
  subtitle: string;
  chips?: string[];
  visual?: ReactNode;
}) {
  return (
    <section className={`section section--page-top product-hero ${visual ? '' : 'product-hero--solo'}`}>
      <div className="container product-hero__layout">
        <div className="product-hero__content">
          <Reveal>
            <span className="hero__badge">{eyebrow}</span>
          </Reveal>

          <Reveal as="h1" delay={35} className="product-hero__title">
            {title}
            {accent && <span className="gradient-text">{accent}</span>}
            {titleTail}
          </Reveal>

          <Reveal as="p" delay={70} className="hero__sub">
            {subtitle}
          </Reveal>

          <Reveal delay={100} className="hero__cta">
            <Link className="btn btn--primary" href="/contact">
              Book a Free Demo
              <ArrowRight />
            </Link>
            <Link className="btn btn--ghost" href="/contact">
              <Calendar />
              Talk to Sales
            </Link>
          </Reveal>

          {chips && chips.length > 0 && (
            <Reveal delay={140} className="hero__services">
              {chips.map((chip) => (
                <span className="hero__service-pill" key={chip}>
                  {chip}
                </span>
              ))}
            </Reveal>
          )}
        </div>

        {visual && (
          <Reveal delay={110} className="product-hero__visual">
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
