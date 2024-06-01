// DO NOT USE WHITE SPACE BETWEEN FILE EXTENSIONS IN `content`. it is tailwind css problem.
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        'md': '3px 3px 32px -10px rgba(0,0,0,0.75)',
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
