import { projects } from '@/lib/content';
import Reveal from '@/components/ui/Reveal';

export default function Projects() {
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Featured Work</span>
          <h2 className="section__title">
            Work that <span className="gradient-text">delivers results</span>
          </h2>
          <p className="section__subtitle">
            A selection of platforms we&apos;ve designed, built and scaled — with measurable
            business results.
          </p>
        </Reveal>

        <div className="grid grid--projects">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 45} as="article" className="card project">
              <div className="project__media">
                <span className="project__glyph">{project.glyph}</span>
              </div>
              <div className="project__body">
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
          ))}
        </div>
      </div>
    </section>
  );
}
