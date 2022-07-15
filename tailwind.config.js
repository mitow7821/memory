/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#162938",
        primary: "#31485a",
        secondary: "#bcceda",
        gray: "#e4ebf0",
        accent: "#fda215",
      },
    },
  },
  plugins: [],
};
