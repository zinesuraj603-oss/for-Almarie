import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import type { ChoiceChapterContent } from '../../types/content';
import { SkyEffects } from './SkyEffects';
import { playPortalSound } from '../../utils/sound';

interface SkyChooserProps {
  chapter: ChoiceChapterContent;
  onComplete: () => void;
}

type Phase = 'choosing' | 'viewing' | 'message';
type Sky = 'rain' | 'snow';

function RainPortal({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative flex h-[235px] w-[235px] items-center justify-center sm:h-[280px] sm:w-[280px]">
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-200/20"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-[5%] rounded-full border-[3px] border-dashed border-teal-200/35"
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-[11%] rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #67e8f9, #164e63 18%, #0f766e 36%, #a5f3fc 48%, #155e75 66%, #2dd4bf 83%, #67e8f9)',
          boxShadow: '0 0 24px rgba(45,212,191,0.35), inset 0 0 20px rgba(103,232,249,0.25)',
          mask: 'radial-gradient(circle, transparent 64%, black 66%)',
          WebkitMask: 'radial-gradient(circle, transparent 64%, black 66%)',
        }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="absolute inset-[19%] overflow-hidden rounded-full border border-cyan-100/30"
        style={{
          background:
            'radial-gradient(ellipse at 35% 20%, rgba(103,232,249,0.35), transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(20,184,166,0.3), transparent 50%), linear-gradient(145deg, #103a49, #071c2b 65%, #102d36)',
          boxShadow: 'inset 0 0 35px rgba(34,211,238,0.3), 0 0 35px rgba(34,211,238,0.2)',
        }}
      >
        <svg
          viewBox="0 0 160 160"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rainwater" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5f3fc" stopOpacity=".85" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity=".05" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="52" fill="none" stroke="url(#rainwater)" strokeWidth="1.5" />
          <circle cx="80" cy="80" r="37" fill="none" stroke="#a5f3fc" strokeOpacity=".25" />
          <path d="M20 104 Q48 87 75 103 T142 100" fill="none" stroke="#67e8f9" strokeWidth="2" strokeOpacity=".75" />
          <path d="M12 117 Q42 104 72 118 T150 113" fill="none" stroke="#5eead4" strokeWidth="1.5" strokeOpacity=".55" />
          <path d="M31 38 L25 55 M53 24 L47 42 M113 31 L106 49 M133 58 L127 75 M82 15 L77 33 M37 75 L31 92 M100 88 L94 105" stroke="#cffafe" strokeWidth="2" strokeLinecap="round" strokeOpacity=".85" />
          <ellipse cx="80" cy="137" rx="43" ry="6" fill="#67e8f9" opacity=".16" />
        </svg>

        <motion.div
          className="absolute left-[24%] top-[22%] h-2 w-2 rounded-full bg-cyan-100"
          animate={reduced ? {} : { y: [0, 14, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[23%] top-[42%] h-1.5 w-1.5 rounded-full bg-teal-100"
          animate={reduced ? {} : { y: [0, 12, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
        />
        <div className="absolute inset-x-[18%] bottom-[15%] h-5 rounded-full bg-cyan-300/20 blur-xl" />
      </div>

      {Array.from({ length: 8 }, (_, i) => (
        <motion.span
          key={`sparkle-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-100 pointer-events-none"
          style={{
            left: `${50 + Math.cos((i * Math.PI) / 4) * 49}%`,
            top: `${50 + Math.sin((i * Math.PI) / 4) * 49}%`,
            boxShadow: '0 0 12px rgba(103,232,249,0.95)',
          }}
          animate={reduced ? {} : { opacity: [0.25, 1, 0.25], scale: [0.7, 1.4, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  );
}

function SnowPortal({ reduced }: { reduced: boolean }) {
  const shards = Array.from({ length: 10 }, (_, i) => ({
    angle: i * 36,
    size: i % 2 === 0 ? 22 : 15,
  }));

  return (
    <div className="relative flex h-[235px] w-[235px] items-center justify-center sm:h-[280px] sm:w-[280px]">
      <motion.div
        className="absolute inset-[3%] rounded-full border border-dashed border-sky-100/35"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />

      {shards.map((shard, i) => (
        <div
          key={`shard-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: shard.size,
            height: shard.size * 1.7,
            transform: `translate(-50%, -50%) rotate(${shard.angle}deg) translateY(-${i % 2 === 0 ? 115 : 102}px)`,
            clipPath: 'polygon(50% 0%, 100% 35%, 72% 100%, 28% 100%, 0% 35%)',
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(125,211,252,0.3))',
            filter: 'drop-shadow(0 0 6px rgba(186,230,253,0.75))',
            opacity: i % 2 === 0 ? 0.9 : 0.6,
          }}
        />
      ))}

      <motion.div
        className="absolute inset-[9%] rounded-full"
        style={{
          border: '2px solid rgba(186,230,253,0.75)',
          boxShadow: '0 0 20px rgba(147,197,253,0.4), inset 0 0 20px rgba(186,230,253,0.25)',
        }}
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="absolute inset-[18%] overflow-hidden rounded-full border border-sky-100/50"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.85), transparent 32%), linear-gradient(160deg, #b9e6fa, #5b8fbb 48%, #243d66)',
          boxShadow: 'inset 0 0 40px rgba(255,255,255,0.35), 0 0 40px rgba(147,197,253,0.28)',
        }}
      >
        <svg
          viewBox="0 0 160 160"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <circle cx="116" cy="34" r="15" fill="#fff" opacity=".7" />
          <path d="M0 98 L35 47 L56 76 L84 27 L123 80 L145 54 L160 76 V160 H0Z" fill="#dbeafe" opacity=".82" />
          <path d="M0 117 L38 76 L62 98 L98 56 L133 101 L160 82 V160 H0Z" fill="#91b9df" opacity=".78" />
          <path d="M0 132 Q40 113 80 129 T160 124 V160 H0Z" fill="#edf7ff" />
          <path d="M12 138 Q40 126 68 137 T148 135" stroke="#a5d5f4" strokeWidth="2" fill="none" />
          <path d="M33 63 L35 83 M28 72 L40 72 M109 99 L109 115 M101 107 L117 107" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".9" />
          <path d="M130 23 L130 37 M123 30 L137 30 M125 25 L135 35 M135 25 L125 35" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".85" />
        </svg>

        <motion.div
          className="absolute left-[22%] top-[25%] h-2 w-2 rounded-full bg-white"
          animate={reduced ? {} : { y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[20%] top-[48%] h-1.5 w-1.5 rounded-full bg-white"
          animate={reduced ? {} : { y: [0, -10, 0], opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: 0.8 }}
        />
      </div>
    </div>
  );
}

export function SkyChooser({ chapter, onComplete }: SkyChooserProps) {
  const [phase, setPhase] = useState<Phase>('choosing');
  const [choice, setChoice] = useState<Sky | null>(null);
  const reduceMotion = useReducedMotion();

  const handleChoose = (effect: 'rain' | 'snow') => {
    playPortalSound();
    setChoice(effect);
    setPhase('viewing');
  };

  return (
    <div className="relative isolate flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-white select-none sm:min-h-[650px]">
      {/* Portal Selection Background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#080e18]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_45%,#162b3b_0%,#0b1725_48%,#050910_100%)]" />

      <AnimatePresence>
        {phase !== 'choosing' && choice && (
          <motion.div
            key={`night-${choice}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          >
            <SkyEffects type={choice} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'choosing' && (
          <motion.section
            key="choosing"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65 }}
            className="relative z-10 flex w-full flex-col items-center"
          >
            <div className="mb-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200 shadow-sm backdrop-blur-md sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
              Two nights · One choice
            </div>

            <h2 className="max-w-3xl text-center font-cinzel text-2xl leading-snug text-white sm:text-3xl md:text-4xl font-medium tracking-wide drop-shadow-md">
              {chapter.question}
            </h2>

            <p className="mt-3.5 max-w-md text-center text-sm leading-6 text-slate-300">
              Choose the night that feels like your kind of magic.
            </p>

            <div className="mt-9 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
              {/* Rain Portal Card */}
              <motion.button
                type="button"
                onClick={() => handleChoose('rain')}
                whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                className="group relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-[2.2rem] border border-cyan-200/25 bg-[#091820]/80 px-4 py-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/70 hover:bg-[#0b2028]/95 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(20,184,166,0.18),transparent_65%)] opacity-70 transition-opacity group-hover:opacity-100" />

                <motion.div
                  className="relative"
                  animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <RainPortal reduced={!!reduceMotion} />
                </motion.div>

                <div className="relative z-10 -mt-1 flex flex-col items-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200/80">
                    Portal 01
                  </p>
                  <h3 className="mt-1.5 flex items-center justify-center gap-2 font-cinzel text-xl text-cyan-50 sm:text-2xl font-medium">
                    Rainy Night
                  </h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-xs sm:text-[13px] leading-relaxed text-slate-200/90 font-medium">
                    Where the rain whispers and the night slows down.
                  </p>
                  <span className="mt-4.5 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/15 px-5 py-2 text-xs font-semibold text-cyan-100 shadow-sm transition-all group-hover:border-cyan-200 group-hover:bg-cyan-400/25 group-hover:text-white">
                    Step into the rainy night <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>

              {/* Snow Portal Card */}
              <motion.button
                type="button"
                onClick={() => handleChoose('snow')}
                whileHover={reduceMotion ? {} : { y: -6, scale: 1.02 }}
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
                className="group relative flex min-h-[400px] flex-col items-center justify-center overflow-hidden rounded-[2.2rem] border border-sky-100/30 bg-[#111a2b]/80 px-4 py-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-sky-200/75 hover:bg-[#16243a]/95 hover:shadow-[0_0_40px_rgba(147,197,253,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-200"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(147,197,253,0.2),transparent_65%)] opacity-70 transition-opacity group-hover:opacity-100" />

                <motion.div
                  className="relative"
                  animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <SnowPortal reduced={!!reduceMotion} />
                </motion.div>

                <div className="relative z-10 -mt-1 flex flex-col items-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-200/80">
                    Portal 02
                  </p>
                  <h3 className="mt-1.5 flex items-center justify-center gap-2 font-cinzel text-xl text-sky-50 sm:text-2xl font-medium">
                    Snowy Night
                  </h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-xs sm:text-[13px] leading-relaxed text-slate-200/90 font-medium">
                    Where every snowflake feels like a quiet piece of magic.
                  </p>
                  <span className="mt-4.5 inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-sky-400/15 px-5 py-2 text-xs font-semibold text-sky-50 shadow-sm transition-all group-hover:border-sky-100 group-hover:bg-sky-400/25 group-hover:text-white">
                    Step into the snowy night <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            </div>

            <p className="mt-8 text-center text-xs tracking-wide text-slate-400 font-medium">
              Two different nights, each with its own quiet magic.
            </p>
          </motion.section>
        )}

        {phase === 'viewing' && choice && (
          <motion.section
            key="viewing"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex min-h-[500px] w-full max-w-3xl flex-col items-center justify-end pb-8 pt-56 text-center sm:min-h-[600px] sm:pt-64"
          >
            <div className="w-full rounded-3xl border border-white/30 bg-[#08111b]/80 p-7 shadow-2xl backdrop-blur-2xl sm:p-10">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
                {choice === 'rain' ? 'The Rainy Night' : 'The Snowy Night'}
              </p>
              <h2 className="font-cinzel text-xl leading-relaxed text-white sm:text-3xl font-medium">
                {choice === 'rain'
                  ? '"Some nights feel beautiful simply because of the way the rain falls."'
                  : '"Some moments feel like magic, as if the whole world paused just for you."'}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-200">
                Take a breath. Let this peaceful night be yours for a moment.
              </p>

              <button
                type="button"
                onClick={() => setPhase('message')}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/40 bg-white/15 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-white/25 hover:scale-104 focus:outline-none"
              >
                Stay in This Moment <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Clearly Visible Back Link */}
            <button
              type="button"
              onClick={() => {
                setChoice(null);
                setPhase('choosing');
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs font-semibold text-slate-200 backdrop-blur-md transition hover:border-white/40 hover:text-white hover:bg-black/60 focus:outline-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Choose another night
            </button>
          </motion.section>
        )}

        {phase === 'message' && (
          <motion.section
            key="message"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-3xl border border-white/30 bg-[#08111b]/85 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-12"
          >
            <Sparkles className="mb-5 h-8 w-8 text-sky-200 animate-spin" style={{ animationDuration: '6s' }} />
            <p className="font-serif text-lg italic leading-relaxed text-white sm:text-xl font-medium">
              "No matter which night you choose, I hope you always find a little peace, warmth, and magic in it."
            </p>

            <button
              type="button"
              onClick={onComplete}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-sky-200/50 bg-gradient-to-r from-sky-100 via-indigo-100 to-sky-100 px-9 py-4 text-sm font-bold text-slate-900 shadow-[0_8px_30px_rgba(147,197,253,0.3)] transition-all hover:scale-104 hover:shadow-[0_12px_40px_rgba(147,197,253,0.5)] focus:outline-none"
            >
              <span>Continue the Mystery</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkyChooser;