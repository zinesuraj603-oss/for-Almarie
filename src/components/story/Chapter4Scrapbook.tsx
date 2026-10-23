import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Heart,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Flower2,
} from 'lucide-react';
import { siteContent } from '../../data/content';
import { StoryFooterNav } from './StoryFooterNav';

export interface Chapter4ScrapbookProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Chapter4Scrapbook({ onNext, onPrev }: Chapter4ScrapbookProps) {
  const { photos } = siteContent;
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const closeViewer = useCallback(() => setSelectedPhoto(null), []);

  const showNext = useCallback(() => {
    setSelectedPhoto((current) =>
      current === null ? null : (current + 1) % photos.length
    );
  }, [photos.length]);

  const showPrevious = useCallback(() => {
    setSelectedPhoto((current) =>
      current === null ? null : (current - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeViewer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrevious();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedPhoto, closeViewer, showNext, showPrevious]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/80 bg-white/80 shadow-sm">
          <Flower2 className="h-5 w-5 text-pink-500" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A64D70]">
          Page 4 · Treasured Moments Scrapbook
        </p>

        <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          The Scrapbook
        </h2>

        <p className="mx-auto mt-3 max-w-md font-serif text-sm italic text-[#92566D] sm:text-base">
          “Every photograph holds a little feeling, a smile, and a reminder of how special you are.”
        </p>
      </div>

      {/* Featured Photo Hero */}
      <div className="mb-12 flex justify-center">
        <button
          type="button"
          onClick={() => setSelectedPhoto(0)}
          className="group relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-pink-200/90 bg-white p-3 shadow-[0_20px_50px_rgba(219,112,147,0.18)] transition-all hover:shadow-[0_25px_60px_rgba(219,112,147,0.28)] text-left cursor-pointer"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-pink-50 sm:aspect-[16/9]">
            <img
              src={photos[0].src}
              alt={photos[0].caption}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-104"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
              <span className="rounded-full border border-white/40 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                Featured Memory
              </span>
              <p className="mt-2 font-serif text-lg italic text-white sm:text-2xl drop-shadow-sm">
                "{photos[0].caption}"
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-pink-200">
                <Camera className="h-3.5 w-3.5" />
                <span>Tap to view in full size</span>
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Polaroid Grid of Other Photos */}
      <div className="grid grid-cols-1 items-center justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
        {photos.slice(1).map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(index + 1)}
            className={`group relative w-full max-w-[280px] rounded-sm border border-pink-100 bg-[#FFFDFB] p-3 pb-6 text-left shadow-[0_15px_40px_rgba(219,112,147,0.14)] transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer ${photo.rotation}`}
          >
            {/* Washi Tape */}
            <div className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-2deg] border-x border-white/70 bg-pink-300/80 shadow-sm" />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-pink-50">
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            {/* Polaroid Note Footer */}
            <div className="px-1 pt-4 text-center">
              <p className="font-serif text-sm italic font-medium text-[#65364B]">
                "{photo.caption}"
              </p>
              <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A16E82]">
                {photo.note}
              </p>
            </div>

            <Heart className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 fill-pink-200 text-pink-300" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="dialog"
            aria-modal="true"
            data-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF0F5]/95 p-4 backdrop-blur-xl"
            onClick={closeViewer}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeViewer}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 z-30 rounded-full border border-pink-300 bg-white/90 p-2.5 text-[#8E4263] shadow transition hover:bg-pink-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-pink-300 bg-white/90 p-2.5 text-[#8E4263] shadow transition hover:bg-pink-100 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image Stage */}
            <motion.div
              key={selectedPhoto}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
            >
              <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white p-2 shadow-2xl">
                <img
                  src={photos[selectedPhoto].src}
                  alt={photos[selectedPhoto].caption}
                  className="max-h-[65vh] max-w-full rounded-2xl object-contain"
                />
              </div>

              <p className="mt-4 text-center font-serif text-lg italic text-[#78344F] sm:text-xl">
                "{photos[selectedPhoto].caption}"
              </p>

              <span className="mt-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#A64D70]">
                <Sparkles className="h-3 w-3" />
                {selectedPhoto + 1} of {photos.length}
                <Sparkles className="h-3 w-3" />
              </span>
            </motion.div>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-pink-300 bg-white/90 p-2.5 text-[#8E4263] shadow transition hover:bg-pink-100 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story Chapter Navigation */}
      <StoryFooterNav
        currentChapter={4}
        totalChapters={7}
        onNext={onNext}
        onPrev={onPrev}
        nextChapterTitle="The Sweetheart Melody"
        prevChapterTitle="Her Little World"
        nextButtonLabel="Tap here to continue"
      />
    </motion.div>
  );
}

export default Chapter4Scrapbook;
