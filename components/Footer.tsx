import Link from 'next/link';
import { contactInfo } from '@/lib/content';
import { Twitter, LinkedIn, GitHub } from '@/components/Icons';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Outbound Agents', href: '/platform' },
      { label: 'Inbound Agents', href: '/platform' },
      { label: 'Conversational AI', href: '/platform' },
      { label: 'Analytics', href: '/platform' },
      { label: 'Integrations', href: '/platform' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
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
            <Link className="brand" href="/">
              <span className="brand__mark" aria-hidden="true">
                <img src="/assets/logo.png" alt="" />
              </span>
              Voice AI
            </Link>
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
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
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
            <Link href="/contact">Book a demo</Link>
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
