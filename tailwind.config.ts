import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        toxic: {
          yellow: '#FFD513',
          light: '#FAFF34',
          accent: '#B4FF17'
        }
      }
    },
  },
  plugins: [],
} satisfies Config
