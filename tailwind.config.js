/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        wood: { DEFAULT: '#6b4a2c', dark: '#5a3e24' },
        cream: '#fdfbf7',
        sand: '#f3ece1',
        line: '#e6ded1',
        chip: '#d9cdb9',
        ink: { DEFAULT: '#33302c', soft: '#55504a', muted: '#6f675d', faint: '#78736c' },
        night: '#2b2320',
        amber: '#e3b57a',
      },
      fontFamily: {
        serif: ['Alegreya', 'Georgia', 'serif'],
        sans: ['"Alegreya Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
