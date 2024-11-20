import Link from "next/link";
import { Project } from "../types/Home";
import Image from "next/image";
import { ibmPlexMono, oswald } from "../fonts/Fonts";

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <article className={`${ibmPlexMono.className} space-y-16 flex flex-col items-center xl:items-start text-center xl:text-left px-10`}>
            <div className="bg-[#43454f] w-full">
                <h2 className="sm:pl-9 text-4xl md:text-7xl font-black text-[#c1c6de]">Projetos Recentes</h2>  
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center xl:justify-start w-full">
                {projects.map((project, index) => (
                    <Link href={`/projects/${project.slug}`} key={project.name + index}>
                        <li className="relative text-md flex flex-col items-center">
                            <div className="relative  mb-4">
                                <Image
                                    src={project.image.url}
                                    alt={project.image.alt}
                                    width={300}
                                    height={300}
                                    className="shadow-2xl rounded-2xl"
                                />
                                {/* Índice fixado no canto inferior direito */}
                                <h2 className="bg-[#787d96] rounded-xl w-[3.5rem] h-[3.5rem] text-center 
                                    flex justify-center items-center text-3xl absolute bottom-4 right-4">
                                    {index + 1}
                                </h2>

                            </div>
                            <h2 className={`${oswald.className} font-bold text-lg text-[#c1c6de]`}>{project.name}</h2>
                            <p className="
                            xl:text-base md:text-[1.5vw] lg:text-[1.1vw]
                            mt-4 w-full min-h-0 sm:min-h-[8rem] text-center bg-[#43454f] text-[#c1c6de] py-3 rounded-lg flex items-center px-4">{project.image.alt}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </article>
    );
}
