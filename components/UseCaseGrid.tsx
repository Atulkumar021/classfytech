import type { Project } from '@/lib/content';
import { projectIcons } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

/**
 * Use-case cards, driven by data so every product can show its own set.
 *
 * Renders as an inline section (h2, normal padding) because product pages now
 * carry all their sections on one page rather than linking out to sub-pages.
 * `results` is optional — products without published figures simply omit it
 * instead of showing invented ones.
 */
export default function UseCaseGrid({
  id = 'solutions',
  eyebrow,
  title,
  accent,
  subtitle,
  items,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  items: Project[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
      description: item.description,
    })),
  };

  return (
    <section className="section" id={id}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section__title">
            {title}
            {accent && <span className="gradient-text">{accent}</span>}
          </h2>
          <p className="section__subtitle">{subtitle}</p>
        </Reveal>

        <div className="grid grid--projects">
          {items.map((item, i) => {
            const Icon = projectIcons[item.icon];
            return (
              <Reveal key={item.title} delay={(i % 4) * 40} as="article" className="card project">
                <div className="project__body">
                  <span className="project__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="project__desc">{item.description}</p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.results && item.results.length > 0 && (
                    <div className="project__result">
                      {item.results.map((result) => (
                        <div key={result.label}>
                          <div className="num">{result.num}</div>
                          <div className="lbl">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
