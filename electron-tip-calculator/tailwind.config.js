/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ["'Comic Sans MS'", 'cursive']
      }
    },
  },
  plugins: [],
}

