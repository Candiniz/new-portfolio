import type { Config } from "tailwindcss";

/*
 * Cores por TOKEN (variáveis CSS em src/app/globals.css), para o tema claro/escuro
 * trocar só as variáveis. Evite cores fixas (bg-black, text-white, #aadd49) em
 * componentes novos: use canvas / surface / fg / muted / line / accent.
 */
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: token("canvas"), // fundo da página
        surface: token("surface"), // cartões
        "surface-2": token("surface-2"), // cartão sobre cartão, hover
        fg: token("fg"), // texto principal
        muted: token("muted"), // texto secundário
        line: token("line"), // bordas e divisórias
        accent: token("accent"), // verde da marca como FUNDO
        "accent-fg": token("accent-fg"), // verde como TEXTO (mais escuro no tema claro)
        ink: token("ink"), // texto sobre fundo verde
      },
      boxShadow: {
        "inner-deep": "inset 0 14px 20px rgba(0, 0, 0, 0.6), inset 0 -4px 6px rgba(0, 0, 0, 0.1)",
        "custom-circle": "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
        "custom-hover": "0 8px 16px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 0, 0.25)",
        glow: "0 0 0 1px rgb(var(--c-accent) / 0.35), 0 10px 40px -10px rgb(var(--c-accent) / 0.45)",
      },
      transitionTimingFunction: {
        // tokens de movimento: use estes em vez de curvas avulsas
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        float: "float 4s ease-in-out infinite",
        blink: "blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
