import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  Disc3,
  Music2,
  CheckCircle2,
  AlertCircle,
  AudioLines,
  Waves,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import type { QuizChapterContent } from '../../types/content';
import { playCorrectSound, playWrongSound } from '../../utils/sound';

interface MusicRoomProps {
  chapter: QuizChapterContent;
  onComplete: () => void;
}

const musicSymbols = [
  { left: '7%', top: '19%', size: 20, delay: 0 },
  { left: '16%', top: '65%', size: 24, delay: 1.2 },
  { left: '84%', top: '22%', size: 22, delay: 0.6 },
  { left: '90%', top: '70%', size: 18, delay: 1.8 },
  { left: '74%', top: '82%', size: 18, delay: 0.9 },
  { left: '28%', top: '13%', size: 18, delay: 1.5 },
  { left: '6%', top: '45%', size: 16, delay: 2.1 },
  { left: '93%', top: '44%', size: 20, delay: 0.3 },
];

const equalizerBars = Array.from({ length: 47 }, (_, i) => ({
  id: i,
  height: 10 + ((i * 17 + 13) % 45),
  delay: (i % 9) * 0.12,
}));

export function MusicRoom({ chapter, onComplete }: MusicRoomProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'wrong' | 'correct'>('idle');
  const [showBonus, setShowBonus] = useState(false);
  const reduceMotion = useReducedMotion();

  const choose = (id: string) => {
    if (status === 'correct' || showBonus) return;

    if (id === 'suraj-voice') {
      setShowBonus(true);
      playCorrectSound();
      return;
    }

    setSelected(id);
    const isCorrect = id === chapter.correctOptionId;
    setStatus(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const retry = () => {
    setSelected(null);
    setStatus('idle');
  };

  return (
    <div className="relative z-10 flex min-h-[540px] w-full flex-col items-center justify-center overflow-hidden bg-[#071014] px-4 py-12 text-slate-100 select-none sm:py-16">
      {/* ELECTRIC SONIC AMBIENT BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#071014]"
      >
        {/* Charcoal to deep teal gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071014] via-[#091f26] to-[#050e12]" />

        {/* Left cyan radial aura */}
        <motion.div
          className="absolute -left-40 top-[10%] h-[460px] w-[460px] rounded-full bg-cyan-500/[0.14] blur-[120px]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 35, 0],
                  y: [0, 25, 0],
                  opacity: [0.45, 0.8, 0.45],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Right emerald-teal radial aura */}
        <motion.div
          className="absolute -right-40 bottom-[5%] h-[500px] w-[500px] rounded-full bg-teal-500/[0.13] blur-[130px]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  y: [0, -25, 0],
                  opacity: [0.35, 0.75, 0.35],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle upper blue aura */}
        <div className="absolute left-1/2 top-[-35%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/[0.08] blur-[120px]" />

        {/* Sound wave rings */}
        <motion.div
          className="absolute -left-[18%] top-[23%] h-36 w-[75%] rounded-[50%] border border-cyan-300/[0.16]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  scaleY: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -right-[22%] top-[36%] h-40 w-[80%] rounded-[50%] border border-teal-300/[0.15]"
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  scaleY: [1, 1.15, 1],
                  opacity: [0.15, 0.42, 0.15],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Floating music notes */}
        {musicSymbols.map((item, index) => (
          <motion.span
            key={`music-note-${index}`}
            className="absolute select-none text-cyan-100 pointer-events-none"
            style={{
              left: item.left,
              top: item.top,
              opacity: 0.25,
              filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.5))',
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -16, 0, 9, 0],
                    x: [0, 7, -5, 0],
                    opacity: [0.12, 0.38, 0.18, 0.35, 0.12],
                    rotate: [0, 6, -6, 0],
                  }
            }
            transition={{
              duration: 6 + (index % 4) * 1.5,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Music2 size={item.size} />
          </motion.span>
        ))}

        {/* Audio particles with fixed math */}
        {Array.from({ length: 24 }, (_, i) => (
          <motion.span
            key={`particle-${i}`}
            className="absolute h-1 w-1 rounded-full bg-cyan-200 pointer-events-none"
            style={{
              left: `${((i * 31 + 13) % 94) + 3}%`,
              top: `${((i * 19 + 8) % 92) + 4}%`,
              boxShadow: '0 0 9px rgba(103,232,249,0.55)',
            }}
            animate={
              reduceMotion
                ? {}
                : {
                    opacity: [0.1, 0.65, 0.1],
                    scale: [0.75, 1.45, 0.75],
                  }
            }
            transition={{
              duration: 3 + (i % 4) * 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Bottom equalizer visualizer */}
        <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-[3px] overflow-hidden opacity-25 sm:h-32 sm:gap-1 pointer-events-none">
          {equalizerBars.map((bar) => (
            <motion.div
              key={bar.id}
              className="w-1.5 rounded-t-full bg-gradient-to-t from-teal-500 via-cyan-300 to-sky-200 sm:w-2"
              style={{ height: `${bar.height}%` }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      scaleY: [0.35, 1, 0.55, 0.85, 0.35],
                    }
              }
              transition={{
                duration: 1.3 + (bar.id % 5) * 0.25,
                delay: bar.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b10]/25 via-transparent to-[#050b10]/70" />
      </div>

      <AnimatePresence mode="wait">
        {showBonus ? (
          <motion.div
            key="bonus"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex min-h-[460px] w-full max-w-xl flex-col items-center justify-center rounded-3xl border border-violet-400/30 bg-[#141026]/90 p-8 text-center backdrop-blur-2xl shadow-[0_20px_60px_rgba(139,92,246,0.22)]"
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-violet-300/40 bg-violet-500/10 shadow-[0_0_40px_rgba(139,92,246,0.35)]"
            >
              <Music2 className="h-11 w-11 text-violet-300 animate-pulse" />
            </motion.div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-400/10 px-3.5 py-1 text-xs uppercase tracking-[0.28em] text-violet-200 mb-4 font-semibold">
              <Sparkles className="h-3 w-3 text-violet-300" /> A secret melody
            </div>

            <p className="font-serif text-xl leading-relaxed text-slate-100 sm:text-2xl">
              Wait… you chose my voice? Now that is a melody I did not expect you to pick.
            </p>

            <p className="mt-3.5 text-sm text-violet-200/80">
              A little unexpected melody, just for you.
            </p>

            <button
              type="button"
              onClick={() => setShowBonus(false)}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-violet-300/50 bg-gradient-to-r from-violet-400 via-purple-300 to-violet-400 px-8 py-3.5 text-sm font-semibold text-violet-950 shadow-[0_8px_30px_rgba(139,92,246,0.3)] transition-all hover:scale-104 hover:shadow-[0_12px_36px_rgba(139,92,246,0.45)] focus:outline-none"
            >
              <span>Back to chapter</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="music-room"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex w-full flex-col items-center"
          >
            {/* Spinning Main Vinyl */}
            <motion.div
              className="relative mb-8"
              animate={reduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                animate={reduceMotion || status === 'wrong' ? {} : { rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="relative flex h-36 w-36 items-center justify-center rounded-full border-[5px] border-[#1c6870] shadow-[0_0_45px_rgba(34,211,238,0.22)] sm:h-40 sm:w-40"
                style={{
                  background:
                    'repeating-radial-gradient(circle, #050b10 0px, #050b10 3px, #17434a 4px, #080e13 6px)',
                }}
              >
                <div className="absolute inset-[18%] rounded-full border border-cyan-100/15" />
                <div className="absolute inset-[30%] rounded-full border border-teal-100/20" />
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#12343c] bg-gradient-to-br from-cyan-200 via-teal-400 to-sky-600 shadow-[0_0_28px_rgba(34,211,238,0.55)]">
                  <Disc3 className="h-6 w-6 text-[#06212a]" />
                </div>
              </motion.div>

              <motion.div
                className="pointer-events-none absolute -inset-4 rounded-full border border-cyan-200/20"
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [1, 1.08, 1],
                        opacity: [0.2, 0.55, 0.2],
                      }
                }
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className="pointer-events-none absolute -inset-7 rounded-full border border-teal-200/10"
                animate={
                  reduceMotion
                    ? {}
                    : {
                        scale: [1, 1.12, 1],
                        opacity: [0.1, 0.3, 0.1],
                      }
                }
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Chapter Heading */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 max-w-2xl text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-200/[0.08] px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                <AudioLines className="h-3.5 w-3.5 text-cyan-300" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/90 sm:text-xs">
                  Chapter 02 · A melody to remember
                </p>
              </div>

              <h2 className="font-cinzel text-2xl leading-snug text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] sm:text-3xl font-medium tracking-wide">
                {chapter.question}
              </h2>

              <p className="mt-3 text-sm italic text-teal-100/80">
                Some songs stay in our hearts a little longer.
              </p>

              {/* Mini Soundwave Indicator */}
              <div className="mx-auto mt-5 flex max-w-[180px] items-center justify-center gap-1.5">
                {Array.from({ length: 17 }, (_, i) => (
                  <motion.span
                    key={`mini-wave-${i}`}
                    className="w-1 rounded-full bg-gradient-to-t from-teal-400 to-cyan-200"
                    animate={
                      reduceMotion
                        ? {}
                        : {
                            height: [
                              5 + (i % 3) * 3,
                              12 + ((i * 7) % 17),
                              5 + (i % 3) * 3,
                            ],
                          }
                    }
                    transition={{
                      duration: 0.9 + (i % 4) * 0.25,
                      repeat: Infinity,
                      delay: i * 0.06,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Music Selection Cards Grid */}
            <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-2">
              {chapter.options.map((option, index) => {
                const isSelected = selected === option.id;
                const isCorrect = option.id === chapter.correctOptionId;
                const isBonus = option.id === 'suraj-voice';

                let cardStyle =
                  'border-cyan-200/20 bg-[#0b1a21]/85 hover:border-cyan-200/60 hover:bg-[#10272e]/95 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]';

                if (status === 'correct' && isCorrect) {
                  cardStyle =
                    'border-teal-200/80 bg-teal-400/[0.12] shadow-[0_0_35px_rgba(45,212,191,0.25)] ring-2 ring-teal-300';
                } else if (status === 'wrong' && isSelected) {
                  cardStyle = 'border-rose-400/80 bg-rose-950/60 ring-1 ring-rose-400';
                } else if (isBonus) {
                  cardStyle =
                    'border-violet-300/40 bg-[#16122c]/85 hover:border-violet-200/80 hover:bg-[#20193d]/95 hover:shadow-[0_0_32px_rgba(139,92,246,0.18)]';
                }

                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    onClick={() => choose(option.id)}
                    disabled={
                      status === 'correct' ||
                      showBonus ||
                      (status === 'wrong' && isSelected)
                    }
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={reduceMotion ? {} : { y: -5, scale: 1.02 }}
                    whileTap={reduceMotion ? {} : { scale: 0.98 }}
                    className={`group relative flex min-h-36 sm:min-h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border p-4 text-center backdrop-blur-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:p-5 ${cardStyle}`}
                  >
                    {/* Top glass reflection line */}
                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent pointer-events-none" />

                    {/* Ambient glow on hover */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/[0.05] via-transparent to-teal-300/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Card Vinyl Disc */}
                    <motion.div
                      animate={
                        reduceMotion || (status === 'wrong' && isSelected)
                          ? {}
                          : { rotate: 360 }
                      }
                      transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-4 shadow-lg transition-shadow duration-300 ${
                        isBonus
                          ? 'border-violet-300/60 group-hover:shadow-[0_0_24px_rgba(167,139,250,0.4)]'
                          : 'border-teal-200/40 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]'
                      }`}
                      style={{
                        background: isBonus
                          ? 'repeating-radial-gradient(circle, #17132d 0px, #17132d 3px, #49356c 4px, #17132d 6px)'
                          : 'repeating-radial-gradient(circle, #071014 0px, #071014 3px, #17434a 4px, #071014 6px)',
                      }}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isBonus
                            ? 'bg-violet-300'
                            : 'bg-gradient-to-br from-cyan-200 to-teal-300'
                        }`}
                      >
                        {isBonus ? (
                          <Music2 className="h-3 w-3 text-violet-950" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#09232b]" />
                        )}
                      </span>
                    </motion.div>

                    <span className="relative text-sm font-semibold leading-snug text-slate-100 sm:text-base tracking-wide">
                      {option.label}
                    </span>

                    <span
                      className={`relative text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1 ${
                        isBonus ? 'text-violet-200/90' : 'text-cyan-100/70'
                      }`}
                    >
                      <span>{isBonus ? 'Secret bonus' : `Track 0${index + 1}`}</span>
                      {isBonus && <Sparkles size={11} className="text-amber-300" />}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Answer Feedback Cards */}
            <AnimatePresence mode="wait">
              {status === 'wrong' && (
                <motion.div
                  key="wrong"
                  initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-8 w-full max-w-lg rounded-3xl border border-rose-300/40 bg-[#0d171d]/90 p-6 text-center backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center justify-center gap-2 text-rose-300 font-semibold">
                    <AlertCircle className="h-4 w-4" />
                    <p>Not quite that melody</p>
                  </div>

                  <p className="mt-2.5 text-sm italic text-slate-200/90 leading-relaxed font-medium">
                    Hint: {chapter.hint}
                  </p>

                  <button
                    type="button"
                    onClick={retry}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-5 py-2 text-xs font-semibold text-rose-200 border border-rose-400/40 hover:bg-rose-500/30 transition shadow-sm"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Try again
                  </button>
                </motion.div>
              )}

              {status === 'correct' && (
                <motion.div
                  key="correct"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mt-8 w-full max-w-lg rounded-3xl border border-teal-300/50 bg-[#081b20]/95 p-7 text-center backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                >
                  <motion.div
                    className="mb-3.5 flex justify-center gap-3"
                    animate={reduceMotion ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Disc3 className="h-7 w-7 text-cyan-300" />
                    <CheckCircle2 className="h-7 w-7 text-teal-300" />
                    <Waves className="h-7 w-7 text-sky-300" />
                  </motion.div>

                  <p className="font-serif italic leading-relaxed text-slate-100 text-base sm:text-lg mb-6">
                    {chapter.successMessage}
                  </p>

                  <button
                    type="button"
                    onClick={onComplete}
                    className="inline-flex items-center gap-2.5 rounded-full border border-teal-200/40 bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-200 px-8 py-3.5 text-sm font-bold text-[#06181e] shadow-[0_8px_30px_rgba(45,212,191,0.25)] transition-all hover:scale-104 hover:shadow-[0_12px_36px_rgba(45,212,191,0.45)] focus:outline-none"
                  >
                    <span>Continue the Mystery</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MusicRoom;