import Reveal from '@/components/ui/Reveal';

export default function CTABand() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="glass cta-band">
          <h2>
            Ready to put a <span className="gradient-text">voice agent</span> to work?
          </h2>
          <p>
            Book a free, no-obligation demo and hear a live agent handle a real call flow for
            your business.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Book a Free Demo
            </a>
            <a className="btn btn--ghost" href="#contact">
              Talk to Sales
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
