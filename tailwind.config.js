/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#23001E",
        "primary-light": "#3A1434",
        accent: "#F0A84A",
        "accent-dark": "#C28240",
        brand: "#9E0059",
        "brand-hover": "#B10063",
        "text-secondary": "#A08B99",
        "bg-light": "#F5F2F0",
        border: "#E7DFDB",
        "blue-800": "#2E346E",
        "stone-900": "#232624",
        "stone-400": "#f5f0f0",
        "stone-300": "#D9D9D9",
        "stone-100": "#EDEDED",
      },
    },
  },
  plugins: [],
};
