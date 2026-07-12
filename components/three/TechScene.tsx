'use client';

import dynamic from 'next/dynamic';

/**
 * Client boundary that lazy-loads the WebGL tech sphere. Keeping the
 * `dynamic(..., { ssr: false })` call inside a client component ensures
 * Three.js is code-split into its own chunk (not shipped in the initial
 * page bundle), mirroring how the hero canvas is loaded.
 */
const TechCanvas = dynamic(() => import('./TechCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function TechScene() {
  return <TechCanvas />;
}
