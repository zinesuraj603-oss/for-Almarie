import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SkyEffectsProps {
  type: 'rain' | 'snow';
}

export function SkyEffects({ type }: SkyEffectsProps) {
  const reduceMotion = useReducedMotion();
  const snow = type === 'snow';

  const particles = useMemo(() => {
    const count = snow ? 80 : 120;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${((i * 37.17 + 11) % 96) + 2}%`,
      top: `${(i * 23.71) % 100}%`,
      delay: (i * 0.37) % 5,
      duration: snow
        ? 4 + ((i * 17) % 40) / 10
        : 0.55 + ((i * 13) % 30) / 100,
      size: snow ? 3 + ((i * 11) % 5) : 12 + ((i * 7) % 16),
    }));
  }, [snow]);

  return (
    <div
      className="absolute inset-0 overflow-hidden select-none"
      style={{
        background: snow
          ? 'linear-gradient(180deg, #101b35 0%, #344f78 48%, #c2d9ed 100%)'
          : 'linear-gradient(180deg, #08151e 0%, #102c35 45%, #153b43 72%, #06151d 100%)',
      }}
    >
      <style>{`
        @keyframes sky-rain-fall {
          0% { transform: translate3d(0, -15vh, 0); }
          100% { transform: translate3d(-5vw, 115vh, 0); }
        }

        @keyframes sky-snow-fall {
          0% { transform: translate3d(0, -8vh, 0); }
          100% { transform: translate3d(35px, 110vh, 0); }
        }

        @keyframes sky-ripple {
          0% { transform: scale(.25); opacity: 0; }
          20% { opacity: .45; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        @keyframes sky-breathe {
          0%, 100% { opacity: .2; }
          50% { opacity: .6; }
        }

        @keyframes sky-fog {
          0% { transform: translateX(-4%); }
          100% { transform: translateX(4%); }
        }

        .sky-rain-streak {
          position: absolute;
          top: -18vh;
          width: 1.5px;
          border-radius: 99px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(190, 240, 255, .15),
            rgba(190, 240, 255, .68),
            rgba(190, 240, 255, .08)
          );
          animation: sky-rain-fall linear infinite;
          will-change: transform;
        }

        .sky-rain-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          animation: sky-breathe 6s ease-in-out infinite alternate;
        }

        .sky-ripple {
          position: absolute;
          width: 90px;
          height: 24px;
          border: 1px solid rgba(148, 220, 255, .45);
          border-radius: 50%;
          animation: sky-ripple 3.5s ease-out infinite;
        }

        .sky-fog {
          position: absolute;
          inset: 35% -15% 0;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(90, 165, 177, .08),
            rgba(15, 45, 58, .32),
            transparent
          );
          filter: blur(30px);
          animation: sky-fog 12s ease-in-out infinite alternate;
        }

        .sky-snowflake {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, .95);
          box-shadow: 0 0 8px rgba(210, 232, 255, .7);
          animation: sky-snow-fall linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .sky-rain-streak, .sky-ripple, .sky-rain-glow,
          .sky-fog, .sky-snowflake {
            animation-play-state: paused !important;
          }
        }
      `}</style>

      {snow ? (
        <>
          {/* Moon Glow */}
          <div
            className="absolute right-[14%] top-[12%] h-16 w-16 rounded-full"
            style={{
              background: '#f0f8ff',
              boxShadow: '0 0 75px 25px rgba(210, 235, 255, .35)',
            }}
          />

          {/* Distant Snowy Mountains */}
          <svg
            className="absolute bottom-[15%] h-[43%] w-full pointer-events-none"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 330 L140 150 L230 255 L390 75 L550 270 L720 120 L890 275 L1030 130 L1200 300 L1200 400 L0 400Z"
              fill="#778bab"
              opacity=".55"
            />
            <path
              d="M140 150 L110 192 L145 178 L165 196 L185 198 L230 255 L203 209 L175 190Z"
              fill="#e4edff"
            />
            <path
              d="M390 75 L345 140 L385 122 L408 145 L433 132 L550 270 L470 143Z"
              fill="#e6edff"
            />
            <path
              d="M720 120 L680 178 L718 158 L745 185 L770 172 L890 275 L820 170Z"
              fill="#e1eaff"
            />
          </svg>

          {/* Snow-Covered Pines */}
          <div className="absolute bottom-[11%] flex w-full items-end justify-around px-[3%] pointer-events-none">
            {Array.from({ length: 13 }, (_, i) => (
              <div
                key={`pine-${i}`}
                className="relative"
                style={{
                  width: `${24 + (i % 3) * 9}px`,
                  height: `${65 + ((i * 17) % 75)}px`,
                  opacity: 0.65 + (i % 4) * 0.1,
                }}
              >
                {[0, 1, 2].map((layer) => (
                  <div
                    key={`layer-${layer}`}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      top: `${layer * 24}%`,
                      width: 0,
                      height: 0,
                      borderLeft: `${12 + layer * 4}px solid transparent`,
                      borderRight: `${12 + layer * 4}px solid transparent`,
                      borderBottom: `${35 + layer * 9}px solid ${
                        layer === 1 ? '#e1eaff' : '#a8c2df'
                      }`,
                      filter: 'drop-shadow(0 0 6px rgba(220,235,255,.15))',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Snow-Covered Ground */}
          <div
            className="absolute -bottom-[8%] left-[-10%] h-[25%] w-[120%] rounded-[50%]"
            style={{
              background: 'linear-gradient(180deg, #f0f7ff 0%, #bdcde2 65%, #647b9d 100%)',
              boxShadow: '0 -15px 60px rgba(220,235,255,.22)',
            }}
          />

          {/* Cute Animated Snowman */}
          <motion.div
            className="absolute bottom-[8%] left-[18%] h-[180px] w-[105px] pointer-events-none"
            animate={reduceMotion ? {} : { rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Body Base */}
            <div
              className="absolute bottom-0 left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #fff 10%, #d9e6f6 100%)',
                boxShadow: 'inset -9px -8px 16px rgba(83,110,150,.25)',
              }}
            />
            {/* Head */}
            <div
              className="absolute bottom-[76px] left-1/2 h-[69px] w-[69px] -translate-x-1/2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #fff 10%, #d9e6f6 100%)',
                boxShadow: 'inset -7px -6px 12px rgba(83,110,150,.22)',
              }}
            />
            {/* Eyes */}
            <div className="absolute bottom-[118px] left-[35px] h-[6px] w-[6px] rounded-full bg-slate-800" />
            <div className="absolute bottom-[118px] left-[62px] h-[6px] w-[6px] rounded-full bg-slate-800" />
            {/* Carrot Nose */}
            <div
              className="absolute bottom-[106px] left-[48px] h-0 w-0"
              style={{
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderLeft: '22px solid #ea580c',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              }}
            />
            {/* Hat */}
            <div className="absolute bottom-[143px] left-[29px] h-[10px] w-[62px] rounded-sm bg-[#1e2338]" />
            <div className="absolute bottom-[145px] left-[40px] h-[35px] w-[40px] rounded-t-sm bg-[#1e2338]" />
            {/* Scarf */}
            <div
              className="absolute bottom-[65px] left-[24px] h-[13px] w-[59px] rounded-full shadow-sm"
              style={{ background: '#9f1239', transform: 'rotate(-8deg)' }}
            />
            {/* Buttons */}
            {[0, 1, 2].map((n) => (
              <div
                key={`btn-${n}`}
                className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-slate-700"
                style={{ bottom: `${48 - n * 15}px` }}
              />
            ))}
          </motion.div>

          {/* Falling Snow Particles */}
          {particles.map((p) => (
            <div
              key={`snow-${p.id}`}
              className="sky-snowflake pointer-events-none"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: 0.35 + (p.id % 6) * 0.1,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                animationPlayState: reduceMotion ? 'paused' : 'running',
              }}
            />
          ))}
        </>
      ) : (
        <>
          {/* Rain Atmosphere Glows */}
          <div
            className="sky-rain-glow"
            style={{
              width: '42vw',
              height: '30vh',
              left: '-12%',
              top: '30%',
              background: 'rgba(25, 184, 183, .25)',
            }}
          />
          <div
            className="sky-rain-glow"
            style={{
              width: '35vw',
              height: '25vh',
              right: '-7%',
              top: '40%',
              background: 'rgba(59, 130, 246, .2)',
              animationDelay: '-3s',
            }}
          />
          <div
            className="sky-rain-glow"
            style={{
              width: '40vw',
              height: '23vh',
              left: '27%',
              bottom: '6%',
              background: 'rgba(45, 212, 191, .2)',
              animationDelay: '-1.5s',
            }}
          />

          {/* Cloudy Ambient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 28%, rgba(94,160,171,.16), transparent 50%), linear-gradient(180deg, transparent 30%, rgba(4,18,27,.35) 75%)',
            }}
          />

          <div className="sky-fog" />

          {/* Falling Rain Streaks */}
          {particles.map((p) => (
            <div
              key={`rain-${p.id}`}
              className="sky-rain-streak pointer-events-none"
              style={{
                left: p.left,
                height: `${p.size}px`,
                opacity: 0.2 + (p.id % 5) * 0.08,
                animationDuration: `${p.duration}s`,
                animationDelay: `${-p.delay}s`,
                animationPlayState: reduceMotion ? 'paused' : 'running',
              }}
            />
          ))}

          {/* Wet Ground */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[34%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(17,45,55,.18) 0%, rgba(8,29,40,.85) 35%, #04121b 100%)',
              borderTop: '1px solid rgba(157,220,255,.12)',
            }}
          />

          {/* Water Reflections */}
          <div
            className="absolute bottom-[5%] left-[8%] h-[18%] w-[22%] rotate-[-8deg] rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(45,212,191,.22), rgba(45,212,191,.02) 75%, transparent)',
              filter: 'blur(17px)',
            }}
          />
          <div
            className="absolute bottom-[4%] right-[12%] h-[21%] w-[20%] rotate-[8deg] rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(56,189,248,.22), rgba(56,189,248,.02) 75%, transparent)',
              filter: 'blur(19px)',
            }}
          />
          <div
            className="absolute bottom-[12%] left-[40%] h-[3px] w-[22%] rounded-full pointer-events-none"
            style={{
              background: 'rgba(105,220,229,.25)',
              boxShadow: '0 0 25px 12px rgba(45,212,191,.08)',
              filter: 'blur(4px)',
            }}
          />

          {/* Puddle Ripples */}
          {[
            { left: '13%', bottom: '13%', delay: '0s' },
            { left: '28%', bottom: '7%', delay: '1.2s' },
            { left: '48%', bottom: '16%', delay: '2s' },
            { left: '68%', bottom: '9%', delay: '0.8s' },
            { left: '84%', bottom: '17%', delay: '1.7s' },
            { left: '57%', bottom: '5%', delay: '2.6s' },
          ].map((ripple, i) => (
            <div
              key={`ripple-${i}`}
              className="sky-ripple pointer-events-none"
              style={{
                left: ripple.left,
                bottom: ripple.bottom,
                animationDelay: ripple.delay,
                animationPlayState: reduceMotion ? 'paused' : 'running',
              }}
            />
          ))}

          {/* Soft Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 32%, rgba(3,7,18,.25) 100%)',
            }}
          />
        </>
      )}
    </div>
  );
}