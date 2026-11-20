'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowLeftSLine, RiArrowRightSLine, RiAddLine, RiCloseLine, RiCheckLine, RiArrowRightUpLine } from "react-icons/ri";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import SectionTitle from "./SectionTitle";

// Símbolo de cada empresa, solto (sem caixa em volta)
const MARKS: Record<string, { src: string; w: number; h: number; className: string }> = {
    pg: { src: "/brand/pg-simbolo.svg", w: 900, h: 1112, className: "h-36 sm:h-44 w-auto" },
    opice: { src: "/opiceLogo.png", w: 1200, h: 432, className: "h-16 sm:h-20 w-auto invert-on-light" },
};

type Item = ReturnType<typeof useI18n>["t"]["experience"]["items"][number];

function useWide() {
    const [wide, setWide] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const update = () => setWide(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return wide;
}

/** Balão de borda reta, com rabicho apontando para o símbolo (à esquerda no desktop, para cima no celular). */
function Balloon({ children, wide, delay = 0 }: { children: React.ReactNode; wide: boolean; delay?: number }) {
    return (
        <motion.div
            data-draw="box"
            initial={{ opacity: 0, x: wide ? 16 : 0, y: wide ? 0 : 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface border border-line"
        >
            <span
                aria-hidden="true"
                className={`absolute w-3 h-3 rotate-45 bg-surface border-line ${
                    wide ? "-left-[7px] top-5 border-l border-b" : "-top-[7px] left-8 border-l border-t"
                }`}
            />
            {children}
        </motion.div>
    );
}

function Details({ item, wide, onClose }: { item: Item; wide: boolean; onClose: () => void }) {
    const { t } = useI18n();
    const [open, setOpen] = useState(-1);
    return (
        <div className="flex flex-col gap-3">
            <Balloon wide={wide}>
                <div className="p-5 flex items-start gap-4">
                    <div className="flex-1">
                        <p className={`${roboto.className} text-sm font-bold text-accent-fg`}>{item.role}</p>
                        <p className="text-base text-fg leading-relaxed mt-2">{item.summary}</p>
                        {"cases" in item && item.cases && (
                            <div className="flex flex-wrap items-center gap-1 mt-4">
                                <span className={`${roboto.className} text-xs uppercase tracking-widest text-muted mr-2`}>{t.experience.cases}</span>
                                {item.cases.map((c) => (
                                    <a
                                        key={c.slug}
                                        href={`#case-${c.slug}`}
                                        className={`${roboto.className} flex items-center gap-1.5 bg-accent text-ink text-xs font-bold px-3 py-1.5 hover:opacity-90 transition-opacity`}
                                    >
                                        {c.label}
                                        <RiArrowRightUpLine aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        aria-label={t.experience.hideDetails}
                        className="shrink-0 w-8 h-8 flex items-center justify-center bg-surface-2 text-fg hover:bg-accent hover:text-ink transition-colors"
                    >
                        <RiCloseLine />
                    </button>
                </div>
            </Balloon>
            {item.balloons.map((front, i) => (
                <Balloon key={front.title} wide={wide} delay={0.06 * (i + 1)}>
                    <button
                        onClick={() => setOpen(open === i ? -1 : i)}
                        aria-expanded={open === i}
                        className="w-full text-left p-4 flex items-start gap-3 hover:bg-surface-2 transition-colors"
                    >
                        <span className={`${roboto.className} text-xs font-bold text-accent-fg mt-1`}>0{i + 1}</span>
                        <span className="flex-1">
                            <span className={`${roboto.className} block font-bold text-fg`}>{front.title}</span>
                            <span className="block text-sm text-muted leading-relaxed mt-1">{front.text}</span>
                        </span>
                        <span
                            className={`shrink-0 w-7 h-7 flex items-center justify-center ${open === i ? "bg-accent text-ink" : "bg-surface-2 text-fg"}`}
                            aria-hidden="true"
                        >
                            {open === i ? <RiCloseLine /> : <RiAddLine />}
                        </span>
                    </button>
                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden px-4 pb-4 pl-11 space-y-1.5 text-sm text-fg/90"
                            >
                                {front.list.map((line) => (
                                    <li key={line} className="flex gap-2">
                                        <RiCheckLine className="shrink-0 mt-0.5 text-accent-fg" aria-hidden="true" />
                                        {line}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </Balloon>
            ))}
        </div>
    );
}

/**
 * Experiência: o símbolo da empresa no centro, solto (sem caixa), com o nome abaixo;
 * a outra empresa aparece menor e apagada ao lado. Clicar no conjunto abre os balões.
 */
export default function Experience() {
    const { t } = useI18n();
    const items = t.experience.items;
    const [index, setIndex] = useState(items.length - 1); // a experiência atual começa no centro
    const [open, setOpen] = useState(false);
    const wide = useWide();
    const active = items[index];
    const isCurrent = (i: number) => i === items.length - 1;

    const go = (i: number) => {
        const next = Math.max(0, Math.min(items.length - 1, i));
        if (next !== index) setOpen(false);
        setIndex(next);
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <section id="experience" className="pb-28 overflow-x-clip">
            <SectionTitle title={t.experience.title} intro={t.experience.intro} />

            <div className="wrap">
                <div
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={t.experience.title}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") go(index - 1);
                        if (e.key === "ArrowRight") go(index + 1);
                    }}
                    className="relative h-[340px] sm:h-[380px] lg:h-[560px]"
                >
                    <motion.div
                        drag={open ? false : "x"}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.x > 80 || info.velocity.x > 600) go(index - 1);
                            else if (info.offset.x < -80 || info.velocity.x < -600) go(index + 1);
                        }}
                        className={`absolute inset-0 ${open ? "" : "cursor-grab active:cursor-grabbing"}`}
                    >
                        {items.map((item, i) => {
                            const offset = i - index;
                            const on = offset === 0;
                            const mark = MARKS[item.id];
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={false}
                                    animate={{
                                        x: on ? (open && wide ? "calc(-50% - min(25vw, 340px))" : "-50%") : `calc(-50% + ${offset * (wide ? 34 : 70)}vw)`,
                                        y: "-50%",
                                        scale: on ? 1 : 0.55,
                                        opacity: on ? 1 : open ? 0 : 0.28,
                                        filter: on ? "grayscale(0)" : "grayscale(1)",
                                    }}
                                    transition={{ type: "spring", stiffness: 150, damping: 24 }}
                                    style={{ zIndex: on ? 3 : 1 }}
                                    className="absolute left-1/2 top-1/2"
                                >
                                    <button
                                        data-draw="box"
                                        onClick={() => (on ? setOpen((v) => !v) : go(i))}
                                        aria-expanded={on ? open : undefined}
                                        aria-label={on ? `${item.company}: ${open ? t.experience.hideDetails : t.experience.details}` : `${t.experience.goTo} ${item.company}`}
                                        className="group flex flex-col items-center text-center px-6 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                                    >
                                        <Image
                                            src={mark.src}
                                            alt=""
                                            width={mark.w}
                                            height={mark.h}
                                            className={`${mark.className} transition-transform duration-500 ease-out group-hover:scale-105`}
                                        />
                                        <span className={`${roboto.className} text-2xl sm:text-4xl font-bold text-fg mt-6 whitespace-nowrap`}>{item.company}</span>
                                        <span className={`${roboto.className} text-sm text-muted mt-2 flex items-center gap-2`}>
                                            {item.period}
                                            {isCurrent(i) && <span className="px-2 py-0.5 bg-accent text-ink text-xs font-bold">{t.experience.current}</span>}
                                        </span>
                                        {on && (
                                            <span
                                                className={`${roboto.className} mt-5 text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${
                                                    open ? "text-accent-fg" : "text-muted group-hover:text-accent-fg"
                                                }`}
                                            >
                                                {open ? <RiCloseLine /> : <RiAddLine />}
                                                {open ? t.experience.hideDetails : t.experience.details}
                                            </span>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Balões à direita do símbolo (desktop) */}
                    {wide && (
                        <div className="absolute top-1/2 -translate-y-1/2 left-[46%] w-[min(52%,600px)] z-[4]">
                            <AnimatePresence mode="wait">
                                {open && (
                                    <motion.div key={active.id} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Details item={active} wide onClose={() => setOpen(false)} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Setas laterais */}
                    {index > 0 && !open && (
                        <button
                            onClick={() => go(index - 1)}
                            aria-label={t.experience.prev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-14 z-[5] flex items-center justify-center text-3xl text-fg hover:text-ink hover:bg-accent transition-colors"
                        >
                            <RiArrowLeftSLine />
                        </button>
                    )}
                    {index < items.length - 1 && !open && (
                        <button
                            onClick={() => go(index + 1)}
                            aria-label={t.experience.next}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-14 z-[5] flex items-center justify-center text-3xl text-fg hover:text-ink hover:bg-accent transition-colors"
                        >
                            <RiArrowRightSLine />
                        </button>
                    )}
                </div>

                {/* Balões abaixo do símbolo (celular e tablet) */}
                {!wide && (
                    <AnimatePresence>
                        {open && (
                            <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-xl mx-auto mt-6">
                                <Details item={active} wide={false} onClose={() => setOpen(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {/* Marcadores retangulares */}
                <div className="flex justify-center gap-1 mt-6">
                    {items.map((item, i) => (
                        <button
                            key={item.id}
                            onClick={() => go(i)}
                            aria-label={item.company}
                            aria-current={i === index}
                            className={`h-1.5 transition-all duration-300 ${i === index ? "w-12 bg-accent" : "w-6 bg-line hover:bg-muted"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
