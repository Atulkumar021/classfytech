'use client';

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { useEffect } from 'react';
import { useInView } from '@/lib/hooks';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'ref' | 'className'>;

/**
 * Wraps children in a scroll-reveal container. `delay` staggers grouped items.
 * Renders as any element via the `as` prop (defaults to div). Any extra DOM
 * props (event handlers, aria-*, etc.) are forwarded to the rendered element.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  // `.reveal` sets `will-change: opacity, transform, filter` so the intro
  // transition is composited smoothly. Left on forever, every revealed
  // section keeps its own GPU layer alive — on a long single-page site that
  // adds up fast and drags down scroll fps further down the page. Drop it
  // once the transition finishes so the layer can be reclaimed.
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    const clear = () => {
      node.style.willChange = 'auto';
    };
    node.addEventListener('transitionend', clear, { once: true });
    return () => node.removeEventListener('transitionend', clear);
  }, [inView, ref]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
