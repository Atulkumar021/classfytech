import { contactInfo } from '@/lib/content';
import { Twitter, LinkedIn, GitHub } from '@/components/Icons';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Mobile Apps', href: '#services' },
      { label: 'AI Development', href: '#services' },
      { label: 'Custom Software', href: '#services' },
      { label: 'Cloud & DevOps', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Work', href: '#work' },
      { label: 'Process', href: '#process' },
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
              Classify
            </a>
            <p className="footer__about">
              A full-service software agency building websites, mobile apps, AI solutions and
              cloud infrastructure for ambitious businesses.
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
            <a href="#contact">Start a project</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Classify Technology. All rights reserved.</span>
          <span>Websites · Mobile Apps · AI Solutions · Cloud</span>
        </div>
      </div>
    </footer>
  );
}
