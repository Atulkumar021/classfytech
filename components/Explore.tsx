import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { Cpu, Clock, Search, Chart, Chat, ArrowRight } from '@/components/Icons';

const items = [
  {
    icon: Cpu,
    title: 'Platform',
    desc: 'Outbound, inbound, the conversational AI engine, analytics and integrations — all in one platform.',
    href: '/platform',
  },
  {
    icon: Clock,
    title: 'How It Works',
    desc: 'From a call flow idea to a live, natural-sounding voice agent — see the process.',
    href: '/how-it-works',
  },
  {
    icon: Search,
    title: 'Solutions',
    desc: 'Sales, support, scheduling, payments and more — real use cases for every team.',
    href: '/solutions',
  },
  {
    icon: Chart,
    title: 'Pricing',
    desc: 'Simple, per-minute pricing that scales from your first agent to your whole call center.',
    href: '/pricing',
  },
  {
    icon: Chat,
    title: 'FAQ',
    desc: 'Answers to the questions we hear most about Voice AI.',
    href: '/faq',
  },
];

/**
 * Explore — a single-row hub linking the homepage out to every dedicated
 * page (Platform, How It Works, Solutions, Pricing, FAQ). Each card carries
 * just enough of a preview to be useful on its own, with a "More
 * information" link to the full page for anyone who wants the details.
 */
export default function Explore() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Explore Voice AI</span>
          <h2 className="section__title">
            Everything, <span className="gradient-text">in one place</span>
          </h2>
          <p className="section__subtitle">
            A quick look at what Voice AI offers — jump straight to what matters to you.
          </p>
        </Reveal>

        <div className="grid grid--explore">
          {items.map(({ icon: Icon, title, desc, href }, i) => (
            <Reveal key={title} delay={i * 40} as="article" className="card explore-card">
              <div className="service__icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p className="explore-card__desc">{desc}</p>
              <Link className="explore-card__link" href={href}>
                More information
                <ArrowRight />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
