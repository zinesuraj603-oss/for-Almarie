import { motion } from 'framer-motion';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Disc3,
  Heart,
} from 'lucide-react';
import type { SongTrack } from '../../types/content';

export interface StoryHeaderProps {
  currentChapter: number;
  totalChapters: number;
  chapterTitles: string[];
  onSelectChapter: (chapter: number) => void;
  tracks: SongTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onVolumeChange: (vol: number) => void;
}

export function StoryHeader({
  currentChapter,
  totalChapters,
  chapterTitles,
  onSelectChapter,
  tracks,
  currentTrackIndex,
  isPlaying,
  volume,
  onPlayPause,
  onNextTrack,
  onVolumeChange,
}: StoryHeaderProps) {
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200/70 bg-[#FFF0F5]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Left: Story Page Title and Book Icon */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-400 text-white shadow-sm shadow-pink-300/40">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A64D70]">
              <span>Marie's Story</span>
              <span className="text-pink-300">·</span>
              <span>
                Page {currentChapter} of {totalChapters}
              </span>
            </div>
            <div className="truncate font-cinzel text-xs sm:text-sm font-semibold tracking-wide text-[#78344F]">
              {chapterTitles[currentChapter - 1]}
            </div>
          </div>
        </div>

        {/* Center: Delicate Storybook Page Beads (Progress Dots) */}
        <nav
          aria-label="Story unfolding progress"
          className="hidden md:flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md"
        >
          {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => {
            const isCurrent = currentChapter === ch;
            const isPassed = currentChapter > ch;

            if (isCurrent) {
              return (
                <div
                  key={ch}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 px-3 py-1 text-[11px] font-bold text-white shadow-sm"
                >
                  <Heart className="h-3 w-3 fill-white text-white animate-pulse" />
                  <span>Page {ch}</span>
                </div>
              );
            }

            if (isPassed) {
              return (
                <button
                  key={ch}
                  type="button"
                  onClick={() => onSelectChapter(ch)}
                  title={`Turn back to Page ${ch}: ${chapterTitles[ch - 1]}`}
                  aria-label={`Turn back to Page ${ch}: ${chapterTitles[ch - 1]}`}
                  className="group relative flex h-7 w-7 items-center justify-center rounded-full transition-all hover:bg-pink-100 cursor-pointer"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                </button>
              );
            }

            // Future mystery page (unfolds in sequence)
            return (
              <div
                key={ch}
                title={`Page ${ch}: ${chapterTitles[ch - 1]}`}
                aria-label={`Upcoming: Page ${ch}`}
                className="flex h-7 w-7 items-center justify-center"
              >
                <span className="h-2 w-2 rounded-full border border-pink-300/80 bg-transparent opacity-60" />
              </div>
            );
          })}
        </nav>

        {/* Right: Persistent Floating Audio Controller Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full border border-pink-200/80 bg-white/90 px-3 py-1 shadow-sm backdrop-blur-md">
            {/* Spinning Disc / Vinyl Icon */}
            <div className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
              <Disc3
                className={`h-4 w-4 text-pink-500 ${
                  isPlaying ? 'animate-spin-slow' : 'opacity-70'
                }`}
              />
            </div>

            {/* Track Name */}
            <div className="hidden sm:block max-w-[90px] md:max-w-[120px] truncate text-left">
              <p className="truncate text-[11px] font-bold text-[#682643]">
                {currentTrack.title}
              </p>
            </div>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={onPlayPause}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              title={isPlaying ? 'Pause' : 'Play'}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm transition hover:scale-108 active:scale-95 cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5 translate-x-0.5" />
              )}
            </button>

            {/* Skip Track Button */}
            <button
              type="button"
              onClick={onNextTrack}
              aria-label="Next song"
              title="Next song"
              className="hidden sm:flex h-6 w-6 items-center justify-center text-[#874A62] transition hover:text-[#5B203B] cursor-pointer"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>

            {/* Volume / Mute Button */}
            <button
              type="button"
              onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
              aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              title={volume === 0 ? 'Unmute' : 'Mute'}
              className="flex h-6 w-6 items-center justify-center text-[#874A62] transition hover:text-[#5B203B] cursor-pointer"
            >
              {volume === 0 ? (
                <VolumeX className="h-3.5 w-3.5" />
              ) : (
                <Volume2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Page Progress Line */}
      <div className="md:hidden flex h-1 w-full bg-pink-100/80">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
          initial={false}
          animate={{
            width: `${(currentChapter / totalChapters) * 100}%`,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
}

export default StoryHeader;
