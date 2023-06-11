/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        hoveredprimary: '#005ce6',
        secondary: '#1D2939',
        lightgray: '#D0D5DD',
        textgray: '#475467',
        bordergray: '#EAECF0',
        silver: '#667085',
        labelgray: '#98A2B3',
        gray: '#98A2B3',
        darkgray: '#344054',
        black: '#101828',
        red: '#DC2626',
        lightred: '#DD8281',
        blue: '#BAD1FE',
        orange: '#DA6406',
        green: '#15B025',
        yellow: '#FFC700',
        lightyellow: '#EFD270',
        lightgreen: '#79C782',
        lightblue: '#F3F5F9',
        borderprimary: '#0066FF',
        backgroundprimary: '#0066FF33',
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
