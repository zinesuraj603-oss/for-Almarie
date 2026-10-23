import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Mail,
  Flower2,
  Check,
} from 'lucide-react';
import { siteContent } from '../data/content';

export function LetterView() {
  const { letter } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const fullText = letter.paragraphs.join('\n\n');
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (!isOpen || showFullLetter || visibleLength >= fullText.length) return;
    const timer = window.setTimeout(() => {
      setVisibleLength((len) => Math.min(len + 4, fullText.length));
    }, 16);
    return () => window.clearTimeout(timer);
  }, [isOpen, showFullLetter, visibleLength, fullText]);

  const displayedText = showFullLetter
    ? fullText
    : fullText.slice(0, visibleLength);

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/80 bg-white/80 shadow-sm">
          <Mail className="h-5 w-5 text-pink-500" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A64D70]">
          From the Heart
        </p>

        <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          {letter.title}
        </h2>

        <p className="mx-auto mt-3 max-w-md font-serif text-sm italic text-[#92566D] sm:text-base">
          “Words written with genuine care, across every mile between us.”
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* UNOPENED ENVELOPE */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="flex w-full flex-col items-center"
          >
            <div className="relative flex w-full max-w-md flex-col items-center rounded-3xl border border-pink-200/90 bg-white/90 p-8 shadow-[0_20px_50px_rgba(219,112,147,0.18)] text-center sm:p-12">
              {/* Envelope flap illustration */}
              <div className="relative mb-6 flex h-24 w-36 items-center justify-center rounded-2xl border-2 border-pink-300/70 bg-gradient-to-br from-pink-100 to-rose-100 shadow-inner">
                {/* Wax Seal */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md ring-4 ring-pink-200">
                  <Heart className="h-5 w-5 fill-white" />
                </div>
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A64D70]">
                {letter.envelopeLabel}
              </span>

              <h3 className="mt-2 font-cinzel text-2xl font-bold text-[#682643]">
                For Marie
              </h3>

              <p className="mt-2 text-xs font-serif italic text-[#874A62]">
                A sealed letter from Suraj waiting for your eyes only.
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-pink-300 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:scale-105 active:scale-95"
              >
                <Heart className="h-4 w-4 fill-white" />
                <span>{letter.tapToOpen}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* OPENED STATIONERY LETTER */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Stationery Paper Container */}
            <article className="relative w-full overflow-hidden rounded-3xl border border-[#ecd2cb] bg-[#fffaf5] p-6 shadow-[0_20px_60px_rgba(190,100,125,0.18)] sm:p-12">
              {/* Ornate Inner Double Frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rounded-2xl border border-[#e8bfb5]/50 sm:inset-5"
              />

              <div className="relative z-10">
                {/* Letter Header */}
                <div className="mb-6 flex items-center justify-between border-b border-[#ecd2ba] pb-4">
                  <div className="flex items-center gap-2 text-rose-500">
                    <Flower2 className="h-4 w-4" />
                    <span className="font-cinzel text-xs font-semibold tracking-wider text-[#8c3b56]">
                      Sanctuary Letter
                    </span>
                  </div>
                  <span className="text-[11px] font-mono-code text-[#a0623a]">
                    December 19
                  </span>
                </div>

                {/* Greeting */}
                <p className="font-cinzel text-xl font-bold text-[#451e0e] sm:text-2xl">
                  {letter.greeting}
                </p>

                {/* Body Text */}
                <div className="mt-6 whitespace-pre-wrap font-serif text-[15px] leading-[1.95] text-[#3d1f25] sm:text-[17px] sm:leading-[2.1]">
                  {displayedText}
                  {!showFullLetter && visibleLength < fullText.length && (
                    <span className="ml-1 inline-block animate-pulse font-sans font-bold text-rose-500">
                      |
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="my-8 flex items-center justify-center gap-3 text-[#b87b78]/70">
                  <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#e3b3a8]" />
                  <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                  <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#e3b3a8]" />
                </div>

                {/* Sign-off */}
                <div className="text-right">
                  <p className="font-serif text-sm italic text-[#633443]">
                    {letter.signoff}
                  </p>
                  <p className="mt-1 font-cinzel text-lg font-bold text-[#7c2d12]">
                    {letter.sender}
                  </p>
                </div>
              </div>
            </article>

            {/* Instant Reveal Button if still typing */}
            {!showFullLetter && visibleLength < fullText.length && (
              <button
                type="button"
                onClick={() => setShowFullLetter(true)}
                className="mt-6 text-xs font-semibold text-[#874A62] underline decoration-pink-300 underline-offset-4 transition hover:text-[#5B203B]"
              >
                Reveal full letter instantly
              </button>
            )}

            {/* Read confirmation */}
            <div className="mt-6 flex items-center gap-2 text-xs text-[#874A62]">
              <Check className="h-4 w-4 text-emerald-500" />
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
              <span>Kept with love forever in your sanctuary</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LetterView;
