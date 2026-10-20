import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { contactInfo } from '@/lib/content';
import { ArrowRight, PhoneCall, WhatsApp } from '@/components/Icons';

/**
 * A slim prompt to drop at the end of a section.
 *
 * Deliberately quieter than `CTABand` (the big one at the bottom of every
 * page): recessed rather than raised, one line of text, smaller buttons. A
 * page that repeats the same loud banner four times trains people to scroll
 * past all of them — these are meant to read as "here is the next step from
 * what you just read", which is why each caller passes its own wording.
 *
 * The second action is a real alternative, not a second route to the same
 * form: `call` dials, `whatsapp` opens a chat. Giving someone two buttons that
 * both go to /contact is just a wider button.
 */
export default function SectionCTA({
  title,
  text,
  primaryLabel = 'Book a demo',
  primaryHref = '/contact',
  secondary = 'call',
}: {
  title: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondary?: 'call' | 'whatsapp' | 'none';
}) {
  return (
    <Reveal className="section-cta">
      <div className="section-cta__text">
        <strong>{title}</strong>
        {text && <span>{text}</span>}
      </div>

      <div className="section-cta__actions">
        <Link className="btn btn--primary btn--sm" href={primaryHref}>
          {primaryLabel}
          <ArrowRight />
        </Link>

        {secondary === 'call' && (
          <a className="btn btn--ghost btn--sm" href={`tel:${contactInfo.phoneHref}`}>
            <PhoneCall />
            {contactInfo.phoneDisplay}
          </a>
        )}

        {secondary === 'whatsapp' && (
          <a
            className="btn btn--ghost btn--sm"
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp />
            WhatsApp us
          </a>
        )}
      </div>
    </Reveal>
  );
}
