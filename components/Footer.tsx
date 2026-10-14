import Link from 'next/link';
import { companyInfo, contactInfo } from '@/lib/content';
import { Twitter, LinkedIn, GitHub } from '@/components/Icons';
import Logo from '@/components/ui/Logo';

// Each product page holds all of its sections, so these deep-link to anchors
// on that page rather than to sub-pages.
const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Voice AI', href: '/voice-ai' },
      { label: 'Dialer', href: '/dialer' },
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
    // product), so this is where both sit side by side.
    title: 'Pricing',
    links: [
      { label: 'Voice AI pricing', href: '/voice-ai#pricing' },
      { label: 'Dialer pricing', href: '/dialer#pricing' },
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
            <Link className="brand" href="/" aria-label="NiaTalks home">
              <Logo />
            </Link>
            <p className="footer__about">
              AI that talks to your customers — voice agents for inbound and outbound calls, and an
              outbound dialer that gives your calling team one screen for every conversation.
            </p>
            <div className="footer__socials">
              <a
                className="icon-btn"
                href="https://twitter.com/classifytechin"
                aria-label="NiaTalks on Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter width={18} height={18} />
              </a>
              <a
                className="icon-btn"
                href="https://www.linkedin.com/company/classify-technology"
                aria-label="NiaTalks on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn width={18} height={18} />
              </a>
              <a
                className="icon-btn"
                href="https://github.com/classifytechnology"
                aria-label="NiaTalks on GitHub"
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

        {/* Statutory block. NiaTalks is the brand people recognise, but the
            entity that contracts, invoices and is sued is the private limited
            company — so it is named in full here, with the registered office
            and whichever statutory identifiers have been filled in. */}
        <div className="footer__legal">
          <strong>{companyInfo.legalName}</strong>
          <span>
            A private limited company incorporated in {companyInfo.incorporatedIn}. NiaTalks is a
            product brand of {companyInfo.legalNameShort}
          </span>
          <dl>
            <div>
              <dt>Registered office</dt>
              <dd>{companyInfo.registeredOffice}</dd>
            </div>
            {/* Rendered only once a real number is set in lib/content.ts —
                a placeholder CIN or GSTIN on a live site is a false
                statutory disclosure, not a styling detail. */}
            {companyInfo.cin && (
              <div>
                <dt>CIN</dt>
                <dd>{companyInfo.cin}</dd>
              </div>
            )}
            {companyInfo.gstin && (
              <div>
                <dt>GSTIN</dt>
                <dd>{companyInfo.gstin}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="footer__bottom">
          {/* No full stop after the name — `legalNameShort` already ends in
              "Ltd." and the two together rendered as "Ltd.. All rights". */}
          <span>
            © {year} {companyInfo.legalNameShort} · All rights reserved.
          </span>
          <span>Voice AI · Dialer</span>
        </div>
      </div>
    </footer>
  );
}
