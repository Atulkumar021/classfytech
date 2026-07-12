'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

/**
 * DistortOrb — the hero centerpiece. A morphing icosahedron with an iridescent,
 * lightly-metallic distort material, wrapped in:
 *   - a thin wireframe shell (adds a techy structural read)
 *   - a larger additive back-side "glow shell" that fakes a bloom halo without
 *     needing a post-processing pass (keeps the bundle + install light).
 * The whole group rotates slowly and tilts toward the pointer.
 */
export default function DistortOrb({ reduced = false }: { reduced?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    if (!reduced) g.rotation.y += delta * 0.15;
    // Subtle parallax tilt toward the pointer.
    const tx = state.pointer.y * 0.2;
    const ty = state.pointer.x * 0.3;
    g.rotation.x += (tx - g.rotation.x) * 0.04;
    g.rotation.z += (ty * 0.1 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Core morphing orb */}
      <mesh>
        <icosahedronGeometry args={[1.35, 12]} />
        <MeshDistortMaterial
          color={light ? '#7c3aed' : '#8b5cf6'}
          emissive={'#4c1d95'}
          emissiveIntensity={light ? 0.15 : 0.4}
          metalness={0.85}
          roughness={0.18}
          distort={reduced ? 0.15 : 0.42}
          speed={reduced ? 0 : 1.8}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh scale={1.06}>
        <icosahedronGeometry args={[1.35, 3]} />
        <meshBasicMaterial color={'#22d3ee'} wireframe transparent opacity={light ? 0.12 : 0.18} />
      </mesh>

      {/* Fake-bloom glow halo */}
      <mesh scale={1.55}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color={'#8b5cf6'}
          transparent
          opacity={light ? 0.06 : 0.14}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
