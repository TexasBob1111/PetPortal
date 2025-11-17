/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f1ed',
        'warm-gray': '#e8e3dd',
        'warm-brown': '#8b7b6f',
        'dark-brown': '#3a3330',
        'accent-warm': '#d4a574',
      },
      fontFamily: {
        serif: ['Crimson Pro', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      lineHeight: {
        'tight': '1.2',
        'relaxed': '1.5',
      },
    },
  },
  plugins: [],
}
