'use client';

import { useMemo, useState } from 'react';
import { reviews, summariseRatings, type Review } from '@/lib/content';
import Stars from '@/components/ui/Stars';
import Reveal from '@/components/ui/Reveal';
import SectionCTA from '@/components/ui/SectionCTA';

/**
 * Ratings and reviews.
 *
 * Replaces the old auto-advancing testimonial carousel. A carousel showed one
 * quote at a time, moved on before most people finished reading, and hid how
 * many reviews there actually were — which is the first thing anyone wants to
 * know. This shows the score, how the ratings are spread, and every review at
 * once.
 *
 * ── On structured data ───────────────────────────────────────────────────
 * There is deliberately no `AggregateRating` / `Review` JSON-LD emitted here.
 * The reviews in lib/content.ts are placeholders, and marking up invented
 * reviews as real ones is both a false claim to anyone reading the search
 * result and a documented way to get rich results revoked for the whole
 * domain. When these are replaced with genuine reviews, flip REVIEWS_ARE_REAL
 * and the markup below starts emitting.
 */
const REVIEWS_ARE_REAL = false;

const FILTERS = ['All', 'Voice AI', 'Dialer'] as const;
type Filter = (typeof FILTERS)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card review">
      <header className="review__head">
        <span className="review__avatar" aria-hidden="true">
          {review.initials}
        </span>
        <span className="review__who">
          <strong>{review.name}</strong>
          <span className="review__role">
            {review.role} · {review.company}
          </span>
        </span>
      </header>

      <div className="review__rating">
        <Stars value={review.rating} label={`${review.rating} out of 5`} />
        <span className="review__product">{review.product}</span>
      </div>

      <blockquote className="review__quote">{review.quote}</blockquote>

      <footer className="review__foot">
        <time dateTime={review.date}>{formatDate(review.date)}</time>
      </footer>
    </article>
  );
}

export default function Reviews() {
  const [filter, setFilter] = useState<Filter>('All');

  const shown = useMemo(
    () => (filter === 'All' ? reviews : reviews.filter((r) => r.product === filter)),
    [filter]
  );
  // Recomputed per filter, so the headline score always describes the reviews
  // actually on screen rather than the full set.
  const summary = useMemo(() => summariseRatings(shown), [shown]);

  return (
    <section className="section" id="reviews">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Reviews</span>
          <h2 className="section__title">
            What people say <span className="gradient-text">once they have lived with it</span>
          </h2>
          <p className="section__subtitle">
            Every review we have, including the ones that are not five stars. The complaints are
            the useful part — they tell you what you would be signing up for.
          </p>
        </Reveal>

        <Reveal className="card rating-summary">
          <div className="rating-summary__score">
            <strong className="rating-summary__number">{summary.average.toFixed(1)}</strong>
            <Stars
              value={summary.average}
              size="lg"
              label={`Average rating ${summary.average.toFixed(1)} out of 5`}
            />
            <span className="rating-summary__count">
              {summary.count} {summary.count === 1 ? 'review' : 'reviews'}
              {filter !== 'All' && ` for ${filter}`}
            </span>
          </div>

          <div className="rating-summary__bars">
            {summary.distribution.map((row) => (
              <div className="rating-bar" key={row.stars}>
                <span className="rating-bar__label">
                  {row.stars} <span aria-hidden="true">★</span>
                </span>
                {/* The bar is decorative; the count beside it carries the value. */}
                <span className="rating-bar__track" aria-hidden="true">
                  <span
                    className="rating-bar__fill"
                    style={{ width: `${Math.round(row.share * 100)}%` }}
                  />
                </span>
                <span className="rating-bar__count">{row.count}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="review-filters" role="group" aria-label="Filter reviews by product">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`review-filter ${filter === f ? 'is-active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="review-filter__n">
                {f === 'All' ? reviews.length : reviews.filter((r) => r.product === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className="review-grid">
          {shown.map((review, i) => (
            <Reveal key={review.name} delay={40 + i * 45}>
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>

        {/* Straight after the social proof, while the four-star review about
            setup taking three weeks is still fresh — so the offer is to hear
            it rather than to buy. */}
        <SectionCTA
          title="Hear one yourself before you decide"
          text="No slides. We build your call flow and the agent rings you with it."
          primaryLabel="Book a demo call"
        />

        {REVIEWS_ARE_REAL && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: 'NiaTalks',
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: summariseRatings(reviews).average,
                  reviewCount: reviews.length,
                  bestRating: 5,
                  worstRating: 1,
                },
                review: reviews.map((r) => ({
                  '@type': 'Review',
                  author: { '@type': 'Person', name: r.name },
                  datePublished: r.date,
                  reviewBody: r.quote,
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: r.rating,
                    bestRating: 5,
                    worstRating: 1,
                  },
                })),
              }),
            }}
          />
        )}
      </div>
    </section>
  );
}
