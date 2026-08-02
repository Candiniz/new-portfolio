'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AiOutlineClose } from "react-icons/ai";
import { roboto } from '../fonts/Fonts';
import styles from './Education.module.css'
import { useTypingEffect } from '../hooks/useTypingEffect';
import { experiencesData } from '../consts/experienceArray';

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

export default function Experience() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const { displayedText, isTypingDone, containerRef } = useTypingEffect("Experiência Profissional");

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
            <div ref={containerRef} className="w-full scroll-mt-24" id="experience">
                <div
                    id="experience-title-container"
                    className="h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 lg:ml-20 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start min-[2000px]:pl-[calc(50vw-1000px)]`}
                    >
                        <span id="experience-typing-title">{displayedText}</span>
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
                <div className="bg-gray-800 h-[2px] w-full reveal" style={{ transitionDelay: "0.2s" }}></div>
                <div className="bg-gray-500 h-[4px] w-full mt-[4px] reveal" style={{ transitionDelay: "0.4s" }}></div>
                <div className="bg-[#aadd49] h-[6px] w-full mt-[4px] mb-20 reveal" style={{ transitionDelay: "0.6s" }}></div>
            </div>

            <div className="relative max-w-[2000px] mx-auto">
                {/* Linha do tempo */}

                {/* Linha 1 */}
                <div className="absolute left-1/4 transform -translate-x-1/2 h-full z-10">
                    <div className="h-full border-l-4 border-[#aadd49] reveal" style={{ transitionDelay: "0.6s" }}></div>
                </div>
                {/* Linha 2 */}
                <div className="absolute left-1/4 -top-[80px] transform -translate-x-1/2 h-full z-10">
                    <div className="h-full border-l-4 border-[#aadd49] reveal" style={{ transitionDelay: "0.6s" }}></div>
                </div>

                {/* Adicionando a bola verde no final */}
                <div className='absolute left-1/4 transform -translate-x-1/2 z-10 -bottom-10 mb-4' style={{ transitionDelay: "0.6s" }}>
                    <div className="reveal">
                        <div className={styles.sonarBall}></div>
                    </div>
                </div>
                <div>
                    {experiencesData.map((item, index) => (
                        <div
                            key={index}
                            className="reveal relative min-h-32 w-full h-32 hover:bg-[#222] my-20 transition-all duration-300 cursor-pointer"
                            onClick={() => openModal(item)}
                            style={{ transitionDelay: "0.6s" }}
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
                            className="relative bg-white w-4/5 p-10 h-[90vh]"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-[2px] right-[2px] text-xl lg:text-3xl text-white bg-black hover:bg-red-500 transition-colors"
                            >
                                <AiOutlineClose />
                            </button>

                            <div className="flex flex-col md:flex-row items-start md:items-center h-[80vh] lg:px-10">
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

                                <div className='mt-9 lg:mt-0 overflow-y-auto pl-8 border-l border-gray-400'>
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
