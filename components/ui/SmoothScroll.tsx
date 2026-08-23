'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — buttery momentum scrolling via Lenis, plus centralised smooth
 * anchor navigation for every in-page "#" link (nav, CTAs, footer). Disabled
 * for users who prefer reduced motion (native scrolling then takes over).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // How long each glide takes to settle. Frame-rate smoothness itself comes
      // from the rAF loop below staying unblocked (see TechCanvas visibility
      // pausing and the throttled scroll listeners elsewhere in the app).
      duration: 1.5,
      // easeOutExpo — quick start, gentle settle.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // This — not `duration` — is the real "how fast does the page move"
      // control: it scales how far one wheel notch travels. At 0.85 a single
      // notch covered most of a viewport, which read as the page lurching.
      // Lower means more turns of the wheel but far more control.
      wheelMultiplier: 0.5,
      touchMultiplier: 1,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // One delegated handler smoothly scrolls any hash link to its target,
    // offset for the fixed header.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -120 });
      history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
