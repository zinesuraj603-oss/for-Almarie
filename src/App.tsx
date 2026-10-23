import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SeasonalAtmosphere } from './components/SeasonalAtmosphere';
import { StoryHeader } from './components/story/StoryHeader';
import { Chapter1Gate } from './components/story/Chapter1Gate';
import { Chapter2Teddy } from './components/story/Chapter2Teddy';
import { Chapter3World } from './components/story/Chapter3World';
import { Chapter4Scrapbook } from './components/story/Chapter4Scrapbook';
import { Chapter5Music } from './components/story/Chapter5Music';
import { Chapter6Letter } from './components/story/Chapter6Letter';
import { Chapter7Wish } from './components/story/Chapter7Wish';
import { siteContent } from './data/content';

const CHAPTER_TITLES = [
  'The Sanctuary Gate',
  'Her Fluffy Babu Bear',
  'Her Little World & Favorites',
  'Treasured Moments Scrapbook',
  'The Vinyl Music Lounge',
  'A Letter for Marie',
  'The Midnight Wish & Blessing',
];

const pageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 32 : -32,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
    scale: 0.985,
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function App() {
  const [currentChapter, setCurrentChapter] = useState<number>(() => {
    const saved = sessionStorage.getItem('marie-story-chapter');
    const parsed = saved ? parseInt(saved, 10) : 1;
    return parsed >= 1 && parsed <= 7 ? parsed : 1;
  });

  const [direction, setDirection] = useState<1 | -1>(1);

  // Global Audio Controller State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const tracks = siteContent.playlist;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    sessionStorage.setItem('marie-story-chapter', currentChapter.toString());
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentChapter]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleStartMusic = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying]);

  const handleGoToChapter = (chapter: number) => {
    if (chapter >= 1 && chapter <= 7) {
      setDirection(chapter > currentChapter ? 1 : -1);
      setCurrentChapter(chapter);
      if (chapter > 1) {
        handleStartMusic();
      }
    }
  };

  const handleNextChapter = useCallback(() => {
    setDirection(1);
    handleStartMusic();
    setCurrentChapter((prev) => Math.min(7, prev + 1));
  }, [handleStartMusic]);

  const handlePrevChapter = useCallback(() => {
    setDirection(-1);
    setCurrentChapter((prev) => Math.max(1, prev - 1));
  }, []);

  const handleRestartStory = useCallback(() => {
    setDirection(-1);
    setCurrentChapter(1);
  }, []);

  // Keyboard Navigation: Left/Right arrows for effortless page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is interacting with an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.defaultPrevented
      ) {
        return;
      }

      // Don't turn chapter pages if a modal or lightbox is open!
      const hasOpenModal = document.querySelector(
        '[role="dialog"], [data-modal="true"], .fixed.inset-0.z-50'
      );
      if (hasOpenModal) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleNextChapter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextChapter, handlePrevChapter]);

  // Audio Handlers
  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const handleNextTrack = useCallback(() => {
    const wasPlaying = isPlaying || (audioRef.current && !audioRef.current.paused);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
    if (wasPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 60);
    }
  }, [isPlaying, tracks.length]);

  const handlePrevTrack = useCallback(() => {
    const wasPlaying = isPlaying || (audioRef.current && !audioRef.current.paused);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
    if (wasPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 60);
    }
  }, [isPlaying, tracks.length]);

  const handleTrackEnded = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 60);
  }, [tracks.length]);

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const handleSelectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 60);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#FFF0F5] text-[#4a2135] selection:bg-pink-200">
      {/* Hidden Global Audio Element (Plays seamlessly across page transitions without resetting) */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={handleTrackEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Persistent Season Atmospheric Background (Gentle snowfall active all the time) */}
      <SeasonalAtmosphere mode="snow" />

      {/* Persistent Floating Story Header (Visible across entire story journey) */}
      <StoryHeader
        currentChapter={currentChapter}
        totalChapters={7}
        chapterTitles={CHAPTER_TITLES}
        onSelectChapter={handleGoToChapter}
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        volume={volume}
        onPlayPause={handlePlayPause}
        onNextTrack={handleNextTrack}
        onVolumeChange={handleVolumeChange}
      />

      {/* Main Unfolding Story Stage */}
      <main className="relative z-10 min-h-[calc(100vh-65px)]">
        <AnimatePresence mode="wait" custom={direction}>
          {currentChapter === 1 && (
            <motion.div
              key="chapter-1"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter1Gate onBegin={handleNextChapter} />
            </motion.div>
          )}

          {currentChapter === 2 && (
            <motion.div
              key="chapter-2"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter2Teddy
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
              />
            </motion.div>
          )}

          {currentChapter === 3 && (
            <motion.div
              key="chapter-3"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter3World
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
                tracks={tracks}
                currentTrackIndex={currentTrackIndex}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onPlayPause={handlePlayPause}
                onNextTrack={handleNextTrack}
                onPrevTrack={handlePrevTrack}
                onSeek={handleSeek}
              />
            </motion.div>
          )}

          {currentChapter === 4 && (
            <motion.div
              key="chapter-4"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter4Scrapbook
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
              />
            </motion.div>
          )}

          {currentChapter === 5 && (
            <motion.div
              key="chapter-5"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter5Music
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
                tracks={tracks}
                currentTrackIndex={currentTrackIndex}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                onPlayPause={handlePlayPause}
                onNextTrack={handleNextTrack}
                onPrevTrack={handlePrevTrack}
                onSeek={handleSeek}
                onVolumeChange={handleVolumeChange}
                onSelectTrack={handleSelectTrack}
              />
            </motion.div>
          )}

          {currentChapter === 6 && (
            <motion.div
              key="chapter-6"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter6Letter
                onNext={handleNextChapter}
                onPrev={handlePrevChapter}
              />
            </motion.div>
          )}

          {currentChapter === 7 && (
            <motion.div
              key="chapter-7"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Chapter7Wish
                onRestart={handleRestartStory}
                onPrev={handlePrevChapter}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;