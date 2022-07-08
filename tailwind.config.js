const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_red: "#DC3E22",
        primary: "#333333",
        custom_green: "#A8B64F",
        custom_green_hover: "#899441",
        gray_c4: "#c4c4c4",
        gray_f4: "#f4f4f4",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
      transitionDuration: {
        DEFAULT: "400ms",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, theme, addUtilities }) => {
      addComponents({
        ".btn-primary": {
          backgroundColor: theme("colors.custom_green"),
          color: "white",
          border: "2px solid #c4c4c4",
          borderColor: theme("colors.custom_green"),
          padding: "15px 50px",
          fontSize: "1rem",
          lineHeight: "17px",

          "&:hover": {
            backgroundColor: theme("colors.custom_green_hover"),
            borderColor: theme("colors.custom_green_hover"),
          },
        },
        ".btn-hollow": {
          backgroundColor: "transparent",
          color: theme("colors.gray_c4"),
          border: "2px solid #c4c4c4",
          padding: "15px 50px",
          fontSize: "1rem",
          lineHeight: "17px",

          "&:hover": {
            backgroundColor: theme("colors.custom_green_hover"),
            borderColor: theme("colors.custom_green_hover"),
            color: "white",
          },
        },
        ".btn-danger": {
          backgroundColor: "transparent",
          color: theme("colors.custom_red"),
          padding: "15px 50px",
          border: "2px solid #DC3E22",
          fontSize: "1rem",
          lineHeight: "17px",

          "&:hover": {
            backgroundColor: theme("colors.custom_red"),
            color: "white",
          },
        },
      });
    }),
  ],
};
