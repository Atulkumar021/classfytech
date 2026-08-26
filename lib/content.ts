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
   * Optional headline figures. Omitted for the Dialer and Chatbot rather than
   * inventing metrics for products with no published results yet.
   */
  results?: { num: string; label: string }[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
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
 * Primary nav: the three products, then contact.
 *
 * There's deliberately no single "Pricing" link — with three products it would
 * have to favour one arbitrarily. Each product page links its own pricing, and
 * the footer lists all three.
 */
export const navLinks = [
  { href: '/voice-ai', label: 'Voice AI' },
  { href: '/dialer', label: 'Dialer' },
  { href: '/chatbot', label: 'Chatbot' },
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
    description: 'Proactive calls that qualify, book and follow up — without a dialer.',
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
    description: "Every call answered instantly, day or night, in the caller's language.",
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
    description: 'The brain behind every call — natural, context-aware, always on-script.',
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
    title: 'Design Your Agent',
    description:
      'Define its goal, script and persona, and pick a natural voice in minutes with the no-code builder.',
  },
  {
    title: 'Connect Your Data',
    description:
      'Sync your CRM, calendar and knowledge base so the agent always has the right context.',
  },
  {
    title: 'Go Live',
    description: 'Launch an outbound campaign or activate an inbound line — instantly, at any scale.',
  },
  {
    title: 'Real, Natural Conversations',
    description:
      'The agent listens, understands intent and responds in real time, handling interruptions like a human.',
  },
  {
    title: 'Qualify, Book & Resolve',
    description:
      'Leads are qualified, meetings booked, and support questions resolved — automatically, every call.',
  },
  {
    title: 'Monitor & Optimize',
    description:
      'Transcripts, sentiment scoring and live dashboards show exactly what to improve next.',
  },
  {
    title: 'Scale Without Limits',
    description: 'Handle 10 calls or 10,000 concurrently, without adding a single person to your team.',
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

// Placeholder testimonials — replace with real customer quotes before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      'Our outbound agent runs 24/7 and never misses a follow-up — it books more meetings than our old dialer ever did.',
    name: 'Priya Sharma',
    role: 'Sales Lead, B2B SaaS company',
    initials: 'PS',
  },
  {
    quote:
      "Callers genuinely can't tell it's AI. Response times are instant and it hands off to a human the moment it needs to.",
    name: 'Arjun Mehta',
    role: 'Head of Support, D2C Retail brand',
    initials: 'AM',
  },
  {
    quote:
      'We went live with an inbound line in days, not months. The dashboards make it obvious what to fix next.',
    name: 'Ananya Iyer',
    role: 'Operations Manager, Healthcare clinic chain',
    initials: 'AI',
  },
  {
    quote:
      'The multi-language support let us launch outbound campaigns in three regions with one platform and one script.',
    name: 'Rohan Malhotra',
    role: 'Growth Lead, Real estate platform',
    initials: 'RM',
  },
];

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
    question: 'What exactly is Voice AI?',
    answer:
      'Voice AI is an AI-powered voice agent platform that makes and receives phone calls on your behalf — sounding natural, understanding context, and taking real actions like booking meetings, answering questions, or qualifying leads.',
  },
  {
    question: 'How natural does the voice actually sound?',
    answer:
      'Our agents use state-of-the-art speech models for natural intonation, real-time interruption handling and sub-second response times — most callers can’t tell they’re speaking to an AI.',
  },
  {
    question: 'Does it handle both inbound and outbound calls?',
    answer:
      'Yes. The same platform powers outbound campaigns (cold calling, lead qualification, reminders) and inbound lines (support, bookings, FAQs) — configure either, or both together.',
  },
  {
    question: 'What languages are supported?',
    answer:
      '40+ languages and regional accents, with automatic language detection so an agent can even switch mid-conversation.',
  },
  {
    question: 'Can it integrate with my CRM and calendar?',
    answer:
      'Yes. Native integrations with Salesforce, HubSpot, Zoho, Google Calendar and Outlook, plus a REST API and webhooks for anything custom.',
  },
  {
    question: 'Is call recording and consent handled compliantly?',
    answer:
      'Yes. Configurable consent prompts, call-recording controls and data-residency options help you stay compliant with local telephony and privacy regulations.',
  },
  {
    question: 'What happens when the AI can’t handle a call?',
    answer:
      'It escalates instantly to a live human with the full conversation context passed along — no dead air, no repeated questions.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a free demo. We’ll help you script your first agent, connect your data, and you can be live within days.',
  },
];

/* =========================================================================
   Products
   Classify Technology sells three products. The site is organised around them:
   the homepage introduces the company and all three, and each product owns a
   path (`/voice-ai`, `/dialer`, `/chatbot`) with its own sub-pages.
   ========================================================================= */

export interface ProductSummary {
  slug: 'voice-ai' | 'dialer' | 'chatbot';
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
  {
    slug: 'chatbot',
    name: 'Chatbot',
    tagline: 'An AI chat widget for your website',
    description:
      'A single script tag puts an AI assistant on your site — answering questions from your own content, capturing leads and handing off to your team.',
    icon: 'chat',
    href: '/chatbot',
    highlights: ['Trained on your content', 'Captures leads 24/7', 'Human handoff built in'],
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

/* ---------- Chatbot ---------- */

export const chatbotFeatures: Feature[] = [
  { icon: 'cpu', label: 'Answers from your content' },
  { icon: 'bolt', label: 'Instant replies' },
  { icon: 'chat', label: 'Lead capture in chat' },
  { icon: 'clock', label: '24/7 coverage' },
  { icon: 'layout', label: 'Matches your brand' },
  { icon: 'search', label: 'Chat transcripts' },
  { icon: 'shield', label: 'Human handoff' },
  { icon: 'braces', label: 'One script tag' },
];

export const chatbotCapabilities: Service[] = [
  {
    icon: 'cpu',
    title: 'Trained on what you already have',
    description: 'Point it at your own material — no rulebuilding, no decision trees.',
    items: [
      'Crawl your website pages',
      'Upload PDFs and docs',
      'Add Q&A pairs by hand',
      'Answers cite their source',
      'Says "I don\'t know" instead of guessing',
      'Re-crawls when your content changes',
    ],
  },
  {
    icon: 'monitor',
    title: 'A widget that fits your site',
    description: 'It should look like part of your product, not a bolted-on box.',
    items: [
      'Your colours, logo and copy',
      'Light and dark themes',
      'Launcher position and greeting',
      'Mobile-friendly by default',
      'Page-specific opening prompts',
      'Loads asynchronously — no speed hit',
    ],
  },
  {
    icon: 'fileCode',
    title: 'Turns conversations into pipeline',
    description: 'A support widget is only worth it if you can see what it produced.',
    items: [
      'Name, email and phone captured in chat',
      'Leads pushed to your CRM',
      'Full transcripts, searchable',
      'Topics people ask about most',
      'Unanswered questions surfaced',
      'Email digest of new conversations',
    ],
  },
  {
    icon: 'cloud',
    title: 'Hands off cleanly to people',
    description: 'The bot handles volume; your team handles the ones that matter.',
    items: [
      'Escalate on request or low confidence',
      'Full conversation passed to the agent',
      'Route by topic or page',
      'Offline message capture',
      'Email and Slack notifications',
      'REST API and webhooks',
    ],
  },
];

export const chatbotSteps: ProcessStep[] = [
  {
    title: 'Point it at your content',
    description: 'Give it your site URL and any documents — it reads them and builds its own knowledge base.',
  },
  {
    title: 'Style the widget',
    description: 'Set colours, logo, greeting and launcher position so it looks like it belongs on your site.',
  },
  {
    title: 'Paste one script tag',
    description: 'Drop a single line into your site and the widget is live — no build step, no plugin.',
  },
  {
    title: 'It answers and captures',
    description: 'Visitors get instant answers, and the bot collects contact details before they leave.',
  },
  {
    title: 'Review what it learned',
    description: 'Transcripts and unanswered questions show you exactly what content to add next.',
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

export const chatbotPlans: EnquiryPlan[] = [
  {
    name: 'Starter',
    description: 'For a single site that needs questions answered around the clock.',
    features: [
      '1 website',
      'Trained on your pages',
      'Lead capture in chat',
      'Email notifications',
      'Chat transcripts',
      'Email support',
    ],
    cta: 'Talk to Sales',
  },
  {
    name: 'Growth',
    description: 'For teams that want the widget feeding their pipeline.',
    features: [
      'Up to 5 websites',
      'PDF & document training',
      'CRM lead push',
      'Human handoff & routing',
      'Topic analytics',
      'Priority support',
    ],
    cta: 'Talk to Sales',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'For higher volumes and stricter data requirements.',
    features: [
      'Unlimited websites',
      'Dedicated infrastructure & SLA',
      'Data residency controls',
      'SSO and audit logs',
      'Custom integrations',
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

/* ---------- Chatbot: use cases & FAQ ---------- */

export const chatbotUseCases: Project[] = [
  {
    icon: 'chat',
    title: 'Answering pre-sales questions',
    description:
      'Visitors get straight answers on pricing, integrations and fit at the moment they are deciding, instead of waiting on email.',
    tags: ['Instant replies', 'Cited answers'],
  },
  {
    icon: 'chart',
    title: 'Capturing leads after hours',
    description:
      'The widget collects name, email and intent overnight and pushes them to your CRM before the team logs on.',
    tags: ['Lead capture', 'CRM push'],
  },
  {
    icon: 'search',
    title: 'Deflecting repeat support questions',
    description:
      'The questions your team answers twenty times a week get handled from your own documentation instead.',
    tags: ['Trained on your docs', 'Transcripts'],
  },
  {
    icon: 'calendar',
    title: 'Guiding people to a demo',
    description:
      'When someone shows buying intent, the bot moves the conversation toward booking rather than just answering.',
    tags: ['Lead capture', 'Handoff'],
  },
  {
    icon: 'mapPin',
    title: 'Onboarding and how-to help',
    description:
      'Point existing customers at the right guide, in context, on the page where they got stuck.',
    tags: ['Page-aware', 'Knowledge base'],
  },
  {
    icon: 'star',
    title: 'Finding the gaps in your content',
    description:
      'Unanswered questions are surfaced as a list, telling you exactly what to write next.',
    tags: ['Analytics', 'Gap reporting'],
  },
];

export const chatbotFaqs: Faq[] = [
  {
    question: 'How long does setup take?',
    answer:
      'Usually an afternoon. You point it at your site, it reads your pages, you style the widget and paste one script tag. There are no decision trees to build.',
  },
  {
    question: 'Where do its answers come from?',
    answer:
      'Only your material — your website pages, uploaded documents and any Q&A you add by hand. Answers cite their source, and it says it does not know rather than guessing when your content does not cover something.',
  },
  {
    question: 'Will it slow my site down?',
    answer:
      'No. The widget loads asynchronously after your page, so it does not block rendering or affect your Core Web Vitals.',
  },
  {
    question: 'Can a human take over a conversation?',
    answer:
      'Yes. It escalates on request or when confidence is low, and passes the full conversation to whoever picks it up. You can route by topic or by the page the visitor is on.',
  },
  {
    question: 'Does it work on WhatsApp too?',
    answer:
      'Not today — this product is the website widget. If you need WhatsApp, our Voice AI and messaging work covers that; tell us your use case and we will point you at the right fit.',
  },
  {
    question: 'What happens when my content changes?',
    answer:
      'It re-crawls on a schedule, so updates to your pages flow through without you re-training anything manually.',
  },
];

export const contactInfo = {
  email: 'classifytechnologies@gmail.com',
  // Display is spaced for readability; the two link values must stay
  // unspaced — `wa.me/` rejects spaces outright and `tel:` is unreliable
  // with them.
  phoneDisplay: '+91 94576 36571',
  phoneHref: '+919457636571',
  whatsapp: '919457636571',
  address: 'New Delhi, India',
};
