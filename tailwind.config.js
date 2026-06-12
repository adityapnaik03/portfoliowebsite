/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          dark: '#030014',
          light: '#f8fafc',
        },
        card: {
          dark: 'rgba(17, 12, 46, 0.45)',
          light: 'rgba(255, 255, 255, 0.65)',
        },
        primary: {
          DEFAULT: '#6366f1', // Indigo
          glow: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#06b6d4', // Cyan
        },
        accent: {
          DEFAULT: '#a855f7', // Purple
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'neon-blue': '0 0 15px rgba(6, 182, 212, 0.4)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'neon-indigo': '0 0 15px rgba(99, 102, 241, 0.4)',
      }
    },
  },
  plugins: [],
}
