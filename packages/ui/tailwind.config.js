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
        darkgray: '#344054',
        black: '#101828',
        lightred: '#FFEBEB',
        red: '#DC2626',
        blue: '#BAD1FE',
        lightblue: '#F3F5F9',
        borderprimary: "#0066FF",
        backgroundprimary: "#0066FF33"
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text|bg|border)/,
    },
  ],
};
