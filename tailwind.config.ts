import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        deep: "#080808",
        charcoal: "#121212",
        graphite: "#1C1C1C",
        snow: "#F5F5F5",
        mist: "#D6D6D6",
        sync: "#65CC00",
        volt: "#80FF00",
      },
      fontFamily: {
        display: ["Anton", "Impact", "Haettenschweiler", "sans-serif"],
        sans: ["Inter Variable", "Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        // Fluid type scale
        "display-xl": ["clamp(3.5rem, min(12vw, 15.5vh), 11rem)", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.75rem, 8vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.005em" }],
        "display-md": ["clamp(2.25rem, 5vw, 4.25rem)", { lineHeight: "0.96" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.28em" }],
      },
      spacing: {
        section: "clamp(5rem, 11vw, 10rem)",
        gutter: "clamp(1.25rem, 4vw, 3.5rem)",
      },
      maxWidth: {
        shell: "88rem",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
