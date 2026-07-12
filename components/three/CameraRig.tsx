'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

/**
 * CameraRig — eases the camera toward an offset driven by the pointer, giving
 * the whole hero a subtle, on-rails parallax (no free orbit controls). This is
 * the R3F equivalent of the old imperative Camera class's update() loop.
 */
export default function CameraRig({ strength = 0.6 }: { strength?: number }) {
  const base = useRef(new THREE.Vector3(0, 0, 6));
  const { camera } = useThree();

  useFrame((state) => {
    const targetX = base.current.x + state.pointer.x * strength;
    const targetY = base.current.y + state.pointer.y * strength;
    // Smoothly damp toward the target for a fluid feel.
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z = base.current.z;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
