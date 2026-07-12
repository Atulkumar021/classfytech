'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/content';
import { useReducedMotion } from '@/lib/hooks';
import { ChevronLeft, ChevronRight } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (i: number) => setIndex(((i % testimonials.length) + testimonials.length) % testimonials.length),
    []
  );

  // Auto-advance unless the user prefers reduced motion.
  useEffect(() => {
    if (reduced) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduced]);

  const pause = () => timer.current && clearInterval(timer.current);
  const resume = () => {
    if (reduced) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5500);
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section__title">
            What our <span className="gradient-text">clients say</span>
          </h2>
        </Reveal>

        <Reveal className="glass testimonials" onMouseEnter={pause} onMouseLeave={resume}>
          <div className="testimonials__viewport">
            <div
              className="testimonials__track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t) => (
                <figure className="testimonial" key={t.name}>
                  <div className="testimonial__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className="testimonial__quote">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="testimonial__person">
                    <span className="testimonial__avatar">{t.initials}</span>
                    <span className="testimonial__meta">
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="testimonials__controls">
            <button
              className="icon-btn"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft width={18} height={18} />
            </button>
            <div className="testimonials__dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  className={`testimonials__dot ${i === index ? 'is-active' : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button
              className="icon-btn"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
            >
              <ChevronRight width={18} height={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
