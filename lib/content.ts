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

export interface Project {
  glyph: string;
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
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export const heroStats: Stat[] = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 40, suffix: '+', label: 'Experts On Team' },
  { value: 12, suffix: '+', label: 'Countries Served' },
];

export const clients = [
  '◈ Northwind',
  '⬡ Quantech',
  '✦ Lumina',
  '◆ Vertex Labs',
  '⬢ Corevo',
  '✳ Skyforge',
];

export const services: Service[] = [
  {
    icon: 'monitor',
    title: 'Website Development',
    items: [
      'Business Websites',
      'Landing Pages',
      'Corporate Websites',
      'E-commerce Stores',
      'Portfolio Websites',
      'Custom Web Applications',
    ],
  },
  {
    icon: 'phone',
    title: 'Mobile App Development',
    items: ['Android Apps', 'iOS Apps', 'Cross-Platform Apps', 'Enterprise Applications'],
  },
  {
    icon: 'cpu',
    title: 'AI Development',
    items: [
      'AI Chatbots',
      'Voice AI Agents',
      'AI Customer Support',
      'AI Workflow Automation',
      'AI Content Generation',
      'AI Image & Video Generation',
      'Integrations with OpenAI, Gemini & Claude',
    ],
  },
  {
    icon: 'fileCode',
    title: 'Custom Software Development',
    items: ['CRM', 'ERP', 'HRMS', 'SaaS Platforms', 'Admin Dashboards', 'Internal Business Tools'],
  },
  {
    icon: 'cloud',
    title: 'Cloud & DevOps',
    items: [
      'AWS, Google Cloud & Azure',
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'Server Deployment',
      'Performance Optimization',
    ],
  },
];

export const features: Feature[] = [
  { icon: 'braces', label: 'Expert Full-Stack Developers' },
  { icon: 'cpu', label: 'AI Specialists' },
  { icon: 'bolt', label: 'Fast Delivery' },
  { icon: 'chart', label: 'Scalable Architecture' },
  { icon: 'shield', label: 'Secure Applications' },
  { icon: 'search', label: 'SEO-Friendly Development' },
  { icon: 'code', label: 'Clean Code' },
  { icon: 'layout', label: 'Modern UI/UX' },
  { icon: 'clock', label: 'Ongoing Support' },
  { icon: 'chat', label: 'Transparent Communication' },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery & Strategy',
    description:
      'We dig into your goals, users and market to define a sharp product strategy and roadmap.',
  },
  {
    title: 'UI/UX Design',
    description:
      'Wireframes and pixel-perfect, on-brand interfaces designed for clarity and conversion.',
  },
  {
    title: 'Development',
    description: 'Clean, modular, well-tested code built on modern, scalable architecture.',
  },
  {
    title: 'AI Integration',
    description: 'We embed chatbots, automation and generative AI where it drives real value.',
  },
  {
    title: 'Testing & QA',
    description:
      'Rigorous automated and manual testing for performance, security and reliability.',
  },
  {
    title: 'Deployment',
    description: 'Smooth, zero-downtime launches with CI/CD pipelines and cloud infrastructure.',
  },
  {
    title: 'Maintenance & Continuous Improvement',
    description: 'Ongoing monitoring, updates and iteration to keep you ahead of the curve.',
  },
];

export const technologies = [
  { abbr: 'Re', name: 'React' },
  { abbr: 'N', name: 'Next.js' },
  { abbr: 'No', name: 'Node.js' },
  { abbr: 'TS', name: 'TypeScript' },
  { abbr: 'Py', name: 'Python' },
  { abbr: 'Ex', name: 'Express.js' },
  { abbr: 'Mo', name: 'MongoDB' },
  { abbr: 'Pg', name: 'PostgreSQL' },
  { abbr: 'My', name: 'MySQL' },
  { abbr: 'Tw', name: 'Tailwind CSS' },
  { abbr: 'Dk', name: 'Docker' },
  { abbr: 'Aw', name: 'AWS' },
  { abbr: 'Gc', name: 'Google Cloud' },
  { abbr: 'Ai', name: 'OpenAI' },
  { abbr: 'Ge', name: 'Gemini' },
  { abbr: 'Cl', name: 'Claude' },
  { abbr: 'Gh', name: 'GitHub' },
  { abbr: 'Fb', name: 'Firebase' },
  { abbr: 'Rd', name: 'Redis' },
  { abbr: 'K8', name: 'Kubernetes' },
  { abbr: 'Gq', name: 'GraphQL' },
  { abbr: 'St', name: 'Stripe' },
  { abbr: 'Rz', name: 'Razorpay' },
];

export const projects: Project[] = [
  {
    glyph: 'AI',
    title: 'AI Customer Support Platform',
    description:
      'Autonomous support agent handling tier-1 tickets with human handoff and analytics.',
    tags: ['Next.js', 'OpenAI', 'Postgres', 'Redis'],
    results: [
      { num: '68%', label: 'Tickets automated' },
      { num: '3×', label: 'Faster replies' },
    ],
  },
  {
    glyph: 'HR',
    title: 'HRMS SaaS',
    description: 'Multi-tenant HR suite: payroll, attendance, leave and performance in one place.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS'],
    results: [
      { num: '12k', label: 'Employees managed' },
      { num: '40%', label: 'Less admin time' },
    ],
  },
  {
    glyph: 'Rx',
    title: 'Healthcare App',
    description: 'HIPAA-ready patient app with tele-consults, e-prescriptions and reminders.',
    tags: ['Flutter', 'Firebase', 'Python'],
    results: [
      { num: '4.9★', label: 'App store rating' },
      { num: '50k+', label: 'Active patients' },
    ],
  },
  {
    glyph: '🍔',
    title: 'Food Delivery Platform',
    description: 'Real-time ordering, live tracking and a rider app across three cities.',
    tags: ['React Native', 'Node.js', 'GraphQL', 'Stripe'],
    results: [
      { num: '1.2M', label: 'Orders / year' },
      { num: '99.9%', label: 'Uptime' },
    ],
  },
  {
    glyph: '🛒',
    title: 'E-commerce Marketplace',
    description: 'Multi-vendor marketplace with unified payments, search and seller dashboards.',
    tags: ['Next.js', 'Postgres', 'Razorpay', 'Kubernetes'],
    results: [
      { num: '2.5×', label: 'Revenue growth' },
      { num: '120ms', label: 'Avg. page load' },
    ],
  },
  {
    glyph: 'CRM',
    title: 'CRM Dashboard',
    description: 'Sales pipeline, automation and forecasting with rich, real-time analytics.',
    tags: ['React', 'TypeScript', 'Node.js'],
    results: [
      { num: '+31%', label: 'Close rate' },
      { num: '6h', label: 'Saved / week' },
    ],
  },
  {
    glyph: '📞',
    title: 'Voice AI Dialer',
    description: 'Outbound voice agent that qualifies leads and books meetings automatically.',
    tags: ['Python', 'OpenAI', 'Twilio', 'Redis'],
    results: [
      { num: '5k', label: 'Calls / day' },
      { num: '22%', label: 'Conversion lift' },
    ],
  },
  {
    glyph: '✈',
    title: 'Travel Booking App',
    description: 'Flights, stays and itineraries with dynamic pricing and secure checkout.',
    tags: ['Next.js', 'MySQL', 'Stripe', 'GCP'],
    results: [
      { num: '300k', label: 'Bookings' },
      { num: '4.8★', label: 'User rating' },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Classify Technology shipped our AI support platform in weeks, not months. It now resolves two-thirds of our tickets automatically.',
    name: 'Priya Sharma',
    role: 'VP Customer Support, Zentra Retail',
    initials: 'PS',
  },
  {
    quote:
      "The most transparent, technically sharp team we've worked with. Our marketplace scaled to millions of orders without a hitch.",
    name: 'Arjun Mehta',
    role: 'CEO, Corevo Technologies',
    initials: 'AM',
  },
  {
    quote:
      'Beautiful UI, rock-solid engineering and genuine AI expertise. Classify Technology feels like an extension of our own team.',
    name: 'Ananya Iyer',
    role: 'Founder, CareWell Health',
    initials: 'AI',
  },
  {
    quote:
      'They redesigned our website and rebuilt our CRM — close rates are up 31% and the team actually enjoys using it.',
    name: 'Rohan Malhotra',
    role: 'Sales Director, Meridian Enterprises',
    initials: 'RM',
  },
];

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '₹2,500',
    originalPrice: '₹5,000',
    unit: '/project',
    description: 'For landing pages and small business websites.',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      '2 weeks delivery',
      '30 days support',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Professional',
    price: '₹8,900',
    originalPrice: '₹17,800',
    unit: '/project',
    description: 'For web apps, mobile apps and growing SaaS products.',
    features: [
      'Custom web or mobile app',
      'UI/UX design included',
      'One AI integration',
      'Cloud deployment & CI/CD',
      '90 days support',
    ],
    cta: 'Choose Professional',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale platforms and dedicated teams.',
    features: [
      'Dedicated engineering team',
      'Advanced AI & automation',
      'Scalable cloud architecture',
      'SLA & priority support',
      'Security & compliance',
    ],
    cta: 'Contact Sales',
  },
];

export const faqs: Faq[] = [
  {
    question: 'How long does development take?',
    answer:
      'It depends on scope. A landing page can be ready in 1–2 weeks, while a full web or mobile app typically takes 6–12 weeks. After discovery we give you a clear, milestone-based timeline.',
  },
  {
    question: 'Can you build custom software?',
    answer:
      'Yes. We build tailored CRMs, ERPs, HRMS, SaaS platforms, dashboards and internal tools designed precisely around your workflows and business logic.',
  },
  {
    question: 'Can you integrate AI into existing systems?',
    answer:
      'Yes. We integrate chatbots, voice agents, automation and generative AI (OpenAI, Gemini, Claude and others) into your current stack via secure APIs — no full rebuild required.',
  },
  {
    question: 'Do you provide maintenance?',
    answer:
      'Yes. We offer ongoing maintenance, monitoring, performance tuning and feature iteration through flexible support plans so your product keeps improving after launch.',
  },
  {
    question: 'Can you redesign my current website?',
    answer:
      'Yes. We modernize existing websites and apps with fresh UI/UX, better performance, SEO and accessibility — while preserving what already works for your users.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'Our core stack includes React, Next.js, Node.js, TypeScript and Python, with Postgres, MongoDB and Redis for data, Docker, Kubernetes and AWS/GCP/Azure for infrastructure, and leading AI models for intelligence.',
  },
];

export const contactInfo = {
  email: 'hello@classifytechnology.in',
  phoneDisplay: '+91 70176 72081',
  phoneHref: '+917017672081',
  whatsapp: '917017672081',
  address: 'New Delhi, India',
};
