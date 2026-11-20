'use client';

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiDownloadLine } from "react-icons/ri";
import { roboto } from "../fonts/Fonts";
import StarsBackground from "./Main/Background";
import PortraitFace from "./Portrait/PortraitFace";
import { useI18n } from "@/i18n/I18nProvider";
import { getDirector } from "../draw/drawDirector";

const initialTechs = [
    { id: "python", name: "python", bg: "#366297", text: "#ffd43b" },
    { id: "pa", name: "power automate", bg: "#0066ff", text: "#ffffff" },
    { id: "n8n", name: "n8n", bg: "#ea4b71", text: "#ffffff" },
    { id: "vertex", name: "vertex ai", bg: "#4285f4", text: "#ffffff" },
    { id: "agents", name: "ai agents", bg: "#2a39ff", text: "#efd81d" },
    { id: "ts", name: "typescript", bg: "#2f74c0", text: "#ffffff" },
    { id: "next", name: "next.js", bg: "#353535", text: "#ffffff" },
];

type Rect = { x: number; y: number; w: number; h: number };

/** Embaralha garantindo que a ordem realmente mude. */
function shuffle<T>(list: T[]): T[] {
    const out = [...list];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out.every((v, i) => v === list[i]) ? shuffle(list) : out;
}

export default function Intro() {
    const { t } = useI18n();
    const [isCVVisible, setIsCVVisible] = useState(false);
    const [techs, setTechs] = useState(initialTechs);
    const sectionRef = useRef<HTMLElement>(null);
    const pills = useRef(new Map<string, HTMLLIElement>());
    const before = useRef<Map<string, Rect> | null>(null);
    const carrying = useRef<Promise<unknown> | null>(null);

    // FLIP: depois que o React reordena, cada badge volta à posição antiga e um robô o leva até a nova.
    useLayoutEffect(() => {
        const old = before.current;
        if (!old) return;
        before.current = null;
        const director = getDirector();
        if (!director) return;
        carrying.current = Promise.all(
            [...pills.current.entries()].map(([id, el]) => {
                const from = old.get(id);
                return from ? director.carry(el, from) : Promise.resolve();
            }),
        );
    }, [techs]);

    const reshuffle = useCallback(() => {
        const snap = new Map<string, Rect>();
        pills.current.forEach((el, id) => {
            const r = el.getBoundingClientRect();
            snap.set(id, { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height });
        });
        before.current = snap;
        setTechs((prev) => shuffle(prev));
    }, []);

    // Troca periódica, só com o hero na tela, a aba visível e todos os badges já desenhados.
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let visible = false;
        let timer: ReturnType<typeof setTimeout>;
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 });
        if (sectionRef.current) io.observe(sectionRef.current);

        const tick = async () => {
            const allDrawn = [...pills.current.values()].every((el) => el.getAttribute("data-draw-state") === "done");
            if (visible && !document.hidden && allDrawn && getDirector()) {
                reshuffle();
                // espera os robôs terminarem de carregar antes de pensar na próxima troca
                await new Promise((r) => setTimeout(r, 50));
                await carrying.current;
            }
            timer = setTimeout(tick, 7000 + Math.random() * 3000);
        };
        timer = setTimeout(tick, 9000);
        return () => {
            clearTimeout(timer);
            io.disconnect();
        };
    }, [reshuffle]);

    return (
        <section
            ref={sectionRef}
            id="top"
            // desktop: o hero ocupa sempre a tela inteira (no mínimo), com o conteúdo no meio da altura;
            // a seção seguinte só aparece depois de rolar
            className={`${roboto.className} relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 xl:min-h-[100svh] xl:flex xl:flex-col xl:justify-center xl:pt-28 xl:pb-16`}
            style={{ background: "radial-gradient(circle at 70% 40%, rgb(var(--hero-glow)) 0%, rgb(var(--c-canvas)) 38%)" }}
        >
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-b from-transparent to-canvas z-[2]" />
            <div
                className="absolute -top-[50%] -right-[80%] w-[1000px] h-[800px] lg:-right-[50%] lg:w-[3000px]"
                style={{ background: "radial-gradient(closest-side at center, #4861a05d 0%, #4861a000 100%)" }}
            />
            <div
                className="absolute top-[50%] -right-[80%] w-[1000px] h-[800px] lg:-right-[50%] lg:w-[3000px]"
                style={{ background: "radial-gradient(closest-side at center, #a048993a 0%, #4861a000 100%)" }}
            />

            {/* desktop: texto com a largura que o conteúdo já usa (42rem) e a foto ocupando o espaço
                que sobra (ver PortraitFace); o par fica centralizado, com a foto no meio da altura */}
            <div className="wrap relative z-[10] flex flex-col-reverse xl:flex-row items-center justify-center gap-14 xl:gap-[clamp(3rem,5vw,6rem)]">
                <div className="xl:relative flex-1 xl:flex-[0_1_42rem] flex flex-col items-center xl:items-start text-center xl:text-left gap-6 max-w-3xl">
                    <h1 data-draw="type" className="text-5xl sm:text-6xl xl:text-[4.2vw] 2xl:text-7xl leading-[1.05] text-fg">
                        {t.hero.greeting}{" "}
                        <br />
                        <span className="font-bold text-accent-fg">{t.hero.name}</span>
                        <span data-draw-skip className="dd-underscore font-bold">_</span>
                    </h1>

                    {/* Símbolo de fundo (decorativo). Celular e tablet: começa na frase de efeito e é um pouco
                        mais largo que a tela (as laterais ficam cortadas). Desktop: centralizado na coluna
                        do texto, nos dois eixos. O wrapper só é referência fora do desktop. */}
                    <div className="relative xl:static">
                        <div
                            aria-hidden="true"
                            className="absolute pointer-events-none -z-10 top-0 left-1/2 -translate-x-1/2 w-[115vw] max-w-[1000px] aspect-[3500/3238] xl:top-1/2 xl:-translate-y-1/2 xl:w-[min(1000px,calc(92svh*3500/3238))] xl:max-w-none"
                        >
                            <Image src="/favicon.png" fill alt="" sizes="(min-width: 1280px) 1000px, 115vw" loading="eager" className="hero-symbol object-contain opacity-[3%] vignette-mask" />
                            <Image src="/favicon.png" fill alt="" sizes="(min-width: 1280px) 1000px, 115vw" loading="eager" className="hero-symbol object-contain opacity-5 animate-light-sweep" />
                            <Image src="/favicon-glow.png" fill alt="" sizes="(min-width: 1280px) 1000px, 115vw" className="hero-symbol object-contain opacity-80 animate-light-sweep-delayed" />
                        </div>
                        <p data-draw="type" className="text-xl md:text-2xl font-bold text-fg max-w-2xl">
                            {t.hero.headline}
                        </p>
                    </div>
                    <p data-draw="type" className="text-base md:text-lg text-muted max-w-2xl leading-relaxed">
                        {t.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                        <a
                            data-draw="box"
                            href="#contact"
                            className="text-center w-[250px] py-3 bg-accent text-ink font-bold border border-accent transition-colors duration-300 hover:bg-transparent hover:text-accent-fg"
                        >
                            {t.hero.ctaTalk}
                        </a>
                        <button
                            data-draw="box"
                            onClick={() => setIsCVVisible((v) => !v)}
                            aria-expanded={isCVVisible}
                            className="w-[250px] py-3 border border-accent text-accent-fg font-bold flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-accent hover:text-ink"
                        >
                            {!isCVVisible && <RiDownloadLine aria-hidden="true" />}
                            {isCVVisible ? t.hero.ctaClose : t.hero.ctaCv}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isCVVisible && (
                            <motion.div
                                className="flex gap-8"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            >
                                <a
                                    href="/CandinizCV_PT.pdf"
                                    download
                                    aria-label={t.hero.cvPt}
                                    title={t.hero.cvPt}
                                    className="w-16 h-11 bg-center bg-cover bg-[url('/br.png')] ring-2 ring-line hover:ring-accent hover:scale-110 transition-transform"
                                />
                                <a
                                    href="/CandinizCV_EN.pdf"
                                    download
                                    aria-label={t.hero.cvEn}
                                    title={t.hero.cvEn}
                                    className="w-16 h-11 bg-center bg-cover bg-[url('/en.png')] ring-2 ring-line hover:ring-accent hover:scale-110 transition-transform"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Resultados: cada número é desenhado por um robô */}
                    <dl aria-label={t.hero.statsLabel} className="grid grid-cols-3 gap-1 w-full max-w-2xl mt-6">
                        {t.hero.stats.map((s) => (
                            <div data-draw="box" key={s.value} className="border-l-4 border-accent bg-surface/80 backdrop-blur-sm p-3 sm:p-4 text-left">
                                <dt className="sr-only">{s.label}</dt>
                                <dd className="text-lg sm:text-2xl font-bold text-accent-fg leading-tight">{s.value}</dd>
                                <dd className="text-[0.7rem] sm:text-xs text-muted mt-1 leading-snug">{s.label}</dd>
                            </div>
                        ))}
                    </dl>

                    {/* Badges: cada um desenhado individualmente; na troca, os robôs carregam cada um até o novo lugar */}
                    <div className="w-full max-w-2xl mt-4">
                        <p className="sr-only">{t.hero.techsLabel}</p>
                        <ul className="select-none flex flex-wrap gap-2.5 items-center justify-center xl:justify-start text-base sm:text-lg">
                            {techs.map((tech) => (
                                <li
                                    key={tech.id}
                                    ref={(el) => {
                                        if (el) pills.current.set(tech.id, el);
                                        else pills.current.delete(tech.id);
                                    }}
                                    data-draw="box"
                                    style={{ backgroundColor: tech.bg, color: tech.text }}
                                    className="px-2.5 py-1.5 rounded-md shadow-sm"
                                >
                                    {tech.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <PortraitFace
                    alt={t.hero.photoAlt}
                    badgeValue={t.hero.badgeValue}
                    badgeLabel={t.hero.badgeLabel}
                    hint={t.hero.faceHint}
                    actionLabel={t.hero.faceAction}
                />
            </div>

            <StarsBackground />
        </section>
    );
}
