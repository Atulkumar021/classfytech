'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import { INTRO_DONE_EVENT, isIntroFinished } from '@/lib/intro';
import { Close, Send } from '@/components/Icons';

type Status = { message: string; state: 'idle' | 'error' | 'pending' | 'success' };

// Small delay before showing so the page gets a beat to paint first — an
// instant popup on first paint reads as jarring rather than a real welcome.
const OPEN_DELAY_MS = 900;

const COUNTRY_CODES = [
  { code: '+1', flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+91', flag: '🇮🇳' },
  { code: '+61', flag: '🇦🇺' },
  { code: '+971', flag: '🇦🇪' },
];

export default function DemoModal() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>({ message: '', state: 'idle' });
  const [submitting, setSubmitting] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const schedule = () => {
      id = setTimeout(() => setOpen(true), reduced ? 0 : OPEN_DELAY_MS);
    };

    // Don't open behind the intro overlay — wait for it to lift first. Checked
    // synchronously because if the intro is already done the event has fired
    // and will never fire again.
    if (isIntroFinished()) {
      schedule();
      return () => clearTimeout(id);
    }
    window.addEventListener(INTRO_DONE_EVENT, schedule, { once: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener(INTRO_DONE_EVENT, schedule);
    };
  }, [reduced]);

  // Lock background scroll and trap focus while the dialog is open; restore
  // both cleanly on close.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      lastFocused.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const countryCode = String(data.get('countryCode') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const remark = String(data.get('remark') || '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Every field here is mandatory.
    if (!name || !emailOk || !phone || !remark) {
      setStatus({ message: 'Please fill in your name, email, mobile number and remark.', state: 'error' });
      return;
    }

    setStatus({ message: 'Sending…', state: 'pending' });
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'demo', name, email, countryCode, phone, remark }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }
      setStatus({
        message: `Thanks, ${name.split(' ')[0]}! We'll be in touch within one business day.`,
        state: 'success',
      });
      form.reset();
    } catch (err) {
      setStatus({
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        state: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="demo-modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div
        className="demo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        <div className="demo-modal__head">
          <button
            ref={closeRef}
            type="button"
            className="demo-modal__close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <Close width={18} height={18} />
          </button>

          <span className="eyebrow">Done-for-you</span>
          <h2 id="demo-modal-title" className="demo-modal__title">
            Let us build your voice agent
          </h2>
          <p className="demo-modal__sub">
            Building good voice agents is nuanced. Tell us what you need and we&apos;ll take it
            end-to-end.
          </p>
        </div>

        <div className="demo-modal__body">
          <form className="demo-modal__form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="dm-name">Name</label>
              <input id="dm-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
            </div>
            <div className="field">
              <label htmlFor="dm-email">Email</label>
              <input id="dm-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>

            <div className="field field--full">
              <label htmlFor="dm-phone">Mobile number</label>
              <div className="phone-field">
                <select aria-label="Country code" name="countryCode" defaultValue="+1">
                  {COUNTRY_CODES.map(({ code, flag }) => (
                    <option key={code} value={code}>
                      {flag} {code}
                    </option>
                  ))}
                </select>
                <input id="dm-phone" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" required />
              </div>
            </div>

            <div className="field field--full">
              <label htmlFor="dm-remark">Remark</label>
              <textarea
                id="dm-remark"
                name="remark"
                placeholder="Tell us what you need…"
                required
              />
            </div>

            <button className="btn btn--primary btn--block field--full" type="submit" disabled={submitting}>
              Get My Free Demo
              <Send />
            </button>
            <p className="form__status field--full" data-state={status.state} role="status" aria-live="polite">
              {status.message}
            </p>
          </form>

          <button type="button" className="demo-modal__later" onClick={() => setOpen(false)}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
