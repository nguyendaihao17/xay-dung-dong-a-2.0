import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // === Màu thương hiệu Đông Á ===
        navy: {
          50:  "#f0f5fa",
          100: "#dae6f1",
          200: "#b5cce4",
          300: "#8aaecf",
          400: "#5b8bb5",
          500: "#3d6e9c",
          600: "#2c557f",
          700: "#1f4067",
          800: "#162f4d",
          900: "#0d1f36",  // navy đậm chủ đạo
          950: "#071322",
        },
        accent: {
          DEFAULT: "#e85d2a",  // cam nhấn
          hover:   "#d14a1a",
          light:   "#fff1eb",
          red:     "#c1272d",  // đỏ cho nút xóa
          green:   "#22a06b",  // xanh lá
          yellow:  "#f5a623",
        },
        // Màu neutral (xám)
        neutral: {
          50:  "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Shadcn-style tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["4rem",    { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["3rem",    { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-3": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "header-height":        "80px",
        "header-height-mobile": "64px",
      },
      boxShadow: {
        card:  "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        lift:  "0 10px 30px -10px rgb(13 31 54 / 0.15)",
        glow:  "0 0 40px -10px rgb(232 93 42 / 0.4)",
      },
      keyframes: {
        "fade-in":   { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-up":   { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in":  { from: { transform: "translateX(-100%)" },               to: { transform: "translateX(0)" } },
        "marquee":   { from: { transform: "translateX(0)" },                   to: { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-in":  "fade-in 0.5s ease-out",
        "fade-up":  "fade-up 0.7s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "marquee":  "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;