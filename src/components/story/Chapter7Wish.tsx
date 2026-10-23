import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarHeart,
  Heart,
  MoonStar,
  Sparkles,
  Star,
  RotateCcw,
  PartyPopper,
  ArrowLeft,
} from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { playTeddySound } from '../../utils/teddySound';

export interface Chapter7WishProps {
  onRestart: () => void;
  onPrev: () => void;
}

const memories = [
  {
    id: 'june',
    number: '01',
    label: 'MEMORY 01',
    title: 'when we met',
    icon: CalendarHeart,
    color: '#F472B6',
    accentColor: '#fb7185',
    message:
      'June 12. The day our story began. Who knew that one beginning would turn into so many little memories?',
  },
  {
    id: 'babu',
    number: '02',
    label: 'MEMORY 02',
    title: 'A name only I called you',
    icon: Heart,
    color: '#FB7185',
    accentColor: '#f43f5e',
    message:
      'A tiny nickname that became a little part of our story.',
  },
  {
    id: 'nights',
    number: '03',
    label: 'MEMORY 03',
    title: 'The hours that felt like minutes',
    icon: MoonStar,
    color: '#C084FC',
    accentColor: '#a855f7',
    message:
      'Our late-night talks… one conversation turning into hours of chatting. Somehow, there was always something more to say.',
  },
  {
    id: 'nicknames',
    number: '04',
    label: 'MEMORY 04',
    title: 'Our silly little nicknames',
    icon: Sparkles,
    color: '#FBBF24',
    accentColor: '#f59e0b',
    message:
      "You're my Marie gold biscuit, and I'm old hag. Some nicknames are so random that they become unforgettable.",
  },
];

type Memory = (typeof memories)[number];

export function Chapter7Wish({ onRestart, onPrev }: Chapter7WishProps) {
  const [openedMemories, setOpenedMemories] = useState<string[]>(['june', 'babu', 'nights', 'nicknames']);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [showFinale, setShowFinale] = useState(false);

  useEffect(() => {
    // Gentle celebration burst when entering Chapter 7
    try {
      triggerConfetti();
    } catch {
      // Fallback
    }
  }, []);

  const handleConfettiShower = () => {
    playTeddySound('sparkle');
    triggerConfetti();
  };

  const openMemory = (memory: Memory) => {
    playTeddySound('sparkle');
    if (!openedMemories.includes(memory.id)) {
      setOpenedMemories((prev) => [...prev, memory.id]);
    }
    setActiveMemory(memory);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto flex min-h-[85vh] w-full max-w-4xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12 text-center"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/80 bg-white/80 shadow-sm">
          <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A64D70]">
          Page 7 · The Midnight Wish & Forever Blessing
        </p>

        <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          The Midnight Wish & Forever Blessing
        </h2>

        <p className="mx-auto mt-3 max-w-lg font-serif text-sm italic text-[#92566D] sm:text-base">
          “Four little memories from our story, and one timeless wish from my heart to yours.”
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showFinale ? (
          /* SECTION A: MEMORIES SHOWCASE */
          <motion.div
            key="memories-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex w-full flex-col items-center"
          >
            {/* 4 Memory Cards Grid */}
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {memories.map((mem) => {
                const Icon = mem.icon;
                const isOpened = openedMemories.includes(mem.id);

                return (
                  <motion.button
                    key={mem.id}
                    type="button"
                    onClick={() => openMemory(mem)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex min-h-[145px] flex-col items-start justify-between rounded-3xl border border-pink-200/90 bg-white/90 p-5 text-left shadow-sm backdrop-blur-md transition-all hover:border-pink-300 hover:shadow-md cursor-pointer sm:p-6"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm"
                        style={{
                          backgroundColor: `${mem.color}20`,
                          color: mem.color,
                        }}
                      >
                        <Icon size={20} className="fill-current" />
                      </div>

                      <span className="rounded-full border border-pink-200 bg-pink-50/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A64D70]">
                        {mem.label}
                      </span>
                    </div>

                    <div className="mt-4 w-full">
                      <h4 className="font-cinzel text-base font-bold text-[#682643] sm:text-lg">
                        {mem.title}
                      </h4>
                      <p className="mt-1 flex items-center gap-1 text-xs text-[#874A62]">
                        <span>{isOpened ? 'Read memory' : 'Tap to read'}</span>
                        <Sparkles size={12} className="text-amber-500" />
                      </p>
                    </div>

                    {/* Watermark Number */}
                    <span className="pointer-events-none absolute bottom-2 right-4 font-cinzel text-4xl font-bold text-pink-100/70">
                      {mem.number}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Action to unlock final blessing */}
            <div className="mt-10 flex flex-col items-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#A64D70]">
                All memories gathered · Ready for your birthday blessing
              </p>

              <motion.button
                type="button"
                onClick={() => {
                  playTeddySound('sparkle');
                  setShowFinale(true);
                  handleConfettiShower();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 px-9 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_35px_rgba(244,114,182,0.4)] transition-all hover:shadow-[0_14px_45px_rgba(244,114,182,0.6)] cursor-pointer"
              >
                <Star className="h-4 w-4 fill-white text-white transition-transform group-hover:rotate-45" />
                <span>Reveal Your Birthday Blessing</span>
                <Sparkles className="h-4 w-4 text-amber-200" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* SECTION B: FINAL BLESSING CARD */
          <motion.div
            key="finale-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-col items-center"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[38px] border-2 border-pink-200/90 bg-gradient-to-b from-white/95 via-[#FFF4F7] to-white/95 p-8 shadow-[0_20px_60px_rgba(219,112,147,0.25)] backdrop-blur-xl sm:p-14">
              {/* Shimmering Aura */}
              <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-300/25 via-pink-300/35 to-rose-300/20 blur-3xl" />

              {/* Glowing Centerpiece Star */}
              <div className="relative mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-amber-300 bg-gradient-to-tr from-amber-400 to-rose-400 text-white shadow-[0_10px_35px_rgba(245,158,11,0.35)]">
                  <Star className="h-10 w-10 fill-white text-white animate-pulse" />
                </div>
              </div>

              {/* Tag */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-50/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#85532A] shadow-sm">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>A Blessing For Marie</span>
                <Sparkles className="h-3 w-3 text-amber-500" />
              </div>

              {/* Main Statement */}
              <h3 className="font-cinzel text-2xl font-bold leading-tight text-[#682643] sm:text-4xl">
                Some people make ordinary days feel special.
              </h3>

              <p className="mt-6 font-serif text-base italic leading-relaxed text-[#874A62] sm:text-lg">
                “No matter where life takes you, I hope you always find reasons to
                smile, dreams worth chasing, and little moments that make life
                beautiful.”
              </p>

              {/* Dedication */}
              <div className="mt-8 border-t border-pink-200/70 pt-6">
                <p className="font-cinzel text-2xl font-bold text-[#78344F] sm:text-3xl flex items-center justify-center gap-2">
                  <span>Happy Birthday, Marie!</span>
                  <Heart className="h-6 w-6 fill-rose-500 text-rose-500 animate-pulse" />
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#A64D70]">
                  From Suraj · 2026 – Forever
                </p>
              </div>

              {/* Interactive Confetti & Celebration Buttons */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <motion.button
                  type="button"
                  onClick={handleConfettiShower}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-3 text-xs font-semibold text-white shadow-sm transition hover:shadow-md cursor-pointer"
                >
                  <PartyPopper className="h-4 w-4" />
                  <span>Throw Birthday Confetti!</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onRestart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-6 py-3 text-xs font-semibold text-[#874A62] shadow-sm transition hover:bg-pink-50 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 text-pink-500" />
                  <span>Replay Story from Beginning</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Modal Popup */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            role="dialog"
            aria-modal="true"
            data-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-pink-200 bg-white/95 p-7 text-center shadow-2xl backdrop-blur-xl sm:p-9"
            >
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm"
                style={{
                  backgroundColor: `${activeMemory.color}20`,
                  color: activeMemory.color,
                }}
              >
                <activeMemory.icon size={26} className="fill-current" />
              </div>

              <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64D70]">
                {activeMemory.label}
              </span>

              <h4 className="mt-1 font-cinzel text-xl font-bold text-[#682643]">
                {activeMemory.title}
              </h4>

              <p className="mt-4 font-serif text-sm italic leading-relaxed text-[#874A62]">
                "{activeMemory.message}"
              </p>

              <button
                type="button"
                onClick={() => setActiveMemory(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:scale-105 cursor-pointer"
              >
                <span>Keep this memory close</span>
                <Heart size={14} className="fill-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer for Chapter 7 */}
      <div className="mt-12 flex items-center justify-between w-full max-w-2xl border-t border-pink-200/60 pt-6">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-xs font-semibold text-[#874A62] shadow-sm hover:bg-pink-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous: Page 6 · A Letter for Marie</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-pink-300 bg-pink-100/80 px-4 py-2 text-xs font-semibold text-[#874A62] shadow-sm hover:bg-pink-200/80 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4 text-pink-500" />
          <span>Replay Story from Beginning</span>
        </button>
      </div>
    </motion.div>
  );
}

export default Chapter7Wish;
