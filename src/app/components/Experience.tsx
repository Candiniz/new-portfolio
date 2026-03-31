'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AiOutlineClose } from "react-icons/ai";
import { roboto } from '../fonts/Fonts';
import styles from './Education.module.css'

interface Section {
    title: string;
    content: string;
    videoPath?: string;
    list: string[];
}

interface Course {
    image: string;
    degree: string;
    institution: string;
    year: string;
    sections: Section[];
}

// Função de efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const element = document.getElementById("experience-typing-title");
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

export default function Experience() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isTypingDone, setIsTypingDone] = useState(false);

    const educationData: Course[] = [
        {
            image: "/opiceLogo.png",
            degree: 'Analista de Desenvolvimento',
            institution: 'Opice Blum Advogados Associados',
            year: '2025 - ATUAL',
            sections: [
                {
                    title: "Atuação e Impacto em Legal Tech",
                    content: "Desenvolvimento de soluções estratégicas no departamento de TI da Opice Blum, escritório referência em Direito Digital. Foco na transformação de gargalos operacionais jurídicos em fluxos digitais eficientes através de um stack híbrido entre Power Platform e desenvolvimento Full Stack (Python/React).",
                    videoPath: "", // Slot para Next/Image
                    list: []
                },
                {
                    title: "DIGITALIZA FINANCEIRO | Automação de Fluxos",
                    content: "Solução integrada para o setor financeiro que automatiza massivamente o lançamento de notas de débito e obrigações.",
                    videoPath: "/experience/DF1.mp4",
                    list: [
                        "Integração: Power Apps, Power Automate, SharePoint e Legal One.",
                        "Impacto: Redução drástica do erro humano e aceleração do ciclo de pagamentos.",
                        "Conformidade: Garantia de integridade de dados em processos de alta volumetria."
                    ]
                },
                {
                    title: "Opice IPScraper | Inteligência em Contencioso",
                    content: "Sistema de extração e planilhamento de dados telemáticos para suporte à área de Contencioso Massificado.",
                    videoPath: "/experience/OIPS.mp4",
                    list: [
                        "Tecnologias: Backend em Python e Frontend em React.",
                        "Performance: Extração automatizada de dados de documentos PDF fornecidos por operadoras.",
                        "Resultado: Processos que levavam horas são executados em segundos com alta precisão."
                    ]
                },
                {
                    title: "Inovação com IA & Orquestração",
                    content: "Implementação de Agentes de IA para auxílio na tomada de decisão e interpretação de contextos jurídicos complexos.",
                    videoPath: "",
                    list: [
                        "Stack: N8N (Orquestração), Power Automate e Google Cloud (Vertex AI/Gemini).",
                        "Destaque: Escalonamento de automações convencionais para o nível de computação cognitiva."
                    ]
                }
            ]
        },
    ];

    const openModal = (course: Course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("experience-typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Limpa texto ao entrar na viewport
                        setIsTypingDone(false); // Reinicia o estado
                        typingEffect("Experiência Profissional", () => setIsTypingDone(true));
                    } else {
                        if (element) element.textContent = ""; // Garante que o texto desapareça ao sair
                        setIsTypingDone(false); // Desativa o estado
                    }
                });
            },
            { threshold: 0.5 } // Aciona quando 50% do título está visível
        );

        const target = document.getElementById("experience-title-container");
        if (target) observer.observe(target);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            // Trava o scroll injetando direto no HTML, igual no Traveller
            document.documentElement.style.overflow = "hidden";
        } else {
            // Libera o scroll
            document.documentElement.style.overflow = "";
        }

        // Cleanup
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [isModalOpen]);


    return (
        <div className="pt-10 w-full mx-auto mt-36">
            <div className="w-full scroll-mt-24" id="experience">
                <div
                    id="experience-title-container"
                    className="bg-gradient-to-t from-[#303446] to-[#30344600] h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 lg:ml-20 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="experience-typing-title"></span>
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

            <div className="relative">
                {/* Linha do tempo */}
                <div className="absolute left-1/4 transform -translate-x-1/2 h-full border-l-4 border-[#aadd49] z-10"></div>
                <div className="absolute left-1/4 -top-[80px] transform -translate-x-1/2 h-full border-l-4 border-[#aadd49] z-10"></div>
                {/* Adicionando a bola verde no final */}
                <div className="absolute left-1/4 transform -translate-x-1/2 z-10 -bottom-10 mb-4">
                    <div className={styles.sonarBall}></div>
                </div>
                <div>
                    {educationData.map((item, index) => (
                        <div
                            key={index}
                            className="relative min-h-32 w-full h-32 hover:bg-[#222] my-20 transition-all duration-300 cursor-pointer"
                            onClick={() => openModal(item)}
                        >
                            {/* Imagem da instituição */}
                            <div className='absolute left-[35%] sm:left-[5%] md:left-[7%] lg:left-[10%] 
                            w-[70px] md:w-[80px] lg:w-[120px]
                            -top-3 sm:top-1/2 sm:-translate-y-1/2'>
                                <Image
                                    alt={item.institution}
                                    src={item.image}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className="w-full h-auto object-contain"
                                />
                            </div>

                            {/* Ponto na linha do tempo */}
                            <div className="absolute w-8 h-8 bg-[#aadd49] rounded-full border-4 border-white left-1/4 transform -translate-x-1/2 z-10  top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-150">
                                <span className="sr-only">Ponto na linha do tempo</span>
                            </div>

                            {/* Texto posicionado ao lado direito */}
                            <div className="absolute left-[30%] text-left top-1/2 -translate-y-1/2 px-5 select-none">
                                <div className="text-xs sm:text-lg font-semibold">{item.degree}</div>
                                <div className="text-xs sm:text-sm text-gray-600">{item.institution}</div>
                                <div className="text-sm text-[#aadd49] font-bold">{item.year}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && selectedCourse && (
                    <motion.div
                        onClick={closeModal}
                        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            onClick={stopPropagation}
                            className="relative bg-white rounded-lg w-4/5 p-10 h-[90vh]"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-[2px] right-[2px] text-xl text-white bg-black rounded-full"
                            >
                                <AiOutlineClose />
                            </button>

                            <div className="flex flex-col md:flex-row items-start md:items-center h-[80vh]">
                                {/* Foto da instituição */}
                                <div className="mr-6 min-w-[160px]">
                                    <Image
                                        alt={selectedCourse.institution}
                                        src="/opiceLogoWh.jpg"
                                        layout="intrinsic"
                                        width={160}
                                        height={100}
                                        className='object-cover min-w-[160px]'
                                    />
                                    <div className="w-[160px]">
                                        <div className="w-full overflow-hidden">
                                            <Image
                                                src="/experience/AnalistaDeDesenvolvimento.png"
                                                alt="Cargo"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto object-contain" // h-auto é a chave aqui
                                            />
                                        </div>
                                        <p className="mt-2 pl-2 text-xs text-gray-400">{selectedCourse.institution}</p>
                                    </div>
                                </div>

                                <div className='h-full mt-9 lg:mt-0 overflow-y-auto pl-8 border-l border-gray-500'>
                                    {/* Texto com título e descrição */}
                                    {selectedCourse.sections.map((section, index) => (
                                        <div key={index} className="mb-6">

                                            <h3 className="text-md lg:text-xl font-bold text-gray-800">{section.title}</h3>
                                            <p className="text-sm lg:text-md text-gray-500">{section.content}</p>
                                            {section.list.length > 0 && (
                                                <ul className="list-disc ml-5 mb-4">
                                                    {section.list.map((item, i) => (
                                                        <li key={i} className="text-sm text-gray-500">{item}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            {section.videoPath && (
                                                <div className="w-full mt-6 shadow-md rounded-lg overflow-hidden">
                                                    <video
                                                        src={section.videoPath}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline // Crucial para rodar no iOS sem abrir o player em tela cheia
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </div>
                                            )}
                                            <hr className="mt-6 border-gray-100" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
