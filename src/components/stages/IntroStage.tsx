import React, { useState } from 'react';
import { Sparkles, Clock, Compass, Shield, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface IntroStageProps {
  recipientName: string;
  senderName: string;
  onBegin: () => void;
}

export const IntroStage: React.FC<IntroStageProps> = ({
  recipientName,
  senderName,
  onBegin,
}) => {
  const [isSealBroken, setIsSealBroken] = useState(false);

  const handleBreakSeal = () => {
    sounds.playUnlockSuccess();
    setIsSealBroken(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col items-center text-center">
      {/* Prologue Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-code mb-6">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
        <span>THE MIDNIGHT CALL &bull; 11:45 PM</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wider mb-4 leading-tight">
        The Midnight Birthday Mystery
      </h1>

      <p className="text-slate-300 text-base sm:text-lg font-serif italic max-w-lg mb-8 leading-relaxed">
        "A locked chest sits beneath the dim candlelight. The clock edges inexorably toward midnight. 
        Only the one whose name is written in the stars can break the seal..."
      </p>

      {/* Sealed Envelope Container */}
      <div className="w-full relative group">
        <div className="relative rounded-2xl bg-gradient-to-b from-[#2a1b12] to-[#18110b] border-2 border-amber-700/60 p-8 shadow-2xl shadow-black text-amber-100 overflow-hidden transition-all duration-300 hover:border-amber-500">
          {/* Subtle parchment watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-amber-400">
            <Compass className="w-64 h-64" />
          </div>

          {!isSealBroken ? (
            <div className="flex flex-col items-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-900/60 border border-amber-600/40 flex items-center justify-center text-amber-300">
                <Shield className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-mono-code tracking-widest text-amber-500">
                  CONFIDENTIAL INVITATION
                </span>
                <h3 className="text-2xl font-cinzel font-bold text-amber-200">
                  To: {recipientName}
                </h3>
                <p className="text-xs text-amber-300/70 font-serif">
                  From: {senderName}
                </p>
              </div>

              {/* Clickable Crimson Wax Seal */}
              <button
                onClick={handleBreakSeal}
                className="relative group/seal cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
                title="Click to break the crimson wax seal"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-700 via-red-800 to-red-950 border-4 border-red-900 flex flex-col items-center justify-center shadow-xl shadow-red-950/80 text-amber-200 candle-glow">
                  <Sparkles className="w-6 h-6 text-amber-300 mb-0.5" />
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider">
                    BREAK SEAL
                  </span>
                </div>
                <div className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping pointer-events-none" />
              </button>

              <p className="text-xs text-amber-400/60 font-serif italic">
                Tap the wax seal to unseal the mystery chamber
              </p>
            </div>
          ) : (
            <div className="space-y-6 py-4 animate-in fade-in duration-500">
              <div className="space-y-3">
                <span className="text-xs font-mono-code uppercase tracking-widest text-emerald-400">
                  SEAL BROKEN &bull; ENTRY GRANTED
                </span>
                <h3 className="text-2xl font-cinzel font-bold text-amber-100">
                  Dearest {recipientName},
                </h3>
                <p className="text-sm font-serif leading-relaxed text-amber-100/90 text-left bg-amber-950/30 p-4 rounded-xl border border-amber-900/40">
                  Another year has turned, and with it arrives a midnight trial designed solely for your keen mind. 
                  Locked inside our ancient chamber is the Grand Birthday Vault. 
                  Four trials of wit and curiosity stand between you and the secret prize waiting at midnight.
                  Grab your ultraviolet lamp, inspect the clues, and may good fortune guide your path!
                </p>
              </div>

              <button
                onClick={() => {
                  sounds.playTick();
                  onBegin();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold tracking-wider text-sm flex items-center justify-center space-x-2 shadow-lg shadow-amber-900/40 transition-all hover:shadow-amber-500/20 hover:scale-[1.01]"
              >
                <span>Enter The Chamber</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
