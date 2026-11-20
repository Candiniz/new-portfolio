'use client';

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
    src: string;
    alt: string;
    icons: ReactNode;
    fallbackLabel: string;
    sizes: string;
    className?: string;
    /** No modal: vídeo com controles e imagem inteira. */
    detail?: boolean;
}

/**
 * Mídia de projeto: imagem otimizada pelo next/image ou vídeo que só baixa e toca
 * quando aparece na tela. Se o arquivo faltar (ex.: OpiceClause.mp4), mostra uma
 * prévia substituta em vez de um quadro preto.
 */
export default function ProjectMedia({ src, alt, icons, fallbackLabel, sizes, className = "", detail = false }: Props) {
    const [failed, setFailed] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVideo = src.endsWith(".mp4");
    // imagem externa (imgur) vai direto do navegador: pelo otimizador do Next o imgur recusa o servidor (429)
    const remote = src.startsWith("http");

    useEffect(() => {
        const v = videoRef.current;
        if (!v || detail) return;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) v.play().catch(() => undefined);
            else v.pause();
        });
        io.observe(v);
        return () => io.disconnect();
    }, [detail, failed]);

    if (failed) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-2 to-surface text-accent-fg ${className}`}
            >
                <div className="flex gap-2 text-3xl" aria-hidden="true">
                    {icons}
                </div>
                <span className="text-xs text-muted">{fallbackLabel}</span>
            </div>
        );
    }

    if (isVideo) {
        return (
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                autoPlay={detail}
                controls={detail}
                preload={detail ? "metadata" : "none"}
                aria-label={alt}
                onError={() => setFailed(true)}
                className={`w-full h-full ${detail ? "object-contain" : "object-cover"} ${className}`}
            />
        );
    }

    return detail ? (
        <Image src={src} alt={alt} width={1500} height={900} sizes={sizes} unoptimized={remote} onError={() => setFailed(true)} className={`w-full h-auto object-contain ${className}`} />
    ) : (
        <Image src={src} alt={alt} fill sizes={sizes} unoptimized={remote} onError={() => setFailed(true)} className={`object-cover ${className}`} />
    );
}
