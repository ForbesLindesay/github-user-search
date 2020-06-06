const {screens} = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.tsx',
  ],
  theme: {
    container: {
      center: true,
      padding: '5vw',
      screens: {xl: screens.xl},
    },
  },
  variants: {
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [],
}