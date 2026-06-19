/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#0284c7',
        'sky-light': '#e0f2fe',
        'storm-gray': '#1e293b',
        'cloud-white': '#f8fafc',
      },
      backgroundImage: {
        'gradient-dawn': 'linear-gradient(135deg, #fef3c7 0%, #fecaca 100%)',
        'gradient-day': 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
        'gradient-dusk': 'linear-gradient(135deg, #f87171 0%, #7c3aed 100%)',
        'gradient-night': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
