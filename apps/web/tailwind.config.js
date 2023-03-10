/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/*/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0038FF',
        secondary: '#1D2939',
        lightgray: '#D0D5DD'
      },
      animation: {
        gradient: 'gradient 1s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text|bg)/,
    },
  ],
};
