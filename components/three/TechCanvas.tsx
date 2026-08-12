'use client';

import { Canvas } from '@react-three/fiber';
import { useReducedMotion, useIsIntersecting } from '@/lib/hooks';
import TechSphere from './TechSphere';

/**
 * TechCanvas — the <Canvas> host for the 3D tech sphere. Inline `position` wins
 * over R3F's default so it fills its container. Loaded dynamically (SSR off).
 * Render loop pauses while scrolled off-screen so it doesn't tax scroll fps.
 */
export default function TechCanvas() {
  const reduced = useReducedMotion();
  const { ref, visible } = useIsIntersecting<HTMLDivElement>();
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        camera={{ position: [0, 0, 10.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
      >
        <TechSphere reduced={reduced} />
      </Canvas>
    </div>
  );
}
