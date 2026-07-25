import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  variants?: Variants;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ variants }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 90,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Get or initialize target timestamp (90 days from initial visit)
    const STORAGE_KEY = 'djouman_launch_target_v1';
    let targetTime: number;

    const savedTarget = localStorage.getItem(STORAGE_KEY);
    if (savedTarget && !isNaN(parseInt(savedTarget, 10))) {
      targetTime = parseInt(savedTarget, 10);
    } else {
      // 90 days in milliseconds
      targetTime = Date.now() + 90 * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial setting
    setTimeLeft(calculateTimeLeft());

    // Interval updating real time every 1000ms
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBoxes = [
    { label: 'JOURS', value: timeLeft.days },
    { label: 'HEURES', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDES', value: timeLeft.seconds },
  ];

  return (
    <motion.section
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 20 }}
      animate={variants ? undefined : { opacity: 1, y: 0 }}
      transition={variants ? undefined : { duration: 0.8, delay: 0.45, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto my-6 md:my-8 px-4"
    >
      <div className="text-center mb-3">
        <span className="text-[#888888] text-xs md:text-sm font-medium uppercase tracking-[0.2em]">
          Lancement dans
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {timeBoxes.map((box) => (
          <div
            key={box.label}
            className="bg-[#111111] border border-[#222222] rounded-xl py-3 px-2 sm:py-4 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105"
          >
            <span className="text-[#00FF7F] font-bold text-2xl sm:text-3xl md:text-4xl font-['Space_Grotesk'] tracking-tight">
              {String(box.value).padStart(2, '0')}
            </span>
            <span className="text-[#888888] text-[10px] sm:text-xs font-medium tracking-wider mt-1 uppercase">
              {box.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

