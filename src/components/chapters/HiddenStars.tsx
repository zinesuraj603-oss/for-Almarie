import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HiddenStarsProps {
  starIds: string[];
  discoveredStars: string[];
  onDiscoverStar: (id: string) => void;
}

export function HiddenStars({ starIds, discoveredStars, onDiscoverStar }: HiddenStarsProps) {
  const reduceMotion = useReducedMotion();
  
  const positions = useMemo(
    () =>
      starIds.map((_, index) => ({
        top: `${((index * 37 + 23) % 60) + 20}%`,
        left: `${((index * 47 + 19) % 80) + 10}%`,
      })),
    [starIds]
  );

  if (!starIds || starIds.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {starIds.map((id, index) => {
        // Use the prop instead of the hook
        const isDiscovered = discoveredStars.includes(id);
        if (isDiscovered) return null; 

        return (
          <motion.button
            key={id}
            className="absolute pointer-events-auto p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
            style={positions[index]}
            onClick={() => onDiscoverStar(id)} // Use the prop callback
            aria-label="A hidden star. Click to discover."
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: reduceMotion ? 0.001 : 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.5, opacity: 1 }}
            whileTap={reduceMotion ? undefined : { scale: 0.9 }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.8)]"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
}