/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F0C97B',
          DEFAULT: '#D4A44A',
          hover: '#E5B55B',
          dark: '#B08030',
          accent: '#C79A56',
          muted: 'rgba(212, 164, 74, 0.15)',
          glow: 'rgba(212, 164, 74, 0.25)',
        },
        obsidian: {
          950: '#03080E',
          900: '#060D15',
          850: '#0B1724',
          800: '#101F30',
          700: '#162A40',
          600: '#1F3A58',
        },
        ivory: {
          50: '#FAF8F5',
          100: '#F7F5F0',
          200: '#F5F1E8',
          300: '#EAE5DA',
          400: '#D5CDC0',
        },
        slate: {
          text: '#121B24',
          muted: '#8C8375',
          subtle: '#6B7280',
          lightMuted: '#9EAFBF',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 164, 74, 0.25)',
        'gold-sm': '0 4px 15px rgba(212, 164, 74, 0.15)',
        'luxury': '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(212, 164, 74, 0.12)',
        'card-dark': '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      }
    },
  },
  plugins: [],
}
