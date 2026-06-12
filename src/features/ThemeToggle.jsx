import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="p-2.5 rounded-full border border-slate-200/20 dark:border-white/10 glass-card-light dark:glass-card-dark text-slate-800 dark:text-slate-100 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
      aria-label="Toggle Light/Dark Theme"
    >
      {theme === 'dark' ? (
        <IoSunnyOutline className="w-5 h-5 text-yellow-400 animate-spin-slow" />
      ) : (
        <IoMoonOutline className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
}
