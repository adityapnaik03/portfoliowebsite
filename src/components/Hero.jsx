import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Hero() {
  const titles = ['Web Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Explorer'];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriter effect logic
  useEffect(() => {
    const activePhrase = titles[currentTitleIndex];
    let timer;

    if (isDeleting) {
      // Deleting letter by letter
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length - 1));
        setTypingSpeed(45);
      }, typingSpeed);
    } else {
      // Typing letter by letter
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length + 1));
        setTypingSpeed(90);
      }, typingSpeed);
    }

    // Finished typing phrase, wait and start deleting
    if (!isDeleting && currentText === activePhrase) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } 
    // Finished deleting, shift to next phrase
    else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTitleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-transparent z-10"
    >
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[280px] h-[280px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left Side: Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">
            Welcome to my space
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight mb-4">
            Hi, I'm <span className="text-gradient">Aditya P Naik</span>
          </h1>
          
          <h2 className="text-lg sm:text-2xl font-semibold text-slate-600 dark:text-slate-200 mb-4 h-8 flex items-center">
            <span className="mr-2">I am a</span>
            <span className="text-indigo-500 dark:text-indigo-400 border-r-2 border-indigo-400 dark:border-indigo-400 pr-1 animate-pulse">
              {currentText}
            </span>
          </h2>
          
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
            Second-year B.Tech Student in Information Science and Engineering at NMAMIT. 
            Aspiring Software Developer and AI Enthusiast driven by curiosity, developing robust 
            applications, and exploring cutting-edge AI integrations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg hover:shadow-neon-blue transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download="Aditya_Naik_Resume.pdf"
              className="px-6 py-3 rounded-lg font-semibold border border-slate-300 dark:border-white/10 dark:glass-card-dark text-slate-700 dark:text-slate-200 hover:bg-slate-200/30 dark:hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              Download Resume
            </a>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex items-center gap-4 xl:hidden">
            <a href="https://github.com/adityapnaik" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors" aria-label="GitHub">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/adityapnaik" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/aditya.p.naik" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/adityapnaik" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors" aria-label="X (Twitter)">
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a href="mailto:adityapnaik@gmail.com" className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors" aria-label="Email">
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Profile Photo Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Rotating Gradient Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 animate-spin-slow opacity-80" />
            
            {/* Inner Black Core */}
            <div className="absolute inset-[3px] rounded-full bg-slate-900 z-10" />

            {/* Profile Avatar Image */}
            <img
              src="/images/profile.svg"
              alt="Aditya P Naik"
              className="absolute inset-[8px] rounded-full z-20 object-cover w-[calc(100%-16px)] h-[calc(100%-16px)] border-4 border-slate-800 dark:border-slate-900 bg-slate-800"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/profile.svg';
              }}
            />
            
            {/* Soft Floating Shadow Rings */}
            <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-pulse-slow pointer-events-none -z-10" />
            <div className="absolute -inset-8 rounded-full border border-purple-500/10 animate-float pointer-events-none -z-10" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
