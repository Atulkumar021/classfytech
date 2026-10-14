import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export default function CTABand() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="glass cta-band">
          <h2>
            Want to <span className="gradient-text">hear one</span>?
          </h2>
          <p>
            Tell us what your calls sound like and we will build that flow and ring you with it.
            Twenty minutes, no slides, and you will know fairly quickly whether this is for you.
          </p>
          <div className="hero__cta">
            <Link className="btn btn--primary" href="/contact">
              Book a Free Demo
            </Link>
            <Link className="btn btn--ghost" href="/contact">
              Talk to Sales
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
