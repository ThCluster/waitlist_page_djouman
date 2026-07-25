import { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { LogoSection } from './components/LogoSection';
import { HeroSection } from './components/HeroSection';
import { SocialCounter } from './components/SocialCounter';
import { CountdownTimer } from './components/CountdownTimer';
import { EmailForm } from './components/EmailForm';
import { FooterSection } from './components/FooterSection';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

export default function App() {
  const [recruiterCount, setRecruiterCount] = useState<number>(247);

  useEffect(() => {
    // Fetch real count from Django REST API endpoint
    const fetchCount = async () => {
      try {
        let res = await fetch('http://localhost:8000/api/waitlist/').catch(() => null);
        if (!res || !res.ok) {
          res = await fetch('/api/waitlist/').catch(() => null);
        }
        if (res && res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number') {
            setRecruiterCount(data.count);
          }
        }
      } catch (err) {
        console.log('Using default waitlist count:', err);
      }
    };
    fetchCount();
  }, []);

  const handleSuccessSubmit = (newCount?: number) => {
    if (newCount) {
      setRecruiterCount(newCount);
    } else {
      setRecruiterCount((prev) => prev + 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F17] text-white flex flex-col justify-between items-center overflow-x-hidden bg-grid-pattern antialiased">
      {/* Subtle techy glow background accent */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] african-pattern-bg rounded-full blur-3xl opacity-60" />

      {/* Main Staggered Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-between min-h-screen py-4"
      >
        {/* TOP - Logo */}
        <LogoSection variants={itemVariants} />

        <main className="w-full flex-1 flex flex-col items-center justify-center my-auto py-4">
          {/* HERO - Mysterious tagline */}
          <HeroSection variants={itemVariants} />

          {/* COUNTER - Social proof */}
          <SocialCounter count={recruiterCount} variants={itemVariants} />

          {/* COUNTDOWN TIMER */}
          <CountdownTimer variants={itemVariants} />

          {/* EMAIL FORM */}
          <EmailForm
            currentCount={recruiterCount}
            onSuccessSubmit={handleSuccessSubmit}
            variants={itemVariants}
          />
        </main>

        {/* FOOTER */}
        <FooterSection variants={itemVariants} />
      </motion.div>
    </div>
  );
}

