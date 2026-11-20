'use client';

import { useEffect, useRef, useState } from "react";
import EmblaCarousel from "embla-carousel";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";
import { useDialog } from "../hooks/useDialog";

// Imagens (fixas); nome e descrição vêm do dicionário, na mesma ordem.
// "unoptimized": o navegador busca direto no imgur. Pelo otimizador do Next quem busca é o
// servidor, e o imgur costuma recusar IP de datacenter (429) — a foto quebrava.
const IMAGES = [
    "https://i.imgur.com/QErZmRb.jpeg",
    "https://i.imgur.com/3T5oz0l.jpeg",
    "https://i.imgur.com/pDikUlP.jpeg",
    "https://i.imgur.com/82I8CLu.jpeg",
    "https://i.imgur.com/bMVFkgo.jpeg",
    "https://i.imgur.com/TXfU8zU.jpeg",
    "https://i.imgur.com/PFmpdEd.jpeg",
    "https://i.imgur.com/LilJMCU.png",
];

/** Foto com plano B: se não carregar, mostra o nome do projeto num bloco (sem ícone quebrado). */
function Photo({ src, alt, name, className, ...size }: { src: string; alt: string; name: string; className: string; width: number; height: number; sizes: string }) {
    const [failed, setFailed] = useState(false);
    if (failed) {
        return (
            <span role="img" aria-label={alt} className={`flex items-center justify-center bg-surface-2 text-muted text-sm px-6 text-center aspect-[5/3] ${className}`}>
                {name}
            </span>
        );
    }
    return <Image src={src} alt={alt} unoptimized onError={() => setFailed(true)} className={className} {...size} />;
}

function ImageModal({ index, onClose }: { index: number; onClose: () => void }) {
    const { t } = useI18n();
    const closeRef = useRef<HTMLButtonElement>(null);
    useDialog(true, onClose, closeRef);
    const info = t.about.architect.images[index];
    return (
        <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={info.name}
                className="bg-surface text-fg p-5 sm:p-8 max-w-5xl w-full overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center">
                    <Photo src={IMAGES[index]} alt={info.alt} name={info.name} width={1200} height={720} sizes="90vw" className="object-contain w-full mb-4 max-h-[70vh]" />
                    <h4 className="text-base font-semibold mb-2">{info.name}</h4>
                    <p className="text-muted text-sm">{info.alt}</p>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        className="mt-4 px-5 py-2 bg-accent text-ink font-bold hover:opacity-90 transition-opacity"
                    >
                        {t.about.architect.close}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ArchitectCarousel() {
    const { t } = useI18n();
    const emblaRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        if (!emblaRef.current) return;
        const embla = EmblaCarousel(emblaRef.current, { loop: true, align: "start", dragFree: true });
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let timer: ReturnType<typeof setTimeout>;
        let visible = false;
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        io.observe(emblaRef.current);
        const tick = () => {
            if (visible && !document.hidden && !reduce) embla.scrollNext();
            timer = setTimeout(tick, 2500);
        };
        timer = setTimeout(tick, 2500);
        return () => {
            clearTimeout(timer);
            io.disconnect();
            embla.destroy();
        };
    }, []);

    return (
        <div className="relative w-full overflow-hidden h-fit bg-canvas mt-3">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    {IMAGES.concat(IMAGES).map((src, i) => {
                        const index = i % IMAGES.length;
                        const info = t.about.architect.images[index];
                        return (
                            <div key={i} className="embla__slide group flex-shrink-0 relative">
                                <button onClick={() => setSelected(index)} aria-label={info.name} className="block h-[220px] sm:h-[300px] w-auto">
                                    <Photo
                                        src={src}
                                        alt={info.alt}
                                        name={info.name}
                                        width={500}
                                        height={300}
                                        sizes="500px"
                                        className="h-full w-auto object-cover transition-opacity duration-300 group-hover:opacity-75"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <AnimatePresence>{selected !== null && <ImageModal index={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
        </div>
    );
}
