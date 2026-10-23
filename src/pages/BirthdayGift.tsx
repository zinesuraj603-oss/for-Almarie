import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';

import StarField from '../components/StarField';
import AudioController from '../components/AudioController';
import { content } from '../data/content';

interface BirthdayGiftProps {
  onComplete: () => void;
}

const sparkles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${((i * 41 + 7) % 92) + 4}%`,
  top: `${((i * 29 + 11) % 90) + 5}%`,
  delay: (i % 8) * 0.28,
  size: 3 + (i % 4) * 2,
}));

const hearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${((i * 37 + 8) % 92) + 4}%`,
  delay: (i % 6) * 1.1,
  duration: 7 + (i % 5) * 1.5,
  size: 12 + (i % 4) * 4,
}));

// Burst particles that spray out upon unboxing
const burstParticles = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * 360;
  const radius = 110 + (i % 4) * 35;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    targetX: Math.cos(rad) * radius,
    targetY: Math.sin(rad) * radius,
    color: i % 3 === 0 ? '#fbcfe8' : i % 3 === 1 ? '#fef08a' : '#fda4af',
    size: 4 + (i % 3) * 3,
  };
});

export function BirthdayGift({ onComplete }: BirthdayGiftProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleOpenGift = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    // Smooth timing: allow lid to pop open before switching to the greeting screen
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 750);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#2a0c20] via-[#5c1c3f] to-[#12071d] px-5 pb-10 pt-24 text-pink-50 select-none">
      <StarField />

      {/* Romantic Ambient Backlight Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-20 top-[10%] h-80 w-80 rounded-full bg-pink-500/20 blur-[110px]" />
        <div className="absolute -right-20 top-[28%] h-96 w-96 rounded-full bg-rose-500/20 blur-[130px]" />
        <div className="absolute bottom-[-5%] left-[25%] h-80 w-80 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-[#100716]/60" />
      </div>

      {/* Ambient Floating Hearts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-[-35px] text-pink-200/35 pointer-events-none"
            style={{
              left: heart.left,
              fontSize: heart.size,
            }}
            animate={
              reduceMotion
                ? { opacity: 0.25 }
                : {
                    y: [0, -920],
                    x: [0, heart.id % 2 === 0 ? 25 : -25, 0],
                    opacity: [0, 0.55, 0.35, 0],
                    rotate: [0, 16, -12, 0],
                  }
            }
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: 'linear',
            }}
          >
            <Heart size={heart.size} className="fill-pink-200/40 text-pink-200/40" />
          </motion.div>
        ))}
      </div>

      {/* Crisp Frosted Glass Audio Controller */}
      <div className="absolute right-4 top-4 z-30 sm:right-6 sm:top-6 rounded-full border border-pink-200/30 bg-black/25 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all hover:bg-black/35">
        <AudioController />
      </div>

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Date Label Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-7 flex items-center gap-2 rounded-full border border-pink-200/30 bg-white/[0.08] px-4 py-2 shadow-sm backdrop-blur-md"
        >
          <Heart className="h-3.5 w-3.5 text-pink-200 fill-pink-200" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-pink-100/95 sm:text-xs">
            December 19 · Made with love
          </span>
          <Sparkles className="h-3.5 w-3.5 text-pink-200" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.section
              key="gift"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16, transition: { duration: 0.4 } }}
              transition={{ duration: 0.6 }}
              className="flex w-full flex-col items-center"
            >
              <h1 className="mb-3 font-cinzel text-3xl leading-tight text-white drop-shadow-[0_0_28px_rgba(251,207,232,0.35)] sm:text-5xl font-medium tracking-tight">
                A Little Gift
                <span className="mt-2 block bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100 bg-clip-text text-transparent">
                  For Someone Special
                </span>
              </h1>

              <p className="mb-8 max-w-md text-sm leading-7 text-pink-100/80 sm:text-base">
                A little box full of love, happiness, and birthday warmth.
              </p>

              {/* Interactive Gift Card Box */}
              <button
                type="button"
                onClick={handleOpenGift}
                disabled={isOpening}
                aria-label={content.birthdayGift.boxPrompt}
                className="group relative mb-8 flex h-[310px] w-full max-w-[350px] items-center justify-center rounded-3xl border border-pink-100/20 bg-white/[0.045] shadow-[0_12px_45px_rgba(18,2,24,0.45)] backdrop-blur-md transition-all hover:border-pink-200/40 hover:bg-white/[0.08] hover:shadow-[0_16px_55px_rgba(235,110,165,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
              >
                {/* Radial Glow Aura Behind Box */}
                <motion.div
                  className="absolute left-1/2 top-1/2 h-52 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[55px] pointer-events-none"
                  animate={
                    reduceMotion
                      ? {}
                      : { scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }
                  }
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Ambient Stars in Card Frame */}
                {sparkles.map((sparkle) => (
                  <motion.span
                    key={sparkle.id}
                    className="absolute rounded-full bg-pink-100 pointer-events-none"
                    style={{
                      left: sparkle.left,
                      top: sparkle.top,
                      width: sparkle.size,
                      height: sparkle.size,
                      boxShadow: '0 0 10px rgba(251,207,232,0.85)',
                    }}
                    animate={
                      reduceMotion
                        ? { opacity: 0.5 }
                        : {
                            opacity: [0.2, 0.95, 0.2],
                            scale: [0.75, 1.35, 0.75],
                          }
                    }
                    transition={{
                      duration: 2 + (sparkle.id % 4) * 0.45,
                      repeat: Infinity,
                      delay: sparkle.delay,
                    }}
                  />
                ))}

                {/* Burst Particles upon unboxing */}
                {isOpening &&
                  burstParticles.map((p) => (
                    <motion.span
                      key={`burst-${p.id}`}
                      className="absolute rounded-full pointer-events-none z-30"
                      style={{
                        backgroundColor: p.color,
                        width: p.size,
                        height: p.size,
                        boxShadow: `0 0 10px ${p.color}`,
                        left: '50%',
                        top: '46%',
                      }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: p.targetX,
                        y: p.targetY,
                        opacity: 0,
                        scale: 0.2,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  ))}

                {/* Animated Gift Box Container */}
                <motion.div
                  className="relative mt-[-10px] h-[180px] w-[220px]"
                  animate={
                    isOpening
                      ? {
                          scale: [1, 1.08, 1.12],
                          rotate: [0, -3, 3, -2, 2, 0],
                        }
                      : reduceMotion
                      ? {}
                      : { y: [0, -6, 0] }
                  }
                  transition={
                    isOpening
                      ? { duration: 0.65 }
                      : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  {/* Soft Floor Shadow */}
                  <div className="absolute bottom-[-16px] left-[15px] right-[15px] h-8 rounded-full bg-black/45 blur-xl pointer-events-none" />

                  {/* Internal Glow light bursting out when opening */}
                  {isOpening && (
                    <motion.div
                      className="absolute inset-x-8 top-8 h-20 bg-amber-100/80 blur-xl z-15"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.8 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}

                  {/* Box Body */}
                  <div className="absolute bottom-0 left-[14px] right-[14px] h-[126px] overflow-hidden rounded-b-xl border border-pink-200/40 bg-gradient-to-br from-[#f286b6] via-[#d6478e] to-[#8a225c] shadow-[0_20px_40px_rgba(10,0,12,0.4)]">
                    {/* Vertical Ribbon */}
                    <div className="absolute inset-y-0 left-[38%] w-[24%] bg-gradient-to-r from-[#ffe4f1] via-white to-[#f5cbe2] shadow-[0_0_15px_rgba(255,255,255,0.45)]" />

                    {/* Ribbon Specular Highlight */}
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

                    {/* Cute Accent Heart */}
                    <Heart className="absolute bottom-3.5 right-3.5 h-5 w-5 fill-pink-100/60 text-pink-100/70 drop-shadow-sm" />
                  </div>

                  {/* Box Lid & Bow Wrapper */}
                  <motion.div
                    className="absolute left-0 right-0 top-0 z-20 h-[80px]"
                    animate={
                      isOpening
                        ? {
                            y: -85,
                            x: -25,
                            rotate: -32,
                            opacity: [1, 1, 0],
                          }
                        : {}
                    }
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Lid Cap */}
                    <div className="absolute left-0 right-0 top-[38px] h-[34px] rounded-lg border border-pink-100/75 bg-gradient-to-b from-[#ffd1e4] via-[#f493bd] to-[#d85593] shadow-[0_8px_18px_rgba(0,0,0,0.3)]">
                      <div className="absolute inset-y-0 left-[40%] w-[20%] bg-gradient-to-r from-[#fae3ee] via-white to-[#f0c3da]" />
                    </div>

                    {/* 3D-Look Bow Ribbons */}
                    <div className="absolute left-1/2 top-[5px] h-[58px] w-[110px] -translate-x-1/2">
                      <div className="absolute left-[10px] top-[10px] h-[34px] w-[44px] -rotate-[28deg] rounded-[80%_25%_70%_30%] border border-pink-100/90 bg-gradient-to-br from-white via-pink-100 to-[#d8689c] shadow-md" />

                      <div className="absolute right-[10px] top-[10px] h-[34px] w-[44px] rotate-[28deg] rounded-[25%_80%_30%_70%] border border-pink-100/90 bg-gradient-to-bl from-white via-pink-100 to-[#d8689c] shadow-md" />

                      <div className="absolute left-1/2 top-[22px] h-[24px] w-[24px] -translate-x-1/2 rounded-full border border-white/90 bg-gradient-to-br from-white to-[#e89dbf] shadow-md" />

                      <div className="absolute left-[36px] top-[35px] h-[30px] w-[16px] -rotate-[14deg] rounded-b-md bg-gradient-to-r from-pink-100 to-[#da719f]" />

                      <div className="absolute right-[36px] top-[35px] h-[30px] w-[16px] rotate-[14deg] rounded-b-md bg-gradient-to-r from-[#f7bcd7] to-pink-100" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Box Prompt Button Text */}
                <span className="absolute bottom-4.5 flex items-center gap-2 text-xs font-medium tracking-wide text-pink-100/90 transition-colors group-hover:text-white">
                  <Gift className="h-4 w-4 text-pink-200 transition-transform group-hover:scale-110" />
                  {isOpening ? 'Opening magical surprises...' : content.birthdayGift.boxPrompt}
                </span>
              </button>

              <p className="flex items-center gap-2 text-xs tracking-wide text-pink-100/75">
                <Sparkles className="h-4 w-4 text-pink-200 animate-spin" style={{ animationDuration: '6s' }} />
                Open your little surprise
                <Gift className="h-4 w-4 text-pink-200" />
              </p>
            </motion.section>
          ) : (
            <motion.section
              key="greeting"
              initial={{ opacity: 0, y: 22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduceMotion ? 0.001 : 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center"
            >
              {/* Cake Celebration Emblem with Rotating Ray */}
              <div className="relative mb-7 flex items-center justify-center">
                <motion.div
                  className="absolute h-36 w-36 rounded-full bg-pink-400/25 blur-2xl pointer-events-none"
                  animate={
                    reduceMotion
                      ? {}
                      : { scale: [1, 1.35, 1], opacity: [0.4, 0.85, 0.4] }
                  }
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-pink-100/40 bg-pink-100/[0.12] shadow-[0_0_55px_rgba(244,114,182,0.35)] backdrop-blur-md"
                >
                  <Heart className="h-10 w-10 text-pink-200 fill-pink-200 animate-pulse" />
                </motion.div>
              </div>

              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-200 sm:text-sm">
                <Sparkles className="h-3 w-3 text-pink-200" />
                <span>A wish from my heart</span>
                <Sparkles className="h-3 w-3 text-pink-200" />
              </p>

              <h1 className="mb-6 font-cinzel text-4xl leading-tight text-white drop-shadow-[0_0_28px_rgba(251,207,232,0.35)] sm:text-6xl font-medium tracking-tight">
                Wish You Happy
                <span className="mt-2 block bg-gradient-to-r from-pink-200 via-rose-100 to-pink-300 bg-clip-text text-transparent">
                  Happy Birthday,
                </span>
                <span className="mt-2 flex items-center justify-center gap-3 text-pink-100">
                  <Sparkles className="h-6 w-6 text-pink-300 animate-pulse" />
                  Marie!
                  <Heart className="h-6 w-6 text-pink-200 fill-pink-200" />
                </span>
              </h1>

              <p className="mb-8 max-w-lg text-sm leading-8 text-pink-50/90 sm:text-base">
                {content.birthdayGift.subtext}
              </p>

              {/* Decorative Divider */}
              <div className="mb-9 flex items-center gap-3 text-pink-200/80">
                <span className="h-px w-14 bg-gradient-to-r from-transparent to-pink-200/70" />
                <Heart className="h-4 w-4 fill-pink-300 text-pink-300" />
                <Sparkles className="h-4 w-4 text-pink-300" />
                <Heart className="h-4 w-4 fill-pink-300 text-pink-300" />
                <span className="h-px w-14 bg-gradient-to-l from-transparent to-pink-200/70" />
              </div>

              {/* Next Chapter CTA Button */}
              <button
                type="button"
                onClick={onComplete}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-pink-100/50 bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 px-9 py-4 text-sm font-semibold text-[#45142f] shadow-[0_10px_38px_rgba(244,114,182,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_45px_rgba(244,114,182,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200 sm:text-base"
              >
                <span className="font-semibold tracking-wide">
                  {content.birthdayGift.continueLabel}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default BirthdayGift;