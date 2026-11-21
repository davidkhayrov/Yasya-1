/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        rose: {
          50: '#fff5f7',
          100: '#ffe4ec',
          200: '#ffc9da',
          300: '#ffa6c2',
          400: '#ff7da8',
          500: '#f75c91',
          600: '#e63f76',
        },
        cream: {
          50: '#fffdfa',
          100: '#fdf6ec',
          200: '#f8ebd9',
        },
        gold: {
          300: '#f0d9a3',
          400: '#e6c481',
          500: '#d4a857',
          600: '#b8893c',
        },
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        flipIn: {
          '0%': { opacity: '0', transform: 'rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateX(0)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        heartRise: {
          '0%': { transform: 'translateY(0) scale(0.5) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-110vh) scale(1.2) rotate(40deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 30px 0 rgba(255,166,194,0.35), 0 0 60px 0 rgba(247,92,145,0.15)' },
          '50%': { boxShadow: '0 0 45px 5px rgba(255,166,194,0.5), 0 0 90px 10px rgba(247,92,145,0.25)' },
        },
        buttonShine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'pop-in': 'popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'flip-in': 'flipIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};
