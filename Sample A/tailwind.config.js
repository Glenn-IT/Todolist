/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        sky: {
          400: '#60a5fa',
        },
      },
      keyframes: {
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-16px) scale(0.97)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        slideOut: {
          '0%':   { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(30px) scale(0.95)' },
        },
        blobFloat: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%':       { transform: 'translate(30px,40px) scale(1.08)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':       { transform: 'scale(1.12)' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%':     { transform: 'translateX(-7px)' },
          '40%':     { transform: 'translateX(7px)' },
          '60%':     { transform: 'translateX(-4px)' },
          '80%':     { transform: 'translateX(4px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideIn:    'slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        slideOut:   'slideOut 0.25s ease forwards',
        blobFloat:  'blobFloat 10s ease-in-out infinite alternate',
        blobFloat2: 'blobFloat 10s ease-in-out 5s infinite alternate',
        pulseSlow:  'pulseSlow 3s ease-in-out infinite',
        shake:      'shake 0.4s ease',
        fadeIn:     'fadeIn 0.4s ease',
      },
    },
  },
  plugins: [],
}


