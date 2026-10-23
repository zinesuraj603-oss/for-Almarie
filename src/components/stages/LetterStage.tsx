import React, { useState, useRef } from 'react';
import { Sun, Eye, Key, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';
import type { InventoryItem, ClueItem } from '../../types/game';

interface LetterStageProps {
  recipientName: string;
  onClueDiscovered: (clue: ClueItem) => void;
  onItemCollected: (item: InventoryItem) => void;
  onComplete: () => void;
}

export const LetterStage: React.FC<LetterStageProps> = ({
  recipientName,
  onClueDiscovered,
  onItemCollected,
  onComplete,
}) => {
  const [isUvOn, setIsUvOn] = useState(false);
  const [flashlightPos, setFlashlightPos] = useState({ x: 50, y: 50 });
  const [hasRevealedSecret, setHasRevealedSecret] = useState(false);
  const [hasCollectedKey, setHasCollectedKey] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!letterRef.current) return;
    const rect = letterRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFlashlightPos({ x, y });

    // If UV is on and hovering over the hidden message zone
    if (isUvOn && y > 45 && y < 85 && x > 20 && x < 80 && !hasRevealedSecret) {
      triggerSecretReveal();
    }
  };

  const triggerSecretReveal = () => {
    setHasRevealedSecret(true);
    sounds.playClueFound();
    onClueDiscovered({
      id: 'uv_riddle_clue',
      title: 'Invisible UV Inscription',
      description: 'The hidden fluorescent ink directs: "When both clock hands align at 12:00, the secret gear unlocks."',
      discoveredAtStage: 'letter',
      icon: 'sparkles',
    });
  };

  const handleToggleUv = () => {
    sounds.playDialClick();
    const nextState = !isUvOn;
    setIsUvOn(nextState);
    if (nextState && !hasRevealedSecret) {
      setTimeout(() => triggerSecretReveal(), 1200);
    }
  };

  const handleCollectKey = () => {
    sounds.playUnlockSuccess();
    setHasCollectedKey(true);
    onItemCollected({
      id: 'clock_key',
      name: 'Antique Clock Winder',
      description: 'A heavy brass key with intricate filigree, designed to wind the grandfather clock mechanism.',
      icon: 'clock_key',
      actionHint: 'Use on the grandfather clock to align the hands.',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/30">
        <div>
          <span className="text-xs uppercase font-mono-code text-amber-500 tracking-wider">
            TRIAL I OF IV &bull; THE PARCHMENT & THE SHADOWS
          </span>
          <h2 className="text-2xl font-cinzel font-bold text-amber-200">
            The Faded Ink Manuscript
          </h2>
        </div>

        {/* UV Torch Control */}
        <button
          onClick={handleToggleUv}
          className={`px-4 py-2 rounded-xl border flex items-center space-x-2 transition-all font-sans text-xs font-semibold ${
            isUvOn
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-900/50'
              : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-200'
          }`}
        >
          <Sun className={`w-4 h-4 ${isUvOn ? 'text-cyan-400 animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isUvOn ? 'UV Blacklight: ON' : 'Turn On UV Blacklight'}</span>
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 font-serif italic">
        Hover or move your cursor across the letter with the UV Blacklight activated to illuminate invisible ink hidden by the sender.
      </p>

      {/* Interactive Parchment Letter */}
      <div
        ref={letterRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[420px] rounded-2xl bg-[#efe1c8] text-[#2c1d11] p-8 sm:p-12 shadow-2xl border-4 border-[#b48d56] select-none overflow-hidden cursor-crosshair transition-all"
        style={{
          boxShadow: 'inset 0 0 80px rgba(110, 68, 25, 0.4), 0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Parchment background texture effect */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-[radial-gradient(#8c5722_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Regular visible ink text */}
        <div className="relative z-10 space-y-6">
          <div className="flex justify-between items-start border-b border-[#8c5722]/30 pb-3">
            <div>
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-[#8c5722]">
                EST. MIDNIGHT ARCHIVE
              </span>
              <h3 className="text-xl font-cinzel font-bold text-[#3c2415]">
                A Whisper for {recipientName}
              </h3>
            </div>
            <span className="text-xs font-serif italic text-[#6a4220]">
              The Hour Approaches
            </span>
          </div>

          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#3a2517]">
            "Happy Birthday! If you are reading this, our midnight game has officially begun. 
            The grandfather clock in the corner ticks with quiet purpose. 
            Ordinary eyes see only blank parchment below, but true detectives carry an invisible light..."
          </p>

          {/* Area of the invisible message */}
          <div className="relative py-8 my-4 rounded-xl border border-dashed border-[#8c5722]/20 flex flex-col items-center justify-center min-h-[140px]">
            {/* The Invisible Glow Layer (only lit by UV) */}
            <div
              className={`transition-opacity duration-500 ${
                isUvOn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="text-center space-y-2"
                style={{
                  color: '#06b6d4',
                  textShadow: '0 0 12px rgba(6, 182, 212, 0.9), 0 0 25px rgba(168, 85, 247, 0.7)',
                }}
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-mono-code">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FLUORESCENT CIPHER REVEALED</span>
                </div>
                <h4 className="text-lg sm:text-xl font-cinzel font-bold tracking-wider">
                  "WHEN BOTH SHADOWS MEET UNDER MIDNIGHT SKIES (12:00), THE BRASS GEARS SHALL SING."
                </h4>
                <p className="text-xs font-mono-code text-cyan-200">
                  Target Time: Exactly 12:00 &bull; Take the key below to wind the hands
                </p>
              </div>
            </div>

            {!isUvOn && (
              <div className="text-xs text-[#8c5722]/50 italic font-serif flex items-center space-x-2">
                <Eye className="w-4 h-4 opacity-40" />
                <span>[Blank space — toggle UV light above to reveal hidden inscription]</span>
              </div>
            )}
          </div>

          {/* Hidden Brass Key Compartment (revealed when UV shows secret) */}
          {hasRevealedSecret && (
            <div className="pt-2 animate-in fade-in slide-in-from-bottom duration-500">
              {!hasCollectedKey ? (
                <div className="p-4 rounded-xl bg-amber-950/20 border-2 border-dashed border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-12 h-12 rounded-full bg-amber-700/30 border border-amber-600 flex items-center justify-center text-amber-800 candle-glow">
                      <Key className="w-6 h-6 text-amber-700" />
                    </div>
                    <div>
                      <h5 className="font-cinzel font-bold text-sm text-[#3a2517]">
                        Antique Brass Winder Key
                      </h5>
                      <p className="text-xs font-serif text-[#6a4220]">
                        Taped securely to the bottom seam of the parchment!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCollectKey}
                    className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-amber-100 font-cinzel font-bold text-xs tracking-wider flex items-center space-x-2 shadow-md transition-all hover:scale-105"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Take Clock Key</span>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-900/20 border border-emerald-700/50 flex items-center space-x-2 text-emerald-900 text-xs font-serif font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Antique Clock Winder Key added to your Satchel! Proceed to the Grandfather Clock.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* UV Spotlight overlay when torch is on */}
        {isUvOn && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-75"
            style={{
              background: `radial-gradient(circle 180px at ${flashlightPos.x}% ${flashlightPos.y}%, rgba(147, 51, 234, 0.45) 0%, rgba(6, 182, 212, 0.25) 40%, rgba(0, 0, 0, 0.8) 100%)`
            }}
          />
        )}
      </div>

      {/* Advance Button (unlocked once key is collected) */}
      {hasCollectedKey && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              sounds.playTick();
              onComplete();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold text-sm flex items-center space-x-2 shadow-lg shadow-amber-950/60 transition-all hover:scale-105"
          >
            <span>Approach Grandfather Clock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
