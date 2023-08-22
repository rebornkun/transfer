/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "3xl": "1600px",
      "2xl": "1440px",
      xl: "1280px",
      lg: "1024px",
      md: "860px",
      sm: "640px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      custom: ["Poppins", "serif"], // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {
      colors: {
        white: "#fff",
        yellow: "#FABE28",
        blue: "#1B4C84",
        lightblue: "#e6e6fa",
        darkgrey: "#4B4B4B",
        lightgrey: "#A7AAB1",
        grey: "#DADADA",
        lightdark: "#0F0F0F",
        orange: "#FC9828",
        red: "#EF131A",
        darkpink: "#EE2C4C",
        green: "#39A54A",
      },
    },
  },
  plugins: [],
};
