import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { pretendard: ["var(--font-pretendard)"] },
      colors: {
        // Next.js 다크 모드 색상 조합 추가
        "custom-dark-bg": "#121212",
        "custom-dark-text": "#e5e7eb",
        "custom-dark-accent": "#3b82f6",

        // 밝은 모드 색상 조합
        "custom-light-bg": "#f1f1f1",
        "custom-light-text": "#3f3f3f",
        "custom-light-accent": "#3b82f6",

        // 텍스트 전용
        "text-gray-dark": "#3f3f3f",
        "text-gray-light": "#D6D6D6",
        "text-gray-default": "#969696",

        // primary color
        "primary-purple": {
          500: "#6100FF",
          400: "#9747FF",
          300: "#A66FFF",
          200: "#C9A8FF",
          100: "#E0CEFF",
          50: "#F2EBFF",
          light: "#FAF8FF",
        },

        // 드롭다운 커스텀
        "custom-dropdown-dark-bg": "#242424",
        "custom-dropdown-light-bg": "#f2f3f4",
        "custom-dropdown-light-border": "#444444",
        "custom-dropdown-option-light-bg": "#e3e1e7",

        // neutral color
        grayscale: {
          100: "#030303",
          90: "#1A1A1A",
          80: "#333333",
          70: "#4D4D4D",
          50: "#808080",
          40: "#999999",
          30: "#B3B3B3",
          20: "#CCCCCC",
          10: "#E6E6E6",
          5: "#F3F3F3",
        },

        // stroke & line color
        "line-gray-10": "#E6E6E6",
        "line-gray-5": "#F3F3F3",
        "line-blue": "#99BDFF",
        "line-default": "#C3C3C3",
        "line-dark": "#ADADAD",

        // accent color
        "accent-red": "#FF6D6D",
        "accent-blue": "#6DB0FF",
        "accent-orange": "#FFD542",
        "accent-green": "#17E0D4",

        // background color
        "bg-red-light": "#FFEFEF",
        "bg-purple-light": "#FAF8FF",
        "bg-purple-dark": "#E3E1E7",
        "bg-purple-chip": "#7E5AFF",
        "bg-gray-light": "#F1F1F1",
        "bg-gray-dark": "#C2C2C2",
      },
      boxShadow: {
        "custom-shadow": "0px 0px 24.8px 0px rgba(0, 0, 0, 0.25)",
        "custom-dropdown-shadow": "0px 4px 12px 0px rgba(0, 0, 0, 0.08)",
      },
      //메인페이지 DoubleDown 애니메이션
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        moveCircle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },

        //SecureProcessSection 무한회전 애니메이션
        rotateForward: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        rotateBackward: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },

        scan: {
          "0%": { top: "-16px" },
          "100%": { top: "100%" },
        },
      },
      animation: {
        float: "float 2.04s ease-in-out infinite",
        moveCircle: "moveCircle 5s ease-in-out infinite",

        rotateForward: "rotateForward 50s linear infinite",
        rotateBackward: "rotateBackward 50s linear infinite",

        scan: "scan 1.5s linear infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
