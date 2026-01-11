/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'shadow-grow': 'shadow-grow 1s ease-in-out',
      },
      boxShadow: {
        default: '0px 4px 4px 0px #00000025',
      },
      colors: {
        chosen: '#20233F',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'shadow-grow': {
          '0%': {
            'box-shadow': '0px 0px 20px 30px transparent',
          },
          '50%': {
            'box-shadow': '0px 0px 100px 5px #4299e1',
          },
          '100%': {
            'box-shadow': '0px 0px 20px 30px transparent',
          },
        },
      },
    },
    screens: {
      lg: '75em', // 1200px
      md: '62em', // 992px
      sm: '48em', // 768px
      xl: '88em', // 1408px
      xs: '36em', // 576px
    },
  },
}
