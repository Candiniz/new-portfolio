'use client';

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { roboto } from "../fonts/Fonts";
import { useI18n } from "@/i18n/I18nProvider";
import SectionTitle from "./SectionTitle";

const LOGOS: Record<string, string> = {
    fatec: "/fatec.png",
    pucrs: "/pucrs.png",
    uam: "/uam.png",
};

const COURSE_LOGOS: Record<string, string> = {
    "html-css": "/udemy.png",
    ztm: "/ztm.png",
    js: "/udemy.png",
    node: "/udemy.png",
};

function Expandable({ open, children }: { open: boolean; children: React.ReactNode }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Formação compacta, em blocos colados de borda a borda: graduações (com o
 * marcador verde da linha do tempo na lateral) e cursos livres agrupados.
 */
export default function Education() {
    const { t } = useI18n();
    const [openId, setOpenId] = useState<string | null>(null);
    const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

    const heading = (label: string) => (
        <p className={`${roboto.className} bg-fg text-canvas text-xs sm:text-sm uppercase tracking-widest font-bold px-5 lg:px-8 py-3`}>{label}</p>
    );

    return (
        <section id="education" className="pb-28">
            <SectionTitle title={t.education.title} />

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-1">
                <div className="flex flex-col gap-1">
                    {heading(t.education.academic)}
                    {/* flex-1 nas listas e nas linhas: lado a lado, as duas colunas terminam na mesma altura */}
                    <ol className="flex-1 flex flex-col gap-1">
                        {t.education.items.map((item) => {
                            const open = openId === item.id;
                            return (
                                <li key={item.id} data-draw="box" className={`flex-1 flex flex-col bg-surface border-l-4 ${open ? "border-accent" : "border-line"} transition-colors duration-300`}>
                                    <button onClick={() => toggle(item.id)} aria-expanded={open} className="flex-1 w-full text-left px-5 lg:px-8 py-5 flex items-center gap-4 hover:bg-surface-2 transition-colors">
                                        <Image src={LOGOS[item.id]} alt="" width={40} height={40} className="w-10 h-10 object-contain shrink-0" />
                                        <span className="flex-1 min-w-0">
                                            <span className={`${roboto.className} block font-bold text-fg leading-snug`}>{item.degree}</span>
                                            <span className="block text-sm text-muted">{item.institution}</span>
                                        </span>
                                        <span className={`${roboto.className} hidden sm:block text-sm font-bold text-accent-fg whitespace-nowrap`}>{item.period}</span>
                                        <span className="text-lg text-muted" aria-hidden="true">
                                            {open ? <RiSubtractLine /> : <RiAddLine />}
                                        </span>
                                    </button>
                                    <Expandable open={open}>
                                        <p className="text-sm text-muted leading-relaxed px-5 lg:px-8 pb-5 pl-[4.75rem] lg:pl-[5.75rem]">
                                            <span className={`${roboto.className} sm:hidden block text-xs font-bold text-accent-fg mb-1`}>{item.period}</span>
                                            {item.description}
                                        </p>
                                    </Expandable>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div className="flex flex-col gap-1">
                    {heading(`${t.education.courses} · Udemy`)}
                    <ul data-draw="box" className="flex-1 flex flex-col gap-1">
                        {t.education.courseList.map((c) => {
                            const open = openId === c.id;
                            return (
                                <li key={c.id} className="flex-1 flex flex-col bg-surface">
                                    <button onClick={() => toggle(c.id)} aria-expanded={open} className="flex-1 w-full flex items-center gap-3 px-5 lg:px-8 py-4 text-left hover:bg-surface-2 transition-colors">
                                        <Image src={COURSE_LOGOS[c.id]} alt="" width={28} height={28} className="w-7 h-7 object-contain shrink-0" />
                                        <span className="flex-1 min-w-0">
                                            <span className="block text-sm font-semibold text-fg leading-snug">{c.title}</span>
                                            <span className="block text-xs text-muted">{c.author}</span>
                                        </span>
                                        <span className="text-muted" aria-hidden="true">
                                            {open ? <RiSubtractLine /> : <RiAddLine />}
                                        </span>
                                    </button>
                                    <Expandable open={open}>
                                        <p className="text-sm text-muted leading-relaxed px-5 lg:px-8 pb-4 pl-[4.25rem] lg:pl-[5.25rem]">{c.description}</p>
                                    </Expandable>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="bg-surface text-xs text-muted px-5 lg:px-8 py-3">{t.education.coursesSummary}</p>
                </div>
            </div>
        </section>
    );
}
