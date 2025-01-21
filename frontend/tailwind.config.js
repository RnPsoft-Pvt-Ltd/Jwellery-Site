/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],

  theme: {
    extend: {
      fontFamily:{
        italiana: ['Italiana', 'serif'],
        albert: ['Albert Sans', 'serif'],
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

