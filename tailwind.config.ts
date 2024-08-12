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
        "primary-purple-500": "#6100FF",
        "primary-purple-400": "#9747FF",
        "primary-purple-300": "#A66FFF",
        "primary-purple-200": "#C9A8FF",
        "primary-purple-100": "#E0CEFF",
        "primary-purple-50": "#F2EBFF",
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
