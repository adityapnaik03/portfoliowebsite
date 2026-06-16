import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global Layout features
import ParticleBackground from './features/ParticleBackground';
import FloatingSocials from './features/FloatingSocials';
import BackToTop from './features/BackToTop';

// Main Sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Premium Loading Animation Screen Component
function LoadingScreen() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-slate-50 z-[9999] flex flex-col items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        {/* Animated logo badge */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md mb-8"
        >
          A
        </motion.div>
        
        {/* Dynamic Name Title */}
        <h1 className="text-xl font-bold text-slate-800 tracking-widest mb-2 font-sans text-center">
          ADITYA P NAIK
        </h1>
        <p className="text-xs text-slate-500 tracking-wider mb-8 text-center uppercase">
          Initializing Portfolio...
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        
        <span className="text-xs font-bold text-indigo-600 self-end">
          {percent}%
        </span>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Turn off loader after progress finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sync theme with HTML class - always light mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
    root.style.backgroundColor = '#f8fafc';
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative w-full overflow-hidden text-slate-700 bg-background-light min-h-screen bg-grid-pattern transition-colors duration-300">
          
          {/* Dynamic interactive elements */}
          <ParticleBackground />
          <FloatingSocials />
          <BackToTop />
          
          {/* Header navigation */}
          <Navbar />

          {/* Main portfolio sections */}
          <main className="w-full relative">
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Achievements />
            <Contact />
          </main>

          {/* Footer bar */}
          <Footer />
        </div>
      )}
    </>
  );
}
