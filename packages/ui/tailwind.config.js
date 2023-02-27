/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#0038FF",
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(text)-(primary)/,
    },
  ],
};
