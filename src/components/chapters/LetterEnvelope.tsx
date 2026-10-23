import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface LetterEnvelopeProps {
  label: string;
  buttonLabel: string;
  onOpen: () => void;
}

export default function LetterEnvelope({
  label,
  buttonLabel,
  onOpen,
}: LetterEnvelopeProps) {
  return (
    <motion.div
      className="w-full max-w-md mx-auto text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative mx-auto mb-8 flex h-48 w-64 items-center justify-center sm:h-56 sm:w-80"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 rounded-xl border border-rose-200/30 bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 shadow-[0_20px_70px_rgba(244,114,182,0.18)]" />

        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              'linear-gradient(145deg, transparent 49.5%, rgba(159,18,57,0.12) 50%, transparent 50.5%)',
          }}
        />

        <motion.div
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-rose-50/80 bg-gradient-to-br from-rose-600 to-rose-900 text-rose-50 shadow-lg"
          whileHover={{ scale: 1.08, rotate: -5 }}
        >
          <Heart size={28} fill="currentColor" />
        </motion.div>

        <Sparkles
          className="absolute -right-2 top-2 text-rose-200"
          size={24}
        />
        <Sparkles
          className="absolute -left-3 bottom-5 text-amber-200"
          size={20}
        />
      </motion.div>

      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-rose-200/80">
        A little something for you
      </p>

      <h2 className="mb-7 font-serif text-2xl leading-relaxed text-rose-50 sm:text-3xl">
        {label}
      </h2>

      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2 rounded-full border border-rose-200/40 bg-rose-200/10 px-8 py-3 text-sm tracking-wide text-rose-50 shadow-lg transition-colors hover:bg-rose-200/20 focus:outline-none focus:ring-2 focus:ring-rose-200"
      >
        <span>{buttonLabel}</span>
        <Heart size={14} className="fill-current text-current" />
      </motion.button>
    </motion.div>
  );
}