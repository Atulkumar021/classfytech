'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from '@/components/Icons';

/**
 * Dark/light toggle backed by next-themes. Renders a stable placeholder until
 * mounted to avoid hydration mismatch (server can't know the resolved theme).
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={mounted ? !isDark : undefined}
    >
      {mounted && !isDark ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
    </button>
  );
}
