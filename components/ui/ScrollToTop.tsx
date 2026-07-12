'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from '@/components/Icons';

/**
 * Floating "back to top" button for the long single-page layout. It appears
 * once the user has scrolled past the hero. It's a plain hash link to #top, so
 * the global Lenis click handler smooth-scrolls it for free (and reduced-motion
 * users get a native jump).
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // rAF-throttled so this only reads/sets state once per painted frame
    // rather than on every native scroll event.
    let ticking = false;
    const apply = () => {
      ticking = false;
      setVisible(window.scrollY > 700);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`scroll-top ${visible ? 'is-visible' : ''}`}
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp width={20} height={20} />
    </a>
  );
}
