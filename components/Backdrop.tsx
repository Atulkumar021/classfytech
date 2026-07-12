/**
 * Backdrop — the fixed, full-viewport atmosphere behind all content:
 * three drifting aurora blobs, an animated film-grain layer, and a vignette.
 * Pure CSS/markup (no client JS), sits at z-index -3.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__aurora backdrop__aurora--1" />
      <div className="backdrop__aurora backdrop__aurora--2" />
      <div className="backdrop__aurora backdrop__aurora--3" />
      <div className="backdrop__grain" />
      <div className="backdrop__vignette" />
    </div>
  );
}
