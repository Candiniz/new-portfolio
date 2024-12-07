'use client'

import { RiUserLine, RiCodeLine, RiBriefcaseLine, RiGraduationCapLine, RiMailLine } from 'react-icons/ri';
import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../photos/cd-logo2.png";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { roboto } from "@/app/fonts/Fonts";

// Função para rolar até o elemento
const scrollToAnchor = (e: React.MouseEvent, target: string) => {
    e.preventDefault(); // Impede que a URL seja alterada com a âncora
    const element = document.getElementById(target);
    const navbarHeight = 60; // Ajuste para a altura da sua navbar fixa

    if (element) {
        window.scrollTo({
            top: element.offsetTop - navbarHeight, // Ajusta para não ser coberto pela navbar
            behavior: "smooth", // Rolagem suave
        });
    }
};

// Componente de ícone personalizado
const BurgerIcon = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {
    return (
        <button onClick={onClick} className="z-50 lg:hidden">
            <div className="mr-1 relative w-9 h-9 flex flex-col justify-between items-center">
                {/* Linha superior */}
                <div
                    className={`bg-white h-[2px] w-[36px] transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : ''}`}
                    style={{
                        position: 'absolute',
                        top: isOpen ? '4px' : '7px',  // Ajuste para as barras ficarem mais próximas
                        left: 0,  // Mantém alinhado à esquerda
                        transformOrigin: 'top left',  // Ponto de rotação no canto superior esquerdo
                    }}
                />
                {/* Linha do meio */}
                <div
                    className={`bg-white h-[2px] w-[36px] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}
                    style={{
                        position: 'absolute',
                        top: '50%',  // Centraliza verticalmente
                        left: 0,
                        transform: 'translateY(-50%)',  // Alinha no meio
                    }}
                />
                {/* Linha inferior */}
                <div
                    className={`bg-white h-[2px] w-[36px] transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : ''}`}
                    style={{
                        position: 'absolute',
                        bottom: isOpen ? '4px' : '7px',  // Ajuste para as barras ficarem mais próximas
                        left: isOpen ? '0' : '0',
                        transformOrigin: 'bottom left',  // Ponto de rotação no canto inferior esquerdo
                    }}
                />
            </div>
        </button>
    );
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do menu
    const [isFadeVisible, setIsFadeVisible] = useState(false); // Controle do fade das seções
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null); // Estado para controlar qual ícone está em hover


    // Função para alternar o menu
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev); // Alterna o estado de isMenuOpen
    }, []);

    // Controlar a visibilidade do fade após a animação do menu
    useEffect(() => {
        if (isMenuOpen) {
            const timer = setTimeout(() => setIsFadeVisible(true), 500); // Espera o menu terminar de abrir
            return () => clearTimeout(timer); // Limpa o timeout ao fechar
        } else {
            setIsFadeVisible(false); // Oculta imediatamente ao fechar
        }
    }, [isMenuOpen]);

    // Função para definir o ícone em hover
    const handleIconHover = (icon: string | null) => {
        setHoveredIcon(icon);
    };

    return (
        <>
            <header className={`${roboto.className} bg-black fixed z-50 w-full text-sm flex flex-col items-center top-0`}>
                <div className="flex justify-between py-2 px-8 w-full">
                    <Link href="/">
                        <Image alt="Logotipo" src={zLogo} height={50} />
                    </Link>

                    {/* Ícone de menu hamburguer */}
                    <BurgerIcon isOpen={isMenuOpen} onClick={toggleMenu} />

                    {/* Navbar principal */}
                    <nav className="hidden lg:flex items-center gap-1 text-md z-50">
                        <Link onClick={(e) => scrollToAnchor(e, "skills")} className="hover:bg-[#aadd49] hover:text-black hover:scale-105 transition-all duration-500 p-2" href="#skills">Habilidades</Link>
                        <Link onClick={(e) => scrollToAnchor(e, "projects")} className="hover:bg-[#aadd49] hover:text-black hover:scale-105 transition-all duration-500 p-2" href="#projects">Projetos</Link>
                        <Link onClick={(e) => scrollToAnchor(e, "education")} className="hover:bg-[#aadd49] hover:text-black hover:scale-105 transition-all duration-500 p-2" href="#education">Formação</Link>
                        <Link onClick={(e) => scrollToAnchor(e, "aboutMe")} className="hover:bg-[#aadd49] hover:text-black hover:scale-105 transition-all duration-500 p-2" href="#aboutMe">Sobre Mim</Link>
                        <Link className="hover:bg-[#aadd49] hover:text-black hover:scale-105 transition-all duration-500 p-2" href="#contact">Contatos</Link>
                    </nav>
                </div>
                {/* Linha de separação após a navbar */}
                <div className={`bg-[#aadd49] h-[2px] w-full transition-shadow duration-300 ${isMenuOpen ? 'shadow-[0_0_15px_2px_#aadd49]' : ''}`}></div>

            </header>

            {/* Menu Lateral */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="fixed lg:hidden inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm"
                        onClick={toggleMenu}>
                        <motion.div
                            className="fixed right-5 w-[80px] h-full bg-black border-l-2 rounded-none border-[#aadd49] shadow-md py-4 px-2 z-20"
                            initial={{ x: '200%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '200%', opacity: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <nav className="flex flex-col text-4xl gap-8 pt-[100px] items-center relative">
                                <button
                                    onClick={(e) => {
                                        scrollToAnchor(e, "skills")
                                        toggleMenu();
                                    }}
                                    className={`hover:text-[#aadd49] hover:scale-110 transition-all duration-300 group ${hoveredIcon === 'skills' ? 'text-[#aadd49]' : ''}`}
                                    onMouseEnter={() => handleIconHover('skills')}
                                    onMouseLeave={() => handleIconHover(null)}
                                >
                                    <RiCodeLine className="group-hover:filter group-hover:drop-shadow-[0_0_15px_2px_#aadd49]" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        scrollToAnchor(e, "projects")
                                        toggleMenu();
                                    }}
                                    className={`hover:text-[#aadd49] hover:scale-110 transition-all duration-300 group ${hoveredIcon === 'projects' ? 'text-[#aadd49]' : ''}`}
                                    onMouseEnter={() => handleIconHover('projects')}
                                    onMouseLeave={() => handleIconHover(null)}
                                >
                                    <RiBriefcaseLine className="group-hover:filter group-hover:drop-shadow-[0_0_15px_2px_#aadd49]" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        scrollToAnchor(e, "education")
                                        toggleMenu();
                                    }}
                                    className={`hover:text-[#aadd49] hover:scale-110 transition-all duration-300 group ${hoveredIcon === 'education' ? 'text-[#aadd49]' : ''}`}
                                    onMouseEnter={() => handleIconHover('education')}
                                    onMouseLeave={() => handleIconHover(null)}
                                >
                                    <RiGraduationCapLine className="group-hover:filter group-hover:drop-shadow-[0_0_15px_2px_#aadd49]" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        scrollToAnchor(e, "aboutMe")
                                        toggleMenu();
                                    }}
                                    className={`hover:text-[#aadd49] hover:scale-110 transition-all duration-300 group ${hoveredIcon === 'aboutMe' ? 'text-[#aadd49]' : ''}`}
                                    onMouseEnter={() => handleIconHover('aboutMe')}
                                    onMouseLeave={() => handleIconHover(null)}
                                >
                                    <RiUserLine className="group-hover:filter group-hover:drop-shadow-[0_0_15px_2px_#aadd49]" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        scrollToAnchor(e, "contact")
                                        toggleMenu();
                                    }}
                                    className={`hover:text-[#aadd49] hover:scale-110 transition-all duration-300 group ${hoveredIcon === 'contacts' ? 'text-[#aadd49]' : ''}`}
                                    onMouseEnter={() => handleIconHover('contacts')}
                                    onMouseLeave={() => handleIconHover(null)}
                                >
                                    <RiMailLine className="group-hover:filter group-hover:drop-shadow-[0_0_15px_2px_#aadd49]" />
                                </button>

                                {/* Seção de textos que recebem o efeito de hover ao passar sobre os ícones */}
                                <AnimatePresence>
                                    {isFadeVisible && (
                                        <motion.div
                                            className={`${roboto.className} pt-[100px] z-50 absolute top-0 right-24 flex flex-col gap-9 items-end text-2xl`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    scrollToAnchor(e, "skills")
                                                    toggleMenu();
                                                }}
                                                className={`transition-all duration-300 group ${hoveredIcon === 'skills' ? 'text-[#aadd49]' : ''}`}
                                                onMouseEnter={() => handleIconHover('skills')}
                                                onMouseLeave={() => handleIconHover(null)}
                                            >
                                                Habilidades
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    scrollToAnchor(e, "projects")
                                                    toggleMenu();
                                                }}
                                                className={`transition-all duration-300 group ${hoveredIcon === 'projects' ? 'text-[#aadd49]' : ''}`}
                                                onMouseEnter={() => handleIconHover('projects')}
                                                onMouseLeave={() => handleIconHover(null)}
                                            >
                                                Projetos
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    scrollToAnchor(e, "education")
                                                    toggleMenu();
                                                }}
                                                className={`transition-all duration-300 group ${hoveredIcon === 'education' ? 'text-[#aadd49]' : ''}`}
                                                onMouseEnter={() => handleIconHover('education')}
                                                onMouseLeave={() => handleIconHover(null)}
                                            >
                                                Formação
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    scrollToAnchor(e, "aboutMe")
                                                    toggleMenu();
                                                }}
                                                className={`transition-all duration-300 group ${hoveredIcon === 'aboutMe' ? 'text-[#aadd49]' : ''}`}
                                                onMouseEnter={() => handleIconHover('aboutMe')}
                                                onMouseLeave={() => handleIconHover(null)}
                                            >
                                                Sobre Mim
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    scrollToAnchor(e, "contacts")
                                                    toggleMenu();
                                                }}
                                                className={`transition-all duration-300 group ${hoveredIcon === 'contacts' ? 'text-[#aadd49]' : ''}`}
                                                onMouseEnter={() => handleIconHover('contacts')}
                                                onMouseLeave={() => handleIconHover(null)}
                                            >
                                                Contatos
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </nav>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
