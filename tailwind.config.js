/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        'acid-green': '#CCFF00',
        'acid-green-dark': '#99CC00',
        'industrial-gray': '#1a1a1a',
        'industrial-gray-light': '#2d2d2d',
        'industrial-gray-lighter': '#3d3d3d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(204, 255, 0, 0.3)',
        'neon-green-lg': '0 0 40px rgba(204, 255, 0, 0.5)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.8' },
        },
      },
    },
  },
  plugins: [],
};
