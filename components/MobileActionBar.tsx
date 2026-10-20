'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { contactInfo } from '@/lib/content';
import { PhoneCall, Calendar } from '@/components/Icons';

/**
 * Sticky call/demo bar, phones only.
 *
 * On a phone the header CTA scrolls away after the first screen and does not
 * come back until the footer, which on these pages is several thousand pixels
 * later. For a business whose main conversion is a phone call, that is the
 * whole funnel sitting off-screen for most of the visit.
 *
 * Two things keep it from being an annoyance:
 *
 *  - It is hidden while the page is scroll-locked (dialog or nav drawer open),
 *    via the `is-scroll-locked` class that lib/scroll-lock sets. Otherwise it
 *    floats above the dialog's backdrop.
 *  - It is hidden on /contact, where the page *is* the call to action and a
 *    bar pointing at the form you are already looking at is just clutter.
 *
 * `body` gets bottom padding on mobile (see globals) so the bar never covers
 * the last of the footer.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <div className="action-bar" role="group" aria-label="Contact NiaTalks">
      <a className="action-bar__btn action-bar__btn--call" href={`tel:${contactInfo.phoneHref}`}>
        <PhoneCall width={17} height={17} />
        Call now
      </a>
      <Link className="action-bar__btn action-bar__btn--demo" href="/contact">
        <Calendar width={17} height={17} />
        Book a demo
      </Link>
    </div>
  );
}
