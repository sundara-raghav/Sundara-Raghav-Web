/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-dark': '#020617', // Slate 950 (Very dark blue)
        'brand-light': '#f8fafc', // Slate 50
        'accent-primary': '#3b82f6', // Blue 500 (Vibrant Blue)
        'accent-secondary': '#06b6d4', // Cyan 500 (Electric Cyan)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
