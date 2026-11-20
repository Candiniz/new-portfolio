'use client';

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export default function NotFound() {
    const { t, locale } = useI18n();
    return (
        <main className="min-h-[70vh] flex flex-col gap-8 text-center pt-40 px-6 items-center">
            <h1 className="text-6xl sm:text-8xl font-bold text-accent-fg">404</h1>
            <p className="flex flex-col gap-2 text-muted">
                <span>{t.notFound.title}</span>
                <span>{t.notFound.text}</span>
            </p>
            <Link href={`/${locale}`} className="px-6 py-3 bg-accent text-ink rounded-full font-bold">
                {t.notFound.back}
            </Link>
        </main>
    );
}
