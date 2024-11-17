import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col gap-8 md:gap-4 text-center mt-12 md:mt-24 space-y-8 md:space-y-16 px-6 md:px-32 items-center">
                <h1 className="text-5xl sm:text-7xl font-bold">404</h1>
                    <p className="flex flex-col space-y-8 md:space-y-4">
                        <span>Oops, não conseguimos encontrar esta página!</span>
                        <span>Clique no botão abaixo para ser redirecionado à pagina inicial</span>
                    </p>
                    
                <Link href="/" className="p-4 bg-[#787d96] rounded-xl font-bold mt-5 w-fit">Ir para a página inicial</Link>
            </div>
            
        </>
    )
}