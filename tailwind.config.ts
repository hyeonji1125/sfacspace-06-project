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
        // Next.js 다크 모드 색상 조합 추가
        "custom-dark-bg": "#121212",
        "custom-dark-text": "#e5e7eb",
        "custom-dark-accent": "#3b82f6",

        // 밝은 모드 색상 조합
        "custom-light-bg": "#ffffff",
        "custom-light-text": "#3f3f3f",
        "custom-light-accent": "#3b82f6",

        "custom-text-footer-gray": "#969696",
        "custom-text-footer-black": "#3f3f3f",
        "text-gray-light": "#D6D6D6",

        // primary color
        "primary-purple-500": "#6100FF",
        "primary-purple-400": "#9747FF",
        "primary-purple-300": "#A66FFF",
        "primary-purple-200": "#C9A8FF",
        "primary-purple-100": "#E0CEFF",
        "primary-purple-50": "#F2EBFF",

        // neutral color
        "grayscale-100": "#030303",
        "grayscale-90": "#1A1A1A",
        "grayscale-80": "#333333",
        "grayscale-70": "#4D4D4D",
        "grayscale-50": "#808080",
        "grayscale-40": "#999999",
        "grayscale-30": "#B3B3B3",
        "grayscale-20": "#CCCCCC",
        "grayscale-10": "#E6E6E6",
        "grayscale-5": "#F3F3F3",

        // stroke & line color
        "line-gray-10": "#E6E6E6",
        "line-gray-5": "#F3F3F3",
        "line-blue": "#99BDFF",

        // accent color
        "accent-red": "#FF6D6D",
        "accent-blue": "#6DB0FF",
        "accent-orange": "#FFD542",
        "accent-green": "#00C308",

        // background color
        "bg-red-light": "#FFEFEF",
        "bg-purple-light": "#FAF8FF",
        "bg-purple-dark": "#E3E1E7",
        "bg-gray-light": "#F1F1F1",
        "bg-gray-dark": "#C2C2C2",
      },
      boxShadow: {
        "custom-shadow": "0px 0px 24.8px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
