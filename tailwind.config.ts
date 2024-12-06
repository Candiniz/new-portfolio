import type { Config } from "tailwindcss";


export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-deep': 'inset 0 14px 20px rgba(0, 0, 0, 0.6), inset 0 -4px 6px rgba(0, 0, 0, 0.1)',
        'custom-circle': '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)',
        'custom-hover': '0 8px 16px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'], // Permite usar sombra no hover
    },
  },
  plugins: [],
} satisfies Config;
