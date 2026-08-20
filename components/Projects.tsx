import { projects } from '@/lib/content';
import { projectIcons } from '@/components/Icons';
import Reveal from '@/components/ui/Reveal';

const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((project, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: project.title,
    description: project.description,
  })),
};

export default function Projects() {
  return (
    <section className="section section--page-top" id="work">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }} />
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Solutions</span>
          <h1 className="section__title">
            One platform, <span className="gradient-text">endless use cases</span>
          </h1>
          <p className="section__subtitle">
            However your team uses the phone today, a Voice AI agent can do it around the clock.
          </p>
        </Reveal>

        <div className="grid grid--projects">
          {projects.map((project, i) => {
            const Icon = projectIcons[project.icon];
            return (
              <Reveal key={project.title} delay={(i % 4) * 40} as="article" className="card project">
                <div className="project__body">
                  <span className="project__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{project.title}</h3>
                  <p className="project__desc">{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project__result">
                    {project.results.map((result) => (
                      <div key={result.label}>
                        <div className="num">{result.num}</div>
                        <div className="lbl">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
