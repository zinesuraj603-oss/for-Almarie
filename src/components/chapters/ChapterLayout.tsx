import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import StarField from '../StarField';
import AudioController from '../AudioController';

type Theme = 'midnight' | 'rose' | 'atmospheric' | 'floral';

interface ChapterLayoutProps {
  title: string;
  onBack?: () => void;
  children: ReactNode;
  theme?: Theme;
}

export function ChapterLayout({ title, onBack, children, theme = 'midnight' }: ChapterLayoutProps) {
  const themeClasses = {
    midnight: 'from-[#070b1a] via-[#0a1024] to-[#05070f] text-slate-100',
    rose: 'from-[#2a1018] via-[#1f0b12] to-[#0a0406] text-rose-50',
    atmospheric: 'from-[#0e1629] via-[#1a2238] to-[#050a14] text-slate-100',
    floral: 'from-[#2c0a14] via-[#19050a] to-[#0a0204] text-rose-50',
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-b ${themeClasses[theme]} flex flex-col transition-colors duration-1000`}>
      <StarField />
      
      <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
        <AudioController />
      </div>

      {onBack && (
        <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-black/20 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm transition-colors hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Go back to previous chapter"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      )}

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-xl flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">{title}</p>
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default ChapterLayout;