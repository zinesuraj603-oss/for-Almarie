import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart, Share2, Flame, RefreshCw, Check } from 'lucide-react';
import { sounds } from '../../utils/audio';
import type { MysteryConfig } from '../../types/game';

interface CelebrationStageProps {
  config: MysteryConfig;
  onResetGame: () => void;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({
  config,
  onResetGame,
}) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isGiftRevealed, setIsGiftRevealed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Trigger grand fireworks and confetti bursts upon opening
  useEffect(() => {
    sounds.playCelebrationFanfare();

    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleBlowCandles = () => {
    sounds.playUnlockSuccess();
    setCandlesLit(false);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7'],
    });
  };

  const handleRevealGift = () => {
    sounds.playClueFound();
    setIsGiftRevealed(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleShareLink = () => {
    sounds.playTick();
    const url = new URL(window.location.href);
    url.searchParams.set('name', config.recipientName);
    url.searchParams.set('age', String(config.turningAge));
    url.searchParams.set('sender', config.senderName);
    if (config.surpriseGift) {
      url.searchParams.set('gift', encodeURIComponent(config.surpriseGift));
    }
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8 text-center animate-in fade-in duration-700">
      {/* Top Banner */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-pink-500/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-cinzel font-bold">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
        <span>MIDNIGHT HAS STRUCK &bull; THE VAULT UNLOCKED</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-pink-300 tracking-wider">
          HAPPY BIRTHDAY, {config.recipientName.toUpperCase()}!
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-amber-200/90 max-w-xl mx-auto">
          "The stars have aligned, the riddles solved, and another magnificent year begins!"
        </p>
      </div>

      {/* Interactive Birthday Cake with Candles */}
      <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-900/80 border-2 border-amber-500/40 shadow-2xl shadow-amber-950/60 flex flex-col items-center">
        {/* Floating candle flames */}
        <div className="flex justify-center space-x-4 mb-2">
          {[1, 2, 3].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center">
              {candlesLit ? (
                <div className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-pulse candle-glow shadow-lg shadow-amber-400/80 mb-1" />
              ) : (
                <div className="w-1.5 h-4 bg-slate-500 rounded-full mb-1 opacity-60" />
              )}
              {/* Candle Body */}
              <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-amber-200 to-amber-500 border border-amber-600" />
            </div>
          ))}
        </div>

        {/* Cake Tiers */}
        <div className="w-44 h-12 rounded-t-2xl bg-gradient-to-r from-pink-800 via-pink-700 to-pink-800 border-t-4 border-pink-400 flex items-center justify-center text-pink-200 text-xs font-cinzel font-bold shadow-md">
          Level {config.turningAge} Unlocked
        </div>
        <div className="w-56 h-16 rounded-b-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 border-4 border-amber-600/80 flex items-center justify-center text-amber-200 font-cinzel font-black text-sm shadow-xl">
          {config.turningAge} Glorious Years
        </div>

        {/* Cake Plate */}
        <div className="w-64 h-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-lg mt-1" />

        {/* Blow out button */}
        <div className="mt-6">
          {candlesLit ? (
            <button
              onClick={handleBlowCandles}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-cinzel font-bold text-xs tracking-wider flex items-center space-x-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
            >
              <Flame className="w-4 h-4 text-slate-950" />
              <span>Make a Wish & Blow Out Candles!</span>
            </button>
          ) : (
            <div className="text-amber-300 font-serif italic text-sm animate-in fade-in">
              Your midnight birthday wish has been released into the cosmos.
            </div>
          )}
        </div>
      </div>

      {/* Heartfelt Letter From Sender */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#22170f] via-[#2c1d12] to-[#1a100a] border-2 border-[#b48d56] p-8 sm:p-12 shadow-2xl text-left text-amber-100 space-y-6">
        <div className="flex justify-between items-center border-b border-amber-700/40 pb-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
            <h3 className="text-xl font-cinzel font-bold text-amber-200">
              A Personal Midnight Message
            </h3>
          </div>
          <span className="text-xs font-mono-code text-amber-400/80">
            {config.birthdayDate}
          </span>
        </div>

        <div className="font-serif text-base sm:text-lg leading-relaxed text-amber-100/95 space-y-4">
          <p>
            Dearest <span className="font-bold text-amber-300">{config.recipientName}</span>,
          </p>
          <p className="whitespace-pre-line leading-relaxed">
            {config.customMessage}
          </p>
          <div className="pt-4 text-right">
            <p className="text-sm italic text-amber-300/80">With all my love and midnight magic,</p>
            <p className="font-cinzel font-bold text-lg text-amber-200">{config.senderName}</p>
          </div>
        </div>
      </div>

      {/* Surprise Gift Reveal Box */}
      {config.surpriseGift && (
        <div className="rounded-3xl bg-slate-900/90 border-2 border-purple-500/50 p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            <Gift className="w-6 h-6 text-purple-400 animate-bounce" />
            <h3 className="text-xl font-cinzel font-bold text-purple-100">
              The Grand Mystery Prize
            </h3>
          </div>

          {!isGiftRevealed ? (
            <div className="space-y-4">
              <p className="text-sm font-serif italic text-slate-300">
                A secret token has been locked inside the midnight chest for you...
              </p>
              <button
                onClick={handleRevealGift}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-cinzel font-bold text-sm tracking-wider flex items-center justify-center space-x-2 mx-auto shadow-lg shadow-purple-900/40 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open The Surprise Gift Box</span>
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-400/60 space-y-3 animate-in fade-in duration-500">
              <span className="text-xs uppercase font-mono-code text-pink-400 tracking-widest block">
                UNLOCKED BIRTHDAY SURPRISE
              </span>
              <p className="text-lg sm:text-xl font-cinzel font-bold text-amber-200 whitespace-pre-line">
                {config.surpriseGift}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Sharing & Replay Actions */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={handleShareLink}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-200 text-xs sm:text-sm font-cinzel font-bold flex items-center space-x-2 transition-all hover:scale-105"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedLink ? 'Personalized Link Copied!' : 'Share This Mystery Link'}</span>
        </button>

        <button
          onClick={() => {
            sounds.playTick();
            onResetGame();
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs sm:text-sm font-mono-code flex items-center space-x-2 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Replay From Beginning</span>
        </button>
      </div>
    </div>
  );
};
