import { MusicRoom } from '../components/chapters/MusicRoom';
import { ColourDream } from '../components/chapters/ColourDream';
import { FlowerRiddle } from '../components/chapters/FlowerRiddle';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import type { ProgressState } from '../hooks/useProgress';
import { HiddenStars } from '../components/chapters/HiddenStars';
import { ChapterLayout } from '../components/chapters/ChapterLayout';
import { SkyChooser } from '../components/chapters/SkyChooser';

interface MysteryChaptersProps {
  progress: ProgressState;
  onNext: () => void;
  onBack: () => void;
  onComplete: () => void;
  discoverStar: (id: string) => void;
  discoveredStars: string[];
}

export default function MysteryChapters({ 
  progress, 
  onNext, 
  onBack, 
  onComplete, 
  discoverStar, 
  discoveredStars 
}: MysteryChaptersProps) {
  const { currentChapter } = progress;
  const { chapters } = content;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentChapter]);

  const handleContinue = () => {
    if (currentChapter < 4) {
      onNext();
    } else {
      onComplete();
    }
  };

  return (
    <AnimatePresence mode="wait">
     
{/* CHAPTER 1 */}
{currentChapter === 1 && (
  <ChapterLayout
    key="ch1"
    title={chapters.chapter1.title}
    theme="midnight"
  >
    <HiddenStars
      starIds={['ch1-star-1', 'ch1-star-2']}
      discoveredStars={discoveredStars}
      onDiscoverStar={discoverStar}
    />

    <ColourDream
      chapter={chapters.chapter1}
      onComplete={handleContinue}
    />
  </ChapterLayout>
)}


      
{/* CHAPTER 2 */}
{currentChapter === 2 && (
  <ChapterLayout
    key="ch2"
    title={chapters.chapter2.title}
    onBack={onBack}
    theme="rose"
  >
    <HiddenStars
      starIds={['ch2-star-1']}
      discoveredStars={discoveredStars}
      onDiscoverStar={discoverStar}
    />

    <MusicRoom
      chapter={chapters.chapter2}
      onComplete={handleContinue}
    />
  </ChapterLayout>
)}


      {/* CHAPTER 3 */}
      {currentChapter === 3 && (
        <ChapterLayout key="ch3" title={chapters.chapter3.title} onBack={onBack} theme="atmospheric">
          <div className="relative z-10 w-full mt-4">
             <SkyChooser chapter={chapters.chapter3} onComplete={handleContinue} />
          </div>
        </ChapterLayout>
      )}

           {/* CHAPTER 4 */}
      {currentChapter === 4 && (
        <ChapterLayout key="ch4" title={chapters.chapter4.title} onBack={onBack} theme="floral">
          <div className="relative z-10 w-full mt-4">
             <FlowerRiddle chapter={chapters.chapter4} onComplete={onComplete} />
          </div>
        </ChapterLayout>
      )}
    </AnimatePresence>
  );
}