/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        bg: '#080808',
        surface: '#111111',
        border: '#1a1a1a',
        accent: '#c8f65d',
        'accent-2': '#7df9ff',
        muted: '#666666',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
}
