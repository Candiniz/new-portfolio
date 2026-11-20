'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { FaBuilding, FaHome } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import { projects } from "../consts/projects";
import type { Project, ProjectTag } from "../types/Home";
import SectionTitle from "./SectionTitle";
import ProjectMedia from "./Projects/ProjectMedia";
import CaseDiagram from "./Projects/CaseDiagram";
import ProjectsModal from "./ProjectsModal";

type Filter = "all" | ProjectTag;
const FILTERS: Filter[] = ["all", "automation", "ai", "web"];

/** Colunas do grid conforme a largura (espelha grid-cols-1 sm:2 lg:3). */
function useColumns() {
    const [cols, setCols] = useState(3);
    useEffect(() => {
        const sm = window.matchMedia("(min-width: 640px)");
        const lg = window.matchMedia("(min-width: 1024px)");
        const update = () => setCols(lg.matches ? 3 : sm.matches ? 2 : 1);
        update();
        sm.addEventListener("change", update);
        lg.addEventListener("change", update);
        return () => {
            sm.removeEventListener("change", update);
            lg.removeEventListener("change", update);
        };
    }, []);
    return cols;
}

function ProjectCard({ project, onOpen, className = "" }: { project: Project; onOpen: (p: Project) => void; className?: string }) {
    const { t } = useI18n();
    const text = t.projects.items[project.slug as keyof typeof t.projects.items];
    const badge = "badge" in text ? text.badge : undefined;

    return (
        <motion.li layout="position" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} data-draw="box" className={`relative ${className}`}>
            <button
                onClick={() => onOpen(project)}
                className="group relative block w-full aspect-[2/1] overflow-hidden bg-surface-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                aria-label={`${text.name} — ${t.projects.viewCase}`}
            >
                {project.diagram && "diagram" in text ? (
                    <CaseDiagram compact data={text.diagram} />
                ) : (
                    <ProjectMedia
                        src={project.media}
                        alt={text.alt}
                        icons={project.icons}
                        fallbackLabel={t.projects.mediaUnavailable}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-black/70 transition-opacity duration-500 group-hover:opacity-20" />

                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-[2]">
                    {project.nda ? (
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] lg:text-xs px-3 py-1.5 flex items-center gap-2 border-l-2 border-[#aadd49]">
                            <BsStars className="text-[#aadd49]" aria-hidden="true" />
                            {t.projects.nda}
                        </span>
                    ) : (
                        <span />
                    )}
                    {badge && (
                        <span className="bg-[#aadd49] text-black text-[10px] lg:text-xs font-bold px-3 py-1.5 text-right">{badge}</span>
                    )}
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 transition-opacity duration-500 group-hover:opacity-0">
                    <p data-draw="type" className="text-white text-lg font-semibold text-center drop-shadow-md">
                        {text.name}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-2xl text-[#aadd49]" aria-hidden="true">
                        {project.icons}
                    </div>
                </div>

                <span className="absolute left-1/2 bottom-4 -translate-x-1/2 translate-y-16 group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ease-out px-4 py-2 bg-[#aadd49] text-black font-semibold text-sm">
                    {t.projects.viewCase}
                </span>
            </button>
            <div className="w-full h-[4px] bg-accent" />
        </motion.li>
    );
}

export default function Projects() {
    const { t } = useI18n();
    const [filter, setFilter] = useState<Filter>("all");
    const [selected, setSelected] = useState<Project | null>(null);
    const [visibleRows, setVisibleRows] = useState(1);
    const columns = useColumns();

    // #case-<slug> abre o case direto (links da Experiência); depois a URL volta ao normal
    useEffect(() => {
        const openFromHash = () => {
            const m = window.location.hash.match(/^#case-(.+)$/);
            const p = m && projects.find((x) => x.slug === m[1]);
            if (!p) return;
            setSelected(p);
            history.replaceState(null, "", window.location.pathname + window.location.search);
        };
        const id = setTimeout(openFromHash, 0);
        window.addEventListener("hashchange", openFromHash);
        return () => {
            clearTimeout(id);
            window.removeEventListener("hashchange", openFromHash);
        };
    }, []);

    const match = (p: Project) => filter === "all" || p.tags.includes(filter);
    const corporate = projects.filter((p) => p.kind === "corporate" && match(p));
    const personal = projects.filter((p) => p.kind === "personal" && match(p));

    // Renderiza o máximo (3 colunas) e o CSS esconde o excedente em telas menores:
    // a primeira pintura já tem a quantidade certa e nada "pula" ao hidratar.
    const visiblePersonal = personal.slice(0, visibleRows * 3);
    const hasMore = visibleRows * columns < personal.length;
    const fit = (i: number) =>
        `${i >= visibleRows ? "hidden" : ""} ${i < visibleRows * 2 ? "sm:block" : "sm:hidden"} ${i < visibleRows * 3 ? "lg:block" : "lg:hidden"}`;

    const groupTitle = (icon: React.ReactNode, label: string, accent: boolean) => (
        <h3
            data-draw="box"
            className={`${roboto.className} py-2 text-sm md:text-xl lg:text-2xl font-bold mb-1 flex items-center gap-4 lg:pl-10 ${
                accent ? "bg-accent text-ink" : "bg-surface-2 text-muted"
            }`}
        >
            <span className={`p-2 ${accent ? "bg-ink text-[#aadd49]" : "bg-muted text-surface-2"}`} aria-hidden="true">
                {icon}
            </span>
            {label}
        </h3>
    );

    return (
        <section id="projects" className="pb-28">
            <SectionTitle title={t.projects.title} intro={t.projects.intro} />

            <div className="max-w-[2000px] mx-auto">
                <div role="group" aria-label={t.projects.filtersLabel} className="grid grid-cols-4 gap-1 mb-1">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => {
                                setFilter(f);
                                setVisibleRows(1);
                            }}
                            aria-pressed={filter === f}
                            className={`${roboto.className} py-3 text-sm sm:text-base font-bold transition-colors duration-300 ${
                                filter === f ? "bg-fg text-canvas" : "bg-surface text-muted hover:text-fg hover:bg-surface-2"
                            }`}
                        >
                            {t.projects.filters[f]}
                        </button>
                    ))}
                </div>

                <div className="mb-20">
                    {groupTitle(<FaBuilding />, t.projects.corporate, true)}
                    {corporate.length ? (
                        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            <AnimatePresence mode="popLayout">
                                {corporate.map((p) => (
                                    <ProjectCard key={p.slug} project={p} onOpen={setSelected} />
                                ))}
                            </AnimatePresence>
                        </motion.ul>
                    ) : (
                        <p className="text-muted text-center py-10">{t.projects.empty}</p>
                    )}
                </div>

                <div id="personal-projects">
                    {groupTitle(<FaHome />, t.projects.personal, false)}
                    {personal.length ? (
                        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            <AnimatePresence mode="popLayout">
                                {visiblePersonal.map((p, i) => (
                                    <ProjectCard key={p.slug} project={p} onOpen={setSelected} className={fit(i)} />
                                ))}
                            </AnimatePresence>
                        </motion.ul>
                    ) : (
                        <p className="text-muted text-center py-10">{t.projects.empty}</p>
                    )}

                    <div className="w-full flex items-center justify-center mt-10 gap-6">
                        {hasMore && (
                            <button
                                onClick={() => setVisibleRows((r) => r + 1)}
                                aria-label={t.projects.showMore}
                                title={t.projects.showMore}
                                className="p-3 border-2 border-line text-muted hover:text-ink hover:bg-accent hover:border-accent transition-colors duration-300"
                            >
                                <RiAddLine size={28} />
                            </button>
                        )}
                        {visibleRows > 1 && (
                            <button
                                onClick={() => {
                                    setVisibleRows(1);
                                    document.getElementById("personal-projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                aria-label={t.projects.showLess}
                                title={t.projects.showLess}
                                className="p-3 border-2 border-line text-muted hover:text-canvas hover:bg-fg hover:border-fg transition-colors duration-300"
                            >
                                <RiSubtractLine size={28} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>{selected && <ProjectsModal key={selected.slug} project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
        </section>
    );
}
