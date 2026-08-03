'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ibmPlexMono, roboto } from "../fonts/Fonts";
import { useTypingEffect } from '../hooks/useTypingEffect';

// Icons
import { IoLogoFirebase } from "react-icons/io5";
import { SiMetabase } from "react-icons/si";
import { FaReact, FaFigma, FaNodeJs, FaDocker, FaPython, FaMicrosoft } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiGooglecloud } from "react-icons/si";
import { DiPostgresql } from "react-icons/di";
import { BiLogoAdobe } from "react-icons/bi";
import { GrOracle } from "react-icons/gr";
import { BsArrowRightCircle } from "react-icons/bs";

const SLANT_OFFSET = 150;
const MOBILE_SLANT_OFFSET = 40;

const pillars = [
    {
        id: "concepcao",
        title: "Concepção & Arquitetura",
        subtitle: "Do levantamento de requisitos ao protótipo de alta fidelidade.",
        description: "Minha base como projetista e arquiteto me deu uma vantagem única: a habilidade de escutar clientes, entender regras de negócio complexas e traduzi-las em soluções viáveis. Antes do código, garanto a viabilidade do projeto estruturando o design system e a arquitetura da informação.",
        icons: [<FaFigma key="fg" />, <BiLogoAdobe key="ad" />],
        videoSrc: "/skillVideos/Arch.mp4"
    },
    {
        id: "frontend",
        title: "Engenharia de Frontend",
        subtitle: "Interfaces escaláveis, tipadas e focadas em performance.",
        description: "Construo SPAs e aplicações modernas utilizando o ecossistema React. Mesclo a flexibilidade do Tailwind CSS com o poder de renderização do Next.js e a segurança do TypeScript para entregar produtos de alto impacto visual e técnico.",
        icons: [<RiNextjsFill key="nx" />, <FaReact key="rc" />, <SiTypescript key="ts" />, <RiTailwindCssFill key="tw" />, <FaMicrosoft key="ms" />],
        videoSrc: "/skillVideos/Coding.mp4"
    },
    {
        id: "backend-infra",
        title: "Backend, Cloud & Infraestrutura",
        subtitle: "Autonomia completa do banco de dados ao deploy em produção.",
        description: "Desenvolvo APIs robustas e orquestro automações complexas (n8n, Python). Além do código, possuo total autonomia em DevOps, gerenciando ambientes de produção containerizados via Docker em instâncias próprias (VPS Hostinger, Oracle Cloud) e Google Cloud Platform.",
        icons: [<FaNodeJs key="nd" />, <FaPython key="py" />, <DiPostgresql key="pg" />, <FaDocker key="dk" />, <SiGooglecloud key="gc" />, <GrOracle key="or" />, <IoLogoFirebase key="fb" />, <SiMetabase key="mb" />],
        videoSrc: "/skillVideos/Infra.mp4"
    }
];

const layerVariants = {
    enter: () => ({ x: "100vw" }),
    center: (custom: number) => ({
        x: 0,
        transition: {
            duration: 0.7,
            delay: (custom * 0.1) + 0.2,
            ease: [0.25, 1, 0.5, 1],
        }
    }),
    exit: (custom: number) => ({
        x: "-100vw",
        transition: {
            duration: 0.6,
            delay: (3 - custom) * 0.1,
            ease: [0.25, 1, 0.5, 1],
        }
    })
};

const videoVariants = {
    enter: (isMobile: boolean) => ({
        clipPath: isMobile
            ? `polygon(100% 0, 100% 0, 100% 100%, 100% 100%)`
            : `polygon(100% 0, 100% 0, calc(100% - ${SLANT_OFFSET}px) 100%, 100% 100%)`
    }),
    center: () => ({
        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
        transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }),
    exit: (isMobile: boolean) => ({
        clipPath: isMobile
            ? `polygon(0 0, 0 0, 0 100%, 0 100%)`
            : `polygon(0 0, 0 0, -${SLANT_OFFSET}px 100%, 0 100%)`,
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    })
};

export default function Skills() {
    const [windowWidth, setWindowWidth] = useState(1200); // Iniciado com valor padrão
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(0);
    const { displayedText, isTypingDone, containerRef } = useTypingEffect("Minhas Habilidades");

    const nextSlide = () => {
        setPage((prevPage) => (prevPage + 1) % pillars.length);
    };

    const currentPillar = pillars[page];

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 3 Breakpoints definidos exatamente como você pediu
    const isMobile = windowWidth < 1135;
    const isTablet = windowWidth >= 1135 && windowWidth < 1500; // Entre 1135 e XL

    const layers = [
        { id: "tail-green", bg: "bg-[#aadd49]", z: 10, delayIndex: 0, staticLeft: '-125px' },
        { id: "tail-white", bg: "bg-white", z: 20, delayIndex: 1, staticLeft: '-130px' },
        { id: "tail-gray", bg: "bg-[#676767]", z: 30, delayIndex: 2, staticLeft: '-135px' },
        { id: "tail-main", bg: "bg-black", z: 40, delayIndex: 3, isMain: true, staticLeft: `-${SLANT_OFFSET}px` },
    ];

    return (
        <main className="pb-36">
            <div ref={containerRef} className="w-full scroll-mt-24" id="skills">
                <div id="title-container" className="h-fit w-full reveal" style={{ transitionDelay: "0.2s" }}>
                    <h2 className={`${roboto.className} lg:pl-9 text-3xl lg:ml-20 z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start min-[2000px]:pl-[calc(50vw-1000px)]`}>
                        <span id="skills-typing-title">{displayedText}</span>
                        <span
                            className={`text-[#aadd49] ${isTypingDone ? "visible" : "invisible"}`}
                            style={{ marginLeft: "5px", animation: "blink 1s steps(1, end) infinite" }}
                        >
                            _
                        </span>
                    </h2>
                </div>
                <div className="bg-gray-800 h-[2px] w-full reveal" style={{ transitionDelay: "0.2s" }}></div>
                <div className="bg-gray-500 h-[4px] w-full mt-[4px] reveal" style={{ transitionDelay: "0.4s" }}></div>
                <div className="bg-[#aadd49] h-[6px] w-full mt-[4px] reveal" style={{ transitionDelay: "0.6s" }}></div>
            </div>

            {/* 
                SUBSTITUIÇÃO DA CLASSE 'reveal' PELO MOTION.DIV NATIVO DO FRAMER 
                Isso resolve definitivamente o sumiço do container ao redimensionar a tela 
            */}
            {mounted && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    // Adicionado um mt-8 no mobile para dar respiro natural em relação às linhas do título
                    className={`relative w-full overflow-hidden max-w-[2000px] mx-auto mt-4 min-[1135px]:mt-8 ${isMobile ? 'h-[850px]' : 'h-[600px]'}`}
                >
                    

                    <div className="absolute inset-0 z-[1] w-full h-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                custom={isMobile}
                                variants={videoVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={isMobile ? "absolute bottom-0 w-full h-[45%]" : "absolute inset-0 w-full h-full"}
                            >
                                <video
                                    src={currentPillar.videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={`w-full h-full ${isMobile ? 'object-cover object-center h-[65%]' : 'object-contain object-right'}`}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Removido o max-[1135px]:mt-10 que estava quebrando o posicionamento absoluto */}
                    <div className="relative z-[2] w-full h-full pointer-events-none">
                        <AnimatePresence mode="popLayout">
                            <div key={page} className="absolute inset-0 w-full h-full">

                                {layers.map((layer) => (
                                    <motion.div
                                        key={layer.id}
                                        custom={layer.delayIndex}
                                        variants={layerVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className={`absolute top-0 ${layer.bg} shadow-[10px_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-center pointer-events-auto ${isMobile ? 'h-[60%]' : 'h-full'}`}
                                        style={{
                                            width: isMobile
                                                ? '100%'
                                                : (isTablet ? `calc(65% + ${SLANT_OFFSET}px)` : `calc(50% + ${SLANT_OFFSET}px)`),
                                            left: isMobile ? '0' : layer.staticLeft,
                                            clipPath: isMobile
                                                ? `polygon(0 0, 100% 0, 100% calc(100% - ${MOBILE_SLANT_OFFSET}px), 0 100%)`
                                                : `polygon(${SLANT_OFFSET}px 0, 100% 0, calc(100% - ${SLANT_OFFSET}px) 100%, 0 100%)`,
                                            zIndex: layer.z
                                        }}
                                    >
                                        {layer.isMain && (
                                            <div
                                                // Alterado flex de justify-center (que espreme) para justify-start no mobile
                                                className={`${ibmPlexMono.className} w-full h-full flex flex-col relative ${isMobile ? 'justify-start' : 'justify-center'}`}
                                                style={{
                                                    paddingLeft: isMobile ? '1.5rem' : `calc(${SLANT_OFFSET}px + 4rem)`,
                                                    paddingRight: isMobile ? '1.5rem' : '2rem',
                                                    // paddingTop fixo no mobile para alinhar perfeitamente com a borda
                                                    paddingTop: isMobile ? '2.5rem' : '0',
                                                    paddingBottom: isMobile ? `${MOBILE_SLANT_OFFSET}px` : '0',
                                                }}
                                            >
                                                <div className="max-w-full min-[1135px]:max-w-[90%]">
                                                    <h3 className="text-3xl min-[1135px]:text-4xl font-bold text-[#aadd49] mb-4">
                                                        {currentPillar.title}
                                                    </h3>
                                                    <p className="text-base min-[1135px]:text-lg text-[#676767] font-medium mb-4 min-[1135px]:mb-6">
                                                        {currentPillar.subtitle}
                                                    </p>
                                                    <p className="text-white leading-relaxed text-sm min-[1135px]:text-base mb-6 min-[1135px]:mb-10">
                                                        {currentPillar.description}
                                                    </p>

                                                    <div className="flex flex-wrap justify-between items-center border-t border-[#676767] pt-6">
                                                        <div className="flex flex-wrap gap-4 min-[1135px]:gap-5">
                                                            {currentPillar.icons.map((icon, idx) => (
                                                                <div key={idx} className="text-xl md:text-3xl min-[1135px]:text-4xl text-white hover:text-[#aadd49] hover:scale-110 transition-all">
                                                                    {icon}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <button
                                                            onClick={nextSlide}
                                                            className={` cursor-pointer transition-colors text-[#676767] hover:text-[#aadd49] 
                                                                ${isMobile ? 'text-4xl' : 'text-5xl -translate-x-[50px]'}`
                                                            }
                                                            aria-label="Próximo Pilar"
                                                        >
                                                            <BsArrowRightCircle />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </main>
    );
}