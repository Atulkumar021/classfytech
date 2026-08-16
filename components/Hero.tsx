'use client';

import Reveal from '@/components/ui/Reveal';
import VoiceCallPreview from '@/components/VoiceCallPreview';
import { ArrowRight, Calendar } from '@/components/Icons';

const services = ['Outbound Calling', 'Inbound Support', 'Lead Qualification', 'Appointment Booking', '40+ Languages'];
const avatars = ['PS', 'AM', 'AI', 'RM'];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__layout">
        {/* ---------- Left: copy ---------- */}
        <div className="hero__content">
          <Reveal>
            <span className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              AI voice agents that sound human
            </span>
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
            <a className="btn btn--primary" href="#contact">
              Book a Free Demo
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Calendar />
              Talk to Sales
            </a>
          </Reveal>

          <Reveal delay={140} className="hero__services">
            {services.map((service) => (
              <span className="hero__service-pill" key={service}>
                {service}
              </span>
            ))}
          </Reveal>

          <Reveal delay={170} className="hero__proof">
            <div className="hero__avatars" aria-hidden="true">
              {avatars.map((initials) => (
                <span className="hero__avatar" key={initials}>
                  {initials}
                </span>
              ))}
            </div>
            <p className="hero__proof-text">
              <span className="hero__proof-stars">★★★★★</span>
              <br />
              Rated <strong>4.9/5</strong> by sales &amp; support teams worldwide
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
