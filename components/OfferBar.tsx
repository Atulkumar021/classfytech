import { Clock } from '@/components/Icons';

const message = '50% OFF — Limited-Time Launch Offer, Ends in 7 Days';

// Repeated enough times that the track is always wider than the viewport,
// so the CSS translateX(-50%) loop (shared with the client Marquee) never
// shows a gap, even on ultra-wide screens.
const items = Array.from({ length: 8 }, () => message);
const loop = [...items, ...items];

/**
 * OfferBar — a slim, scrolling promo strip fixed above the header announcing
 * the time-limited discount. Reuses the Marquee's infinite-scroll CSS
 * (`.marquee` / `.marquee__track` / `.marquee__item`) with its own color
 * treatment layered on via `.offer-bar` descendant selectors.
 */
export default function OfferBar() {
  return (
    <div className="offer-bar" role="status">
      <div className="marquee">
        <div className="marquee__track">
          {loop.map((text, i) => (
            <span className="marquee__item" key={i}>
              <Clock width={15} height={15} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
