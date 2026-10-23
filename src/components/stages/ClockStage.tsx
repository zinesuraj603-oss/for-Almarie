import React, { useState } from 'react';
import { Key, Sparkles, CheckCircle2, ArrowRight, RotateCw, Compass } from 'lucide-react';
import { sounds } from '../../utils/audio';
import type { InventoryItem, ClueItem } from '../../types/game';

interface ClockStageProps {
  onClueDiscovered: (clue: ClueItem) => void;
  onItemCollected: (item: InventoryItem) => void;
  onComplete: () => void;
}

export const ClockStage: React.FC<ClockStageProps> = ({
  onClueDiscovered,
  onItemCollected,
  onComplete,
}) => {
  // Start at scrambled time: 08:45
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(45);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasCollectedStarChart, setHasCollectedStarChart] = useState(false);

  // Check if solved: 12:00 (or 00:00)
  const isMidnight = (hours === 12 || hours === 0) && minutes === 0;

  const adjustHours = (delta: number) => {
    sounds.playTick();
    setHours((prev) => {
      let next = (prev + delta) % 12;
      if (next <= 0) next += 12;
      checkUnlock(next, minutes);
      return next;
    });
  };

  const adjustMinutes = (delta: number) => {
    sounds.playTick();
    setMinutes((prev) => {
      let next = (prev + delta) % 60;
      if (next < 0) next += 60;
      checkUnlock(hours, next);
      return next;
    });
  };

  const setDirectMidnight = () => {
    sounds.playTick();
    setHours(12);
    setMinutes(0);
    checkUnlock(12, 0);
  };

  const checkUnlock = (h: number, m: number) => {
    if ((h === 12 || h === 0) && m === 0 && !isUnlocked) {
      setIsUnlocked(true);
      sounds.playMidnightBell();
      setTimeout(() => sounds.playUnlockSuccess(), 1200);

      onClueDiscovered({
        id: 'clock_midnight_struck',
        title: 'The Midnight Strike',
        description: 'The clock struck 12:00. The grandfather clock case clicked open, revealing an ancient celestial star chart of constellations!',
        discoveredAtStage: 'clock',
        icon: 'clock',
      });
    }
  };

  const handleCollectStarChart = () => {
    sounds.playClueFound();
    setHasCollectedStarChart(true);
    onItemCollected({
      id: 'star_chart',
      name: 'Celestial Star Map',
      description: 'An astrolabe map marking starry constellations, hiding a secret numeric cipher.',
      icon: 'star_chart',
      actionHint: 'Connect the birthday stars to unveil the cipher code.',
    });
  };

  // Clock Hand angles
  const minuteAngle = minutes * 6; // 360 deg / 60 min = 6 deg/min
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 360 deg / 12 hr = 30 deg/hr

  const romanNumerals = [
    { num: 'XII', angle: 0 },
    { num: 'I', angle: 30 },
    { num: 'II', angle: 60 },
    { num: 'III', angle: 90 },
    { num: 'IV', angle: 120 },
    { num: 'V', angle: 150 },
    { num: 'VI', angle: 180 },
    { num: 'VII', angle: 210 },
    { num: 'VIII', angle: 240 },
    { num: 'IX', angle: 270 },
    { num: 'X', angle: 300 },
    { num: 'XI', angle: 330 },
  ];

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-amber-900/30">
        <span className="text-xs uppercase font-mono-code text-amber-500 tracking-wider">
          TRIAL II OF IV &bull; THE CHRONOMETER
        </span>
        <h2 className="text-2xl font-cinzel font-bold text-amber-200">
          The Grandfather Clock Mechanism
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-serif italic mt-1">
          "When both shadows meet at midnight (12:00), the hidden compartment shall awaken."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Clock Graphic */}
        <div className="flex flex-col items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-[#2a1b10] via-[#1a110a] to-[#0a0704] border-8 border-[#996515] shadow-2xl shadow-black flex items-center justify-center">
            {/* Clock Face Bezel */}
            <div className="absolute inset-3 rounded-full border-2 border-amber-500/30 bg-[#f4ebd0] shadow-inner" />

            {/* Roman Numerals */}
            {romanNumerals.map(({ num, angle }) => {
              const rad = (angle - 90) * (Math.PI / 180);
              const r = 110; // radius from center
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);

              return (
                <div
                  key={num}
                  className="absolute font-cinzel font-bold text-sm sm:text-base text-[#382210] pointer-events-none select-none"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {num}
                </div>
              );
            })}

            {/* Hour Hand */}
            <div
              className="absolute w-2.5 h-20 bg-gradient-to-t from-slate-900 to-amber-950 rounded-full origin-bottom shadow-md pointer-events-none transition-transform duration-300"
              style={{
                bottom: '50%',
                transform: `rotate(${hourAngle}deg)`,
              }}
            />

            {/* Minute Hand */}
            <div
              className="absolute w-1.5 h-28 bg-gradient-to-t from-slate-900 to-amber-800 rounded-full origin-bottom shadow-md pointer-events-none transition-transform duration-300"
              style={{
                bottom: '50%',
                transform: `rotate(${minuteAngle}deg)`,
              }}
            />

            {/* Brass Center Cap */}
            <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-amber-700 border-2 border-amber-900 shadow-md z-10" />

            {/* Midnight Glow Aura if unlocked */}
            {isMidnight && (
              <div className="absolute inset-0 rounded-full border-4 border-amber-400 animate-ping opacity-25 pointer-events-none" />
            )}
          </div>

          {/* Current reading display */}
          <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 font-mono-code text-sm">
            Current Position: {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
          </div>
        </div>

        {/* Interactive Controls & Gears */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="font-cinzel font-bold text-amber-200 text-base flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" /> Winding Gears Control
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-xs uppercase font-mono-code text-slate-400 mb-1 block">
                  Hour Hand Adjustment:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => adjustHours(-1)}
                    disabled={isUnlocked}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-mono-code text-xs transition-all flex items-center justify-center gap-1"
                  >
                    -1 Hour
                  </button>
                  <button
                    onClick={() => adjustHours(1)}
                    disabled={isUnlocked}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-mono-code text-xs transition-all flex items-center justify-center gap-1"
                  >
                    +1 Hour
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase font-mono-code text-slate-400 mb-1 block">
                  Minute Hand Adjustment:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => adjustMinutes(-15)}
                    disabled={isUnlocked}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-mono-code text-xs transition-all flex items-center justify-center gap-1"
                  >
                    -15 Min
                  </button>
                  <button
                    onClick={() => adjustMinutes(15)}
                    disabled={isUnlocked}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 font-mono-code text-xs transition-all flex items-center justify-center gap-1"
                  >
                    +15 Min
                  </button>
                </div>
              </div>

              {/* Direct alignment shortcut */}
              <button
                onClick={setDirectMidnight}
                disabled={isUnlocked}
                className="w-full py-2.5 rounded-lg bg-amber-950/40 border border-amber-600/40 hover:bg-amber-900/40 disabled:opacity-50 text-amber-300 font-cinzel text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Turn Key Directly to 12:00 (Midnight)</span>
              </button>
            </div>
          </div>

          {/* Secret Compartment Unlocked */}
          {isUnlocked && (
            <div className="p-5 rounded-2xl bg-amber-950/30 border-2 border-amber-500/60 shadow-xl shadow-amber-950/60 space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center space-x-2 text-amber-300">
                <Sparkles className="w-5 h-5 text-amber-400 candle-glow" />
                <h4 className="font-cinzel font-bold text-sm tracking-wider">
                  SECRET GEAR COMPARTMENT OPENED!
                </h4>
              </div>

              <p className="text-xs text-slate-300 font-serif leading-relaxed">
                As the pendulum struck the midnight hour, the base of the clock popped open with a heavy brass resonance! Inside rests an illuminated Celestial Star Chart.
              </p>

              {!hasCollectedStarChart ? (
                <button
                  onClick={handleCollectStarChart}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold text-xs tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all hover:scale-[1.02]"
                >
                  <Compass className="w-4 h-4" />
                  <span>Retrieve Celestial Star Chart</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-emerald-300 text-xs flex items-center space-x-2 font-serif font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Star Chart acquired in your Satchel! Proceed to Chamber III.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Advance Button */}
      {hasCollectedStarChart && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => {
              sounds.playTick();
              onComplete();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold text-sm flex items-center space-x-2 shadow-lg shadow-amber-950/60 transition-all hover:scale-105"
          >
            <span>Proceed to Celestial Chamber</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
