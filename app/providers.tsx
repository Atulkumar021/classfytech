'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Client-side providers. next-themes handles dark/light with persistence and
 * no flash-of-wrong-theme. We map its attribute to `data-theme` so the CSS
 * token system in globals.css switches automatically.
 *
 * Light is the default, and `enableSystem` is off on purpose: with it on,
 * anyone whose OS is set to dark would land on the dark theme regardless of
 * this default, so "light by default" would only hold for some visitors.
 * A visitor's own choice is still remembered (localStorage) across visits.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
