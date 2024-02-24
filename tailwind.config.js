/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#fc888b',
          200: '#d47476',
        },
      },
      fontFamily: {
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
