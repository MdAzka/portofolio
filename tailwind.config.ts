import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#12190F",
          900: "#1C2620",
          800: "#223028",
          700: "#2A3B32",
          600: "#33473C",
          500: "#4A5F52",
        },
        paper: {
          100: "#E8E6DF",
          200: "#E7E9E4",
          300: "#C9CDC8",
          400: "#9BA29D",
          500: "#7D8580",
        },
        amber: {
          300: "#F1C57C",
          400: "#E8A33D",
          500: "#CE8620",
        },
        teal: {
          300: "#E3D9C4",
          400: "#D4C5A9",
          500: "#B8A587",
        },

        rust: {
          400: "#C8623F",
          500: "#A94E30",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "84rem",
        prose: "42rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(231,233,228,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,233,228,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(6px,-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        blink: "blink 1.1s steps(1) infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
