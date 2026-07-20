import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: "'Space Grotesk', sans-serif",
        body: "'Manrope', sans-serif",
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
