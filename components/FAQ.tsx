'use client';

import { useState } from 'react';
import { faqs } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

// Describes the FAQ content already rendered below so search engines can
// show it as a rich "People also ask"-style result. Kept in sync with
// `faqs` automatically since it's generated from the same array.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FAQ() {
  // Single-open accordion; null means all collapsed.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section section--page-top" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">FAQ</span>
          <h1 className="section__title">
            About <span className="gradient-text">Voice AI</span>
          </h1>
        </Reveal>

        <Reveal className="faq">
          {faqs.map((faq, i) => {
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
