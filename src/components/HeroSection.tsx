import React from 'react';
import { motion, Variants } from 'motion/react';

interface HeroSectionProps {
  variants?: Variants;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ variants }) => {
  return (
    <motion.section
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 20 }}
      animate={variants ? undefined : { opacity: 1, y: 0 }}
      transition={variants ? undefined : { duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      className="text-center px-4 max-w-2xl mx-auto my-6 md:my-8"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight md:leading-snug tracking-tight font-['Space_Grotesk']">
        Vous cherchez des talents.<br className="hidden sm:inline" /> Nous avons trouvé une nouvelle façon de les trouver.
      </h1>

      <p className="mt-4 text-[#888888] text-base sm:text-lg md:text-xl font-normal leading-relaxed">
        Quelque chose de grand se prépare pour les professionnels RH et recruteurs.<br />
        Réservez votre accès prioritaire dès maintenant.
      </p>
    </motion.section>
  );
};

