import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "../draw/draw.css";
import Header from "../components/Header/Navbar";
import { hasLocale, htmlLang, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { I18nProvider } from "@/i18n/I18nProvider";
import { themeInitScript } from "@/theme/themeScript";

// Defina NEXT_PUBLIC_SITE_URL no ambiente de produção (ex.: https://seudominio.com).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Só /pt e /en existem; qualquer outro idioma vira 404 (app/global-not-found.tsx).
export const dynamicParams = false;

export function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { lang } = await params;
    if (!hasLocale(lang)) return {};
    const t = await getDictionary(lang);
    return {
        metadataBase: new URL(SITE_URL),
        title: t.meta.title,
        description: t.meta.description,
        keywords: t.meta.keywords,
        alternates: {
            canonical: `/${lang}`,
            languages: { "pt-BR": "/pt", en: "/en", "x-default": "/pt" },
        },
        openGraph: {
            type: "website",
            url: `/${lang}`,
            title: t.meta.title,
            description: t.meta.description,
            locale: ogLocale[lang],
            siteName: "Candiniz",
        },
        twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    };
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { media: "(prefers-color-scheme: light)", color: "#f6f7f2" },
    ],
};

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode }> & Params) {
    const { lang } = await params;
    if (!hasLocale(lang)) notFound();
    const dict = await getDictionary(lang);

    return (
        // suppressHydrationWarning: o data-theme é posto pelo script antes do React hidratar
        <html lang={htmlLang[lang]} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </head>
            <body className="overflow-x-hidden">
                <I18nProvider locale={lang} dict={dict}>
                    <Header />
                    {children}
                </I18nProvider>
            </body>
        </html>
    );
}
