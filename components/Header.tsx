'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/content';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import { useScrollLock } from '@/lib/scroll-lock';

/** The destination of the header's CTA button, in both its desktop and mobile form. */
const CTA_HREF = '/contact';

/**
 * True when the current route is inside a nav item's section, so "Voice AI"
 * stays highlighted on `/voice-ai/pricing` too. An exact match alone left the
 * header with nothing active on every sub-page.
 */
function isSectionActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  // Reflect the mobile-menu state on <body> so CSS can react (matches globals),
  // and hold the page still while the drawer covers it — without this the
  // content behind the drawer stays scrollable under your finger.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  // Held through the shared manager rather than by poking `style.overflow`
  // here, so an open dialog or the intro curtain can hold it at the same time
  // without either one clobbering the other's restore. See lib/scroll-lock.
  useScrollLock(open);

  // Escape closes the drawer, matching the dialog behaviour elsewhere.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the mobile menu (and reset scroll tracking) on every navigation.
  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav">
          <Link className="brand" href="/" aria-label="NiaTalks home" onClick={close}>
            <Logo />
          </Link>

          <button
            type="button"
            className="nav__scrim"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            onClick={close}
          />

          <nav className="nav__menu" aria-label="Primary" data-lenis-prevent>
            {/* "Book a Demo" is already the CTA button in this bar (and, on a
                phone, directly below this list) — listing it as a nav link too
                put the same words on screen twice. */}
            {navLinks
              .filter((link) => link.href !== CTA_HREF)
              .map((link) => (
                <Link
                  key={link.href}
                  className={`nav__link ${isSectionActive(pathname, link.href) ? 'is-active' : ''}`}
                  href={link.href}
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}
            <Link
              className="btn btn--primary btn--sm nav__cta-mobile"
              href={CTA_HREF}
              onClick={close}
              style={{ marginTop: '1rem' }}
            >
              Book a Demo
            </Link>
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <Link className="btn btn--primary btn--sm nav__cta-desktop" href={CTA_HREF}>
              Book a Demo
            </Link>
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
