'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import { PhoneCall, Check, Clock, ArrowRight } from '@/components/Icons';

/** One pass of the loop an agent actually lives in. */
const STAGES = [
  { status: 'Dialing', detail: 'Placing call 3 of 240', tone: 'dialing' as const },
  { status: 'Connected', detail: 'Talking — 00:42', tone: 'live' as const },
  { status: 'Wrapped', detail: 'Logged as Meeting booked', tone: 'done' as const },
];

// Illustrative campaign figures for the mock — not real customer data.
const LEADS = [
  { name: 'Rohit Mehra', company: 'Aster Logistics', phone: '+91 98••• ••210' },
  { name: 'Neha Verma', company: 'Brightline Clinics', phone: '+91 99••• ••874' },
  { name: 'Arjun Rao', company: 'Kestrel Realty', phone: '+91 97••• ••143' },
];

const STEP_MS = 1900;

/**
 * Mock of the agent's dialer screen for the product page hero — shows the
 * dial → connect → wrap loop rather than describing it.
 */
export default function DialerPreview() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const stage = STAGES[tick % STAGES.length];
  const lead = LEADS[Math.floor(tick / STAGES.length) % LEADS.length];

  return (
    <div className="dialer-card">
      <div className="dialer-card__head">
        <span className="dialer-card__campaign">
          <span className="dialer-card__campaign-icon" aria-hidden="true">
            <PhoneCall width={14} height={14} />
          </span>
          <span>
            <strong>Q3 Outbound — Warm leads</strong>
            <span className="dialer-card__mode">Predictive · 6 agents</span>
          </span>
        </span>
      </div>

      {/* key remounts so the lead card re-animates as the loop advances */}
      <div className="dialer-card__lead" key={`${lead.name}-${stage.status}`}>
        <span className="dialer-card__avatar" aria-hidden="true">
          {lead.name.split(' ').map((n) => n[0]).join('')}
        </span>
        <span className="dialer-card__lead-meta">
          <strong>{lead.name}</strong>
          <span>{lead.company}</span>
          <span className="dialer-card__phone">{lead.phone}</span>
        </span>
        <span className={`dialer-card__status dialer-card__status--${stage.tone}`}>
          <span className="dialer-card__status-dot" aria-hidden="true" />
          {stage.status}
        </span>
      </div>

      <p className="dialer-card__detail">{stage.detail}</p>

      <div className="dialer-card__dispositions" aria-hidden="true">
        <span className="dialer-card__chip dialer-card__chip--primary">
          <Check width={13} height={13} />
          Meeting booked
        </span>
        <span className="dialer-card__chip">
          <Clock width={13} height={13} />
          Call back
        </span>
        <span className="dialer-card__chip">
          <ArrowRight width={13} height={13} />
          Not interested
        </span>
      </div>

      <div className="dialer-card__stats">
        <div>
          <span className="num">240</span>
          <span className="lbl">Dialed</span>
        </div>
        <div>
          <span className="num">68</span>
          <span className="lbl">Connected</span>
        </div>
        <div>
          <span className="num">28%</span>
          <span className="lbl">Connect rate</span>
        </div>
      </div>
    </div>
  );
}
