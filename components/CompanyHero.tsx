'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';
import { products } from '@/lib/content';
import { featureIcons, ArrowRight } from '@/components/Icons';
import VoiceCallPreview from '@/components/VoiceCallPreview';
import DialerPreview from '@/components/DialerPreview';
import ChatWidgetPreview from '@/components/ChatWidgetPreview';

/**
 * Homepage hero: a single headline, then all three products running live.
 *
 * The standing copy block and the pair of site-wide CTAs that used to sit here
 * are gone — each card now carries its own "Book a Demo" / "See Product", so a
 * visitor acts on the specific product they came for instead of a generic one.
 * The <h1> stays: it's the page's only top-level heading and the one line that
 * tells a first-time visitor (and a search engine) what this company does.
 */

/** Preview node per product slug, so the row stays driven by `products`. */
const PREVIEWS: Record<string, ReactNode> = {
  'voice-ai': <VoiceCallPreview />,
  dialer: <DialerPreview />,
  chatbot: <ChatWidgetPreview />,
};

export default function CompanyHero() {
  return (
    <section className="hero hero--company" id="products">
      <div className="container">
        <div className="hero__content hero__content--wide">
          <Reveal>
            <span className="hero__badge">Classify Technology</span>
          </Reveal>

          <Reveal as="h1" delay={35}>
            AI that talks to your customers —{' '}
            <span className="gradient-text">on the phone and on your site</span>.
          </Reveal>
        </div>

        <div className="hero__previews">
          {products.map((product, i) => {
            const Icon = featureIcons[product.icon];
            return (
              <Reveal key={product.slug} delay={90 + i * 60} className="hero__preview">
                <div className="hero__preview-head">
                  <span className="hero__preview-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span>
                    <strong>{product.name}</strong>
                    <span className="hero__preview-sub">{product.tagline}</span>
                  </span>
                </div>

                <div className="hero__preview-stage">{PREVIEWS[product.slug]}</div>

                <div className="hero__preview-actions">
                  <Link className="btn btn--primary btn--sm" href="/contact">
                    Book a Demo
                  </Link>
                  <Link className="btn btn--ghost btn--sm" href={product.href}>
                    See Product
                    <ArrowRight />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
