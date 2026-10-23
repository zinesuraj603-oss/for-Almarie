import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles, Flower2, ArrowRight } from 'lucide-react';
import { content } from '../data/content';
import LetterEnvelope from '../components/chapters/LetterEnvelope';

interface PersonalLetterProps {
  onComplete: () => void;
}

const petals = [
  { left: '8%', delay: 0, duration: 13, size: 15 },
  { left: '19%', delay: 3, duration: 16, size: 12 },
  { left: '34%', delay: 1.5, duration: 14, size: 17 },
  { left: '63%', delay: 4, duration: 17, size: 13 },
  { left: '79%', delay: 2, duration: 15, size: 16 },
  { left: '92%', delay: 5, duration: 18, size: 12 },
];

export default function PersonalLetter({ onComplete }: PersonalLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [visibleLength, setVisibleLength] = useState(0);
  const reduceMotion = useReducedMotion();

  const letterText = content.letter.text;

  const displayedText = showFullLetter
    ? letterText
    : letterText.slice(0, visibleLength);

  useEffect(() => {
    if (!isOpen || showFullLetter || visibleLength >= letterText.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisibleLength((length) => Math.min(length + 4, letterText.length));
    }, 16);

    return () => window.clearTimeout(timer);
  }, [isOpen, showFullLetter, visibleLength, letterText]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fdeef1] px-4 pb-36 pt-16 text-[#5a3a40] sm:px-6 sm:pb-44 sm:pt-20 select-none">
      {/* Soft romantic blush atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(255, 214, 224, 0.95), transparent 50%),
            radial-gradient(ellipse at 8% 45%, rgba(248, 200, 220, 0.55), transparent 45%),
            radial-gradient(ellipse at 94% 75%, rgba(232, 205, 242, 0.5), transparent 45%),
            linear-gradient(160deg, #fff3f5 0%, #fde6ec 50%, #f9e0ea 100%)
          `,
        }}
      />

      {/* Floating ambient radial orbs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -left-20 top-16 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'rgba(255, 182, 193, 0.4)' }}
        animate={
          reduceMotion
            ? {}
            : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -right-24 bottom-12 h-88 w-88 rounded-full blur-3xl"
        style={{ background: 'rgba(214, 190, 240, 0.4)' }}
        animate={reduceMotion ? {} : { opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating flower petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {petals.map((petal, index) => (
          <motion.div
            key={index}
            className="absolute top-[-30px] text-[#e58fa3]/60"
            style={{ left: petal.left }}
            animate={
              reduceMotion
                ? { opacity: 0.25 }
                : {
                    y: ['0vh', '115vh'],
                    x: [0, index % 2 === 0 ? 26 : -22, 0],
                    rotate: [0, 110, 240],
                    opacity: [0, 0.65, 0.45, 0],
                  }
            }
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Flower2 size={petal.size} strokeWidth={1.3} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-2xl flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center [&_h1]:!text-[#4a1525] [&_h2]:!text-[#4a1525] [&_h3]:!text-[#4a1525] [&_p]:!text-[#8c3b56] [&_p]:!font-medium [&_button]:!bg-gradient-to-r [&_button]:!from-[#d84a75] [&_button]:!to-[#e05882] [&_button]:!text-white [&_button]:!border-white/50 [&_button]:!shadow-[0_8px_25px_rgba(216,74,117,0.38)] hover:[&_button]:!brightness-105 hover:[&_button]:!shadow-[0_10px_30px_rgba(216,74,117,0.5)] [&_button_*]:!text-white"
            >
              <LetterEnvelope
                label={content.letter.envelopeLabel}
                buttonLabel={content.letter.tapToOpen}
                onOpen={() => setIsOpen(true)}
              />
            </motion.div>
          ) : (
            <motion.section
              key="letter"
              aria-label="Birthday letter for Marie"
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* Header Badge & Title */}
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', damping: 14 }}
                  className="mb-4 inline-flex rounded-full border border-pink-300/60 bg-white/80 p-3 text-rose-500 shadow-[0_4px_20px_rgba(244,63,94,0.18)]"
                >
                  <Heart size={22} fill="currentColor" className="animate-pulse" />
                </motion.div>

                <p className="mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.32em] text-[#9c4d63]">
                  A little moment, just for you
                </p>

                <h1 className="font-cinzel text-3xl font-medium tracking-wide text-[#4a1525] sm:text-4xl">
                  A Letter for Marie
                </h1>

                <p className="mt-2 font-serif text-xs sm:text-sm italic text-[#8c3b56]">
                  Written with love, kept with warmth
                </p>
              </div>

              {/* Stationery Card */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative w-full overflow-hidden rounded-xl border border-[#ecd2cb] bg-[#fffaf5] px-6 py-9 shadow-[0_20px_70px_rgba(190,100,125,0.16)] sm:px-12 sm:py-12"
              >
                {/* Double Border Frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 rounded-lg border border-[#e8bfb5]/50 sm:inset-3.5"
                />

                {/* Subtle Paper Specular Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.85), transparent 60%)',
                  }}
                />

                <div className="relative z-10">
                  {/* Top Note */}
                  <div className="mb-8 flex items-center justify-center gap-3 text-[#a65e63]">
                    <Sparkles size={15} strokeWidth={1.5} className="text-rose-400" />
                    <span className="font-serif text-xs sm:text-sm italic tracking-wide text-[#8c4856]">
                      A little birthday wish
                    </span>
                    <Sparkles size={15} strokeWidth={1.5} className="text-rose-400" />
                  </div>

                  {/* Letter Content with Typewriter */}
                  <div
                    className="min-h-48 whitespace-pre-wrap break-words font-serif text-[15px] sm:text-[16px] leading-[1.85] text-[#3d1f25] sm:leading-[1.95] tracking-normal selection:bg-rose-100"
                    aria-live="off"
                  >
                    {displayedText}

                    {!showFullLetter && visibleLength < letterText.length && (
                      <motion.span
                        aria-hidden="true"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.75,
                          repeat: Infinity,
                        }}
                        className="ml-0.5 inline-block font-sans text-rose-500 font-bold"
                      >
                        |
                      </motion.span>
                    )}
                  </div>

                  {/* Elegant Divider */}
                  <div
                    aria-hidden="true"
                    className="mt-10 flex items-center justify-center gap-3 text-[#b87b78]/70"
                  >
                    <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#e3b3a8]" />
                    <Heart size={12} fill="currentColor" className="text-rose-400" />
                    <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#e3b3a8]" />
                  </div>
                </div>
              </motion.article>

              {/* Bottom Actions with Proper Breathing Room */}
              <div className="mt-8 flex flex-col items-center gap-4">
                {!showFullLetter && visibleLength < letterText.length && (
                  <button
                    type="button"
                    onClick={() => setShowFullLetter(true)}
                    className="text-xs sm:text-sm font-medium text-[#9c4d63] underline decoration-[#9c4d63]/40 underline-offset-4 transition hover:text-[#722036] focus:outline-none"
                  >
                    Reveal full letter instantly
                  </button>
                )}

                <AnimatePresence>
                  {(showFullLetter || visibleLength >= letterText.length) && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: 12, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      onClick={onComplete}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/60 bg-gradient-to-r from-[#d84a75] via-[#e25d86] to-[#d84a75] px-9 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(216,74,117,0.35)] transition-all hover:shadow-[0_12px_32px_rgba(216,74,117,0.5)] focus:outline-none"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{content.letter.continueLabel}</span>
                        <Heart className="h-3.5 w-3.5 fill-white text-white" />
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}