import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FDF7F5',
          100: '#F7EBE7',
          200: '#EBD0C7',
          300: '#D9ABA0',
          400: '#BF7869',
          500: '#8E3F2E',
          600: '#6E2D1D',
          700: '#552114',
          800: '#451B0E', // Primary Dark Burgundy
          900: '#2F1108',
          950: '#1C0904',
        },
        gold: {
          50: '#FAF6EE',
          100: '#F3E9D4',
          200: '#E7D4AD',
          300: '#DBBE85',
          400: '#D0AB63',
          500: '#C9A45C', // Secondary Champagne Gold
          600: '#B08B42',
          700: '#8C6C30',
          800: '#695025',
          900: '#48361B',
        },
        ivory: {
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F8F5EF', // Background Warm Ivory
          300: '#EDE7DC',
          400: '#E8DDCA', // Accent Muted Beige
          500: '#D5C7B0',
        },
        charcoal: {
          50: '#F5F5F4',
          100: '#E7E6E4',
          200: '#CFCFCA',
          300: '#A9A7A0',
          400: '#7B7871',
          500: '#54524B',
          600: '#3D3B36',
          700: '#2D2B27',
          800: '#24211E', // Text Charcoal Black
          900: '#171614',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #DFBF7A 0%, #C9A45C 50%, #9E7B34 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
