/**
 * Shared state for the cinematic intro overlay.
 *
 * The intro plays once per browser session (not per page load) — the site is
 * multi-page now, so replaying it on every navigation would be hostile.
 */

const SEEN_KEY = 'voiceai:intro-seen';

/** Fired on `window` once the intro is out of the way. */
export const INTRO_DONE_EVENT = 'voiceai:intro-done';

declare global {
  interface Window {
    /** Set by the blocking head script — see `INTRO_BLOCKING_SCRIPT`. */
    __voiceaiIntroStart?: number;
  }
}

/**
 * Milliseconds since the intro first painted.
 *
 * The overlay is server-rendered, so its CSS animations begin at first paint —
 * but React only mounts (and can start a dismiss timer) after hydration. On a
 * slow connection that gap would leave a finished, frozen intro on screen, so
 * the dismiss delay is measured from the timestamp the head script recorded
 * rather than from mount.
 */
export function introElapsedMs(): number {
  const start = window.__voiceaiIntroStart;
  return typeof start === 'number' ? Date.now() - start : 0;
}

/**
 * Module-level rather than React state: something mounting *after* the intro
 * has already finished needs a synchronous answer, because the done event has
 * already fired and will never fire again.
 */
let finished = false;

export function isIntroFinished(): boolean {
  return finished;
}

/** True if the intro already played this session. */
export function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    // Storage blocked (private mode / embedded webview). Treat it as "seen" so
    // we never trap someone in an intro we have no way of remembering.
    return true;
  }
}

/** Marks the intro done for this session and notifies anything waiting on it. */
export function finishIntro(): void {
  if (finished) return;
  finished = true;
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Non-fatal — the in-memory flag still prevents a replay this page view.
  }
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

/**
 * The inline script the layout runs in <head>, before first paint. It stamps
 * the start time (see `introElapsedMs`) and hides the overlay on repeat
 * navigations so they never flash it. Mirrors `introAlreadySeen()` — including
 * its fallback — and only hides; React still owns dismissing it.
 */
export const INTRO_BLOCKING_SCRIPT = `window.__voiceaiIntroStart=Date.now();try{if(sessionStorage.getItem('${SEEN_KEY}')==='1')document.documentElement.classList.add('intro-seen')}catch(e){document.documentElement.classList.add('intro-seen')}`;
