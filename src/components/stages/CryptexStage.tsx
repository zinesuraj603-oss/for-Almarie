import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Lock, Unlock, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { sounds } from '../../utils/audio';
import type { ClueItem } from '../../types/game';

interface CryptexStageProps {
  targetWord: string;
  hasMedallion: boolean;
  onClueDiscovered: (clue: ClueItem) => void;
  onComplete: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const CryptexStage: React.FC<CryptexStageProps> = ({
  targetWord,
  hasMedallion,
  onClueDiscovered,
  onComplete,
}) => {
  const cleanTarget = targetWord.trim().toUpperCase();

  // Initialize tumblers with scrambled letters
  const [currentLetters, setCurrentLetters] = useState<string[]>(() => {
    // Generate initial scrambled letters distinct from target
    return cleanTarget.split('').map((char, index) => {
      const charCode = char.charCodeAt(0);
      const scrambledCode = ((charCode - 65 + index + 3) % 26) + 65;
      return String.fromCharCode(scrambledCode);
    });
  });

  const [isUnlocked, setIsUnlocked] = useState(false);

  const rotateUp = (index: number) => {
    if (isUnlocked) return;
    sounds.playDialClick();
    setCurrentLetters((prev) => {
      const next = [...prev];
      const curIndex = ALPHABET.indexOf(next[index]);
      const nextIndex = (curIndex + 1) % ALPHABET.length;
      next[index] = ALPHABET[nextIndex];
      checkSolution(next);
      return next;
    });
  };

  const rotateDown = (index: number) => {
    if (isUnlocked) return;
    sounds.playDialClick();
    setCurrentLetters((prev) => {
      const next = [...prev];
      const curIndex = ALPHABET.indexOf(next[index]);
      const nextIndex = (curIndex - 1 + ALPHABET.length) % ALPHABET.length;
      next[index] = ALPHABET[nextIndex];
      checkSolution(next);
      return next;
    });
  };

  const autoSolveWithMedallion = () => {
    sounds.playDialClick();
    const solution = cleanTarget.split('');
    setCurrentLetters(solution);
    triggerUnlock();
  };

  const checkSolution = (letters: string[]) => {
    if (letters.join('') === cleanTarget && !isUnlocked) {
      triggerUnlock();
    }
  };

  const triggerUnlock = () => {
    setIsUnlocked(true);
    sounds.playUnlockSuccess();
    onClueDiscovered({
      id: 'cryptex_opened',
      title: 'Cryptex Tumblers Aligned',
      description: `The tumblers clicked simultaneously to "${cleanTarget}". The heavy master vault latch disengaged!`,
      discoveredAtStage: 'cryptex',
      icon: 'unlock',
    });
  };

  // Keyboard support for convenience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      if (e.key === 'Enter') {
        if (currentLetters.join('') === cleanTarget) {
          setIsUnlocked(true);
          sounds.playUnlockSuccess();
          onClueDiscovered({
            id: 'cryptex_opened',
            title: 'Cryptex Tumblers Aligned',
            description: `The tumblers clicked simultaneously to "${cleanTarget}". The heavy master vault latch disengaged!`,
            discoveredAtStage: 'cryptex',
            icon: 'unlock',
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLetters, isUnlocked, cleanTarget, onClueDiscovered]);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-amber-900/30">
        <span className="text-xs uppercase font-mono-code text-amber-500 tracking-wider">
          FINAL TRIAL &bull; THE MASTER CRYPTEX
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-amber-200">
          The Vault of Midnight
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-serif italic mt-1">
          "Align each rotating brass cylinder to spell the secret word granted by the stars."
        </p>
      </div>

      {/* Cryptex Visual Device */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#1c1209] via-[#2a1b0e] to-[#120a05] border-4 border-[#b48d56] p-6 sm:p-10 shadow-2xl shadow-black overflow-hidden">
        {/* Brass rivets & metallic accents */}
        <div className="absolute top-3 left-4 flex space-x-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-300/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-300/60" />
        </div>
        <div className="absolute top-3 right-4 flex space-x-2 pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-300/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-amber-300/60" />
        </div>

        {/* Status Lock icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
              isUnlocked
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/40'
                : 'bg-amber-950/80 border-amber-600/70 text-amber-400'
            }`}
          >
            {isUnlocked ? <Unlock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
          </div>
        </div>

        {/* Alignment Indicator Line */}
        <div className="relative flex justify-center items-center py-4">
          <div className="absolute inset-x-0 h-16 bg-amber-500/10 border-y border-amber-400/40 pointer-events-none rounded-lg" />

          {/* Tumbler Rings */}
          <div className="relative z-10 flex flex-wrap justify-center gap-1.5 sm:gap-3">
            {currentLetters.map((letter, idx) => {
              const isMatch = cleanTarget[idx] === letter;

              return (
                <div key={idx} className="flex flex-col items-center space-y-1">
                  {/* Up button */}
                  <button
                    onClick={() => rotateUp(idx)}
                    disabled={isUnlocked}
                    className="p-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-800 hover:text-white disabled:opacity-40 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Letter Cylinder Tile */}
                  <div
                    className={`w-10 sm:w-14 h-14 sm:h-18 rounded-xl border-2 flex items-center justify-center font-cinzel font-black text-xl sm:text-2xl shadow-inner transition-all select-none ${
                      isUnlocked
                        ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 border-amber-200'
                        : isMatch
                        ? 'bg-gradient-to-b from-[#4a341e] to-[#261709] border-amber-500 text-amber-200 shadow-md shadow-amber-950'
                        : 'bg-gradient-to-b from-[#2e1d10] to-[#160c04] border-[#8a5d2b] text-amber-400/80'
                    }`}
                  >
                    {letter}
                  </div>

                  {/* Down button */}
                  <button
                    onClick={() => rotateDown(idx)}
                    disabled={isUnlocked}
                    className="p-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300 hover:bg-amber-800 hover:text-white disabled:opacity-40 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medallion Quick-Align Helper */}
        {hasMedallion && !isUnlocked && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={autoSolveWithMedallion}
              className="px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/50 hover:bg-amber-900/40 text-amber-300 text-xs font-serif italic flex items-center space-x-2 transition-all hover:scale-105"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Insert Astrolabe Medallion into central slot to align tumblers</span>
            </button>
          </div>
        )}
      </div>

      {/* Unlocked Vault Gate */}
      {isUnlocked && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-amber-950/80 to-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/20 space-y-4 animate-in fade-in duration-500 text-center sm:text-left">
          <div className="flex items-center space-x-3 text-amber-300">
            <Sparkles className="w-6 h-6 text-amber-400 candle-glow shrink-0" />
            <div>
              <h4 className="font-cinzel font-black text-lg text-amber-100">
                THE MIDNIGHT VAULT OPENS
              </h4>
              <p className="text-xs text-amber-300/80 font-serif">
                All tumblers locked into perfection! The heavy iron bolts slide back.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                sounds.playCelebrationFanfare();
                onComplete();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-black text-sm tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/30 transition-all hover:scale-105"
            >
              <span>Unlock Midnight Surprise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
