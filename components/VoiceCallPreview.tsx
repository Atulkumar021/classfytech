'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import { PhoneCall } from '@/components/Icons';

type Line = { from: 'agent' | 'caller'; text: string };

// A representative outbound-qualification call — illustrative, not a real
// transcript. Loops to demonstrate the product in the hero without a video.
const CONVERSATION: Line[] = [
  { from: 'agent', text: 'Hi Sarah, this is Voice AI calling about your demo request — got 2 minutes?' },
  { from: 'caller', text: 'Sure, go ahead.' },
  { from: 'agent', text: 'Great — I have a slot tomorrow at 3 PM with our team. Does that work?' },
  { from: 'caller', text: 'Works for me.' },
  { from: 'agent', text: "Booked! You'll get a calendar invite right now." },
];

const BAR_COUNT = 24;
const LINE_INTERVAL_MS = 2800;

export default function VoiceCallPreview() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(6);

  // Cross-fade to the next line — one caption on screen at a time.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CONVERSATION.length);
    }, LINE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // A live-looking call timer — purely decorative.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [reduced]);

  const line = CONVERSATION[index];
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div className="call-card">
      <div className="call-card__head">
        <span className="call-card__agent">
          <span className="call-card__agent-icon" aria-hidden="true">
            <PhoneCall width={15} height={15} />
          </span>
          Voice AI Agent
        </span>
        <span className="call-card__live">
          <span className="call-card__live-dot" aria-hidden="true" />
          {mins}:{secs}
        </span>
      </div>

      <div className="call-card__wave" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className="call-card__bar"
            style={{ animationDelay: `${(i % 8) * 0.09}s` }}
          />
        ))}
      </div>

      {/* key={index} remounts on every line change, retriggering the CSS
          fade-in — a single caption at a time, no scrolling transcript. */}
      <div className="call-card__caption" key={index}>
        <span className={`call-card__speaker call-card__speaker--${line.from}`}>
          {line.from === 'agent' ? 'AI Agent' : 'Caller'}
        </span>
        <p>{line.text}</p>
      </div>

      <div className="call-card__tags">
        <span className="call-card__tag">Intent: Demo Request</span>
        <span className="call-card__tag call-card__tag--positive">Sentiment: Positive</span>
      </div>
    </div>
  );
}
