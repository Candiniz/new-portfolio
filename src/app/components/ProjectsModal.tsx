/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { roboto } from "../fonts/Fonts";
import styles from './ProjectsModal.module.css'
import { useEffect, useState } from "react";
import { Project } from "../types/Home";
import { BsStars } from "react-icons/bs";
import BalloonTooltip from "./BalloonTooltip";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
    position: { top: number; left: number; width: number; height: number } | null;
}

const NDAtext = "Visando a segurança da informação e o estrito cumprimento de acordos de confidencialidade (NDA), a identidade visual e os dados sensíveis desta interface foram higienizados e recriados utilizando inteligência artificial generativa (Gemini). A estrutura arquitetural, usabilidade (UX) e design de interface (UI) permanecem fiéis ao ecossistema original desenvolvido."

export default function Modal({ isOpen, onClose, project, position }: ModalProps) {
    const [exitComplete, setExitComplete] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.documentElement.style.overflow = ""; // Reseta ao desmontar
        };
    }, [isOpen]);

    if (!project || !position) return null;

    const renderDescription = (text: string) => {
        return text.split("\n").map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
        ));
    };

    const handleExitComplete = () => {
        setExitComplete(true);  // Marca que a animação de saída foi completada
    };

    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50"
                        onAnimationComplete={handleExitComplete}
                    />

                    {/* Barra Verde Animada */}
                    <motion.div
                        initial={{
                            top: position.top + position.height - 4,
                            left: position.left,
                            width: position.width,
                            height: 4,
                        }}
                        animate={{
                            top: "calc(100% - 4px)",
                            left: "50%",
                            transform: "translate(-50%)",
                            width: "80%",
                            height: 4,
                            transition: { duration: 0.5, ease: "easeInOut" },
                        }}
                        exit={{
                            top: position.top + position.height - 4,
                            left: position.left,
                            width: position.width,
                            height: 4,
                            transition: { duration: 0.5, ease: "easeInOut" },
                        }}
                        className="fixed bg-[#aadd49] z-50"
                    />

                    {/* Modal Principal Animado */}
                    <motion.div
                        key="modal"
                        initial={{
                            top: "100vh",
                            opacity: 0,
                            transform: "translateX(-50%)",
                        }}
                        animate={{
                            top: "0",
                            opacity: 1,
                            transform: "translateX(-50%)",
                            transition: {
                                delay: 0.5,
                                duration: 0.5,
                                ease: "easeInOut",
                            },
                        }}
                        exit={{
                            top: "100vh",
                            opacity: 0,
                            transform: "translateX(-50%)",
                            transition: { duration: 0.5, ease: "easeInOut" },
                        }}
                        className={`${roboto.className} fixed inset-0 left-1/2 transform -translate-x-1/2 w-[80%] bg-[#25252565] rounded-t-lg shadow-lg z-50 h-[100dvh] max-h-[100dvh] flex flex-col`}
                    >
                        {/* Título no topo */}
                        <div className="flex w-full !bg-[#353535b7] justify-between items-center p-4">
                            <h3 className="text-1xl sm:text-3xl font-bold ml-10">{project.name}</h3>
                            <button onClick={onClose} className="text-white hover:text-gray-500 pr-4">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>

                        {/* Conteúdo no centro com scroll automático */}
                        <div className={styles.container}>
                            <div className="relative flex flex-col justify-center items-center">
                                <div className="imageWrapper flex justify-center mt-4">
                                    {project.image.url.endsWith('.mp4') ? (
                                        <video
                                            src={project.image.url}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="object-contain w-[90%] lg:w-[750px] aspect-video"
                                        />
                                    ) : (
                                        <img
                                            src={project.image.url}
                                            alt={project.image.alt}
                                            className="object-cover w-[90%] lg:w-[750px]"
                                        />
                                    )}
                                </div>
                                {["digitalizafinanceiro", "ipscraper", "rpa-python-architecture", "opicedesk", "chatopice"].includes(project.slug) && (
                                    <div className="absolute top-3 left-10 z-40">
                                        <div className="relative w-full h-full">
                                            <BalloonTooltip text={NDAtext} position="bottom">
                                            <div className="bg-black/60 backdrop-blur-md text-white text-[10px] lg:text-xs px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 hover:bg-gray-700/80 hover:scale-105 transition-all cursor-pointer">
                                                <BsStars className="text-[#aadd49]" />
                                                <span>NDA Compliant</span>
                                            </div>
                                        </BalloonTooltip>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4 max-w-[750px] lg:w-[750px] m-auto text-justify text-xs lg:text-base px-5 sm:px-8 lg:px-0">
                                    {project.description && renderDescription(project.description)}
                                </div>
                                <div className="flex gap-3 my-10 text-[#aadd49] m-auto text-[1.7rem] ">
                                    {project.icons}
                                </div>
                            </div>
                        </div>

                        {/* Botões fixados na base */}
                        <div className="p-4 flex items-center justify-center gap-3 text-[0.5rem] text-center sm:text-xs w-full !bg-[#353535b7]">

                            {project.projectLink && (
                                <a
                                    href={project.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                                >
                                    Acessar Projeto
                                </a>
                            )}

                            {project.repositoryLink && (
                                <a
                                    href={project.repositoryLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                                >
                                    Acessar Repositório
                                </a>
                            )}

                            {project.linkedIn && (
                                <a
                                    href={project.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                                >
                                    Ver Post no LinkedIn
                                </a>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

    );
}
