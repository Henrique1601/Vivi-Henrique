import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#1C1210",
        "night-2": "#241713",
        wine: "#6B2737",
        ember: "#C6541D",
        amber: "#E3A857",
        cream: "#F6ECDD",
        rose: "#D98C99",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-sora)", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "45%": { opacity: "0.85", filter: "brightness(0.9)" },
          "55%": { opacity: "0.95", filter: "brightness(1.05)" },
        },
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 3.2s ease-in-out infinite",
        floatUp: "floatUp 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
