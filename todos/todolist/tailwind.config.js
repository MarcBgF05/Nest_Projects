/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      zinc1: '#f6f6f6',
      zinc2: '#e7e7e7',
      zinc3: '#d1d1d1',
      zinc4: '#b0b0b0',
      zinc5: '#888888',
      zinc6: '#6d6d6d',
      zinc7: '#5d5d5d',
      zinc8: '#4f4f4f',
      zinc9: '#454545',
      zinc10: '#3d3d3d',
      zinc11: '#202020',
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        
      },
    },
    extend: {},
  },
  plugins: [],
}
