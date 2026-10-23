import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CalendarHeart,
  Heart,
  MoonStar,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';

const memories = [
  {
    id: 'june',
    number: '01',
    label: 'MEMORY 01',
    title: 'when we met',
    icon: CalendarHeart,
    color: '#C4B5FD',
    accentColor: '#a78bfa',
    message:
      'June 12. The day our story began. Who knew that one beginning would turn into so many little memories?',
  },
  {
    id: 'babu',
    number: '02',
    label: 'MEMORY 02',
    title: 'A name only I called you',
    icon: Heart,
    color: '#F472B6',
    accentColor: '#fb7185',
    message:
      'A tiny nickname that became a little part of our story.',
  },
  {
    id: 'nights',
    number: '03',
    label: 'MEMORY 03',
    title: 'The hours that felt like minutes',
    icon: MoonStar,
    color: '#93C5FD',
    accentColor: '#60a5fa',
    message:
      'Our late-night talks… one conversation turning into hours of chatting. Somehow, there was always something more to say.',
  },
  {
    id: 'nicknames',
    number: '04',
    label: 'MEMORY 04',
    title: 'Our silly little nicknames',
    icon: Sparkles,
    color: '#FCD34D',
    accentColor: '#f59e0b',
    message:
      "You're my Marie gold biscuit, and I'm old hag. Some nicknames are so random that they become unforgettable.",
  },
];

type Memory = (typeof memories)[number];

function playChime(enabled: boolean, finale = false) {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const notes = finale
      ? [523.25, 659.25, 783.99, 1046.5]
      : [659.25, 783.99];

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = context.currentTime + index * (finale ? 0.18 : 0.08);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startAt);
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.48);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      oscillator.stop(startAt + 0.52);
    });

    window.setTimeout(() => {
      void context.close();
    }, finale ? 2000 : 900);
  } catch {
    // Graceful fallback
  }
}

function StarField() {
  const stars = Array.from({ length: 60 }, (_, index) => ({
    id: index,
    left: `${((index * 37 + 11) % 94) + 3}%`,
    top: `${((index * 53 + 7) % 92) + 4}%`,
    delay: (index % 9) * 0.28,
    size: index % 5 === 0 ? 3 : 1.5,
  }));

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-purple-200"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: '0 0 10px rgba(216,180,254,0.85)',
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.75, 1.3, 0.75] }}
          transition={{
            duration: 3 + (star.id % 4),
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

interface FinalRevealProps {
  onComplete?: () => void;
}

export default function FinalReveal({ onComplete }: FinalRevealProps) {
  const reduceMotion = useReducedMotion();
  const [openedMemories, setOpenedMemories] = useState<string[]>([]);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [showFinale, setShowFinale] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGoodbye, setShowGoodbye] = useState(false);
  const audioStarted = useRef(false);

  const allMemoriesOpened = openedMemories.length === memories.length;

  useEffect(() => {
    if (showFinale && !audioStarted.current) {
      audioStarted.current = true;
      playChime(soundEnabled, true);
    }
  }, [showFinale, soundEnabled]);

  const openMemory = (memory: Memory) => {
    if (!openedMemories.includes(memory.id)) {
      setOpenedMemories((previous) => [...previous, memory.id]);
      playChime(soundEnabled);
    }

    setActiveMemory(memory);
  };

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.65 };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#1a0f26] via-[#2d1533] to-[#12091d] text-slate-100 select-none">
      {/* Midnight Twilight Background Atmospheric Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-[12%] h-[460px] w-[460px] rounded-full bg-purple-600/15 blur-[130px]" />
        <div className="absolute -right-32 top-[40%] h-[500px] w-[500px] rounded-full bg-pink-600/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140b1e]/40 via-transparent to-[#0a050f]/80" />
      </div>

      <StarField />

      {/* Sound Effects Toggle Button */}
      <div className="absolute right-4 top-4 z-30 sm:right-7 sm:top-7">
        <button
          type="button"
          onClick={() => setSoundEnabled((enabled) => !enabled)}
          aria-label={
            soundEnabled ? 'Turn sound effects off' : 'Turn sound effects on'
          }
          className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-300/30 bg-white/10 text-purple-200 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!showFinale ? (
          <motion.section
            key="memories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: -16 }
            }
            transition={transition}
            className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-5 py-20 sm:px-8 sm:py-24"
          >
            {/* Header Badge & Title */}
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8 }}
              className="mb-8 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-300/35 bg-purple-500/15 px-4 py-1.5 text-xs font-sans tracking-[0.24em] text-purple-200 shadow-sm backdrop-blur-md">
                <Sparkles size={13} className="text-purple-300" />
                A LITTLE PIECE OF US
              </div>

              <h1 className="font-cinzel text-4xl sm:text-6xl font-medium tracking-wide text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.18)]">
                One Last Memory
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-purple-200/80 sm:text-base font-serif italic">
                Before you go… there are four little memories I'd like you to revisit.
              </p>
            </motion.div>

            {/* Glowing Memory Progress Indicator */}
            <div className="mb-9 flex items-center gap-2.5" aria-live="polite">
              {memories.map((memory) => {
                const isOpened = openedMemories.includes(memory.id);
                return (
                  <span
                    key={memory.id}
                    className="h-2 w-10 sm:w-14 rounded-full transition-all duration-500"
                    style={{
                      background: isOpened
                        ? `linear-gradient(90deg, ${memory.color}, ${memory.accentColor})`
                        : 'rgba(255,255,255,0.12)',
                      boxShadow: isOpened
                        ? `0 0 16px ${memory.accentColor}`
                        : 'none',
                    }}
                  />
                );
              })}
              <span className="ml-2 font-sans text-xs font-semibold tracking-wider text-purple-200/90">
                {openedMemories.length}/4
              </span>
            </div>

            {/* Memory Cards 2x2 Grid */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {memories.map((memory, index) => {
                const Icon = memory.icon;
                const isOpened = openedMemories.includes(memory.id);

                return (
                  <motion.button
                    key={memory.id}
                    type="button"
                    onClick={() => openMemory(memory)}
                    initial={
                      reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.55,
                      delay: reduceMotion ? 0 : index * 0.1,
                    }}
                    whileHover={
                      reduceMotion ? undefined : { y: -6, scale: 1.015 }
                    }
                    whileTap={{ scale: 0.985 }}
                    className="group relative flex min-h-[160px] flex-col items-start justify-between overflow-hidden rounded-3xl border p-6 text-left backdrop-blur-xl transition-all duration-300 sm:min-h-[175px] sm:p-7"
                    style={{
                      borderColor: isOpened
                        ? `${memory.color}90`
                        : 'rgba(255,255,255,0.18)',
                      background: isOpened
                        ? `linear-gradient(135deg, ${memory.color}15, rgba(255,255,255,0.06))`
                        : 'rgba(255,255,255,0.05)',
                      boxShadow: isOpened
                        ? `0 14px 40px ${memory.accentColor}25`
                        : '0 8px 30px rgba(0,0,0,0.25)',
                    }}
                  >
                    {/* Top Row: Icon + Badge */}
                    <div className="flex w-full items-center justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-108"
                        style={{
                          color: memory.color,
                          borderColor: `${memory.color}65`,
                          background: `${memory.color}20`,
                          boxShadow: `0 0 15px ${memory.color}35`,
                        }}
                      >
                        <Icon size={21} />
                      </span>

                      <span
                        className="rounded-full border px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm backdrop-blur-md"
                        style={{
                          borderColor: `${memory.color}55`,
                          background: `${memory.color}18`,
                          color: memory.color,
                        }}
                      >
                        {memory.label}
                      </span>
                    </div>

                    {/* Middle: Title & Status */}
                    <div className="mt-5 w-full">
                      <h2 className="font-cinzel text-xl sm:text-2xl font-normal text-white tracking-wide leading-snug">
                        {memory.title}
                      </h2>

                      <p className="mt-1.5 font-sans text-xs sm:text-sm text-purple-200/70 font-medium flex items-center gap-1">
                        <span>{isOpened ? 'Memory discovered' : 'Tap to discover'}</span>
                        {isOpened && <Sparkles size={13} className="text-amber-300" />}
                      </p>
                    </div>

                    {/* Subtle Right-Corner Watermark */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-4 -right-1 font-serif text-5xl font-bold tracking-widest text-white/5 transition-opacity group-hover:text-white/10"
                    >
                      {memory.number}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Memory Modal Popup */}
            <AnimatePresence>
              {activeMemory && (
                <motion.div
                  className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-5 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveMemory(null)}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="memory-title"
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.92, y: 18 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={transition}
                    onClick={(event) => event.stopPropagation()}
                    className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/25 bg-[#1b102b]/95 p-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-10"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${activeMemory.color}, transparent 65%)`,
                      }}
                    />

                    <div className="relative z-10">
                      <div
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg"
                        style={{
                          color: activeMemory.color,
                          borderColor: `${activeMemory.color}75`,
                          background: `${activeMemory.color}25`,
                          boxShadow: `0 0 25px ${activeMemory.color}45`,
                        }}
                      >
                        <activeMemory.icon size={29} />
                      </div>

                      <p
                        className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.25em]"
                        style={{ color: activeMemory.color }}
                      >
                        {activeMemory.label}
                      </p>

                      <h2
                        id="memory-title"
                        className="mt-2.5 font-cinzel text-2xl sm:text-3xl text-white font-medium"
                      >
                        {activeMemory.title}
                      </h2>

                      <p className="mx-auto mt-4 max-w-sm font-serif text-sm sm:text-base leading-7 sm:leading-8 text-purple-100/90 italic">
                        "{activeMemory.message}"
                      </p>

                      <button
                        type="button"
                        onClick={() => setActiveMemory(null)}
                        className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-purple-300/40 bg-purple-500/20 px-8 py-3 font-sans text-xs sm:text-sm font-semibold text-purple-100 transition-all hover:bg-purple-500/35 hover:scale-104 shadow-md"
                      >
                        <span>Keep this memory</span>
                        <Heart size={14} className="fill-current" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final Wish Unlock CTA Section */}
            <motion.div
              layout
              className="mt-12 text-center"
              animate={{ opacity: allMemoriesOpened ? 1 : 0.65 }}
            >
              <p className="mb-4 font-sans text-sm font-medium text-purple-200/85">
                {allMemoriesOpened
                  ? 'All four memories are glowing. Ready for one last thing?'
                  : 'Every little memory brings us one step closer…'}
              </p>

              <button
                type="button"
                disabled={!allMemoriesOpened}
                onClick={() => setShowFinale(true)}
                className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full border px-9 py-4 font-sans text-sm font-bold tracking-wide transition-all ${
                  allMemoriesOpened
                    ? 'border-amber-300/80 bg-gradient-to-r from-[#d977a8] via-[#e28db6] to-[#f59e0b] text-white shadow-[0_0_35px_rgba(245,158,11,0.45)] hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.65)] cursor-pointer'
                    : 'border-white/10 bg-white/5 text-purple-200/40 cursor-not-allowed'
                }`}
              >
                <span>Reveal the final wish</span>
                <Star
                  size={16}
                  className={
                    allMemoriesOpened
                      ? 'fill-amber-200 text-amber-100 transition-transform group-hover:rotate-45'
                      : 'text-purple-300/40'
                  }
                />
              </button>
            </motion.div>
          </motion.section>
        ) : (
          /* Climax Final Birthday Wish Screen */
          <motion.section
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.2 }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-center"
          >
            {/* Glowing Golden Aura Orb */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[40%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(251,191,36,0.4), rgba(244,114,182,0.2) 45%, transparent 72%)',
              }}
              animate={
                reduceMotion
                  ? {}
                  : { scale: [0.85, 1.3, 0.9], opacity: [0.6, 1, 0.6] }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Spinning/Pulsing Star Centerpiece */}
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.25, rotate: -35 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 1.4,
                type: 'spring',
                stiffness: 70,
                damping: 12,
              }}
              className="relative mb-8"
            >
              <Star
                size={96}
                strokeWidth={0.8}
                fill="#fbbf24"
                color="#fffbeb"
                style={{
                  filter: 'drop-shadow(0 0 35px rgba(251,191,36,0.85))',
                }}
              />

              {!reduceMotion &&
                Array.from({ length: 12 }, (_, index) => (
                  <motion.span
                    key={`starburst-${index}`}
                    className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-amber-200 pointer-events-none"
                    animate={{
                      x:
                        Math.cos((index / 12) * Math.PI * 2) *
                        (index % 2 ? 110 : 40),
                      y:
                        Math.sin((index / 12) * Math.PI * 2) *
                        (index % 2 ? 110 : 40),
                      opacity: [0, 1, 0],
                      scale: [0.4, 1.4, 0.2],
                    }}
                    transition={{
                      duration: 2.4,
                      delay: index * 0.08,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.4, duration: 0.7 }}
              className="font-sans text-xs uppercase tracking-[0.34em] text-amber-200/90 font-semibold"
            >
              A Little Wish For You
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.7, duration: 0.8 }}
              className="mt-4 max-w-3xl font-cinzel text-3xl sm:text-5xl md:text-6xl font-medium leading-tight text-white drop-shadow-md"
            >
              Some people make ordinary days feel special.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 1.1, duration: 0.8 }}
              className="mt-6 max-w-xl font-serif text-base leading-8 text-purple-100/90 sm:text-lg sm:leading-9 italic"
            >
              No matter where life takes you, I hope you always find reasons to
              smile, dreams worth chasing, and little moments that make life
              beautiful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 1.5, duration: 0.8 }}
              className="mt-8"
            >
              <p className="font-serif text-2xl text-pink-200 sm:text-3xl font-medium inline-flex items-center justify-center gap-2">
                <span>Happy Birthday, Marie.</span>
                <Heart size={24} className="fill-pink-300 text-pink-300 inline-block" />
              </p>
              <p className="mt-3 font-sans text-sm tracking-wide text-purple-200/80 font-medium">
                — Suraj
              </p>
            </motion.div>

            <AnimatePresence>
              {showGoodbye ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? {}
                        : { opacity: [0.6, 1, 0.6], scale: [0.96, 1.04, 0.96] }
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                    className="font-serif text-lg tracking-widest text-amber-200 flex items-center gap-2"
                  >
                    <Sparkles size={14} className="text-amber-200" />
                    <span>stay a little longer</span>
                    <Sparkles size={14} className="text-amber-200" />
                  </motion.div>

                  {onComplete && (
                    <button
                      type="button"
                      onClick={onComplete}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-300/35 bg-white/10 px-6 py-2.5 font-sans text-xs text-purple-100 backdrop-blur-md transition hover:bg-white/20 hover:scale-104 shadow-sm"
                    >
                      <RotateCcw size={13} />
                      Return to the beginning
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 2.1 }}
                  type="button"
                  onClick={() => setShowGoodbye(true)}
                  className="mt-10 rounded-full border border-purple-300/40 bg-white/10 px-8 py-3.5 font-sans text-sm text-white shadow-md backdrop-blur-md transition-all hover:border-amber-300/60 hover:bg-white/20 hover:scale-105"
                >
                  Stay a little longer
                </motion.button>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}