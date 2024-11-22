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
        // Primary Colors
        black: "#0C0D11",
        ivory: "#E9E7E1",
        red: "#C1192D",

        // Secondary Colors
        white: "#FFFFFF",
        grey1000: "#1A1A1A",
        grey850: "#3A3A3A",
        grey750: "#545454",
        grey650: "#6E6E6E",
        grey550: "#8E8E8E",
        grey450: "#BDBEBD",
        grey350: "#DDDDDD",
        grey250: "#E8E8E8",
        grey150: "#F3F3F3",
        grey50: "#FAFAFA",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      // Typography 커스텀 유틸리티
      extend: {
        typography: {
          head0: {
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0",
            fontWeight: "600", // SemiBold
          },
          head1: {
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
