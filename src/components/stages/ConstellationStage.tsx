import React, { useState } from 'react';
import { Sparkles, Star, CheckCircle2, ArrowRight, RotateCcw, ShieldAlert } from 'lucide-react';
import { sounds } from '../../utils/audio';
import type { InventoryItem, ClueItem } from '../../types/game';

interface ConstellationStageProps {
  turningAge: number;
  recipientName: string;
  cryptexWord: string;
  onClueDiscovered: (clue: ClueItem) => void;
  onItemCollected: (item: InventoryItem) => void;
  onComplete: () => void;
}

interface StarNode {
  id: number;
  label: string;
  x: number;
  y: number;
  hint: string;
}

export const ConstellationStage: React.FC<ConstellationStageProps> = ({
  turningAge,
  recipientName,
  cryptexWord,
  onClueDiscovered,
  onItemCollected,
  onComplete,
}) => {
  // A 5-point celestial crown constellation representing the birthday royalty
  const starNodes: StarNode[] = [
    { id: 1, label: 'Alpha', x: 20, y: 70, hint: 'The Western Star' },
    { id: 2, label: 'Beta', x: 35, y: 30, hint: 'The Left Spire' },
    { id: 3, label: 'Zenith', x: 50, y: 18, hint: 'The Crown Zenith' },
    { id: 4, label: 'Delta', x: 65, y: 30, hint: 'The Right Spire' },
    { id: 5, label: 'Omega', x: 80, y: 70, hint: 'The Eastern Star' },
  ];

  const [connectedStarIds, setConnectedStarIds] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasCollectedMedallion, setHasCollectedMedallion] = useState(false);

  const handleStarClick = (starId: number) => {
    if (isCompleted) return;

    // Check if clicking in order or next in sequence
    const expectedNext = connectedStarIds.length + 1;
    if (starId === expectedNext) {
      sounds.playClueFound();
      const updated = [...connectedStarIds, starId];
      setConnectedStarIds(updated);

      if (updated.length === starNodes.length) {
        setIsCompleted(true);
        sounds.playUnlockSuccess();

        onClueDiscovered({
          id: 'constellation_solved',
          title: 'The Birthday Crown Constellation',
          description: `You traced the star crown honoring ${recipientName}'s milestone. The starlight illuminated the cryptex keyword: "${cryptexWord}"!`,
          discoveredAtStage: 'constellation',
          icon: 'star',
        });
      }
    } else if (!connectedStarIds.includes(starId)) {
      sounds.playDialClick();
      // Provide immediate soft feedback if clicked out of sequence
    }
  };

  const handleReset = () => {
    sounds.playTick();
    setConnectedStarIds([]);
    setIsCompleted(false);
  };

  const handleAutoConnect = () => {
    sounds.playClueFound();
    setConnectedStarIds([1, 2, 3, 4, 5]);
    setIsCompleted(true);
    sounds.playUnlockSuccess();

    onClueDiscovered({
      id: 'constellation_solved',
      title: 'The Birthday Crown Constellation',
      description: `You traced the star crown honoring ${recipientName}'s milestone. The starlight illuminated the cryptex keyword: "${cryptexWord}"!`,
      discoveredAtStage: 'constellation',
      icon: 'star',
    });
  };

  const handleCollectMedallion = () => {
    sounds.playClueFound();
    setHasCollectedMedallion(true);
    onItemCollected({
      id: 'medallion',
      name: 'Astrolabe Master Medallion',
      description: `An antique medallion glowing with celestial starlight, etched with the sacred cryptex password: "${cryptexWord}".`,
      icon: 'medallion',
      actionHint: `Input "${cryptexWord}" into the master cryptex tumblers.`,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/30">
        <div>
          <span className="text-xs uppercase font-mono-code text-indigo-400 tracking-wider">
            TRIAL III OF IV &bull; THE ASTRAL CHART
          </span>
          <h2 className="text-2xl font-cinzel font-bold text-amber-200">
            The Midnight Constellation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-serif italic mt-1">
            "Connect the five astral beacons in numerical order (1 through 5) to forge the Crown of {recipientName}."
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 font-mono-code flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Lines</span>
        </button>
      </div>

      {/* Interactive Celestial Canvas */}
      <div
        className="relative min-h-[380px] sm:min-h-[440px] rounded-2xl bg-gradient-to-b from-[#060814] via-[#0c0f26] to-[#04060e] border-2 border-indigo-900/60 shadow-2xl shadow-indigo-950/80 overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 100px rgba(79, 70, 229, 0.15)'
        }}
      >
        {/* Background Nebula & ambient stars */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-600/15 blur-3xl" />
          {/* Subtle star speckles */}
          {[12, 28, 45, 62, 78, 88, 15, 52, 94, 38].map((top, idx) => (
            <div
              key={idx}
              className="absolute w-1 h-1 rounded-full bg-white opacity-60 animate-pulse"
              style={{
                top: `${top}%`,
                left: `${(idx * 23) % 95}%`,
                animationDelay: `${idx * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* SVG Starlight connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connectedStarIds.map((starId, index) => {
            if (index === 0) return null;
            const prevStar = starNodes.find((s) => s.id === connectedStarIds[index - 1]);
            const currStar = starNodes.find((s) => s.id === starId);
            if (!prevStar || !currStar) return null;

            return (
              <line
                key={`line-${prevStar.id}-${currStar.id}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke={isCompleted ? '#f59e0b' : '#38bdf8'}
                strokeWidth={isCompleted ? '3' : '2'}
                strokeDasharray={isCompleted ? 'none' : '4 4'}
                className="transition-all duration-500"
                style={{
                  filter: isCompleted
                    ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))'
                    : 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.8))'
                }}
              />
            );
          })}

          {/* Base closure line when fully completed */}
          {isCompleted && (
            <line
              x1={`${starNodes[0].x}%`}
              y1={`${starNodes[0].y}%`}
              x2={`${starNodes[4].x}%`}
              y2={`${starNodes[4].y}%`}
              stroke="#f59e0b"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))' }}
            />
          )}
        </svg>

        {/* Interactive Star Beacons */}
        {starNodes.map((star) => {
          const isConnected = connectedStarIds.includes(star.id);
          const isNext = connectedStarIds.length + 1 === star.id;

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              disabled={isCompleted}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 focus:outline-none`}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              title={`Star ${star.id}: ${star.label}`}
            >
              {/* Star Node Visual */}
              <div
                className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                  isConnected
                    ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg shadow-amber-400/80 ring-4 ring-amber-400/40'
                    : isNext
                    ? 'bg-cyan-500 text-slate-950 animate-bounce ring-4 ring-cyan-400/50'
                    : 'bg-slate-900/90 border border-indigo-400/50 text-indigo-200 hover:scale-110 hover:border-cyan-400'
                }`}
              >
                <Star
                  className={`w-5 h-5 ${
                    isConnected ? 'fill-current text-slate-950' : 'text-current'
                  }`}
                />

                {/* Badge Number */}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 border border-amber-400 text-amber-300 font-mono-code font-bold text-[10px] flex items-center justify-center">
                  {star.id}
                </span>
              </div>

              {/* Label */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[11px] font-mono-code tracking-wider text-slate-300 whitespace-nowrap bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                {star.label}
              </span>
            </button>
          );
        })}

        {/* Status indicator on canvas */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-indigo-500/30 text-xs font-mono-code text-indigo-300">
            Connected Beacons: {connectedStarIds.length} / {starNodes.length}
          </div>
        </div>

        {/* Quick solve button for ease if desired */}
        {!isCompleted && (
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={handleAutoConnect}
              className="text-[11px] font-mono-code text-indigo-400/70 hover:text-indigo-200 underline"
            >
              Align Stars Automatically
            </button>
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-purple-950/60 to-slate-900 border-2 border-amber-500/70 shadow-2xl shadow-amber-950/70 space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center space-x-2 text-amber-300">
            <Sparkles className="w-5 h-5 text-amber-400 candle-glow" />
            <h4 className="font-cinzel font-bold text-base tracking-wider">
              THE CONSTELLATION HAS SPOKEN!
            </h4>
          </div>

          <p className="text-sm text-slate-200 font-serif leading-relaxed">
            The stars aligned to form the Crown of Year {turningAge}! Etched in radiant starlight across the heavens, the master password for the cryptex vault has materialized:
          </p>

          {/* Cipher Password Reveal Box */}
          <div className="p-4 rounded-xl bg-slate-950 border-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs uppercase font-mono-code text-amber-400 tracking-widest block">
                MASTER CRYPTEX CODEWORD
              </span>
              <span className="text-2xl sm:text-3xl font-cinzel font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                {cryptexWord}
              </span>
            </div>

            {!hasCollectedMedallion ? (
              <button
                onClick={handleCollectMedallion}
                className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-cinzel font-bold text-xs tracking-wider flex items-center space-x-2 shadow-md transition-all hover:scale-105"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Claim Astrolabe Medallion</span>
              </button>
            ) : (
              <div className="text-emerald-400 text-xs font-bold font-serif flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Medallion claimed!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advance Button */}
      {hasCollectedMedallion && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              sounds.playTick();
              onComplete();
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-cinzel font-bold text-sm flex items-center space-x-2 shadow-lg shadow-amber-950/60 transition-all hover:scale-105"
          >
            <span>Proceed to Master Cryptex</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
