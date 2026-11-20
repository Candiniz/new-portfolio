'use client';

import { locales, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";

function switchTo(next: Locale, section: string | null) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    // Carga completa, não router.push: trocar /pt ↔ /en remonta o layout raiz no cliente, e o
    // React recria o <script> de tema do <head> (erro "Encountered a script tag" no Next).
    window.location.assign(`/${next}${section ? `#${section}` : ""}`);
}

/** PT | EN: troca de rota (/pt ↔ /en) mantendo a seção em que a pessoa está. */
export default function LanguageSwitch({ activeSection }: { activeSection: string | null }) {
    const { t, locale } = useI18n();
    const go = (next: Locale) => {
        if (next !== locale) switchTo(next, activeSection);
    };

    return (
        <div role="group" aria-label={t.nav.language} className="h-7 flex items-stretch border border-line p-0.5 gap-0.5 text-xs font-bold">
            {locales.map((l) => (
                <button
                    key={l}
                    onClick={() => go(l)}
                    aria-pressed={l === locale}
                    aria-label={l === locale ? undefined : t.nav.switchLanguage}
                    className={`px-2.5 flex items-center uppercase transition-colors duration-300 ${
                        l === locale ? "bg-accent text-ink" : "text-muted hover:text-fg"
                    }`}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
