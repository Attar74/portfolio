/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#111111',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '25%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(6deg)' },
          '75%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
      },
      boxShadow: {
        glow: '0 0 15px rgba(255, 255, 255, 0.5)',
        'blue-glow': '0 0 15px rgba(59, 130, 246, 0.6)',
      },
      utilities: {
        '.perspective-500': {
          perspective: '500px',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      },
    },
  },
  plugins: [],
};
