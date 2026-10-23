import { playCorrectSound, playWrongSound } from '../../utils/sound';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import type { QuizChapterContent } from '../../types/content';

interface QuizCardProps {
  chapter: QuizChapterContent;
  onComplete: () => void;
}

type QuizStatus = 'idle' | 'wrong' | 'correct';

let sharedAudioContext: AudioContext | null = null;

async function playFeedbackSound(
  kind: 'wrong' | 'correct',
  enabled: boolean,
) {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      console.warn('This browser does not support Web Audio.');
      return;
    }

    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioContextClass();
    }

    const audio = sharedAudioContext;

    if (audio.state === 'suspended') {
      await audio.resume();
    }

    const notes =
      kind === 'correct'
        ? [
            { frequency: 659.25, delay: 0 },
            { frequency: 783.99, delay: 0.13 },
            { frequency: 1046.5, delay: 0.26 },
          ]
        : [
            { frequency: 220, delay: 0 },
            { frequency: 165, delay: 0.14 },
          ];

    const startAt = audio.currentTime + 0.02;

    notes.forEach(({ frequency, delay }) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = startAt + delay;
      const duration = kind === 'correct' ? 0.3 : 0.24;

      oscillator.type = kind === 'correct' ? 'sine' : 'triangle';
      oscillator.frequency.setValueAtTime(frequency, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(
        kind === 'correct' ? 0.12 : 0.07,
        start + 0.025,
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        start + duration,
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start(start);
      oscillator.stop(start + duration + 0.02);

      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    });
  } catch (error) {
    console.error('Quiz sound could not play:', error);
  }
}

export function QuizCard({ chapter, onComplete }: QuizCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const reduceMotion = useReducedMotion();

    const handleSelect = (id: string) => {
    if (status === 'correct') return; // Already solved
    setSelectedId(id);

    if (id === chapter.correctOptionId) {
      setStatus('correct');
      void playFeedbackSound('correct', soundEnabled);
      playCorrectSound();
    } else {
      setStatus('wrong');
      void playFeedbackSound('wrong', soundEnabled);
      playWrongSound();
    }
  };

  const handleRetry = () => {
    setSelectedId(null);
    setStatus('idle');
  };

  return (
    <motion.section
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: 'easeOut' }}
      className="relative mx-auto flex w-full max-w-xl flex-col items-center"
    >
      <div className="absolute -top-8 right-0">
        <button
          type="button"
          onClick={() => setSoundEnabled((value) => !value)}
          aria-label={soundEnabled ? 'Turn quiz sounds off' : 'Turn quiz sounds on'}
          title={soundEnabled ? 'Quiz sounds on' : 'Quiz sounds off'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-100/15 bg-white/5 text-amber-100/75 transition hover:bg-white/10"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      <motion.div
        animate={
          status === 'wrong' && !reduceMotion
            ? { x: [0, -5, 5, -3, 3, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.32 }}
        className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100/20 bg-amber-100/5 text-amber-100 shadow-[0_0_35px_rgba(251,191,36,0.07)]"
      >
        <Sparkles size={30} strokeWidth={1.4} />
      </motion.div>

      <p className="mb-3 text-xs font-medium tracking-[0.3em] text-amber-100/60">
        CHAPTER 01 · HER LITTLE WORLD
      </p>

      <h2 className="mb-4 text-center font-serif text-3xl leading-tight text-slate-50 sm:text-4xl">
        {chapter.question}
      </h2>

      <p className="mb-8 max-w-md text-center text-sm leading-7 text-slate-300/65">
        A little question about someone special. Choose the answer that feels right.
      </p>

      <div className="mb-7 flex w-full flex-col gap-3">
        {chapter.options.map((option, index) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = option.id === chapter.correctOptionId;
          const showCorrect = status === 'correct' && isCorrectOption;
          const showWrong = status === 'wrong' && isSelected;

          let style: CSSProperties = {
            borderColor: 'rgba(148,163,184,.18)',
            background: 'rgba(15,23,42,.48)',
          };

          if (showCorrect) {
            style = {
              borderColor: 'rgba(110,231,183,.65)',
              background: 'rgba(6,78,59,.3)',
              boxShadow: '0 0 28px rgba(52,211,153,.09)',
            };
          } else if (showWrong) {
            style = {
              borderColor: 'rgba(253,164,175,.6)',
              background: 'rgba(136,19,55,.22)',
            };
          }

          return (
            <motion.button
              key={option.id}
              type="button"
              disabled={status !== 'idle'}
              onClick={() => handleSelect(option.id)}
              whileHover={
                status === 'idle' && !reduceMotion
                  ? { y: -2, scale: 1.005 }
                  : undefined
              }
              whileTap={status === 'idle' ? { scale: 0.99 } : undefined}
              className="relative flex min-h-[62px] w-full items-center gap-4 rounded-xl border px-5 py-4 text-left text-slate-100 transition-colors duration-300 disabled:cursor-default"
              style={style}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/55">
                {String.fromCharCode(65 + index)}
              </span>

              <span className="flex-1 text-sm font-medium sm:text-base">
                {option.label}
              </span>

              {showCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
              )}

              {showWrong && (
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-300" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {status === 'wrong' && (
          <motion.div
            key="wrong"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5 }}
            className="w-full rounded-2xl border border-rose-300/15 bg-rose-950/20 p-5 text-center"
          >
            <p className="flex items-center justify-center gap-2 text-sm font-medium text-rose-200">
              <AlertCircle size={17} />
              Not quite right!
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300/80">
              Hint: {chapter.hint}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-full border border-rose-200/20 px-5 py-2 text-sm text-rose-100 transition hover:bg-rose-200/10"
            >
              Try again ↻
            </button>
          </motion.div>
        )}

        {status === 'correct' && (
          <motion.div
            key="correct"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-2xl border border-emerald-200/20 bg-emerald-950/20 p-5 text-center"
          >
            <motion.div
              initial={reduceMotion ? { scale: 1 } : { scale: 0.5, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
              className="mb-3 inline-flex text-emerald-200"
            >
              <Sparkles size={27} />
            </motion.div>

            <p className="text-sm font-medium leading-7 text-emerald-100">
              {chapter.successMessage}
            </p>

            <p className="mt-2 text-xs text-emerald-100/55">
              You found the right answer.
            </p>

            <button
              type="button"
              onClick={onComplete}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-amber-100/30 bg-amber-100 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.12)] transition hover:bg-white"
            >
              Continue the Mystery <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-7 text-center text-xs tracking-wide text-slate-400/45">
        Follow the little stars… some secrets hide in plain sight.
      </p>
    </motion.section>
  );
}

export default QuizCard;
