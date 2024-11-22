'use client';

import "../globals.css";
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaWordpress, FaSass } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import { useEffect, useState } from "react";

const skills = [
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <RiNextjsFill />, name: "Next.js" },
    { icon: <FaReact />, name: "React" },
    { icon: <DiPhotoshop />, name: "Photoshop" },
    { icon: <DiIllustrator />, name: "Illustrator" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <FaWordpress />, name: "WordPress" },
    { icon: <RiTailwindCssFill />, name: "Tailwind CSS" },
    { icon: <FaSass />, name: "Sass" },
];

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
            { threshold: 0.5 } // 50% do título visível para acionar
        );
    
        const target = document.getElementById("title-container");
        if (target) observer.observe(target);
    
        return () => observer.disconnect();
    }, []);
    

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
            <div className="w-full mb-5 scroll-mt-24" id="skills">
                <div
                    id="title-container"
                    className="bg-gradient-to-t from-[#21232b] to-[#303446] h-fit w-full"
                >
                    <h2  
                        className={`${roboto.className} lg:pl-9 text-4xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="typing-title"></span>
                        <span
                            className={`text-[#aadd49] ${
                                isTypingDone ? "visible" : "invisible"
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
                <div className="bg-[#aadd49] h-[4px] w-full"></div>
            </div>

            {/* Conteúdo com ícones e habilidades */}
            <article
                className={`${ibmPlexMono.className} ms:px-10 lg:mx-52 space-y-16 flex flex-col items-center xl:items-start text-center xl:text-left`}
            >
                <div className="flex flex-wrap justify-center items-center gap-8 my-20 sm:p-10">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-[#20232e] rounded-t-2xl skill flex flex-col items-center justify-center relative group opacity-0 transform -translate-x-24 transition-all duration-500 w-32 h-32"
                        >
                            <div className="relative group">
                                <div className="w-full h-full flex items-center justify-center border-transparent transition-all duration-300 overflow-hidden">
                                    <div className="text-6xl text-[#fff] group-hover:text-[#aadd49] group-hover:blur-sm transition-all duration-300">
                                        {skill.icon}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 w-full h-[4px] bg-[#aadd49] z-30"></div>
                            <div className="absolute inset-0 flex items-center rounded-t-2xl justify-center bg-[#21232b] bg-opacity-80 text-[#fff] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {skill.name}
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </>
    );
}
