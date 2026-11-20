/*
 * Idiomas do site. Cada idioma é uma ROTA (/pt e /en), pré-renderizada no build:
 * o HTML já chega traduzido (bom para SEO e sem "piscar"), e só o dicionário do
 * idioma ativo vai para o navegador.
 */
export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

/** Cookie que guarda a escolha do visitante (lido pelo src/proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
