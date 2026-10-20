import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { contactInfo } from '@/lib/content';
import { PhoneCall, WhatsApp } from '@/components/Icons';

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
          {/* Three routes, three destinations. Both buttons here used to go
              to /contact, so whichever one you pressed you got the same form. */}
          <div className="hero__cta">
            <Link className="btn btn--primary" href="/contact">
              Book a free demo
            </Link>
            <a className="btn btn--ghost" href={`tel:${contactInfo.phoneHref}`}>
              <PhoneCall />
              {contactInfo.phoneDisplay}
            </a>
            <a
              className="btn btn--ghost"
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
