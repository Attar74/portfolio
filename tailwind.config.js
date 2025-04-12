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
    },
  },
  plugins: [],
};
