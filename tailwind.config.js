export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors:{
        'primary':{
          

        }
      },
      fontFamily: {
        Figtree: ['Figtree', 'serif'],
      }
    }
  }
};
