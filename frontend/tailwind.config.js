/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pocket-bg': '#0F0F0F',
        'pocket-card': '#1A1A1A',
        'pocket-border': '#2A2A2A',
        'pocket-orange': '#FF4500',
        'pocket-orange-dim': '#CC3700',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
