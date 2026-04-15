/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#a855f7',
        bgColor: '#0f172a',
        cardBg: 'rgba(30, 41, 59, 0.7)',
        low: '#22c55e',
        medium: '#eab308',
        high: '#ef4444',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
