/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",

  ],
  theme: {
    fontFamily: {
      display: ["Satisfy", "cursive"],
    },
    extend: {
      colors: {
        'ak-light-blue': '#3081FA',
        'crx-red': '#FF755F',
        'ak-dark-blue': '#001338',
        'ak-yellow': '#FFEC1F'
      },
    }

  },
  plugins: [require("daisyui")],
}

