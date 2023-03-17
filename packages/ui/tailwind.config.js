/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        secondary: '#1D2939',
        lightgray: '#D0D5DD',
        bordergray: '#EAECF0',
        labelgray: '#98A2B3',
        gray: '#98A2B3',
        black: '#101828',
        lightred: '#FFEBEB',
        red: '#DC2626'
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
