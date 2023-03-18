/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        secondary: '#1D2939',
        lightgray: '#D0D5DD',
        silver: '#667085',
        bordergray: '#EAECF0',
        labelgray: '#98A2B3',
        gray: '#98A2B3',
        black: '#101828',
        lightred: '#FFEBEB',
        red: '#DC2626',
        lightblue: '#F3F5F9'
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
