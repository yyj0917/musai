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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      // Typography 커스텀 유틸리티
      extend: {
        typography: {
          h0: {
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0",
            fontWeight: "600", // SemiBold
          },
          h1: {
            fontSize: "20px",
            lineHeight: "30px",
            letterSpacing: "-0.025em",
            fontWeight: "600",
          },
          title1: {
            fontSize: "18px",
            lineHeight: "27px",
            letterSpacing: "-0.025em",
            fontWeight: "600",
          },
          title2: {
            fontSize: "18px",
            lineHeight: "27px",
            letterSpacing: "-0.025em",
            fontWeight: "500", // Medium
          },
          label1: {
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "-0.025em",
            fontWeight: "600",
          },
          label2: {
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "-0.025em",
            fontWeight: "500",
          },
          body1: {
            fontSize: "14px",
            lineHeight: "21px",
            letterSpacing: "-0.025em",
            fontWeight: "500",
          },
          body2: {
            fontSize: "14px",
            lineHeight: "21px",
            letterSpacing: "-0.025em",
            fontWeight: "400",
          },
          caption1: {
            fontSize: "12px",
            lineHeight: "18px",
            letterSpacing: "-0.025em",
            fontWeight: "500",
          },
          caption2: {
            fontSize: "12px",
            lineHeight: "18px",
            letterSpacing: "-0.025em",
            fontWeight: "400", // Regular
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
