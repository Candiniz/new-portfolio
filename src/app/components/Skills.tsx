'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    SiPython, SiN8N, SiDocker, SiNodedotjs, SiGooglecloud, SiGooglegemini, SiClaude, SiNextdotjs, SiReact, SiTypescript,
    SiTailwindcss, SiFigma, SiFirebase, SiPostgresql, SiMetabase, SiFramer, SiAutodesk,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import { BiLogoAdobe } from "react-icons/bi";
import { RiFlowChart, RiLayoutMasonryLine, RiBarChartBoxLine, RiRobot2Line } from "react-icons/ri";
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import SectionTitle from "./SectionTitle";

type Tech = { name: string; icon: ReactNode };

const PowerAutomate = () => <span className="icon-power-platform" aria-hidden="true" />;

const T: Record<string, Tech> = {
    pa: { name: "Power Automate", icon: <PowerAutomate /> },
    python: { name: "Python", icon: <SiPython /> },
    n8n: { name: "n8n", icon: <SiN8N /> },
    graph: { name: "Microsoft Graph", icon: <FaMicrosoft /> },
    docker: { name: "Docker", icon: <SiDocker /> },
    node: { name: "Node.js", icon: <SiNodedotjs /> },
    vertex: { name: "Vertex AI", icon: <SiGooglecloud /> },
    gemini: { name: "Gemini", icon: <SiGooglegemini /> },
    claude: { name: "Claude Code", icon: <SiClaude /> },
    agents: { name: "AI Agents", icon: <RiRobot2Line /> },
    next: { name: "Next.js", icon: <SiNextdotjs /> },
    react: { name: "React", icon: <SiReact /> },
    ts: { name: "TypeScript", icon: <SiTypescript /> },
    tailwind: { name: "Tailwind", icon: <SiTailwindcss /> },
    framer: { name: "Framer Motion", icon: <SiFramer /> },
    figma: { name: "Figma", icon: <SiFigma /> },
    firebase: { name: "Firebase", icon: <SiFirebase /> },
    postgres: { name: "PostgreSQL", icon: <SiPostgresql /> },
    metabase: { name: "Metabase", icon: <SiMetabase /> },
    gcp: { name: "Google Cloud", icon: <SiGooglecloud /> },
    oracle: { name: "Oracle Cloud", icon: <GrOracle /> },
    powerbi: { name: "Power BI", icon: <RiBarChartBoxLine /> },
    adobe: { name: "Adobe", icon: <BiLogoAdobe /> },
    autodesk: { name: "AutoCAD · Revit", icon: <SiAutodesk /> },
    process: { name: "Mapeamento de processos", icon: <RiFlowChart /> },
    ia: { name: "Arquitetura da informação", icon: <RiLayoutMasonryLine /> },
};

// Ferramentas e mídia de cada frente (os textos ficam nos dicionários)
const PILLAR_META: Record<string, { techs: string[]; video?: string }> = {
    automation: { techs: ["pa", "python", "n8n", "graph", "docker", "node"], video: "/skillVideos/Infra.mp4" },
    ai: { techs: ["vertex", "gemini", "claude", "agents", "n8n", "python"], video: "/skillVideos/Coding.mp4" },
    web: { techs: ["next", "react", "ts", "tailwind", "framer", "figma"] },
    concept: { techs: ["process", "ia", "figma", "adobe", "autodesk"], video: "/skillVideos/Arch.mp4" },
};

const STACK: Record<string, string[]> = {
    automation: ["pa", "python", "n8n", "graph", "node", "docker"],
    ai: ["vertex", "gemini", "claude", "agents"],
    web: ["next", "react", "ts", "tailwind", "framer"],
    data: ["postgres", "firebase", "metabase", "powerbi", "gcp", "oracle"],
    design: ["figma", "adobe", "autodesk"],
};

/** Vídeo de fundo que só baixa e toca quando o painel está na tela. */
function PanelVideo({ src }: { src: string }) {
    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const v = ref.current;
        if (!v) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !reduce) v.play().catch(() => undefined);
            else v.pause();
        });
        io.observe(v);
        return () => io.disconnect();
    }, [src]);
    return (
        <video
            ref={ref}
            src={src}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-40 [mask-image:linear-gradient(to_left,black_30%,transparent_85%)]"
        />
    );
}

export default function Skills() {
    const { t } = useI18n();
    const [active, setActive] = useState(0);
    const pillars = t.skills.pillars;
    const pillar = pillars[active];
    const meta = PILLAR_META[pillar.id];
    const techName = (key: string) =>
        key === "process" ? t.skills.toolNames.process : key === "ia" ? t.skills.toolNames.infoArch : T[key].name;

    // Setas do teclado entre as abas (padrão ARIA de tabs)
    const onKey = (e: React.KeyboardEvent) => {
        if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(e.key)) return;
        e.preventDefault();
        const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
        const next = (active + dir + pillars.length) % pillars.length;
        setActive(next);
        document.getElementById(`skill-tab-${next}`)?.focus();
    };

    return (
        <section id="skills" className="pb-28">
            <SectionTitle title={t.skills.title} intro={t.skills.intro} />

            {/* Abas: faixa colada de borda a borda; a ativa em verde */}
            <div
                role="tablist"
                aria-label={t.skills.tabsLabel}
                onKeyDown={onKey}
                className="grid grid-cols-2 lg:grid-cols-4 gap-1"
            >
                {pillars.map((p, i) => (
                    <button
                        key={p.id}
                        id={`skill-tab-${i}`}
                        role="tab"
                        data-draw="box"
                        aria-selected={i === active}
                        aria-controls="skill-panel"
                        tabIndex={i === active ? 0 : -1}
                        onClick={() => setActive(i)}
                        className={`text-left px-5 py-4 lg:px-8 lg:py-6 transition-colors duration-300 ${
                            i === active ? "bg-accent text-ink" : "bg-surface text-fg hover:bg-surface-2"
                        }`}
                    >
                        <span className={`${roboto.className} text-xs font-bold ${i === active ? "text-ink/70" : "text-accent-fg"}`}>0{i + 1}</span>
                        <span className={`${roboto.className} block text-base sm:text-xl font-bold mt-1`}>{p.title}</span>
                    </button>
                ))}
            </div>

            <div
                id="skill-panel"
                role="tabpanel"
                aria-labelledby={`skill-tab-${active}`}
                data-draw="box"
                className="relative overflow-hidden bg-surface mt-1 lg:min-h-[560px]"
            >
                {/* mídia à direita com corte diagonal, como as camadas inclinadas do design original */}
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 right-0 w-full lg:w-1/2 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
                >
                    {meta.video ? (
                        <PanelVideo key={meta.video} src={meta.video} />
                    ) : (
                        <div
                            className="absolute inset-0 opacity-60"
                            style={{
                                backgroundImage: "radial-gradient(rgb(var(--c-accent) / 0.4) 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/70 to-transparent lg:via-surface/30" />
                </div>
                <div aria-hidden="true" className="hidden lg:block absolute inset-y-0 left-1/2 w-[9%] bg-accent [clip-path:polygon(0_100%,8%_100%,100%_0,92%_0)] opacity-80" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={pillar.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={`${ibmPlexMono.className} relative z-[1] px-5 py-10 sm:px-10 lg:pl-16 xl:pl-20 lg:pr-10 lg:py-16 lg:max-w-[50%]`}
                    >
                        <h3 className="text-3xl sm:text-5xl font-bold text-accent-fg">{pillar.title}</h3>
                        <p className="text-lg sm:text-2xl text-fg font-bold mt-5 leading-snug">{pillar.impact}</p>

                        <p className={`${roboto.className} text-xs uppercase tracking-widest text-muted mt-10 mb-4`}>{t.skills.deliverLabel}</p>
                        <ul className="space-y-3 border-l-4 border-accent pl-5">
                            {pillar.bullets.map((b) => (
                                <li key={b} className="text-sm sm:text-base text-fg/90 leading-relaxed">
                                    {b}
                                </li>
                            ))}
                        </ul>

                        <p className={`${roboto.className} text-xs uppercase tracking-widest text-muted mt-10 mb-4`}>{t.skills.toolsLabel}</p>
                        <ul className="flex flex-wrap gap-1">
                            {meta.techs.map((key) => (
                                <li
                                    key={`${pillar.id}-${key}`}
                                    data-draw="box"
                                    className="flex items-center gap-2 bg-canvas px-3 py-2 text-sm text-fg"
                                >
                                    <span className="text-lg text-accent-fg" aria-hidden="true">
                                        {T[key].icon}
                                    </span>
                                    {techName(key)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Stack completa: blocos colados por grupo. Uma coluna só abaixo de 460 px; duas até o
                desktop (o último grupo, se sobrar sozinho, ocupa a linha inteira com a lista em duas
                colunas); cinco lado a lado a partir de 1280 px. */}
            <div className="grid min-[460px]:grid-cols-2 xl:grid-cols-5 gap-1 mt-1">
                {Object.entries(STACK).map(([group, keys], i, all) => {
                    const wide = i === all.length - 1 && all.length % 2 === 1;
                    return (
                    <div key={group} data-draw="box" className={`bg-surface px-5 py-6 lg:px-8 ${wide ? "min-[460px]:col-span-2 xl:col-span-1" : ""}`}>
                        <p className={`${roboto.className} text-sm font-bold text-accent-fg mb-4 uppercase tracking-wide`}>
                            {t.skills.groups[group as keyof typeof t.skills.groups]}
                        </p>
                        <ul className={`text-sm text-fg/90 [&>li]:mb-2 ${wide ? "min-[460px]:columns-2 xl:columns-1 gap-x-8" : ""}`}>
                            {keys.map((k) => (
                                <li key={k} className="flex items-center gap-2 break-inside-avoid">
                                    <span className="text-base text-muted" aria-hidden="true">
                                        {T[k].icon}
                                    </span>
                                    {techName(k)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    );
                })}
            </div>
        </section>
    );
}
