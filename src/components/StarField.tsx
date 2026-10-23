// -----------------------------------------------------------------------------
// StarField
// -----------------------------------------------------------------------------
// A lightweight, canvas-based star field rendered behind the entrance screen.
//
// Design goals:
//   - Subtle: silver stars on a midnight-blue background. No neon, no clutter.
//   - Cheap: ~150 stars, single requestAnimationFrame loop, cleared on unmount.
//   - Accessible: fully decorative (aria-hidden). Static fallback when the
//     user has `prefers-reduced-motion: reduce`.
//   - Responsive: resizes with its container via ResizeObserver.
// -----------------------------------------------------------------------------

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface StarFieldProps {
  /** Number of stars to render. Lower on small screens for performance. */
  starCount?: number;

  /**
   * When true, disables the twinkle animation regardless of the user's
   * motion preference. Useful for tests or for keeping a very calm screen.
   */
  forceStatic?: boolean;

  /** Optional extra classes for the outer wrapper. */
  className?: string;
}

const STAR_COUNT_DESKTOP = 160;
const STAR_COUNT_MOBILE = 90;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function StarField({
  starCount,
  forceStatic = false,
  className = '',
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // -------------------------------------------------------------------
    // Determine how many stars to draw based on viewport width
    // -------------------------------------------------------------------
    const getCount = () => {
      if (typeof starCount === 'number') return starCount;
      const w = window.innerWidth;
      return w < 640 ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP;
    };

    // -------------------------------------------------------------------
    // (Re)create the star field for the current canvas size
    // -------------------------------------------------------------------
    const buildStars = (width: number, height: number) => {
      const count = getCount();
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.3, // 0.3 - 1.4 px
          baseAlpha: Math.random() * 0.4 + 0.35, // 0.35 - 0.75
          twinkleSpeed: Math.random() * 0.6 + 0.2, // slow, subtle
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    // -------------------------------------------------------------------
    // Resize handler: match canvas pixels to CSS pixels, accounting for DPR
    // -------------------------------------------------------------------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars(width, height);
    };

    // -------------------------------------------------------------------
    // Draw a single static frame (used for reduced motion & cleanup)
    // -------------------------------------------------------------------
    const drawStatic = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const s of starsRef.current) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${s.baseAlpha})`; // slate-200-ish
        ctx.fill();
      }
    };

    // -------------------------------------------------------------------
    // Animation loop
    // -------------------------------------------------------------------
    const startAnimation = () => {
      const animate = (time: number) => {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        for (const s of starsRef.current) {
          const t = time / 1000;
          const twinkle =
            0.6 +
            0.4 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
          const alpha = Math.min(1, Math.max(0, s.baseAlpha * twinkle));

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
          ctx.fill();
        }

        rafRef.current = requestAnimationFrame(animate);
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    // -------------------------------------------------------------------
    // Initial paint + resize observation
    // -------------------------------------------------------------------
    resize();
    const reduceMotion = prefersReducedMotion();

    if (reduceMotion || forceStatic) {
      drawStatic();
    } else {
      startAnimation();
    }

    resizeObserverRef.current = new ResizeObserver(() => {
      resize();
      if (reduceMotion || forceStatic) {
        drawStatic();
      }
    });
    resizeObserverRef.current.observe(canvas);

    // -------------------------------------------------------------------
    // Cleanup
    // -------------------------------------------------------------------
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      // Clear the canvas so it doesn't linger if remounted elsewhere.
      try {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);
      } catch {
        // Ignore — canvas may already be detached.
      }
    };
  }, [starCount, forceStatic]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

export default StarField;