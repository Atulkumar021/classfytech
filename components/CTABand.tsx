import Reveal from '@/components/ui/Reveal';

export default function CTABand() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="glass cta-band">
          <h2>
            Ready to start your <span className="gradient-text">next project</span>?
          </h2>
          <p>
            Book a free, no-obligation consultation and we&apos;ll show you exactly how we&apos;d
            bring your idea to life.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Start Your Project
            </a>
            <a className="btn btn--ghost" href="#contact">
              Book a Free Consultation
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
