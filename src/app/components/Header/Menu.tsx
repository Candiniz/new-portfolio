import zLogo from "../../../photos/cd-logo2.png"
import Image from "next/image"
import Link from "next/link"

import { RiMenuFold2Fill } from "react-icons/ri";


interface MenuProps {
    isVisible: boolean
    onClose: () => void
}

export default function HeaderMenu({ isVisible, onClose }: MenuProps) {
    return (
        <div className={`${isVisible ? 'flex' : 'hidden'}
            fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm md:hidden
        `} onClick={onClose}>
            <div className="w-full bg-slate-500 h-96 shadow-md py-4 px-5" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-around mb-5">
                    <Link href="/">
                        <Image alt="Logotipo" src={zLogo} width={60} />
                    </Link>
                    <button onClick={onClose}>
                        <RiMenuFold2Fill className="fill-white w-10 h-10" />
                    </button>
                </div>
                <nav className="flex flex-col gap-5 text-xl p-5 items-center">
                    <Link href="/" onClick={onClose}>Sobre mim</Link>
                    <Link href="/contatos" onClick={onClose}>Entre em contato</Link>
                </nav>
            </div>
        </div>
    )
}