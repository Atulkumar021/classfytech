'use client';

import { useCallback, useEffect, useState } from 'react';
import { navLinks } from '@/lib/content';
import { useScrollSpy } from '@/lib/hooks';
import ThemeToggle from '@/components/ui/ThemeToggle';

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    // Cache the scrollable height and only recompute it on resize — reading
    // `scrollHeight` is a layout-triggering call, and doing that on every
    // single scroll tick (Lenis fires them at full frame rate) causes layout
    // thrashing that fights the compositor and drops scroll fps.
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const onResize = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    // rAF-throttle so state updates (and the resulting re-render) happen at
    // most once per painted frame instead of once per native scroll event.
    let ticking = false;
    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      setProgress(scrollable > 0 ? y / scrollable : 0);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Reflect the mobile-menu state on <body> so CSS can react (matches globals).
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav">
          <a className="brand" href="#top" aria-label="Classify Technology home" onClick={close}>
            <span className="brand__mark" aria-hidden="true">
              <img src="/assets/logo.png" alt="" />
            </span>
            Classify
          </a>

          <nav className="nav__menu" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className={`nav__link ${active === link.href.slice(1) ? 'is-active' : ''}`}
                href={link.href}
                onClick={close}
              >
                {link.label}
              </a>
            ))}
            <a
              className="btn btn--primary btn--sm nav__cta-mobile"
              href="#contact"
              onClick={close}
              style={{ marginTop: '1rem' }}
            >
              Start Your Project
            </a>
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <a className="btn btn--primary btn--sm nav__cta-desktop" href="#contact">
              Start Your Project
            </a>
            <button
              className="nav__burger"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
