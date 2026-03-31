/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50:  '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7d927d',
          500: '#5f745f',
          600: '#4a5c4a',
          700: '#3b4a3b',
          800: '#2f3c2f',
          900: '#1e261e',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft':    '0 2px 8px 0 rgba(0,0,0,0.06)',
        'medium':  '0 4px 16px 0 rgba(0,0,0,0.08)',
        'lifted':  '0 8px 32px 0 rgba(0,0,0,0.10)',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
};