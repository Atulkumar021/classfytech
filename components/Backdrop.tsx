/**
 * Backdrop — a single still wash behind all content.
 *
 * This used to layer three drifting aurora blobs, animated film grain and a
 * vignette. All of it is gone on purpose: the page reads calmer and more
 * deliberate without permanently-moving decoration behind the text, and
 * there's nothing left here to animate.
 */
export default function Backdrop() {
  return <div className="backdrop" aria-hidden="true" />;
}
