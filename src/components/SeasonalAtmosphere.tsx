import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type SeasonMode = 'snow' | 'rain';

interface SeasonalAtmosphereProps {
  mode?: SeasonMode;
}

export function SeasonalAtmosphere({ mode = 'snow' }: SeasonalAtmosphereProps) {
  const reduceMotion = useReducedMotion();
  const isSnow = mode === 'snow';

  const particles = useMemo(() => {
    const count = isSnow ? 65 : 75;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${((i * 37.19 + 7) % 96) + 2}%`,
      delay: (i * 0.28) % 6,
      duration: isSnow
        ? 5 + ((i * 19) % 45) / 10
        : 0.75 + ((i * 13) % 35) / 100,
      size: isSnow ? 3 + ((i * 11) % 5) : 14 + ((i * 7) % 16),
      opacity: isSnow ? 0.35 + ((i * 5) % 4) * 0.12 : 0.22 + ((i * 5) % 4) * 0.08,
      horizontalDrift: isSnow ? ((i % 5) - 2) * 25 : -15,
    }));
  }, [isSnow]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none"
    >
      <style>{`
        @keyframes ambient-snow-fall {
          0% {
            transform: translate3d(0, -5vh, 0);
          }
          100% {
            transform: translate3d(var(--drift-x, 20px), 105vh, 0);
          }
        }
        @keyframes ambient-rain-fall {
          0% {
            transform: translate3d(0, -10vh, 0);
          }
          100% {
            transform: translate3d(-3vw, 110vh, 0);
          }
        }
        .season-snow-flake {
          position: absolute;
          top: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 40%, rgba(254, 226, 226, 0.6) 100%);
          box-shadow: 0 0 8px rgba(244, 114, 182, 0.4);
          animation: ambient-snow-fall linear infinite;
        }
        .season-rain-drop {
          position: absolute;
          top: -30px;
          width: 1.5px;
          border-radius: 9999px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(244, 114, 182, 0.2),
            rgba(192, 132, 252, 0.45),
            transparent
          );
          animation: ambient-rain-fall linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .season-snow-flake,
          .season-rain-drop {
            animation: none !important;
            opacity: 0.15 !important;
          }
        }
      `}</style>

      {/* Floating atmospheric ambient glow orbs */}
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, 20, -15, 0],
                y: [0, -15, 15, 0],
                opacity: [0.3, 0.5, 0.3],
              }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-pink-300/25 blur-[120px]"
      />
      <motion.div
        animate={
          reduceMotion
            ? {}
            : {
                x: [0, -25, 20, 0],
                y: [0, 20, -15, 0],
                opacity: [0.25, 0.45, 0.25],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-[130px]"
      />

      {/* Particles */}
      {particles.map((p) =>
        isSnow ? (
          <div
            key={`snow-${p.id}`}
            className="season-snow-flake"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--drift-x': `${p.horizontalDrift}px`,
              } as React.CSSProperties
            }
          />
        ) : (
          <div
            key={`rain-${p.id}`}
            className="season-rain-drop"
            style={{
              left: p.left,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        )
      )}
    </div>
  );
}

export default SeasonalAtmosphere;
