/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cb-black': '#000000',
        'cb-gold': '#FFD700',
        'cb-gray': '#1F1F1F'
      }
    },
  },
  plugins: [],
}