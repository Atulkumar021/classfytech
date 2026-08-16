import Link from 'next/link';
import { PhoneCall } from '@/components/Icons';

const message = 'See it in action — book a free live demo of your Voice AI agent';

// Repeated enough times that the track is always wider than the viewport,
// so the CSS translateX(-50%) loop (shared with the client Marquee) never
// shows a gap, even on ultra-wide screens.
const items = Array.from({ length: 8 }, () => message);
const loop = [...items, ...items];

/**
 * OfferBar — a slim, scrolling announcement strip fixed above the header.
 * Reuses the Marquee's infinite-scroll CSS (`.marquee` / `.marquee__track` /
 * `.marquee__item`) with its own color treatment layered on via `.offer-bar`
 * descendant selectors.
 */
export default function OfferBar() {
  return (
    <Link className="offer-bar" role="status" href="/contact">
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((text, i) => (
            <span className="marquee__item" key={i}>
              <PhoneCall width={15} height={15} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
