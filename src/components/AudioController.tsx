// -----------------------------------------------------------------------------
// AudioController
// -----------------------------------------------------------------------------
// A small, honest music control for the entrance screen.
//
// Behavior:
//   - When no track is configured (our current state), renders a disabled
//     button showing "Music coming soon" — no fake playback.
//   - When a track IS configured, renders play/pause and mute/unmute icons.
//   - Never autoplays. All playback starts from a user click.
//   - Uses lucide-react icons only — no custom SVG.
// -----------------------------------------------------------------------------

import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { content } from '../data/content';
import { useAudioController } from '../hooks/useAudioController';

interface AudioControllerProps {
  /** Optional extra classes on the wrapper (for positioning). */
  className?: string;
}

export function AudioController({ className = '' }: AudioControllerProps) {
  const controls = useAudioController({
    track: content.audio.mainTrack,
    startMuted: content.audio.startMuted,
  });

  const { isPlaying, isMuted, isUnconfigured, hasError, toggle, toggleMute } =
    controls;

  // -------------------------------------------------------------------------
  // UNCONFIGURED — no real audio file yet
  // -------------------------------------------------------------------------
  // The brief is explicit: "use a placeholder state or an unconfigured
  // music control rather than fake playback." So we show a disabled control
  // with a small explanation, not a fake play button.
  // -------------------------------------------------------------------------
  if (isUnconfigured) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 backdrop-blur-sm ${className}`}
        title="Music coming soon"
        aria-label="Music not yet available"
      >
        <Music className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
        <span className="hidden sm:inline">Music coming soon</span>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ERRORED — a track is configured but the browser couldn't play it
  // -------------------------------------------------------------------------
  if (hasError) {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 backdrop-blur-sm ${className}`}
        title="Music unavailable"
        aria-label="Music unavailable"
      >
        <VolumeX className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
        <span className="hidden sm:inline">Music unavailable</span>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // READY — normal controls
  // -------------------------------------------------------------------------
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-slate-600/50 bg-slate-900/60 px-2 py-1 backdrop-blur-sm shadow-lg shadow-black/20 ${className}`}
      role="group"
      aria-label="Music controls"
    >
      <button
        type="button"
        onClick={toggle}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70"
        aria-label={isPlaying ? content.a11y.musicPauseLabel : content.a11y.musicPlayLabel}
        aria-pressed={isPlaying}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1px]" aria-hidden="true" />
        )}
      </button>

      <div
        className="h-4 w-px bg-slate-600/60"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={toggleMute}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-200 transition-colors hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70"
        aria-label={isMuted ? content.a11y.musicUnmuteLabel : content.a11y.musicMuteLabel}
        aria-pressed={isMuted}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default AudioController;