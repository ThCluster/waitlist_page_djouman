import React from 'react';
import { motion, Variants } from 'motion/react';

interface FooterSectionProps {
  variants?: Variants;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ variants }) => {
  return (
    <motion.footer
      variants={variants}
      initial={variants ? undefined : { opacity: 0 }}
      animate={variants ? undefined : { opacity: 1 }}
      transition={variants ? undefined : { duration: 0.8, delay: 0.7, ease: 'easeOut' }}
      className="w-full text-center mt-auto pt-8 pb-8 flex flex-col gap-1 text-[#888888] text-xs md:text-sm"
    >
      <p>Abidjan, Côte d'Ivoire — 2026</p>
      <p>© Djouman — Tous droits réservés</p>
    </motion.footer>
  );
};

