import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0d0d0d",
          light: "#141414",
          card: "#141414",
          charcoal: "#1a1a1a",
        },
        ivory: "#F8F0EB",
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "#B8962E",
          muted: "var(--gold-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        accent: ["var(--font-cormorant)", "serif"],
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
