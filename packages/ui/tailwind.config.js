/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0038FF',
        secondary: '#1D2939',
        lightgray: '#D0D5DD'
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
