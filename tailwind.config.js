/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0f172a',
          700: '#334155',
          500: '#64748b',
        },
        mint: {
          500: '#2dd4bf',
          600: '#14b8a6',
        },
        coral: {
          500: '#f97316',
        },
        sky: {
          500: '#38bdf8',
        },
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(15, 23, 42, 0.45)',
        card: '0 20px 50px -30px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
