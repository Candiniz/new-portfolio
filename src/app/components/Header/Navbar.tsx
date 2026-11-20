'use client';

import { RiUserLine, RiCodeLine, RiBriefcaseLine, RiGraduationCapLine, RiMailLine, RiFlowChart } from "react-icons/ri";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import zLogo from "../../../photos/cd-logo2.png";
import { roboto } from "@/app/fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

// Ids das seções da página, na ordem em que aparecem
export const SECTIONS = ["how", "skills", "projects", "experience", "education", "about", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

const ICONS: Record<SectionId, React.ReactNode> = {
    how: <RiFlowChart />,
    skills: <RiCodeLine />,
    projects: <HiOutlineCog8Tooth />,
    experience: <RiBriefcaseLine />,
    education: <RiGraduationCapLine />,
    about: <RiUserLine />,
    contact: <RiMailLine />,
};

/** Seção visível agora (para destacar o link e manter a posição ao trocar de idioma). */
function useActiveSection() {
    const [active, setActive] = useState<SectionId | null>(null);
    useEffect(() => {
        const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
        if (!els.length) return;
        const inBand = new Set<string>();
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => (e.isIntersecting ? inBand.add(e.target.id) : inBand.delete(e.target.id)));
                // a primeira seção (na ordem da página) que cruza a faixa; nenhuma = nada destacado
                setActive((SECTIONS.find((id) => inBand.has(id)) as SectionId | undefined) ?? null);
            },
            { rootMargin: "-40% 0px -55% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
    return active;
}

export default function Navbar() {
    const { t, locale } = useI18n();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const active = useActiveSection();

    // Esc fecha o menu do celular
    useEffect(() => {
        if (!isMenuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isMenuOpen]);

    const linkClass = (id: SectionId) =>
        `whitespace-nowrap px-2 xl:px-2.5 py-2 transition-colors duration-300 ease-out hover:bg-accent hover:text-ink ${
            active === id ? "text-accent-fg" : "text-fg"
        }`;

    return (
        <>
            <header className={`${roboto.className} fixed top-0 z-50 w-full text-sm bg-canvas/85 backdrop-blur-md`}>
                <div className="flex items-center justify-between gap-4 py-2 px-4 sm:px-8 w-full max-w-[2000px] mx-auto">
                    <Link href={`/${locale}`} aria-label={t.nav.home} className="shrink-0">
                        <Image alt="Candiniz" src={zLogo} priority className="h-[42px] sm:h-[50px] w-auto invert-on-light" />
                    </Link>

                    <nav aria-label="Principal" className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[0.8rem] xl:text-[0.95rem] min-[2000px]:text-xl">
                        {SECTIONS.map((id) => (
                            <a key={id} href={`#${id}`} className={linkClass(id)} aria-current={active === id ? "true" : undefined}>
                                {t.nav[id]}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <LanguageSwitch activeSection={active} />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMenuOpen((v) => !v)}
                            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <span className={`absolute h-[2px] w-7 bg-fg transition-transform duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-2"}`} />
                            <span className={`absolute h-[2px] w-7 bg-fg transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
                            <span className={`absolute h-[2px] w-7 bg-fg transition-transform duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-2"}`} />
                        </button>
                    </div>
                </div>
                <div className={`bg-accent h-[2px] w-full transition-shadow duration-300 ${isMenuOpen ? "shadow-[0_0_15px_2px_rgb(var(--c-accent))]" : ""}`} />
            </header>

            {/* Menu do celular: ícone + texto sempre visíveis (sem depender de hover) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed lg:hidden inset-0 z-40 bg-canvas/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.nav
                            id="mobile-menu"
                            aria-label="Principal"
                            className={`${roboto.className} fixed right-0 top-0 h-full w-[min(78vw,320px)] bg-canvas border-l-2 border-accent pt-28 px-6 flex flex-col gap-2`}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {SECTIONS.map((id) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center gap-4 text-xl py-3 px-3 transition-colors hover:bg-surface-2 ${
                                        active === id ? "text-accent-fg" : "text-fg"
                                    }`}
                                >
                                    <span className="text-2xl">{ICONS[id]}</span>
                                    {t.nav[id]}
                                </a>
                            ))}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
