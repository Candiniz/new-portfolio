'use client';

import { useState } from "react";
import { RiCheckDoubleLine, RiFileCopyLine } from "react-icons/ri";
import { useI18n } from "@/i18n/I18nProvider";

/** Copia o texto e mostra "Copiado!" por 1,5 s. */
export default function CopyButton({ textToCopy, className }: { textToCopy: string; className?: string }) {
    const { t } = useI18n();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* sem permissão de área de transferência: não faz nada */
        }
    };

    return (
        <button
            onClick={handleCopy}
            aria-label={`${copied ? t.contact.copied : t.contact.copy}: ${textToCopy}`}
            title={copied ? t.contact.copied : t.contact.copy}
            className={`relative inline-flex justify-center items-center w-9 h-9 shrink-0 transition-colors ${className ?? "text-accent-fg hover:bg-surface-2"}`}
        >
            {copied ? <RiCheckDoubleLine /> : <RiFileCopyLine />}
            <span role="status" className="sr-only">
                {copied ? t.contact.copied : ""}
            </span>
        </button>
    );
}
