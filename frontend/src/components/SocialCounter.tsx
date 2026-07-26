import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Users } from 'lucide-react';

interface SocialCounterProps {
  count: number;
  variants?: Variants;
}

export const SocialCounter: React.FC<SocialCounterProps> = ({ count, variants }) => {
  const [displayCount, setDisplayCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500; // ms animation duration
    const startValue = displayCount;
    const endValue = count;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad formula
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayCount(endValue);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [count]);

  return (
    <motion.div
      variants={variants}
      initial={variants ? undefined : { opacity: 0, scale: 0.95 }}
      animate={variants ? undefined : { opacity: 1, scale: 1 }}
      transition={variants ? undefined : { duration: 0.6, delay: 0.35, ease: 'easeOut' }}
      className="flex items-center justify-center gap-2 my-4 md:my-6"
    >
      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#111111] border border-[#00FF7F]/20 shadow-[0_0_15px_rgba(0,255,127,0.08)]">
        <Users className="w-4 h-4 text-[#00FF7F]" />
        <span className="text-[#00FF7F] font-semibold text-sm md:text-base tracking-wide">
          + {displayCount} recruteurs déjà inscrits
        </span>
      </div>
    </motion.div>
  );
};

