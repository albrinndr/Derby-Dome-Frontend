/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'stadium-background': "url('./src/assets/stadium-background.webp')",
        'form-image':"url('./src/assets/form-image.webp')"
      },
      colors:{
        customBg:'#F4F5F9',
        customColor:'#68BF14'
      }
    },
  },
  plugins: [],
};