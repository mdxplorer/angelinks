import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FDF8F6",
          100: "#FAF0EC",
          200: "#F4DDD4",
          300: "#EDCABC",
          400: "#E6B7A6",
          500: "#D49A82",
          600: "#C17D63",
          700: "#9E6249",
          800: "#7D4D3A",
          900: "#613D2F",
        },
        accent: {
          50: "#FFF5F2",
          100: "#FFEBE5",
          200: "#FFD2C7",
          300: "#FFB9A9",
          400: "#FFA08B",
          500: "#FF7F67",
          600: "#E86550",
          700: "#CC4D3B",
          800: "#A13C2F",
          900: "#7D3026",
        },
        secondary: {
          50: "#F2FAF5",
          100: "#E5F5EB",
          200: "#CBE9D5",
          300: "#AAD9B6",
          400: "#85C898",
          500: "#65B57C",
          600: "#4D9B64",
          700: "#3D7D50",
          800: "#326440",
          900: "#285034",
        },
        warm: {
          50: "#FDFCFA",
          100: "#F8F5F1",
          200: "#EEEBE5",
          300: "#DDD8D0",
          400: "#B5AFA6",
          500: "#8D877E",
          600: "#6B655C",
          700: "#4F4F4F",
          800: "#3A3632",
          900: "#252220",
        },
      },
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
