import Header from '@/components/Header';
import OfferBar from '@/components/OfferBar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Technologies from '@/components/Technologies';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <OfferBar />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <WhyChooseUs />
        <Process />
        <Technologies />
        <Projects />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
