/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'DM Serif Display'", "'Playfair Display'", 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#F0F9E8', // soft green background
          100: '#E6F4D9',
          200: '#C8E6B5',
          300: '#A3D98A',
          400: '#7DCB5F',
          500: '#57BD34',
          600: '#3E9A27',
          700: '#2C6B1A',
          800: '#1A3C0D',
          900: '#0A1B04',
        },
        bluebg: {
          50: '#F0F6FF', // light blue background
          100: '#D6E6FF',
          200: '#B3D4FF',
          300: '#7CB8FF',
          400: '#479CFF',
          500: '#1E7FFF',
          600: '#1763CC',
          700: '#104799',
          800: '#0A2C66',
          900: '#041133',
        },
        accent: {
          50: '#FFFDEB', // soft yellow
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFEB3B',
        },
        editorial: '#234D2C', // dark green for headings
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '2rem',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
} 