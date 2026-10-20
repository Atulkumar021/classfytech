'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { companyInfo, contactInfo } from '@/lib/content';
import { Mail, PhoneCall, WhatsApp, Send, MapPin } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

type Status = { message: string; state: 'idle' | 'error' | 'pending' | 'success' };

/**
 * OpenStreetMap embed centred on the registered office.
 *
 * The bbox has to be the same shape as the frame it renders into, or OSM fits
 * the box inside the frame and letterboxes the rest — an equal span in both
 * directions produced a narrow strip of map floating in a wide empty box.
 *
 * Degrees of longitude are shorter than degrees of latitude, by cos(latitude):
 * at Moradabad's 28.8°N a degree of longitude is about 97km against 111km for
 * a degree of latitude. So matching the frame's 16:9 means stretching the
 * longitude span by that ratio as well as by the aspect itself. `.contact__map`
 * pins the same 16:9 in CSS.
 */
const MAP_ASPECT = 16 / 9;
/** Half-height of the view, in degrees. ~4km top to bottom — a town-sized view. */
const MAP_LAT_SPAN = 0.018;
const { lat, lon } = companyInfo.geo;
const MAP_LON_SPAN = (MAP_LAT_SPAN * MAP_ASPECT) / Math.cos((lat * Math.PI) / 180);
const mapSrc =
  'https://www.openstreetmap.org/export/embed.html?bbox=' +
  [lon - MAP_LON_SPAN, lat - MAP_LAT_SPAN, lon + MAP_LON_SPAN, lat + MAP_LAT_SPAN]
    .map((n) => n.toFixed(4))
    .join('%2C') +
  `&layer=mapnik&marker=${lat}%2C${lon}`;

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
        body: JSON.stringify({ source: 'contact', name, email, service, message, plan: planLabel }),
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

  // Set when the visitor arrived from a pricing button. Without this the
  // plan they picked was discarded at the click — see the note on those links.
  const params = useSearchParams();
  const plan = params.get('plan');
  const product = params.get('product');
  const planLabel = plan && product ? `${plan} — ${product}` : plan || null;

  return (
    <section className="section section--page-top" id="contact">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Contact</span>
          <h1 className="section__title">
            Let&apos;s put an agent <span className="gradient-text">on your calls</span>
          </h1>
          <p className="section__subtitle">
            Tell us roughly what the call needs to do. We will build that flow and have an agent
            ring you with it, usually within a working day.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <form className="card form" onSubmit={handleSubmit} noValidate>
              {planLabel && (
                <p className="form__plan">
                  <span className="form__plan-label">Enquiring about</span>
                  <strong>{planLabel}</strong>
                </p>
              )}
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
                {/* `key` forces React to rebuild the field when the plan
                    changes, so `defaultValue` is re-read — an uncontrolled
                    textarea ignores a changed default otherwise. */}
                <textarea
                  key={planLabel || 'none'}
                  id="c-message"
                  name="message"
                  placeholder="e.g. call volume, use case, languages needed…"
                  defaultValue={
                    planLabel ? `I'd like to talk about the ${planLabel} plan. ` : ''
                  }
                  required
                />
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
                <span className="lbl">Registered office</span>
                <br />
                <span className="val">{companyInfo.registeredOffice}</span>
              </span>
            </div>
            <div className="contact__map">
              {/* Built from companyInfo.geo so the pin follows the registered
                  office rather than being a second place the address lives. */}
              <iframe
                title={`${companyInfo.brand} office location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
