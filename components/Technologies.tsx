import Reveal from '@/components/ui/Reveal';
import TechScene from '@/components/three/TechScene';

export default function Technologies() {
  return (
    <section className="section" id="tech">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Under the Hood</span>
          <h2 className="section__title">
            What it is <span className="gradient-text">actually built on</span>
          </h2>
          {/* "Best-in-class providers" no longer described this list once the
              vendor names came out of it; what is left is the stack itself. */}
          <p className="section__subtitle">
            The pieces that have to work for a call to sound like a call: audio
            in and out in real time, speech both ways, and the plumbing that
            keeps it up. Drag the sphere to look around.
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
