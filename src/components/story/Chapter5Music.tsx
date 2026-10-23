import { motion } from 'framer-motion';
import {
  Disc3,
  Play,
  Pause,
  Headphones,
  Music2,
  Heart,
  Sparkles,
  Radio,
} from 'lucide-react';
import { siteContent } from '../../data/content';
import { VinylPlayer } from '../VinylPlayer';
import { StoryFooterNav } from './StoryFooterNav';
import type { SongTrack } from '../../types/content';

export interface Chapter5MusicProps {
  onNext: () => void;
  onPrev: () => void;
  tracks: SongTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onSelectTrack: (index: number) => void;
}

export function Chapter5Music({
  onNext,
  onPrev,
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  onSeek,
  onVolumeChange,
  onSelectTrack,
}: Chapter5MusicProps) {
  const { favorites } = siteContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-pink-300/80 bg-white/80 shadow-sm">
          <Music2 className="h-5 w-5 text-pink-500" />
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A64D70]">
          Page 5 · Her Melodies & Soundtracks
        </p>

        <h2 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          The Vinyl Music Lounge
        </h2>

        <p className="mx-auto mt-3 max-w-md font-serif text-sm italic text-[#92566D] sm:text-base">
          “Music has a way of saying all the things words can never completely hold.”
        </p>
      </div>

      {/* Main Turntable Component */}
      <div className="flex w-full justify-center">
        <VinylPlayer
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onPlayPause={onPlayPause}
          onNextTrack={onNextTrack}
          onPrevTrack={onPrevTrack}
          onSeek={onSeek}
          onVolumeChange={onVolumeChange}
          variant="expanded"
        />
      </div>

      {/* Track Selection List */}
      <div className="mt-12 w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-pink-500" />
            <h3 className="font-cinzel text-lg font-bold text-[#682643]">
              Curated Birthday Playlist
            </h3>
          </div>
          <span className="text-xs text-[#9E5D77]">
            {tracks.length} Songs Loaded
          </span>
        </div>

        <div className="space-y-3">
          {tracks.map((track, idx) => {
            const isCurrent = currentTrackIndex === idx;
            return (
              <motion.button
                key={track.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (isCurrent) {
                    onPlayPause();
                  } else {
                    onSelectTrack(idx);
                  }
                }}
                className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                  isCurrent
                    ? 'border-pink-300 bg-white/95 shadow-md ring-2 ring-pink-300/40'
                    : 'border-pink-200/70 bg-white/70 hover:bg-white/90'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-pink-200">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/35 ${
                        isCurrent && isPlaying ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Disc3 className="h-5 w-5 animate-spin-slow text-white" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-base font-bold text-[#682643]">
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#9E5D77]">{track.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code text-[#A64D70]">
                    {track.duration}
                  </span>

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isCurrent && isPlaying
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-100 text-pink-600'
                    }`}
                  >
                    {isCurrent && isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 translate-x-0.5" />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Favorite Artists Tribute Section */}
      <div className="mt-14 w-full max-w-2xl rounded-3xl border border-pink-200/90 bg-white/80 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <Headphones className="h-5 w-5 text-pink-500" />
          <h3 className="font-cinzel text-lg font-bold text-[#682643]">
            Marie's Favorite Artists
          </h3>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[#93546D]">
          A personal collection inspired by the artists whose music she loves most.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {favorites.artists.map((artist) => (
            <div
              key={artist}
              className="flex flex-col items-center rounded-2xl border border-pink-100 bg-[#FFF5F8] p-4 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-pink-500">
                <Heart className="h-5 w-5 fill-pink-400 text-pink-400" />
              </div>
              <h5 className="mt-3 font-cinzel text-sm font-bold text-[#682643]">
                {artist}
              </h5>
              <span className="mt-1 text-[10px] uppercase tracking-wider text-[#A64D70]">
                Favorite Voice
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#874A62] font-serif italic">
          <Sparkles className="h-3.5 w-3.5 text-pink-400" />
          <span>Always bringing comfort through the headphones</span>
          <Sparkles className="h-3.5 w-3.5 text-pink-400" />
        </div>
      </div>

      {/* Story Chapter Navigation */}
      <StoryFooterNav
        currentChapter={5}
        totalChapters={7}
        onNext={onNext}
        onPrev={onPrev}
        nextChapterTitle="The Personal Letter"
        prevChapterTitle="Treasured Moments"
        nextButtonLabel="Tap here to continue"
      />
    </motion.div>
  );
}

export default Chapter5Music;
