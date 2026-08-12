import { services } from '@/lib/content';
import { serviceIcons, ArrowRight } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

// Bento column spans per service tile (6-col grid): two wide, three medium.
const spans = ['col-3', 'col-3', 'col-2', 'col-2', 'col-2'];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">The Platform</span>
          <h2 className="section__title">
            One agent, <span className="gradient-text">every conversation</span>
          </h2>
          <p className="section__subtitle">
            Outbound calling, inbound support, the conversational AI engine, analytics and every
            integration you need — all in one voice AI platform.
          </p>
        </Reveal>

        <div className="bento">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal
                key={service.title}
                delay={i * 40}
                as="article"
                className={`card service ${spans[i] ?? 'col-2'}`}
              >
                <div className="service__icon">
                  <Icon />
                </div>
                <h3>{service.title}</h3>
                <ul className="service__list">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}

          <Reveal delay={services.length * 40} as="article" className="card svc-cta col-6">
            <div className="svc-cta__text">
              <h3>Need a custom workflow?</h3>
              <p>Tell us about your call flow and we&apos;ll help you design the right agent for it.</p>
            </div>
            <a className="btn btn--primary" href="#contact">
              Let&apos;s talk
              <ArrowRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
