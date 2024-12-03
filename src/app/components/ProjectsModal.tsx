/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { roboto } from "../fonts/Fonts";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        name: string;
        icons: JSX.Element;
        projectLink: string,
        repositoryLink: string,
        linkedIn: string,
        image: { url: string; alt: string };
        description?: string;
    } | null;
    position: { top: number; left: number; width: number; height: number } | null;
}

export default function Modal({ isOpen, onClose, project, position }: ModalProps) {
    if (!project || !position) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Fundo com blur e clique para fechar */}
                    <motion.div
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
                    />

                    {/* Modal com animação */}
                    <motion.div
                        initial={{
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            height: position.height,
                            opacity: 0,
                        }}
                        animate={{
                            top: "50%",
                            left: "50%",
                            width: "80vw",
                            height: "auto",
                            opacity: 1,
                            transform: "translate(-50%, -50%)",
                        }}
                        exit={{
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            height: position.height,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`${roboto.className} fixed bg-[#25252565] rounded-t-lg shadow-lg z-50 overflow-hidden`}
                    >
                        <div className="flex w-full !bg-[#353535b7] justify-between items-center p-4 mt-3">
                            <h3 className="text-1xl sm:text-3xl font-bold ml-10 ">{project.name}</h3>
                            <button onClick={onClose} className="text-white hover:text-gray-500 pr-4">
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        <div className="p-4 w-full flex flex-col lg:flex-row justify-center items-center lg:items-start">
                            <img
                                src={project.image.url}
                                alt={project.image.alt}
                                className="rounded-lg object-contain
                                lg:w-[65%]"
                            />
                            <div className="flex flex-col lg:ml-4">
                                <p className="text-white mb-4 mt-4 text-justify
                                text-[0.65rem] sm:text-xs lg:mx-4

                                ">
                                    {project.image.alt}
                                </p>
                                <div className="flex items-center justify-center lg:justify-start lg:mx-4 gap-2 text-[#aadd49]">{project.icons}</div>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-center gap-3 text-[0.5rem] text-center sm:text-xs w-full !bg-[#353535b7]">
                            <a
                                href={project.projectLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                            >
                                Acessar Projeto
                            </a>
                            <a
                                href={project.repositoryLink || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                            >
                                Acessar Repositório
                            </a>
                            <a
                                href={project.linkedIn || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#aadd49] text-black rounded-md hover:bg-[#89b537] transition-colors"
                            >
                                Ver Post no LinkedIn
                            </a>
                        </div>
                        <div className="w-full h-[4px] bg-[#aadd49]"></div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
