/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        gold: {
          DEFAULT: '#C9A962',
          light: '#E8D5A3',
          dark: '#A68B4E',
          50: '#FDF8EF',
          100: '#FAF0DA',
          200: '#F5E2B5',
          300: '#EED48E',
          400: '#E0BC60',
          500: '#C9A962',
          600: '#A68B4E',
          700: '#8A7042',
          800: '#6E5936',
          900: '#544428',
        },
        navy: {
          DEFAULT: '#1B2A4A',
          light: '#2A3F6B',
          dark: '#111C33',
          50: '#E8EAF0',
          100: '#C5CDE0',
          200: '#9BADC5',
          300: '#718DAA',
          400: '#476D90',
          500: '#2A3F6B',
          600: '#1B2A4A',
          700: '#15213A',
          800: '#0F1729',
          900: '#0A0D19',
        },
        ivory: '#FAFAF5',
        charcoal: '#1A1714',

        // Semantic
        success: {
          DEFAULT: '#2D7A4F',
          light: '#E8F5EE',
          dark: '#1E5A38',
        },
        warning: {
          DEFAULT: '#C4882D',
          light: '#FEF3E2',
          dark: '#9A6A22',
        },
        error: {
          DEFAULT: '#C0392B',
          light: '#FDE8E6',
          dark: '#962D22',
        },
        info: {
          DEFAULT: '#2E86AB',
          light: '#E6F3F9',
          dark: '#1F6A89',
        },

        // Adaptive
        'app-bg': 'var(--color-background)',
        'app-surface': 'var(--color-surface)',
        'app-text': 'var(--color-text)',
        'app-text-secondary': 'var(--color-text-secondary)',
        'app-border': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'System', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      fontSize: {
        display: ['32px', { lineHeight: '40px', letterSpacing: '-0.5px' }],
        h1: ['26px', { lineHeight: '34px', letterSpacing: '-0.3px' }],
        h2: ['20px', { lineHeight: '28px' }],
        body: ['16px', { lineHeight: '24px' }],
        caption: ['13px', { lineHeight: '18px' }],
        button: ['15px', { lineHeight: '20px' }],
        price: ['18px', { lineHeight: '24px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      shadows: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        elevated: '0 4px 16px rgba(0, 0, 0, 0.12)',
        modal: '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
