const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: false,
    content: ["./src/**/*.{js,jsx}"],
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      main: ["Helvetica Neue"],
      test: ["Comic Sans"],
    },
    extend: {
      colors: {
        backgroundcol: "#15202B",
        primary: "#202225",
        secondary: "#5865f2",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
};
