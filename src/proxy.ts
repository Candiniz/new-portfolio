import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE, type Locale } from "./i18n/config";

/*
 * Só a raiz "/" passa por aqui: decide o idioma e redireciona para /pt ou /en.
 * Ordem: escolha salva no cookie (botão da navbar) → idioma do navegador → pt.
 */
function preferredLocale(request: NextRequest): Locale {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (saved && hasLocale(saved)) return saved;

    const header = request.headers.get("accept-language") ?? "";
    const ranked = header
        .split(",")
        .map((part) => {
            const [tag, q] = part.trim().split(";q=");
            return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
        })
        .sort((a, b) => b.q - a.q);
    return ranked.map((r) => r.lang).find(hasLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request)}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/"],
};
