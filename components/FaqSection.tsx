'use client';

import { useState } from 'react';
import type { Faq } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

/**
 * Accordion FAQ, driven by data so each product answers its own questions.
 *
 * Emits FAQPage structured data for the questions it renders, which is what
 * makes these eligible for rich results in search.
 */
export default function FaqSection({
  id = 'faq',
  eyebrow,
  title,
  accent,
  subtitle,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  items: Faq[];
}) {
  // Single-open accordion; null means all collapsed.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="section" id={id}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title">
            {title}
            {accent && <span className="gradient-text">{accent}</span>}
          </h2>
          {subtitle && <p className="section__subtitle">{subtitle}</p>}
        </Reveal>

        <Reveal className="faq">
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`card faq__item ${isOpen ? 'is-open' : ''}`} key={faq.question}>
                <button
                  className="faq__question"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  {faq.question}
                  <span className="faq__icon" aria-hidden="true" />
                </button>
                <div className="faq__answer">
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
