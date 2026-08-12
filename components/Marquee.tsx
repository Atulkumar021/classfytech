import { clients } from '@/lib/content';

/**
 * Infinite logo marquee. The client list is duplicated so the CSS translateX
 * animation loops seamlessly (the track scrolls exactly one copy width).
 */
export default function Marquee() {
  const loop = [...clients, ...clients];
  return (
    <div className="section" style={{ paddingBlock: 'clamp(2rem,4vw,3rem)' }}>
      <div className="container">
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-dim)',
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          Works with the tools your team already uses
        </p>
        <div className="marquee">
          <div className="marquee__track">
            {loop.map((name, i) => (
              <span className="marquee__item" key={`${name}-${i}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
