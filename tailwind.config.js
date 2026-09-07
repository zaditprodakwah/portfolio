/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: '#0f172a',
          mid: '#1e293b',
          border: '#e2e8f0',
        },
        teal: {
          accent: '#0d9488',
          glow: '#14b8a6',
        },
        gold: {
          accent: '#d97706',
        },
        alabaster: '#f8fafc',
        offwhite: '#f1f5f9',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
