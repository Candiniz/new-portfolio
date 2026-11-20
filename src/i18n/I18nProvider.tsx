'use client';

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./getDictionary";

interface I18nValue {
    locale: Locale;
    t: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Recebe do layout (servidor) o dicionário do idioma da rota. */
export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Dictionary; children: ReactNode }) {
    return <I18nContext.Provider value={{ locale, t: dict }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
    const value = useContext(I18nContext);
    if (!value) throw new Error("useI18n precisa estar dentro de <I18nProvider>");
    return value;
}
