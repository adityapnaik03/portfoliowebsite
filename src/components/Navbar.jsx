import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from '../features/ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 dark:glass-nav-dark glass-nav-light shadow-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-xl font-extrabold tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-neon-blue">
            A
          </span>
          <span>ADITYA</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:scale-105 transition-all duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="h-5 w-[1px] bg-slate-400/20 dark:bg-white/10" />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Header Buttons */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200/30 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full dark:glass-nav-dark glass-nav-light border-b border-slate-200/20 dark:border-white/10 overflow-hidden shadow-xl"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-400 active:text-cyan-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
