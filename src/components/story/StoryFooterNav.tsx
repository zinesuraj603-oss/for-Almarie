import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Heart, Sparkles } from 'lucide-react';

export interface StoryFooterNavProps {
  currentChapter: number;
  totalChapters: number;
  onNext?: () => void;
  onPrev?: () => void;
  nextChapterTitle?: string;
  prevChapterTitle?: string;
  nextButtonLabel?: string;
}

export function StoryFooterNav({
  currentChapter,
  totalChapters,
  onNext,
  onPrev,
  nextChapterTitle,
  prevChapterTitle,
  nextButtonLabel,
}: StoryFooterNavProps) {
  const isFirst = currentChapter <= 1;
  const isLast = currentChapter >= totalChapters;

  return (
    <nav
      aria-label="Story page navigation"
      className="relative mt-16 w-full border-t border-pink-200/70 bg-white/60 py-8 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        {/* Previous Page Button */}
        <div className="order-3 sm:order-1">
          {!isFirst && onPrev ? (
            <motion.button
              type="button"
              onClick={onPrev}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/95 px-5 py-2.5 text-xs font-semibold text-[#874A62] shadow-sm transition hover:bg-pink-50 hover:text-[#5B203B] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>
                {prevChapterTitle ? `Previous: ${prevChapterTitle}` : 'Previous Page'}
              </span>
            </motion.button>
          ) : (
            <div className="hidden sm:block text-xs font-serif italic text-[#A64D70]">
              Beginning of your story
            </div>
          )}
        </div>

        {/* Story Status Counter */}
        <div className="order-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A64D70]">
          <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
          <span>
            Story Page {currentChapter} of {totalChapters}
          </span>
          <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
        </div>

        {/* Next Page Main Button */}
        <div className="order-1 sm:order-3 w-full sm:w-auto flex justify-center">
          {!isLast && onNext ? (
            <motion.button
              type="button"
              onClick={onNext}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition-all hover:shadow-[0_14px_45px_rgba(236,72,153,0.5)] focus:outline-none cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-pink-200" />
              <div className="text-left">
                <span className="block font-bold">
                  {nextButtonLabel || 'Tap here to continue'}
                </span>
                {nextChapterTitle && (
                  <span className="block text-[10px] text-pink-100 font-normal opacity-90">
                    Next: Page {currentChapter + 1} · {nextChapterTitle}
                  </span>
                )}
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          ) : !isLast && !onNext ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50/80 px-4 py-2 text-xs text-[#874A62] font-serif italic">
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              <span>Open your letter above to continue the story</span>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default StoryFooterNav;
