import zLogo from "../../../photos/cd-logo.png"
import Image from "next/image"
import Link from "next/link"

import { RiMenuFold2Fill } from "react-icons/ri";


interface MenuProps {
    isVisible: boolean
    onClose: () => void
}

export default function HeaderMenu( { isVisible, onClose }: MenuProps ) {
    return (
        <div className={`${isVisible ? 'flex' : 'hidden'}`}>
            <div>
                <div>
                    <Link href="/">
                        <Image alt="Logotipo" src={zLogo} width={60} />
                    </Link>
                    <button onClick={onClose}>
                        <RiMenuFold2Fill />
                    </button>
                </div>
                <nav className="hidden md:flex items-center gap-10 text-md">
                    <Link href="/sobre-mim">Sobre mim</Link>
                    <Link href="/contatos">Entre em contato</Link>
                </nav>
            </div>
        </div>
    )
}