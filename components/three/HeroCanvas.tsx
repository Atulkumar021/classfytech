'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { useReducedMotion, useIsIntersecting } from '@/lib/hooks';
import Lights from './Lights';
import CameraRig from './CameraRig';
import ParticleField from './ParticleField';
import FloatingObjects from './FloatingObjects';
import DistortOrb from './DistortOrb';

/**
 * HeroCanvas — the R3F <Canvas> compositing the cinematic hero:
 * a nebula of particles, the central distort orb, and orbiting glass shards.
 * Loaded dynamically with SSR off (WebGL is browser-only). Particle count and
 * DPR scale to the viewport / motion preference for performance.
 *
 * The render loop is paused entirely once the hero scrolls off-screen — three
 * WebGL scenes rendering every frame while invisible was the main tax on
 * scroll smoothness further down the page.
 */
export default function HeroCanvas() {
  const reduced = useReducedMotion();
  const [particleCount, setParticleCount] = useState(2600);
  const { ref, visible } = useIsIntersecting<HTMLDivElement>();

  useEffect(() => {
    const w = window.innerWidth;
    setParticleCount(reduced ? 500 : w < 768 ? 1100 : 2600);
  }, [reduced]);

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        className="hero__canvas"
        // Inline style beats R3F's default inline `position: relative` on the
        // wrapper div — without this the canvas becomes an in-flow flex item and
        // pushes the hero text out of place.
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
      >
        <CameraRig />
        <Lights />
        <ParticleField count={particleCount} reduced={reduced} />
        <DistortOrb reduced={reduced} />
        <FloatingObjects reduced={reduced} />
      </Canvas>
    </div>
  );
}
