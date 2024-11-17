/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        SF_Pro_Regular: ['SF-Pro_Regular', 'sans-serif'],
        SF_PRO_Light: ['SF-Pro_Light', 'sans-serif'],
        SF_PRO_Thin: ['SF-Pro_Thin', 'sans-serif'],
        SF_PRO_Semibold: ['SF-Pro_Semibold', 'sans-serif'],
        geologica: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
