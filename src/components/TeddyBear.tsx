import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Flower2,
  Gift,
  ShieldCheck,
  Gamepad2,
  Cookie,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import { playTeddySound } from '../utils/teddySound';

export function TeddyBear() {
  const [viewMode, setViewMode] = useState<'plushie' | 'console'>('plushie');
  const [hugCount, setHugCount] = useState<number>(() => {
    const saved = localStorage.getItem('marie-teddy-hugs');
    return saved ? parseInt(saved, 10) : 1219;
  });
  const [isHugging, setIsHugging] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeAccessory, setActiveAccessory] = useState<'tulip' | 'scarf' | 'biscuit' | 'hat' | 'penguin'>('tulip');
  const [breatheActive, setBreatheActive] = useState(false);
  const [hugSpeechText, setHugSpeechText] = useState<string | null>(null);

  // Console State (Image 1 homage)
  const [consolePet, setConsolePet] = useState<'bear' | 'penguin' | 'dog'>('bear');
  const [consoleScene, setConsoleScene] = useState<'home' | 'snow' | 'rain'>('home');
  const [consoleActionText, setConsoleActionText] = useState('Babu Bear is happy and warm!');
  const [consoleActionTick, setConsoleActionTick] = useState(0);
  const [petPositionX, setPetPositionX] = useState(0);
  const [isPetJumping, setIsPetJumping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showConsoleInfo, setShowConsoleInfo] = useState(false);

  const uniqueId = useId();

  const handleHug = () => {
    setIsHugging(true);
    if (soundEnabled) playTeddySound('hug');
    const newCount = hugCount + 1;
    setHugCount(newCount);
    localStorage.setItem('marie-teddy-hugs', newCount.toString());

    const messages = [
      'Suraj sends an infinite warm hug across the sea to Marie!',
      'Babu feels safe, happy, and so loved right now.',
      'A warm embrace straight to your heart across every mile.',
      'Squeezing tight! You are Suraj’s favourite person.',
    ];
    setHugSpeechText(messages[Math.floor(Math.random() * messages.length)]);

    setTimeout(() => {
      setIsHugging(false);
    }, 1800);
    setTimeout(() => {
      setHugSpeechText(null);
    }, 3800);
  };

  const handleConsoleAction = (type: 'hug' | 'feed' | 'jump' | 'pet_switch' | 'scene_switch') => {
    setConsoleActionTick((t) => t + 1);

    if (type === 'hug') {
      if (soundEnabled) playTeddySound('hug');
      setHugCount((c) => {
        const nc = c + 1;
        localStorage.setItem('marie-teddy-hugs', nc.toString());
        return nc;
      });
      setConsoleActionText('Suraj sends an infinite warm hug to Babu!');
      setIsPetJumping(true);
      setTimeout(() => setIsPetJumping(false), 500);
    } else if (type === 'feed') {
      if (soundEnabled) playTeddySound('treat');
      setConsoleActionText('Fed Marie Gold biscuit! Crunch crunch, so sweet!');
      setIsPetJumping(true);
      setTimeout(() => setIsPetJumping(false), 500);
    } else if (type === 'jump') {
      if (soundEnabled) playTeddySound('sparkle');
      setIsPetJumping(true);
      setConsoleActionText(
        consolePet === 'bear'
          ? 'Babu Bear hops cheerfully in the meadow!'
          : consolePet === 'penguin'
          ? 'Penguin waddles happily and flaps its wings!'
          : 'Puppy wags its tail with pure joy!'
      );
      setTimeout(() => setIsPetJumping(false), 500);
    } else if (type === 'pet_switch') {
      if (soundEnabled) playTeddySound('sparkle');
      setConsolePet((p) => (p === 'bear' ? 'penguin' : p === 'penguin' ? 'dog' : 'bear'));
    } else if (type === 'scene_switch') {
      if (soundEnabled) playTeddySound('sparkle');
      setConsoleScene((s) => (s === 'home' ? 'snow' : s === 'snow' ? 'rain' : 'home'));
    }
  };

  const movePet = (direction: 'left' | 'right') => {
    setPetPositionX((curr) => {
      if (direction === 'left') return Math.max(curr - 18, -60);
      return Math.min(curr + 18, 60);
    });
    if (soundEnabled) playTeddySound('sparkle');
  };

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-8 sm:px-6">
      {/* Top Banner & Mode Switcher */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/80 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#A64D70] shadow-sm backdrop-blur-md">
          <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
          <span>Page 2 · Her Long-Distance Birthday Gift</span>
          <Heart className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
        </div>

        <h2 className="font-cinzel text-3xl font-bold tracking-wide text-[#78344F] sm:text-4xl md:text-5xl">
          Babu Bear
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#93546D] sm:text-base font-serif italic">
          “You wished for a big fluffy teddy bear. Since miles keep me from
          handing it to you today, I built this gentle giant for you — guaranteed
          for infinite cuddles, warmth, and bedtime protection.”
        </p>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex items-center gap-2 rounded-full border border-pink-200/80 bg-white/85 p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('plushie')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              viewMode === 'plushie'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                : 'text-[#874A62] hover:bg-pink-100/60'
            }`}
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Giant Plushie Sanctuary</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('console')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              viewMode === 'console'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md'
                : 'text-[#874A62] hover:bg-pink-100/60'
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>Virtual Companion Console</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: THE GIANT PLUSHIE SANCTUARY */}
      {viewMode === 'plushie' ? (
        <div className="flex w-full flex-col items-center">
          {/* Plushie Card Frame */}
          <div className="relative flex w-full max-w-lg flex-col items-center overflow-hidden rounded-[38px] border border-pink-200/90 bg-gradient-to-b from-white/95 via-[#FFF2F6] to-white/95 p-6 shadow-[0_20px_60px_rgba(219,112,147,0.18)] backdrop-blur-xl sm:p-9">
            {/* Ambient Warmth Glow on Hug */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                isHugging
                  ? 'bg-gradient-to-b from-pink-300/40 via-rose-200/45 to-pink-300/35'
                  : 'bg-transparent'
              }`}
            />

            {/* Top Status & Hug Counter */}
            <div className="relative z-10 flex w-full items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full border border-pink-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-[#874A62] shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Fluffy & Ready for Cuddles</span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full border border-pink-200/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[#874A62] shadow-sm">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>{hugCount} Hugs Delivered</span>
              </span>
            </div>

            {/* Floating Speech Bubble */}
            <AnimatePresence>
              {hugSpeechText && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-20 mt-3 rounded-2xl border border-pink-200 bg-white/95 px-4 py-2 text-center text-xs font-serif italic text-[#7C2D4C] shadow-md"
                >
                  "{hugSpeechText}"
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE GIANT TEDDY BEAR SVG ILLUSTRATION */}
            <div className="relative my-4 flex h-[320px] w-full items-center justify-center sm:h-[360px]">
              {/* Floating Hearts Animation */}
              <AnimatePresence>
                {isHugging &&
                  [0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={`hug-heart-${i}`}
                      initial={{ opacity: 0, y: 0, scale: 0.5, x: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: -150 - (i % 3) * 35,
                        x: (i % 2 === 0 ? 1 : -1) * (20 + i * 16),
                        scale: [0.5, 1.25, 0.8],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: i * 0.12 }}
                      className="pointer-events-none absolute z-30 text-rose-500"
                    >
                      <Heart className="h-6 w-6 fill-rose-500" />
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* Teddy Bear Body Container */}
              <motion.div
                animate={
                  breatheActive
                    ? { scale: [1, 1.06, 1] }
                    : isHugging
                    ? { scale: [1, 1.12, 1.08] }
                    : { y: [0, -6, 0] }
                }
                transition={
                  breatheActive
                    ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                    : isHugging
                    ? { duration: 0.6 }
                    : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                }
                className="relative h-72 w-64 select-none cursor-pointer sm:h-80 sm:w-72"
                onClick={handleHug}
                title="Tap to cuddle and receive a warm hug!"
              >
                <svg
                  viewBox="0 0 300 320"
                  className="h-full w-full drop-shadow-[0_15px_35px_rgba(150,70,100,0.22)]"
                >
                  <defs>
                    <radialGradient id={`fur-${uniqueId}`} cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#edd8b8" />
                      <stop offset="60%" stopColor="#d8b991" />
                      <stop offset="100%" stopColor="#be9668" />
                    </radialGradient>
                    <radialGradient id={`snout-${uniqueId}`} cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#fff8ed" />
                      <stop offset="100%" stopColor="#edd5b4" />
                    </radialGradient>
                    <radialGradient id={`inner-ear-${uniqueId}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffccd8" />
                      <stop offset="100%" stopColor="#f39db2" />
                    </radialGradient>
                  </defs>

                  {/* Left Ear */}
                  <circle cx="80" cy="70" r="38" fill={`url(#fur-${uniqueId})`} />
                  <circle cx="80" cy="70" r="23" fill={`url(#inner-ear-${uniqueId})`} />

                  {/* Right Ear */}
                  <circle cx="220" cy="70" r="38" fill={`url(#fur-${uniqueId})`} />
                  <circle cx="220" cy="70" r="23" fill={`url(#inner-ear-${uniqueId})`} />

                  {/* Body */}
                  <ellipse cx="150" cy="220" rx="90" ry="85" fill={`url(#fur-${uniqueId})`} />

                  {/* Tummy Patch */}
                  <ellipse cx="150" cy="225" rx="60" ry="55" fill={`url(#snout-${uniqueId})`} opacity="0.85" />

                  {/* Left Foot Paw */}
                  <ellipse cx="85" cy="280" rx="35" ry="28" fill={`url(#fur-${uniqueId})`} />
                  <ellipse cx="85" cy="280" rx="20" ry="16" fill={`url(#inner-ear-${uniqueId})`} opacity="0.75" />

                  {/* Right Foot Paw */}
                  <ellipse cx="215" cy="280" rx="35" ry="28" fill={`url(#fur-${uniqueId})`} />
                  <ellipse cx="215" cy="280" rx="20" ry="16" fill={`url(#inner-ear-${uniqueId})`} opacity="0.75" />

                  {/* Left Arm / Paw */}
                  <ellipse cx="65" cy="195" rx="30" ry="25" fill={`url(#fur-${uniqueId})`} transform="rotate(-20 65 195)" />

                  {/* Right Arm / Paw */}
                  <ellipse cx="235" cy="195" rx="30" ry="25" fill={`url(#fur-${uniqueId})`} transform="rotate(20 235 195)" />

                  {/* Head */}
                  <circle cx="150" cy="115" r="75" fill={`url(#fur-${uniqueId})`} />

                  {/* Rosy Cheeks */}
                  <ellipse cx="108" cy="132" rx="14" ry="9" fill="#f87171" opacity="0.45" />
                  <ellipse cx="192" cy="132" rx="14" ry="9" fill="#f87171" opacity="0.45" />

                  {/* Snout */}
                  <ellipse cx="150" cy="135" rx="35" ry="26" fill={`url(#snout-${uniqueId})`} />

                  {/* Nose */}
                  <path d="M142 124 Q150 120 158 124 Q150 135 142 124 Z" fill="#4a2511" />

                  {/* Mouth */}
                  <path d="M150 132 L150 142" stroke="#4a2511" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M140 142 Q150 150 160 142" stroke="#4a2511" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Left Eye */}
                  <circle cx="120" cy="108" r="8" fill="#2d150b" />
                  <circle cx="118" cy="105" r="3" fill="#ffffff" />

                  {/* Right Eye */}
                  <circle cx="180" cy="108" r="8" fill="#2d150b" />
                  <circle cx="178" cy="105" r="3" fill="#ffffff" />

                  {/* ACCESSORY 1: Tulip Flower Crown (Flower: Tulips) */}
                  {activeAccessory === 'tulip' && (
                    <g transform="translate(100, 32)">
                      <path d="M15 15 C10 5, 20 0, 25 10 C30 0, 40 5, 35 15 C30 25, 20 25, 15 15 Z" fill="#fb7185" />
                      <path d="M40 12 C35 2, 45 -3, 50 7 C55 -3, 65 2, 60 12 C55 22, 45 22, 40 12 Z" fill="#f43f5e" />
                      <path d="M65 15 C60 5, 70 0, 75 10 C80 0, 90 5, 85 15 C80 25, 70 25, 65 15 Z" fill="#fda4af" />
                      <path d="M5 22 Q50 10 95 22" stroke="#4ade80" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    </g>
                  )}

                  {/* ACCESSORY 2: Blue-Black Knitted Scarf (Color: Blue-Black) */}
                  {activeAccessory === 'scarf' && (
                    <g transform="translate(90, 160)">
                      <rect x="0" y="0" width="120" height="22" rx="11" fill="#0f172a" />
                      <rect x="3" y="3" width="114" height="16" rx="8" fill="#1e293b" />
                      <path d="M30 18 L24 65 L48 65 L54 18 Z" fill="#0f172a" />
                      <rect x="25" y="22" width="22" height="38" fill="#1e293b" />
                      <line x1="24" y1="65" x2="24" y2="72" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="30" y1="65" x2="30" y2="72" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="36" y1="65" x2="36" y2="72" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="42" y1="65" x2="42" y2="72" stroke="#38bdf8" strokeWidth="2" />
                      <line x1="48" y1="65" x2="48" y2="72" stroke="#38bdf8" strokeWidth="2" />
                    </g>
                  )}

                  {/* ACCESSORY 3: Marie Gold Biscuit (Nickname: Marie Gold Biscuit) */}
                  {activeAccessory === 'biscuit' && (
                    <g transform="translate(195, 185)">
                      <circle cx="20" cy="20" r="22" fill="#d97706" />
                      <circle cx="20" cy="20" r="19" fill="#f59e0b" />
                      <circle cx="14" cy="14" r="2" fill="#b45309" />
                      <circle cx="26" cy="14" r="2" fill="#b45309" />
                      <circle cx="20" cy="20" r="2" fill="#b45309" />
                      <circle cx="14" cy="26" r="2" fill="#b45309" />
                      <circle cx="26" cy="26" r="2" fill="#b45309" />
                    </g>
                  )}

                  {/* ACCESSORY 4: Birthday Party Hat */}
                  {activeAccessory === 'hat' && (
                    <g transform="translate(130, 20)">
                      <polygon points="20,0 0,60 40,60" fill="#ec4899" />
                      <line x1="8" y1="25" x2="28" y2="15" stroke="#fef08a" strokeWidth="3" />
                      <line x1="4" y1="45" x2="36" y2="35" stroke="#a78bfa" strokeWidth="3" />
                      <circle cx="20" cy="0" r="6" fill="#fef08a" />
                    </g>
                  )}

                  {/* ACCESSORY 5: Cute Penguin Badge (Nickname: Penguin) */}
                  {activeAccessory === 'penguin' && (
                    <g transform="translate(178, 192)">
                      <ellipse cx="14" cy="16" rx="14" ry="16" fill="#0f172a" />
                      <ellipse cx="14" cy="18" rx="9" ry="11" fill="#ffffff" />
                      <polygon points="12,14 16,14 14,18" fill="#f59e0b" />
                      <circle cx="10" cy="11" r="1.5" fill="#0f172a" />
                      <circle cx="18" cy="11" r="1.5" fill="#0f172a" />
                    </g>
                  )}

                  {/* Heartbeat on Tummy */}
                  <g transform="translate(138, 215)">
                    <Heart
                      className={`h-6 w-6 text-rose-500 transition-all duration-300 ${
                        isHugging
                          ? 'scale-125 fill-rose-500 animate-pulse'
                          : 'fill-rose-400/80 animate-heartbeat'
                      }`}
                    />
                  </g>
                </svg>
              </motion.div>
            </div>

            {/* Hug Button Prompt */}
            <motion.button
              type="button"
              onClick={handleHug}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative mt-2 flex items-center gap-2.5 rounded-full border border-pink-300/80 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.35)] transition-all hover:shadow-[0_12px_40px_rgba(236,72,153,0.5)] focus:outline-none"
            >
              <Heart className="h-4 w-4 fill-white animate-pulse" />
              <span>Tap Babu Bear for a Big Hug</span>
              <Sparkles className="h-4 w-4 text-pink-200" />
            </motion.button>

            {/* Calming Breathing Buddy Mode */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setBreatheActive(!breatheActive)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  breatheActive
                    ? 'border border-pink-300 bg-pink-100/90 text-pink-700 shadow-sm'
                    : 'border border-pink-200/80 bg-white/70 text-[#874A62] hover:bg-pink-100/50'
                }`}
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>
                  {breatheActive ? 'Calm Breathing: Active (Breathe with Teddy)' : 'Enable Calming Breathing Mode'}
                </span>
              </button>

              {breatheActive && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-serif italic text-pink-600"
                >
                  Breathe in as Babu Bear expands... Breathe out as he relaxes...
                </motion.div>
              )}
            </div>

            {/* Accessory Selector Strip */}
            <div className="mt-6 flex w-full flex-col items-center border-t border-pink-200/60 pt-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A64D70]">
                Dress Up Accessories
              </span>
              <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                {[
                  { id: 'tulip' as const, label: 'Tulip Crown', icon: Flower2 },
                  { id: 'scarf' as const, label: 'Blue-Black Scarf', icon: ShieldCheck },
                  { id: 'biscuit' as const, label: 'Marie Gold Biscuit', icon: Cookie },
                  { id: 'hat' as const, label: 'Birthday Hat', icon: Sparkles },
                  { id: 'penguin' as const, label: 'Penguin Badge', icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAccessory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveAccessory(item.id);
                        if (soundEnabled) playTeddySound('sparkle');
                      }}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? 'border border-pink-400 bg-pink-500 text-white shadow-sm'
                          : 'border border-pink-200/80 bg-white/80 text-[#874A62] hover:bg-pink-100/60'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certificate Link */}
            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#874A62] underline decoration-pink-300 underline-offset-4 transition hover:text-[#5B203B]"
            >
              <Gift className="h-3.5 w-3.5 text-pink-500" />
              <span>View Official Adoption & Care Certificate</span>
            </button>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: RETRO GAMEBOY VIRTUAL COMPANION CONSOLE (Exact Homage to Reference Image 1) */
        <div className="flex w-full flex-col items-center">
          <div className="relative w-full max-w-sm rounded-[44px] border-4 border-[#b5cca1] bg-[#cde4b3] p-5 shadow-[0_22px_60px_rgba(110,140,80,0.38)] sm:p-7">
            {/* Console Screen Outer Bezel */}
            <div className="relative overflow-hidden rounded-[26px] border-4 border-[#94ab7c] bg-[#d9e8c5] shadow-inner">
              {/* TOP STATUS BAR (Coins/Gem, Heart counter, Info, Settings) */}
              <div className="flex items-center justify-between border-b border-[#869b6f]/50 bg-[#c5dba9]/90 px-3 py-1.5 text-[10px] font-mono-code font-bold text-[#2d4218]">
                {/* Treat Coin */}
                <div className="flex items-center gap-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-[#eab308] text-[8px] text-[#713f12] shadow-sm">
                    <Sparkles className="h-2.5 w-2.5 text-[#713f12]" />
                  </span>
                  <span>100</span>
                </div>

                {/* Love Heart Counter */}
                <div className="flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 fill-[#e11d48] text-[#e11d48]" />
                  <span>{hugCount}</span>
                </div>

                {/* Info & Sound Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowConsoleInfo(!showConsoleInfo)}
                    className="flex h-4 w-4 items-center justify-center rounded border border-[#74895f] bg-[#d9e8c5] text-[#2d4218] hover:bg-white/60"
                    title="Console Info"
                  >
                    <Info className="h-2.5 w-2.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="flex h-4 w-4 items-center justify-center rounded border border-[#74895f] bg-[#d9e8c5] text-[#2d4218] hover:bg-white/60"
                    title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
                  >
                    {soundEnabled ? <Volume2 className="h-2.5 w-2.5" /> : <VolumeX className="h-2.5 w-2.5" />}
                  </button>
                </div>
              </div>

              {/* TOP PIXEL LANDSCAPE SCENE (Cottage, Castle, Mountain, Meadow, Animated Pet) */}
              <div
                className={`relative flex h-56 w-full flex-col justify-between overflow-hidden border-b border-[#869b6f]/60 p-2.5 transition-colors duration-700 ${
                  consoleScene === 'home'
                    ? 'bg-gradient-to-b from-[#87CEEB] via-[#B0E0E6] to-[#98d89e]'
                    : consoleScene === 'snow'
                    ? 'bg-gradient-to-b from-[#b8d8ea] via-[#d5e7f0] to-[#e8f1f5]'
                    : 'bg-gradient-to-b from-[#7a9e9f] via-[#a3c4c2] to-[#8fae9b]'
                }`}
              >
                {/* Pixel Clouds / Weather Sky */}
                <div className="pointer-events-none absolute inset-x-0 top-1 flex justify-between px-2 opacity-85">
                  <motion.div
                    animate={{ x: [0, 25, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-3 w-12 rounded-full bg-white/90 shadow-sm"
                  />
                  <motion.div
                    animate={{ x: [0, -20, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    className="h-2.5 w-9 rounded-full bg-white/80 shadow-sm"
                  />
                </div>

                {/* Distant Fairytale Castle on Pink-Capped Mountain */}
                <div className="pointer-events-none absolute bottom-14 right-8 z-0 opacity-70">
                  <svg width="100" height="85" viewBox="0 0 100 85" fill="none">
                    {/* Mountain Base */}
                    <polygon points="50,15 95,85 5,85" fill="#fbcfe8" opacity="0.6" />
                    {/* Pink Castle Spire */}
                    <rect x="42" y="32" width="16" height="35" fill="#f472b6" />
                    <polygon points="50,18 40,32 60,32" fill="#ec4899" />
                    <polygon points="34,42 28,52 40,52" fill="#38bdf8" />
                    <rect x="30" y="52" width="10" height="20" fill="#7dd3fc" />
                    <polygon points="66,42 60,52 72,52" fill="#38bdf8" />
                    <rect x="60" y="52" width="10" height="20" fill="#7dd3fc" />
                  </svg>
                </div>

                {/* Cozy Cottage House ("Home" - Favorite Place!) */}
                <div className="pointer-events-none absolute bottom-8 left-4 z-10">
                  <svg width="80" height="75" viewBox="0 0 80 75" fill="none">
                    {/* Chimney smoke puff */}
                    <circle cx="24" cy="8" r="4" fill="#ffffff" opacity="0.75" />
                    <circle cx="28" cy="4" r="3" fill="#ffffff" opacity="0.5" />
                    {/* Chimney */}
                    <rect x="21" y="10" width="7" height="15" fill="#991b1b" />
                    {/* Roof */}
                    <polygon points="40,16 6,42 74,42" fill="#b45309" />
                    {/* Wall */}
                    <rect x="14" y="42" width="52" height="30" fill="#fef3c7" />
                    {/* Door */}
                    <rect x="32" y="52" width="16" height="20" rx="3" fill="#78350f" />
                    {/* Window */}
                    <rect x="18" y="48" width="10" height="10" fill="#38bdf8" />
                    <rect x="52" y="48" width="10" height="10" fill="#38bdf8" />
                  </svg>
                </div>

                {/* Grass / Ground with Blooming Tulips */}
                <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-[#4d7c0f] border-t-2 border-[#65a30d]">
                  {/* Little Tulips in the grass */}
                  <div className="flex h-full items-center justify-around px-2">
                    <Flower2 className="h-4 w-4 text-[#f43f5e]" />
                    <Flower2 className="h-4 w-4 text-[#a855f7]" />
                    <Flower2 className="h-4 w-4 text-[#fb7185]" />
                    <Flower2 className="h-4 w-4 text-[#f43f5e]" />
                  </div>
                </div>

                {/* Marie Gold Biscuit Treat in grass */}
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-12 z-20">
                  <div className="h-5 w-5 rounded-full border border-amber-800 bg-[#f59e0b] shadow-sm flex items-center justify-center text-[7px] text-amber-950 font-bold">
                    MG
                  </div>
                </div>

                {/* ANIMATED PIXEL PET IN SCENERY */}
                <motion.div
                  animate={{
                    x: petPositionX,
                    y: isPetJumping ? -25 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute bottom-2 right-12 z-20 flex flex-col items-center select-none cursor-pointer"
                  onClick={() => handleConsoleAction('jump')}
                  title="Click pet to make it jump!"
                >
                  {/* The Pet Graphics */}
                  {consolePet === 'bear' ? (
                    /* Babu Bear Pixel Pet */
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border-2 border-[#5c3d18] bg-[#d8b991] shadow-md">
                        {/* Ears */}
                        <div className="absolute -top-2 flex w-full justify-between px-1">
                          <span className="h-3.5 w-3.5 rounded-full border border-[#5c3d18] bg-[#be9668]" />
                          <span className="h-3.5 w-3.5 rounded-full border border-[#5c3d18] bg-[#be9668]" />
                        </div>
                        {/* Eyes */}
                        <div className="mt-1 flex gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#2d150b]" />
                          <span className="h-2 w-2 rounded-full bg-[#2d150b]" />
                        </div>
                        {/* Snout */}
                        <div className="mt-1 flex h-4 w-6 items-center justify-center rounded-full bg-[#fff8ed]">
                          <span className="h-1.5 w-2 rounded-full bg-[#4a2511]" />
                        </div>
                        {/* Cheeks */}
                        <div className="absolute bottom-2 flex w-full justify-between px-1.5">
                          <span className="h-1.5 w-2 rounded-full bg-[#f87171] opacity-70" />
                          <span className="h-1.5 w-2 rounded-full bg-[#f87171] opacity-70" />
                        </div>
                      </div>
                    </div>
                  ) : consolePet === 'penguin' ? (
                    /* Penguin Pixel Pet */
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-14 w-12 flex-col items-center justify-center rounded-2xl border-2 border-[#0f172a] bg-[#0f172a] shadow-md">
                        {/* Belly */}
                        <div className="absolute bottom-1 h-9 w-8 rounded-xl bg-white" />
                        {/* Eyes */}
                        <div className="relative z-10 -mt-1 flex gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                        </div>
                        {/* Beak */}
                        <div className="relative z-10 mt-0.5 h-2 w-2.5 rounded-sm bg-[#f59e0b]" />
                      </div>
                    </div>
                  ) : (
                    /* Puppy Dog Pixel Pet */
                    <div className="flex flex-col items-center">
                      <div className="relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border-2 border-[#78350f] bg-[#fcd34d] shadow-md">
                        {/* Droopy Dog Ears */}
                        <div className="absolute -top-1 flex w-full justify-between px-0.5">
                          <span className="h-5 w-2.5 rounded-b-md bg-[#b45309]" />
                          <span className="h-5 w-2.5 rounded-b-md bg-[#b45309]" />
                        </div>
                        {/* Eyes */}
                        <div className="mt-1 flex gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#451a03]" />
                          <span className="h-2 w-2 rounded-full bg-[#451a03]" />
                        </div>
                        {/* Dog Nose & Tongue */}
                        <div className="mt-1 flex flex-col items-center">
                          <span className="h-1.5 w-2.5 rounded-full bg-[#1c1917]" />
                          <span className="h-2 w-1.5 rounded-b-full bg-[#fb7185]" />
                        </div>
                      </div>
                    </div>
                  )}

                  <span className="mt-1 rounded-full bg-[#2e421c]/80 px-2 py-0.5 text-[8px] font-mono-code font-bold uppercase tracking-wider text-white">
                    {consolePet === 'bear' ? 'Babu Bear' : consolePet === 'penguin' ? 'Penguin' : 'Puppy'}
                  </span>
                </motion.div>
              </div>

              {/* LOWER LCD SCREEN (Pet Profile, Age, Mood, Satiety) */}
              <div className="p-3 bg-[#d9e8c5]">
                <div className="flex items-center justify-between rounded-xl border-2 border-[#869b6f] bg-[#c5dba9]/85 p-2 text-[#243614]">
                  {/* Left: Pixel Art Thumbnail & Name */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#6b8254] bg-[#b8cf9f]">
                      <Heart className="h-5 w-5 fill-[#9f1239] text-[#9f1239]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono-code font-bold leading-none">
                        {consolePet === 'bear' ? 'Babu Bear' : consolePet === 'penguin' ? 'Penguin' : 'Puppy Dog'}
                      </p>
                      <span className="text-[8px] font-mono-code text-[#47602d]">
                        Loyal & Loved
                      </span>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="h-9 w-px bg-[#869b6f]" />

                  {/* Right: Stats Readout */}
                  <div className="space-y-0.5 text-[9px] font-mono-code">
                    <div className="flex justify-between gap-3">
                      <span className="font-bold">Age:</span>
                      <span>133 Days</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold">Mood:</span>
                      <span className="flex items-center gap-0.5 text-[#e11d48]">
                        <Heart className="h-2.5 w-2.5 fill-current" />
                        <Heart className="h-2.5 w-2.5 fill-current" />
                        <Heart className="h-2.5 w-2.5 fill-current" />
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="font-bold">Satiety:</span>
                      <span className="text-emerald-700 font-bold">Full (100%)</span>
                    </div>
                  </div>
                </div>

                {/* Status Ticker Line */}
                <div key={consoleActionTick} className="mt-2 text-center font-mono-code text-[10px] font-bold text-[#233313] truncate">
                  {consoleActionText}
                </div>
              </div>
            </div>

            {/* CONSOLE PHYSICAL CONTROLS BODY */}
            {/* Dynamic Sound Toggle Bar */}
            <div className="mt-4 flex items-center justify-between px-2 text-[10px] font-mono-code font-bold text-[#3d5427]">
              <span>Dynamic Island</span>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`relative h-4 w-8 rounded-full transition-colors ${
                  soundEnabled ? 'bg-[#e11d48]' : 'bg-[#70845a]'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${
                    soundEnabled ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            {/* D-Pad & Action Buttons Grid */}
            <div className="mt-5 flex items-center justify-between px-2">
              {/* D-Pad (Navigation) */}
              <div className="relative h-24 w-24">
                {/* UP */}
                <button
                  type="button"
                  onClick={() => handleConsoleAction('jump')}
                  aria-label="D-Pad Up: Jump"
                  className="absolute left-8 top-0 flex h-8 w-8 items-center justify-center rounded-t-md bg-[#424d35] text-white transition hover:bg-[#5b6a49] active:translate-y-0.5"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                {/* LEFT */}
                <button
                  type="button"
                  onClick={() => movePet('left')}
                  aria-label="D-Pad Left: Walk Left"
                  className="absolute left-0 top-8 flex h-8 w-8 items-center justify-center rounded-l-md bg-[#424d35] text-white transition hover:bg-[#5b6a49] active:-translate-x-0.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {/* CENTER */}
                <div className="absolute left-8 top-8 h-8 w-8 bg-[#333c2a]" />
                {/* RIGHT */}
                <button
                  type="button"
                  onClick={() => movePet('right')}
                  aria-label="D-Pad Right: Walk Right"
                  className="absolute right-0 top-8 flex h-8 w-8 items-center justify-center rounded-r-md bg-[#424d35] text-white transition hover:bg-[#5b6a49] active:translate-x-0.5"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                {/* DOWN */}
                <button
                  type="button"
                  onClick={() => handleConsoleAction('hug')}
                  aria-label="D-Pad Down: Hug"
                  className="absolute bottom-0 left-8 flex h-8 w-8 items-center justify-center rounded-b-md bg-[#424d35] text-white transition hover:bg-[#5b6a49] active:translate-y-0.5"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Action Buttons (F and P buttons in pink/magenta) */}
              <div className="flex rotate-[-22deg] items-center gap-4">
                {/* Button B: FEED BISCUIT */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => handleConsoleAction('feed')}
                    aria-label="Button B: Feed Marie Gold Biscuit"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#831843] bg-gradient-to-b from-[#e11d48] to-[#9f1239] text-sm font-bold text-white shadow-lg transition active:scale-90"
                  >
                    B
                  </button>
                  <span className="mt-1 text-[9px] font-mono-code font-bold text-[#3e5625]">
                    TREAT
                  </span>
                </div>

                {/* Button A: SEND HUG */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => handleConsoleAction('hug')}
                    aria-label="Button A: Send Long-Distance Hug"
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#831843] bg-gradient-to-b from-[#e11d48] to-[#9f1239] text-sm font-bold text-white shadow-lg transition active:scale-90"
                  >
                    A
                  </button>
                  <span className="mt-1 text-[9px] font-mono-code font-bold text-[#3e5625]">
                    HUG
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Pets & Scenes Pill Buttons (Homage to Image 1) */}
            <div className="mt-6 flex justify-around px-3">
              {/* PETS BUTTON */}
              <button
                type="button"
                onClick={() => handleConsoleAction('pet_switch')}
                className="flex items-center gap-1.5 rounded-full border border-[#71875c] bg-[#424d35] px-4 py-1.5 text-[9px] font-mono-code font-bold uppercase text-white shadow-sm transition active:scale-95"
              >
                <span>Pets:</span>
                <span className="text-[#a5f3fc]">{consolePet}</span>
              </button>

              {/* SCENES BUTTON */}
              <button
                type="button"
                onClick={() => handleConsoleAction('scene_switch')}
                className="flex items-center gap-1.5 rounded-full border border-[#71875c] bg-[#424d35] px-4 py-1.5 text-[9px] font-mono-code font-bold uppercase text-white shadow-sm transition active:scale-95"
              >
                <span>Scenes:</span>
                <span className="text-[#fed7aa]">{consoleScene}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL ADOPTION & CARE CERTIFICATE */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            role="dialog"
            aria-modal="true"
            data-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border-4 border-[#e9b384] bg-[#FFFBF7] p-7 text-[#522b1a] shadow-2xl sm:p-9"
            >
              {/* Ornate Frame Border */}
              <div className="pointer-events-none absolute inset-3 rounded-2xl border-2 border-dashed border-[#e9b384]/60" />

              <div className="relative text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fde8d4] text-[#d97706]">
                  <ShieldCheck className="h-6 w-6" />
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a0623a]">
                  Official Certificate of Long-Distance Snuggles
                </p>

                <h3 className="mt-1 font-cinzel text-2xl font-bold text-[#451e0e] sm:text-3xl">
                  Babu Bear
                </h3>

                <p className="mt-2 font-serif text-xs italic text-[#7c4d32] sm:text-sm">
                  This certifies that Babu Bear has been officially handcrafted & adopted for:
                </p>

                <div className="my-4 rounded-xl border border-[#ecd2ba] bg-[#fff6ee] py-2.5">
                  <p className="font-cinzel text-lg font-bold text-[#7c2d12] sm:text-xl">
                    Marie
                  </p>
                  <p className="text-xs text-[#a0623a] font-medium">
                    (Our Beloved Penguin · Marie Gold Biscuit · Babu)
                  </p>
                </div>

                <div className="space-y-2 text-left font-serif text-xs leading-relaxed text-[#5c3722] sm:text-[13px]">
                  <p>
                    <strong>1. Lifetime Snuggle Warranty:</strong> Guaranteed to provide
                    infinite warmth, bedtime protection, and sweet dreams across every mile.
                  </p>
                  <p>
                    <strong>2. Emergency Hug Protocol:</strong> Whenever you feel
                    tired, stressed, or miss home, squeeze this plushie in your mind
                    and know Suraj is wishing you the best.
                  </p>
                  <p>
                    <strong>3. Physical Promise:</strong> This virtual giant teddy will be
                    superseded by a real 6-foot giant fluffy teddy bear in person on the day
                    we meet.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#ecd2ba] pt-4 text-xs">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#a0623a]">
                      Date of Adoption
                    </span>
                    <span className="font-semibold text-[#451e0e]">
                      December 19 (Birthday)
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#a0623a]">
                      Issued With Love By
                    </span>
                    <span className="font-semibold text-[#451e0e]">
                      Suraj
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCertificate(false)}
                  className="mt-6 rounded-full bg-gradient-to-r from-[#d97706] to-[#b45309] px-7 py-2.5 text-xs font-semibold text-white shadow-md transition hover:scale-105"
                >
                  Keep in My Heart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeddyBear;
