/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          base: '#050505',
          soft: '#0F0F0F',
          card: '#181818',
          line: '#2A2A2A',
        },
        day: {
          base: '#FAFAFA',
          soft: '#F2F2F2',
          card: '#FFFFFF',
          line: '#E5E5E5',
        },
        brand: {
          gold: '#FAFAFA',
          goldLight: '#FFFFFF',
          goldDark: '#050505',
          forest: '#737373',
          forestLight: '#A3A3A3',
          clay: '#E07A5F',
        },
        ink: {
          main: '#FAFAFA',
          soft: '#B8B8B8',
          muted: '#737373',
          dark: '#0A0A0A',
          darkSoft: '#525252',
        },
      },
      fontFamily: {
        brand: ['Cormorant Garamond', 'Georgia', 'serif'],
        title: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'day-fade': 'linear-gradient(180deg, rgba(250,250,250,0) 0%, #FAFAFA 90%)',
        'night-fade': 'linear-gradient(180deg, rgba(5,5,5,0) 0%, #050505 90%)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glideIn: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        softly: {
          '0%,100%': { opacity: 0.5 },
          '50%': { opacity: 0.9 },
        },
      },
      animation: {
        drift: 'drift 5s ease-in-out infinite',
        glideIn: 'glideIn 0.45s cubic-bezier(0.2, 0.9, 0.3, 1) both',
        softly: 'softly 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}