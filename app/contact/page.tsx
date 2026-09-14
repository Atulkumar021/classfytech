import Contact from '@/components/Contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Demo',
  description:
    "Book a free live demo of NiaTalks — tell us about your use case and we'll show you a real Voice AI call flow, or the Dialer running, within one business day.",
  path: '/contact',
  keywords: ['NiaTalks demo', 'AI voice agent demo', 'dialer demo', 'contact NiaTalks'],
});

export default function ContactPage() {
  return <Contact />;
}
