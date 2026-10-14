/**
 * Central content model for the site. Keeping copy and structured data here
 * (instead of hard-coded in JSX) makes the site easy to update, localise, or
 * later feed from a CMS. Icons are referenced by key and resolved in the UI.
 */
// Icon keys are declared explicitly (rather than derived from the Icons module)
// so this content model stays decoupled from the React component layer.
export type ServiceIconKey =
  | 'monitor'
  | 'phone'
  | 'cpu'
  | 'fileCode'
  | 'cloud'
  | 'shield'
  | 'chart'
  | 'chat'
  | 'layout';
export type FeatureIconKey =
  | 'braces'
  | 'cpu'
  | 'bolt'
  | 'chart'
  | 'shield'
  | 'search'
  | 'code'
  | 'layout'
  | 'clock'
  | 'chat'
  | 'phone';

export interface Service {
  icon: ServiceIconKey;
  title: string;
  description: string;
  items: string[];
}

export interface Feature {
  icon: FeatureIconKey;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export type ProjectIconKey =
  | 'chart'
  | 'chat'
  | 'calendar'
  | 'clock'
  | 'star'
  | 'mapPin'
  | 'search'
  | 'globe';

export interface Project {
  icon: ProjectIconKey;
  title: string;
  description: string;
  tags: string[];
  /**
   * Optional headline figures. Omitted for the Dialer rather than
   * inventing metrics for products with no published results yet.
   */
  results?: { num: string; label: string }[];
}

export interface Review {
  /** The reviewer's own words. Kept as written — including the gripes. */
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  /** 1-5, in half steps. Not every customer gives five, and the ones who */
  /** don't are the reason the rest are worth reading. */
  rating: number;
  /** Which product this review is about, so each product page can filter. */
  product: 'Voice AI' | 'Dialer';
  /** ISO date. Rendered as "March 2026" — a review with no date reads as stock copy. */
  date: string;
}

/** Shape of the computed rollup under a set of reviews. */
export interface RatingSummary {
  average: number;
  count: number;
  /** Review count per whole star, indexed 5 down to 1. */
  distribution: { stars: number; count: number; share: number }[];
}

/**
 * Roll a set of reviews up into the numbers shown above the list.
 *
 * Derived rather than hand-written on purpose: a hard-coded "4.9 from 300+
 * happy customers" above six visible reviews is the single most obvious tell
 * that a review section is decorative. These numbers always describe exactly
 * the reviews on the page.
 */
export function summariseRatings(list: Review[]): RatingSummary {
  const count = list.length;
  if (!count) return { average: 0, count: 0, distribution: [] };
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    // Half-steps round up, so a 4.5 counts toward its 5.
    const n = list.filter((r) => Math.round(r.rating) === stars).length;
    return { stars, count: n, share: n / count };
  });
  return { average: Math.round((total / count) * 10) / 10, count, distribution };
}

export interface Plan {
  name: string;
  price: string;
  originalPrice?: string;
  unit?: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

/**
 * Primary nav: the two products, then contact.
 *
 * There's deliberately no single "Pricing" link — with two products it would
 * have to favour one arbitrarily. Each product page links its own pricing, and
 * the footer lists both.
 */
export const navLinks = [
  { href: '/voice-ai', label: 'Voice AI' },
  { href: '/dialer', label: 'Dialer' },
  { href: '/contact', label: 'Book a Demo' },
];

export const heroStats: Stat[] = [
  { value: 2, suffix: 'M+', label: 'Calls Handled' },
  { value: 99.9, suffix: '%', label: 'Platform Uptime' },
  { value: 40, suffix: '+', label: 'Languages Supported' },
  { value: 24, suffix: '/7', label: 'Always-On Agents' },
];

// Integration partners shown in the marquee — not client logos.
export const clients = [
  '☎ Twilio',
  '⬡ Salesforce',
  '✦ HubSpot',
  '◆ Google Calendar',
  '⬢ Zoho CRM',
  '✳ WhatsApp',
];

export const services: Service[] = [
  {
    icon: 'phone',
    title: 'Outbound Voice Agents',
    description:
      'It works a list: rings the number, asks the questions you would ask, books the ones worth booking and logs the rest.',
    items: [
      'Automated Cold Calling',
      'Lead Qualification',
      'Appointment Booking',
      'Follow-Up & Re-Engagement Campaigns',
      'Survey & Feedback Calls',
      'Automatic CRM Logging',
    ],
  },
  {
    icon: 'monitor',
    title: 'Inbound Voice Agents',
    description:
      'Picks up on the first ring at 2am on a Sunday, in whatever language the caller opens with. Nobody waits in a queue.',
    items: [
      '24/7 Call Answering',
      'Customer Support Automation',
      'FAQ & Order Status Lookup',
      'Appointment Scheduling',
      'Smart Call Routing & Escalation',
      'Multi-Language Support',
    ],
  },
  {
    icon: 'cpu',
    title: 'Conversational AI Engine',
    description:
      'The part that listens. It holds the thread of a conversation, copes with being cut off, and sticks to what you told it to say.',
    items: [
      'Human-Like, Natural Voice',
      'Real-Time Interruption Handling',
      'Context-Aware Conversations',
      'Live Sentiment Detection',
      'Custom Voice & Persona',
      'Powered by GPT, Gemini & Claude',
    ],
  },
  {
    icon: 'fileCode',
    title: 'Analytics & Insights',
    description: 'See exactly how every call went, and what to fix next.',
    items: [
      'Full Call Transcripts & Recordings',
      'Live Performance Dashboards',
      'Conversion & Outcome Tracking',
      'Sentiment & QA Scoring',
      'A/B Script Testing',
      'Team Performance Reports',
    ],
  },
  {
    icon: 'cloud',
    title: 'Integrations & Infrastructure',
    description: 'Plugs into the stack you already run, at any scale.',
    items: [
      'CRM: Salesforce, HubSpot, Zoho',
      'Telephony: Twilio & SIP Trunks',
      'Calendar: Google & Outlook',
      'REST API & Webhooks',
      'Enterprise-Grade Security',
      'Auto-Scaling Cloud Infrastructure',
    ],
  },
];

// Kept short and in sentence case so each chip holds its label on one line —
// the longer Title Case versions wrapped to two lines at five across, which
// left the row looking ragged. Title Case On Every Label also reads as filler.
export const features: Feature[] = [
  { icon: 'cpu', label: 'Human-like voice' },
  { icon: 'bolt', label: 'Sub-second replies' },
  { icon: 'chat', label: '40+ languages' },
  { icon: 'clock', label: '24/7 availability' },
  { icon: 'shield', label: 'Enterprise security' },
  { icon: 'layout', label: 'CRM & calendar sync' },
  { icon: 'code', label: 'No-code builder' },
  { icon: 'chart', label: 'Real-time analytics' },
  { icon: 'search', label: 'Smart call routing' },
  { icon: 'braces', label: 'Open API & webhooks' },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Tell it what the call is for',
    description:
      'Write the goal in plain English — book a viewing, chase a renewal, answer the top ten questions. Pick a voice. No code, and you can change your mind later.',
  },
  {
    title: 'Give it your data',
    description:
      'Hook up the CRM, the calendar, the price list. Without that an agent is just a voice; with it, it knows who is calling and what you told them last time.',
  },
  {
    title: 'Put it on a line',
    description:
      'Point a number at it for inbound, or hand it a list for outbound. Start with a small batch and listen to the recordings before you open the taps.',
  },
  {
    title: 'It holds a real conversation',
    description:
      'It waits its turn, copes with being interrupted, and answers in about half a second. People talk over it the way they talk over anyone.',
  },
  {
    title: 'It does the thing, not just the talking',
    description:
      'The meeting lands in your calendar, the lead is scored in your CRM, the ticket is closed. A call that ends in a summary nobody reads has not saved you anything.',
  },
  {
    title: 'You read what actually happened',
    description:
      'Every call has a transcript and a sentiment score. Most of the useful work after week one is listening to the calls that went badly and fixing the script.',
  },
  {
    title: 'Busy days stop being a problem',
    description:
      'Ten calls at once or ten thousand costs you the same effort. Nobody is on hold because three people called at the same time.',
  },
];

export const technologies = [
  { abbr: 'Tw', name: 'Twilio' },
  { abbr: 'Ai', name: 'OpenAI' },
  { abbr: 'Ge', name: 'Gemini' },
  { abbr: 'Cl', name: 'Claude' },
  { abbr: 'Wh', name: 'Whisper' },
  { abbr: 'El', name: 'ElevenLabs' },
  { abbr: 'Dg', name: 'Deepgram' },
  { abbr: 'Py', name: 'Python' },
  { abbr: 'No', name: 'Node.js' },
  { abbr: 'Rd', name: 'Redis' },
  { abbr: 'Pg', name: 'PostgreSQL' },
  { abbr: 'Wr', name: 'WebRTC' },
  { abbr: 'Aw', name: 'AWS' },
  { abbr: 'Gc', name: 'Google Cloud' },
  { abbr: 'Sf', name: 'Salesforce' },
  { abbr: 'Hs', name: 'HubSpot' },
  { abbr: 'Zo', name: 'Zoho' },
  { abbr: 'Sl', name: 'Slack' },
  { abbr: 'Wa', name: 'WhatsApp' },
  { abbr: 'K8', name: 'Kubernetes' },
  { abbr: 'Gq', name: 'GraphQL' },
];

// Illustrative use cases and figures — swap in real customer case studies and
// metrics once available; not attributed to specific named clients.
export const projects: Project[] = [
  {
    icon: 'chart',
    title: 'Sales & Lead Qualification',
    description:
      'Outbound agents cold-call fresh leads, qualify intent on the spot, and book meetings directly on your reps’ calendars.',
    tags: ['Outbound', 'CRM Sync', 'Lead Scoring'],
    results: [
      { num: '3x', label: 'Faster lead response' },
      { num: '24/7', label: 'Outreach coverage' },
    ],
  },
  {
    icon: 'chat',
    title: 'Customer Support Hotline',
    description:
      'Inbound agents answer FAQs, check order status, and escalate complex issues to a human with full context.',
    tags: ['Inbound', 'Ticketing', 'Escalation'],
    results: [
      { num: '24/7', label: 'Live call coverage' },
      { num: '<2s', label: 'Avg. answer time' },
    ],
  },
  {
    icon: 'calendar',
    title: 'Appointment Scheduling',
    description:
      'Automated booking, reminder and rescheduling calls for clinics, salons and service businesses.',
    tags: ['Outbound', 'Calendar Sync', 'Reminders'],
    results: [
      { num: '40+', label: 'Languages supported' },
      { num: '100%', label: 'Automated reminders' },
    ],
  },
  {
    icon: 'clock',
    title: 'Payment Reminders',
    description:
      'Polite, consistent payment reminder calls with promise-to-pay tracking and compliant scripting.',
    tags: ['Outbound', 'Compliance', 'CRM Sync'],
    results: [
      { num: '24/7', label: 'Reminder coverage' },
      { num: '100%', label: 'Consistent scripting' },
    ],
  },
  {
    icon: 'star',
    title: 'Survey & Feedback Calls',
    description:
      'Post-service NPS/CSAT calls at scale, with every response transcribed and sentiment-scored automatically.',
    tags: ['Outbound', 'Sentiment Analysis', 'Analytics'],
    results: [
      { num: '100%', label: 'Calls transcribed & scored' },
      { num: 'Real-Time', label: 'Sentiment insights' },
    ],
  },
  {
    icon: 'mapPin',
    title: 'Real Estate Inquiries',
    description:
      'Qualifies buyer and renter interest around the clock and schedules site visits automatically.',
    tags: ['Inbound', 'Outbound', 'Scheduling'],
    results: [
      { num: '24/7', label: 'Instant inquiry response' },
      { num: '3x', label: 'More site visits booked' },
    ],
  },
  {
    icon: 'search',
    title: 'Recruitment Screening',
    description:
      'Pre-screens candidates against your criteria, answers FAQs, and schedules interviews with recruiters.',
    tags: ['Outbound', 'Screening', 'Scheduling'],
    results: [
      { num: '10x', label: 'Faster candidate screening' },
      { num: '24/7', label: 'Always-on screening' },
    ],
  },
  {
    icon: 'globe',
    title: 'Delivery & Logistics Updates',
    description:
      'Proactive calls for delivery confirmations, ETA updates and address verification at scale.',
    tags: ['Outbound', 'Logistics', 'Automation'],
    results: [
      { num: '100%', label: 'Proactive delivery updates' },
      { num: '24/7', label: 'Automated dispatch calls' },
    ],
  },
];

/**
 * PLACEHOLDER REVIEWS — replace with real ones before launch.
 *
 * Two deliberate choices worth keeping when the real reviews arrive:
 *
 * 1. Not every rating is a five. A column of identical five-star reviews is
 *    read as advertising; a four with a specific, fixable complaint is read as
 *    evidence, and it makes the fives credible. Keep the critical ones.
 * 2. Each quote names something concrete — a number, a workflow, a thing that
 *    went wrong. Generic praise ("great product, highly recommend") tells a
 *    buyer nothing and is what everyone's reviews already look like.
 *
 * Because these are not real, no `AggregateRating` structured data is emitted
 * for them anywhere on the site. See the note in components/Reviews.tsx.
 */
export const reviews: Review[] = [
  {
    quote:
      "We were losing enquiries overnight — people call about a property at 10pm and by morning they have booked with someone else. The agent picks up, asks the three questions our team would ask, and books a viewing. Last month it handled 1,400 calls and 300-odd turned into site visits.",
    name: 'Rohan Malhotra',
    role: 'Growth Lead',
    company: 'Real estate marketplace, Gurugram',
    initials: 'RM',
    rating: 5,
    product: 'Voice AI',
    date: '2026-08-19',
  },
  {
    quote:
      "Honestly I expected to hate it. Our customers are not young and I was sure they would hang up on a robot. Most of them do not notice. The ones who ask get handed to a person straight away, which is the part that sold me.",
    name: 'Ananya Iyer',
    role: 'Operations Manager',
    company: 'Clinic chain, Bengaluru',
    initials: 'AI',
    rating: 5,
    product: 'Voice AI',
    date: '2026-07-02',
  },
  {
    quote:
      "The dialer itself is excellent — six modes, and the agents picked it up in an afternoon. Reporting is where it falls short for us. There are over a hundred reports and I still had to export to Excel to get the one view my regional heads actually want. Support says a custom report builder is coming.",
    name: 'Vikram Desai',
    role: 'Head of Contact Centre',
    company: 'NBFC, Mumbai',
    initials: 'VD',
    rating: 4,
    product: 'Dialer',
    date: '2026-09-11',
  },
  {
    quote:
      "Connect rate went from 22% to 31% after we moved to predictive and let it handle the retry timing. That is the whole review really. Same list, same agents, more conversations.",
    name: 'Priya Sharma',
    role: 'Sales Lead',
    company: 'B2B SaaS, Pune',
    initials: 'PS',
    rating: 5,
    product: 'Dialer',
    date: '2026-06-24',
  },
  {
    quote:
      "Setup took longer than the 'live in days' line suggests — closer to three weeks, though most of that was us getting our own data in order rather than anything on their side. Once it was running it has been steady. Nine months, no outage I have noticed.",
    name: 'Arjun Mehta',
    role: 'Head of Support',
    company: 'D2C retail brand, Delhi',
    initials: 'AM',
    rating: 4,
    product: 'Voice AI',
    date: '2026-05-30',
  },
  {
    quote:
      "We run campaigns in Hindi, Marathi and English off one script. The language switching mid-call still surprises me. What I would like is better control over how formal it sounds in Hindi — it is a bit stiff for our audience.",
    name: 'Sneha Kulkarni',
    role: 'Campaign Manager',
    company: 'Insurance aggregator, Nagpur',
    initials: 'SK',
    rating: 4,
    product: 'Voice AI',
    date: '2026-09-28',
  },
];

/** Numbers under the reviews above — always derived from the list itself. */
export const reviewSummary = summariseRatings(reviews);

// Per-minute billing, tiered by monthly call volume. Enterprise stays custom.
export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹6.5',
    unit: '/min',
    description: 'For small teams launching their first voice agent — 1,000 to 10,000 calls per month.',
    features: [
      '1 voice agent',
      '1,000–10,000 calls / month',
      'Inbound or outbound (choose one)',
      'Calendar & WhatsApp integration',
      'Call transcripts & basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₹6',
    unit: '/min',
    description: 'For teams scaling outreach and support together — 10,000+ calls per month.',
    features: [
      'Up to 5 voice agents',
      '10,000+ calls / month',
      'Inbound + outbound',
      'CRM integrations (Salesforce, HubSpot, Zoho)',
      'Live dashboards & sentiment analysis',
      'Priority support',
    ],
    cta: 'Choose Growth',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For high-volume, mission-critical voice operations.',
    features: [
      'Unlimited agents & minutes',
      'Dedicated infrastructure & SLA',
      'Custom LLM & voice tuning',
      'Advanced compliance & data residency',
      'Dedicated success manager',
    ],
    cta: 'Contact Sales',
  },
];

export const faqs: Faq[] = [
  {
    question: 'What is this, in one sentence?',
    answer:
      'It is a voice that answers your phone and makes your calls — it understands what the caller wants, and then does something about it: books the meeting, updates the CRM, answers the question or passes the call to you.',
  },
  {
    question: 'Will callers know it is a machine?',
    answer:
      'Some will, most do not. It replies in about half a second and handles being interrupted, which is what usually gives these things away. We would rather you judged it yourself than took our word for it — a demo call takes two minutes.',
  },
  {
    question: 'Does it handle both inbound and outbound calls?',
    answer:
      'Yes. The same platform powers outbound campaigns (cold calling, lead qualification, reminders) and inbound lines (support, bookings, FAQs) — configure either, or both together.',
  },
  {
    question: 'Which languages does it speak?',
    answer:
      'Over 40, including Hindi, Marathi, Tamil, Telugu, Bengali and Gujarati alongside English. It works out which one the caller is using and switches, so you do not need a separate line or a separate script per language.',
  },
  {
    question: 'Can it integrate with my CRM and calendar?',
    answer:
      'Yes. Native integrations with Salesforce, HubSpot, Zoho, Google Calendar and Outlook, plus a REST API and webhooks for anything custom.',
  },
  {
    question: 'What about recording and consent?',
    answer:
      'You control what gets recorded and where it is stored, and the agent can read a consent line before anything else happens. The rules differ by state and by industry, so tell us what you are bound by and we will set it up to match rather than guess.',
  },
  {
    question: 'What happens when it gets stuck?',
    answer:
      'It hands over to a person, and passes the transcript across with the call. The thing that makes transfers infuriating is being asked everything a second time, so the agent you transfer to already has the answers.',
  },
  {
    question: 'How long until we are live?',
    answer:
      'A simple inbound line can be answering calls in a few days. Anything that has to talk to your CRM usually takes two or three weeks, and most of that is getting your own data tidy enough to be useful. We would rather say that up front than surprise you in week two.',
  },
];

/* =========================================================================
   Products
   NiaTalks sells two products. The site is organised around them:
   the homepage introduces the company and both, and each product owns a
   path (`/voice-ai`, `/dialer`) with its own sub-pages.
   ========================================================================= */

export interface ProductSummary {
  slug: 'voice-ai' | 'dialer';
  name: string;
  /** One line for cards and nav. */
  tagline: string;
  /** Two-to-three lines for the product card. */
  description: string;
  icon: FeatureIconKey;
  href: string;
  /** Three scannable capability bullets for the homepage card. */
  highlights: string[];
  /** Shown on the card when a product is the flagship. */
  featured?: boolean;
}

export const products: ProductSummary[] = [
  {
    slug: 'voice-ai',
    name: 'Voice AI',
    tagline: 'AI voice agents that call and answer for you',
    description:
      'Human-like AI agents that make outbound calls and answer inbound ones — qualifying leads, booking meetings and resolving support questions, 24/7.',
    icon: 'cpu',
    href: '/voice-ai',
    highlights: ['Inbound + outbound agents', '40+ languages', 'Books meetings on its own'],
    featured: true,
  },
  {
    slug: 'dialer',
    name: 'Dialer',
    tagline: 'A complete calling desk for your team',
    description:
      'A desktop app that puts calls, chat, WhatsApp, email and the customer record on one screen — with six dialing modes, supervisor monitoring and a full admin console behind it.',
    icon: 'phone',
    href: '/dialer',
    highlights: ['Six dialing modes', 'Calls, chat & CRM in one screen', 'Supervisor monitoring'],
  },
];

/* ---------- Dialer ----------
   Written from the product's real feature list (agent desktop app + admin
   console). Deliberately excludes anything the internal docs mark as
   in-progress or switched off — DND, click-to-call from a tel: link, in-chat
   file sharing / recording, and the alternate XMPP chat engine — because
   advertising unfinished features would misrepresent the product. */

export const dialerFeatures: Feature[] = [
  { icon: 'phone', label: 'Audio & video calls' },
  { icon: 'bolt', label: 'Six dialing modes' },
  { icon: 'layout', label: 'Unified agent console' },
  { icon: 'clock', label: 'Call recording' },
  { icon: 'shield', label: 'Supervisor monitoring' },
  { icon: 'chat', label: 'WhatsApp, SMS & email' },
  { icon: 'cpu', label: 'Built-in CRM' },
  { icon: 'chart', label: 'Live agent grid' },
  { icon: 'search', label: '100+ reports' },
  { icon: 'code', label: 'Admin controls' },
];

export const dialerCapabilities: Service[] = [
  {
    icon: 'phone',
    title: 'Calling, the way each campaign needs it',
    description: 'Six dialing modes, multi-line handling, and a dialpad for the times a human has to drive.',
    items: [
      'Manual, Auto, Progressive, Preview, Predictive & Callback modes',
      'Audio and video calls with camera preview',
      'Dialpad with DTMF for IVR menus',
      'Click-to-call triggered from another system',
      'Multi-line handling with call waiting',
      'Auto-answer and campaign switching',
    ],
  },
  {
    icon: 'layout',
    title: 'Full control of a live call',
    description: 'Everything an agent reaches for mid-call, without leaving the screen.',
    items: [
      'Hold, resume, mute and hangup',
      'Blind and attended (warm) transfer',
      'Transfer to queue, skill or campaign',
      'Conference and call forwarding',
      'Manual or policy-based recording, with playback',
      'Screen sharing and full-screen call view',
    ],
  },
  {
    icon: 'monitor',
    title: 'One console for every channel',
    description: 'Phone, chat, WhatsApp, SMS, email, script and tickets in a single dashboard.',
    items: [
      'Internal 1-to-1 and group chat',
      'WhatsApp Business messaging with approved templates',
      'SMS send/receive with full conversation logs',
      'Email inbox, sent and outbox per customer',
      'Auto SMS or WhatsApp based on the disposition',
      'Presence, buddy list and intercom',
    ],
  },
  {
    icon: 'cpu',
    title: 'Customer records and guided scripts',
    description: 'The CRM lives inside the app, so nothing gets typed twice.',
    items: [
      'Embedded CRM screen — view and edit records in place',
      'Assigned lead list with filtered search',
      'Decision-tree scripts that walk the agent through the call',
      'Cascading dropdowns for structured data entry',
      'Disposition and sub-disposition tagging',
      'Disposition-driven CRM updates and webhook/API push',
    ],
  },
  {
    icon: 'shield',
    title: 'Supervision and quality',
    description: 'See the floor in real time, and go back over any call afterwards.',
    items: [
      'Silent monitor, barge-in and coach/whisper',
      'Supervisor conference join',
      'Live agent grid — status, mode and call duration',
      'Idle, wrap-up, break and hold tracking',
      'Recording search, transfer and conference logs',
      'Review mode for QA, with a review log',
    ],
  },
  {
    icon: 'chart',
    title: 'Reporting that goes deep',
    description: 'Over a hundred reports across sessions, dispositions, queues and SLAs.',
    items: [
      'Call logs for an agent or the whole team',
      'CDR, queue, abandon and IVR reports',
      'Disposition reports, summaries and graphs',
      'Service level and intraday SL reporting',
      'Follow-up records, exportable to CSV',
      'Billing reports and call-quality (QoS) data',
    ],
  },
  {
    icon: 'cloud',
    title: 'Admin console and telephony',
    description: 'A full back office for the people who configure the floor, not just the ones on it.',
    items: [
      'Campaign, queue and CRM configuration',
      'DID management, IVR design and voice files',
      'Lead import, assignment and callback slots',
      'Dispositions, skills and call distribution rules',
      'Blacklist, DNC and holiday handling',
      'Per-agent feature policies for recording, transfer and video',
    ],
  },
  {
    icon: 'fileCode',
    title: 'A desktop app built for shift work',
    description: 'Small details that matter when the app is open for eight hours straight.',
    items: [
      'Floating always-on-top call widget',
      'System tray icon with quick answer and hangup',
      'Automatic updates',
      'Dark, light or system theme, and multi-language',
      'Echo cancellation, noise suppression and auto-gain',
      'Also runs as an installable web app (PWA)',
    ],
  },
];

export const dialerSteps: ProcessStep[] = [
  {
    title: 'Configure the floor',
    description:
      'Set up campaigns, queues, DIDs and IVR flows in the admin console, and define the dispositions your team will actually use.',
  },
  {
    title: 'Load and assign leads',
    description:
      'Import lists or pull them in by API, screen them against your blacklist, and assign them to agents or let distribution rules do it.',
  },
  {
    title: 'Agents sign in and pick a mode',
    description:
      'An agent chooses their campaign and dialing mode — or skips the prompt entirely with a default auto-login.',
  },
  {
    title: 'Calls get handled on one screen',
    description:
      'The dialer connects the call with the customer record already open, and the guided script leads the conversation.',
  },
  {
    title: 'The disposition does the admin',
    description:
      'Tagging the outcome updates the CRM, schedules any callback, and can fire an SMS or WhatsApp message automatically.',
  },
  {
    title: 'Supervisors watch, then review',
    description:
      'Team leads monitor or coach live from the agent grid, and afterwards the reports and recordings show what to change.',
  },
];

/**
 * Tiers for products whose pricing isn't public yet. Deliberately no numbers —
 * these route to sales rather than showing invented figures.
 */
export interface EnquiryPlan {
  name: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const dialerPlans: EnquiryPlan[] = [
  {
    name: 'Starter',
    description: 'For a small team getting off spreadsheets and manual dialing.',
    features: [
      'Up to 5 agent seats',
      'Manual, preview & progressive dialing',
      'Built-in CRM screen',
      'Call recording and playback',
      'Call logs and disposition reports',
      'Email support',
    ],
    cta: 'Talk to Sales',
  },
  {
    name: 'Growth',
    description: 'For teams running continuous campaigns in both directions.',
    features: [
      'Up to 25 agent seats',
      'Predictive & callback dialing',
      'WhatsApp, SMS and email channels',
      'Supervisor monitor, barge and coach',
      'Queues, skill routing and IVR',
      'Priority support',
    ],
    cta: 'Talk to Sales',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'For contact centres and BPOs running multiple campaigns.',
    features: [
      'Unlimited seats',
      'Full admin console and per-agent policies',
      'Multi-tenant client setup',
      'Service-level and custom reporting',
      'Dedicated infrastructure & SLA',
      'Dedicated success manager',
    ],
    cta: 'Contact Sales',
  },
];

/* ---------- Dialer: use cases & FAQ ---------- */

// No `results` on these — the Dialer has no published figures yet, and
// inventing them would be worse than leaving them out.
export const dialerUseCases: Project[] = [
  {
    icon: 'chart',
    title: 'Outbound sales floors',
    description:
      'Work a large prospect list in predictive mode so agents stop burning the day on dial tones, voicemail and wrong numbers.',
    tags: ['Predictive', 'Campaigns', 'Recording'],
  },
  {
    icon: 'chat',
    title: 'Inbound support desks',
    description:
      'Queues, skill-based routing and IVR bring the call to the right agent, with the customer record already open.',
    tags: ['Queues', 'Skill routing', 'IVR'],
  },
  {
    icon: 'calendar',
    title: 'Follow-ups that actually happen',
    description:
      'Callbacks are scheduled on the record, tracked with slots, and surfaced to the agent at the right time.',
    tags: ['Callbacks', 'Reminders'],
  },
  {
    icon: 'search',
    title: 'Lead verification teams',
    description:
      'Preview dialing lets an agent read the lead before committing to the call, and cascading dropdowns keep the captured data clean.',
    tags: ['Preview dialing', 'Guided script'],
  },
  {
    icon: 'star',
    title: 'Quality and coaching programmes',
    description:
      'Supervisors silent-monitor or whisper to agents live, then use review mode and recordings to run QA afterwards.',
    tags: ['Monitor', 'Coach', 'Review mode'],
  },
  {
    icon: 'globe',
    title: 'Multi-campaign BPO operations',
    description:
      'Run separate campaigns, DIDs, dispositions and reporting per client from one admin console, with per-agent feature policies.',
    tags: ['Multi-tenant', 'Admin console'],
  },
];

export const dialerFaqs: Faq[] = [
  {
    question: 'How is this different from your Voice AI?',
    answer:
      'The Dialer is for your human agents — it places the calls and does the admin so they spend their time talking. Voice AI replaces the agent on the call entirely. Plenty of teams run both: AI for first-touch volume, people for the conversations that need them.',
  },
  {
    question: 'What dialing modes are supported?',
    answer:
      'Six: Manual, Auto, Progressive, Preview, Predictive and Callback. An agent can switch mode and campaign from the console, and click-to-call from a lead record is supported too.',
  },
  {
    question: 'Is it only for outbound calling?',
    answer:
      'No. It handles inbound as well — queues, skill-based routing, IVR flows, call forwarding and voicemail are all part of it. Most teams use it for both directions on the same floor.',
  },
  {
    question: 'What can a supervisor do during a live call?',
    answer:
      'Silent monitor, barge in, or coach the agent privately so the customer cannot hear. Supervisors can also join as a conference participant. These are permission-gated, so an admin decides who gets them.',
  },
  {
    question: 'Does it work with our CRM?',
    answer:
      'There is a CRM built into the agent screen, so records can be viewed and edited without switching apps. It also pushes call and CRM data out over webhooks and a REST API, and dispositions can update record fields automatically.',
  },
  {
    question: 'Can agents message customers, not just call them?',
    answer:
      'Yes — WhatsApp Business (including approved templates), SMS and email all run from the same console, alongside internal team chat. You can also fire an SMS or WhatsApp automatically based on the disposition the agent picks.',
  },
  {
    question: 'What reporting comes with it?',
    answer:
      'Over a hundred reports, including CDR, queue, abandon and IVR reports, disposition summaries and graphs, service-level and intraday SL reporting, agent session data, billing and call-quality metrics. Follow-up lists export to CSV.',
  },
  {
    question: 'Do we need to replace our phone system?',
    answer:
      'No. It runs over your existing telephony, and DIDs, voice files, IVR design and holiday handling are all configured in the admin console.',
  },
  {
    question: 'How do you handle blacklists and compliance?',
    answer:
      'The admin console has blacklist management with bulk upload, holiday lists and zone-based dialing rules. Calls can be recorded by policy, and recordings, transfers and conferences are all logged for audit.',
  },
  {
    question: 'Is it a desktop app or browser-based?',
    answer:
      'Primarily a Windows desktop app — which is what gives you the floating call widget, tray alerts and native call pop-ups. The same dashboard also runs as an installable web app if you would rather not deploy a desktop client.',
  },
];

export const contactInfo = {
  email: 'classifytechnologies@gmail.com',
  // Display is spaced for readability; the two link values must stay
  // unspaced — `wa.me/` rejects spaces outright and `tel:` is unreliable
  // with them.
  phoneDisplay: '+91 92865 61066',
  phoneHref: '+919286561066',
  whatsapp: '919286561066',
  address: 'New Delhi, India',
};

/**
 * The registered company behind the NiaTalks brand.
 *
 * NiaTalks is the product brand; the contracting entity is the private limited
 * company below. Keeping the two apart matters on a Pvt Ltd site: invoices,
 * terms, the schema.org `legalName` and the footer statutory line must all name
 * the entity, while the marketing copy stays on the brand.
 *
 * `cin` and `gstin` are intentionally blank. They are real statutory
 * identifiers issued by the MCA and the GST department — publishing an invented
 * one would be a false disclosure, so the footer simply omits whichever of
 * these is empty. Paste the real values here and they appear automatically.
 */
export const companyInfo = {
  /** Product/trading brand, used in all marketing copy. */
  brand: 'NiaTalks',
  /** Full registered name, used wherever the legal entity must be named. */
  legalName: 'Classify Technologies Private Limited',
  /** Short form for tight spaces such as the footer bottom bar. */
  legalNameShort: 'Classify Technologies Pvt. Ltd.',
  /** Company Identification Number from the MCA — e.g. 'U72900DL2023PTC123456'. */
  cin: '',
  /** GST Identification Number — e.g. '07AABCU9603R1ZX'. */
  gstin: '',
  /** Registered office as recorded with the Registrar of Companies. */
  registeredOffice: 'New Delhi, Delhi 110001, India',
  /** Jurisdiction named in the terms of service and any dispute clause. */
  jurisdiction: 'New Delhi, India',
  incorporatedIn: 'India',
};
