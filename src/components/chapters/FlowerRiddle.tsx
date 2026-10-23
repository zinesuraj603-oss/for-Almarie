import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AlertCircle, Sparkles, ArrowRight, RotateCcw, CheckCircle2, Flower2 } from 'lucide-react';
import type { RiddleChapterContent } from '../../types/content';
import { playCorrectSound, playWrongSound } from '../../utils/sound';

interface FlowerRiddleProps {
  chapter: RiddleChapterContent;
  onComplete: () => void;
}

const flowerThemes: Record<
  string,
  { glow: string; meaningTop: string; meaningBottom: string; accent: string }
> = {
  tulip: {
    glow: 'rgba(244, 114, 182, 0.45)',
    meaningTop: 'GENTLE',
    meaningBottom: '& PURE',
    accent: '#f472b6',
  },
  sunflower: {
    glow: 'rgba(251, 191, 36, 0.45)',
    meaningTop: 'BRIGHT',
    meaningBottom: '& WARM',
    accent: '#fbbf24',
  },
  rose: {
    glow: 'rgba(244, 63, 94, 0.55)',
    meaningTop: 'DEEP &',
    meaningBottom: 'TIMELESS',
    accent: '#f43f5e',
  },
  lily: {
    glow: 'rgba(167, 243, 208, 0.45)',
    meaningTop: 'GRACE &',
    meaningBottom: 'ELEGANCE',
    accent: '#6ee7b7',
  },
};

const fallingPetals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${((i * 31 + 7) % 94) + 3}%`,
  delay: (i % 6) * 0.8,
  duration: 8 + (i % 5) * 1.5,
  size: 7 + (i % 3) * 3,
}));

export function FlowerRiddle({ chapter, onComplete }: FlowerRiddleProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const handleSelect = (id: string) => {
    if (status === 'correct') return;
    setSelectedId(id);

    if (id === chapter.correctOptionId) {
      setStatus('correct');
      playCorrectSound();
    } else {
      setStatus('wrong');
      playWrongSound();
    }
  };

  const handleRetry = () => {
    setSelectedId(null);
    setStatus('idle');
  };

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 select-none">
      {/* Floating Petals Ambient Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {fallingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-30px] rounded-full bg-rose-400/20 blur-[0.6px]"
            style={{
              left: petal.left,
              width: petal.size,
              height: petal.size * 1.5,
              borderRadius: '70% 25% 70% 25%',
            }}
            animate={
              reduceMotion
                ? { opacity: 0.15 }
                : {
                    y: ['0vh', '110vh'],
                    x: [0, petal.id % 2 === 0 ? 25 : -25, 0],
                    rotate: [0, 200, 360],
                    opacity: [0, 0.45, 0.2, 0],
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

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        {/* Breadcrumb / Top Tag */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-cinzel text-[10px] tracking-[0.32em] uppercase text-rose-300/60 sm:text-xs"
        >
          Chapter 4: A Little Message For Marie
        </motion.p>

        {/* Chapter 4 Pill */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
        >
          <Sparkles className="h-3 w-3 text-rose-300" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-rose-200/90 font-medium sm:text-[11px]">
            Chapter 4 · A Little Riddle
          </span>
        </motion.div>

        {/* Riddle Headline */}
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-2xl font-cinzel text-2xl uppercase leading-relaxed text-[#f7e9ee] sm:text-3xl md:text-[34px] font-normal tracking-wide"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          {chapter.question}
        </motion.h2>

        {/* Italic Supporting Hint */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-4 text-xs italic font-serif text-rose-200/70 sm:text-sm tracking-wide"
        >
          Hmm… could it be Marie's favourite?
        </motion.p>

        {/* Four Cards Grid: Perfectly Sized */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 w-full max-w-[620px] px-2">
          {chapter.options.map((opt, i) => {
            const isSelected = selectedId === opt.id;
            const isCorrect = opt.id === chapter.correctOptionId;
            const theme = flowerThemes[opt.id.toLowerCase()] || {
              glow: 'rgba(244, 114, 182, 0.45)',
              meaningTop: 'PURE',
              meaningBottom: 'MAGIC',
              accent: '#f472b6',
            };

            let cardStateClasses =
              'border-white/[0.08] bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]';
            let customBoxShadow: string | undefined = undefined;

            if (status === 'correct' && isCorrect) {
              cardStateClasses =
                'border-rose-400/80 bg-rose-950/40 ring-1 ring-rose-400/70 scale-[1.03] z-20';
              customBoxShadow = `0 10px 30px ${theme.glow}, 0 0 20px rgba(244, 63, 94, 0.35)`;
            } else if (status === 'wrong' && isSelected) {
              cardStateClasses =
                'border-red-500/70 bg-red-950/40 opacity-70 ring-1 ring-red-400';
            } else if (status === 'correct' && !isCorrect) {
              cardStateClasses = 'border-white/[0.03] bg-black/30 opacity-30 grayscale';
            } else if (hoveredId === opt.id && status === 'idle') {
              customBoxShadow = `0 8px 24px ${theme.glow}`;
            }

            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                onMouseEnter={() => setHoveredId(opt.id)}
                onMouseLeave={() => setHoveredId(null)}
                disabled={status === 'correct'}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={reduceMotion || status !== 'idle' ? {} : { y: -4 }}
                whileTap={reduceMotion || status !== 'idle' ? {} : { scale: 0.97 }}
                style={{ boxShadow: customBoxShadow }}
                className={`group relative flex flex-col items-center rounded-2xl border p-2 pb-3.5 backdrop-blur-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 ${cardStateClasses}`}
              >
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-black/40">
                  <img
                    src={opt.image}
                    alt={opt.label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay at bottom of photo for meaning pill */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Frosted Meaning Pill inside the bottom of photo */}
                  <div className="absolute inset-x-1.5 bottom-1.5 flex flex-col items-center justify-center rounded-lg border border-white/20 bg-black/50 py-1 px-1 backdrop-blur-md">
                    <span className="text-[8px] font-semibold tracking-wider uppercase text-white/95 leading-tight sm:text-[9px]">
                      {theme.meaningTop}
                    </span>
                    <span className="text-[8px] font-semibold tracking-wider uppercase text-white/80 leading-tight sm:text-[9px]">
                      {theme.meaningBottom}
                    </span>
                  </div>

                  {/* Correct checkmark icon badge */}
                  {status === 'correct' && isCorrect && (
                    <div className="absolute top-1.5 right-1.5 flex items-center justify-center rounded-full bg-rose-500 p-0.5 text-white shadow-md">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {/* Clean Bottom Title Label */}
                <span className="mt-3 font-cinzel text-xs font-semibold tracking-[0.22em] uppercase text-rose-100/90 transition-colors group-hover:text-white sm:text-[13px]">
                  {opt.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback / Retry Drawer */}
        <AnimatePresence mode="wait">
          {status === 'wrong' && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-rose-400/30 bg-[#250912]/85 px-6 py-4 text-center backdrop-blur-xl shadow-lg max-w-sm w-full"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-rose-200">
                <AlertCircle className="h-4 w-4 text-rose-300" />
                <span>Not quite, but still beautiful!</span>
              </div>
              <p className="text-xs italic text-rose-200/80 leading-relaxed">
                Hint: {chapter.hint}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-rose-300/40 bg-rose-500/25 px-4 py-1.5 text-xs text-white hover:bg-rose-500/40 transition shadow-sm"
              >
                <RotateCcw className="h-3 w-3" /> Try again
              </button>
            </motion.div>
          )}

          {status === 'correct' && (
            <motion.div
              key="correct"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-rose-300/35 bg-[#250912]/90 p-7 text-center backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] max-w-md w-full"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                <Flower2 className="h-6 w-6" />
              </div>
              <p className="font-serif italic text-rose-100 text-sm sm:text-base leading-relaxed">
                "{chapter.finalMessage}"
              </p>
              <button
                type="button"
                onClick={onComplete}
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] transition-all hover:scale-104 focus:outline-none"
              >
                <span>{chapter.continueLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default FlowerRiddle;