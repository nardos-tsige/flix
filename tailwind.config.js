/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        //flix palette - warm editorial feel
        night: {
          base: '#0E0F0C',
          soft: '#1A1C18',
          card: '#222620',
          line: '#2E3329',
        },
        day: {
          base: '#FBF8F0',
          soft: '#F4EFE0',
          card: '#FFFFFF',
          line: '#E2DAC4',
        },
        brand: {
          gold: '#E4A11B',
          goldLight: '#F5C760',
          goldDark: '#A8760F',
          forest: '#1F4D3A',
          forestLight: '#2E6B52',
          clay: '#C8552F',
        },
        ink: {
          main: '#F5F2E8',
          soft: '#B8B3A0',
          muted: '#807A66',
          dark: '#1A1B16',
          darkSoft: '#4A4B42',
        },
      },
      fontFamily: {
        brand: ['Cormorant Garamond', 'Georgia', 'serif'],
        title: ['Fraunces', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'day-fade': 'linear-gradient(180deg, rgba(251,248,240,0) 0%, #FBF8F0 90%)',
        'night-fade': 'linear-gradient(180deg, rgba(14,15,12,0) 0%, #0E0F0C 90%)',
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