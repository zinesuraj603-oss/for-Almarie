import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  Heart,
  Sparkles,
} from 'lucide-react';
import type { SongTrack } from '../types/content';

interface VinylPlayerProps {
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
  variant?: 'compact' | 'expanded';
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function VinylPlayer({
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
  variant = 'compact',
}: VinylPlayerProps) {
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  if (variant === 'compact') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-white/80 p-4 shadow-[0_10px_35px_rgba(236,72,153,0.12)] backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Mini Vinyl */}
          <div className="relative flex-shrink-0">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 4,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 shadow-md ring-2 ring-pink-200"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1 rounded-full border border-neutral-700/60" />
              <div className="absolute inset-2.5 rounded-full border border-neutral-800" />
              <div className="absolute inset-4 rounded-full border border-neutral-700/40" />

              {/* Center Album Art */}
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-7 w-7 rounded-full object-cover shadow-inner"
              />
              <div className="absolute h-2 w-2 rounded-full bg-white shadow-sm" />
            </motion.div>
          </div>

          {/* Info & Playback */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="truncate text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                  {currentTrack.artist}
                </p>
                <h4 className="truncate font-cinzel text-sm font-semibold text-[#632943]">
                  {currentTrack.title}
                </h4>
              </div>
              <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
            </div>

            {/* Scrubber */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] text-[#93546D]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                aria-label="Seek time"
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-pink-100 accent-pink-500"
              />
              <span className="text-[10px] text-[#93546D]">
                {formatTime(duration)}
              </span>
            </div>

            {/* Mini Controls */}
            <div className="mt-2.5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={onPrevTrack}
                aria-label="Previous track"
                className="text-[#93546D] transition hover:text-[#5B203B]"
              >
                <SkipBack className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onPlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-sm transition hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5 translate-x-0.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onNextTrack}
                aria-label="Next track"
                className="text-[#93546D] transition hover:text-[#5B203B]"
              >
                <SkipForward className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Expanded Vinyl Turntable Mode
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-pink-200/90 bg-gradient-to-b from-white/90 via-pink-50/70 to-white/90 p-6 shadow-[0_20px_60px_rgba(219,112,147,0.18)] backdrop-blur-xl sm:p-10">
      {/* Decorative Aura */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-300/25 blur-3xl" />

      {/* Header */}
      <div className="relative mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc3 className="h-5 w-5 text-pink-500 animate-spin-slow" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A64D70]">
            Vinyl Turntable Deck
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-pink-200/70 bg-white/70 px-3 py-1 text-xs text-[#874A62] shadow-sm">
          <Sparkles className="h-3 w-3 text-pink-400" />
          <span>Track {currentTrackIndex + 1} of {tracks.length}</span>
        </div>
      </div>

      {/* Main Turntable Stage */}
      <div className="relative flex flex-col items-center justify-center py-4">
        {/* Turntable Platter Base */}
        <div className="relative flex h-60 w-60 items-center justify-center rounded-full bg-gradient-to-tr from-pink-100 via-white to-pink-200 p-3 shadow-[0_15px_40px_rgba(200,90,135,0.25)] sm:h-72 sm:w-72">
          {/* Realistic Spinning Vinyl */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              duration: 3.5,
              repeat: isPlaying ? Infinity : 0,
              ease: 'linear',
            }}
            className="relative flex h-full w-full items-center justify-center rounded-full bg-neutral-950 shadow-2xl"
          >
            {/* Multiple Realistic Grooves */}
            <div className="absolute inset-2.5 rounded-full border border-neutral-800/80" />
            <div className="absolute inset-5 rounded-full border border-neutral-700/40" />
            <div className="absolute inset-8 rounded-full border border-neutral-800/90" />
            <div className="absolute inset-12 rounded-full border border-neutral-700/50" />
            <div className="absolute inset-16 rounded-full border border-neutral-800/70" />

            {/* Specular sheen on vinyl */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.18),transparent_60%)]" />

            {/* Center Label / Album Cover */}
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-[#1c181b] shadow-inner sm:h-28 sm:w-28">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-pink-900/10" />
              {/* Center Spindle Hole */}
              <div className="absolute h-4 w-4 rounded-full border-2 border-neutral-800 bg-white shadow-md" />
            </div>
          </motion.div>

          {/* Tonearm Needle */}
          <motion.div
            animate={{ rotate: isPlaying ? 16 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ transformOrigin: 'top right' }}
            className="pointer-events-none absolute -right-4 -top-3 z-20 h-40 w-16"
          >
            {/* Pivot */}
            <div className="absolute right-2 top-2 h-6 w-6 rounded-full border-2 border-pink-300 bg-gradient-to-br from-pink-200 to-rose-300 shadow-md" />
            {/* Metallic Arm */}
            <div className="absolute right-4 top-6 h-28 w-1 rounded-full bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 shadow-sm" />
            {/* Cartridge */}
            <div className="absolute bottom-4 right-2 h-5 w-4 rounded-sm bg-neutral-800 shadow" />
          </motion.div>
        </div>

        {/* Track Title and Artist */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A64D70]">
            {currentTrack.artist}
          </p>
          <h3 className="mt-1 font-cinzel text-2xl font-bold tracking-wide text-[#632943] sm:text-3xl">
            {currentTrack.title}
          </h3>
          <p className="mt-1 text-xs text-[#9E5D77] italic font-serif">
            A song that reminds me of your smile
          </p>
        </div>

        {/* Scrubber & Time */}
        <div className="mt-6 w-full max-w-md px-4">
          <div className="flex items-center gap-3">
            <span className="w-10 text-right text-xs font-medium text-[#93546D]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => onSeek(Number(e.target.value))}
              aria-label="Seek time"
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-pink-100 accent-pink-500 shadow-inner"
            />
            <span className="w-10 text-left text-xs font-medium text-[#93546D]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="mt-6 flex items-center justify-center gap-5 sm:gap-7">
          <button
            type="button"
            onClick={onPrevTrack}
            aria-label="Previous track"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-[#8C4662] shadow-sm transition hover:bg-pink-100/70 hover:scale-105 active:scale-95"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause track' : 'Play track'}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-400 text-white shadow-[0_8px_25px_rgba(244,114,182,0.45)] transition hover:scale-108 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 translate-x-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={onNextTrack}
            aria-label="Next track"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-[#8C4662] shadow-sm transition hover:bg-pink-100/70 hover:scale-105 active:scale-95"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}
            aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            className="text-[#93546D] transition hover:text-[#5F243B]"
          >
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            aria-label="Volume slider"
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-pink-100 accent-pink-500"
          />
        </div>
      </div>
    </div>
  );
}

export default VinylPlayer;
