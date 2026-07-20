export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1F7A6C',
          dark: '#155A50',
        },
        coral: '#FF6B5B',
        ink: '#1B1B2F',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}