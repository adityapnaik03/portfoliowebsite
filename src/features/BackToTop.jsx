import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate current scroll progress percentage
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const progress = (window.scrollY / totalScrollHeight) * 100;
        setScrollProgress(progress);
      }

      // Toggle visibility
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG parameters for the progress circle
  const radius = 18;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full glass-card-light text-indigo-600 border border-slate-200 hover:scale-110 active:scale-95 shadow-lg transition-transform duration-300"
          aria-label="Scroll back to top"
        >
          {/* Progress Circle background */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="rgba(79, 70, 229, 0.1)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Active progress path */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#progressGrad)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
            {/* Gradients */}
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          
          <FaArrowUp className="w-4 h-4 text-indigo-600" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
