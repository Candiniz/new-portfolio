'use client'

import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../photos/cd-logo2.png"
import HeaderMenu from "./Menu";
import { useCallback, useState } from "react";
import { RiMenuFoldFill } from "react-icons/ri";




export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const openMenu = useCallback(() => {
        setIsMenuOpen(true)
    }, [])
    const closeMenu = useCallback(() => {
        setIsMenuOpen(false)
    }, [])
    
    return (
        <header className="bg-[#1c1e27] text-sm flex py-3 justify-between items-center sticky top-0 z-20 px-6 lg:px-60">
            <Link href="/">
                <Image alt="Logotipo" src={zLogo} height={60} />
            </Link>

            <button className="p-1 md:hidden" onClick={openMenu}>
                <RiMenuFoldFill className="text-white w-10 h-10 hover:text-gray-400" />
            </button>

            <nav className="hidden md:flex items-center gap-10 text-md">
                <Link href="/sobre-mim">Sobre mim</Link>
                <Link href="/contatos">Entre em contato</Link>
            </nav>
            <HeaderMenu isVisible={isMenuOpen} onClose={closeMenu} />
        </header>
    )
}