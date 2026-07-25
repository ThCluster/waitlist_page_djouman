import React from 'react';
import { motion, Variants } from 'motion/react';

interface LogoSectionProps {
  variants?: Variants;
}

export const LogoSection: React.FC<LogoSectionProps> = ({ variants }) => {
  return (
    <motion.header
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: -20 }}
      animate={variants ? undefined : { opacity: 1, y: 0 }}
      transition={variants ? undefined : { duration: 0.8, ease: 'easeOut' }}
      className="w-full flex flex-col items-center pt-8 pb-4 md:pt-10 md:pb-6"
    >
      <div className="flex items-center gap-3.5 md:gap-4">
        {/* Emblematic Djouman Icon with gradient background & glow */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent border border-emerald-500/35 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] relative group transition-all duration-300 hover:scale-105 hover:border-emerald-400">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-emerald-400 text-2xl md:text-3xl leading-none tracking-tighter">
            D
          </span>
          {/* Witness / Authenticity neon indicator node */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-pulse border-2 border-[#0B0F17] shadow-[0_0_10px_#10B981]" />
        </div>

        {/* Brand Text with Emerald gradient and certified dot */}
        <div className="flex items-baseline gap-1">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-black text-4xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(16,185,129,0.25)]">
            Djouman
          </span>
          {/* Inner certified emerald dot */}
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400 inline-block shadow-[0_0_10px_#10B981] ml-0.5" />
        </div>
      </div>

      {/* Solid thin green separator line below */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mt-8 md:mt-10" />
    </motion.header>
  );
};


