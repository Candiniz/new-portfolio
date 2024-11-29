'use client';

import "../globals.css";
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaWordpress, FaSass } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

// Atualização da constante skills com descrições
const skills = [
    { icon: <FaHtml5 />, name: "HTML5", description: "HTML5 é a versão mais recente da linguagem de marcação para criar conteúdo estruturado na web." },
    { icon: <FaCss3Alt />, name: "CSS3", description: "CSS3 é a folha de estilo usada para descrever a aparência de um documento HTML, com suporte para animações e layouts responsivos." },
    { icon: <FaJs />, name: "JavaScript", description: "JavaScript é uma linguagem de programação usada para criar interatividade em sites dinâmicos." },
    { icon: <SiTypescript />, name: "TypeScript", description: "TypeScript é um superset do JavaScript, que adiciona tipagem estática e outros recursos avançados." },
    { icon: <RiNextjsFill />, name: "Next.js", description: "Next.js é um framework React que facilita a criação de aplicações com renderização no servidor (SSR) e geração de sites estáticos." },
    { icon: <FaReact />, name: "React", description: "React é uma biblioteca JavaScript para construir interfaces de usuário interativas e baseadas em componentes." },
    { icon: <DiPhotoshop />, name: "Photoshop", description: "Adobe Photoshop é um software de edição de imagens amplamente utilizado para edição de gráficos e fotos." },
    { icon: <DiIllustrator />, name: "Illustrator", description: "Adobe Illustrator é um software de design gráfico vetorial usado para criar ilustrações e logotipos." },
    { icon: <FaFigma />, name: "Figma", description: "Figma é uma ferramenta de design colaborativo para criar interfaces de usuário, protótipos e gráficos." },
    { icon: <FaWordpress />, name: "WordPress", description: "WordPress é um sistema de gerenciamento de conteúdo (CMS) usado para criar e gerenciar sites e blogs." },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS", description: "Tailwind CSS é um framework de CSS utilitário que facilita a criação de designs personalizados e responsivos." },
    { icon: <FaSass />, name: "Sass", description: "Sass é um pré-processador de CSS que adiciona funcionalidades como variáveis, funções e mixins ao CSS." },
];

// Função para simular o efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const interval = setInterval(() => {
        const element = document.getElementById("typing-title");
        if (element) {
            element.textContent = text.slice(0, index + 1);
            index++;
        }
        if (index === text.length) {
            clearInterval(interval);
            callback();
        }
    }, 100);
};

export default function Skills() {
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ icon: JSX.Element, name: string, description: string } | null>(null);


    // Efeito de digitação
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Garante que o texto esteja vazio antes de reiniciar
                        setIsTypingDone(false); // Reinicia o estado para reiniciar o efeito
                        typingEffect("Habilidades", () => setIsTypingDone(true));
                    } else {
                        if (element) element.textContent = ""; // Remove o texto quando sai da viewport
                        setIsTypingDone(false); // Garante que o cursor _ também desapareça
                    }
                });
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById("title-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    const openModal = (skill: { icon: JSX.Element, name: string, description: string }) => {
        setModalData(skill);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const skillsDiv = document.querySelectorAll('.skill');
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            skillsDiv.forEach((skillDiv) => {
                const skillElement = skillDiv as HTMLElement;
                const skillTop = skillElement.getBoundingClientRect().top + scrollY;
                const skillHeight = skillElement.offsetHeight;

                if (scrollY + windowHeight > skillTop && scrollY < skillTop + skillHeight) {
                    skillElement.classList.add('visible');
                } else {
                    skillElement.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Cabeçalho com efeito de digitação */}
            <div className="w-full scroll-mt-24" id="skills">
                <div
                    id="title-container"
                    className="bg-gradient-to-t from-[#303446] to-[#30344600] h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 text-4xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="typing-title"></span>
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

            {/* Conteúdo com ícones e habilidades */}
            <div className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover md:bg-center bg-fixed bg-no-repeat z-[0] h-full w-full "
                    style={{
                        backgroundImage: "url('/me-in-park.jpg')",
                        backgroundPosition: "70% center",
                    }}
                ></div>
                <article
                    className={`${ibmPlexMono.className}  space-y-16 flex flex-col items-center md:items-start text-center`}
                >
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4  gap-8 my-20 w-fit md:ml-10 lg:ml-28"
                    >
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-t from-[#9497a555] to-[#3034461c] rounded-t-2xl skill flex flex-col items-center justify-center relative group opacity-0 transform -translate-x-24 transition-all duration-500 w-28 h-28"
                                onClick={() => openModal(skill)}
                            >
                                <div className="relative group">
                                    <div className="w-full h-full flex items-center justify-center border-transparent transition-all duration-300 overflow-hidden">
                                        <div className="text-6xl text-[#fff] group-hover:text-[#aadd49] group-hover:opacity-30 transition-all duration-300">
                                            {skill.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full h-[2px] bg-[#aadd49] z-30 group-hover:shadow-[0_0_15px_2px_#aadd49] transition-shadow duration-300"></div>
                                <div className="absolute inset-0 flex items-center rounded-t-2xl justify-center bg-[#63667169] bg-opacity-80 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none">
                                    {skill.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && modalData && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center md:justify-end items-center z-50 backdrop-blur-sm"
                        onClick={closeModal}
                        initial={{ opacity: 0 }} // Inicia invisível
                        animate={{ opacity: 1 }} // Fica visível
                        exit={{ opacity: 0 }} // Sai de forma suave
                        transition={{ duration: 0.3 }} // Transição suave
                    >
                        <motion.div
                            className="bg-black text-white p-6 md:mr-10 lg:mr-20 xl:mr-36 rounded-lg w-80"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9 }} // Inicializa o modal pequeno
                            animate={{ scale: 1 }} // Expande para o tamanho normal
                            exit={{ scale: 0.9 }} // Encolhe ao fechar
                            transition={{ duration: 0.3 }} // Transição suave
                            style={{
                                borderLeft: "4px solid #aadd49",
                                borderBottom: "4px solid #aadd49",
                            }}
                        >
                            <h3 className="text-2xl font-bold flex items-center gap-5">
                                <span className="text-[#aadd49]">{modalData.icon}</span>
                                {modalData.name}
                            </h3>
                            <p className="mt-2">{modalData.description}</p>
                            <button
                                className="mt-4 bg-[#aadd49] text-black px-4 py-2 rounded cursor-pointer hover:bg-[#d9fa9a] transition-all duration-300"
                                onClick={closeModal}
                            >
                                Fechar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
