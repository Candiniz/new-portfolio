'use client';

import { useSyncExternalStore } from "react";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { useI18n } from "@/i18n/I18nProvider";
import { THEME_KEY } from "@/theme/themeScript";

type Theme = "light" | "dark";

// O tema mora no atributo data-theme do <html>; o React só o observa.
const subscribe = (cb: () => void) => {
    const mo = new MutationObserver(cb);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme => "dark";

/*
 * Os dois ícones vão no HTML e o CSS mostra o certo pelo data-theme do <html>
 * (posto antes da pintura pelo themeScript): sem diferença entre servidor e
 * cliente e sem "piscar".
 */
export default function ThemeToggle() {
    const { t } = useI18n();
    const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

    const toggle = (e: React.MouseEvent) => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        const apply = () => {
            document.documentElement.dataset.theme = next;
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch {
                /* modo privado: só não persiste */
            }
        };
        // Revelação circular a partir do botão, onde o navegador suporta (View Transitions)
        const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!doc.startViewTransition || reduce) return apply();
        document.documentElement.style.setProperty("--vt-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--vt-y", `${e.clientY}px`);
        doc.startViewTransition(apply);
    };

    return (
        <button
            onClick={toggle}
            aria-label={theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark}
            title={theme === "dark" ? t.nav.themeToLight : t.nav.themeToDark}
            // 28 px, a largura das 3 barras do menu; o ::after aumenta a área de toque sem mudar o desenho
            className="relative w-7 h-7 border border-line flex items-center justify-center text-base text-fg hover:border-accent hover:text-accent-fg transition-colors duration-300 after:absolute after:-inset-2 after:content-['']"
        >
            <RiSunLine className="hidden [[data-theme=dark]_&]:block" />
            <RiMoonClearLine className="hidden [[data-theme=light]_&]:block" />
        </button>
    );
}
