'use client';

import { useEffect } from 'react';

/**
 * One scroll lock for the whole app.
 *
 * Why this exists
 * ---------------
 * Three components used to hold the page still independently — the intro
 * curtain, the demo dialog and the mobile nav drawer — and each one did it the
 * same naive way:
 *
 *     const prev = document.documentElement.style.overflow;
 *     document.documentElement.style.overflow = 'hidden';
 *     // …later
 *     document.documentElement.style.overflow = prev;
 *
 * That is fine in isolation and broken the moment two of them overlap, which
 * on a phone they constantly do:
 *
 *  - The dialog opens while the intro still holds its lock, so it captures
 *    `prev = 'hidden'`. Closing the dialog "restores" `hidden` and the page is
 *    dead until a reload. This is the bug where tapping something and then
 *    dismissing it leaves you unable to scroll.
 *  - The reverse: the intro's fallback timer clears the lock with a hard
 *    `= ''`, unlocking the page underneath a dialog that is still open.
 *
 * Reference counting fixes both: the page is locked while at least one holder
 * wants it locked, and is released exactly once, when the last one lets go.
 *
 * The second half of the fix is *how* it locks. `overflow: hidden` on <html>
 * does not reliably stop iOS Safari — the body keeps scrolling under your
 * finger, and worse, the page silently loses its scroll position. Pinning the
 * body with `position: fixed` and a negative `top` is the approach that works
 * across mobile browsers; the offset is restored on release so the page comes
 * back exactly where it was.
 */

interface SavedState {
  scrollY: number;
  body: Partial<CSSStyleDeclaration>;
  htmlOverflow: string;
  htmlScrollBehavior: string;
}

/** The smooth-scroll instance, if one is running. Registered by SmoothScroll. */
interface SmoothScroller {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
}

let holders = 0;
let saved: SavedState | null = null;
let scroller: SmoothScroller | null = null;

/**
 * Lets SmoothScroll hand its Lenis instance over, so the lock can pause the
 * momentum loop. Without this, Lenis keeps writing scroll positions to a body
 * that is pinned, and the page jumps when the lock lifts.
 */
export function registerSmoothScroller(instance: SmoothScroller) {
  scroller = instance;
  // If something is already locked when smooth scroll boots, respect it.
  if (holders > 0) instance.stop();
  return () => {
    if (scroller === instance) scroller = null;
  };
}

function apply() {
  const html = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY || html.scrollTop || 0;

  saved = {
    scrollY,
    body: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    },
    htmlOverflow: html.style.overflow,
    htmlScrollBehavior: html.style.scrollBehavior,
  };

  // Desktop only: the scrollbar is about to disappear, so pad by its width to
  // stop the whole page shifting sideways as the dialog opens.
  const gutter = window.innerWidth - html.clientWidth;
  if (gutter > 0) body.style.paddingRight = `${gutter}px`;

  scroller?.stop();

  body.style.position = 'fixed';
  body.style.top = `${-scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  body.style.overflow = 'hidden';
  html.style.overflow = 'hidden';
  html.classList.add('is-scroll-locked');
}

function release() {
  if (!saved) return;
  const html = document.documentElement;
  const body = document.body;
  const { scrollY } = saved;

  Object.assign(body.style, saved.body);
  html.style.overflow = saved.htmlOverflow;
  html.classList.remove('is-scroll-locked');

  // `html { scroll-behavior: smooth }` would animate this restore into a
  // visible scroll-back. Suppress it for the one frame it takes to land.
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, scrollY);
  html.style.scrollBehavior = saved.htmlScrollBehavior;

  // Lenis tracks its own position; tell it where we actually are before
  // resuming, or the first wheel event snaps back to where it left off.
  scroller?.scrollTo(scrollY, { immediate: true });
  scroller?.start();

  saved = null;
}

/** Take a lock. Safe to call from anywhere; pair with `releaseScrollLock`. */
export function acquireScrollLock() {
  holders += 1;
  if (holders === 1) apply();
}

/** Give a lock back. Over-releasing is ignored rather than throwing. */
export function releaseScrollLock() {
  if (holders === 0) return;
  holders -= 1;
  if (holders === 0) release();
}

/**
 * An idempotent handle for imperative callers.
 *
 * The intro curtain locks on mount and can unlock from any of four places
 * (animation start, animation end, the skip button, effect cleanup), several
 * of which routinely fire for the same dismissal. A handle makes those extra
 * calls harmless — without it the refcount would go negative and unlock the
 * page out from under whatever else was holding it.
 */
export function createScrollLockHandle() {
  let held = false;
  return {
    acquire() {
      if (held) return;
      held = true;
      acquireScrollLock();
    },
    release() {
      if (!held) return;
      held = false;
      releaseScrollLock();
    },
  };
}

/** Declarative form: holds the lock for as long as `active` is true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    acquireScrollLock();
    return releaseScrollLock;
  }, [active]);
}
