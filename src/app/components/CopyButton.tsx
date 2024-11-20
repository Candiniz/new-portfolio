'use client'

import { FaRegCopy } from "react-icons/fa6";

interface CopyButtonProps {
    textToCopy: string
}


export default function CopyButton({ textToCopy }: CopyButtonProps) {

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
    }

    return (
        <button onClick={handleCopy} className="inline-flex justify-center items-center">
            <FaRegCopy title="Clique aqui para copiar" />
        </button>
    )
}