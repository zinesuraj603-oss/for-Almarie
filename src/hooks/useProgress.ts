// -----------------------------------------------------------------------------
// useProgress
// -----------------------------------------------------------------------------
// Manages and persists Marie's progress through the Mystery Chapters.
// Saves to localStorage so a page refresh doesn't lose her place.
// -----------------------------------------------------------------------------

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'midnight-mystery-progress';
const CURRENT_VERSION = 1;

export interface ProgressState {
  currentChapter: number;
  maxUnlockedChapter: number;
  discoveredStars: string[];
}

const DEFAULT_STATE: ProgressState = {
  currentChapter: 1,
  maxUnlockedChapter: 1,
  discoveredStars: [],
};

interface StoredData extends ProgressState {
  version: number;
}

export function useProgress() {
  // -------------------------------------------------------------------------
  // 1. Initialize state (safely reading from localStorage)
  // -------------------------------------------------------------------------
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_STATE;

      const parsed = JSON.parse(stored) as StoredData;

      // If the version mismatch, wipe it and start fresh
      if (parsed.version !== CURRENT_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_STATE;
      }

      return {
        currentChapter: parsed.currentChapter ?? DEFAULT_STATE.currentChapter,
        maxUnlockedChapter: parsed.maxUnlockedChapter ?? DEFAULT_STATE.maxUnlockedChapter,
        discoveredStars: parsed.discoveredStars ?? DEFAULT_STATE.discoveredStars,
      };
    } catch (error) {
      // localStorage might be disabled or data might be corrupted
      console.warn('Failed to load progress from localStorage', error);
      return DEFAULT_STATE;
    }
  });

  // -------------------------------------------------------------------------
  // 2. Persist to localStorage whenever progress changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    try {
      const dataToStore: StoredData = {
        ...progress,
        version: CURRENT_VERSION,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      // Ignore write errors (e.g., storage full or private mode)
      console.warn('Failed to save progress to localStorage', error);
    }
  }, [progress]);

  // -------------------------------------------------------------------------
  // 3. Public API methods
  // -------------------------------------------------------------------------

  /**
   * Advances to a specific chapter. 
   * Also updates maxUnlockedChapter so she can't skip ahead.
   */
  const unlockChapter = useCallback((chapter: number) => {
    setProgress((prev) => {
      const nextMax = Math.max(prev.maxUnlockedChapter, chapter);
      return {
        ...prev,
        currentChapter: chapter,
        maxUnlockedChapter: nextMax,
      };
    });
  }, []);

  /**
   * Sets the current chapter (e.g., when clicking "Back" or "Continue").
   * Does not unlock new chapters.
   */
  const goToChapter = useCallback((chapter: number) => {
    setProgress((prev) => {
      // Prevent navigating to a chapter that isn't unlocked yet
      if (chapter > prev.maxUnlockedChapter) return prev;
      
      return {
        ...prev,
        currentChapter: chapter,
      };
    });
  }, []);

  /**
   * Records a discovered hidden star.
   */
  const discoverStar = useCallback((starId: string) => {
    setProgress((prev) => {
      if (prev.discoveredStars.includes(starId)) return prev; // Already found
      
      return {
        ...prev,
        discoveredStars: [...prev.discoveredStars, starId],
      };
    });
  }, []);

  /**
   * Resets all progress back to Chapter 1.
   * Useful for testing or a "Restart" button later.
   */
  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    progress,
    unlockChapter,
    goToChapter,
    discoverStar,
    resetProgress,
  };
}