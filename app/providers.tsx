'use client';

import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Client-side providers. next-themes handles dark/light with persistence and
 * no flash-of-wrong-theme. We map its attribute to `data-theme` so the CSS
 * token system in globals.css switches automatically.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
