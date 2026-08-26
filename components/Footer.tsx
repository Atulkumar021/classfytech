import Link from 'next/link';
import { contactInfo } from '@/lib/content';
import { Twitter, LinkedIn, GitHub } from '@/components/Icons';

// Each product page holds all of its sections, so these deep-link to anchors
// on that page rather than to sub-pages.
const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Voice AI', href: '/voice-ai' },
      { label: 'Dialer', href: '/dialer' },
      { label: 'Chatbot', href: '/chatbot' },
    ],
  },
  {
    title: 'Voice AI',
    links: [
      { label: 'Platform', href: '/voice-ai#services' },
      { label: 'How It Works', href: '/voice-ai#process' },
      { label: 'Solutions', href: '/voice-ai#solutions' },
      { label: 'Pricing', href: '/voice-ai#pricing' },
      { label: 'FAQ', href: '/voice-ai#faq' },
    ],
  },
  {
    // There's no single "Pricing" nav link (it would have to favour one
    // product), so this is where all three sit side by side.
    title: 'Pricing',
    links: [
      { label: 'Voice AI pricing', href: '/voice-ai#pricing' },
      { label: 'Dialer pricing', href: '/dialer#pricing' },
      { label: 'Chatbot pricing', href: '/chatbot#pricing' },
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
                <img src="/assets/logo-mark.png" alt="" />
              </span>
              Classify Technology
            </Link>
            <p className="footer__about">
              AI that talks to your customers — voice agents for inbound and outbound calls, an
              outbound dialer for your calling team, and an AI chat widget for your website.
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
          <span>© {year} Classify Technology. All rights reserved.</span>
          <span>Voice AI · Dialer · Chatbot</span>
        </div>
      </div>
    </footer>
  );
}
