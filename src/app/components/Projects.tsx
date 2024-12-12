'use client';

import { Project } from "../types/Home";
import Image from "next/image";
import { roboto } from "../fonts/Fonts";
import { useEffect, useState } from "react";
import ProjectsModal from "./ProjectsModal";
import { AnimatePresence } from "framer-motion";

interface ProjectsProps {
    projects: Project[];
}

interface ProjectsModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    position: { top: number; left: number; width: number; height: number } | null;
}


// Função de efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById("projects-typing-title");
    if (element) element.classList.remove("visible"); // Garante invisibilidade inicial

    const interval = setInterval(() => {
        if (element) {
            element.textContent = text.slice(0, index + 1);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                if (element) element.classList.add("visible"); // Torna visível após digitar
                callback();
            }
        }
    }, 100);
};

export default function Projects({ projects }: ProjectsProps) {
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalPosition, setModalPosition] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);

    const handleOpenModal = (project: Project, cardElement: HTMLElement) => {
        const rect = cardElement.getBoundingClientRect();
        setModalPosition({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });
        setSelectedProject(project);
        setIsModalOpen(true);
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!isModalOpen) {
            setSelectedProject(null);
            setModalPosition(null);
        }
    }, [isModalOpen]);
    

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("projects-typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Limpa texto ao entrar na viewport
                        setIsTypingDone(false); // Reinicia o estado
                        typingEffect("Projetos Recentes", () => setIsTypingDone(true));
                    } else {
                        if (element) element.textContent = ""; // Garante que o texto desapareça ao sair
                        setIsTypingDone(false); // Desativa o estado
                    }
                });
            },
            { threshold: 0.5 } // Aciona quando 50% do título está visível
        );

        const target = document.getElementById("projects-title-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <AnimatePresence
            >
                {isModalOpen && selectedProject && modalPosition && (
                    <ProjectsModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        project={selectedProject}
                        position={modalPosition}
                    />
                )}
            </AnimatePresence>

            <div className="w-full mt-36 mb-5 scroll-mt-24" id="projects">
                {/* Cabeçalho com efeito de digitação */}
                <div
                    id="projects-title-container"
                    className="h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff]`}
                    >
                        <span id="projects-typing-title"></span>
                        <span
                            className={`text-[#aadd49] ${isTypingDone ? "visible" : "invisible"
                                }`}
                            style={{
                                marginLeft: "5px",
                                animation: "blink 1s steps(1, end) infinite",
                            }}
                        >
                            _
                        </span>
                    </h2>
                </div>
                <div className="bg-[#676767] h-[2px] w-full"></div>
            </div>

            <article className="space-y-16 flex flex-col items-center xl:items-start text-center xl:text-left px-10">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center xl:justify-start w-full">
                    {projects.map((project, index) => (
                        <li
                            key={project.name + index}
                            className="relative group flex flex-col items-center transition-transform duration-500 hover:scale-105"
                            onClick={(e) => {
                                handleOpenModal(project, e.currentTarget);
                            }}
                        >

                            <div className="w-full aspect-[2/1] overflow-hidden bg-gray-200 relative">
                                <Image
                                    src={project.image.url}
                                    alt={project.image.alt}
                                    width={600}
                                    height={300}
                                    
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-500 group-hover:opacity-0"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 group-hover:opacity-0">
                                    <p className="text-white text-lg font-semibold">
                                        {project.name}
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-2xl text-[#aadd49]">
                                        {project.icons}
                                    </div>
                                </div>
                                <div className="absolute inset-0 text-white flex flex-col items-center justify-center gap-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleOpenModal(project, e.currentTarget.parentElement!);
                                        }}
                                        className="px-4 py-2 bg-[#aadd49] text-black hover:bg-blue-700"
                                    >
                                        Ver mais
                                    </button>
                                </div>
                            </div>
                            <div className="w-full h-[4px] bg-[#aadd49]"></div>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}
