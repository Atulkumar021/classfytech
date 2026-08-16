import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type Source = 'contact' | 'demo';

interface ContactPayload {
  source: Source;
  name?: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  service?: string;
  message?: string;
  remark?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip characters that could be used to inject extra headers into the
// outgoing mail if they ever ended up in a header-ish field.
function clean(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

// Every submitted value ends up interpolated into the HTML email body below
// — escape it so a submitter can't inject markup into the notification.
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const source: Source = body.source === 'demo' ? 'demo' : 'contact';
  const name = clean(String(body.name || ''));
  const email = clean(String(body.email || ''));
  const phone = clean(String(body.phone || ''));
  const countryCode = clean(String(body.countryCode || ''));
  const service = clean(String(body.service || ''));
  const message = String(body.message || '').trim();
  const remark = String(body.remark || '').trim();

  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a name and a valid email.' },
      { status: 400 },
    );
  }
  if (source === 'contact' && !message) {
    return NextResponse.json({ ok: false, error: 'Please describe your use case.' }, { status: 400 });
  }
  if (source === 'demo' && (!phone || !remark)) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a mobile number and a remark.' },
      { status: 400 },
    );
  }

  const smtp = getTransporter();
  if (!smtp) {
    console.error('SMTP is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
    return NextResponse.json(
      { ok: false, error: 'Email sending is not configured yet. Please try again later.' },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || 'classifytechnologies@gmail.com';
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const subject =
    source === 'demo' ? `New demo request from ${name}` : `New contact form message from ${name}`;

  const rows = [
    ['Name', name],
    ['Email', email],
    source === 'demo' ? ['Mobile', `${countryCode} ${phone}`.trim()] : null,
    source === 'contact' ? ['Looking for', service] : null,
    [source === 'demo' ? 'Remark' : 'Message', source === 'demo' ? remark : message],
  ].filter(Boolean) as [string, string][];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<table cellpadding="6" cellspacing="0">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>`;

  try {
    await smtp.sendMail({ from, to, replyTo: email, subject, text, html });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return NextResponse.json(
      { ok: false, error: 'Could not send your message right now. Please try again shortly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
