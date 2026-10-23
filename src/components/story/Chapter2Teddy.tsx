import { motion } from 'framer-motion';
import { TeddyBear } from '../TeddyBear';
import { StoryFooterNav } from './StoryFooterNav';

export interface Chapter2TeddyProps {
  onNext: () => void;
  onPrev: () => void;
}

export function Chapter2Teddy({ onNext, onPrev }: Chapter2TeddyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-5xl px-3 py-6 sm:px-6"
    >
      {/* Chapter 2 Content */}
      <TeddyBear />

      {/* Chapter Footer Navigation */}
      <StoryFooterNav
        currentChapter={2}
        totalChapters={7}
        onNext={onNext}
        onPrev={onPrev}
        nextChapterTitle="Her Little World"
        prevChapterTitle="The Sanctuary Gate"
        nextButtonLabel="Tap here to continue"
      />
    </motion.div>
  );
}

export default Chapter2Teddy;
