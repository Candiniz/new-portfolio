'use client';

import { Project } from "../types/Home";
import Image from "next/image";
import { roboto } from "../fonts/Fonts";
import { useEffect, useState } from "react";
import ProjectsModal from "./ProjectsModal";
import { AnimatePresence, motion } from "framer-motion";
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { FaBuilding, FaHome } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useTypingEffect } from '../hooks/useTypingEffect';

interface ProjectsProps {
    // Agora o componente recebe as duas listas separadas
    corporateProjects: Project[];
    personalProjects: Project[];
}

interface ProjectsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    position: { top: number; left: number; width: number; height: number } | null;
}

const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById("projects-typing-title");
    if (element) element.classList.remove("visible");

    const interval = setInterval(() => {
        if (element) {
            element.textContent = text.slice(0, index + 1);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                if (element) element.classList.add("visible");
                callback();
            }
        }
    }, 100);
};

export default function Projects({ corporateProjects, personalProjects }: ProjectsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalPosition, setModalPosition] = useState<{
        top: number; left: number; width: number; height: number
    } | null>(null);
    const { displayedText, isTypingDone, containerRef } = useTypingEffect("Portfólio & Cases");

    // ESTADOS PARA O BOTÃO "VER MAIS"
    const [columns, setColumns] = useState(3); // Por padrão, 3 colunas (desktop)
    const [visibleRows, setVisibleRows] = useState(1); // Começa mostrando apenas 1 linha

    const handleOpenModal = (project: Project, cardElement: HTMLElement) => {
        const rect = cardElement.getBoundingClientRect();
        setModalPosition({
            top: rect.top, left: rect.left, width: rect.width, height: rect.height,
        });
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedProject(null);
            setModalPosition(null);
        }
    }, [isModalOpen]);

    // LÓGICA DO GRID ESPELHANDO O TAILWIND
    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            // Espelhando exatamente as suas classes: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            if (width < 640) setColumns(1); // mobile
            else if (width < 1024) setColumns(2); // sm e md
            else setColumns(3); // lg e superiores
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Cálculos derivados para os botões
    const visibleCount = visibleRows * columns;
    const visiblePersonalProjects = personalProjects.slice(0, visibleCount);
    const hasMore = visibleCount < personalProjects.length;
    const canHide = visibleRows > 1;

    // Função de Scroll Suave
    const scrollToAnchor = (e: React.MouseEvent, offset: number = 100) => {
        e.preventDefault();
        const element = document.getElementById("personal-projects-section");
        if (element) {
            window.scrollTo({
                top: element.offsetTop - offset,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <AnimatePresence>
                {isModalOpen && selectedProject && modalPosition && (
                    <ProjectsModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        project={selectedProject}
                        position={modalPosition}
                    />
                )}
            </AnimatePresence>

            <div className="w-full mb-5 scroll-mt-24 mx-auto" id="projects">

                {/* Título Principal */}
                <div ref={containerRef} id="projects-title-container" className="h-fit w-full">
                    <h2 className={`${roboto.className} lg:pl-9 lg:ml-20 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start  min-[2000px]:pl-[calc(50vw-1000px)]`}>
                        <span id="projects-typing-title">{displayedText}</span>
                        <span className={`text-[#aadd49] ${isTypingDone ? "visible" : "invisible"}`} style={{ marginLeft: "5px", animation: "blink 1s steps(1, end) infinite" }}>_</span>
                    </h2>
                </div>
                <div className="bg-gray-800 h-[2px] w-full reveal" style={{ transitionDelay: "0.2s" }}></div>
                <div className="bg-gray-500 h-[4px] w-full mt-[4px] reveal" style={{ transitionDelay: "0.4s" }}></div>
                <div className="bg-[#aadd49] h-[6px] w-full mt-[4px] mb-20 reveal" style={{ transitionDelay: "0.6s" }}></div>

                <div className="max-w-[2000px] mx-auto">
                    {/* SESSÃO 1: CASOS DE USO CORPORATIVO */}
                    <section className="px-1 mb-24">
                        <h3
                            className={`${roboto.className} py-2 bg-[#aadd49] text-sm md:text-xl lg:text-2xl xl:text-3xl 
                                font-bold text-black lg:pl-10 mb-1 text-center lg:text-left flex items-center gap-5 reveal`}
                            style={{ transitionDelay: "0.2s" }}
                        >
                            <span className="bg-black p-2 text-[#aadd49]"><FaBuilding /></span> SOLUÇÕES CORPORATIVAS
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center w-full mx-auto reveal" style={{ transitionDelay: "0.4s" }}>
                            {corporateProjects.map((project, index) => (
                                <li
                                    key={project.name + index}
                                    className="reveal relative group flex flex-col items-center justify-between transition-transform duration-500 cursor-pointer overflow-hidden shadow-lg"
                                    onClick={(e) => handleOpenModal(project, e.currentTarget)}
                                    style={{ transitionDelay: `${200 + (index % 5) * 150}ms` }}
                                >
                                    {/* ADICIONADO: aspect-[2/1] para manter a proporção exata do outro card */}
                                    <div className="w-full aspect-[2/1] bg-[#1d1d1d] relative">
                                        {project.image.url.endsWith('.mp4') ? (
                                            <video
                                                src={project.image.url}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <Image
                                                src={project.image.url}
                                                alt={project.image.alt}
                                                width={600}
                                                height={300}
                                                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
                                            />
                                        )}

                                        {["digitalizafinanceiro", "ipscraper", "rpa-python-architecture", "opicedesk", "chatopice"].includes(project.slug) && (
                                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] lg:text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 z-20">
                                                <BsStars className="text-[#aadd49]" />
                                                <span>NDA Compliant</span>
                                            </div>
                                        )}


                                        {/* Overlay escuro idêntico ao modelo Pessoal */}
                                        <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-500 group-hover:opacity-0"></div>

                                        {/* Textos que somem no hover */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 group-hover:opacity-0">
                                            <p className="text-white text-lg font-semibold text-center px-2 drop-shadow-md">
                                                {project.name}
                                            </p>
                                            <div className="flex items-center justify-center gap-2 text-2xl text-[#aadd49] mt-1">
                                                {project.icons}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botão 'Ver mais' que desliza de baixo para cima */}
                                    <div className="absolute inset-0 z-10 text-white flex flex-col items-center justify-center gap-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenModal(project, e.currentTarget.parentElement!);
                                            }}
                                            className="px-4 py-2 bg-[#aadd49] text-black font-semibold transition-all hover:bg-[#c2f268]"
                                        >
                                            Ver mais
                                        </button>
                                    </div>

                                    <div className="w-full h-[4px] bg-[#aadd49]"></div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* SESSÃO 2: PROJETOS PESSOAIS & OPEN SOURCE */}
                    <section id="personal-projects-section" className="scroll-mt-32">
                        <h3
                            className={`${roboto.className} py-2 bg-gray-800 text-sm md:text-xl lg:text-2xl xl:text-3xl 
                                font-bold text-gray-400 lg:pl-10 mb-1 text-center lg:text-left reveal flex items-center gap-5`}
                            style={{ transitionDelay: "0.2s" }}
                        >
                            <span className="bg-gray-400 p-2 text-gray-800"><FaHome /></span> PROJETOS PESSOAIS & OPEN SOURCE
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 justify-center w-full mx-auto reveal" style={{ transitionDelay: "0.4s" }}>
                            <AnimatePresence mode="popLayout">
                                {visiblePersonalProjects.map((project, index) => (
                                    <motion.li
                                        key={project.name + index}
                                        className="reveal relative group flex flex-col items-center justify-between duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                                        onClick={(e) => handleOpenModal(project, e.currentTarget)}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50, scale: 0.95 }}
                                        style={{ transitionDelay: `${200 + (index % 5) * 100}ms` }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                            // Adiciona um micro-delay baseado no index para não entrarem todos exatamente no mesmo milissegundo
                                            delay: (index % columns) * 0.1
                                        }}
                                    >
                                        <div className="w-full aspect-[2/1] bg-gray-200 relative">
                                            <Image
                                                src={project.image.url}
                                                alt={project.image.alt}
                                                width={600}
                                                height={300}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-500 group-hover:opacity-0"></div>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 group-hover:opacity-0">
                                                <p className="text-white text-lg font-semibold text-center px-2">
                                                    {project.name}
                                                </p>
                                                <div className="flex items-center justify-center gap-2 text-2xl text-[#aadd49]">
                                                    {project.icons}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 text-white flex flex-col items-center justify-center gap-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleOpenModal(project, e.currentTarget.parentElement!);
                                                }}
                                                className="px-4 py-2 bg-[#aadd49] text-black transition-all hover:bg-[#6b86b7]"
                                            >
                                                Ver mais
                                            </button>
                                        </div>
                                        <div className="w-full h-[4px] bg-[#aadd49] group-hover:bg-[#aadd49] transition-colors duration-500"></div>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>

                        {/* CONTROLES DE PAGINAÇÃO (BOTÕES) */}
                        <div className="w-full flex items-center justify-center mt-12 gap-8">
                            {hasMore && (
                                <button
                                    onClick={() => setVisibleRows((prev) => prev + 1)}
                                    className="group flex flex-col items-center justify-center text-[#676767] hover:text-[#aadd49] transition-colors duration-300"
                                >
                                    <div className="p-3 border-2 border-transparent group-hover:border-[#aadd49] rounded-full transition-all duration-300 transform group-hover:scale-110">
                                        <RiAddLine size={32} />
                                    </div>
                                </button>
                            )}

                            {canHide && (
                                <button
                                    onClick={(e) => {
                                        setVisibleRows(1);
                                        scrollToAnchor(e);
                                    }}
                                    className="group flex flex-col items-center justify-center text-[#676767] hover:text-white transition-colors duration-300"
                                >
                                    <div className="p-3 border-2 border-transparent group-hover:border-white rounded-full transition-all duration-300 transform group-hover:scale-110">
                                        <RiSubtractLine size={32} />
                                    </div>
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}