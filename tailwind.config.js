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
        primary: '#8A6729',
        secondary: '#EBC8B3',
        tertiary: '#CABA9C',
        accent: '#4C6444',
        dark: {
          DEFAULT: '#102820',
          100: '#1a3830',
          200: '#234840',
          300: '#2d5850',
          400: '#366860',
          500: '#407870'
        },
        light: {
          DEFAULT: '#F5F5F5',
          100: '#E5E5E5',
          200: '#D4D4D4',
          300: '#C4C4C4',
          400: '#B3B3B3',
          500: '#A3A3A3'
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary), 0 0 20px theme(colors.primary)',
        'neon-secondary': '0 0 5px theme(colors.secondary), 0 0 20px theme(colors.secondary)',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}