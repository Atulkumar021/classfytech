import Reveal from '@/components/ui/Reveal';
import TechScene from '@/components/three/TechScene';

export default function Technologies() {
  return (
    <section className="section" id="tech">
      <div className="container">
        <Reveal className="section__head center">
          <span className="eyebrow">Technologies</span>
          <h2 className="section__title">
            A <span className="gradient-text">modern, battle-tested</span> stack
          </h2>
          <p className="section__subtitle">
            We choose the right tools for the job — proven, performant and future-proof. Drag the
            sphere to explore our stack.
          </p>
        </Reveal>

        <Reveal className="tech-canvas">
          <TechScene />
        </Reveal>
        <p className="tech-canvas__hint">✦ Drag to rotate · hover to focus</p>
      </div>
    </section>
  );
}
