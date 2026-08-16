import Contact from '@/components/Contact';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a Demo',
  description:
    "Book a free live demo of a Voice AI agent — tell us about your use case and we'll show you a real call flow within one business day.",
  path: '/contact',
});

export default function ContactPage() {
  return <Contact />;
}
