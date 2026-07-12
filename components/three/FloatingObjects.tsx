'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

type GeoKind = 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron' | 'torusKnot';

interface ShapeDef {
  geo: GeoKind;
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}

// Small shards orbiting the central orb — pushed out so they never overlap it.
const SHAPES: ShapeDef[] = [
  { geo: 'icosahedron', position: [-3.6, 1.6, -0.5], scale: 0.5, color: '#8b5cf6', speed: 1.2 },
  { geo: 'torus', position: [3.7, -1.1, -0.8], scale: 0.5, color: '#22d3ee', speed: 1.6 },
  { geo: 'octahedron', position: [3.0, 2.0, -1.5], scale: 0.4, color: '#e879f9', speed: 1.4 },
  { geo: 'dodecahedron', position: [-3.2, -1.8, -1], scale: 0.42, color: '#38bdf8', speed: 1.0 },
  { geo: 'torusKnot', position: [0.6, -2.6, -1.8], scale: 0.34, color: '#a855f7', speed: 1.8 },
];

function Geometry({ kind }: { kind: GeoKind }) {
  switch (kind) {
    case 'torus':
      return <torusGeometry args={[0.7, 0.26, 32, 96]} />;
    case 'octahedron':
      return <octahedronGeometry args={[0.85, 0]} />;
    case 'dodecahedron':
      return <dodecahedronGeometry args={[0.8, 0]} />;
    case 'torusKnot':
      return <torusKnotGeometry args={[0.55, 0.18, 128, 32]} />;
    case 'icosahedron':
    default:
      return <icosahedronGeometry args={[0.9, 0]} />;
  }
}

function GlassShape({ def, reduced }: { def: ShapeDef; reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';

  useFrame((_, delta) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.x += delta * 0.2 * def.speed;
    meshRef.current.rotation.y += delta * 0.28 * def.speed;
  });

  const mesh = (
    <mesh ref={meshRef} position={def.position} scale={def.scale}>
      <Geometry kind={def.geo} />
      <meshPhysicalMaterial
        color={def.color}
        metalness={0.1}
        roughness={0.15}
        transmission={light ? 0.75 : 0.9}
        thickness={1.2}
        ior={1.4}
        transparent
        opacity={light ? 0.96 : 0.92}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );

  // Float adds gentle bob/rotation; skip it entirely for reduced motion.
  if (reduced) return mesh;
  return (
    <Float speed={def.speed} rotationIntensity={0.4} floatIntensity={0.8}>
      {mesh}
    </Float>
  );
}

/**
 * FloatingObjects — a cluster of translucent, glass-like primitives that bob
 * and rotate in the hero. The whole group tilts toward the pointer for a 3D
 * hover feel, mirroring the original imperative FloatingObjects class.
 */
export default function FloatingObjects({ reduced = false }: { reduced?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => SHAPES, []);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const targetY = state.pointer.x * 0.25;
    const targetX = -state.pointer.y * 0.2;
    group.rotation.y += (targetY - group.rotation.y) * 0.05;
    group.rotation.x += (targetX - group.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((def, i) => (
        <GlassShape key={i} def={def} reduced={reduced} />
      ))}
    </group>
  );
}
