/**
 * Central content model for the site. Keeping copy and structured data here
 * (instead of hard-coded in JSX) makes the site easy to update, localise, or
 * later feed from a CMS. Icons are referenced by key and resolved in the UI.
 */
// Icon keys are declared explicitly (rather than derived from the Icons module)
// so this content model stays decoupled from the React component layer.
export type ServiceIconKey = 'monitor' | 'phone' | 'cpu' | 'fileCode' | 'cloud';
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
  | 'chat';

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
  results: { num: string; label: string }[];
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

export const navLinks = [
  { href: '/platform', label: 'Platform' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
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

export const contactInfo = {
  email: 'classifytechnologies@gmail.com',
  phoneDisplay: '+91 9457636571',
  phoneHref: '+91 9457636571',
  whatsapp: '91 9457636571',
  address: 'New Delhi, India',
};
