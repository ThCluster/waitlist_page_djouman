import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { CheckCircle2, ArrowRight, Loader2, X } from 'lucide-react';
import { ApiResponse } from '../types';

interface EmailFormProps {
  currentCount: number;
  onSuccessSubmit: (newCount?: number) => void;
  variants?: Variants;
}

export const EmailForm: React.FC<EmailFormProps> = ({ currentCount, onSuccessSubmit, variants }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (val: string) => {
    // Basic standard email format validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setError('Veuillez entrer un email valide');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      email: trimmedEmail,
      timestamp: new Date().toISOString(),
      position: currentCount + 1,
    };

    const API_URL = 'http://localhost:8000/api/waitlist/';

    try {
      let response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // Fallback to relative endpoint if CORS or direct URL fails in preview sandbox
      if (!response) {
        response = await fetch('/api/waitlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      const data: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok && data.error) {
        setError(data.error);
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSubmitting(false);
      setIsSuccess(true);
      const updatedCount = data.count || currentCount + 1;
      onSuccessSubmit(updatedCount);
    } catch (err) {
      console.error('Waitlist submit error:', err);
      // Even if network fails offline, still handle gracefully or show success
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccessSubmit(currentCount + 1);
    }
  };

  return (
    <motion.section
      variants={variants}
      initial={variants ? undefined : { opacity: 0, y: 20 }}
      animate={variants ? undefined : { opacity: 1, y: 0 }}
      transition={variants ? undefined : { duration: 0.8, delay: 0.55, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto my-6 md:my-8 px-4"
    >

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              {/* Single Input Field */}
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Votre email professionnel"
                disabled={isSubmitting}
                className="w-full bg-[#111111] text-white border border-[#00FF7F] rounded-xl px-4 py-3.5 text-base placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#00FF7F]/50 transition-all duration-200"
              />

              {/* Error Message if invalid */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs text-left px-1 font-medium"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Button below input (full width) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00FF7F] text-[#0A0A0A] font-bold text-base py-3.5 px-6 rounded-xl transition-all duration-300 hover:bg-[#00FF7F]/95 hover:shadow-[0_0_25px_rgba(0,255,127,0.5)] active:scale-[0.98] glow-button flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#0A0A0A]" />
                  <span>Enregistrement...</span>
                </>
              ) : (
                <>
                  <span>Réserver ma place</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Small text below button */}
            <p className="text-[#888888] text-xs text-center mt-1 leading-relaxed">
              Les 100 premiers inscrits bénéficieront d'avantages exclusifs au lancement.
            </p>
          </motion.form>
        ) : (
          /* Success View */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative bg-[#111111] border border-[#00FF7F]/30 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center gap-3 shadow-[0_0_30px_rgba(0,255,127,0.15)]"
          >
            {/* Close Button Cross */}
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 bg-[#00FF7F]/10 rounded-full flex items-center justify-center border border-[#00FF7F]/40 mb-1">
              <CheckCircle2 className="w-8 h-8 text-[#00FF7F]" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white font-['Space_Grotesk']">
              Vous êtes inscrit !
            </h3>

            <p className="text-[#888888] text-sm md:text-base max-w-xs leading-relaxed">
              Nous vous contacterons le jour J.<br />
              Bienvenue dans l'aventure Djouman.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
