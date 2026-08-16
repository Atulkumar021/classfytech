import Projects from '@/components/Projects';
import CTABand from '@/components/CTABand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Solutions — Use Cases for Every Team',
  description:
    'Sales, support, scheduling, payments, recruiting and more — see how teams put Voice AI to work across real call use cases.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <Projects />
      <CTABand />
    </>
  );
}
