'use client';

import Image from "next/image";
import fotoPerfil from "../../photos/portrait.jpg";
import Link from "next/link";
import { roboto } from "../fonts/Fonts";
import StarsBackground from "./Main/Background";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";



// Função de efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById("about-typing-title");

    // Garante que o elemento comece invisível
    if (element) element.classList.remove("visible");

    const interval = setInterval(() => {
        if (element) {
            // Usa textContent para digitar os caracteres de forma normal
            element.textContent = text.slice(0, index + 1);
            index++;
            if (index === text.length) {
                clearInterval(interval);
                if (element) {
                    element.classList.add("visible"); // Torna visível após a digitação
                }
                callback();
            }
        }
    }, 100);
};

const initialTechs = [
    { id: 1, name: "typescript", bg: "#2f74c0", text: "#ffffff" },
    { id: 2, name: "power platform", bg: "#6bddfa", text: "#000000" },
    { id: 3, name: "react", bg: "#efd81d", text: "#000000" },
    { id: 4, name: "next.js", bg: "#353535", text: "#ffffff" },
    { id: 5, name: "python", bg: "#366297", text: "#efd81d" },
    { id: 6, name: "python rpa", bg: "#2A39FF", text: "#efd81d" },
    { id: 7, name: "n8n", bg: "#F5276C", text: "#efd81d" },
];


export default function AboutMe() {
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [isCVVisible, setIsCVVisible] = useState(false);
    const [techs, setTechs] = useState(initialTechs);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Apenas o "Anderson" será digitado
        typingEffect("Anderson", () => setIsTypingDone(true));
    }, []);

    const StarsBackgroundMemoized = useMemo(() => <StarsBackground />, []);

    const toggleCV = () => {
        setIsCVVisible(!isCVVisible); // Alternar a visibilidade dos botões
    };

    const variants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            filter: "blur(4px)",
            transition: { duration: 0.4 }
        },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25
            }
        }
    };

    // Função para embaralhar o array
    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const startLoop = () => {
            const randomTime = 4000 + Math.random() * 2000;

            timeoutId = setTimeout(() => {
                // FASE 1: Esconder
                setIsVisible(false);

                // FASE 2: Trocar os dados enquanto está escondido
                // Aumentamos levemente para 600ms para garantir que a transição 'hidden' terminou
                setTimeout(() => {
                    setTechs(prev => shuffle(prev));

                    // FASE 3: Mostrar
                    // Usamos um pequeno atraso de 50ms para garantir que o React 
                    // processou o novo array antes de disparar a animação de entrada
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 50);
                }, 500);

                startLoop(); // Agenda a próxima execução
            }, randomTime);
        };

        startLoop();

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            className="w-screen h-fit z-[-1] m-auto"
            style={{
                background: 'radial-gradient(circle at center, #27292e 0%, #000 35%)', // Gradiente radial
            }}
        >
            <main
                className={`${roboto.className} z-[10] max-w-full flex flex-wrap-reverse justify-center items-start gap-10 lg:mx-36 xl:mx-44 md:px-20 pt-10 pb-36 text-lg xl:flex-nowrap `}
            >

                <div className="text-white mx-8 text-center xl:text-left md:text-center flex flex-col items-center xl:items-start gap-4 z-[10]">
                    {/* Texto estático */}
                    <div id="about-title-container">
                        <h1 className="text-5xl md:text-[6vw] xl:text-[4vw]">
                            Prazer, sou{" "}
                            <span
                                id="about-typing-title"
                                className="font-bold text-[#aadd49]"> {/* Apenas "Anderson" será digitado */}
                            </span>
                            <span
                                className={`font-bold text-[#aadd49] ${isTypingDone ? "visible" : "invisible"
                                    }`}
                                style={{
                                    marginLeft: "5px",
                                    animation: "blink 1s steps(1, end) infinite",
                                }}
                            >
                                _
                            </span>
                        </h1>
                    </div>

                    <div className="mb-12 text-center xl:text-left">
                        <h2>Sou um desenvolvedor de sistemas e automações!</h2>
                    </div>

                    <motion.div
                        layout
                        className="flex flex-col lg:flex-row xl:flex-col 2xl:flex-row items-center justify-center gap-x-3 gap-y-3 transition-all">
                        <Link
                            href="#contact"
                            className="rounded-full text-center w-[270px] h-15 p-1 bg-[#aadd49] text-[#21232b] text-lg transition-all px-10 hover:bg-[#30344600] hover:border border-[#aadd49] hover:text-[#aadd49]"
                        >
                            Vamos conversar!
                        </Link>
                        <motion.button
                            onClick={toggleCV}
                            className="rounded-full text-center w-[270px] h-15 p-1 border border-[#aadd49] bg-[#30344600] text-[#aadd49] text-lg transition-all px-10 hover:bg-[#aadd49] hover:text-[#21232b] hover:border-none"
                        >
                            {isCVVisible ? 'Fechar' : 'Baixe meu CV!'}
                        </motion.button>


                        {/* Animação dos botões com as bandeiras */}
                        <AnimatePresence>
                            {isCVVisible && (
                                <motion.div
                                    className="flex gap-10 mt-4"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 1, scale: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <motion.a
                                        className="flex items-center w-[70px] h-[70px] rounded-full justify-center p-3 bg-center bg-cover bg-[url('/br.png')]"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.1 }}
                                        href="/CandinizCV_PT.pdf"
                                        download
                                    >

                                    </motion.a>
                                    <motion.a
                                        className="flex w-[70px] h-[70px] rounded-full items-center justify-center p-3 bg-center bg-cover bg-[url('/en.png')]"
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.1 }}
                                        href="/CandinizCV_EN.pdf"
                                        download
                                    >

                                    </motion.a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div>
                        <ul className="select-none flex flex-wrap gap-3 items-center justify-center lg:justify-start text-xl mt-20 transition-all max-w-md">
                            {techs.map((tech) => (
                                <motion.li
                                    key={tech.id}
                                    layout="position"
                                    variants={variants}
                                    initial="visible"
                                    animate={isVisible ? "visible" : "hidden"}
                                    style={{ backgroundColor: tech.bg, color: tech.text }}
                                    className="p-2 rounded-md select-none"
                                >
                                    {tech.name}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
                <div className="m-0 p-0 z-[10]">
                    <div className="relative m-auto w-4/5 md:w-[350px] xl:w-[500px]">
                        <Image
                            alt="Foto de Perfil"
                            src={fotoPerfil}
                            className="rounded-full"
                        />
                        <p className="p-4 w-fit text-base leading-tight bg-[#787d96] rounded-xl text-white absolute -bottom-[0.75rem]">
                            <span className="text-4xl ">2+</span>
                            <br /> anos de experiência
                        </p>
                    </div>
                </div>

                {StarsBackgroundMemoized}

            </main>
        </div>
    );
}
