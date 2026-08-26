'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import { Chat, Send } from '@/components/Icons';

type Line = { from: 'visitor' | 'bot'; text: string };

// A representative support exchange — illustrative, not a real transcript.
const CONVERSATION: Line[] = [
  { from: 'visitor', text: 'Do you integrate with HubSpot?' },
  { from: 'bot', text: 'Yes — leads captured here sync straight to HubSpot. Want me to send setup docs?' },
  { from: 'visitor', text: 'Please. And pricing?' },
  { from: 'bot', text: "Sent. Pricing depends on volume — what's your monthly chat traffic?" },
];

const STEP_MS = 1700;

/**
 * A mock of the chat widget for the product page hero. Reveals the exchange one
 * message at a time and then loops, so the page shows the product working
 * instead of describing it.
 */
export default function ChatWidgetPreview() {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? CONVERSATION.length : 1);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setShown((n) => (n >= CONVERSATION.length ? 1 : n + 1));
    }, STEP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="chat-card">
      <div className="chat-card__head">
        <span className="chat-card__bot">
          <span className="chat-card__bot-icon" aria-hidden="true">
            <Chat width={15} height={15} />
          </span>
          <span>
            <strong>Classify Assistant</strong>
            <span className="chat-card__status">
              <span className="chat-card__status-dot" aria-hidden="true" />
              Online
            </span>
          </span>
        </span>
      </div>

      <div className="chat-card__body">
        {CONVERSATION.slice(0, shown).map((line, i) => (
          <p className={`chat-card__msg chat-card__msg--${line.from}`} key={i}>
            {line.text}
          </p>
        ))}
        {/* Typing indicator while more of the exchange is still to come. */}
        {!reduced && shown < CONVERSATION.length && (
          <p className="chat-card__msg chat-card__msg--bot chat-card__typing" aria-hidden="true">
            <span />
            <span />
            <span />
          </p>
        )}
      </div>

      <div className="chat-card__input" aria-hidden="true">
        <span>Ask a question…</span>
        <Send width={15} height={15} />
      </div>
    </div>
  );
}
