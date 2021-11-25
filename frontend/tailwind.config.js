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
        lg: "1000px",
        xl: "1000px",
        "2xl": "1000px",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
