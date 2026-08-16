'use client';

import { useState } from 'react';
import { contactInfo } from '@/lib/content';
import { Mail, PhoneCall, WhatsApp, Send, MapPin } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

type Status = { message: string; state: 'idle' | 'error' | 'pending' | 'success' };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ message: '', state: 'idle' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      setStatus({
        message: 'Please fill in your name, a valid email, and a message.',
        state: 'error',
      });
      return;
    }

    setStatus({ message: 'Sending…', state: 'pending' });
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'contact', name, email, service, message }),
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
    <section className="section section--page-top" id="contact">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Contact</span>
          <h1 className="section__title">
            Book Your <span className="gradient-text">Free Demo</span>
          </h1>
          <p className="section__subtitle">
            Tell us about your use case and we&apos;ll show you a live voice agent within one
            business day.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <form className="card form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" required />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required />
              </div>
              <div className="field">
                <label htmlFor="c-service">I need</label>
                <select id="c-service" name="service" defaultValue="Outbound Voice Agent">
                  <option>Outbound Voice Agent</option>
                  <option>Inbound Voice Agent</option>
                  <option>Both Inbound &amp; Outbound</option>
                  <option>Custom Integration</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-message">Tell us about your use case</label>
                <textarea id="c-message" name="message" placeholder="e.g. call volume, use case, languages needed…" required />
              </div>
              <button className="btn btn--primary btn--block" type="submit" disabled={submitting}>
                Send message
                <Send />
              </button>
              <p className="form__status" data-state={status.state} role="status" aria-live="polite">
                {status.message}
              </p>
            </form>
          </Reveal>

          <Reveal className="contact__info" delay={70}>
            <a className="card contact__row" href={`mailto:${contactInfo.email}`}>
              <span className="icon-btn">
                <Mail width={18} height={18} />
              </span>
              <span>
                <span className="lbl">Email</span>
                <br />
                <span className="val">{contactInfo.email}</span>
              </span>
            </a>
            <a className="card contact__row" href={`tel:${contactInfo.phoneHref}`}>
              <span className="icon-btn">
                <PhoneCall width={18} height={18} />
              </span>
              <span>
                <span className="lbl">Phone</span>
                <br />
                <span className="val">{contactInfo.phoneDisplay}</span>
              </span>
            </a>
            <a
              className="card contact__row"
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon-btn">
                <WhatsApp width={18} height={18} />
              </span>
              <span>
                <span className="lbl">WhatsApp</span>
                <br />
                <span className="val">Chat with us</span>
              </span>
            </a>
            <div className="card contact__row">
              <span className="icon-btn">
                <MapPin width={18} height={18} />
              </span>
              <span>
                <span className="lbl">Location</span>
                <br />
                <span className="val">{contactInfo.address}</span>
              </span>
            </div>
            <div className="contact__map">
              <iframe
                title="Our location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.1025%2C28.5273%2C77.3155%2C28.6803&layer=mapnik&marker=28.6139,77.2090"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
