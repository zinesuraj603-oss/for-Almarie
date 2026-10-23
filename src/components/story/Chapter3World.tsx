import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Flower2,
  Gamepad2,
  Headphones,
  Home,
  Dog,
  ShieldAlert,
  Disc3,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { siteContent } from '../../data/content';
import { StoryFooterNav } from './StoryFooterNav';
import type { SongTrack } from '../../types/content';

export interface Chapter3WorldProps {
  onNext: () => void;
  onPrev: () => void;
  tracks: SongTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function Chapter3World({
  onNext,
  onPrev,
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  onSeek,
}: Chapter3WorldProps) {
  const { recipient, favorites, wish, childhoodMemories } = siteContent;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-6"
    >
      {/* Chapter 3 Heading Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/80 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#A64D70] shadow-sm backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-pink-500" />
          <span>Page 3 · Her Little World & Favorites</span>
          <Sparkles className="h-3.5 w-3.5 text-pink-500" />
        </div>

        <h2 className="font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          Her Little World & Favorites
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#93546D] sm:text-base font-serif italic">
          “Every little detail that makes Marie who she is — her selfless wish,
          childhood memories, and all her favorite things.”
        </p>
      </div>

      {/* SECTION 1: KAWAII HERO COMPOSITION (Homage to Reference Image 2 & 3) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column (5 cols): Profile Info Card & Music Player Widget */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Card 1: Birthday Profile Card (Reference Image 2 Top-Left) */}
          <div className="relative overflow-hidden rounded-[32px] border border-pink-200/90 bg-white/90 p-6 shadow-[0_15px_45px_rgba(236,72,153,0.12)] backdrop-blur-md sm:p-7">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A64D70]">
                  Birthday
                </span>
                <div className="mt-1 font-cinzel text-3xl font-bold text-[#682643] sm:text-4xl">
                  19
                </div>
                <span className="text-xs font-semibold text-[#874A62]">
                  December 2026
                </span>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="rounded-full border border-pink-200 bg-pink-50/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A64D70]">
                  {recipient.personality}
                </span>
                <span className="rounded-full border border-pink-200/70 bg-[#FFF5F8] px-3 py-1 text-[10px] font-semibold text-[#823956]">
                  Role: {recipient.role}
                </span>
              </div>
            </div>

            {/* Aesthetic Progress Bar */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-pink-100">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />
              </div>
              <span className="text-[11px] font-semibold text-[#A64D70]">
                Special Day
              </span>
            </div>
          </div>

          {/* Card 2: Square Music Player Card (Reference Image 2 Left-Middle) */}
          <div className="relative overflow-hidden rounded-[32px] border border-pink-200/90 bg-white/90 p-5 shadow-[0_15px_45px_rgba(236,72,153,0.12)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Square Album Cover */}
              <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-2xl border border-pink-200 shadow-sm sm:h-20 sm:w-20">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="h-full w-full object-cover"
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/25 ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Disc3 className="h-6 w-6 animate-spin-slow text-white" />
                </div>
              </div>

              {/* Track Details & Scrubber */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                    {currentTrack.artist}
                  </span>
                  <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
                </div>

                <h4 className="truncate font-cinzel text-base font-bold text-[#682643]">
                  {currentTrack.title}
                </h4>

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
                    aria-label="Seek track position"
                    className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-pink-100 accent-pink-500"
                  />
                  <span className="text-[10px] text-[#93546D]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Controls */}
                <div className="mt-2 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={onPrevTrack}
                    aria-label="Previous song"
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
                    aria-label="Next song"
                    className="text-[#93546D] transition hover:text-[#5B203B]"
                  >
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Playful Hero Poster & Big Wish Highlight */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Main Hero Card (Homage to Image 2 "let's be friends" composition) */}
          <div className="relative overflow-hidden rounded-[36px] border border-pink-300/80 bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFE8EF] p-7 shadow-[0_20px_50px_rgba(244,114,182,0.22)] sm:p-9">
            {/* Shimmering Aura Circles */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink-300/35 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-rose-200/30 blur-3xl" />

            <div className="relative z-10 flex flex-col items-start">
              {/* Top Tag */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#A64D70] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                <span>{recipient.nationality} · Birthday Sanctuary</span>
              </div>

              {/* Playful Stylized Big Kawaii Typography (Image 2 style) */}
              <div className="mt-4 select-none font-cinzel text-4xl font-bold leading-[1.05] tracking-tight text-[#682643] sm:text-5xl md:text-6xl">
                happy +<br />
                <span className="text-[#a64d70]">birthday</span><br />
                babu
              </div>

              {/* Kaoruko Waguri Style Profile Tag Card (Image 2 center card) */}
              <div className="mt-6 w-full rounded-2xl border border-pink-200/90 bg-white/95 p-4 shadow-sm backdrop-blur-md sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={recipient.avatar}
                      alt={recipient.name}
                      className="h-14 w-14 rounded-2xl border border-pink-300 object-cover shadow-sm"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow">
                      <Heart className="h-2.5 w-2.5 fill-white text-white" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#682643]">
                      + Marie (Penguin) +
                    </h3>
                    <p className="font-serif text-xs italic text-[#874A62]">
                      “just a girl who loves sweet things, music, gaming, tulips, and home.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Her Selfless Wish Card (Golden Tribute) */}
          <div className="relative overflow-hidden rounded-[32px] border border-amber-200/80 bg-gradient-to-br from-[#FFFBF0] via-white to-[#FFF7ED] p-6 shadow-[0_15px_40px_rgba(245,158,11,0.12)] sm:p-7">
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                {wish.title}
              </span>
            </div>

            <h3 className="mt-3 font-cinzel text-xl font-bold leading-snug text-[#5C3214] sm:text-2xl">
              "{wish.description}"
            </h3>

            <p className="mt-2.5 font-serif text-sm italic leading-relaxed text-[#85532A]">
              {wish.reflection}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-700">
              <Heart className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Dedicated with endless respect by Suraj</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: HER LITTLE WORLD & FAVORITES BENTO GRID */}
      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A64D70]">
              All The Little Details
            </span>
            <h3 className="font-cinzel text-2xl font-bold text-[#682643] sm:text-3xl">
              Her Favorites Bento
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Favorite Color (Blue-Black) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Favorite Color
              </span>
              <span className="h-5 w-5 rounded-full border border-slate-700 bg-[#0f172a] shadow-inner" />
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#0f172a]">
              {favorites.colorName}
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Midnight indigo and deep obsidian — calm, deep, and elegant like her.
            </p>
          </div>

          {/* 2. Favorite Flower (Tulips) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Favorite Flower
              </span>
              <Flower2 className="h-5 w-5 text-rose-500" />
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#682643]">
              {favorites.flower}
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Symbol of pure grace and quiet perfection in every shade.
            </p>
          </div>

          {/* 3. Favorite Place (Home) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Favorite Place
              </span>
              <Home className="h-5 w-5 text-purple-500" />
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#682643]">
              {favorites.place}
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Her peaceful sanctuary where comfort, safety, and cozy naps reside.
            </p>
          </div>

          {/* 4. Favorite Pet (Dog) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Favorite Pet
              </span>
              <Dog className="h-5 w-5 text-amber-500" />
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#682643]">
              {favorites.pet}s
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Loyal companions with warm snuggles, gentle hearts, and wagging tails.
            </p>
          </div>

          {/* 5. Passions (Music & Gaming) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Passions & Hobbies
              </span>
              <div className="flex gap-2">
                <Headphones className="h-4 w-4 text-pink-500" />
                <Gamepad2 className="h-4 w-4 text-pink-500" />
              </div>
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#682643]">
              Music & Gaming
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Getting lost in soundtracks, exploring game worlds, and sharing funny voice clips.
            </p>
          </div>

          {/* 6. Favorite Artists (Evan Lee, Jungkook, V) */}
          <div className="rounded-3xl border border-pink-200/80 bg-white/85 p-5 shadow-sm transition hover:shadow-md sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A64D70]">
                Favorite Artists
              </span>
              <Disc3 className="h-4 w-4 text-pink-500" />
            </div>
            <h4 className="mt-3 font-cinzel text-lg font-bold text-[#682643]">
              {favorites.artists.join(' · ')}
            </h4>
            <p className="mt-1 text-xs text-[#874A62]">
              Incredible soulful vocals, timeless aesthetics, and deeply comforting melodies.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: CHILDHOOD STORIES */}
      <div className="mt-14">
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A64D70]">
            Unforgettable Memories
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-[#682643] sm:text-3xl">
            Childhood Tales
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {childhoodMemories.map((mem) => (
            <div
              key={mem.id}
              className="relative overflow-hidden rounded-3xl border border-pink-200/80 bg-white/85 p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A64D70]">
                  {mem.tag}
                </span>
                {mem.id === 'glass-throw' ? (
                  <ShieldAlert className="h-4 w-4 text-rose-500" />
                ) : (
                  <Heart className="h-4 w-4 text-pink-500" />
                )}
              </div>

              <h4 className="mt-4 font-cinzel text-lg font-bold text-[#682643]">
                {mem.title}
              </h4>

              <p className="mt-2 font-serif text-sm italic leading-relaxed text-[#874A62]">
                "{mem.description}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: ABOUT HER TAGS */}
      <div className="mt-12 rounded-[32px] border border-pink-200/80 bg-white/85 p-6 shadow-sm">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A64D70]">
          About Her
        </span>
        <p className="mt-2 font-serif text-xs italic text-[#874A62] leading-relaxed">
          “i daydream a lot and believe in small beautiful moments.”
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            'Music',
            'Gaming',
            'Tulips',
            'Blue-Black',
            'Dogs',
            'Home',
            'Marie Gold Biscuit',
            'Penguin',
            'Proud Filipina',
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-pink-200 bg-pink-50/80 px-3.5 py-1 text-xs font-semibold text-[#874A62]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Story Chapter Navigation */}
      <StoryFooterNav
        currentChapter={3}
        totalChapters={7}
        onNext={onNext}
        onPrev={onPrev}
        nextChapterTitle="Treasured Moments"
        prevChapterTitle="Babu Bear"
        nextButtonLabel="Tap here to continue"
      />
    </motion.div>
  );
}

export default Chapter3World;
