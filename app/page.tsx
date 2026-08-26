import CompanyHero from '@/components/CompanyHero';
import Marquee from '@/components/Marquee';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CTABand from '@/components/CTABand';

/**
 * `ProductGrid` used to sit between the marquee and WhyChooseUs. It's gone:
 * the hero's preview cards now carry the product name, tagline, a live demo of
 * it running and both CTAs, so the grid was a second listing of the same three
 * products immediately below the first.
 */
export default function Home() {
  return (
    <>
      <CompanyHero />
      <Marquee />
      <WhyChooseUs />
      <Testimonials />
      <CTABand />
    </>
  );
}
