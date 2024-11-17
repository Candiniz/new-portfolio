export const metadata = {
    title: 'Contatos | Candiniz',
    description: 'Entre em contato.',
  };

export default function Contatos() {
    return (
        <>
            <div className="mt-12 md:mt-24 space-y-8 md:space-y-16 px-6 md:px-32">
                <h1 className="text-5xl md:text-7xl font-bold text-center">Contatos:</h1>
                <ul className="table mx-auto space-y-6 md:space-y-8">
                    <li className="md:text-xl">
                        <span className="font-bold">E-mail</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <a className="text-sm md:text-lg text-slate-300 underline truncate" href="mailto:andersoncd123@gmail.com">andersoncd123@gmail.com</a>
                        </div>
                    </li>
                    <li>
                        <span className="font-bold">LinkedIn</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <a className="text-sm md:text-lg text-slate-300 underline truncate" href="https://www.linkedin.com/in/candiniz/">https://www.linkedin.com/in/candiniz</a>
                        </div>
                    </li>
                    <li>
                        <span className="font-bold">GitHub</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <a className="text-sm md:text-lg text-slate-300 underline truncate" href="https://github.com/Candiniz">https://github.com/Candiniz</a>
                        </div>
                    </li>
                    <li>
                        <span className="font-bold">Instagram</span>
                        <div className="flex gap-1 md:gap-3 items-center">
                            <a className="text-sm md:text-lg text-slate-300 underline truncate" href="">www.instagram.com/candiniz.dev</a>
                        </div>
                    </li>
                </ul>
            </div>
            
        </>
    )
}