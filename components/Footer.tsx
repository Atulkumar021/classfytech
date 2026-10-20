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

/**
 * Social icons, in display order. An entry only renders when its URL is set in
 * companyInfo.social — see the note at that definition.
 */
const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedIn },
  { key: 'twitter', label: 'Twitter', Icon: Twitter },
  { key: 'github', label: 'GitHub', Icon: GitHub },
] as const;

export default function Footer() {
  const socials = SOCIAL_LINKS.map((s) => ({
    ...s,
    href: companyInfo.social[s.key],
  })).filter((s) => Boolean(s.href));

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
            {/* Only the profiles that are actually set. The handles that used
                to be hard-coded here were the old Classify Technologies ones —
                under the NiaTalks name they would have sent visitors to a
                different company. Add the real URLs in companyInfo.social and
                each icon reappears on its own. */}
            {socials.length > 0 && (
              <div className="footer__socials">
                {socials.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    className="icon-btn"
                    href={href}
                    aria-label={`${companyInfo.brand} on ${label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon width={18} height={18} />
                  </a>
                ))}
              </div>
            )}
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
            {/* The short form. The full registered address is in the statutory
                block below; repeating it verbatim here would just be the same
                four lines twice in one footer. */}
            <span className="footer__where">{contactInfo.address}</span>
            <Link href="/contact">Book a demo</Link>
          </div>
        </div>

        {/* Statutory block. NiaTalks is the brand people recognise, but the
            entity that contracts, invoices and is sued is the private limited
            company — so it is named in full here, with the registered office
            and whichever statutory identifiers have been filled in. */}
        <div className="footer__legal">
          <strong>{companyInfo.legalName}</strong>
          {/* The "X is a product brand of Y" clause only says anything when the
              two names differ. Now that the brand and the registered company
              are both NiaTalks, it read as "NiaTalks is a product brand of
              NiaTalks Pvt. Ltd." — so it is conditional. */}
          <span>
            A private limited company incorporated in {companyInfo.incorporatedIn}
            {companyInfo.legalName.startsWith(companyInfo.brand)
              ? '.'
              : `. ${companyInfo.brand} is a product brand of ${companyInfo.legalNameShort}`}
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
