'use client';

import { useEffect, useRef, useState } from 'react';

/** True if the user has requested reduced motion. SSR-safe (defaults false). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/**
 * Reveal-on-scroll. Returns a ref to attach and a boolean that flips true once
 * the element scrolls into view (once — it then stops observing).
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options ?? { threshold: 0.01, rootMargin: '0px 0px 120px 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}

/**
 * Like `useInView`, but keeps tracking — flips back to `false` once the
 * element leaves the viewport instead of disconnecting after the first
 * intersection. Used to pause expensive work (e.g. a WebGL render loop)
 * while it's scrolled off-screen.
 */
export function useIsIntersecting<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      options ?? { rootMargin: '200px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}

/** Tracks the currently active section id for scroll-spy nav highlighting. */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
