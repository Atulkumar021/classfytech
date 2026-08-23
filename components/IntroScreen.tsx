'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { finishIntro, introAlreadySeen, introElapsedMs } from '@/lib/intro';

/**
 * How long the sequence plays before it starts lifting. The last beats (boot
 * log, waveform) land around 3.3s; the remainder holds on the finished
 * composition — the radar sweep, reticle rings and waveform keep moving
 * through it — before the curtain goes up.
 */
const PLAY_MS = 4800;
/** Exit fade length. */
const FADE_MS = 620;
/** Total time from first paint until the overlay is visually gone. */
const TOTAL_MS = PLAY_MS + FADE_MS;
/**
 * Keyframes name of the CSS auto-lift in globals.css. We unmount when *it*
 * ends rather than on a timer of our own: the CSS clock starts at the
 * element's first paint while any JS timer starts at the head script, and the
 * gap between them was cutting the overlay off mid-fade. Rename in lockstep.
 */
const AUTOLIFT = 'intro-autolift';
/**
 * Safety net only, in case the auto-lift never runs (unsupported/cancelled) and
 * its events never arrive. Deliberately slack enough never to pre-empt the CSS.
 */
const FALLBACK_MS = TOTAL_MS + 2000;

// Deterministic (never Math.random) so the server and client render the same
// markup — random values here would be a hydration mismatch.
const PARTICLES = [
  { left: '8%', top: '18%', size: 3, delay: 0.15 },
  { left: '92%', top: '24%', size: 2, delay: 0.35 },
  { left: '18%', top: '78%', size: 4, delay: 0.25 },
  { left: '82%', top: '72%', size: 3, delay: 0.5 },
  { left: '50%', top: '8%', size: 2, delay: 0.4 },
  { left: '30%', top: '38%', size: 2, delay: 0.6 },
  { left: '70%', top: '55%', size: 3, delay: 0.3 },
  { left: '12%', top: '50%', size: 2, delay: 0.55 },
  { left: '88%', top: '46%', size: 2, delay: 0.2 },
  { left: '42%', top: '88%', size: 3, delay: 0.45 },
];

const WAVE_BARS = 28;

/** Split so each glyph can be revealed on its own delay. */
const WORD = 'Voice ';
const WORD_ACCENT = 'AI';
/** Wordmark reveal starts here; each letter follows `LETTER_STEP` behind. */
const WORD_DELAY = 1.05;
const LETTER_STEP = 0.055;

// Decorative HUD chrome. Kept to things the site actually claims elsewhere
// rather than invented metrics.
const BOOT_LINES = [
  'Loading speech models',
  'Connecting telephony',
  'Calibrating voice persona',
  'Agent ready',
];
const BOOT_START = 1.85;
const BOOT_STEP = 0.26;

export default function IntroScreen() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Seeded from the route so the server-rendered HTML is already correct: the
  // overlay exists on the homepage and is absent everywhere else. Combined with
  // the blocking script in <head>, a first-time visitor never sees a flash of
  // the site before the intro, and nobody landing on /pricing from search gets
  // an intro at all.
  const [visible, setVisible] = useState(isHome);
  const [closing, setClosing] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearScrollLock = useCallback(() => {
    document.documentElement.style.overflow = '';
  }, []);

  /** Unmounts the overlay and lets everything waiting on it proceed. */
  const finish = useCallback(() => {
    setVisible(false);
    clearScrollLock();
    finishIntro();
  }, [clearScrollLock]);

  /** Skip button — cancels the CSS auto-lift and fades out immediately. */
  const skip = useCallback(() => {
    setClosing(true);
    clearScrollLock();
    // Cancelling an animation fires no `animationend`, so this path owns its
    // own unmount; the duration matches the `.is-closing` transition.
    timers.current.push(setTimeout(finish, FADE_MS));
  }, [clearScrollLock, finish]);

  // Animation events bubble, so filter to the auto-lift on this element and
  // ignore the dozens fired by the decorative layers inside it.
  const isAutolift = (e: React.AnimationEvent<HTMLElement>) =>
    e.animationName === AUTOLIFT && e.target === e.currentTarget;

  /** Curtain has started lifting — let the page underneath be usable already. */
  const handleAnimationStart = (e: React.AnimationEvent<HTMLElement>) => {
    if (isAutolift(e)) clearScrollLock();
  };

  /** Curtain is fully gone — drop the node. */
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    if (isAutolift(e)) finish();
  };

  useEffect(() => {
    // Read the media query directly rather than via `useReducedMotion()`: that
    // hook reports `false` on first render and only corrects itself in an
    // effect, which is too late for this one-shot mount-time decision — the
    // intro would play before the real value arrived.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elapsed = introElapsedMs();

    // Decided once on mount — the intro is a session-level event, so later route
    // changes must not restart it. `elapsed >= TOTAL_MS` covers slow hydration:
    // CSS has already lifted the overlay on its own, so drop it without
    // re-locking a page the visitor can use by now.
    if (!isHome || prefersReduced || introAlreadySeen() || elapsed >= TOTAL_MS) {
      setVisible(false);
      finishIntro();
      return;
    }

    // Only hold the page still while the overlay actually covers it — if we
    // mounted mid-fade the reveal is already underway.
    const html = document.documentElement;
    if (elapsed < PLAY_MS) {
      html.style.overflow = 'hidden';
      skipRef.current?.focus();
    }

    // Normal dismissal rides the CSS auto-lift's own animationend (see
    // AUTOLIFT); this is only a backstop for when that never arrives.
    timers.current.push(setTimeout(finish, FALLBACK_MS));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      clearScrollLock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  // Timings flow from the constants above into CSS so the JS cleanup and the
  // CSS animation can't drift apart. They're inline (not in the stylesheet) so
  // the server-rendered overlay still self-dismisses with no JS at all.
  const timing = {
    '--intro-play': `${PLAY_MS}ms`,
    '--intro-fade': `${FADE_MS}ms`,
  } as CSSProperties;

  const letters = [
    ...[...WORD].map((ch, i) => ({ ch, i, accent: false })),
    ...[...WORD_ACCENT].map((ch, i) => ({ ch, i: WORD.length + i, accent: true })),
  ];

  return (
    <section
      className={`intro ${closing ? 'is-closing' : ''}`}
      style={timing}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      aria-label="Voice AI intro animation"
    >
      <div className="intro__bg" aria-hidden="true" />
      <div className="intro__floor" aria-hidden="true" />
      <div className="intro__grid" aria-hidden="true" />
      <div className="intro__scan" aria-hidden="true" />

      <div className="intro__reticle" aria-hidden="true">
        <span className="intro__ring intro__ring--1" />
        <span className="intro__ring intro__ring--2" />
        <span className="intro__ring intro__ring--3" />
        <span className="intro__ring--dash intro__ring--dash-a" />
        <span className="intro__ring--dash intro__ring--dash-b" />
        <span className="intro__sweep" />
        <span className="intro__glow" />
      </div>

      <div className="intro__particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="intro__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="intro__vignette" aria-hidden="true" />

      <div className="intro__hud" aria-hidden="true">
        <span className="intro__bracket intro__bracket--tl" />
        <span className="intro__bracket intro__bracket--tr" />
        <span className="intro__bracket intro__bracket--bl" />
        <span className="intro__bracket intro__bracket--br" />
        <span className="intro__hud-label intro__hud-label--tl">Classify Technology</span>
        <span className="intro__hud-label intro__hud-label--tr">40+ Languages</span>
        <span className="intro__hud-label intro__hud-label--bl">Inbound + Outbound</span>
      </div>

      <div className="intro__center">
        <p className="intro__eyebrow">
          <span className="intro__eyebrow-dot" aria-hidden="true" />
          AI Voice Agents That Sound Human
        </p>

        <div className="intro__mark-wrap">
          <span className="intro__mark-halo" aria-hidden="true" />
          <span className="intro__mark" aria-hidden="true">
            <img src="/assets/logo-mark.png" alt="" />
          </span>
        </div>

        {/* Split into per-letter spans for the stagger; the accessible name
            comes from the section's aria-label, so this is decorative. */}
        <p className="intro__word" aria-hidden="true">
          {letters.map(({ ch, i, accent }) => (
            <span
              key={i}
              className={`intro__letter ${accent ? 'gradient-text' : ''}`}
              style={{ animationDelay: `${WORD_DELAY + i * LETTER_STEP}s` }}
            >
              {ch}
            </span>
          ))}
        </p>

        <p className="intro__tagline">by Classify Technology</p>

        <ul className="intro__boot" aria-hidden="true">
          {BOOT_LINES.map((line, i) => (
            <li key={line} style={{ animationDelay: `${BOOT_START + i * BOOT_STEP}s` }}>
              {line}
            </li>
          ))}
        </ul>

        <div className="intro__wave" aria-hidden="true">
          {Array.from({ length: WAVE_BARS }).map((_, i) => (
            <span
              key={i}
              className="intro__wave-bar"
              style={{ animationDelay: `${(i % 9) * 0.08}s` }}
            />
          ))}
        </div>
      </div>

      <p className="intro__readout" aria-hidden="true">
        Initializing voice engine
      </p>

      <div className="intro__progress" aria-hidden="true">
        <span />
      </div>

      <button ref={skipRef} type="button" className="intro__skip" onClick={skip}>
        Skip intro
      </button>
    </section>
  );
}
