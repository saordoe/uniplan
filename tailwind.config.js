/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "ml": "1.5rem",
      },
      colors: {
        "myblue": '#060610',
        "accent": '#181830',
        "coolgray": '#86869F',
        "navtext": '#434360',
        "second": '#1d1d1d',
        "offwhite": '#f6f4f5',
        "ooffwhite": '#e3dde0',
        "offblack": '#1f1f1f',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}