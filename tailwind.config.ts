import { transform } from "zod";

module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
};
