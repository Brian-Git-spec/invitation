/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep Obsidian/Black
        dark: '#0a0a0a',
        // Classic Graduation Gold
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Recommended for headers
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}