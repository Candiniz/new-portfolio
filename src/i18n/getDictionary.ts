import type { Locale } from "./config";
import type pt from "./dictionaries/pt";

export type Dictionary = typeof pt;

// import dinâmico: cada idioma vira um pedaço separado e só o ativo é carregado
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    pt: () => import("./dictionaries/pt").then((m) => m.default),
    en: () => import("./dictionaries/en").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
