'use client'

import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../photos/cd-logo2.png"
import HeaderMenu from "./Menu";
import { useCallback, useState } from "react";
import { RiMenuFoldFill } from "react-icons/ri";
import { roboto } from "@/app/fonts/Fonts";


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

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = useCallback(() => {
        setIsMenuOpen(true)
    }, [])
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [])

    return (
        <div className="w-full h-fit fixed z-50">
            <header className={`${roboto.className} bg-[#1c1e27] text-sm flex py-3 justify-between items-center sticky top-0 z-20 px-6 lg:px-10 `}>
                <Link href="/">
                    <Image alt="Logotipo" src={zLogo} height={60} />
                </Link>

                <button className="p-1 md:hidden" onClick={openMenu}>
                    <RiMenuFoldFill className="text-white w-10 h-10 hover:text-gray-400" />
                </button>

                <nav className="hidden md:flex items-center gap-1 text-md z-50">
                    <Link
                        onClick={(e) => scrollToAnchor(e, "skills")}
                        className="hover:bg-[#aadd49] hover:text-black transition-all duration-500 p-4"
                        href="#skills">Habilidades</Link>
                    <Link
                        onClick={(e) => scrollToAnchor(e, "projects")}
                        className="hover:bg-[#aadd49] hover:text-black transition-all duration-500 p-4"
                        href="#projects">Meus Projetos</Link>
                    <Link
                        onClick={(e) => scrollToAnchor(e, "about")}
                        className="hover:bg-[#aadd49] hover:text-black transition-all duration-500 p-4"
                        href="/contatos">Sobre Mim</Link>
                    <Link
                        onClick={(e) => scrollToAnchor(e, "about")}
                        className="hover:bg-[#aadd49] hover:text-black transition-all duration-500 p-4"
                        href="/contatos">Entre em contato</Link>
                </nav>
                <HeaderMenu isVisible={isMenuOpen} onClose={closeMenu} />
            </header>
            <div className="bg-[#aadd49] h-[2px] w-full"></div>
        </div>
    )
}