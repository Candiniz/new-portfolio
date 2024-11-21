import { Project } from "../types/Home";
import Image from "next/image";
import { ibmPlexMono } from "../fonts/Fonts";

import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaJs } from "react-icons/fa";

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <>
            <div className="w-full mb-5">
                <div className="bg-gradient-to-t from-[#21232b] to-[#303446] h-fit w-full">
                    <h2 className="lg:pl-9 text-4xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff]">
                        Projetos Recentes
                    </h2>
                </div>
                <div className="bg-[#aadd49] h-[4px] w-full"></div>
            </div>
            <article
                className={`${ibmPlexMono.className} space-y-16 flex flex-col items-center xl:items-start text-center xl:text-left px-10`}
            >
            

                
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center xl:justify-start w-full">
                    {projects.map((project, index) => (
                        <li
                            key={project.name + index}
                            className="relative group flex flex-col items-center transition-transform duration-500 hover:scale-105"
                        >
                            {/* Imagem e overlay */}
                            <div className="w-full aspect-[2/1] overflow-hidden bg-gray-200 relative">
                                <Image
                                    src={project.image.url}
                                    alt={project.image.alt}
                                    width={600}
                                    height={300}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Overlay inicial escuro */}
                                <div className="absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-500 group-hover:opacity-0"></div>

                                {/* Título e Ícones */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500 group-hover:opacity-0">
                                    <p className="text-white text-lg font-semibold">{project.name}</p>
                                    <div className="flex items-center justify-center gap-2 text-2xl text-[#aadd49]">
                                        <FaHtml5 />
                                        <FaJs />
                                        <FaCss3Alt />
                                    </div>
                                </div>

                                {/* Div deslizante com botão */}
                                <div className="absolute inset-0  text-white flex flex-col items-center justify-center gap-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                    <button className="px-4 py-2 bg-[#aadd49] text-black hover:bg-blue-700">
                                        Ver mais
                                    </button>
                                </div>
                            </div>

                            {/* Barra inferior */}
                            <div className="w-full h-[4px] bg-[#aadd49]"></div>
                        </li>
                    ))}
                </ul>
            </article>
        </>
    );
}
