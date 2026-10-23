
import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, VolumeX } from 'lucide-react';

interface PageSongProps {
  src: string;
  title: string;
}

export default function PageSong({ src, title }: PageSongProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let active = true;

    audio.play()
      .then(() => {
        if (active) {
          setIsPlaying(true);
          setBlocked(false);
        }
      })
      .catch(() => {
        if (active) setBlocked(true);
      });

    return () => {
      active = false;
      audio.pause();
      audio.currentTime = 0;
    };
  }, [src]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setBlocked(false);
      setHasError(false);
    } catch {
      setIsPlaying(false);
      setHasError(true);
    }
  }

  return (
    <div className="fixed right-4 top-4 z-50 sm:right-7 sm:top-7">
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      <button
        type="button"
        onClick={togglePlayback}
        className="flex items-center gap-2 rounded-full border border-pink-200/40 bg-[#3b1836]/90 px-4 py-2.5 text-sm text-white shadow-lg backdrop-blur-md transition hover:bg-[#57224d] focus:outline-none focus:ring-2 focus:ring-pink-300"
        aria-label={
          isPlaying ? `Pause ${title}` : `Play ${title}`
        }
      >
        {hasError ? (
          <VolumeX size={17} />
        ) : isPlaying ? (
          <Pause size={17} />
        ) : (
          <Play size={17} />
        )}

        <Music size={16} />

        <span>
          {hasError
            ? 'Audio unavailable'
            : isPlaying
              ? title
              : blocked
                ? `Play ${title}`
                : `Play ${title}`}
        </span>
      </button>
    </div>
  );
}
