import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Gift } from 'lucide-react';

import StarField from '../components/StarField';
import AudioController from '../components/AudioController';
import { content, interpolateName } from '../data/content';

interface EntranceProps {
  onComplete: () => void;
}

type EntrancePhase = 'idle' | 'welcomed';

const FOR_LINE = 'For Marie';
const FOOTER_LINE = 'Take your time. Every little thing here is for you.';

// Fixed left offset calculation for smooth distribution
const floatingHearts = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 9) % 94) + 3}%`,
  delay: (i % 8) * 0.7,
  duration: 8 + (i % 5) * 1.5,
  size: 13 + (i % 4) * 5,
}));

const floatingPetals = Array.from({ length: 24 }, (_, i) => {
  const isBig = i % 6 === 0;
  return {
    id: i,
    isBig,
    left: `${((i * 43 + 5) % 92) + 4}%`,
    delay: (i % 9) * 0.45,
    duration: isBig ? 7 + (i % 3) : 11 + (i % 4) * 2,
    size: isBig ? 18 + (i % 3) * 3 : 7 + (i % 4) * 2,
  };
});

export function Entrance({ onComplete }: EntranceProps) {
  const [phase, setPhase] = useState<EntrancePhase>('idle');
  const reduceMotion = useReducedMotion();

  const welcomeLine = interpolateName(content.entrance.welcomeMessage);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.16,
        delayChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const item: Variants = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.001 : 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleEnter = () => {
    if (phase === 'idle') setPhase('welcomed');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#fff1f6] via-[#fce4ef] to-[#f3d7ee] text-[#63344f] select-none">
      {/* Soft romantic ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-20 top-[6%] h-88 w-88 rounded-full bg-pink-300/40 blur-[100px]" />
        <div className="absolute -right-24 top-[15%] h-96 w-96 rounded-full bg-rose-300/35 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[25%] h-80 w-80 rounded-full bg-fuchsia-200/45 blur-[110px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-rose-200/25" />
      </div>

      {/* Subtle StarField */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <StarField />
      </div>

      {/* Floating hearts & petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-[-40px] text-rose-400/35 select-none pointer-events-none"
            style={{
              left: heart.left,
              fontSize: heart.size,
            }}
            animate={
              reduceMotion
                ? { opacity: 0.2 }
                : {
                    y: [0, -920],
                    x: [0, heart.id % 2 === 0 ? 25 : -25, 0],
                    opacity: [0, 0.45, 0.25, 0],
                    rotate: [0, 15, -12, 0],
                  }
            }
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            }}
          >
            <Heart size={heart.size} className="fill-rose-400/35 text-rose-400/35" />
          </motion.div>
        ))}

        {floatingPetals.map((petal) => (
          <motion.div
            key={`petal-${petal.id}`}
            className={`absolute top-[-40px] pointer-events-none ${
              petal.isBig
                ? 'bg-rose-300/45 blur-[2.5px]'
                : 'bg-rose-300/70 shadow-[0_0_10px_rgba(244,114,182,0.35)]'
            }`}
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.55,
              borderRadius: '70% 20% 70% 20%',
            }}
            animate={
              reduceMotion
                ? { opacity: 0.2 }
                : {
                    y: ['0vh', '115vh'],
                    x: [
                      0,
                      petal.id % 2 === 0 ? 32 : -32,
                      petal.id % 2 === 0 ? -18 : 18,
                      0,
                    ],
                    rotate: [0, 180, 310, 360],
                    opacity: petal.isBig ? [0, 0.5, 0.3, 0] : [0, 0.75, 0.45, 0],
                  }
            }
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Enhanced Music Control Pill with clear frosted visibility */}
      <div className="absolute right-4 top-4 z-30 sm:right-6 sm:top-6 rounded-full border border-white/70 bg-white/60 p-1.5 shadow-[0_4px_20px_rgba(225,120,160,0.18)] backdrop-blur-md transition-all hover:bg-white/80">
        <AudioController />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
        <AnimatePresence mode="wait">
          {phase === 'idle' ? (
            <motion.div
              key="idle"
              variants={container}
              initial="hidden"
              animate="show"
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.94, y: -16, transition: { duration: 0.45 } }
              }
              className="flex w-full max-w-3xl flex-col items-center"
            >
              {/* Date Badge */}
              <motion.div
                variants={item}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-300/60 bg-white/75 px-4 py-2 shadow-sm shadow-rose-200/50 backdrop-blur-md"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-700 sm:text-xs">
                  December 19 · Made with love
                </span>
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              </motion.div>

              {/* Glowing Heartbeat Emblem */}
              <motion.div
                variants={item}
                className="relative mb-6 flex items-center justify-center"
              >
                {/* Outer Glow Aura */}
                <motion.div
                  className="absolute h-28 w-28 rounded-full bg-rose-400/30 blur-2xl pointer-events-none"
                  animate={
                    reduceMotion
                      ? {}
                      : { scale: [1, 1.35, 1], opacity: [0.4, 0.85, 0.4] }
                  }
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Gentle Pulsing Ring */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute h-[84px] w-[84px] rounded-full border border-rose-300/70 pointer-events-none"
                    animate={{ scale: [1, 2.05], opacity: [0.65, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                {/* Center Heart Pill */}
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : { scale: [1, 1.12, 1, 1.08, 1] }
                  }
                  transition={{
                    duration: 2.2,
                    times: [0, 0.16, 0.32, 0.48, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative z-10 flex h-[82px] w-[82px] items-center justify-center rounded-full border border-white/95 bg-white/80 shadow-[0_12px_40px_rgba(219,112,147,0.32)] backdrop-blur-md"
                >
                  <Heart className="h-9 w-9 fill-rose-500 text-rose-500 drop-shadow-[0_4px_12px_rgba(244,63,94,0.45)]" />
                </motion.div>
              </motion.div>

              {/* Personal Touch Tag */}
              <motion.p
                variants={item}
                className="mb-3 font-cinzel text-sm uppercase tracking-[0.32em] text-rose-500/90 sm:text-base font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                <span>{FOR_LINE}</span>
                <Sparkles className="h-3.5 w-3.5 text-rose-400" />
              </motion.p>

              {/* Heading */}
              <motion.h1
                variants={item}
                className="max-w-3xl font-cinzel text-4xl leading-[1.22] text-[#6b3152] sm:text-5xl md:text-6xl font-medium tracking-tight"
                style={{
                  textShadow: '0 4px 28px rgba(190, 90, 140, 0.18)',
                }}
              >
                {content.entrance.heading}
              </motion.h1>

              {/* Supporting Line */}
              <motion.p
                variants={item}
                className="mt-6 max-w-lg text-base leading-8 text-[#87536f] sm:text-lg"
              >
                {content.entrance.supporting}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                variants={item}
                type="button"
                onClick={handleEnter}
                whileHover={reduceMotion ? undefined : { scale: 1.04, y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                aria-label={content.a11y.enterButtonLabel}
                className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/90 bg-gradient-to-r from-[#d94f89] via-[#e76b9e] to-[#d94f89] px-9 py-4 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(217,79,137,0.42)] transition-all hover:shadow-[0_18px_50px_rgba(217,79,137,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-4 focus-visible:ring-offset-pink-50 sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[200%]"
                />
                <Sparkles className="relative h-4 w-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative font-medium tracking-wide">{content.entrance.ctaLabel}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </motion.button>

              <motion.p
                variants={item}
                className="mt-7 text-xs tracking-wide text-rose-700/70 font-medium"
              >
                {FOOTER_LINE}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="welcomed"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.001 : 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex w-full max-w-2xl flex-col items-center"
            >
              {/* Special Sparkle Badge on Welcome */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-300/70 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-700 sm:text-xs">
                  A Special Moment
                </span>
                <Sparkles className="h-3.5 w-3.5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              {/* Welcomed Heart Emblem with Celebration Ripple */}
              <div className="relative mb-7 flex items-center justify-center">
                <motion.div
                  className="absolute h-32 w-32 rounded-full bg-rose-400/30 blur-2xl pointer-events-none"
                  animate={
                    reduceMotion
                      ? {}
                      : { scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }
                  }
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute h-20 w-20 rounded-full border border-rose-300 pointer-events-none"
                    animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                <motion.div
                  initial={{ scale: 0.75, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/95 bg-white/80 shadow-[0_12px_40px_rgba(219,112,147,0.32)] backdrop-blur-md"
                >
                  <Heart className="h-9 w-9 fill-rose-500 text-rose-500 drop-shadow-[0_4px_12px_rgba(244,63,94,0.45)]" />
                </motion.div>
              </div>

              <h2 className="font-cinzel text-3xl leading-tight text-[#6b3152] sm:text-4xl md:text-5xl font-medium tracking-tight">
                {welcomeLine}
              </h2>

              <p className="mt-5 max-w-md text-base leading-8 text-[#87536f] sm:text-lg">
                {content.entrance.welcomeSubtext}
              </p>

              <motion.button
                type="button"
                onClick={onComplete}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.001 : 0.6, delay: 0.2 }}
                whileHover={reduceMotion ? undefined : { scale: 1.04, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/90 bg-gradient-to-r from-[#d94f89] via-[#e76b9e] to-[#d94f89] px-9 py-4 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(217,79,137,0.42)] transition-all hover:shadow-[0_18px_50px_rgba(217,79,137,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-4 focus-visible:ring-offset-pink-50 sm:text-base"
              >
                <Gift className="h-4 w-4 transition-transform group-hover:rotate-12" />
                <span className="font-medium tracking-wide">Open Your Little Surprise</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Entrance;