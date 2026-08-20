'use client';

import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import VoiceCallPreview from '@/components/VoiceCallPreview';
import { ArrowRight, Calendar } from '@/components/Icons';

// Trimmed from five to three. A wall of feature pills under the CTA reads as
// filler; three carries the same message and lets the headline breathe.
const services = ['Outbound calling', 'Inbound support', '40+ languages'];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__layout">
        {/* ---------- Left: copy ---------- */}
        <div className="hero__content">
          <Reveal>
            <span className="hero__badge">Voice AI by Classify Technology</span>
          </Reveal>

          <Reveal as="h1" delay={35}>
            AI voice agents that call, answer and{' '}
            <span className="gradient-text">close for you</span>.
          </Reveal>

          <Reveal as="p" delay={70} className="hero__sub">
            Voice AI makes outbound calls and answers inbound ones — qualifying leads, booking
            meetings and resolving support questions in a natural, human-like voice, 24/7, in
            40+ languages.
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

          <Reveal delay={140} className="hero__services">
            {services.map((service) => (
              <span className="hero__service-pill" key={service}>
                {service}
              </span>
            ))}
          </Reveal>

          {/* Was a stack of fake initial-avatars plus ★★★★★ and "Rated 4.9/5" —
              the most recognisable stock-template social proof there is, and
              not attributable to anyone real. One plain sentence instead. */}
          <Reveal delay={170} className="hero__proof">
            <p className="hero__proof-text">
              Trusted by sales and support teams to handle live calls every day.
            </p>
          </Reveal>
        </div>

        {/* ---------- Right: visual stage — a live-looking AI call, front
             and center with nothing competing for attention around it ---------- */}
        <Reveal delay={110} className="hero__visual">
          <div className="hero__stage">
            <div className="hero__stage-glow" aria-hidden="true" />
            <div className="hero__card-wrap">
              <p className="hero__stage-caption">
                <span className="hero__stage-caption-dot" aria-hidden="true" />
                Watch a live Voice AI call unfold, in real time
              </p>
              <VoiceCallPreview />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
