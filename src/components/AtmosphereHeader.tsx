import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, BookOpen, Briefcase, Settings, Sparkles, Clock as ClockIcon, Music } from 'lucide-react';
import { sounds } from '../utils/audio';
import type { StageId } from '../types/game';

interface AtmosphereHeaderProps {
  currentStage: StageId;
  totalClues: number;
  inventoryCount: number;
  onOpenNotebook: () => void;
  onOpenInventory: () => void;
  onOpenSettings: () => void;
  recipientName: string;
}

export const AtmosphereHeader: React.FC<AtmosphereHeaderProps> = ({
  currentStage,
  totalClues,
  inventoryCount,
  onOpenNotebook,
  onOpenInventory,
  onOpenSettings,
  recipientName,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.isMuted);
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('00:00:00');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Countdown towards midnight tonight
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeRemaining(
        `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playTick();
    }
  };

  const handleAmbientToggle = () => {
    const active = sounds.toggleAmbient();
    setIsAmbientOn(active);
    sounds.playTick();
  };

  const getStageTitle = (stage: StageId) => {
    switch (stage) {
      case 'intro': return 'Prologue: The Midnight Invitation';
      case 'letter': return 'Chamber I: The UV Blacklight Letter';
      case 'clock': return 'Chamber II: The Grandfather Clock';
      case 'constellation': return 'Chamber III: Celestial Star Chart';
      case 'cryptex': return 'Chamber IV: The Master Cryptex';
      case 'vault': return 'Sanctum: The Midnight Vault';
      case 'celebration': return 'Finale: Midnight Strikes!';
      default: return 'The Mystery';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-amber-900/30 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/30 to-purple-800/40 border border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-950/40">
            <Sparkles className="w-5 h-5 text-amber-400 candle-glow" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-cinzel font-bold text-amber-200 tracking-wider flex items-center gap-2">
              Midnight Birthday Mystery
            </h1>
            <p className="text-xs text-amber-400/70 font-serif italic">
              {getStageTitle(currentStage)} &bull; For {recipientName}
            </p>
          </div>
        </div>

        {/* Center: Countdown clock to Midnight */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 px-3 py-1.5 rounded-full shadow-inner shadow-black">
          <ClockIcon className="w-4 h-4 text-amber-400 pulse-clock" />
          <span className="text-xs text-amber-300 font-mono-code font-semibold tracking-widest">
            {timeRemaining}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">TO MIDNIGHT</span>
        </div>

        {/* Right: Sound Controls & Detective Tools */}
        <div className="flex items-center space-x-2">
          {/* Ambient Music Toggle */}
          <button
            onClick={handleAmbientToggle}
            title={isAmbientOn ? 'Stop Ambient Tone' : 'Play Ambient Mystery Drone'}
            className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              isAmbientOn
                ? 'bg-purple-900/50 border-purple-500 text-purple-200 shadow-md shadow-purple-950'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-amber-200 hover:border-slate-600'
            }`}
          >
            <Music className="w-4 h-4" />
            <span className="hidden md:inline text-[11px] font-sans">
              {isAmbientOn ? 'Ambient On' : 'Ambient'}
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleMuteToggle}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-400 hover:text-amber-200 hover:border-slate-600 transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Clues Notebook Button */}
          <button
            onClick={() => {
              sounds.playTick();
              onOpenNotebook();
            }}
            className="relative px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-600/40 hover:border-amber-500 text-amber-200 hover:bg-amber-900/40 transition-all flex items-center space-x-1.5"
            title="Open Detective Journal"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif hidden sm:inline">Journal</span>
            {totalClues > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center ml-1">
                {totalClues}
              </span>
            )}
          </button>

          {/* Inventory Bag Button */}
          <button
            onClick={() => {
              sounds.playTick();
              onOpenInventory();
            }}
            className="relative px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-amber-500/60 text-slate-200 hover:text-amber-200 transition-all flex items-center space-x-1.5"
            title="Open Inventory"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif hidden sm:inline">Satchel</span>
            {inventoryCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center ml-1">
                {inventoryCount}
              </span>
            )}
          </button>

          {/* Settings / Customize Modal */}
          <button
            onClick={() => {
              sounds.playTick();
              onOpenSettings();
            }}
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 text-slate-400 hover:text-amber-200 hover:border-amber-500/50 transition-all"
            title="Customize Birthday Person & Message"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
