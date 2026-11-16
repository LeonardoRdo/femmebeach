import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        areia: { 50: "#F3ECDD", 100: "#E4DAC4", 200: "#D6C9AD" },
        terra: { 500: "#9A4F31", 600: "#82401F", 900: "#4A2A1B" },
      },
      fontFamily: { serif: ['"Cormorant Garamond"', "Georgia", "serif"], sans: ["Jost", "system-ui", "sans-serif"] },
      fontSize: {
        "fluid-h2": ["clamp(2.618rem,5vw,4.236rem)", { lineHeight: "1" }],
        "fluid-h1": ["clamp(3.2rem,8.2vw,9rem)", { lineHeight: ".95" }],
        "fluid-xl": ["clamp(2.618rem,6vw,6.854rem)", { lineHeight: ".98" }],
      },
      spacing: { 13: "13px", 21: "21px", 34: "34px", 55: "55px", 89: "89px", 144: "144px" },
      aspectRatio: { phi: "1 / 1.618", card: "1 / 1.382" },
      transitionTimingFunction: { apple: "cubic-bezier(.16,1,.3,1)" },
      gridTemplateColumns: { phi: "1.618fr 1fr" },
    },
  },
  plugins: [],
} satisfies Config;
