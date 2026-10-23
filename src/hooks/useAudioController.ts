// -----------------------------------------------------------------------------
// useAudioController
// -----------------------------------------------------------------------------
// A single shared audio controller for the whole experience.
//
// Design rules (from the project brief):
//   - One audio element per track, owned by this hook, not by chapters.
//   - Never autoplay. Playback requires an explicit user action.
//   - If no `src` is configured, return `isUnconfigured: true` and no-op
//     controls. The UI must render a disabled state, not fake playback.
//   - If playback fails, set `hasError: true` and keep the rest of the app
//     fully functional.
//   - Mute state is independent of play state.
//   - The audio element lives in a ref and is torn down on unmount.
// -----------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AudioControls, AudioTrack } from '../types/content';

interface UseAudioControllerOptions {
  /** The track to load. If `src` is empty, the controller reports unconfigured. */
  track: AudioTrack;

  /** Whether the controller should start muted. */
  startMuted?: boolean;

  /** Loop the track. Defaults to true (background music). */
  loop?: boolean;

  /** Volume between 0 and 1. Defaults to 0.7. */
  volume?: number;
}

export function useAudioController({
  track,
  startMuted = false,
  loop = true,
  volume = 0.7,
}: UseAudioControllerOptions): AudioControls {
  // -------------------------------------------------------------------------
  // Derived state: is a real source configured?
  // -------------------------------------------------------------------------
  const isUnconfigured = !track?.src || track.src.trim().length === 0;

  // -------------------------------------------------------------------------
  // Refs — the audio element and its lifecycle
  // -------------------------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // -------------------------------------------------------------------------
  // React state exposed to the UI
  // -------------------------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(startMuted);
  const [hasError, setHasError] = useState(false);

  // -------------------------------------------------------------------------
  // Create / destroy the audio element when `track.src` changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    // No source → no element, no listeners, no errors.
    if (isUnconfigured) {
      setIsPlaying(false);
      setHasError(false);
      return;
    }

    const audio = new Audio();
    audio.src = track.src;
    audio.loop = loop;
    audio.volume = volume;
    audio.muted = startMuted;
    audio.preload = 'metadata';

    // Keep local ref in sync so toggle() can reach it.
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // If the browser fires an error before we even get to play (e.g., 404),
    // catch it once loading metadata is done.
    const handleCanPlay = () => setHasError(false);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);

      // Fully release the element.
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.src, isUnconfigured, loop, volume]);

  // -------------------------------------------------------------------------
  // Keep mute state in sync with the element
  // -------------------------------------------------------------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = isMuted;
  }, [isMuted]);

  // -------------------------------------------------------------------------
  // Public controls
  // -------------------------------------------------------------------------
  const toggle = useCallback(() => {
    const audio = audioRef.current;

    // Unconfigured or errored → do nothing. UI should already be disabled.
    if (!audio || isUnconfigured || hasError) return;

    if (audio.paused) {
      const playPromise = audio.play();
      // Modern browsers return a promise from play(). Handle rejections
      // gracefully — e.g., if the user gesture requirement was not met.
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isUnconfigured, hasError]);

  const toggleMute = useCallback(() => {
    if (isUnconfigured) return;
    setIsMuted((prev) => !prev);
  }, [isUnconfigured]);

  return {
    isPlaying,
    isMuted,
    isUnconfigured,
    hasError,
    toggle,
    toggleMute,
  };
}