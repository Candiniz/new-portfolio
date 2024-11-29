import zLogo from "../../../photos/cd-logo2.png"
import Image from "next/image"
import Link from "next/link"
import { RiCloseFill } from "react-icons/ri";
import { motion } from "framer-motion";

interface MenuProps {
    isVisible: boolean
    onClose: () => void
}

export default function HeaderMenu({ isVisible, onClose }: MenuProps) {
    return (
        <div className={`${isVisible ? 'flex' : 'hidden'} 
            fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm z-40
        `} onClick={onClose}>  {/* Ajustando z-40 aqui para o fundo */}
            <motion.div 
                className="z-50 fixed right-5 w-[80px] h-[500px] bg-black border border-r-2 shadow-md py-4 px-5 overflow-hidden"
                initial={{ y: '-100%', opacity: 0 }}  // Inicialmente fora da tela
                animate={{ y: isVisible ? 0 : '-100%', opacity: isVisible ? 1 : 0 }}  // Anima para dentro ou fora da tela
                exit={{ y: '-100%', opacity: 0 }}  // Quando o menu for fechado
                transition={{ duration: 0.5 }}  // Duração da animação
                onClick={(e) => e.stopPropagation()} // Evita que o clique no menu feche o menu
            >
                <div className="flex justify-around mb-5">
                    <Link href="/">
                        <Image alt="Logotipo" src={zLogo} width={60} />
                    </Link>
                    <button onClick={onClose}>
                        <RiCloseFill className="fill-white w-10 h-10" />
                    </button>
                </div>
                <nav className="flex flex-col gap-5 text-xl p-5 items-center">
                    <Link href="/" onClick={onClose}>Sobre mim</Link>
                    <Link href="/contatos" onClick={onClose}>Entre em contato</Link>
                </nav>
            </motion.div>
        </div>
    )
}
