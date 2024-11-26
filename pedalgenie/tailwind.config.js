/** @type {import('tailwindcss').Config} */

module.exports= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/skeleton/**/*.{js,ts,jsx,tsx,mdx}",
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
        outfit: ["Outfit", "sans-serif"],
      },
      keyframes: {
        loading: {
          '0%': { transform: 'translateX(0)' },
          '50%, 100%': { transform: 'translateX(460px)' },
        },
      },
      animation: {
        loading: 'loading 2s infinite linear',
      },      
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newTypography = {
        '.text-logo': {
          fontSize: '24px',
          lineHeight: '30px',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.text-head0': {
          fontSize: '24px',
          lineHeight: '36px',
          letterSpacing: '0',
          fontWeight: '600',
        },
        '.text-head1': {
          fontSize: '20px',
          lineHeight: '30px',
          letterSpacing: '-0.025em',
          fontWeight: '600',
        },
        '.text-title1': {
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.025em',
          fontWeight: '600',
        },
        '.text-title2': {
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.025em',
          fontWeight: '500',
        },
        '.text-label1': {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.025em',
          fontWeight: '600',
        },
        '.text-label2': {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.025em',
          fontWeight: '500',
        },
        '.text-body1': {
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '-0.025em',
          fontWeight: '500',
        },
        '.text-body2': {
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '-0.025em',
          fontWeight: '400',
        },
        '.text-caption1': {
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '-0.025em',
          fontWeight: '500',
        },
        '.text-caption2': {
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '-0.025em',
          fontWeight: '400',
        },
        '.line-clamp-1': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
          overflow: 'hidden',
        },
      };

      addUtilities(newTypography);
    },
    require('tailwind-scrollbar-hide'),
  ],
};
