/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0d14',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(56, 189, 248, 0.2)',
          neonCyan: '#00f0ff',
          neonPurple: '#a855f7',
          neonAmber: '#f59e0b',
          neonGreen: '#10b981',
          neonRed: '#ef4444',
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,0,0,0) 70%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 240, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
