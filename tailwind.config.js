/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{jsx,js}", "./src/components/*.{jsx,js}", "./src/pages/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#9333ea',
        secondary: '#f3e8ff',
        text_primary: '#3b0764',
        text_secondary: '#faf5ff',
      }
    },
  },
  plugins: [],
}

