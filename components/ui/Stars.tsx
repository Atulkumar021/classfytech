/**
 * A star rating.
 *
 * Drawn as two copies of the same row of stars — a dim one underneath, a
 * coloured one on top clipped to the score's width. That handles half stars
 * (and any fraction, which matters for an average like 4.3) without needing a
 * separate half-star glyph, and it degrades to a plain row of characters if
 * the CSS never loads.
 *
 * Only the wrapper is exposed to assistive tech: the stars themselves are
 * decorative, and `aria-label` carries the number, because "★★★★☆" read aloud
 * one character at a time is noise.
 */
export default function Stars({
  value,
  /** `sm` for inline use in a review header, `lg` for the summary score. */
  size = 'sm',
  label,
}: {
  value: number;
  size?: 'sm' | 'lg';
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const pct = (clamped / 5) * 100;

  return (
    <span
      className={`stars stars--${size}`}
      role="img"
      aria-label={label ?? `${clamped} out of 5 stars`}
    >
      <span className="stars__track" aria-hidden="true">
        ★★★★★
      </span>
      <span className="stars__fill" style={{ width: `${pct}%` }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}
