import React, { useState } from 'react';
import { X, BookOpen, Key, HelpCircle, Sparkles } from 'lucide-react';
import type { ClueItem } from '../types/game';
import { sounds } from '../utils/audio';

interface DetectiveNotebookProps {
  isOpen: boolean;
  onClose: () => void;
  clues: ClueItem[];
  currentHint: string;
  onRevealHintSolution?: () => void;
}

export const DetectiveNotebook: React.FC<DetectiveNotebookProps> = ({
  isOpen,
  onClose,
  clues,
  currentHint,
}) => {
  const [hintLevel, setHintLevel] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl bg-[#14121d] border-2 border-amber-800/60 shadow-2xl shadow-amber-950/80 text-amber-100 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.1), transparent 60%)'
        }}
      >
        {/* Header with leather journal look */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/40 bg-amber-950/20">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-cinzel font-bold tracking-wide text-amber-200">
              Detective's Field Journal
            </h2>
          </div>
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-amber-400/60 hover:text-amber-200 hover:bg-amber-900/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Active Hint / Guide Assistance */}
          <div className="rounded-xl border border-amber-700/40 bg-amber-950/30 p-4 relative overflow-hidden">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel font-bold text-amber-300 text-xs tracking-wider uppercase">
                    Detective's Intuition (Hint)
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[1, 2].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => {
                          sounds.playTick();
                          setHintLevel(lvl);
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono-code transition-all ${
                          hintLevel >= lvl 
                            ? 'bg-amber-500 text-slate-950 font-bold' 
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Level {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="font-serif italic text-amber-100/90 leading-relaxed">
                  {hintLevel === 1 ? currentHint : "Follow the trail closely: examine every corner, adjust mechanisms until they chime, and keep note of numbers and letters."}
                </p>
              </div>
            </div>
          </div>

          {/* Logged Clues */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-xs uppercase tracking-widest text-amber-400/80 font-bold flex items-center gap-2">
              <Key className="w-3.5 h-3.5" /> Discovered Clues & Intel ({clues.length})
            </h3>

            {clues.length === 0 ? (
              <div className="text-center py-8 text-amber-300/40 italic font-serif">
                No clues recorded yet. Explore the room and inspect objects to record findings!
              </div>
            ) : (
              <div className="space-y-3">
                {clues.map((clue) => (
                  <div
                    key={clue.id}
                    className="p-3.5 rounded-xl border border-amber-900/40 bg-slate-900/60 hover:bg-slate-900/90 transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-semibold text-amber-200 text-sm">
                          {clue.title}
                        </span>
                        <span className="text-[10px] text-amber-400/60 uppercase font-mono-code">
                          {clue.discoveredAtStage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 font-serif mt-1">
                        {clue.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-amber-900/40 bg-slate-950/60 flex justify-between items-center text-xs text-amber-400/70 font-serif">
          <span>The truth unravels with patience.</span>
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-all font-sans"
          >
            Close Journal
          </button>
        </div>
      </div>
    </div>
  );
};
