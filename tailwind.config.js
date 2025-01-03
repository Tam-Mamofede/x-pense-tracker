export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        before8: "before8 2s infinite",
        after6: "after6 2s infinite",
      },
      keyframes: {
        before8: {
          "0%": {
            width: "0.5em",
            boxShadow:
              "1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75)",
          },
          "35%": {
            width: "2.5em",
            boxShadow:
              "0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75)",
          },
          "70%": {
            width: "0.5em",
            boxShadow:
              "-1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75)",
          },
          "100%": {
            boxShadow:
              "1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75)",
          },
        },
        after6: {
          "0%": {
            height: "0.5em",
            boxShadow:
              "0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75)",
          },
          "35%": {
            height: "2.5em",
            boxShadow:
              "0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75)",
          },
          "70%": {
            height: "0.5em",
            boxShadow:
              "0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75)",
          },
          "100%": {
            boxShadow:
              "0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75)",
          },
        },
      },
    },
  },
  plugins: [],
};
