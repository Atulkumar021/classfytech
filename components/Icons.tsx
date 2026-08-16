import type { SVGProps } from 'react';

/**
 * Icon set — lightweight, tree-shakeable inline SVGs (no icon-font dependency).
 * All icons inherit `currentColor` and accept standard SVG props.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const Star = (p: IconProps) => (
  <svg {...base} strokeWidth={2.2} {...p}>
    <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" />
  </svg>
);
export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
export const ArrowUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);
export const Moon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
export const Code = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 17l6-6-6-6M12 19h8" />
  </svg>
);
export const Bolt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
  </svg>
);
export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
export const Cpu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2a4 4 0 00-4 4v1a4 4 0 000 8v1a4 4 0 008 0v-1a4 4 0 000-8V6a4 4 0 00-4-4z" />
    <path d="M8 11h8" />
  </svg>
);
export const Monitor = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M12 18h.01" />
  </svg>
);
export const FileCode = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M9 13l2 2 4-4" />
  </svg>
);
export const Cloud = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M17.5 19a4.5 4.5 0 00.5-8.97A6 6 0 006 9a4.5 4.5 0 00-1 8.9" />
    <path d="M12 12v6M9 15l3 3 3-3" />
  </svg>
);
export const Chart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 3v18h18M7 14l4-4 4 4 5-6" />
  </svg>
);
export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4-4" />
  </svg>
);
export const Layout = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6v6H9z" />
  </svg>
);
export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 8v4l3 3" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);
export const Chat = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
export const Braces = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);
export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
export const Check = (p: IconProps) => (
  <svg {...base} strokeWidth={2.5} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
);
export const PhoneCall = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
  </svg>
);
export const WhatsApp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 11.5a8.5 8.5 0 01-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1121 11.5z" />
  </svg>
);
export const Send = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
);
export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);
export const Globe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15 15 0 010 20 15 15 0 010-20z" />
  </svg>
);
export const Twitter = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);
export const LinkedIn = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM6 9H2v12h4zM4 6a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);
export const GitHub = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-1-2.6c3-.4 6-1.5 6-6.6a5.1 5.1 0 00-1.4-3.6 4.8 4.8 0 00-.1-3.5s-1.1-.4-3.6 1.3a12.3 12.3 0 00-6.4 0C6.5 1.3 5.4 1.7 5.4 1.7a4.8 4.8 0 00-.1 3.5A5.1 5.1 0 004 8.8c0 5 3 6.2 6 6.6a3.4 3.4 0 00-1 2.6V22" />
  </svg>
);

export const serviceIcons = {
  monitor: Monitor,
  phone: Phone,
  cpu: Cpu,
  fileCode: FileCode,
  cloud: Cloud,
} as const;

export const featureIcons = {
  braces: Braces,
  cpu: Cpu,
  bolt: Bolt,
  chart: Chart,
  shield: Shield,
  search: Search,
  code: Code,
  layout: Layout,
  clock: Clock,
  chat: Chat,
} as const;
