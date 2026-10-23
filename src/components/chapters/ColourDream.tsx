import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Heart, Moon, type LucideIcon } from 'lucide-react';
import type { QuizChapterContent } from '../../types/content';
import { playCorrectSound, playWrongSound } from '../../utils/sound';

interface ColourDreamProps {
  chapter: QuizChapterContent;
  onComplete: () => void;
}

const colours: Record<
  string,
  {
    gradient: string;
    glow: string;
    icon: LucideIcon;
    subtitle: string;
    badge: string;
    accentColor: string;
  }
> = {
  pink: {
    gradient:
      'radial-gradient(circle at 35% 28%, #ffe4ee 0%, #f472b6 40%, #db2777 80%, #881337 100%)',
    glow: 'rgba(244, 114, 182, 0.75)',
    icon: Heart,
    subtitle: 'Soft, tender & pure warmth',
    badge: 'Sweet Rose',
    accentColor: '#f472b6',
  },
  'blue-black': {
    gradient:
      'radial-gradient(circle at 35% 28%, #a5b4fc 0%, #4338ca 38%, #1e1b4b 78%, #030712 100%)',
    glow: 'rgba(129, 140, 248, 0.75)',
    icon: Moon,
    subtitle: 'Deep, calm & starry midnight',
    badge: 'Midnight Velvet',
    accentColor: '#818cf8',
  },
  purple: {
    gradient:
      'radial-gradient(circle at 35% 28%, #faf5ff 0%, #c084fc 40%, #9333ea 78%, #4a044e 100%)',
    glow: 'rgba(192, 132, 252, 0.75)',
    icon: Sparkles,
    subtitle: 'Mystical, creative & enchanting',
    badge: 'Ethereal Violet',
    accentColor: '#c084fc',
  },
};

export function ColourDream({ chapter, onComplete }: ColourDreamProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const correct = selected === chapter.correctOptionId;

  const choose = (id: string) => {
    if (correct) return;
    setSelected(id);
    const isRight = id === chapter.correctOptionId;
    setShowHint(!isRight);

    if (isRight) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  return (
    <div className="relative z-10 w-full min-h-[600px] flex flex-col items-center justify-center px-4 py-12 select-none">
      {/* Cotton Candy Dream Ambient Sky */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[1] pointer-events-none overflow-hidden bg-gradient-to-br from-[#aa7aa9] via-[#8c7bc7] to-[#e89f9e]"
      >
        {/* Dynamic Glow Aura based on Hovered/Selected Orb */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{
            background: hovered
              ? `radial-gradient(circle at 50% 50%, ${colours[hovered]?.glow || 'transparent'} 0%, transparent 60%)`
              : 'transparent',
            opacity: hovered ? 0.4 : 0,
          }}
        />

        {/* Ambient Moving Gradient Blobs */}
        <motion.div
          className="absolute -top-[18%] -left-[20%] w-[85vw] h-[65vh] rounded-full bg-pink-200/40 blur-[95px]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 45, 0],
                  y: [0, 25, 0],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-[10%] -right-[25%] w-[85vw] h-[65vh] rounded-full bg-purple-200/40 blur-[100px]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -45, 0],
                  y: [0, 35, 0],
                }
          }
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -bottom-[25%] left-[10%] w-[90vw] h-[65vh] rounded-full bg-rose-200/40 blur-[100px]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 35, 0],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating Clouds */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute rounded-full bg-white/20 blur-2xl"
            style={{
              width: `${140 + (i % 3) * 70}px`,
              height: `${50 + (i % 3) * 20}px`,
              left: `${((i * 17) % 90) + 4}%`,
              top: `${10 + ((i * 14) % 75)}%`,
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, 30, 0],
                  }
            }
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating Twinkle Sparkles */}
        {Array.from({ length: 18 }, (_, i) => (
          <motion.span
            key={`sparkle-${i}`}
            className="absolute text-white/85 text-sm sm:text-base select-none pointer-events-none"
            style={{
              left: `${((i * 37 + 11) % 92) + 4}%`,
              top: `${((i * 23 + 9) % 88) + 6}%`,
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    opacity: [0.2, 0.95, 0.2],
                    y: [0, -12, 0],
                    scale: [0.8, 1.25, 0.8],
                  }
            }
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
            }}
          >
            <Sparkles className="h-3.5 w-3.5 text-pink-200" />
          </motion.span>
        ))}

        <div className="absolute inset-0 bg-[#251536]/25" />
      </div>

      {/* Header section */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-10 max-w-xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 backdrop-blur-md mb-4 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-pink-100" />
          <span className="text-[11px] uppercase tracking-[0.28em] font-medium text-white/95">
            A little colour mystery
          </span>
        </div>

        <h2 className="font-cinzel text-3xl sm:text-4xl text-white font-semibold drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] tracking-wide">
          {chapter.question}
        </h2>

        <p className="text-white/90 text-xs sm:text-sm mt-3 tracking-wide">
          Three colors. Three feelings. Which one reflects her spirit?
        </p>
      </motion.div>

      {/* Colour Orbs Showcase Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl px-2">
        {chapter.options.map((option, i) => {
          const colour = colours[option.id] ?? colours.purple;
          const isSelected = selected === option.id;
          const isHovered = hovered === option.id;
          const isThisCorrect = correct && isSelected;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => choose(option.id)}
              onMouseEnter={() => setHovered(option.id)}
              onMouseLeave={() => setHovered(null)}
              disabled={correct}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={reduceMotion || correct ? {} : { y: -8 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              className={`group relative flex flex-col items-center justify-between p-6 rounded-3xl border transition-all duration-400 backdrop-blur-md ${
                isThisCorrect
                  ? 'border-emerald-300/80 bg-white/25 shadow-[0_20px_50px_rgba(16,185,129,0.35)] ring-2 ring-emerald-300'
                  : isSelected
                  ? 'border-white/90 bg-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.3)] ring-2 ring-white/70'
                  : 'border-white/25 bg-white/[0.08] hover:border-white/60 hover:bg-white/[0.16] shadow-[0_8px_30px_rgba(0,0,0,0.15)]'
              }`}
            >
              {/* Badge Pill */}
              <div className="rounded-full border border-white/20 bg-black/20 px-3.5 py-1 backdrop-blur-md mb-4 shadow-inner">
                <span className="text-[11px] font-semibold tracking-wider text-white uppercase">
                  {colour.badge}
                </span>
              </div>

              {/* Crystal Sphere Container */}
              <div className="relative flex flex-col items-center justify-center my-3">
                {/* Dynamic Behind-Orb Radial Glow */}
                <motion.div
                  className="absolute rounded-full blur-xl pointer-events-none"
                  style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: colour.accentColor,
                  }}
                  animate={
                    isHovered || isSelected
                      ? { scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }
                      : { scale: 1, opacity: 0.3 }
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center select-none cursor-pointer"
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          y: [0, i % 2 === 0 ? -6 : 6, 0],
                          scale: isHovered ? 1.06 : 1,
                        }
                  }
                  transition={{
                    y: {
                      duration: 3.5 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    scale: { duration: 0.25 },
                  }}
                  style={{
                    background: colour.gradient,
                    boxShadow: `0 20px 50px ${colour.glow}, inset 0 3px 14px rgba(255,255,255,0.85), inset 0 -12px 24px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Glass Top Highlight */}
                  <div className="absolute top-[8%] left-[16%] w-[62%] h-[34%] rounded-[100%_100%_60%_60%] bg-gradient-to-b from-white/90 via-white/50 to-transparent blur-[1px] pointer-events-none" />

                  {/* Secondary Bottom Rim Reflection */}
                  <div className="absolute bottom-[6%] w-[48%] h-[20%] rounded-full bg-white/40 blur-md pointer-events-none" />

                  {/* Symbol inside Sphere */}
                  <span className="relative text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-115">
                    <colour.icon size={36} className="fill-current" />
                  </span>
                </motion.div>

                {/* Pedestal Shadow */}
                <div
                  className="w-20 h-3 rounded-full blur-sm mt-3.5 transition-all duration-300"
                  style={{
                    background: colour.glow,
                    opacity: isHovered || isSelected ? 0.85 : 0.4,
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Title & High-Contrast Subtitle */}
              <div className="mt-4 text-center">
                <span className="text-white font-semibold text-base sm:text-lg drop-shadow-md block tracking-wide">
                  {option.label}
                </span>
                <p className="text-pink-50/90 text-xs sm:text-[13px] font-medium mt-1.5 leading-relaxed max-w-[190px] drop-shadow-sm">
                  {colour.subtitle}
                </p>
              </div>

              {/* Selection Checkmark Indicator */}
              {isThisCorrect && (
                <div className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-emerald-400 p-1 text-emerald-950 shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Answer feedback overlay / drawer */}
      <AnimatePresence mode="wait">
        {showHint && !correct && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 mt-8 text-center rounded-3xl bg-[#2a133d]/85 border border-pink-300/40 backdrop-blur-2xl px-8 py-6 max-w-md shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="inline-flex items-center gap-1.5 text-pink-200 font-semibold mb-1.5 text-sm tracking-wide">
              <span>Oops, not quite!</span>
            </div>
            <p className="text-white/95 text-sm leading-relaxed font-medium">
              {chapter.hint}
            </p>
            <button
              onClick={() => {
                setSelected(null);
                setShowHint(false);
              }}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-100 to-white text-purple-950 text-xs font-semibold hover:from-white hover:to-pink-50 transition shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try Again
            </button>
          </motion.div>
        )}

        {correct && (
          <motion.div
            key="success"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-8 text-center max-w-lg rounded-3xl bg-[#240e38]/90 backdrop-blur-2xl border border-white/50 px-8 py-7 shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
          >
            <motion.div
              className="text-4xl mb-3 select-none"
              animate={
                reduceMotion
                  ? {}
                  : {
                      rotate: [-6, 6, -6],
                      scale: [1, 1.1, 1],
                    }
              }
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-7 w-7 text-sky-200" />
            </motion.div>

            <p className="text-white text-base sm:text-lg font-serif italic mb-6 leading-relaxed">
              {chapter.successMessage}
            </p>

            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-white via-pink-100 to-white text-purple-950 font-semibold px-8 py-3.5 hover:shadow-[0_8px_25px_rgba(255,255,255,0.4)] transition-all shadow-lg text-sm"
            >
              Continue the Dream <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ColourDream;