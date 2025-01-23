export default {
  content: ['./src/**/*.tsx', './src/**/*.css'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
      },
      fontFamily: {
        Figtree: ['Figtree', 'serif'],
      },
    },
    plugins: [
      function ({ addBase }) {
        addBase({
          h1: {
            margin: '0',
          },
          p: {
            margin: '0',
          },
        });
      },
    ],
  },
};
