/**
 * The NiaTalks lockup.
 *
 * Two files, not one. The supplied artwork sets "Nia" and the shaded half of
 * the N in a very dark green (~#002010) — which measures about 1.7:1 against
 * the dark theme's #22252b and is, in practice, invisible. The dark variant
 * has that one colour family lifted to a near-white while the bright green is
 * left exactly as drawn, so the mark keeps its two-tone identity in both
 * themes. (Both are generated from the same source art; see the note in the
 * repo's asset script.)
 *
 * Both <img>s are always in the DOM and swapped by CSS on the theme attribute
 * rather than picked in JS. Choosing in JS would mean the server can't know
 * which one to render, so the wrong logo would paint for a frame on every
 * load — the exact flash `next-themes` exists to avoid.
 *
 * `width`/`height` are the intrinsic ratio of the art (1997x418 and 512x512),
 * present so the browser reserves the right box before the image decodes and
 * the header doesn't jump on first paint.
 */
export default function Logo({
  /** `lockup` is mark + wordmark; `mark` is the N on its own. */
  variant = 'lockup',
  className = '',
}: {
  variant?: 'lockup' | 'mark';
  className?: string;
}) {
  if (variant === 'mark') {
    return (
      <img
        className={`logo logo--mark ${className}`.trim()}
        src="/assets/logo-mark.png"
        alt=""
        width={512}
        height={512}
        loading="eager"
      />
    );
  }

  return (
    <span className={`logo logo--lockup ${className}`.trim()}>
      <img
        className="logo__img logo__img--light"
        src="/assets/logo-lockup.png"
        alt="NiaTalks"
        width={1997}
        height={418}
        loading="eager"
      />
      <img
        className="logo__img logo__img--dark"
        src="/assets/logo-lockup-dark.png"
        alt=""
        aria-hidden="true"
        width={1997}
        height={418}
        loading="eager"
      />
    </span>
  );
}
