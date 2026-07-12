'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { technologies } from '@/lib/content';

const RADIUS = 3.6;
const _vec = new THREE.Vector3();

/** Even point distribution on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1 → -1
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

/**
 * A single technology node: a DOM pill (crisp text via site fonts) anchored to
 * a 3D position. Each frame it fades/blurs based on its distance from the
 * camera so nodes at the back of the sphere recede — giving real depth without
 * a WebGL text renderer (avoids any runtime font fetch).
 */
function TechNode({
  position,
  abbr,
  name,
}: {
  position: [number, number, number];
  abbr: string;
  name: string;
}) {
  const group = useRef<THREE.Group>(null);
  const el = useRef<HTMLDivElement>(null);

  useFrame(({ camera }) => {
    if (!group.current || !el.current) return;
    group.current.getWorldPosition(_vec);
    const dist = camera.position.distanceTo(_vec);
    // Map camera distance to opacity: near ≈ 1, far ≈ 0.14.
    const o = THREE.MathUtils.clamp(1 - (dist - 5.2) / 6.5, 0.14, 1);
    el.current.style.opacity = o.toFixed(3);
    el.current.style.filter = `blur(${((1 - o) * 2).toFixed(2)}px)`;
  });

  return (
    <group ref={group} position={position}>
      <Html center distanceFactor={8} zIndexRange={[20, 0]}>
        <div ref={el} className="tech3d">
          <span className="tech3d__dot">{abbr}</span>
          {name}
        </div>
      </Html>
    </group>
  );
}

/**
 * TechSphere — the full scene. Nodes sit on a Fibonacci sphere inside a faint
 * wireframe shell; the whole group auto-rotates, and OrbitControls lets the
 * user drag to spin it (with inertia). Structured as small, focused objects.
 */
export default function TechSphere({ reduced = false }: { reduced?: boolean }) {
  const positions = useMemo(() => fibonacciSphere(technologies.length, RADIUS), []);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Faint structural shell */}
        <mesh>
          <icosahedronGeometry args={[RADIUS, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.06} />
        </mesh>
        {technologies.map((tech, i) => (
          <TechNode key={tech.name} position={positions[i]} abbr={tech.abbr} name={tech.name} />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.45}
        autoRotate={false}
      />
    </>
  );
}
