/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#12121a',
        'text-primary': '#f8f9fa',
        'text-secondary': '#94a3b8',
        'card-bg': 'rgba(255, 255, 255, 0.04)',
        'card-border': 'rgba(255, 255, 255, 0.08)',
        'accent': '#2e5aac',
        'glass-bg': 'rgba(18, 18, 26, 0.85)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #2e5aac 0%, #4a90e2 100%)',
        'alert-gradient': 'linear-gradient(135deg, #ff8c00 0%, #d32f2f 100%)',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
