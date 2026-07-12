'use client';

import dynamic from 'next/dynamic';
import Counter from '@/components/ui/Counter';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight, Calendar, Chart, Star, Shield } from '@/components/Icons';

// WebGL only exists in the browser — load the canvas client-side, no SSR.
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

const services = ['Web Development', 'Mobile Apps', 'AI Solutions', 'Custom Software', 'Cloud'];
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
              Now accepting new projects
            </span>
          </Reveal>

          <Reveal as="h1" delay={35}>
            We build websites, mobile apps and AI solutions that{' '}
            <span className="gradient-text">grow your business</span>.
          </Reveal>

          <Reveal as="p" delay={70} className="hero__sub">
            A full-service software and digital studio. We design, build and scale high-converting
            websites, mobile apps, AI automation and custom platforms — engineered to move the
            metrics that matter to your business.
          </Reveal>

          <Reveal delay={100} className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Start Your Project
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href="#contact">
              <Calendar />
              Book a Free Consultation
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
              Rated <strong>4.9/5</strong> by <strong>250+</strong> businesses worldwide
            </p>
          </Reveal>
        </div>

        {/* ---------- Right: visual stage ---------- */}
        <Reveal delay={110} className="hero__visual">
          <div className="hero__stage">
            <HeroCanvas />

            <div className="hero__metric hero__metric--1">
              <span className="hero__metric-icon">
                <Chart />
              </span>
              <span>
                <span className="val">
                  +<Counter value={180} suffix="%" />
                </span>
                <br />
                <span className="lbl">Avg. growth</span>
              </span>
            </div>

            <div className="hero__metric hero__metric--2">
              <span className="hero__metric-icon">
                <Star />
              </span>
              <span>
                <span className="val">
                  <Counter value={4.9} decimals={1} />★
                </span>
                <br />
                <span className="lbl">Client rating</span>
              </span>
            </div>

            <div className="hero__metric hero__metric--3">
              <span className="hero__metric-icon">
                <Shield />
              </span>
              <span>
                <span className="val">
                  <Counter value={250} suffix="+" />
                </span>
                <br />
                <span className="lbl">Projects shipped</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
