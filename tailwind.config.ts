import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem", xl: "3rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        navy: { 50: "#f2f6fb", 100: "#e3ebf5", 200: "#c2d3e9", 300: "#93b0d6", 400: "#5d86bd", 500: "#3a66a2", 600: "#2b4f86", 700: "#24406d", 800: "#1b3054", 900: "#0f2140", 950: "#08152b" },
        accent: { green: "#1e7a46", red: "#c1272d" },
        neutral: { 0: "#ffffff", 50: "#f7f8f9", 100: "#eef0f2", 200: "#dfe3e7", 300: "#c4cbd2", 400: "#98a2ad", 500: "#6b7683", 600: "#4d5763", 700: "#3a424c", 800: "#262c33", 900: "#15191e" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
      },
      spacing: { section: "clamp(4rem, 10vw, 9rem)" },
      maxWidth: { prose: "68ch" },
      transitionTimingFunction: { architectural: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both" },
    },
  },
  plugins: [],
} satisfies Config;
