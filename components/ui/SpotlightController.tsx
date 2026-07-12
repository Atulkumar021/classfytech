'use client';

import { useEffect } from 'react';

/**
 * SpotlightController — one document-level pointer listener that gives every
 * `.card` a cursor-follow highlight. Instead of adding a listener per card, we
 * find the card under the pointer and write `--mx`/`--my` custom properties it
 * uses in its ::after radial-gradient. Cheap, and works for cards rendered by
 * server components too. Disabled when the user prefers reduced motion.
 */
export default function SpotlightController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      ticking = false;
      const e = lastEvent;
      if (!e) return;
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>('.card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      lastEvent = e;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return null;
}
