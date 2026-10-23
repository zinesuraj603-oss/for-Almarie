import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, BookOpen, Stars } from 'lucide-react';
import { playTeddySound } from '../../utils/teddySound';
import { siteContent } from '../../data/content';

export interface Chapter1GateProps {
  onBegin: () => void;
}

export function Chapter1Gate({ onBegin }: Chapter1GateProps) {
  const { recipient } = siteContent;

  const handleBeginClick = () => {
    playTeddySound('sparkle');
    onBegin();
  };

  return (
    <div className="relative flex min-h-[85vh] w-full flex-col items-center justify-center px-4 py-12 text-center">
      {/* Background radial orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-pink-300/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-rose-300/25 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-[38px] border border-pink-200/90 bg-white/85 p-8 shadow-[0_20px_60px_rgba(219,112,147,0.18)] backdrop-blur-xl sm:p-14"
      >
        {/* Story Chapter Indicator Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-300/70 bg-pink-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#A64D70] shadow-sm">
          <BookOpen className="h-3.5 w-3.5 text-pink-500" />
          <span>Page 1 · The Sanctuary Gate</span>
          <Sparkles className="h-3.5 w-3.5 text-pink-500" />
        </div>

        {/* Date Pill */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#874A62]">
          <Heart className="h-3 w-3 fill-rose-500 text-rose-500 animate-pulse" />
          <span>December 19 · A Story Written Just For You, Marie</span>
          <Heart className="h-3 w-3 fill-rose-500 text-rose-500 animate-pulse" />
        </div>

        {/* Pulsing Central Heart */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-pink-300 bg-gradient-to-tr from-pink-400 to-rose-400 text-white shadow-[0_10px_35px_rgba(244,114,182,0.4)]">
          <Heart className="h-12 w-12 fill-white animate-heartbeat" />
        </div>

        {/* Title */}
        <h1 className="font-cinzel text-3xl font-bold tracking-tight text-[#682643] sm:text-5xl">
          Marie's Sanctuary
        </h1>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#A64D70] sm:text-sm">
          {recipient.nicknames.join(' · ')}
        </p>

        <p className="mt-4 max-w-md font-serif text-sm italic leading-relaxed text-[#874A62] sm:text-base">
          “A story written just for you across the miles, holding all your favorite things, your
          biggest wish, treasured memories, and a warm hug.”
        </p>

        {/* Prompt note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-[#A64D70]">
          <Stars className="h-3.5 w-3.5 text-pink-400" />
          <span>Put on your headphones and tap below to turn each page</span>
        </div>

        {/* Primary Action Button */}
        <motion.button
          type="button"
          onClick={handleBeginClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 px-9 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition-all hover:shadow-[0_14px_45px_rgba(236,72,153,0.5)] focus:outline-none cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>Tap here to begin your birthday story</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Chapter1Gate;
