import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#090A0C",
          900: "#101114",
          850: "#16181D",
          800: "#1E2027",
          700: "#2B2E37",
          600: "#444855",
          500: "#686D7D",
          400: "#9298A8",
          300: "#BAC0CE",
          200: "#DDE0E7",
          100: "#EFF1F5",
          50: "#F7F8FA",
        },
        ivory: {
          50: "#FBFBFA",
          100: "#F5F4EF",
          200: "#EBE9E1",
          300: "#DDD9CE",
          400: "#C6BEAC",
          500: "#ABA08C",
        },
        bronze: {
          300: "#E2C9A6",
          400: "#D5B88D",
          500: "#C5A880", // Signature documentary warm gold/bronze
          600: "#A98B60",
          700: "#866D46",
        },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-arabic)", "system-ui", "sans-serif"],
        editorial: ["var(--font-amiri)", "Georgia", "serif"],
        latin: ["var(--font-cinzel)", "serif"],
      },
      maxWidth: {
        reading: "720px",
        editorial: "860px",
      },
      lineHeight: {
        reading: "2.1",
        editorial: "1.9",
      },
      animation: {
        "fade-in": "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
