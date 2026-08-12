import { contactInfo } from '@/lib/content';
import { Twitter, LinkedIn, GitHub } from '@/components/Icons';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Outbound Agents', href: '#services' },
      { label: 'Inbound Agents', href: '#services' },
      { label: 'Conversational AI', href: '#services' },
      { label: 'Analytics', href: '#services' },
      { label: 'Integrations', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Solutions', href: '#work' },
      { label: 'How It Works', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a className="brand" href="#top">
              <span className="brand__mark" aria-hidden="true">
                <img src="/assets/logo.png" alt="" />
              </span>
              Voice AI
            </a>
            <p className="footer__about">
              Human-like AI voice agents for inbound and outbound calls — lead qualification,
              appointment booking and customer support, 24/7 in 40+ languages.
            </p>
            <div className="footer__socials">
              <a
                className="icon-btn"
                href="https://twitter.com/classifytechin"
                aria-label="Classify Technology on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter width={18} height={18} />
              </a>
              <a
                className="icon-btn"
                href="https://www.linkedin.com/company/classify-technology"
                aria-label="Classify Technology on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn width={18} height={18} />
              </a>
              <a
                className="icon-btn"
                href="https://github.com/classifytechnology"
                aria-label="Classify Technology on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub width={18} height={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div className="footer__col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((link) => (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="footer__col">
            <h4>Get in touch</h4>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <a href={`tel:${contactInfo.phoneHref}`}>{contactInfo.phoneDisplay}</a>
            <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="#contact">Book a demo</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Voice AI, a product of Classify Technology. All rights reserved.</span>
          <span>Outbound Agents · Inbound Agents · Analytics · Integrations</span>
        </div>
      </div>
    </footer>
  );
}
