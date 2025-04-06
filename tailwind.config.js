/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  options: {
    safelist: ["bg-red-800", "bg-green-800"],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
