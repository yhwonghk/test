/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-red': '#CC0000',
        'chess-black': '#333333',
        'chess-board': '#F5DEB3',
        'chess-line': '#8B4513'
      },
      fontFamily: {
        'chinese': ['SimHei', 'Microsoft YaHei', 'sans-serif']
      }
    },
  },
  plugins: [],
}