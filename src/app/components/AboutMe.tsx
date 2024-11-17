import Image from "next/image";
import fotoPerfil from "../../photos/portrait.png"
import Link from "next/link";

export default function AboutMe() {
    return (
        <main className="xl:w-120 flex flex-wrap-reverse justify-center items-center gap-10 md:gap-20 py-8 text-lg xl:flex-nowrap xl:justify-between">
            <div className="text-white xl:text-left md:text-center flex flex-col items-center xl:items-start gap-4 w-full">
                <h1 className="text-5xl md:text-[6vw] xl:text-[4vw]">Prazer, sou  <span className="font-bold">Anderson!</span></h1>
                <div className="mb-12">
                    <h2>Sou um desenvolvedor frontend apaixonado por criar interfaces </h2>
                </div>

                <Link href='/contatos' className="p-3 bg-[#787d96] rounded-lg  w-fit text-xl transition-all hover:bg-opacity-60 px-10 mb-12">Vamos conversar!</Link>
                
                <ul className="flex flex-wrap justify-center xl:grid xl:grid-cols-2 xl:w-fit gap-3 text-xl">
                    <li className="bg-[#2f74c0] text-[#ffffff] w-fit p-2 rounded-md">typescript</li>
                    <li className="bg-[#6bddfa] text-[#000000] w-fit p-2 rounded-md">react</li>
                    <li className="bg-[#efd81d] text-[#000000] w-fit p-2 rounded-md">javascript</li>
                    <li className="bg-[#000000] text-[#ffffff] w-fit p-2 rounded-md">next.js</li>
                    <li className="bg-[#c762de] text-[#ffffff] w-fit p-2 rounded-md">UX/UI</li>
                </ul>
            </div>
            <div className="">
                <div className="relative m-auto xl:w-[500px] sm:w-3/5 md:w-[350px] ">
                    <Image alt="Foto de Perfil" src={fotoPerfil} />
                    <p className="p-4 w-fit text-base leading-tight bg-[#787d96] rounded-xl text-white absolute -bottom-[0.75rem]">
                        <span className="text-4xl ">1+</span>
                        <br /> anos de experiência</p>
                </div>
            </div>
        </main>
    )
}