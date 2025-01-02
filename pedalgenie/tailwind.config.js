/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/skeleton/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // primary
        black: '#0C0D11',
        ivory: '#E9E7E1',
        red: '#F1404C',
        darkRed: '#5A2529',

        // secondary
        white: '#FFFFFF',
        grey1000: '#1A1A1A',
        grey850: '#3A3A3A',
        grey750: '#545454',
        grey650: '#6E6E6E',
        grey550: '#8E8E8E',
        grey450: '#BDBEBD',
        grey350: '#DDDDDD',
        grey250: '#E8E8E8',
        grey150: '#F3F3F3',
        grey50: '#FAFAFA',

        // shadcn-ui
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      screens: {
        sm: '375px',
        lg: '420px',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      keyframes: {
        loading: {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%, 100%': {
            transform: 'translateX(460px)',
          },
        },
      },
      animation: {
        loading: 'loading 2s infinite linear',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
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
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
        '.text-title1': {
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.045em',
          fontWeight: '600',
        },
        '.text-title2': {
          fontSize: '18px',
          lineHeight: '27px',
          letterSpacing: '-0.015em',
          fontWeight: '500',
        },
        '.text-label1': {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
        '.text-label2': {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          fontWeight: '500',
        },
        '.text-body1': {
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '-0.015em',
          fontWeight: '500',
        },
        '.text-body2': {
          fontSize: '14px',
          lineHeight: '18px',
          letterSpacing: '-0.015em',
          fontWeight: '400',
        },
        '.text-caption1': {
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '-0.015em',
          fontWeight: '500',
        },
        '.text-caption2': {
          fontSize: '12px',
          lineHeight: '18px',
          letterSpacing: '-0.015em',
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
    require('tailwindcss-animate'),
  ],
};
