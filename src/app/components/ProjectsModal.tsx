'use client';

import { useRef } from "react";
import { motion } from "framer-motion";
import { RiCloseLine, RiExternalLinkLine, RiGithubFill, RiLinkedinBoxFill, RiCheckLine } from "react-icons/ri";
import { BsStars } from "react-icons/bs";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import { useDialog } from "../hooks/useDialog";
import type { Project } from "../types/Home";
import ProjectMedia from "./Projects/ProjectMedia";
import CaseDiagram from "./Projects/CaseDiagram";
import BalloonTooltip from "./BalloonTooltip";

/** Detalhe do projeto: case (Problema → Solução → Resultado) ou descrição, com mídia e links. */
export default function ProjectsModal({ project, onClose }: { project: Project; onClose: () => void }) {
    const { t } = useI18n();
    const closeRef = useRef<HTMLButtonElement>(null);
    useDialog(true, onClose, closeRef);

    const text = t.projects.items[project.slug as keyof typeof t.projects.items];
    const isCase = "problem" in text;
    const titleId = `project-title-${project.slug}`;

    const links = [
        project.projectLink && { href: project.projectLink, label: t.projects.open, icon: <RiExternalLinkLine /> },
        project.repositoryLink && { href: project.repositoryLink, label: t.projects.repo, icon: <RiGithubFill /> },
        project.linkedIn && { href: project.linkedIn, label: t.projects.linkedin, icon: <RiLinkedinBoxFill /> },
    ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`${roboto.className} relative w-full sm:w-[92vw] max-w-5xl max-h-[92dvh] flex flex-col bg-canvas text-fg border-t-4 border-accent overflow-hidden shadow-2xl`}
            >
                <header className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-line">
                    <div>
                        <h3 id={titleId} className="text-xl sm:text-3xl font-bold">
                            {text.name}
                        </h3>
                        {"role" in text && (
                            <p className="text-sm text-muted mt-1">
                                {text.role} · {text.status}
                            </p>
                        )}
                    </div>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        aria-label={t.projects.close}
                        className="shrink-0 w-10 h-10 border border-line flex items-center justify-center text-2xl hover:border-accent hover:text-accent-fg transition-colors"
                    >
                        <RiCloseLine />
                    </button>
                </header>

                <div className="overflow-y-auto overscroll-contain">
                    <div className="relative bg-surface-2">
                        {project.diagram && "diagram" in text ? (
                            <div className="pt-12 bg-[#121311]">
                                <CaseDiagram data={text.diagram} />
                            </div>
                        ) : (
                            <ProjectMedia
                                detail
                                src={project.media}
                                alt={text.alt}
                                icons={project.icons}
                                fallbackLabel={t.projects.mediaUnavailable}
                                sizes="(min-width: 1024px) 1000px, 100vw"
                                className="max-h-[55dvh] aspect-video"
                            />
                        )}
                        {project.nda && (
                            <div className="absolute top-3 left-3">
                                <BalloonTooltip text={project.diagram ? t.projects.ndaDiagram : t.projects.ndaText} position="bottom">
                                    <span className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 flex items-center gap-2 border-l-2 border-[#aadd49] hover:bg-black/80">
                                        <BsStars className="text-[#aadd49]" aria-hidden="true" />
                                        {t.projects.nda}
                                    </span>
                                </BalloonTooltip>
                            </div>
                        )}
                    </div>

                    <div className="p-5 sm:p-8 space-y-8">
                        {isCase ? (
                            <>
                                {"badge" in text && (
                                    <span className="inline-block bg-accent text-ink text-xs font-bold px-3 py-1.5">{text.badge}</span>
                                )}
                                <div className="grid md:grid-cols-3 gap-1">
                                    {(
                                        [
                                            [t.projects.problem, text.problem],
                                            [t.projects.solution, text.solution],
                                            [t.projects.result, text.result],
                                        ] as const
                                    ).map(([label, body], i) => (
                                        <div key={label} className={`p-5 ${i === 2 ? "bg-accent text-ink" : "bg-surface"}`}>
                                            <p className={`text-xs uppercase tracking-widest font-bold mb-2 ${i === 2 ? "text-ink/70" : "text-accent-fg"}`}>{label}</p>
                                            <p className={`text-sm leading-relaxed ${i === 2 ? "text-ink" : "text-fg/90"}`}>{body}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-muted mb-3">{t.projects.highlights}</p>
                                    <ul className="space-y-2">
                                        {text.highlights.map((h) => (
                                            <li key={h} className="flex gap-2 text-sm">
                                                <RiCheckLine className="shrink-0 mt-0.5 text-accent-fg" aria-hidden="true" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className="max-w-3xl text-sm sm:text-base leading-relaxed text-fg/90 space-y-3">
                                {"description" in text &&
                                    text.description.split("\n").filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                            </div>
                        )}

                        <div className="flex gap-3 text-[1.7rem] text-accent-fg" aria-hidden="true">
                            {project.icons}
                        </div>
                    </div>
                </div>

                {links.length > 0 && (
                    <footer className="p-4 flex flex-wrap items-center justify-center gap-3 border-t border-line bg-surface">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-accent text-ink text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                                {l.icon}
                                {l.label}
                            </a>
                        ))}
                    </footer>
                )}
            </motion.div>
        </motion.div>
    );
}
