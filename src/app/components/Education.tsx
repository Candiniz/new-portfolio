'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AiOutlineClose } from "react-icons/ai";
import { roboto } from '../fonts/Fonts';
import styles from './Education.module.css'

interface Course {
    image: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
}

// Função para simular o efeito de digitação
const typingEffect = (text: string, callback: () => void) => {
    let index = 0;
    const interval = setInterval(() => {
        const element = document.getElementById("education-typing-title");
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

export default function Education() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isTypingDone, setIsTypingDone] = useState(false);

    const educationData: Course[] = [
        {
            image: "/uam.png",
            degree: 'Graduação em Arquitetura e Urbanismo',
            institution: 'Universidade Anhembi Morumbi',
            year: '2016 - 2020',
            description: 'Durante minha graduação em Arquitetura e Urbanismo na Universidade Anhembi Morumbi, fui imerso em diversos aspectos do design urbano, planejamento e construção. Aprendi a usar ferramentas digitais essenciais, como AutoCAD e Revit, que facilitaram a criação de projetos precisos e eficientes. Ao longo do curso, a importância da tecnologia na arquitetura ficou evidente, e comecei a perceber como a automação e o uso de dados poderiam otimizar o processo de criação e gestão de projetos, habilidades que hoje aplico diretamente no desenvolvimento de software, especialmente na construção de soluções digitais que exigem precisão e integração entre sistemas.',
        },
        {
            image: "/udemy.png",
            degree: 'Build Responsive Real-World Websites with HTML and CSS',
            institution: 'Udemy - Jonas.IO',
            year: '2023',
            description: 'Durante esse curso, aprendi a criar sites responsivos do zero utilizando HTML e CSS. O curso é extremamente prático, com um projeto de site real como exemplo, permitindo aplicar os conhecimentos adquiridos para construir páginas que funcionam perfeitamente em dispositivos de diferentes tamanhos. Aprendi desde o básico, como estruturar páginas e formatar textos, até técnicas avançadas de design e layout. O curso também me ensinou a criar designs que se adaptam bem a computadores, tablets e smartphones, permitindo desenvolver sites profissionais e prontos para o lançamento.',
        },
        {
            image: "/pucrs.png",
            degree: 'Pós-graduação em BIM',
            institution: 'Pontifícia Universidade Católica do Rio Grande do Sul - PUC/RS',
            year: '2023 - 2024',
            description: 'Na pós-graduação em BIM pela PUC/RS, aprofundei meus conhecimentos sobre Building Information Modeling, que permite a criação de modelos digitais inteligentes para otimizar projetos de construção. Além disso, estudei o sistema LEAN, uma metodologia focada na eliminação de desperdícios e na melhoria contínua de processos. O LEAN é fundamental não só para a arquitetura, mas também para a área de desenvolvimento, pois ensina a criar soluções mais eficientes e ágeis, melhorando a produtividade e a colaboração entre equipes. Essa abordagem de gestão de processos e otimização de recursos é extremamente aplicável ao desenvolvimento de software, especialmente quando se busca melhorar a performance e reduzir custos em projetos complexos.',
        },
        {
            image: "/ztm.png",
            degree: 'Udemy: Zero to Mastery Academy - Complete Web Developer',
            institution: 'Udemy - Zero to Mastery Academy',
            year: '2023',
            description: 'Este curso foi um divisor de águas na minha jornada como desenvolvedor web. Aprendi desde a construção de sites simples até o desenvolvimento completo de aplicações full-stack. O curso abrange uma vasta gama de tecnologias e ferramentas, incluindo HTML, CSS, JavaScript, Node.js, React, e muito mais. Além disso, tive acesso a uma comunidade ativa de desenvolvedores e pude aprender diretamente com um instrutor com experiência prática em empresas como Google e Apple. Ao final do curso, me senti pronto para trabalhar em empresas de tecnologia de ponta, como Google e Facebook, aplicando tudo o que aprendi no desenvolvimento de soluções web complexas.',
        },
        {
            image: "/udemy.png",
            degree: 'Udemy: The Complete JavaScript Course 2024 - From Zero to Expert!',
            institution: 'Udemy - Jonas.IO',
            year: '2023',
            description: 'Esse curso foi uma verdadeira imersão no JavaScript. Comecei com os conceitos básicos e rapidamente evoluí para tópicos avançados, como programação assíncrona, manipulação de DOM e desenvolvimento de aplicações completas. Aprendi a trabalhar com JavaScript moderno, com práticas de código que me ajudaram a consolidar meu entendimento da linguagem. Através de desafios práticos e projetos, ganhei confiança para aplicar o que aprendi e me preparei para trabalhar com frameworks front-end como React e Vue, expandindo minhas habilidades para o desenvolvimento de aplicativos completos.',
        },
        {
            image: "/udemy.png",
            degree: 'Udemy: All about NodeJS',
            institution: 'Udemy - Ground Up & More',
            year: '2023',
            description: 'Neste curso, explorei o poder do NodeJS, que permite usar JavaScript para desenvolver aplicativos de servidor de alta performance. Com o Node, aprendi a criar aplicações em tempo real, como servidores de chat e ferramentas colaborativas, tudo com um código simples e eficiente. O curso me mostrou como o NodeJS pode substituir outras linguagens de servidor, permitindo escrever toda a aplicação, desde o front-end até o back-end, utilizando uma única linguagem, o que facilita o desenvolvimento de soluções integradas.',
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

    // Efeito de digitação
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const element = document.getElementById("education-typing-title");

                    if (entry.isIntersecting) {
                        if (element) element.textContent = ""; // Garante que o texto esteja vazio antes de reiniciar
                        setIsTypingDone(false); // Reinicia o estado para reiniciar o efeito
                        typingEffect("Formação Acadêmica", () => setIsTypingDone(true));
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

    return (
        <div className="pt-10 w-full mx-auto mt-36">
            <div className="w-full scroll-mt-24" id="education">
                <div
                    id="title-container"
                    className="bg-gradient-to-t from-[#303446] to-[#30344600] h-fit w-full"
                >
                    <h2
                        className={`${roboto.className} lg:pl-9 text-3xl z-[1] md:text-5xl font-bold lg:text-7xl py-4 text-center lg:text-left text-[#fff] flex items-center justify-center lg:justify-start`}
                    >
                        <span id="education-typing-title"></span>
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
                            <div className='absolute left-[5%] md:left-[10%] lg:left-[15%] top-1/2 -translate-y-1/2'>
                                <Image
                                    alt={item.institution}
                                    src={item.image}
                                    width={40}
                                    height={40}
                                />
                            </div>

                            {/* Ponto na linha do tempo */}
                            <div className="absolute w-8 h-8 bg-[#aadd49] rounded-full border-4 border-white left-1/4 transform -translate-x-1/2 z-10  top-1/2 -translate-y-1/2">
                                <span className="sr-only">Ponto na linha do tempo</span>
                            </div>

                            {/* Texto posicionado ao lado direito */}
                            <div className="absolute left-[30%] text-left top-1/2 -translate-y-1/2 px-5 select-none">
                                <div className="text-md lg:text-lg font-semibold">{item.degree}</div>
                                <div className="text-gray-600">{item.institution}</div>
                                <div className="text-sm text-gray-500">{item.year}</div>
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
                            className="relative bg-white rounded-lg w-4/5 md:w-2/3 p-10"
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

                            <div className="flex flex-col md:flex-row items-start md:items-center">
                                {/* Foto da instituição */}
                                <div className="mr-4">
                                    <Image
                                        alt={selectedCourse.institution}
                                        src={selectedCourse.image}
                                        layout="intrinsic" 
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                {/* Texto com título e descrição */}
                                <div>
                                    <h3 className="text-xl font-semibold text-black">{selectedCourse.degree}</h3>
                                    <p className="text-sm text-gray-600">{selectedCourse.institution}</p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-2">{selectedCourse.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
