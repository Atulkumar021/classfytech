'use client';

import { useTheme } from 'next-themes';

/**
 * Lighting rig for the hero: soft ambient fill plus a violet key, a cyan rim
 * and a magenta accent that make the metallic orb read as iridescent glass.
 * Colours and intensities adapt to the active theme.
 */
export default function Lights() {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === 'light';

  return (
    <>
      <ambientLight intensity={light ? 0.85 : 0.45} />
      <pointLight
        position={[-5, 4, 4]}
        intensity={60}
        distance={40}
        color={light ? '#7c3aed' : '#8b5cf6'}
      />
      <pointLight
        position={[6, -3, 3]}
        intensity={48}
        distance={40}
        color={light ? '#0ea5e9' : '#22d3ee'}
      />
      <pointLight
        position={[0, 5, -4]}
        intensity={35}
        distance={40}
        color={light ? '#d946ef' : '#e879f9'}
      />
    </>
  );
}
