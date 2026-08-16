import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Explore from '@/components/Explore';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import CTABand from '@/components/CTABand';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Explore />
      <WhyChooseUs />
      <Testimonials />
      <CTABand />
    </>
  );
}
