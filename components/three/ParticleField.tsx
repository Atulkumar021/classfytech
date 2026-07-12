'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

/**
 * ParticleField — a drifting cloud of points that fills the hero background
 * with depth. Colours are lerped between the two brand accents so the field
 * reads as a soft nebula. The whole field rotates slowly and parallaxes with
 * the pointer. Count scales down on small screens for performance.
 */
export default function ParticleField({
  count,
  reduced = false,
}: {
  count: number;
  reduced?: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';
  const spread = 12;

  // Build positions + per-vertex colours once.
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color('#7c5cff');
    const colorB = new THREE.Color('#22d3ee');
    const mixed = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread * 1.6;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;

      mixed.copy(colorA).lerp(colorB, Math.random());
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points || reduced) return;
    const t = state.clock.elapsedTime;
    points.rotation.y = t * 0.06;
    points.rotation.x = Math.sin(t * 0.04) * 0.1;
    points.position.x = -state.pointer.x * 0.4;
    points.position.y = -state.pointer.y * 0.4;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={light ? 0.55 : 0.9}
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}
